import { timingSafeEqual } from 'node:crypto';

// School data (salaries, fees, phone numbers) is private: every /api/school call needs the admin PIN.
export function adminPin() {
  if (process.env.ADMIN_PIN) return process.env.ADMIN_PIN;
  return process.env.NODE_ENV === 'production' ? null : '1234'; // dev-only fallback
}

export function checkPin(req) {
  const pin = adminPin();
  const given = req.headers.get('x-admin-pin') || '';
  if (!pin) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(pin);
  return a.length === b.length && timingSafeEqual(a, b);
}
