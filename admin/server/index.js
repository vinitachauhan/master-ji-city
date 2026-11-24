// Master Ji - Super Admin Panel server (Express). Uses the website's MongoDB through lib/db.mjs.
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { existsSync } from 'node:fs';
import {
  ROOT, IS_PROD, COOKIE, ALL_PERMISSIONS, RESOURCES, DEFAULT_ROLES, hasPerm, hashPassword, verifyPassword, passwordProblem,
  issueSession, readSession, newId, clientIp, HttpError,
} from './core.js';
import { find, insertOne, upsert, remove, source } from '../../lib/db.mjs';
import { mountCrud, logActivity } from './crud.js';
import { resourceMeta, CLASS_LIST, SECTIONS } from './resources.js';

const PORT = Number(process.env.ADMIN_PORT || 5050);
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 'loopback');
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

const api = express.Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Wrap every async handler registered on the API router
for (const m of ['get', 'post', 'put', 'delete']) {
  const orig = api[m].bind(api);
  api[m] = (p, ...handlers) => orig(p, ...handlers.map((h) => (h.length === 4 ? h : wrap(h))));
}

// In production the panel only runs on the real database (never on temporary built-in data)
api.use(async (req, res, next) => {
  if (IS_PROD && (await source()) !== 'mongodb') return res.status(503).json({ error: 'Database not connected - set MONGODB_URI for the admin panel.' });
  next();
});

// CSRF protection: every state-changing request must carry our custom header (browsers cannot add it cross-site)
api.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method) && req.get('x-requested-with') !== 'masterji-admin') {
    return res.status(403).json({ error: 'Missing request header' });
  }
  next();
});

// ---------- roles & users ----------
async function rolesById() {
  const roles = await find('adminRoles');
  return Object.fromEntries(roles.map((r) => [r.id, r]));
}
const publicUser = (u, role) => ({
  id: u.id, name: u.name, email: u.email, roleId: u.roleId, roleName: role?.name || u.roleId, active: u.active !== false,
  mustChangePassword: !!u.mustChangePassword, lastLoginAt: u.lastLoginAt || null, createdAt: u.createdAt || null,
});

async function requireAuth(req, res, next) {
  try {
    const s = readSession(req);
    if (!s) throw new HttpError(401, 'Please log in');
    const [u] = await find('adminUsers', { id: s.uid });
    if (!u || u.active === false || (u.tokenVersion || 0) !== s.tv) { res.clearCookie(COOKIE, { path: '/' }); throw new HttpError(401, 'Session expired - please log in again'); }
    const role = (await rolesById())[u.roleId];
    req.user = { ...publicUser(u, role), permissions: role?.permissions || [] };
    // Until the first-login password change is done, only that endpoint (and me/logout) is allowed
    if (u.mustChangePassword && !['/auth/me', '/auth/change-password', '/auth/logout'].includes(req.path)) throw new HttpError(403, 'Please change your password first');
    next();
  } catch (e) { next(e); }
}
const requirePerm = (perm) => (req, res, next) => (hasPerm(req.user?.permissions || [], perm) ? next() : next(new HttpError(403, 'You do not have permission for this')));
const isSuper = (req) => req.user?.permissions.includes('*');

// ---------- login rate limit ----------
const attempts = new Map();
function loginLimited(key) {
  const now = Date.now();
  const list = (attempts.get(key) || []).filter((t) => now - t < 15 * 60 * 1000);
  attempts.set(key, list);
  return list.length >= 5;
}
const noteFailure = (key) => attempts.set(key, [...(attempts.get(key) || []), Date.now()]);

// ---------- auth ----------
api.post('/auth/login', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const key = `${clientIp(req)}|${email}`;
  if (loginLimited(key)) throw new HttpError(429, 'Too many failed attempts. Try again in 15 minutes.');
  const [u] = await find('adminUsers', { email });
  if (!u || u.active === false || !verifyPassword(password, u.passwordHash)) {
    noteFailure(key);
    await logActivity(req, 'login_failed', 'Auth', email, 'Wrong email or password', { name: email || 'unknown' });
    throw new HttpError(401, 'Wrong email or password');
  }
  attempts.delete(key);
  await upsert('adminUsers', { id: u.id }, { lastLoginAt: new Date() }, { insert: false });
  issueSession(res, u);
  const role = (await rolesById())[u.roleId];
  req.user = { ...publicUser(u, role) };
  await logActivity(req, 'login', 'Auth', u.email, 'Logged in');
  res.json({ user: { ...publicUser(u, role), permissions: role?.permissions || [] } });
});

