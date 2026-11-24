'use client';
import { useState } from 'react';
import { api, useLoad, Card, Seg, Table, ErrorNote, inr, classLabel, classSecLabel, ClassSectionFilter, CLASS_LIST, SECTION_LIST, inputCls, btn, btnGhost } from './ui';

const blankStudent = { id: '', name: '', class: '', section: 'A', rollNo: '', guardianName: '', guardianPhone: '', monthlyFee: '' };
const blankStaff = { id: '', name: '', role: 'Teacher', designation: '', phone: '', monthlySalary: '' };

export default function People() {
  const [tab, setTab] = useState('students');
  const isStu = tab === 'students';
  const { data, error, reload } = useLoad(tab);
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState('');
  const [fCls, setFCls] = useState('');
  const [fSec, setFSec] = useState('');

  const save = async (e) => {
    e.preventDefault(); setMsg('');
    try { await api(tab, { method: 'POST', body: form }); setForm(null); reload(); } catch (err) { setMsg(err.message); }
  };
  const del = async (p) => {
    if (!confirm(`Delete ${p.name}? Their attendance and ${isStu ? 'fee' : 'salary'} records will also be deleted.`)) return;
    await api(`${tab}?id=${p.id}`, { method: 'DELETE' }); reload();
  };
  const rows = (data?.rows || []).filter((p) => !isStu || ((!fCls || p.class === fCls) && (!fSec || (p.section || 'A') === fSec)));
  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }), className: inputCls });

  return (
    <div className="space-y-4">
      <Seg value={tab} onChange={(v) => { setTab(v); setForm(null); }} options={[['students', 'Students'], ['staff', 'Teachers, Staff & Managers']]} />
      {form ? (
        <Card title={`${form.id ? 'Edit' : 'Add'} ${isStu ? 'student' : 'teacher / staff / manager'}`}>
          <form onSubmit={save} className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm font-semibold">Name<input required {...f('name')} /></label>
            {isStu ? (
              <>
                <label className="text-sm font-semibold">Class<select required {...f('class')}><option value="">Select</option>{CLASS_LIST.map((c) => <option key={c} value={c}>{classLabel(c)}</option>)}</select></label>
                <label className="text-sm font-semibold">Section<select {...f('section')}>{SECTION_LIST.map((s) => <option key={s} value={s}>Section {s}</option>)}</select></label>
                <label className="text-sm font-semibold">Roll no.<input type="number" min="0" {...f('rollNo')} /></label>
                <label className="text-sm font-semibold">Parent / guardian name<input {...f('guardianName')} placeholder="e.g. Sunita (Mother)" /></label>
                <label className="text-sm font-semibold">Guardian phone<input inputMode="tel" {...f('guardianPhone')} /></label>
                <label className="text-sm font-semibold">Monthly fee (₹)<input required type="number" min="0" {...f('monthlyFee')} /></label>
              </>
            ) : (
              <>
                <label className="text-sm font-semibold">Role<select {...f('role')}><option>Teacher</option><option>Staff</option><option>Manager</option></select></label>
                <label className="text-sm font-semibold">Designation / subject<input {...f('designation')} placeholder="e.g. Maths teacher, Clerk" /></label>
                <label className="text-sm font-semibold">Phone<input inputMode="tel" {...f('phone')} /></label>
                <label className="text-sm font-semibold">Monthly salary (₹)<input required type="number" min="0" {...f('monthlySalary')} /></label>
                <div className="text-sm"><span className="font-semibold">Yearly salary</span><p className="py-2 tabular-nums">{inr((Number(form.monthlySalary) || 0) * 12)}</p></div>
              </>
            )}
            <div className="flex gap-2 sm:col-span-3"><button className={btn}>Save</button><button type="button" className={btnGhost} onClick={() => setForm(null)}>Cancel</button>{msg && <span className="text-sm text-red-600">{msg}</span>}</div>
          </form>
        </Card>
      ) : <button className={btn} onClick={() => setForm(isStu ? { ...blankStudent } : { ...blankStaff })}>+ Add {isStu ? 'student' : 'teacher / staff / manager'}</button>}

      <Card title={isStu ? `Students (${rows.length})` : `Teachers, staff & managers (${rows.length})`}
        right={isStu ? <ClassSectionFilter cls={fCls} setCls={setFCls} sec={fSec} setSec={setFSec} students={data?.rows || []} /> : null}>
        <ErrorNote error={error} />
        {isStu && <SectionCounts students={data?.rows || []} onPick={(c, s) => { setFCls(c); setFSec(s); }} />}
        <Table head={isStu ? ['Class-Section', 'Roll', 'Name', 'Guardian', 'Monthly fee', ''] : ['Name', 'Role', 'Designation', 'Monthly salary', 'Yearly salary', '']}>
          {rows.map((p) => (
            <tr key={p.id}>
              {isStu ? (
                <>
                  <td className="px-3 py-2 font-semibold text-indigo-700">{classSecLabel(p.class, p.section)}</td>
                  <td className="px-3 py-2 tabular-nums">{p.rollNo}</td>
                  <td className="px-3 py-2 font-semibold">{p.name}</td>
                  <td className="px-3 py-2 text-xs">{p.guardianName}<br />{p.guardianPhone}</td>
                  <td className="px-3 py-2 tabular-nums">{inr(p.monthlyFee)}</td>
                </>
              ) : (
                <>
                  <td className="px-3 py-2 font-semibold">{p.name}</td>
                  <td className="px-3 py-2">{p.role}</td>
                  <td className="px-3 py-2">{p.designation}</td>
                  <td className="px-3 py-2 tabular-nums">{inr(p.monthlySalary)}</td>
                  <td className="px-3 py-2 tabular-nums">{inr(p.monthlySalary * 12)}</td>
                </>
              )}
              <td className="whitespace-nowrap px-3 py-2 text-right">
                <button className="mr-3 text-sm font-semibold text-indigo-700" onClick={() => setForm({ ...p })}>Edit</button>
                <button className="text-sm text-red-600" onClick={() => del(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

// Count of students in every Class-Section; tap one to filter the list
function SectionCounts({ students, onPick }) {
  const groups = {};
  for (const s of students) { const k = `${s.class}|${s.section || 'A'}`; groups[k] = (groups[k] || 0) + 1; }
  const keys = Object.keys(groups);
  if (!keys.length) return null;
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {keys.map((k) => { const [c, s] = k.split('|'); return (
        <button key={k} onClick={() => onPick(c, s)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm hover:border-indigo-400">
          <b>{classSecLabel(c, s)}</b> <span className="text-slate-500">· {groups[k]} students</span>
        </button>
      ); })}
    </div>
  );
}
