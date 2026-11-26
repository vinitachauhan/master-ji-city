'use client';
// Super Admin - All Schools Directory (Gulaothi / Bulandshahr / Sikandrabad). Needs the same admin PIN as School Management.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { api, getPin, setPin, inputCls, btn } from '@/components/school/ui';
import { useDirectory, CITIES, countByCity } from '@/components/schools/useDirectory';
import { SCHOOL_TYPES, SCHOOL_BOARDS, SCHOOL_CLASSES, SCHOOL_STATUSES } from '@/lib/data/schoolsDirectory.mjs';

const EMPTY = { name: '', city: 'Gulaothi', type: 'Private', board: 'CBSE', classes: 'Play to 12th', principal: '', phone: '', students: '', teachers: '', status: 'Pending' };

function PinGate({ onOpen }) {
  const [pin, setPinInput] = useState('');
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setErr(''); setPin(pin);
    try { await api('summary'); onOpen(); } catch (e2) { setPin(''); setErr(e2.message); }
  };
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-4xl">🏫</div>
        <h1 className="mt-2 text-2xl font-extrabold">All Schools Directory</h1>
        <p className="text-sm text-slate-500">Super Admin only - enter the admin PIN (the same PIN as School Management).</p>
        <label className="mt-4 block text-sm font-semibold">Admin PIN
          <input type="password" inputMode="numeric" autoFocus value={pin} onChange={(e) => setPinInput(e.target.value)} className={inputCls} />
        </label>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <button className={`${btn} mt-4 w-full`} disabled={!pin}>Open</button>
        <Link href="/school" className="mt-3 block text-center text-sm text-slate-500">← School Management</Link>
      </form>
    </main>
  );
}

function SchoolForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState({ ...EMPTY, ...initial });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr('School name is required');
    setBusy(true); setErr('');
    try { await onSave({ ...f, name: f.name.trim(), students: Number(f.students) || 0, teachers: Number(f.teachers) || 0 }); } catch (e2) { setErr(e2.message); setBusy(false); }
  };
  const sel = (k, list) => <select value={f[k]} onChange={set(k)} className={inputCls}>{list.map((x) => <option key={x}>{x}</option>)}</select>;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={onCancel}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl">
        <h2 className="text-xl font-extrabold">{initial?.id ? '✏️ Edit School' : '➕ Add School'}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold sm:col-span-2">School Name<input value={f.name} onChange={set('name')} className={inputCls} autoFocus /></label>
          <label className="text-sm font-semibold">City{sel('city', CITIES)}</label>
          <label className="text-sm font-semibold">Type{sel('type', SCHOOL_TYPES)}</label>
          <label className="text-sm font-semibold">Board{sel('board', SCHOOL_BOARDS)}</label>
          <label className="text-sm font-semibold">Classes{sel('classes', SCHOOL_CLASSES)}</label>
          <label className="text-sm font-semibold">Principal Name<input value={f.principal} onChange={set('principal')} className={inputCls} /></label>
          <label className="text-sm font-semibold">Phone<input value={f.phone} onChange={set('phone')} inputMode="tel" className={inputCls} /></label>
          <label className="text-sm font-semibold">Total Students<input value={f.students} onChange={set('students')} inputMode="numeric" className={inputCls} /></label>
          <label className="text-sm font-semibold">Total Teachers<input value={f.teachers} onChange={set('teachers')} inputMode="numeric" className={inputCls} /></label>
          <label className="text-sm font-semibold">Status{sel('status', SCHOOL_STATUSES)}</label>
        </div>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-lg bg-slate-100 px-4 py-2 font-semibold">Cancel</button>
          <button className={btn} disabled={busy}>{busy ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

function Details({ s, onClose }) {
  const rows = [['City', s.city], ['Type', `${s.type} · ${s.board}`], ['Classes', s.classes], ['Total Students', s.students], ['Total Teachers', s.teachers],
    ['Principal', s.principal || '-'], ['Phone', s.phone || '-'], ['Status', s.status], ['In Super Admin system', s.inSystem ? 'Yes ✅' : 'No']];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-t-2xl bg-white p-5 sm:rounded-2xl">
        <h2 className="text-xl font-extrabold">🏫 {s.name}</h2>
        {s.demo && <p className="mt-1 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">Demo data: principal, phone and numbers are sample values. Edit the school to put the real details.</p>}
        <dl className="mt-3 divide-y divide-slate-100">
          {rows.map(([k, v]) => <div key={k} className="flex justify-between gap-3 py-2 text-sm"><dt className="text-slate-500">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>)}
        </dl>
        <button onClick={onClose} className={`${btn} mt-4 w-full`}>Close</button>
      </div>
    </div>
  );
}