api.post('/auth/logout', async (req, res) => {
  const s = readSession(req);
  if (s) { const [u] = await find('adminUsers', { id: s.uid }); if (u) { req.user = publicUser(u); await logActivity(req, 'logout', 'Auth', u.email, 'Logged out'); } }
  res.clearCookie(COOKIE, { path: '/' });
  res.json({ ok: true });
});

api.get('/auth/me', requireAuth, (req, res) => res.json({ user: req.user }));

api.post('/auth/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const [u] = await find('adminUsers', { id: req.user.id });
  if (!verifyPassword(String(currentPassword || ''), u.passwordHash)) throw new HttpError(400, 'Current password is wrong');
  const problem = passwordProblem(newPassword);
  if (problem) throw new HttpError(400, problem);
  if (newPassword === currentPassword) throw new HttpError(400, 'New password must be different');
  const tv = (u.tokenVersion || 0) + 1;
  await upsert('adminUsers', { id: u.id }, { passwordHash: hashPassword(newPassword), mustChangePassword: false, tokenVersion: tv, passwordChangedAt: new Date() }, { insert: false });
  issueSession(res, { ...u, tokenVersion: tv });
  await logActivity(req, 'password_change', 'Auth', u.email, 'Changed own password');
  res.json({ ok: true });
});

// ---------- meta (forms & tables are built from this) ----------
api.get('/meta', requireAuth, async (req, res) => {
  res.json({ resources: resourceMeta(), permissions: ALL_PERMISSIONS, sections: RESOURCES, dataSource: await source() });
});

// ---------- admin users ----------
api.get('/users', requireAuth, requirePerm('users:read'), async (req, res) => {
  const roles = await rolesById();
  const users = (await find('adminUsers')).map((u) => publicUser(u, roles[u.roleId])).sort((a, b) => a.name.localeCompare(b.name));
  res.json({ rows: users });
});

async function superAdminCount(exceptId) {
  return (await find('adminUsers', { roleId: 'super_admin' })).filter((u) => u.active !== false && u.id !== exceptId).length;
}

api.post('/users', requireAuth, requirePerm('users:write'), async (req, res) => {
  const name = String(req.body?.name || '').trim().slice(0, 80);
  const email = String(req.body?.email || '').trim().toLowerCase();
  const roleId = String(req.body?.roleId || '');
  const password = String(req.body?.password || '');
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, 'Name and a valid email are required');
  const roles = await rolesById();
  if (!roles[roleId]) throw new HttpError(400, 'Choose a valid role');
  if (roleId === 'super_admin' && !isSuper(req)) throw new HttpError(403, 'Only a Super Admin can create another Super Admin');
  const problem = passwordProblem(password);
  if (problem) throw new HttpError(400, problem);
  if ((await find('adminUsers', { email })).length) throw new HttpError(409, 'This email is already used');
  const u = { id: newId(), name, email, roleId, active: req.body?.active !== false, passwordHash: hashPassword(password), mustChangePassword: true, tokenVersion: 0, createdAt: new Date(), createdBy: req.user.email };
  await insertOne('adminUsers', u);
  await logActivity(req, 'create', 'Admin Users', email, `Created ${name} as ${roles[roleId].name}`);
  res.status(201).json({ user: publicUser(u, roles[roleId]) });
});

