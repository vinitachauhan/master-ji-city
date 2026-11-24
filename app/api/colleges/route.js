import { NextResponse } from 'next/server';
import { find } from '@/lib/db.mjs';

export const dynamic = 'force-dynamic';

// GET /api/colleges?stream=PCM
export async function GET(req) {
  const stream = new URL(req.url).searchParams.get('stream');
  const colleges = await find('colleges', stream ? { stream } : {});
  return NextResponse.json({ stream: stream || 'all', colleges });
}
