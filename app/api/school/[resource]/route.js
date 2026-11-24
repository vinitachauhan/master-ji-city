import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { find, insertOne, upsert, remove } from '@/lib/db.mjs';
import { checkPin, adminPin } from '@/lib/schoolAuth.mjs';
import { SCHOOL_COLLECTIONS, ymd, ym } from '@/lib/schoolDemo.mjs';

export const dynamic = 'force-dynamic';

const STATUSES = ['Present', 'Absent', 'Leave'];
const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
const CLASS_ORDER = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const byClassSection = (a, b) => (CLASS_ORDER.indexOf(a.class) - CLASS_ORDER.indexOf(b.class)) || String(a.section || 'A').localeCompare(String(b.section || 'A')) || ((a.rollNo || 0) - (b.rollNo || 0));
const RATINGS = ['Best', 'Good', 'Average', 'Needs Improvement'];
const ROLES = ['Teacher', 'Staff', 'Manager'];
const isMonth = (m) => /^\d{4}-(0[1-9]|1[0-2])$/.test(m || '');
const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d || '');
const str = (v, n = 100) => String(v ?? '').trim().slice(0, n);
const money = (v) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n >= 0 && n <= 10_000_000 ? n : null; };
const bad = (msg, status = 400) => NextResponse.json({ error: msg }, { status });
const ok = (data) => NextResponse.json(data);
const byId = (rows) => Object.fromEntries(rows.map((r) => [r.id, r]));

// ---------------- People ----------------
const people = (col) => ({
  async GET(q) {
    const filter = {};
    if (q.get('class')) filter.class = q.get('class');
    if (q.get('section')) filter.section = q.get('section');
    if (q.get('role')) filter.role = q.get('role');
    const rows = await find(col, filter, { sort: col === 'students' ? { rollNo: 1 } : { name: 1 } });
    if (col === 'students') rows.sort(byClassSection);
    return ok({ rows });
  },
  async POST(_q, b) {
    const doc = col === 'students'
      ? { name: str(b.name, 60), class: str(b.class, 20), section: SECTIONS.includes(b.section) ? b.section : 'A', rollNo: Number(b.rollNo) || 0, guardianName: str(b.guardianName, 80), guardianPhone: str(b.guardianPhone, 15), monthlyFee: money(b.monthlyFee) }
      : { name: str(b.name, 60), role: ROLES.includes(b.role) ? b.role : null, designation: str(b.designation, 60), phone: str(b.phone, 15), monthlySalary: money(b.monthlySalary) };
    if (!doc.name) return bad('Name is required');
    if (col === 'students' && (!doc.class || doc.monthlyFee === null)) return bad('Class and monthly fee are required');
    if (col === 'staff' && (!doc.role || doc.monthlySalary === null)) return bad('Role and monthly salary are required');
    if (b.id) {
      const found = await upsert(col, { id: str(b.id) }, doc, { insert: false });
      return found ? ok({ id: b.id }) : bad('Not found', 404);
    }
    const id = randomUUID();
    await insertOne(col, { id, ...doc, createdAt: new Date() });
    return ok({ id });
  },
  async DELETE(q) {
    const id = q.get('id');
    if (!id) return bad('id is required');
    await remove(col, { id });
    if (col === 'students') {
      await Promise.all([remove('attendance', { personType: 'student', personId: id }), remove('feePayments', { studentId: id }),
        remove('activityPayments', { studentId: id }), remove('parentMeetings', { studentId: id })]);
    } else {
      await Promise.all([remove('attendance', { personType: 'staff', personId: id }), remove('salaryPayments', { staffId: id })]);
    }
    return ok({ deleted: id });
  },
});