api.put('/users/:id', requireAuth, requirePerm('users:write'), async (req, res) => {
  const [u] = await find('adminUsers', { id: req.params.id });
  if (!u) throw new HttpError(404, 'User not found');
  const roles = await rolesById();
  const changes = {};
  if (req.body?.name !== undefined) changes.name = String(req.body.name).trim().slice(0, 80) || u.name;
  if (req.body?.roleId !== undefined && req.body.roleId !== u.roleId) {
    if (!roles[req.body.roleId]) throw new HttpError(400, 'Choose a valid role');
    if ((req.body.roleId === 'super_admin' || u.roleId === 'super_admin') && !isSuper(req)) throw new HttpError(403, 'Only a Super Admin can change Super Admin roles');
    if (u.roleId === 'super_admin' && (await superAdminCount(u.id)) === 0) throw new HttpError(400, 'There must be at least one active Super Admin');
    changes.roleId = req.body.roleId;
  }
  if (req.body?.active !== undefined) {
    const active = req.body.active === true;
    if (!active && u.id === req.user.id) throw new HttpError(400, 'You cannot deactivate yourself');
    if (!active && u.roleId === 'super_admin' && (await superAdminCount(u.id)) === 0) throw new HttpError(400, 'There must be at least one active Super Admin');
    changes.active = active;
  }
  if (req.body?.password) {
    if (u.roleId === 'super_admin' && !isSuper(req)) throw new HttpError(403, 'Only a Super Admin can reset a Super Admin password');
    const problem = passwordProblem(req.body.password);
    if (problem) throw new HttpError(400, problem);
    changes.passwordHash = hashPassword(req.body.password);
    changes.mustChangePassword = true;
  }
  if (changes.roleId || changes.active === false || changes.passwordHash) changes.tokenVersion = (u.tokenVersion || 0) + 1; // log them out
  await upsert('adminUsers', { id: u.id }, { ...changes, updatedAt: new Date() }, { insert: false });
  const what = Object.keys(changes).filter((k) => !['tokenVersion', 'passwordHash'].includes(k)).concat(changes.passwordHash ? ['password reset'] : []);
  await logActivity(req, 'update', 'Admin Users', u.email, `Changed: ${what.join(', ')}`);
  const [fresh] = await find('adminUsers', { id: u.id });
  res.json({ user: publicUser(fresh, roles[fresh.roleId]) });
});

api.delete('/users/:id', requireAuth, requirePerm('users:write'), async (req, res) => {
  const [u] = await find('adminUsers', { id: req.params.id });
  if (!u) throw new HttpError(404, 'User not found');
  if (u.id === req.user.id) throw new HttpError(400, 'You cannot delete yourself');
  if (u.roleId === 'super_admin') {
    if (!isSuper(req)) throw new HttpError(403, 'Only a Super Admin can delete a Super Admin');
    if ((await superAdminCount(u.id)) === 0) throw new HttpError(400, 'There must be at least one active Super Admin');
  }
  await remove('adminUsers', { id: u.id });
  await logActivity(req, 'delete', 'Admin Users', u.email, `Deleted ${u.name}`);
  res.json({ ok: true });
});

// ---------- roles ----------
api.get('/roles', requireAuth, requirePerm('roles:read'), async (req, res) => {
  const users = await find('adminUsers');
  const roles = (await find('adminRoles')).map((r) => ({ ...r, userCount: users.filter((u) => u.roleId === r.id).length }));
  roles.sort((a, b) => (b.system ? 1 : 0) - (a.system ? 1 : 0) || a.name.localeCompare(b.name));
  res.json({ rows: roles });
});
const cleanPerms = (p) => [...new Set((Array.isArray(p) ? p : []).filter((x) => ALL_PERMISSIONS.includes(x)))];

api.post('/roles', requireAuth, requirePerm('roles:write'), async (req, res) => {
  const name = String(req.body?.name || '').trim().slice(0, 60);
  if (!name) throw new HttpError(400, 'Role name is required');
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || newId();
  if ((await find('adminRoles', { id })).length) throw new HttpError(409, 'A role with this name already exists');
  const role = { id, name, description: String(req.body?.description || '').slice(0, 300), permissions: cleanPerms(req.body?.permissions), system: false, createdAt: new Date() };
  await insertOne('adminRoles', role);
  await logActivity(req, 'create', 'Roles', id, `Created role ${name} (${role.permissions.length} permissions)`);
  res.status(201).json({ role });
});

