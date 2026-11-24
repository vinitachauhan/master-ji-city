import { NextResponse } from 'next/server';
import { find } from '@/lib/db.mjs';

export const dynamic = 'force-dynamic';

// GET /api/streams
export async function GET() {
  return NextResponse.json({ streams: await find('streams') });
}
