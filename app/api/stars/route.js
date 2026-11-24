import { NextResponse } from 'next/server';
import { find, addStars } from '@/lib/db.mjs';

export const dynamic = 'force-dynamic';

// GET /api/stars - Leaderboard (top 10)
export async function GET() {
  const leaders = await find('stars', {}, { sort: { stars: -1 }, limit: 10 });
  return NextResponse.json({ leaders });
}

// POST /api/stars { name, class, city, add }
export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid data' }, { status: 400 }); }
  const name = String(body.name || '').trim().slice(0, 60);
  const add = Math.max(0, Math.min(20, Number(body.add) || 0));
  if (!name || !add) return NextResponse.json({ error: 'name and add are required' }, { status: 400 });
  await addStars({ name, cls: String(body.class || '').slice(0, 20), city: String(body.city || '').slice(0, 60), add });
  return NextResponse.json({ ok: true });
}
