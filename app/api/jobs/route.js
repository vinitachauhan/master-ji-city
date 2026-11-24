import { NextResponse } from 'next/server';
import { find } from '@/lib/db.mjs';

export const dynamic = 'force-dynamic';

// GET /api/jobs                -> all jobs
// GET /api/jobs?stream=PCM     -> jobs open after that stream
// GET /api/jobs?id=doctor      -> one job
export async function GET(req) {
  const q = new URL(req.url).searchParams;
  const id = q.get('id');
  if (id) {
    const [job] = await find('jobs', { id });
    return job ? NextResponse.json({ job }) : NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  const stream = q.get('stream');
  let jobs = await find('jobs');
  if (stream) jobs = jobs.filter((j) => j.streams.includes(stream));
  return NextResponse.json({ jobs });
}
