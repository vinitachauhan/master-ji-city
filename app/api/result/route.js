import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { find, insertOne } from '@/lib/db.mjs';
import { scoreAptitude } from '@/lib/scoring.mjs';

export const dynamic = 'force-dynamic';

// POST /api/result  { studentName, class, city, answers: { qid: "chosen option" } }
export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid data' }, { status: 400 }); }
  const studentName = String(body.studentName || '').trim().slice(0, 60);
  const cls = String(body.class || '').trim().slice(0, 20);
  const city = String(body.city || '').trim().slice(0, 60);
  if (!studentName) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  const answers = body.answers && typeof body.answers === 'object' ? body.answers : {};

  const questions = await find('aptitudeQuestions');
  const scored = scoreAptitude(questions, answers);
  const result = { id: randomUUID(), studentName, class: cls, city, ...scored, createdAt: new Date() };
  await insertOne('results', result);
  return NextResponse.json({ result });
}

// GET /api/result - recent results (for teachers/parents)
export async function GET() {
  const results = await find('results', {}, { sort: { createdAt: -1 }, limit: 20 });
  return NextResponse.json({ results });
}
