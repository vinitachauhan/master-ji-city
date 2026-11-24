import { NextResponse } from 'next/server';
import { find } from '@/lib/db.mjs';
import { getSettings } from '@/lib/settings.mjs';

export const dynamic = 'force-dynamic';

// GET /api/notifications - active announcements for the website banner (set from the Admin Panel)
export async function GET() {
  const now = new Date();
  const [settings, rows] = await Promise.all([getSettings(), find('notifications').catch(() => [])]);
  const active = rows
    .filter((n) => n.active !== false && ['website', 'all'].includes(n.audience)
      && (!n.startsAt || new Date(n.startsAt) <= now) && (!n.endsAt || new Date(`${String(n.endsAt).slice(0, 10)}T23:59:59`) >= now))
    .map(({ id, title, message, type, link }) => ({ id, title, message, type, link }))
    .slice(0, 5);
  if (settings.maintenanceBanner) active.unshift({ id: 'site-banner', title: '', message: settings.maintenanceBanner, type: 'warning' });
  return NextResponse.json({ notifications: active });
}