api.put('/roles/:id', requireAuth, requirePerm('roles:write'), async (req, res) => {
  const [r] = await find('adminRoles', { id: req.params.id });
  if (!r) throw new HttpError(404, 'Role not found');
  if (r.system) throw new HttpError(400, 'The Super Admin role cannot be changed');
  const changes = {};
  if (req.body?.name !== undefined) changes.name = String(req.body.name).trim().slice(0, 60) || r.name;
  if (req.body?.description !== undefined) changes.description = String(req.body.description).slice(0, 300);
  if (req.body?.permissions !== undefined) changes.permissions = cleanPerms(req.body.permissions);
  await upsert('adminRoles', { id: r.id }, { ...changes, updatedAt: new Date() }, { insert: false });
  await logActivity(req, 'update', 'Roles', r.id, `Updated role ${changes.name || r.name}${changes.permissions ? ` (${changes.permissions.length} permissions)` : ''}`);
  res.json({ ok: true });
});

api.delete('/roles/:id', requireAuth, requirePerm('roles:write'), async (req, res) => {
  const [r] = await find('adminRoles', { id: req.params.id });
  if (!r) throw new HttpError(404, 'Role not found');
  if (r.system) throw new HttpError(400, 'The Super Admin role cannot be deleted');
  if ((await find('adminUsers', { roleId: r.id })).length) throw new HttpError(400, 'Move the users in this role to another role first');
  await remove('adminRoles', { id: r.id });
  await logActivity(req, 'delete', 'Roles', r.id, `Deleted role ${r.name}`);
  res.json({ ok: true });
});

// ---------- settings (read by the website too) ----------
export const DEFAULT_SETTINGS = {
  siteName: 'Master Ji - City', tagline: 'Play School to College - COMPLETE Study', contactEmail: '', contactPhone: '', address: '',
  doubtSolverEnabled: true, doubtLimitPer10Min: 8, mockTestEnabled: true, certificateStars: 100, maintenanceBanner: '',
};
api.get('/settings', requireAuth, requirePerm('settings:read'), async (req, res) => {
  const [s] = await find('settings', { key: 'site' });
  res.json({ settings: { ...DEFAULT_SETTINGS, ...(s || {}), key: undefined, _id: undefined } });
});
api.put('/settings', requireAuth, requirePerm('settings:write'), async (req, res) => {
  const b = req.body || {};
  const str = (v, n) => String(v ?? '').trim().slice(0, n);
  const int = (v, lo, hi, d) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d; };
  const s = {
    siteName: str(b.siteName, 80) || DEFAULT_SETTINGS.siteName, tagline: str(b.tagline, 160), contactEmail: str(b.contactEmail, 120),
    contactPhone: str(b.contactPhone, 20), address: str(b.address, 300), maintenanceBanner: str(b.maintenanceBanner, 300),
    doubtSolverEnabled: b.doubtSolverEnabled !== false, mockTestEnabled: b.mockTestEnabled !== false,
    doubtLimitPer10Min: int(b.doubtLimitPer10Min, 1, 100, 8), certificateStars: int(b.certificateStars, 10, 10000, 100),
  };
  if (s.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.contactEmail)) throw new HttpError(400, 'Contact email is not valid');
  await upsert('settings', { key: 'site' }, { ...s, updatedAt: new Date(), updatedBy: req.user.email });
  await logActivity(req, 'update', 'Website Settings', 'site', `Doubt solver ${s.doubtSolverEnabled ? 'on' : 'off'}, mock test ${s.mockTestEnabled ? 'on' : 'off'}, certificate at ${s.certificateStars} stars`);
  res.json({ settings: s });
});

// ---------- dashboard & reports ----------
const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0);
const countBy = (rows, f) => rows.reduce((acc, r) => { const k = typeof f === 'function' ? f(r) : r[f]; if (k !== undefined && k !== null && k !== '') acc[k] = (acc[k] || 0) + 1; return acc; }, {});

