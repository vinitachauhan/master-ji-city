import { NextResponse } from 'next/server';
import { find, source } from '@/lib/db.mjs';
import { topics912 } from '@/lib/topics.mjs';

export const dynamic = 'force-dynamic';

// GET /api/study-9-12?class=10&subject=Science
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cls = searchParams.get('class');
  const subject = searchParams.get('subject');
  if (!cls || !subject) return NextResponse.json({ error: 'class and subject are required' }, { status: 400 });
  const chapters = await find('study_9_12', { class: cls, subject }, { sort: { chapterNo: 1 } });
  return NextResponse.json({ class: cls, subject, source: await source(), chapters: chapters.map((c) => ({ ...c, topics: c.topics?.length ? c.topics : topics912(c) })) });
}
