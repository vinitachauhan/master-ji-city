import { NextResponse } from 'next/server';
import { find } from '@/lib/db.mjs';

export const dynamic = 'force-dynamic';

// GET /api/aptitude - correct answers are not sent; scoring happens on the server (POST /api/result)
export async function GET() {
  const questions = await find('aptitudeQuestions', {}, { projection: { correctAnswer: 0, optionStreams: 0 } });
  return NextResponse.json({ questions });
}
