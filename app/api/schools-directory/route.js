import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { find, insertOne, upsert, remove, source } from '@/lib/db.mjs';
import { checkPin } from '@/lib/schoolAuth.mjs';
import { DIRECTORY_CITIES, SCHOOL_TYPES, SCHOOL_BOARDS, SCHOOL_CLASSES, SCHOOL_STATUSES } from '@/lib/data/schoolsDirectory.mjs';

export const dynamic = 'force-dynamic';

const COL = 'schoolsDirectory';
const PUBLIC = ['id', 'name', 'city', 'type', 'board', 'classes', 'status', 'demo'];
const str = (v, n = 100) => String(v ?? '').trim().slice(0, n);
const count = (v, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n >= 0 && n <= max ? n : 0; };
const bad = (msg, status = 400) => NextResponse.json({ error: msg }, { status });
const cityCounts = (rows) => Object.fromEntries(DIRECTORY_CITIES.map((c) => [c, rows.filter((r) => r.city === c).length]));

// GET /api/schools-directory?city=Gulaothi
// Everyone (students on the home page) gets the public fields; with the admin PIN the full record.
export async function GET(req) {
  const admin = checkPin(req);
  const city = new URL(req.url).searchParams.get('city');
  const all = await find(COL, {}, { sort: { name: 1 } });
  const rows = (DIRECTORY_CITIES.includes(city) ? all.filter((r) => r.city === city) : all)
    .map((r) => (admin ? r : Object.fromEntries(PUBLIC.map((k) => [k, r[k]]))));
  return NextResponse.json({ admin, source: await source(), counts: cityCounts(all), total: all.length, schools: rows });
}

// Super Admin only: add / edit (POST), "Add to Super Admin" (PATCH), delete (DELETE)
function clean(b) {
  return {
    name: str(b.name, 90), city: DIRECTORY_CITIES.includes(b.city) ? b.city : null,
    type: SCHOOL_TYPES.includes(b.type) ? b.type : 'Private', board: SCHOOL_BOARDS.includes(b.board) ? b.board : 'CBSE',
    classes: SCHOOL_CLASSES.includes(b.classes) ? b.classes : 'Play to 12th',
    principal: str(b.principal, 60), phone: str(b.phone, 20),
    students: count(b.students, 20000), teachers: count(b.teachers, 2000),
    status: SCHOOL_STATUSES.includes(b.status) ? b.status : 'Pending',
  };
}

export async function POST(req) {
  if (!checkPin(req)) return bad('Admin PIN required', 401);
  const b = await req.json().catch(() => ({}));
  const doc = clean(b);
  if (!doc.name || !doc.city) return bad('School name and city are required');
  if (b.id) {
    const found = await upsert(COL, { id: str(b.id) }, { ...doc, demo: false, updatedAt: new Date() }, { insert: false });
    return found ? NextResponse.json({ id: b.id }) : bad('School not found', 404);
  }
  const id = randomUUID();
  await insertOne(COL, { id, ...doc, inSystem: false, demo: false, createdAt: new Date() });
  return NextResponse.json({ id });
}

export async function PATCH(req) {
  if (!checkPin(req)) return bad('Admin PIN required', 401);
  const b = await req.json().catch(() => ({}));
  const found = await upsert(COL, { id: str(b.id) }, { inSystem: true, status: 'Active', addedAt: new Date() }, { insert: false });
  return found ? NextResponse.json({ id: b.id, inSystem: true }) : bad('School not found', 404);
}

export async function DELETE(req) {
  if (!checkPin(req)) return bad('Admin PIN required', 401);
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return bad('id is required');
  const n = await remove(COL, { id });
  return n ? NextResponse.json({ deleted: id }) : bad('School not found', 404);
}