// ---------------- Attendance ----------------
const attendance = {
  async GET(q) {
    const type = q.get('type') === 'staff' ? 'staff' : 'student';
    if (q.get('summary')) {
      const from = q.get('from'); const to = q.get('to');
      if (!isDate(from) || !isDate(to)) return bad('from and to dates are required');
      const recs = await find('attendance', { personType: type, date: { $gte: from, $lte: to } });
      const sum = {};
      for (const r of recs) {
        const s = (sum[r.personId] ||= { Present: 0, Absent: 0, Leave: 0, total: 0 });
        s[r.status] += 1; s.total += 1;
      }
      const workingDays = new Set(recs.map((r) => r.date)).size;
      return ok({ type, from, to, workingDays, summary: sum });
    }
    const date = q.get('date');
    if (!isDate(date)) return bad('date is required (YYYY-MM-DD)');
    const recs = await find('attendance', { personType: type, date });
    return ok({ type, date, records: Object.fromEntries(recs.map((r) => [r.personId, r.status])) });
  },
  async POST(_q, b) {
    const type = b.type === 'staff' ? 'staff' : 'student';
    if (!isDate(b.date)) return bad('date is required');
    if (b.date > ymd(new Date())) return bad('Attendance cannot be marked for a future date');
    const recs = Array.isArray(b.records) ? b.records.slice(0, 2000) : [];
    let saved = 0;
    for (const r of recs) {
      if (!STATUSES.includes(r.status) || !r.personId) continue;
      await upsert('attendance', { date: b.date, personType: type, personId: str(r.personId) }, { status: r.status, updatedAt: new Date() });
      saved++;
    }
    return ok({ saved });
  },
};

// ---------------- Parent / Guardian meetings ----------------
const meetings = {
  async GET(q) {
    const filter = q.get('studentId') ? { studentId: q.get('studentId') } : {};
    return ok({ rows: await find('parentMeetings', filter, { sort: { date: -1 } }) });
  },
  async POST(_q, b) {
    if (!b.studentId || !isDate(b.date)) return bad('Student and date are required');
    const doc = {
      studentId: str(b.studentId), date: b.date, title: str(b.title, 80) || 'Parent-Teacher Meeting',
      attended: !!b.attended, attendedBy: b.attended ? str(b.attendedBy, 80) : '',
      rating: RATINGS.includes(b.rating) ? b.rating : 'Good',
      teacherNote: str(b.teacherNote, 1000), parentFeedback: str(b.parentFeedback, 1000), updatedAt: new Date(),
    };
    const id = b.id ? str(b.id) : randomUUID();
    await upsert('parentMeetings', { id }, doc);
    return ok({ id });
  },
  async DELETE(q) { await remove('parentMeetings', { id: q.get('id') || '-' }); return ok({ ok: true }); },
};

// ---------------- Salary ----------------
const salary = {
  async GET(q) {
    const staff = await find('staff', {}, { sort: { name: 1 } });
    const year = q.get('year');
    if (year) {
      if (!/^\d{4}$/.test(year)) return bad('Invalid year');
      const pays = await find('salaryPayments', { month: { $gte: `${year}-01`, $lte: `${year}-12` } });
      const rows = staff.map((s) => {
        const mine = pays.filter((p) => p.staffId === s.id);
        return { staff: s, yearlySalary: s.monthlySalary * 12, paidMonths: mine.map((p) => p.month).sort(), paidTotal: mine.reduce((a, p) => a + p.amount, 0) };
      });
      return ok({ year, rows });
    }
    const month = q.get('month');
    if (!isMonth(month)) return bad('month is required (YYYY-MM)');
    const pays = await find('salaryPayments', { month });
    const map = Object.fromEntries(pays.map((p) => [p.staffId, p]));
    return ok({ month, rows: staff.map((s) => ({ staff: s, payment: map[s.id] || null })) });
  },
  async POST(_q, b) {
    if (!b.staffId || !isMonth(b.month)) return bad('Staff and month are required');
    const [s] = await find('staff', { id: str(b.staffId) });
    if (!s) return bad('Staff not found', 404);
    const amount = money(b.amount ?? s.monthlySalary);
    if (amount === null) return bad('Invalid amount');
    await upsert('salaryPayments', { staffId: s.id, month: b.month }, { amount, paidOn: isDate(b.paidOn) ? b.paidOn : ymd(new Date()), mode: str(b.mode, 30) || 'Cash' });
    return ok({ ok: true });
  },
  async DELETE(q) { await remove('salaryPayments', { staffId: q.get('staffId') || '-', month: q.get('month') || '-' }); return ok({ ok: true }); },
};

