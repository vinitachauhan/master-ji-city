import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { find, insertOne } from '@/lib/db.mjs';
import { getSettings } from '@/lib/settings.mjs';

export const dynamic = 'force-dynamic';

const str = (v, n) => String(v ?? '').trim().slice(0, n);
// Only these fields are shown publicly (admin-only fields like createdBy stay private)
const publicCert = ({ certificateNo, name, class: cls, city, title, starsAtIssue, issuedOn }) => ({ certificateNo, name, class: cls, city, title, starsAtIssue, issuedOn });

// GET /api/certificate?name=&class=&city=   -> stars on the server + certificate if earned
// GET /api/certificate?verify=MJ-XXXXXX     -> check a certificate number
export async function GET(req) {
  const q = new URL(req.url).searchParams;

  if (q.get('verify')) {
    const [c] = await find('certificates', { certificateNo: str(q.get('verify'), 20).toUpperCase() });
    return NextResponse.json(c ? { valid: true, certificate: publicCert(c) } : { valid: false });
  }
  const NEEDED = (await getSettings()).certificateStars;

  const name = str(q.get('name'), 60); const cls = str(q.get('class'), 20); const city = str(q.get('city'), 60);
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  const [row] = await find('stars', { name, class: cls, city });
  const stars = row?.stars || 0;
  if (stars < NEEDED) return NextResponse.json({ stars, needed: NEEDED, eligible: false });

  let [cert] = await find('certificates', { name, class: cls, city });
  if (!cert) {
    cert = { certificateNo: `MJ-${randomBytes(3).toString('hex').toUpperCase()}`, name, class: cls, city, title: 'Master Ji Topper', starsAtIssue: stars, issuedOn: new Date().toISOString().slice(0, 10), createdAt: new Date() };
    await insertOne('certificates', cert);
  }
  return NextResponse.json({ stars, needed: NEEDED, eligible: true, certificate: publicCert(cert) });
}
