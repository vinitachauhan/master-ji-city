'use client';
import { useEffect, useMemo, useState } from 'react';
import { api, useLoad, Card, Seg, Table, ErrorNote, todayStr, thisMonth, classLabel, classSecLabel, ClassSectionFilter, inputCls, btn, btnGhost } from './ui';

const GROUPS = [['student', 'Students'], ['Teacher', 'Teachers'], ['Staff', 'Staff'], ['Manager', 'Managers']];

function lastDay(month) { const [y, m] = month.split('-').map(Number); return new Date(y, m, 0).getDate(); }

export default function Attendance() {
  const [mode, setMode] = useState('mark');
  const [group, setGroup] = useState('student');
  const [cls, setCls] = useState('');
  const [sec, setSec] = useState('');
  const students = useLoad('students');
  const staff = useLoad('staff');

  const people = useMemo(() => {
    if (group === 'student') return (students.data?.rows || []).filter((s) => (!cls || s.class === cls) && (!sec || (s.section || 'A') === sec));
    return (staff.data?.rows || []).filter((s) => s.role === group);
  }, [group, cls, sec, students.data, staff.data]);
  const type = group === 'student' ? 'student' : 'staff';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Seg value={mode} onChange={setMode} options={[['mark', 'Mark attendance'], ['report', 'Present / absent days']]} />
        <Seg value={group} onChange={setGroup} options={GROUPS} />
        {group === 'student' && <ClassSectionFilter cls={cls} setCls={setCls} sec={sec} setSec={setSec} students={students.data?.rows || []} />}
      </div>
      <ErrorNote error={students.error || staff.error} />
      {mode === 'mark' ? <Mark people={people} type={type} group={group} heading={group === 'student' && cls ? (sec ? classSecLabel(cls, sec) : `${classLabel(cls)} (all sections)`) : ''} /> : <Report people={people} type={type} group={group} />}
    </div>
  );
}

function Mark({ people, type, group, heading }) {
  const [date, setDate] = useState(todayStr());
  const [marks, setMarks] = useState({});
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMsg('');
    api(`attendance?type=${type}&date=${date}`).then((d) => setMarks(d.records)).catch((e) => setMsg(e.message));
  }, [type, date]);

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      const records = people.filter((p) => marks[p.id]).map((p) => ({ personId: p.id, status: marks[p.id] }));
      const r = await api('attendance', { method: 'POST', body: { type, date, records } });
      setMsg(`✔ Saved attendance for ${r.saved} ${group === 'student' ? 'students' : 'people'}.`);
    } catch (e) { setMsg(e.message); }
    setSaving(false);
  };

  const unmarked = people.filter((p) => !marks[p.id]).length;
  return (
    <Card title={`Mark attendance - ${heading || GROUPS.find((g) => g[0] === group)[1]}`}
      right={<input type="date" value={date} max={todayStr()} onChange={(e) => setDate(e.target.value)} className={`${inputCls} w-auto`} />}>
      <div className="mb-3 flex flex-wrap gap-2">
        <button className={btnGhost} onClick={() => setMarks((m) => ({ ...m, ...Object.fromEntries(people.map((p) => [p.id, 'Present'])) }))}>Mark everyone present</button>
        {unmarked > 0 && <span className="py-1.5 text-sm text-amber-700">{unmarked} not marked yet</span>}
      </div>
      <ul className="divide-y divide-slate-100">
        {people.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-slate-500">{type === 'student' ? `${classSecLabel(p.class, p.section)} · Roll ${p.rollNo}` : p.designation}</p>
            </div>
            <div className="flex gap-1">
              {[['Present', 'P', 'bg-green-600'], ['Absent', 'A', 'bg-red-600'], ['Leave', 'L', 'bg-amber-500']].map(([s, short, on]) => (
                <button key={s} onClick={() => setMarks((m) => ({ ...m, [p.id]: s }))} aria-pressed={marks[p.id] === s} title={s}
                  className={`h-9 min-w-[44px] rounded-lg px-2 text-sm font-bold ${marks[p.id] === s ? `${on} text-white` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {short}<span className="hidden sm:inline"> - {s}</span>
                </button>
              ))}
            </div>
          </li>
        ))}
        {people.length === 0 && <li className="py-4 text-slate-500">No one in this group yet. Add them in “Students & Staff”.</li>}
      </ul>
      <div className="mt-4 flex items-center gap-3">
        <button className={btn} disabled={saving || people.length === 0} onClick={save}>{saving ? 'Saving...' : 'Save attendance'}</button>
        {msg && <span className="text-sm text-slate-700">{msg}</span>}
      </div>
    </Card>
  );
}

function Report({ people, type, group }) {
  const [month, setMonth] = useState(thisMonth());
  const from = `${month}-01`; const to = `${month}-${String(lastDay(month)).padStart(2, '0')}`;
  const { data, error } = useLoad(`attendance?summary=1&type=${type}&from=${from}&to=${to}`);
  const sum = data?.summary || {};
  return (
    <Card title={`How many days came / did not come - ${GROUPS.find((g) => g[0] === group)[1]}`}
      right={<input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} className={`${inputCls} w-auto`} />}>
      <ErrorNote error={error} />
      {data && <p className="mb-3 text-sm text-slate-500">Working days with attendance marked this month: <b>{data.workingDays}</b></p>}
      <Table head={['Name', type === 'student' ? 'Class-Section' : 'Role', 'Days present', 'Days absent', 'Leave', 'Attendance %']}>
        {people.map((p) => {
          const s = sum[p.id] || { Present: 0, Absent: 0, Leave: 0, total: 0 };
          const pct = s.total ? Math.round((s.Present / s.total) * 100) : null;
          return (
            <tr key={p.id}>
              <td className="px-3 py-2 font-semibold">{p.name}</td>
              <td className="px-3 py-2 text-slate-600">{type === 'student' ? classSecLabel(p.class, p.section) : p.designation}</td>
              <td className="px-3 py-2 tabular-nums text-green-700 font-semibold">{s.Present}</td>
              <td className="px-3 py-2 tabular-nums text-red-600 font-semibold">{s.Absent}</td>
              <td className="px-3 py-2 tabular-nums text-amber-700">{s.Leave}</td>
              <td className="px-3 py-2">
                {pct === null ? <span className="text-slate-400">-</span> : (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded bg-slate-100"><div className={`h-2 rounded ${pct >= 75 ? 'bg-green-600' : 'bg-red-500'}`} style={{ width: `${pct}%` }} /></div>
                    <span className="tabular-nums font-semibold">{pct}%</span>{pct < 75 && <span className="text-xs text-red-600">⚠ low</span>}
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </Table>
    </Card>
  );
}