// ---------------- Student fees ----------------
const fees = {
  async GET(q) {
    const month = q.get('month');
    if (!isMonth(month)) return bad('month is required (YYYY-MM)');
    const filter = q.get('class') ? { class: q.get('class') } : {};
    if (q.get('section')) filter.section = q.get('section');
    const students = (await find('students', filter, { sort: { rollNo: 1 } })).sort(byClassSection);
    const pays = await find('feePayments', { month });
    const map = Object.fromEntries(pays.map((p) => [p.studentId, p]));
    return ok({ month, rows: students.map((s) => ({ student: s, payment: map[s.id] || null })) });
  },
  async POST(_q, b) {
    if (!b.studentId || !isMonth(b.month)) return bad('Student and month are required');
    const [s] = await find('students', { id: str(b.studentId) });
    if (!s) return bad('Student not found', 404);
    const amount = money(b.amount ?? s.monthlyFee);
    if (amount === null) return bad('Invalid amount');
    await upsert('feePayments', { studentId: s.id, month: b.month }, { amount, paidOn: isDate(b.paidOn) ? b.paidOn : ymd(new Date()), mode: str(b.mode, 30) || 'Cash' });
    return ok({ ok: true });
  },
  async DELETE(q) { await remove('feePayments', { studentId: q.get('studentId') || '-', month: q.get('month') || '-' }); return ok({ ok: true }); },
};

// ---------------- Other activities ----------------
const eligible = (a, students) => students.filter((s) => !a.classes?.length || a.classes.includes(s.class));
const activities = {
  async GET(q) {
    const [acts, students, pays] = await Promise.all([find('activities', {}, { sort: { date: -1 } }), find('students', {}, { sort: { rollNo: 1 } }), find('activityPayments')]);
    const id = q.get('id');
    if (id) {
      const a = acts.find((x) => x.id === id);
      if (!a) return bad('Activity not found', 404);
      const map = Object.fromEntries(pays.filter((p) => p.activityId === id).map((p) => [p.studentId, p]));
      return ok({ activity: a, rows: eligible(a, students).map((s) => ({ student: s, payment: map[s.id] || null })) });
    }
    return ok({
      rows: acts.map((a) => {
        const el = eligible(a, students);
        const paid = pays.filter((p) => p.activityId === a.id && el.some((s) => s.id === p.studentId));
        return { ...a, students: el.length, paidCount: paid.length, pendingCount: el.length - paid.length, collected: paid.reduce((t, p) => t + p.amount, 0), pendingAmount: (el.length - paid.length) * a.amount };
      }),
    });
  },
  async POST(q, b) {
    if (q.get('pay')) {
      const [a] = await find('activities', { id: str(b.activityId) });
      if (!a || !b.studentId) return bad('Activity and student are required');
      await upsert('activityPayments', { activityId: a.id, studentId: str(b.studentId) }, { amount: a.amount, paidOn: ymd(new Date()) });
      return ok({ ok: true });
    }
    const amount = money(b.amount);
    if (!str(b.name) || !amount) return bad('Name and amount are required');
    const id = randomUUID();
    await insertOne('activities', { id, name: str(b.name, 80), amount, date: isDate(b.date) ? b.date : ymd(new Date()), classes: Array.isArray(b.classes) ? b.classes.map((c) => str(c, 20)).slice(0, 20) : [], createdAt: new Date() });
    return ok({ id });
  },
  async DELETE(q) {
    if (q.get('studentId')) { await remove('activityPayments', { activityId: q.get('activityId') || '-', studentId: q.get('studentId') }); return ok({ ok: true }); }
    const id = q.get('id') || '-';
    await Promise.all([remove('activities', { id }), remove('activityPayments', { activityId: id })]);
    return ok({ ok: true });
  },
};

