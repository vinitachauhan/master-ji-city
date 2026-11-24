'use client';
import { useState } from 'react';
import { api, useLoad, Stat, Card, ErrorNote, inr, monthLabel, classSecLabel, btnGhost } from './ui';

export default function Dashboard({ go }) {
  const { data: d, error, reload } = useLoad('summary');
  const [resetMsg, setResetMsg] = useState('');
  if (error) return <ErrorNote error={error} />;
  if (!d) return <p className="text-slate-500">Loading...</p>;
  const st = d.attendanceToday.student; const sf = d.attendanceToday.staff;

  const resetAll = async () => {
    if (prompt('This deletes ALL students, staff, attendance, fees, salary and activity records. Type DELETE to confirm.') !== 'DELETE') return;
    try { await api('reset', { method: 'POST', body: { confirm: 'DELETE' } }); setResetMsg('All school records deleted. Start by adding students and staff.'); reload(); }
    catch (e) { setResetMsg(e.message); }
  };

  return (
    <div className="space-y-6">
      {d.pinIsDefault && <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">⚠ You are using the default admin PIN (1234). Set a new <code>ADMIN_PIN</code> in <code>.env.local</code> before real use.</p>}
      <div>
        <h2 className="mb-2 font-bold text-slate-700">Today ({d.today})</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Students present" value={`${st.Present} / ${d.students}`} sub={st.marked ? `${st.Absent} absent · ${st.Leave} on leave` : 'Attendance not marked yet'} tone="green" />
          <Stat label="Teachers & staff present" value={`${sf.Present} / ${d.staff}`} sub={sf.marked ? `${sf.Absent} absent · ${sf.Leave} on leave` : 'Attendance not marked yet'} tone="green" />
          <Stat label="Total students" value={d.students} />
          <Stat label="Teachers, staff & managers" value={d.staff} />
        </div>
      </div>
      <div>
        <h2 className="mb-2 font-bold text-slate-700">{monthLabel(d.month)}</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Fees collected" value={inr(d.fees.collected)} sub={`of ${inr(d.fees.expected)} · ${d.fees.paidCount} paid`} tone="indigo" />
          <Stat label="Students with fee pending" value={d.fees.pendingCount} sub={inr(Math.max(d.fees.expected - d.fees.collected, 0)) + ' still due'} tone="red" />
          <Stat label="Salary paid" value={inr(d.salary.paid)} sub={`of ${inr(d.salary.total)} · ${d.salary.paidCount} paid`} tone="indigo" />
          <Stat label="Staff waiting for salary" value={d.salary.pendingCount} sub={inr(Math.max(d.salary.total - d.salary.paid, 0)) + ' still to pay'} tone="red" />
        </div>
      </div>
      {d.byClassSection?.length > 0 && (
        <Card title={`Today's student attendance by Class-Section (${d.today})`}>
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                {['Class-Section', 'Students', 'Present', 'Absent', 'Leave', 'Not marked'].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {d.byClassSection.map((r) => (
                  <tr key={`${r.class}-${r.section}`}>
                    <td className="px-3 py-2 font-semibold text-indigo-700">{classSecLabel(r.class, r.section)}</td>
                    <td className="px-3 py-2 tabular-nums">{r.students}</td>
                    <td className="px-3 py-2 tabular-nums font-semibold text-green-700">{r.Present}</td>
                    <td className="px-3 py-2 tabular-nums font-semibold text-red-600">{r.Absent}</td>
                    <td className="px-3 py-2 tabular-nums text-amber-700">{r.Leave}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-500">{r.notMarked > 0 ? `⏳ ${r.notMarked}` : '✔ 0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      <Card title="Quick actions">
        <div className="flex flex-wrap gap-2">
          {[['attendance', '✅ Mark attendance'], ['fees', '💰 Fee status'], ['salary', '💵 Pay salaries'], ['parents', '👪 Parent meetings'], ['activities', `🎭 Activities (${inr(d.activities.pendingAmount)} pending)`], ['people', '👥 Add students / staff']].map(([k, l]) => (
            <button key={k} onClick={() => go(k)} className={btnGhost}>{l}</button>
          ))}
        </div>
      </Card>
      <Card title="Demo data">
        <p className="text-sm text-slate-600">The app starts with sample students and staff so you can try it. When you are ready to use real data, delete all school records and add your own.</p>
        <button onClick={resetAll} className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50">Delete all school records</button>
        {resetMsg && <p className="mt-2 text-sm text-slate-700">{resetMsg}</p>}
      </Card>
    </div>
  );
}
