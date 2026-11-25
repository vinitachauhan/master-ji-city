'use client';
// Course home - modules, progress, module quizzes and a certificate. Used by the Computer Course and the React Course.
// config: { base, storageKey, title, intro, modules, labNames, labLink, certCourse, certTopics, certNote }
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import { PASS_PERCENT } from '@/lib/data/computerCourse.mjs';

export const loadProgress = (key) => { try { const p = JSON.parse(localStorage.getItem(key) || '{}'); return { lessons: p.lessons || {}, quiz: p.quiz || {} }; } catch { return { lessons: {}, quiz: {} }; } };
export const saveProgress = (key, p) => { try { localStorage.setItem(key, JSON.stringify(p)); } catch { /* private mode */ } };

export default function CourseHome({ config }) {
  const { base, storageKey, modules, labNames } = config;
  const { profile } = useProfile();
  const [progress, setProgress] = useState({ lessons: {}, quiz: {} });
  const [name, setName] = useState('');

  useEffect(() => {
    setProgress(loadProgress(storageKey));
    // old links (?m=excel&quiz=1) open the module page
    const q = new URLSearchParams(window.location.search);
    if (modules.some((m) => m.id === q.get('m'))) window.location.replace(`${base}/module?m=${q.get('m')}${q.get('quiz') === '1' ? '&quiz=1' : ''}`);
  }, [storageKey, modules, base]);
  useEffect(() => { if (profile?.name && !name) setName(profile.name); }, [profile, name]);

  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = Object.values(progress.lessons).filter(Boolean).length;
  const passed = (m) => (progress.quiz[m.id] ?? 0) >= PASS_PERCENT;
  const modulesPassed = modules.filter(passed).length;
  const allDone = modulesPassed === modules.length;
  const avg = Math.round(modules.reduce((a, m) => a + (progress.quiz[m.id] || 0), 0) / modules.length);
  const totalHours = modules.reduce((a, m) => a + m.hours, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link href="/" className="text-sm font-semibold text-sky-300">← Home</Link>
          <Link href={config.labLink} className="rounded-full border border-sky-400 px-4 py-1.5 text-sm font-bold text-sky-300 hover:bg-sky-400 hover:text-slate-900">🖥️ Open the Lab</Link>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">{config.title}</h1>
        <p className="mt-1 text-lg text-slate-300">{config.intro} - {modules.length} modules, {totalLessons} lessons, about {totalHours} hours.</p>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          {[['📖 Lessons done', `${doneLessons} / ${totalLessons}`, doneLessons / totalLessons], ['✅ Modules passed', `${modulesPassed} / ${modules.length}`, modulesPassed / modules.length], ['🎯 Average quiz score', `${avg}%`, avg / 100]].map(([t, v, f]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">{t}</p>
              <p className="text-2xl font-extrabold">{v}</p>
              <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-sky-400" style={{ width: `${Math.round(f * 100)}%` }} /></div>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Course modules - each module opens on its own page with its lessons and quiz</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => {
              const done = m.lessons.filter((_, j) => progress.lessons[`${m.id}|${j}`]).length;
              return (
                <Link key={m.id} href={`${base}/module?m=${m.id}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:-translate-y-0.5 hover:border-sky-400/60">
                  <div className="flex items-center justify-between"><span className="text-2xl">{m.emoji}</span>{passed(m) ? <span className="rounded-full bg-green-500 px-2 text-xs font-bold">PASSED {progress.quiz[m.id]}%</span> : <span className="text-xs text-slate-400">{m.level}</span>}</div>
                  <p className="mt-1 font-bold">{i + 1}. {m.title}</p>
                  <p className="text-xs text-slate-400">{done}/{m.lessons.length} lessons · {m.hours} h</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-extrabold">🏆 Course Completion Certificate</h2>
          {!allDone ? (
            <p className="mt-1 text-slate-300">Pass all {modules.length} module quizzes ({PASS_PERCENT}% or more) to get your certificate. Passed so far: {modulesPassed}.</p>
          ) : (
            <>
              <label className="mt-2 block text-sm text-slate-300">Name on the certificate
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full max-w-sm rounded-lg px-3 py-2 text-slate-900" /></label>
              <div id="course-certificate" className="mx-auto mt-4 max-w-3xl rounded-2xl border-8 border-double border-indigo-700 bg-white p-8 text-center text-slate-900">
                <p className="text-4xl">🎓</p>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-700">Master Ji - City</p>
                <h3 className="mt-2 text-3xl font-black">Certificate of Completion</h3>
                <p className="mt-4">This is to certify that</p>
                <p className="mt-1 text-3xl font-extrabold text-indigo-800">{name || 'Your Name'}</p>
                <p className="mt-3">has successfully completed the <b>{config.certCourse}</b> ({modules.length} modules, about {totalHours} hours of learning and practicals) with an average quiz score of <b>{avg}%</b>.</p>
                <p className="mt-3 text-sm text-slate-600">{config.certTopics}</p>
                <p className="mt-5 text-sm">Date: {new Date().toLocaleDateString('en-IN')}</p>
                <p className="mt-2 text-xs text-slate-500">{config.certNote}</p>
              </div>
              <button onClick={() => window.print()} className="mt-4 rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">🖨️ Print / Save as PDF</button>
            </>
          )}
        </section>
      </div>
      <style>{'@media print { body * { visibility: hidden; } #course-certificate, #course-certificate * { visibility: visible; } #course-certificate { position: absolute; left: 0; top: 0; width: 100%; } }'}</style>
    </main>
  );
}
