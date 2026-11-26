'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, getPin, setPin, inputCls, btn } from '@/components/school/ui';
import Dashboard from '@/components/school/Dashboard';
import Attendance from '@/components/school/Attendance';
import Parents from '@/components/school/Parents';
import People from '@/components/school/People';
import { Salary, Fees, Activities } from '@/components/school/Money';

const TABS = [
  ['dashboard', '📊 Dashboard'], ['attendance', '✅ Attendance'], ['parents', '👪 Parents & Progress'],
  ['salary', '💵 Salary'], ['fees', '💰 Student Fees'], ['activities', '🎭 Other Activities'], ['people', '👥 Students & Staff'],
];

export default function SchoolPage() {
  const [authed, setAuthed] = useState(null);
  const [pin, setPinInput] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    if (!getPin()) { setAuthed(false); return; }
    api('summary').then(() => setAuthed(true)).catch(() => { setPin(''); setAuthed(false); });
  }, []);

  const login = async (e) => {
    e.preventDefault(); setErr('');
    setPin(pin);
    try { await api('summary'); setAuthed(true); } catch (e2) { setPin(''); setErr(e2.message); }
  };

  if (authed === null) return <main className="p-8 text-slate-500">Loading...</main>;
  if (!authed) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-4xl">🏫</div>
          <h1 className="mt-2 text-2xl font-extrabold">School Management</h1>
          <p className="text-sm text-slate-500">For the principal, manager and office staff. Salary and fee data is private - enter the admin PIN.</p>
          <label className="mt-4 block text-sm font-semibold">Admin PIN
            <input type="password" inputMode="numeric" autoFocus value={pin} onChange={(e) => setPinInput(e.target.value)} className={inputCls} />
          </label>
          {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
          <button className={`${btn} mt-4 w-full`} disabled={!pin}>Open</button>
          <Link href="/" className="mt-3 block text-center text-sm text-slate-500">← Back to home</Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">🏫 School Management</h1>
            <button onClick={() => { setPin(''); setAuthed(false); setPinInput(''); }} className="text-sm font-semibold text-slate-500 hover:text-slate-900">Lock 🔒</button>
          </div>
          <p className="text-sm text-slate-500">Attendance · Parent meetings · Salary · Fees · Activities</p>
          <Link href="/super-admin/schools" className="mt-3 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">🏫 All Schools - Gulaothi / Bulandshahr / Sikandrabad / Delhi / Lucknow / Dehradun →</Link>
          <nav className="no-scrollbar mt-4 flex gap-1 overflow-x-auto">
            {TABS.map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`shrink-0 border-b-2 px-3 py-2 text-sm font-semibold ${tab === k ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>{l}</button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {tab === 'dashboard' && <Dashboard go={setTab} />}
        {tab === 'attendance' && <Attendance />}
        {tab === 'parents' && <Parents />}
        {tab === 'salary' && <Salary />}
        {tab === 'fees' && <Fees />}
        {tab === 'activities' && <Activities />}
        {tab === 'people' && <People />}
      </div>
    </main>
  );
}
