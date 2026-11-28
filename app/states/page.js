'use client';
// States of India - pick any state or UT to study it and learn its language.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { STATES, LANGUAGES, statesForLanguage, urlStates } from '@/lib/statesStudy.mjs';
import { Crumbs } from '@/components/study/common';

export default function StatesHome() {
  const [kind, setKind] = useState('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => STATES
    .filter((s) => kind === 'All' || s.kind === kind)
    .filter((s) => !q.trim() || `${s.name} ${s.capital}`.toLowerCase().includes(q.trim().toLowerCase())), [kind, q]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs className="text-orange-700" items={[['🏠 Home', '/'], ['States of India']]} />
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl">🗺️ States of India</h1>
        <p className="text-lg font-semibold text-green-700">Study any state - history, geography, culture, food, places, economy, school board - and learn its language.</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {[['All', STATES.length], ['State', STATES.filter((s) => s.kind === 'State').length], ['Union Territory', STATES.filter((s) => s.kind !== 'State').length]].map(([k, n]) => (
            <button key={k} onClick={() => setKind(k)} className={`rounded-full px-4 py-2 text-sm font-bold ${kind === k ? 'bg-orange-500 text-white' : 'bg-white text-slate-700 shadow-sm hover:bg-orange-50'}`}>
              {k === 'State' ? 'States' : k === 'Union Territory' ? 'Union Territories' : 'All'} ({n})
            </button>
          ))}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Search a state or capital..." className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-orange-500 focus:outline-none" />

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((s) => (
            <Link key={s.id} href={urlStates.state(s.id)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-md">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{s.kind}</p>
              <p className="text-lg font-extrabold text-slate-900">{s.name}</p>
              <p className="text-sm text-slate-600">🏛️ {s.capital}</p>
              <p className="text-sm text-green-700">🗣️ {s.langs.map((c) => LANGUAGES[c].name).join(', ')}</p>
            </Link>
          ))}
          {list.length === 0 && <p className="text-slate-500">No state found.</p>}
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-slate-900">🗣️ Learn the Languages of India</h2>
          <p className="text-slate-600">Everyday words in their own script, how to say them, meaning in English and Hindi, numbers 1-10 and a practice quiz.</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(LANGUAGES).map(([code, l]) => (
              <Link key={code} href={urlStates.language(code)} className="rounded-2xl border border-green-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:border-green-500">
                <p className="text-xl font-extrabold text-green-800" dir={l.rtl ? 'rtl' : undefined}>{l.native}</p>
                <p className="font-bold text-slate-800">{l.name}</p>
                <p className="text-xs text-slate-500">{statesForLanguage(code).length} states / UTs</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
