'use client';
import { useMemo, useState } from 'react';
import { api, useLoad, Card, Badge, ErrorNote, Seg, todayStr, classSecLabel, ClassSectionFilter, inputCls, btn, btnGhost } from './ui';

const RATINGS = ['Best', 'Good', 'Average', 'Needs Improvement'];
const empty = () => ({ id: '', studentId: '', date: todayStr(), title: 'Parent-Teacher Meeting', attended: true, attendedBy: '', rating: 'Good', teacherNote: '', parentFeedback: '' });

export default function Parents() {
  const students = useLoad('students');
  const meetings = useLoad('meetings');
  const [form, setForm] = useState(null);
  const [filter, setFilter] = useState('all');
  const [msg, setMsg] = useState('');
  const [cls, setCls] = useState('');
  const [sec, setSec] = useState('');
  const sMap = useMemo(() => Object.fromEntries((students.data?.rows || []).map((s) => [s.id, s])), [students.data]);
  const inClass = (m) => { const s = sMap[m.studentId]; return !cls || (s && s.class === cls && (!sec || (s.section || 'A') === sec)); };
  const rows = (meetings.data?.rows || []).filter((m) => inClass(m) && (filter === 'all' || (filter === 'absent' ? !m.attended : m.rating === filter)));
  const all = meetings.data?.rows || [];
  const attendedCount = all.filter((m) => m.attended).length;

  const save = async (e) => {
    e.preventDefault(); setMsg('');
    try { await api('meetings', { method: 'POST', body: form }); setForm(null); meetings.reload(); }
    catch (err) { setMsg(err.message); }
  };
  const del = async (id) => { if (confirm('Delete this meeting record?')) { await api(`meetings?id=${id}`, { method: 'DELETE' }); meetings.reload(); } };

  return (
    <div className="space-y-4">
      <ErrorNote error={students.error || meetings.error} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-slate-500">Meetings recorded</p><p className="text-2xl font-extrabold">{all.length}</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-slate-500">Parents attended</p><p className="text-2xl font-extrabold text-green-700">{attendedCount}</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-slate-500">Parents did not come</p><p className="text-2xl font-extrabold text-red-600">{all.length - attendedCount}</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-slate-500">Students needing help</p><p className="text-2xl font-extrabold text-amber-700">{all.filter((m) => m.rating === 'Needs Improvement').length}</p></div>
      </div>

      {form ? (
        <Card title={form.id ? 'Edit meeting' : 'New parent / guardian meeting'}>
          <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold">Student
              <select required value={form.studentId} onChange={(e) => { const s = sMap[e.target.value]; setForm({ ...form, studentId: e.target.value, attendedBy: s?.guardianName || '' }); }} className={inputCls}>
                <option value="">Select student</option>
                {(students.data?.rows || []).map((s) => <option key={s.id} value={s.id}>{s.name} ({classSecLabel(s.class, s.section)})</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold">Date<input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} /></label>
            <label className="text-sm font-semibold">Meeting title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></label>
            <div className="text-sm font-semibold">Did the parent / guardian come?
              <div className="mt-1"><Seg value={form.attended ? 'yes' : 'no'} onChange={(v) => setForm({ ...form, attended: v === 'yes' })} options={[['yes', 'Yes, attended'], ['no', 'No, absent']]} /></div>
            </div>
            {form.attended && <label className="text-sm font-semibold">Who came?<input value={form.attendedBy} onChange={(e) => setForm({ ...form, attendedBy: e.target.value })} placeholder="e.g. Mother" className={inputCls} /></label>}
            <div className="text-sm font-semibold sm:col-span-2">How is the child doing in studies?
              <div className="mt-1 flex flex-wrap gap-2">
                {RATINGS.map((r) => (
                  <button type="button" key={r} onClick={() => setForm({ ...form, rating: r })} className={`rounded-full border-2 px-3 py-1 ${form.rating === r ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><Badge kind={r} /></button>
                ))}
              </div>
            </div>
            <label className="text-sm font-semibold sm:col-span-2">What the teacher told the parent<textarea rows={3} value={form.teacherNote} onChange={(e) => setForm({ ...form, teacherNote: e.target.value })} className={inputCls} placeholder="Strengths, weak subjects, homework, behaviour..." /></label>
            <label className="text-sm font-semibold sm:col-span-2">What the parent said<textarea rows={2} value={form.parentFeedback} onChange={(e) => setForm({ ...form, parentFeedback: e.target.value })} className={inputCls} /></label>
            <div className="flex gap-2 sm:col-span-2"><button className={btn}>Save meeting</button><button type="button" className={btnGhost} onClick={() => setForm(null)}>Cancel</button>{msg && <span className="text-sm text-red-600">{msg}</span>}</div>
          </form>
        </Card>
      ) : (
        <button className={btn} onClick={() => setForm(empty())}>+ Record a parent meeting</button>
      )}

      <Card title="Parent / guardian meetings & student progress"
        right={<Seg value={filter} onChange={setFilter} options={[['all', 'All'], ['Best', 'Best'], ['Good', 'Good'], ['Average', 'Average'], ['Needs Improvement', 'Needs help'], ['absent', 'Parent absent']]} />}>
        <div className="mb-3"><ClassSectionFilter cls={cls} setCls={setCls} sec={sec} setSec={setSec} students={students.data?.rows || []} /></div>
        <ul className="space-y-3">
          {rows.map((m) => {
            const s = sMap[m.studentId];
            return (
              <li key={m.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-bold">{s?.name || 'Unknown student'} <span className="font-normal text-slate-500">· {s ? classSecLabel(s.class, s.section) : ''}</span></p>
                    <p className="text-xs text-slate-500">{m.title} · {m.date} · Guardian: {s?.guardianName} {s?.guardianPhone ? `(${s.guardianPhone})` : ''}</p>
                  </div>
                  <div className="flex flex-wrap gap-1"><Badge kind={m.attended ? 'Attended' : 'Not attended'} /><Badge kind={m.rating} /></div>
                </div>
                {m.attended && m.attendedBy && <p className="mt-2 text-sm"><b>Came:</b> {m.attendedBy}</p>}
                {m.teacherNote && <p className="mt-1 text-sm"><b>Teacher:</b> {m.teacherNote}</p>}
                {m.parentFeedback && <p className="mt-1 text-sm"><b>Parent:</b> {m.parentFeedback}</p>}
                <div className="mt-2 flex gap-2"><button className={btnGhost} onClick={() => setForm({ ...empty(), ...m })}>Edit</button><button className="text-sm text-red-600" onClick={() => del(m.id)}>Delete</button></div>
              </li>
            );
          })}
          {rows.length === 0 && <li className="text-slate-500">No meetings in this view.</li>}
        </ul>
      </Card>
    </div>
  );
}
