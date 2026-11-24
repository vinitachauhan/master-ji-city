import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { randomUUID } from 'node:crypto';
import { find, insertOne } from '@/lib/db.mjs';
import { solveWithClaude, solveOffline, rateLimited } from '@/lib/doubtSolver.mjs';
import { getSettings } from '@/lib/settings.mjs';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const MEDIA = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_BASE64 = 6_000_000; // ~4.5 MB image
const str = (v, n) => String(v ?? '').trim().slice(0, n);

// POST /api/doubt { name, class, city, subject, question, image?: { mediaType, data(base64) } }
export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'Invalid data' }, { status: 400 }); }
  const question = str(b.question, 2000);
  const name = str(b.name, 60) || 'Student';
  const cls = str(b.class, 20);
  const city = str(b.city, 60);
  const subject = str(b.subject, 40);

  let image = null;
  if (b.image?.data) {
    if (!MEDIA.includes(b.image.mediaType)) return NextResponse.json({ error: 'Photo must be JPG, PNG, WEBP or GIF' }, { status: 400 });
    if (typeof b.image.data !== 'string' || b.image.data.length > MAX_IMAGE_BASE64) return NextResponse.json({ error: 'Photo is too large (max ~4 MB)' }, { status: 400 });
    image = { mediaType: b.image.mediaType, data: b.image.data };
  }
  if (!question && !image) return NextResponse.json({ error: 'Type a question or upload a photo' }, { status: 400 });

  const settings = await getSettings();
  if (!settings.doubtSolverEnabled) return NextResponse.json({ error: 'The Doubt Solver is closed right now. Please try again later.' }, { status: 503 });
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  const wait = rateLimited(ip, settings.doubtLimitPer10Min);
  if (wait) return NextResponse.json({ error: `Too many questions. Please wait ${wait} minute(s) and try again.` }, { status: 429 });

  let result; let note = '';
  try {
    result = await solveWithClaude({ question, image, cls, subject });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) note = 'AI teacher is not set up yet (no valid API key).';
    else if (err instanceof Anthropic.RateLimitError) note = 'AI teacher is busy right now.';
    else if (err instanceof Anthropic.APIConnectionError) note = 'Could not reach the AI teacher (network).';
    else if (err instanceof Anthropic.APIError) note = `AI teacher error (${err.status}).`;
    else note = 'AI teacher is not set up yet.';
    console.warn('[doubt] Claude unavailable:', err?.message);
    result = image && !question
      ? { answer: '### Answer\nPhoto questions need the AI teacher, which is not connected right now.\n\n### Step by Step\n1. Type your question instead, or\n2. Ask the school admin to set up the AI teacher (API key).\n\n### Example\nType it like this: "5 pens cost Rs 10 each. What is the total?"\n\n### Summary\nPhoto questions need the AI teacher, which is not connected right now. Please type your question instead.', source: 'offline' }
      : await solveOffline({ question, cls });
  }

  const doc = { id: randomUUID(), name, class: cls, city, subject, question, hasImage: !!image, answer: result.answer, source: result.source, chapter: result.chapter || null, createdAt: new Date() };
  await insertOne('doubts', doc);
  return NextResponse.json({ ...doc, note });
}

// GET /api/doubt?name=&class=&city= - this student's recent doubts
export async function GET(req) {
  const q = new URL(req.url).searchParams;
  const name = str(q.get('name'), 60);
  if (!name) return NextResponse.json({ rows: [] });
  const rows = await find('doubts', { name, class: str(q.get('class'), 20), city: str(q.get('city'), 60) }, { sort: { createdAt: -1 }, limit: 10 });
  return NextResponse.json({ rows });
}