function Directory() {
  const d = useDirectory({ admin: true });
  const [city, setCity] = useState('All');
  const [q, setQ] = useState('');
  const [form, setForm] = useState(null); // {} = add, school = edit
  const [view, setView] = useState(null);
  const [msg, setMsg] = useState('');
  const counts = countByCity(d.schools);
  const list = useMemo(() => d.schools
    .filter((s) => city === 'All' || s.city === city)
    .filter((s) => !q.trim() || s.name.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)), [d.schools, city, q]);
  const run = async (fn, done) => { setMsg(''); try { await fn(); setMsg(done); } catch (e) { setMsg(`❌ ${e.message}`); } };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link href="/school" className="text-sm font-semibold text-indigo-700">← School Management</Link>
            <button onClick={() => { setPin(''); window.location.reload(); }} className="text-sm font-semibold text-slate-500 hover:text-slate-900">Lock 🔒</button>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">🏫 All Schools Directory</h1>
          <p className="text-sm text-slate-500">Gulaothi · Bulandshahr · Sikandrabad · Delhi · Lucknow · Dehradun</p>
          <p className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm font-bold text-indigo-900">
            Total Schools - {CITIES.map((c) => `${c}: ${counts[c]}`).join(', ')} - Total: {d.schools.length}
          </p>
          <p className="mt-2 text-xs text-slate-500">{d.saved === 'mongodb' ? '💾 Saved in MongoDB - every admin sees the same list.' : '💾 MongoDB is not connected - your changes are saved in this browser (LocalStorage). Connect MongoDB to share them.'}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex flex-wrap items-center gap-2">
          {['All', ...CITIES].map((c) => (
            <button key={c} onClick={() => setCity(c)} className={`rounded-full px-4 py-2 text-sm font-bold ${city === c ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 shadow-sm hover:bg-indigo-50'}`}>
              {c} <span className="opacity-70">({c === 'All' ? d.schools.length : counts[c]})</span>
            </button>
          ))}
          <button onClick={() => setForm({})} className="ml-auto rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">➕ Add School</button>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Search school by name..." className={`${inputCls} mt-3`} />
        {msg && <p className="mt-3 rounded-lg bg-white p-2 text-sm font-semibold shadow-sm">{msg}</p>}

        {d.loading ? <p className="mt-6 text-slate-500">Loading...</p> : d.error ? <p className="mt-6 text-red-600">{d.error}</p> : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <div key={s.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-extrabold text-slate-900">{s.name}</h2>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${s.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{s.status}</span>
                </div>
                <p className="text-sm text-indigo-700">📍 {s.city}</p>
                <div className="mt-2 flex flex-wrap gap-1 text-xs font-semibold">
                  <span className="rounded bg-slate-100 px-2 py-0.5">{s.type}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">{s.board}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">{s.classes}</span>
                  {s.inSystem && <span className="rounded bg-indigo-100 px-2 py-0.5 text-indigo-800">✅ In system</span>}
                  {s.demo && <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-700">Demo data</span>}
                </div>
                <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                  <dt className="text-slate-500">👨‍🎓 Students</dt><dd className="font-semibold">{s.students}</dd>
                  <dt className="text-slate-500">👩‍🏫 Teachers</dt><dd className="font-semibold">{s.teachers}</dd>
                  <dt className="text-slate-500">Principal</dt><dd className="font-semibold">{s.principal || '-'}</dd>
                  <dt className="text-slate-500">📞 Phone</dt><dd className="font-semibold">{s.phone || '-'}</dd>
                </dl>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button onClick={() => setView(s)} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold hover:bg-slate-200">View Details</button>
                  {s.inSystem
                    ? <span className="rounded-lg bg-indigo-50 px-3 py-2 text-center text-sm font-bold text-indigo-700">✅ Added</span>
                    : <button onClick={() => run(() => d.addToSystem(s.id), `✅ ${s.name} added to the Super Admin system.`)} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-bold text-white hover:bg-indigo-700">Add to Super Admin</button>}
                  <button onClick={() => setForm(s)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50">✏️ Edit</button>
                  <button onClick={() => window.confirm(`Delete "${s.name}"?`) && run(() => d.del(s.id), `🗑️ ${s.name} deleted.`)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">🗑️ Delete</button>
                </div>
              </div>
            ))}
            {list.length === 0 && <p className="text-slate-500">No school found. Use ➕ Add School to add it.</p>}
          </div>
        )}
      </div>

      {form && <SchoolForm initial={form} onCancel={() => setForm(null)} onSave={async (f) => { await d.save(f); setForm(null); setMsg(f.id ? `✏️ ${f.name} updated.` : `➕ ${f.name} added.`); }} />}
      {view && <Details s={view} onClose={() => setView(null)} />}
    </main>
  );
}

export default function SuperAdminSchools() {
  const [authed, setAuthed] = useState(null);
  useEffect(() => {
    if (!getPin()) { setAuthed(false); return; }
    api('summary').then(() => setAuthed(true)).catch(() => { setPin(''); setAuthed(false); });
  }, []);
  if (authed === null) return <main className="p-8 text-slate-500">Loading...</main>;
  return authed ? <Directory /> : <PinGate onOpen={() => setAuthed(true)} />;
}
