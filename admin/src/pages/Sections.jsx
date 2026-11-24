import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth';
import ResourcePage from '../ResourcePage';
import { Badge, Confirm, ErrorBox, Modal, PageHeader, Spinner, useToast } from '../ui';

const label = (k) => (/^\d+$/.test(k) ? `Class ${k}` : k);

export default function Sections() {
  const { can } = useAuth();
  const toast = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [cls, setCls] = useState('');
  const [sec, setSec] = useState('');
  const [tab, setTab] = useState('students');
  const [adding, setAdding] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [moving, setMoving] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => api('/sections/overview').then((d) => { setData(d); setError(''); }).catch((e) => setError(e.message)), []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!data || cls) return;
    const first = data.rows.find((r) => r.sections.some((s) => s.students)) || data.rows[0];
    if (first) { setCls(first.classKey); setSec(first.sections[0]?.section || ''); }
  }, [data, cls]);

  if (error) return <ErrorBox error={error} />;
  if (!data) return <Spinner />;

  const current = data.rows.find((r) => r.classKey === cls);
  const section = current?.sections.find((s) => s.section === sec);
  const canEditClasses = can('classes:write');

  const addSection = async (e) => {
    e.preventDefault(); setBusy(true);
    try {
      await api('/sections', { method: 'POST', body: adding });
      toast(`${label(adding.classKey)}-${adding.section} added`);
      setCls(adding.classKey); setSec(adding.section); setAdding(null); load();
    } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };
  const removeSection = async () => {
    setBusy(true);
    try {
      await api(`/sections/${encodeURIComponent(removing.classKey)}/${removing.section}`, { method: 'DELETE' });
      toast(`${label(removing.classKey)}-${removing.section} removed`); setRemoving(null); setSec(''); load();
    } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };

  const tabs = [
    ['students', '🎒 Students', 'students:read', section?.students],
    ['teachers', '👩‍🏫 Teachers', 'teachers:read', section?.teachers],
    ['materials', '📎 Study Materials', 'materials:read', section?.materials],
  ].filter(([, , p]) => can(p));
  const activeTab = tabs.some(([k]) => k === tab) ? tab : tabs[0]?.[0];
  const fixed = { class: cls, section: sec };

  return (
    <div>
      <PageHeader title="Classes & Sections" subtitle="Every class is divided into sections. Each section has its own students, teachers and study material."
        actions={<>
          {can('classes:read') && <Link to="/classes" className="btn-ghost">Class details</Link>}
          {canEditClasses && <button className="btn" onClick={() => setAdding({ classKey: cls || data.allClasses[0], section: '' })}>+ Add section</button>}
        </>} />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Class list */}
        <div className="card h-fit p-2 sm:p-3">
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Classes</p>
          <ul className="max-h-[60vh] space-y-1 overflow-y-auto">
            {data.rows.map((r) => {
              const total = r.sections.reduce((t, s) => t + s.students, 0);
              return (
                <li key={r.classKey}>
                  <button onClick={() => { setCls(r.classKey); setSec(r.sections[0]?.section || ''); }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${cls === r.classKey ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'}`}>
                    <span className="font-semibold">{r.name}</span>
                    <span className={`text-xs ${cls === r.classKey ? 'text-indigo-100' : 'text-slate-500'}`}>{r.sections.length} sec · {total} students</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="min-w-0">
          {!current ? <div className="card text-slate-500">Choose a class.</div> : (
            <>
              {/* Section cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {current.sections.map((s) => (
                  <button key={s.section} onClick={() => setSec(s.section)} aria-pressed={sec === s.section}
                    className={`rounded-2xl border-2 bg-white p-4 text-left shadow-sm transition ${sec === s.section ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-slate-200 hover:border-indigo-300'}`}>
                    <p className="text-lg font-extrabold">{current.name}-{s.section}</p>
                    <p className="text-sm text-slate-500">Section {s.section}</p>
                    <div className="mt-2 flex flex-wrap gap-1 text-xs">
                      <Badge tone="blue">🎒 {s.students}</Badge><Badge tone="green">👩‍🏫 {s.teachers}</Badge><Badge tone="amber">📎 {s.materials}</Badge>
                    </div>
                    <p className="mt-2 truncate text-xs text-slate-500">{s.classTeacher ? `Class teacher: ${s.classTeacher}` : 'No class teacher yet'}</p>
                  </button>
                ))}
                {canEditClasses && (
                  <button onClick={() => setAdding({ classKey: cls, section: '' })} className="rounded-2xl border-2 border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-500 hover:border-indigo-400 hover:text-indigo-700">+ Add section to {current.name}</button>
                )}
              </div>

              {section ? (
                <div className="mt-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-extrabold">{current.name} - Section {sec}</h2>
                    <div className="flex gap-2">
                      {can('students:write') && section.students > 0 && <button className="btn-ghost" onClick={() => setMoving(true)}>⇄ Move students</button>}
                      {canEditClasses && <button className="btn-ghost text-red-600" onClick={() => setRemoving({ classKey: cls, section: sec, ...section })}>Remove section</button>}
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-white p-1 shadow-sm" role="tablist">
                    {tabs.map(([k, l, , n]) => (
                      <button key={k} role="tab" aria-selected={activeTab === k} onClick={() => setTab(k)}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold ${activeTab === k ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{l} <span className="opacity-70">({n})</span></button>
                    ))}
                  </div>
                  {activeTab === 'students' && <ResourcePage key={`s-${cls}-${sec}`} resource="students" embedded fixed={fixed} onChanged={load} emptyText="No students in this section yet." />}
                  {activeTab === 'teachers' && (
                    <>
                      <p className="mb-2 text-sm text-slate-500">Assign teachers to this section, the subject they teach, and the class teacher. Add new teachers in <Link to="/teachers" className="font-semibold text-indigo-700">Teachers & Staff</Link>.</p>
                      <ResourcePage key={`t-${cls}-${sec}`} resource="sectionTeachers" embedded fixed={fixed} onChanged={load} emptyText="No teachers assigned to this section yet." />
                    </>
                  )}
                  {activeTab === 'materials' && (
                    <>
                      <p className="mb-2 text-sm text-slate-500">Notes, homework, worksheets and links only for {current.name}-{sec}. (Chapters for the whole class are in Study Materials.)</p>
                      <ResourcePage key={`m-${cls}-${sec}`} resource="sectionMaterials" embedded fixed={fixed} onChanged={load} emptyText="No study material for this section yet." />
                    </>
                  )}
                </div>
              ) : <div className="card mt-6 text-slate-500">This class has no sections yet - add one.</div>}
            </>
          )}
        </div>
      </div>

      {adding && (
        <Modal title="Add a section" onClose={() => setAdding(null)}
          footer={<><button className="btn-ghost" onClick={() => setAdding(null)}>Cancel</button><button className="btn" form="sec-form" disabled={busy || !adding.section}>{busy ? 'Adding...' : 'Add section'}</button></>}>
          <form id="sec-form" onSubmit={addSection} className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="sec-class">Class</label>
              <select id="sec-class" className="input" value={adding.classKey} onChange={(e) => setAdding({ ...adding, classKey: e.target.value })}>
                {data.allClasses.map((k) => <option key={k} value={k}>{label(k)}</option>)}
              </select></div>
            <div><label className="label" htmlFor="sec-name">Section</label>
              <select id="sec-name" className="input" value={adding.section} onChange={(e) => setAdding({ ...adding, section: e.target.value })}>
                <option value="">- Select -</option>
                {data.allSections.filter((x) => !(data.rows.find((r) => r.classKey === adding.classKey)?.sections || []).some((s) => s.section === x)).map((x) => <option key={x} value={x}>Section {x}</option>)}
              </select></div>
          </form>
        </Modal>
      )}
      {removing && <Confirm title={`Remove ${label(removing.classKey)}-${removing.section}?`} confirmLabel="Remove" busy={busy} onClose={() => setRemoving(null)} onConfirm={removeSection}
        message={removing.students || removing.teachers || removing.materials
          ? `This section still has ${removing.students} students, ${removing.teachers} teacher assignments and ${removing.materials} materials. Move or remove them first.`
          : 'This empty section will be removed.'} />}
      {moving && <MoveStudents classKey={cls} from={sec} sections={current.sections.map((s) => s.section)} onClose={() => setMoving(false)} onDone={() => { setMoving(false); load(); }} />}
    </div>
  );
}

function MoveStudents({ classKey, from, sections, onClose, onDone }) {
  const toast = useToast();
  const [students, setStudents] = useState(null);
  const [picked, setPicked] = useState([]);
  const [to, setTo] = useState(sections.find((s) => s !== from) || '');
  const [busy, setBusy] = useState(false);
  useEffect(() => { api(`/r/students?class=${encodeURIComponent(classKey)}&section=${from}&limit=200`).then((d) => setStudents(d.rows)).catch(() => setStudents([])); }, [classKey, from]);
  const move = async () => {
    setBusy(true);
    try { const d = await api('/sections/move-students', { method: 'POST', body: { studentIds: picked, toSection: to } }); toast(`${d.moved} student(s) moved to section ${to}`); onDone(); } catch (e) { toast(e.message, 'error'); }
    setBusy(false);
  };
  return (
    <Modal title={`Move students from ${label(classKey)}-${from}`} onClose={onClose}
      footer={<><button className="btn-ghost" onClick={onClose}>Cancel</button><button className="btn" onClick={move} disabled={busy || !picked.length || !to}>{busy ? 'Moving...' : `Move ${picked.length} to section ${to || '?'}`}</button></>}>
      <label className="label" htmlFor="move-to">Move to section</label>
      <select id="move-to" className="input mb-4" value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="">- Select -</option>
        {sections.filter((s) => s !== from).map((s) => <option key={s} value={s}>Section {s}</option>)}
      </select>
      {!students ? <Spinner /> : (
        <>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" className="h-4 w-4 accent-indigo-600" checked={picked.length === students.length && students.length > 0} onChange={(e) => setPicked(e.target.checked ? students.map((s) => s.id) : [])} /> Select all ({students.length})</label>
          <ul className="max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
            {students.map((s) => (
              <li key={s.id}><label className="flex items-center gap-3 px-3 py-2 text-sm">
                <input type="checkbox" className="h-4 w-4 accent-indigo-600" checked={picked.includes(s.id)} onChange={(e) => setPicked((p) => (e.target.checked ? [...p, s.id] : p.filter((x) => x !== s.id)))} />
                <span>{s.name}</span><span className="text-slate-400">Roll {s.rollNo ?? '-'}</span>
              </label></li>
            ))}
          </ul>
          {sections.length < 2 && <p className="mt-2 text-sm text-amber-700">This class has only one section - add another section first.</p>}
        </>
      )}
    </Modal>
  );
}
