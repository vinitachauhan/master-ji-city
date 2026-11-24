'use client';
import { useState } from 'react';
import { api, useLoad, Card, Seg, Badge, Table, ErrorNote, Stat, thisMonth, monthLabel, inr, classLabel, classSecLabel, ClassSectionFilter, CLASS_LIST, inputCls, btnGhost } from './ui';

const MODES = ['Cash', 'UPI', 'Bank Transfer', 'Cheque'];

function PaidPendingFilter({ value, onChange, paid, pending }) {
  return <Seg value={value} onChange={onChange} options={[['all', `All (${paid + pending})`], ['paid', `Paid (${paid})`], ['pending', `Pending (${pending})`]]} />;
}

// ======================= SALARY =======================
export function Salary() {
  const [view, setView] = useState('month');
  return (
    <div className="space-y-4">
      <Seg value={view} onChange={setView} options={[['month', 'Monthly salary'], ['year', 'Yearly salary']]} />
      {view === 'month' ? <SalaryMonth /> : <SalaryYear />}
    </div>
  );
}

function SalaryMonth() {
  const [month, setMonth] = useState(thisMonth());
  const [mode, setMode] = useState('Bank Transfer');
  const [show, setShow] = useState('all');
  const [role, setRole] = useState('');
  const { data, error, reload } = useLoad(`salary?month=${month}`);
  const all = (data?.rows || []).filter((r) => !role || r.staff.role === role);
  const paid = all.filter((r) => r.payment); const pending = all.filter((r) => !r.payment);
  const rows = show === 'paid' ? paid : show === 'pending' ? pending : all;

  const pay = async (r) => { await api('salary', { method: 'POST', body: { staffId: r.staff.id, month, mode } }); reload(); };
  const undo = async (r) => { if (confirm(`Mark ${r.staff.name}'s salary as NOT paid?`)) { await api(`salary?staffId=${r.staff.id}&month=${month}`, { method: 'DELETE' }); reload(); } };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Monthly salary bill" value={inr(all.reduce((t, r) => t + r.staff.monthlySalary, 0))} sub={`${all.length} people`} />
        <Stat label="Paid" value={inr(paid.reduce((t, r) => t + r.payment.amount, 0))} sub={`${paid.length} received salary`} tone="green" />
        <Stat label="Still to pay" value={inr(pending.reduce((t, r) => t + r.staff.monthlySalary, 0))} sub={`${pending.length} waiting`} tone="red" />
        <Stat label="Yearly salary bill" value={inr(all.reduce((t, r) => t + r.staff.monthlySalary * 12, 0))} sub="monthly × 12" tone="indigo" />
      </div>
      <Card title={`Salary - ${monthLabel(month)}`} right={<input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} className={`${inputCls} w-auto`} />}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <PaidPendingFilter value={show} onChange={setShow} paid={paid.length} pending={pending.length} />
          <Seg value={role} onChange={setRole} options={[['', 'Everyone'], ['Teacher', 'Teachers'], ['Staff', 'Staff'], ['Manager', 'Managers']]} />
          <label className="text-sm">Pay by <select value={mode} onChange={(e) => setMode(e.target.value)} className={`${inputCls} inline-block w-auto`}>{MODES.map((m) => <option key={m}>{m}</option>)}</select></label>
        </div>
        <ErrorNote error={error} />
        <Table head={['Name', 'Role', 'Monthly', 'Yearly', 'Status', '']}>
          {rows.map((r) => (
            <tr key={r.staff.id}>
              <td className="px-3 py-2"><p className="font-semibold">{r.staff.name}</p><p className="text-xs text-slate-500">{r.staff.designation}</p></td>
              <td className="px-3 py-2">{r.staff.role}</td>
              <td className="px-3 py-2 tabular-nums">{inr(r.staff.monthlySalary)}</td>
              <td className="px-3 py-2 tabular-nums text-slate-600">{inr(r.staff.monthlySalary * 12)}</td>
              <td className="px-3 py-2">{r.payment ? <><Badge kind="Paid" /><p className="text-xs text-slate-500">{r.payment.paidOn} · {r.payment.mode}</p></> : <Badge kind="Pending" />}</td>
              <td className="px-3 py-2 text-right">{r.payment
                ? <button className="text-xs text-slate-500 underline" onClick={() => undo(r)}>Undo</button>
                : <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700" onClick={() => pay(r)}>Mark paid</button>}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}

function SalaryYear() {
  const [year, setYear] = useState(thisMonth().slice(0, 4));
  const { data, error } = useLoad(`salary?year=${year}`);
  const months = Array.from({ length: 12 }, (_, i) => `${year}-${String(i + 1).padStart(2, '0')}`);
  const nowM = thisMonth();
  return (
    <Card title={`Yearly salary - ${year}`} right={
      <select value={year} onChange={(e) => setYear(e.target.value)} className={`${inputCls} w-auto`}>
        {[0, 1, 2].map((k) => { const y = String(Number(thisMonth().slice(0, 4)) - k); return <option key={y}>{y}</option>; })}
      </select>}>
      <ErrorNote error={error} />
      <p className="mb-3 text-xs text-slate-500">✔ = paid, ✖ = not paid (past months), blank = future month</p>
      <div className="-mx-4 overflow-x-auto sm:mx-0">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead><tr className="border-b text-xs uppercase text-slate-500"><th className="px-2 py-2">Name</th><th className="px-2">Yearly salary</th><th className="px-2">Paid so far</th>{months.map((m) => <th key={m} className="px-1 text-center">{new Date(`${m}-01T00:00:00`).toLocaleString('en-IN', { month: 'short' })}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {(data?.rows || []).map((r) => (
              <tr key={r.staff.id}>
                <td className="px-2 py-2"><p className="font-semibold">{r.staff.name}</p><p className="text-xs text-slate-500">{r.staff.role}</p></td>
                <td className="px-2 tabular-nums">{inr(r.yearlySalary)}</td>
                <td className="px-2 tabular-nums font-semibold text-green-700">{inr(r.paidTotal)}</td>
                {months.map((m) => {
                  const p = r.paidMonths.includes(m);
                  return <td key={m} className="px-1 text-center">{p ? <span className="text-green-700" title="Paid">✔</span> : m <= nowM ? <span className="text-red-600" title="Not paid">✖</span> : ''}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ======================= FEES =======================
export function Fees() {
  const [month, setMonth] = useState(thisMonth());
  const [cls, setCls] = useState('');
  const [sec, setSec] = useState('');
  const [show, setShow] = useState('all');
  const [mode, setMode] = useState('Cash');
  const allStudents = useLoad('students');
  const { data, error, reload } = useLoad(`fees?month=${month}${cls ? `&class=${encodeURIComponent(cls)}` : ''}${sec ? `&section=${sec}` : ''}`);
  const all = data?.rows || [];
  const paid = all.filter((r) => r.payment); const pending = all.filter((r) => !r.payment);
  const rows = show === 'paid' ? paid : show === 'pending' ? pending : all;

  const pay = async (r) => { await api('fees', { method: 'POST', body: { studentId: r.student.id, month, mode } }); reload(); };
  const undo = async (r) => { if (confirm(`Mark ${r.student.name}'s fee as NOT received?`)) { await api(`fees?studentId=${r.student.id}&month=${month}`, { method: 'DELETE' }); reload(); } };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Expected this month" value={inr(all.reduce((t, r) => t + r.student.monthlyFee, 0))} sub={`${all.length} students`} />
        <Stat label="Fee received" value={inr(paid.reduce((t, r) => t + r.payment.amount, 0))} sub={`${paid.length} students paid`} tone="green" />
        <Stat label="Fee not received" value={inr(pending.reduce((t, r) => t + r.student.monthlyFee, 0))} sub={`${pending.length} students pending`} tone="red" />
        <Stat label="Collection" value={`${all.length ? Math.round((paid.length / all.length) * 100) : 0}%`} tone="indigo" />
      </div>
      <Card title={`Student fees - ${monthLabel(month)}`} right={<input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} className={`${inputCls} w-auto`} />}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <PaidPendingFilter value={show} onChange={setShow} paid={paid.length} pending={pending.length} />
          <ClassSectionFilter cls={cls} setCls={setCls} sec={sec} setSec={setSec} students={allStudents.data?.rows || []} />
          <label className="text-sm">Received by <select value={mode} onChange={(e) => setMode(e.target.value)} className={`${inputCls} inline-block w-auto`}>{MODES.map((m) => <option key={m}>{m}</option>)}</select></label>
        </div>
        <ErrorNote error={error} />
        <Table head={['Student', 'Class-Section', 'Guardian', 'Fee', 'Status', '']}>
          {rows.map((r) => (
            <tr key={r.student.id}>
              <td className="px-3 py-2 font-semibold">{r.student.name}</td>
              <td className="px-3 py-2">{classSecLabel(r.student.class, r.student.section)}</td>
              <td className="px-3 py-2 text-xs text-slate-600">{r.student.guardianName}<br />{r.student.guardianPhone}</td>
              <td className="px-3 py-2 tabular-nums">{inr(r.student.monthlyFee)}</td>
              <td className="px-3 py-2">{r.payment ? <><Badge kind="Paid" /><p className="text-xs text-slate-500">{r.payment.paidOn} · {r.payment.mode}</p></> : <Badge kind="Pending" />}</td>
              <td className="px-3 py-2 text-right">{r.payment
                ? <button className="text-xs text-slate-500 underline" onClick={() => undo(r)}>Undo</button>
                : <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700" onClick={() => pay(r)}>Fee received</button>}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

// ======================= OTHER ACTIVITIES =======================
export function Activities() {
  const list = useLoad('activities');
  const [openId, setOpenId] = useState('');
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState('');

  const create = async (e) => {
    e.preventDefault(); setMsg('');
    try { await api('activities', { method: 'POST', body: form }); setForm(null); list.reload(); } catch (err) { setMsg(err.message); }
  };
  const del = async (a) => { if (confirm(`Delete "${a.name}" and all its payment records?`)) { await api(`activities?id=${a.id}`, { method: 'DELETE' }); setOpenId(''); list.reload(); } };

  return (
    <div className="space-y-4">
      <ErrorNote error={list.error} />
      {form ? (
        <Card title="New activity (trip, annual day, sports kit...)">
          <form onSubmit={create} className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm font-semibold sm:col-span-2">Activity name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Science trip" /></label>
            <label className="text-sm font-semibold">Amount per student (₹)<input required type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputCls} /></label>
            <label className="text-sm font-semibold">Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} /></label>
            <div className="text-sm font-semibold sm:col-span-3">Which classes? <span className="font-normal text-slate-500">(none selected = all classes)</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {CLASS_LIST.map((c) => {
                  const on = form.classes.includes(c);
                  return <button type="button" key={c} onClick={() => setForm({ ...form, classes: on ? form.classes.filter((x) => x !== c) : [...form.classes, c] })} className={`rounded-full border px-3 py-1 text-xs ${on ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>{classLabel(c)}</button>;
                })}
              </div>
            </div>
            <div className="flex gap-2 sm:col-span-3"><button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Create activity</button><button type="button" className={btnGhost} onClick={() => setForm(null)}>Cancel</button>{msg && <span className="text-sm text-red-600">{msg}</span>}</div>
          </form>
        </Card>
      ) : <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => setForm({ name: '', amount: '', date: thisMonth() + '-01', classes: [] })}>+ New activity</button>}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {(list.data?.rows || []).map((a) => (
          <button key={a.id} onClick={() => setOpenId(a.id === openId ? '' : a.id)} className={`rounded-2xl border bg-white p-4 text-left hover:border-indigo-400 ${openId === a.id ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'}`}>
            <p className="font-bold">{a.name}</p>
            <p className="text-xs text-slate-500">{a.date} · {inr(a.amount)} per student · {a.classes.length ? a.classes.map(classLabel).join(', ') : 'All classes'}</p>
            <div className="mt-2 h-2 rounded bg-slate-100"><div className="h-2 rounded bg-green-600" style={{ width: `${a.students ? (a.paidCount / a.students) * 100 : 0}%` }} /></div>
            <p className="mt-1 text-sm"><span className="font-semibold text-green-700">{a.paidCount} paid ({inr(a.collected)})</span> · <span className="font-semibold text-red-600">{a.pendingCount} pending ({inr(a.pendingAmount)})</span></p>
          </button>
        ))}
      </div>
      {openId && <ActivityDetail id={openId} onChange={list.reload} onDelete={del} />}
    </div>
  );
}

function ActivityDetail({ id, onChange, onDelete }) {
  const { data, error, reload } = useLoad(`activities?id=${id}`);
  const [show, setShow] = useState('all');
  if (error) return <ErrorNote error={error} />;
  if (!data) return null;
  const paid = data.rows.filter((r) => r.payment); const pending = data.rows.filter((r) => !r.payment);
  const rows = show === 'paid' ? paid : show === 'pending' ? pending : data.rows;
  const refresh = () => { reload(); onChange(); };
  const pay = async (r) => { await api('activities?pay=1', { method: 'POST', body: { activityId: id, studentId: r.student.id } }); refresh(); };
  const undo = async (r) => { await api(`activities?activityId=${id}&studentId=${r.student.id}`, { method: 'DELETE' }); refresh(); };
  return (
    <Card title={`${data.activity.name} - who paid, who has not`} right={<button className="text-sm text-red-600" onClick={() => onDelete(data.activity)}>Delete activity</button>}>
      <div className="mb-3"><PaidPendingFilter value={show} onChange={setShow} paid={paid.length} pending={pending.length} /></div>
      <Table head={['Student', 'Class-Section', 'Guardian phone', 'Amount', 'Status', '']}>
        {rows.map((r) => (
          <tr key={r.student.id}>
            <td className="px-3 py-2 font-semibold">{r.student.name}</td>
            <td className="px-3 py-2">{classSecLabel(r.student.class, r.student.section)}</td>
            <td className="px-3 py-2 text-xs text-slate-600">{r.student.guardianPhone}</td>
            <td className="px-3 py-2 tabular-nums">{inr(data.activity.amount)}</td>
            <td className="px-3 py-2">{r.payment ? <><Badge kind="Paid" /><p className="text-xs text-slate-500">{r.payment.paidOn}</p></> : <Badge kind="Pending" />}</td>
            <td className="px-3 py-2 text-right">{r.payment
              ? <button className="text-xs text-slate-500 underline" onClick={() => undo(r)}>Undo</button>
              : <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white" onClick={() => pay(r)}>Mark paid</button>}</td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}
