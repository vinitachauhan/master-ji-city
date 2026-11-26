'use client';
// Home page: "Apne Sheher Ka School Dhoondho" - students pick their city and see the schools near them.
import { useMemo, useState } from 'react';
import { useDirectory, CITIES, countByCity } from './useDirectory';

export default function SchoolFinder() {
  const d = useDirectory();
  const [city, setCity] = useState('Gulaothi');
  const [q, setQ] = useState('');
  const counts = countByCity(d.schools);
  const list = useMemo(() => d.schools
    .filter((s) => s.city === city && (!q.trim() || s.name.toLowerCase().includes(q.trim().toLowerCase())))
    .sort((a, b) => a.name.localeCompare(b.name)), [d.schools, city, q]);

  return (
    <section className="mt-4 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-3xl">🏫</p>
      <h2 className="text-2xl font-extrabold text-slate-900">Apne Sheher Ka School Dhoondho</h2>
      <p className="text-slate-600">Find the schools of your city - Gulaothi, Bulandshahr, Sikandrabad, Delhi, Lucknow, Dehradun.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {CITIES.map((c) => (
          <button key={c} onClick={() => setCity(c)} className={`rounded-full px-4 py-2 font-bold ${city === c ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}>
            📍 {c} <span className="opacity-70">({counts[c]})</span>
          </button>
        ))}
      </div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 School ka naam likho..." className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
      {d.loading ? <p className="mt-3 text-slate-500">Loading...</p> : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <div key={s.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-extrabold text-slate-900">{s.name}</p>
              <p className="text-sm text-emerald-700">📍 {s.city}</p>
              <div className="mt-2 flex flex-wrap gap-1 text-xs font-semibold">
                <span className="rounded bg-slate-100 px-2 py-0.5">{s.type}</span>
                <span className="rounded bg-slate-100 px-2 py-0.5">{s.board}</span>
                <span className="rounded bg-slate-100 px-2 py-0.5">Classes: {s.classes}</span>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-slate-500">No school found in {city}.</p>}
        </div>
      )}
      <p className="mt-3 text-xs text-slate-500">Please confirm admission details directly with the school.</p>
    </section>
  );
}