api.get('/dashboard', requireAuth, requirePerm('dashboard:read'), async (req, res) => {
  const [students, staff, schools, s18, s912, col, doubts, certs, mock, results, admins, notes] = await Promise.all(
    ['students', 'staff', 'schools', 'study_1_8', 'study_9_12', 'collegeStudy', 'doubts', 'certificates', 'mockResults', 'results', 'adminUsers', 'notifications'].map((c) => find(c)));
  const today = dayKey(new Date());
  const att = await find('attendance', { date: today, personType: 'student' });
  const logs = hasPerm(req.user.permissions, 'logs:read') ? (await find('activityLogs', {}, { sort: { at: -1 }, limit: 8 })) : [];
  const now = Date.now();
  res.json({
    counts: {
      students: students.length, teachers: staff.filter((s) => s.role === 'Teacher').length, staff: staff.length, schools: schools.length,
      chapters: s18.length + s912.length, collegeUnits: col.length, doubts: doubts.length, doubtsToReview: doubts.filter((d) => !d.reviewed).length,
      certificates: certs.length, mockTests: mock.length, bestSubjectTests: results.length, admins: admins.length,
    },
    attendanceToday: { marked: att.length, present: att.filter((a) => a.status === 'Present').length, total: students.length },
    doubtsLast7: Array.from({ length: 7 }, (_, i) => { const d = dayKey(now - (6 - i) * 864e5); return { day: d, count: doubts.filter((x) => x.createdAt && dayKey(x.createdAt) === d).length }; }),
    adminNotices: notes.filter((n) => n.active !== false && ['admins', 'all'].includes(n.audience)).slice(0, 5),
    recentActivity: logs,
    dataSource: await source(),
  });
});

api.get('/reports', requireAuth, requirePerm('reports:read'), async (req, res) => {
  const [mock, results, doubts, stars, students, fees, att] = await Promise.all(['mockResults', 'results', 'doubts', 'stars', 'students', 'feePayments', 'attendance'].map((c) => find(c)));
  const month = dayKey(new Date()).slice(0, 7);
  const now = Date.now();
  const since30 = dayKey(now - 30 * 864e5);
  const studentAtt = att.filter((a) => a.personType === 'student' && a.date >= since30);
  const bySubject = Object.entries(mock.reduce((acc, m) => ((acc[m.subject] ||= []).push(m.percent), acc), {}))
    .map(([subject, arr]) => ({ subject, attempts: arr.length, avgPercent: avg(arr) })).sort((a, b) => b.attempts - a.attempts);
  const feesThisMonth = fees.filter((f) => f.month === month);
  res.json({
    mockBySubject: bySubject,
    mockByClass: Object.entries(countBy(mock, 'class')).map(([k, v]) => ({ label: `Class ${k}`, value: v })),
    streams: Object.entries(countBy(results, 'recommendedStream')).map(([k, v]) => ({ label: k, value: v })),
    bestSubjects: Object.entries(countBy(results, 'bestSubject')).map(([k, v]) => ({ label: k, value: v })),
    doubtsBySource: Object.entries(countBy(doubts, (d) => (d.source === 'ai' ? 'AI answer' : 'Built-in notes'))).map(([k, v]) => ({ label: k, value: v })),
    doubtsLast14: Array.from({ length: 14 }, (_, i) => { const d = dayKey(now - (13 - i) * 864e5); return { label: d.slice(5), value: doubts.filter((x) => x.createdAt && dayKey(x.createdAt) === d).length }; }),
    attendance30: { records: studentAtt.length, presentPercent: studentAtt.length ? Math.round((studentAtt.filter((a) => a.status === 'Present').length / studentAtt.length) * 100) : 0 },
    feesThisMonth: { month, collected: feesThisMonth.reduce((t, f) => t + (f.amount || 0), 0), expected: students.reduce((t, s) => t + (s.monthlyFee || 0), 0), paidStudents: feesThisMonth.length, students: students.length },
    topStars: [...stars].sort((a, b) => b.stars - a.stars).slice(0, 10).map((s) => ({ name: s.name, class: s.class, city: s.city, stars: s.stars })),
  });
});

// Admin-audience notifications for the top bar
api.get('/my-notices', requireAuth, async (req, res) => {
  const now = new Date();
  const rows = (await find('notifications')).filter((n) => n.active !== false && ['admins', 'all'].includes(n.audience)
    && (!n.startsAt || new Date(n.startsAt) <= now) && (!n.endsAt || new Date(`${String(n.endsAt).slice(0, 10)}T23:59:59`) >= now));
  res.json({ rows: rows.slice(0, 10) });
});

// ---------- Classes & Sections ----------
const classOrder = (k) => CLASS_LIST.indexOf(k);
const levelOf = (k) => (classOrder(k) <= classOrder('8') ? 'Play School - 8' : '9 - 12');
const classDisplay = (k) => (/^\d+$/.test(k) ? `Class ${k}` : k);

async function classDoc(classKey) {
  const [doc] = await find('classes', { classKey });
  return doc || null;
}

