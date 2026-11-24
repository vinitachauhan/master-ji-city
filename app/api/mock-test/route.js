import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { find, insertOne, upsert } from '@/lib/db.mjs';
import { getSettings } from '@/lib/settings.mjs';

export const dynamic = 'force-dynamic';

const CLASSES = ['9', '10', '11', '12'];
const TOTAL = 20;
const DURATION_MS = 30 * 60 * 1000;
const GRACE_MS = 60 * 1000;
const str = (v, n) => String(v ?? '').trim().slice(0, n);

function shuffle(a) { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; }

// GET /api/mock-test?class=10&subject=Science         -> start a test (20 MCQ, answers hidden)
// GET /api/mock-test?class=10&subject=Science&top=1   -> leaderboard
export async function GET(req) {
  const q = new URL(req.url).searchParams;
  const cls = q.get('class'); const subject = str(q.get('subject'), 40);
  if (!CLASSES.includes(cls) || !subject) return NextResponse.json({ error: 'Choose Class 9-12 and a subject' }, { status: 400 });

  if (q.get('top')) {
    const rows = await find('mockResults', { class: cls, subject }, { sort: { score: -1 } });
    rows.sort((a, b) => b.score - a.score || a.timeTakenSec - b.timeTakenSec);
    return NextResponse.json({ rows: rows.slice(0, 10).map(({ name, city, score, total, timeTakenSec, createdAt }) => ({ name, city, score, total, timeTakenSec, createdAt })) });
  }

  if (!(await getSettings()).mockTestEnabled) return NextResponse.json({ error: 'Mock tests are closed right now. Please try again later.' }, { status: 503 });
  const chapters = await find('study_9_12', { class: cls, subject });
  const seen = new Set();
  const pool = [];
  for (const ch of chapters) for (const t of ch.testQuestions || []) {
    if (seen.has(t.question)) continue;
    seen.add(t.question);
    pool.push({ ...t, chapter: ch.chapterName });
  }
  // Extra questions built from the chapters themselves, so every subject has 20+ unique questions.
  const short = (s) => (s.length > 110 ? s.slice(0, 110).replace(/\s+\S*$/, '') + '...' : s);
  for (const ch of chapters) {
    const others = shuffle(chapters.filter((o) => o.chapterName !== ch.chapterName)).slice(0, 3);
    if (others.length < 3) continue;
    const def = (c) => short(String(c.notes?.[0] || '').replace(/^(Step|चरण) 1 - [^:]+:\s*/, ''));
    const hi = subject === 'Hindi';
    const extra = [
      { question: hi ? `"${ch.chapterName}" के बारे में कौन-सा कथन सही है?` : `Which statement describes "${ch.chapterName}"?`, correctAnswer: def(ch), options: [def(ch), ...others.map(def)] },
      { question: hi ? `"${ch.chapterName}" से जुड़ा मुख्य तथ्य कौन-सा है?` : `Which formula / key point belongs to "${ch.chapterName}"?`, correctAnswer: short(ch.formulas || ''), options: [short(ch.formulas || ''), ...others.map((o) => short(o.formulas || ''))] },
    ];
    for (const t of extra) {
      if (!t.correctAnswer || new Set(t.options).size !== 4 || seen.has(t.question)) continue;
      seen.add(t.question);
      pool.push({ ...t, chapter: ch.chapterName });
    }
  }
  if (pool.length < 5) return NextResponse.json({ error: 'Not enough questions for this subject yet' }, { status: 404 });

  const picked = shuffle(pool).slice(0, TOTAL).map((t) => ({ ...t, options: shuffle(t.options) }));
  const id = randomUUID();
  await insertOne('mockSessions', { id, class: cls, subject, questions: picked, startedAt: Date.now(), submitted: false });
  return NextResponse.json({
    sessionId: id, class: cls, subject, durationSec: DURATION_MS / 1000,
    questions: picked.map(({ question, options, chapter }) => ({ question, options, chapter })),
  });
}

// POST /api/mock-test { sessionId, name, city, answers: { [index]: option } }
export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'Invalid data' }, { status: 400 }); }
  const [s] = await find('mockSessions', { id: str(b.sessionId, 60) });
  if (!s) return NextResponse.json({ error: 'Test not found - please start a new test' }, { status: 404 });
  if (s.submitted) return NextResponse.json({ error: 'This test was already submitted' }, { status: 409 });

  const now = Date.now();
  const late = now - s.startedAt > DURATION_MS + GRACE_MS;
  const answers = b.answers && typeof b.answers === 'object' ? b.answers : {};
  const review = s.questions.map((qq, i) => {
    const chosen = typeof answers[i] === 'string' ? answers[i] : null;
    return { question: qq.question, chapter: qq.chapter, options: qq.options, chosen, correctAnswer: qq.correctAnswer, isCorrect: chosen === qq.correctAnswer };
  });
  const score = review.filter((r) => r.isCorrect).length;
  const attempted = review.filter((r) => r.chosen).length;
  const timeTakenSec = Math.min(Math.round((now - s.startedAt) / 1000), DURATION_MS / 1000);

  await upsert('mockSessions', { id: s.id }, { submitted: true }, { insert: false });
  const result = {
    sessionId: s.id, name: str(b.name, 60) || 'Student', city: str(b.city, 60), class: s.class, subject: s.subject,
    score, total: s.questions.length, attempted, wrong: attempted - score, skipped: s.questions.length - attempted,
    percent: Math.round((score / s.questions.length) * 100), timeTakenSec, late, createdAt: new Date(),
  };
  await insertOne('mockResults', result);

  const all = await find('mockResults', { class: s.class, subject: s.subject });
  const rank = 1 + all.filter((r) => r.score > score || (r.score === score && r.timeTakenSec < timeTakenSec)).length;
  return NextResponse.json({ result: { ...result, rank, participants: all.length }, review });
}
