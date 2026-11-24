'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SCHOLARSHIPS, FREE_COURSES } from '@/lib/data/college.mjs';

const STREAMS = ['PCM', 'PCB', 'Commerce', 'Arts'];
const CITIES = ['Delhi', 'Noida', 'Bulandshahr'];

export default function CollegeGuide() {
  const [stream, setStream] = useState('PCM');
  const [city, setCity] = useState('All');
  const [list, setList] = useState([]);

  useEffect(() => { fetch(`/api/colleges?stream=${stream}`).then((r) => r.json()).then((d) => setList(d.colleges || [])); }, [stream]);

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link href="/college-study" className="text-sm font-semibold text-neon">← College Study</Link>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">🧭 College <span className="text-neon">Guide</span></h1>

        <section className="mt-6">
          <h2 className="text-2xl font-bold">Which Course Should I Take After Class 12?</h2>
          <p className="text-slate-300">Fees, duration, best colleges in your city, jobs and salary</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STREAMS.map((s) => (
              <button key={s} onClick={() => setStream(s)} className={`rounded-lg px-4 py-2 font-bold ${stream === s ? 'bg-neon text-navy-900' : 'border border-white/15 bg-navy-800 hover:border-neon/60'}`}>12th {s}</button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="py-1.5 text-slate-400">City:</span>
            {['All', ...CITIES].map((c) => (
              <button key={c} onClick={() => setCity(c)} className={`rounded-full px-3 py-1.5 font-semibold ${city === c ? 'bg-white text-navy-900' : 'bg-white/10 hover:bg-white/20'}`}>{c}</button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {list.map((c) => (
              <article key={c.courseName} className="rounded-2xl border border-white/15 bg-navy-800 p-5">
                <h3 className="text-xl font-extrabold text-neon">{c.courseName}</h3>
                <dl className="mt-2 grid grid-cols-[90px_1fr] gap-y-1 text-sm">
                  <dt className="text-slate-400">Duration</dt><dd>{c.duration}</dd>
                  <dt className="text-slate-400">Fees</dt><dd>{c.fees}</dd>
                  <dt className="text-slate-400">Jobs</dt><dd>{c.jobs.join(', ')}</dd>
                  <dt className="text-slate-400">Salary</dt><dd className="font-semibold">{c.salary}</dd>
                </dl>
                <div className="mt-3 space-y-2">
                  {(city === 'All' ? CITIES : [city]).map((ct) => (
                    <div key={ct} className="rounded-lg bg-white/5 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-neon">📍 {ct}</p>
                      <p className="text-sm">{(c.colleges[ct] || []).join(' · ') || '-'}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Fees and salaries are approximate. Before admission, check fees, seats and last dates on the college's official website.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">💸 Short on Money? <span className="text-neon">Don't Worry!</span></h2>
          <p className="text-slate-300">Scholarships, UP Scholarship and free courses</p>
          <h3 className="mt-4 text-lg font-bold text-neon">🎖️ Scholarships</h3>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            {SCHOLARSHIPS.map((s) => (
              <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 bg-white p-4 text-slate-900 hover:border-neon">
                <p className="font-bold">{s.name}</p>
                <p className="text-sm text-slate-600"><b>Who for:</b> {s.who}</p>
                <p className="text-sm text-slate-600"><b>How:</b> {s.how}</p>
              </a>
            ))}
          </div>
          <h3 className="mt-6 text-lg font-bold text-neon">🆓 Free / Low-Fee Courses</h3>
          <div className="mt-2 grid gap-3 md:grid-cols-3">
            {FREE_COURSES.map((f) => (
              <a key={f.name} href={f.link} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 bg-navy-800 p-4 hover:border-neon">
                <p className="font-bold text-neon">{f.name}</p>
                <p className="text-sm text-slate-300">{f.what}</p>
              </a>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-white/5 p-4 text-sm text-slate-300">💡 Tip: Government colleges have the lowest fees. Use CUET for DU / Central Universities; in UP, state university (CCSU Meerut) colleges - like DAV PG College in Bulandshahr.</p>
        </section>
      </div>
    </main>
  );
}