// Every class with its sections and how many students / teachers / materials each section has
api.get('/sections/overview', requireAuth, requirePerm('classes:read'), async (req, res) => {
  const [classes, students, teachers, mats, staff] = await Promise.all(['classes', 'students', 'sectionTeachers', 'sectionMaterials', 'staff'].map((c) => find(c)));
  const staffName = Object.fromEntries(staff.map((s) => [s.id, s.name]));
  const keys = [...new Set([...classes.map((c) => c.classKey).filter(Boolean), ...students.map((s) => s.class)])].filter((k) => CLASS_LIST.includes(k)).sort((a, b) => classOrder(a) - classOrder(b));
  const rows = keys.map((k) => {
    const doc = classes.find((c) => c.classKey === k);
    const secs = [...new Set([...(doc?.sections || []), ...students.filter((s) => s.class === k).map((s) => s.section || 'A'),
      ...teachers.filter((t) => t.class === k).map((t) => t.section), ...mats.filter((m) => m.class === k).map((m) => m.section)])].filter(Boolean).sort();
    return {
      classKey: k, name: doc?.name || classDisplay(k), classId: doc?.id || null, level: doc?.level || levelOf(k),
      sections: secs.map((sec) => {
        const ct = teachers.find((t) => t.class === k && t.section === sec && t.isClassTeacher);
        return {
          section: sec,
          students: students.filter((s) => s.class === k && (s.section || 'A') === sec).length,
          teachers: teachers.filter((t) => t.class === k && t.section === sec).length,
          materials: mats.filter((m) => m.class === k && m.section === sec).length,
          classTeacher: ct ? staffName[ct.teacherId] || null : null,
        };
      }),
    };
  });
  res.json({ rows, allClasses: CLASS_LIST, allSections: SECTIONS });
});

api.post('/sections', requireAuth, requirePerm('classes:write'), async (req, res) => {
  const classKey = String(req.body?.classKey || ''); const section = String(req.body?.section || '').toUpperCase();
  if (!CLASS_LIST.includes(classKey)) throw new HttpError(400, 'Choose a valid class');
  if (!SECTIONS.includes(section)) throw new HttpError(400, `Section must be one of ${SECTIONS.join(', ')}`);
  const doc = await classDoc(classKey);
  if (doc) {
    if ((doc.sections || []).includes(section)) throw new HttpError(409, `${classDisplay(classKey)}-${section} already exists`);
    await upsert('classes', { id: doc.id }, { sections: [...(doc.sections || []), section].sort(), updatedAt: new Date() }, { insert: false });
  } else {
    await insertOne('classes', { id: newId(), classKey, name: classDisplay(classKey), level: levelOf(classKey), sections: [section], order: classOrder(classKey), createdAt: new Date() });
  }
  await upsert('meta', { key: 'adminEdited:classes' }, { at: new Date() });
  await logActivity(req, 'create', 'Sections', `${classKey}-${section}`, `Added section ${section} to ${classDisplay(classKey)}`);
  res.status(201).json({ ok: true });
});

api.delete('/sections/:classKey/:section', requireAuth, requirePerm('classes:write'), async (req, res) => {
  const { classKey, section } = req.params;
  const [st, te, ma] = await Promise.all([
    find('students', { class: classKey }).then((r) => r.filter((s) => (s.section || 'A') === section).length),
    find('sectionTeachers', { class: classKey, section }).then((r) => r.length),
    find('sectionMaterials', { class: classKey, section }).then((r) => r.length),
  ]);
  if (st || te || ma) throw new HttpError(400, `Move or remove its ${st} students, ${te} teacher assignments and ${ma} materials first`);
  const doc = await classDoc(classKey);
  if (doc) await upsert('classes', { id: doc.id }, { sections: (doc.sections || []).filter((s) => s !== section), updatedAt: new Date() }, { insert: false });
  await logActivity(req, 'delete', 'Sections', `${classKey}-${section}`, `Removed section ${section} from ${classDisplay(classKey)}`);
  res.json({ ok: true });
});

