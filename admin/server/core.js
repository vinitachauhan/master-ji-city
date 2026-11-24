// Core: environment, password hashing, sessions (JWT in an httpOnly cookie), RBAC and activity logging.
import { readFileSync, existsSync } from 'node:fs';
import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import jwt from 'jsonwebtoken';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '..', '..'); // the Master Ji website folder

// ---------- env: read the website's .env.local (same MongoDB) ----------
for (const file of ['.env.local', '.env']) {
  const p = path.join(ROOT, file);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
export const IS_PROD = process.env.NODE_ENV === 'production';

let secret = process.env.ADMIN_JWT_SECRET;
if (!secret || secret.length < 32) {
  if (IS_PROD) throw new Error('ADMIN_JWT_SECRET (32+ characters) must be set in production.');
  secret = randomBytes(48).toString('hex');
  console.warn('[admin] ADMIN_JWT_SECRET not set - using a temporary secret (everyone is logged out on restart).');
}
export const JWT_SECRET = secret;

// ---------- passwords (scrypt) ----------
export function hashPassword(pw) {
  const salt = randomBytes(16);
  const hash = scryptSync(pw, salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}
export function verifyPassword(pw, stored) {
  const [, saltHex, hashHex] = String(stored || '').split('$');
  if (!saltHex || !hashHex) return false;
  const hash = scryptSync(pw, Buffer.from(saltHex, 'hex'), 64);
  const expected = Buffer.from(hashHex, 'hex');
  return expected.length === hash.length && timingSafeEqual(hash, expected);
}
export function passwordProblem(pw) {
  if (typeof pw !== 'string' || pw.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return 'Password must contain letters and numbers.';
  if (pw.length > 128) return 'Password is too long.';
  return null;
}

// ---------- RBAC ----------
export const RESOURCES = [
  ['dashboard', 'Dashboard'], ['users', 'Admin Users'], ['roles', 'Roles & Permissions'], ['students', 'Students'],
  ['teachers', 'Teachers & Staff'], ['schools', 'Schools'], ['classes', 'Classes'], ['subjects', 'Subjects'],
  ['materials', 'Study Materials'], ['tests', 'Tests & Results'], ['doubts', 'Doubts'], ['certificates', 'Certificates'],
  ['notifications', 'Notifications'], ['reports', 'Reports'], ['settings', 'Website Settings'], ['logs', 'Activity Logs'],
];
export const ALL_PERMISSIONS = RESOURCES.flatMap(([r]) => [`${r}:read`, `${r}:write`]);
const reads = (...r) => r.map((x) => `${x}:read`);
const rw = (...r) => r.flatMap((x) => [`${x}:read`, `${x}:write`]);

export const DEFAULT_ROLES = [
  { id: 'super_admin', name: 'Super Admin', description: 'Full control of everything. Cannot be edited or deleted.', permissions: ['*'], system: true },
  { id: 'admin', name: 'Admin', description: 'Runs the school and website content. Cannot manage admins, roles or settings.',
    permissions: [...reads('dashboard', 'reports', 'logs', 'users', 'roles', 'settings'), ...rw('students', 'teachers', 'schools', 'classes', 'subjects', 'materials', 'tests', 'doubts', 'certificates', 'notifications')], system: false },
  { id: 'teacher', name: 'Teacher', description: 'Edits study material and tests, answers doubts.',
    permissions: [...reads('dashboard', 'students', 'teachers', 'classes', 'subjects', 'certificates', 'reports'), ...rw('materials', 'tests', 'doubts')], system: false },
  { id: 'content_editor', name: 'Content Editor', description: 'Edits study material, subjects and classes only.',
    permissions: [...reads('dashboard'), ...rw('materials', 'subjects', 'classes', 'tests')], system: false },
  { id: 'viewer', name: 'Viewer', description: 'Can look at everything except admin users, roles and logs. Cannot change anything.',
    permissions: reads('dashboard', 'students', 'teachers', 'schools', 'classes', 'subjects', 'materials', 'tests', 'doubts', 'certificates', 'notifications', 'reports'), system: false },
];
export const hasPerm = (perms, p) => perms.includes('*') || perms.includes(p);

// ---------- sessions ----------
export const COOKIE = 'mj_admin';
export function issueSession(res, user) {
  const token = jwt.sign({ uid: user.id, tv: user.tokenVersion || 0 }, JWT_SECRET, { expiresIn: '8h' });
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'strict', secure: IS_PROD, maxAge: 8 * 3600 * 1000, path: '/' });
}
export function readSession(req) {
  try { return jwt.verify(req.cookies?.[COOKIE] || '', JWT_SECRET); } catch { return null; }
}

// ---------- small helpers ----------
export const newId = () => randomUUID();
export const clientIp = (req) => (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
export class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
