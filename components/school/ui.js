'use client';
import { useCallback, useEffect, useState } from 'react';

const PIN_KEY = 'masterji_admin_pin';
export const getPin = () => { try { return sessionStorage.getItem(PIN_KEY) || ''; } catch { return ''; } };
export const setPin = (p) => { try { p ? sessionStorage.setItem(PIN_KEY, p) : sessionStorage.removeItem(PIN_KEY); } catch {} };

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api/school/${path}`, {
    method,
    headers: { 'x-admin-pin': getPin(), ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.error || `Request failed (${res.status})`); e.status = res.status; throw e; }
  return data;
}

export function useLoad(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const reload = useCallback(() => {
    if (!path) return;
    setError('');
    api(path).then(setData).catch((e) => setError(e.message));
  }, [path]);
  useEffect(() => { reload(); }, [reload]);
  return { data, error, reload };
}

const pad = (n) => String(n).padStart(2, '0');
export const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
export const thisMonth = () => todayStr().slice(0, 7);
export const monthLabel = (m) => new Date(`${m}-01T00:00:00`).toLocaleString('en-IN', { month: 'long', year: 'numeric' });
export const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;
export const classLabel = (c) => (/^\d+$/.test(c) ? `Class ${c}` : c);
export const CLASS_LIST = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
export const SECTION_LIST = ['A', 'B', 'C', 'D', 'E', 'F'];
// "Class 5-A", "KG-B"
export const classSecLabel = (c, s) => `${classLabel(c)}-${s || 'A'}`;

// Class + Section dropdowns (section list shows only sections that exist for the chosen class)
export function ClassSectionFilter({ cls, setCls, sec, setSec, students = [], allLabel = 'All classes' }) {
  const sections = [...new Set(students.filter((s) => !cls || s.class === cls).map((s) => s.section || 'A'))].sort();
  return (
    <div className="flex flex-wrap gap-2">
      <select value={cls} onChange={(e) => { setCls(e.target.value); setSec(''); }} className={`${inputCls} w-auto`} aria-label="Class">
        <option value="">{allLabel}</option>
        {CLASS_LIST.map((c) => <option key={c} value={c}>{classLabel(c)}</option>)}
      </select>
      <select value={sec} onChange={(e) => setSec(e.target.value)} className={`${inputCls} w-auto`} aria-label="Section" disabled={!cls}>
        <option value="">{cls ? 'All sections' : 'Section'}</option>
        {sections.map((s) => <option key={s} value={s}>Section {s}</option>)}
      </select>
    </div>
  );
}

export function Card({ title, children, right, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 ${className}`}>
      {(title || right) && <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-bold text-slate-900">{title}</h2>{right}</div>}
      {children}
    </section>
  );
}

export function Stat({ label, value, sub, tone = 'slate' }) {
  const tones = { slate: 'text-slate-900', green: 'text-green-700', red: 'text-red-600', indigo: 'text-indigo-700', amber: 'text-amber-700' };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold tabular-nums ${tones[tone]}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

// Status badge: always icon + text (never color alone)
export function Badge({ kind }) {
  const map = {
    Paid: ['✔', 'bg-green-100 text-green-800'], Pending: ['⏳', 'bg-red-100 text-red-700'],
    Present: ['✔', 'bg-green-100 text-green-800'], Absent: ['✖', 'bg-red-100 text-red-700'], Leave: ['◐', 'bg-amber-100 text-amber-800'],
    Best: ['★', 'bg-indigo-100 text-indigo-800'], Good: ['👍', 'bg-green-100 text-green-800'],
    Average: ['➖', 'bg-amber-100 text-amber-800'], 'Needs Improvement': ['⚠', 'bg-red-100 text-red-700'],
    Attended: ['✔', 'bg-green-100 text-green-800'], 'Not attended': ['✖', 'bg-red-100 text-red-700'],
  };
  const [icon, cls] = map[kind] || ['•', 'bg-slate-100 text-slate-700'];
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{icon} {kind}</span>;
}

export function Seg({ value, onChange, options }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
      {options.map(([v, l]) => (
        <button key={v} onClick={() => onChange(v)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${value === v ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>{l}</button>
      ))}
    </div>
  );
}

export const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none';
export const btn = 'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-40';
export const btnGhost = 'rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50';

export function ErrorNote({ error }) {
  return error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">⚠ {error}</p> : null;
}

export function Table({ head, children }) {
  return (
    <div className="-mx-4 overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">{head.map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}