// Move one or more students to another section of the same class
api.post('/sections/move-students', requireAuth, requirePerm('students:write'), async (req, res) => {
  const ids = Array.isArray(req.body?.studentIds) ? req.body.studentIds.map(String).slice(0, 500) : [];
  const toSection = String(req.body?.toSection || '').toUpperCase();
  if (!ids.length) throw new HttpError(400, 'Choose at least one student');
  if (!SECTIONS.includes(toSection)) throw new HttpError(400, 'Choose a valid section');
  let moved = 0;
  for (const id of ids) if (await upsert('students', { id }, { section: toSection, updatedAt: new Date(), updatedBy: req.user.email }, { insert: false })) moved++;
  await logActivity(req, 'update', 'Students', ids.length === 1 ? ids[0] : `${ids.length} students`, `Moved ${moved} student(s) to section ${toSection}`);
  res.json({ moved });
});

// Generic CRUD for every other section
mountCrud(api, { requireAuth, requirePerm });

api.use((req, res) => res.status(404).json({ error: 'Not found' }));
api.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  if (status >= 500) console.error('[admin]', err);
  res.status(status).json({ error: status >= 500 ? 'Server error - please try again' : err.message });
});
app.use('/api', api);

// ---------- first run: default roles, Super Admin, ids for old data ----------
async function bootstrap() {
  if (IS_PROD && (await source()) !== 'mongodb') { console.warn('[admin] MongoDB not connected - skipping setup (the API answers 503 until it is).'); return; }
  for (const r of DEFAULT_ROLES) if (!(await find('adminRoles', { id: r.id })).length) await insertOne('adminRoles', { ...r, createdAt: new Date() });
  if (!(await find('adminUsers')).length) {
    const email = String(process.env.SUPER_ADMIN_EMAIL || '').trim().toLowerCase();
    const password = process.env.SUPER_ADMIN_PASSWORD || '';
    if (!email || passwordProblem(password)) {
      console.warn('[admin] No admin users yet. Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD (8+ chars, letters + numbers) in .env.local and restart.');
    } else {
      await insertOne('adminUsers', { id: newId(), name: 'Super Admin', email, roleId: 'super_admin', active: true, passwordHash: hashPassword(password), mustChangePassword: true, tokenVersion: 0, createdAt: new Date(), createdBy: 'setup' });
      await insertOne('activityLogs', { id: newId(), at: new Date(), actorName: 'system', action: 'create', entity: 'Admin Users', entityKey: email, summary: 'Super Admin created on first start', ip: '' });
      console.log(`[admin] Super Admin created: ${email} (you will be asked to change the password on first login)`);
    }
  }
  // Classes: create one record per class (with the sections its students already use) the first time
  if (!(await find('classes')).length) {
    const students = await find('students');
    for (const k of CLASS_LIST) {
      const secs = [...new Set(students.filter((s) => s.class === k).map((s) => s.section || 'A'))].sort();
      await insertOne('classes', { id: newId(), classKey: k, name: /^\d+$/.test(k) ? `Class ${k}` : k, level: CLASS_LIST.indexOf(k) <= CLASS_LIST.indexOf('8') ? 'Play School - 8' : '9 - 12', sections: secs.length ? secs : ['A'], order: CLASS_LIST.indexOf(k), createdAt: new Date() });
    }
  }
  // Older doubts / test results have no id - give them one so they can be managed
  for (const c of ['doubts', 'results']) {
    for (const d of await find(c, { id: { $exists: false } })) {
      const f = c === 'doubts' ? { name: d.name, question: d.question, id: { $exists: false } } : { studentName: d.studentName, id: { $exists: false } };
      await upsert(c, f, { id: newId() }, { insert: false });
    }
  }
}

// ---------- React app: Vite in development, built files in production ----------
const clientRoot = path.resolve(ROOT, 'admin');
if (IS_PROD) {
  const dist = path.join(clientRoot, 'dist');
  if (!existsSync(dist)) throw new Error('Run "npm run build" in the admin folder first.');
  app.use(express.static(dist, { index: false, maxAge: '1h' }));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({ root: clientRoot, server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}

await bootstrap();
app.listen(PORT, () => {
  console.log(`[admin] Master Ji Admin Panel → http://localhost:${PORT}`);
  source().then((s) => { if (s !== 'mongodb') console.warn('[admin] WARNING: MongoDB not reachable - running on temporary built-in data. Changes are NOT saved and do NOT reach the website.'); });
});