// ---------------- Dashboard summary ----------------
const summary = {
  async GET() {
    const now = new Date(); const today = ymd(now); const month = ym(now);
    const [students, staff, att, fp, sp] = await Promise.all([
      find('students'), find('staff'), find('attendance', { date: today }), find('feePayments', { month }), find('salaryPayments', { month }),
    ]);
    const acts = (await activities.GET(new URLSearchParams()).then((r) => r.json())).rows;
    const count = (type, st) => att.filter((a) => a.personType === type && a.status === st).length;
    return ok({
      today, month, pinIsDefault: adminPin() === '1234',
      students: students.length, staff: staff.length,
      attendanceToday: {
        student: { Present: count('student', 'Present'), Absent: count('student', 'Absent'), Leave: count('student', 'Leave'), marked: att.filter((a) => a.personType === 'student').length },
        staff: { Present: count('staff', 'Present'), Absent: count('staff', 'Absent'), Leave: count('staff', 'Leave'), marked: att.filter((a) => a.personType === 'staff').length },
      },
      // Today's attendance for every Class-Section
      byClassSection: Object.values(students.reduce((acc, st) => {
        const key = `${st.class}|${st.section || 'A'}`;
        const row = (acc[key] ||= { class: st.class, section: st.section || 'A', students: 0, Present: 0, Absent: 0, Leave: 0, notMarked: 0 });
        const a = att.find((x) => x.personType === 'student' && x.personId === st.id);
        row.students += 1;
        if (a) row[a.status] += 1; else row.notMarked += 1;
        return acc;
      }, {})).sort(byClassSection),
      fees: { expected: students.reduce((t, s) => t + s.monthlyFee, 0), collected: fp.reduce((t, p) => t + p.amount, 0), paidCount: fp.length, pendingCount: students.length - students.filter((s) => fp.some((p) => p.studentId === s.id)).length },
      salary: { total: staff.reduce((t, s) => t + s.monthlySalary, 0), paid: sp.reduce((t, p) => t + p.amount, 0), paidCount: sp.length, pendingCount: staff.length - staff.filter((s) => sp.some((p) => p.staffId === s.id)).length },
      activities: { pendingAmount: acts.reduce((t, a) => t + a.pendingAmount, 0), collected: acts.reduce((t, a) => t + a.collected, 0), count: acts.length },
    });
  },
};

// ---------------- Reset (delete all school records) ----------------
const reset = {
  async POST(_q, b) {
    if (b.confirm !== 'DELETE') return bad('Send { "confirm": "DELETE" }');
    for (const c of SCHOOL_COLLECTIONS) await remove(c, {});
    return ok({ ok: true });
  },
};

const HANDLERS = { students: people('students'), staff: people('staff'), attendance, meetings, salary, fees, activities, summary, reset };

async function handle(method, req, { params }) {
  if (!adminPin()) return bad('ADMIN_PIN is not set on the server', 503);
  if (!checkPin(req)) return bad('Wrong or missing admin PIN', 401);
  const h = HANDLERS[params.resource]?.[method];
  if (!h) return bad('Not found', 404);
  const q = new URL(req.url).searchParams;
  let body = {};
  if (method === 'POST') { try { body = await req.json(); } catch { return bad('Invalid JSON'); } }
  return h(q, body || {});
}

export const GET = (req, ctx) => handle('GET', req, ctx);
export const POST = (req, ctx) => handle('POST', req, ctx);
export const DELETE = (req, ctx) => handle('DELETE', req, ctx);
