'use client';
// Course home - modules, progress, module quizzes and a certificate. Used by the Computer Course and the React Course.
// config: { base, storageKey, title, intro, modules, labNames, labLink, certCourse, certTopics, certNote }
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Quiz from '@/components/Quiz';
import { useProfile } from '@/components/Profile';
import { PASS_PERCENT, moduleQuiz } from '@/lib/data/computerCourse.mjs';

export const loadProgress = (key) => { try { const p = JSON.parse(localStorage.getItem(key) || '{}'); return { lessons: p.lessons || {}, quiz: p.quiz || {} }; } catch { return { lessons: {}, quiz: {} }; } };
export const saveProgress = (key, p) => { try { localStorage.setItem(key, JSON.stringify(p)); } catch { /* private mode */ } };

export default function CourseHome({ config }) {
  const { base, storageKey, modules, labNames } = config;
  const { profile } = useProfile();
  const [progress, setProgress] = useState({ lessons: {}, quiz: {} });
  const [active, setActive] = useState(modules[0].id);
  const [showQuiz, setShowQuiz] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setProgress(loadProgress(storageKey));
    // open a module (and its quiz) from the address, e.g. ?m=excel&quiz=1
    const q = new URLSearchParams(window.location.search);
    if (modules.some((m) => m.id === q.get('m'))) { setActive(q.get('m')); setShowQuiz(q.get('quiz') === '1'); }
  }, [storageKey, modules]);
  useEffect(() => { if (profile?.name && !name) setName(profile.name); }, [profile, name]);
  const update = (fn) => setProgress((p) => { const next = fn(p); saveProgress(storageKey, next); return next; });

  const mod = modules.find((m) => m.id === active);
  const quiz = useMemo(() => moduleQuiz(mod), [mod]);
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = Object.values(progress.lessons).filter(Boolean).length;
  const passed = (m) => (progress.quiz[m.id] ?? 0) >= PASS_PERCENT;
  const modulesPassed = modules.filter(passed).length;
  const allDone = modulesPassed === modules.length;
  const avg = Math.round(modules.reduce((a, m) => a + (progress.quiz[m.id] || 0), 0) / modules.length);
  const totalHours = modules.reduce((a, m) => a + m.hours, 0);
  const idx = modules.findIndex((m) => m.id === active);
  const lessonKey = (i) => `${mod.id}|${i}`;
  const pick = (id) => { setActive(id); setShowQuiz(false); window.history.replaceState(null, '', `${base}?m=${id}`); document.getElementById('module')?.scrollIntoView({ behavior: 'smooth' }); };

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
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Course modules - start from 1, or jump to any module</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => {
              const done = m.lessons.filter((_, j) => progress.lessons[`${m.id}|${j}`]).length;
              return (
                <button key={m.id} onClick={() => pick(m.id)}
                  className={`rounded-2xl border p-3 text-left transition ${active === m.id ? 'border-sky-400 bg-sky-400/15' : 'border-white/10 bg-white/5 hover:border-sky-400/60'}`}>
                  <div className="flex items-center justify-between"><span className="text-2xl">{m.emoji}</span>{passed(m) ? <span className="rounded-full bg-green-500 px-2 text-xs font-bold">PASSED {progress.quiz[m.id]}%</span> : <span className="text-xs text-slate-400">{m.level}</span>}</div>
                  <p className="mt-1 font-bold">{i + 1}. {m.title}</p>
                  <p className="text-xs text-slate-400">{done}/{m.lessons.length} lessons · {m.hours} h</p>
                </button>
              );
            })}
          </div>
        </section>

        <section id="module" className="mt-6 overflow-hidden rounded-3xl bg-white text-slate-900">
          <div className="bg-gradient-to-r from-indigo-700 to-sky-600 p-5 text-white">
            <p className="text-sm font-semibold text-sky-100">Module {idx + 1} of {modules.length} · {mod.level} · about {mod.hours} hours</p>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{mod.emoji} {mod.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => setShowQuiz(false)} className={`rounded-lg px-3 py-2 text-sm font-bold ${!showQuiz ? 'bg-white text-indigo-800' : 'bg-white/15'}`}>📑 Lessons ({mod.lessons.length})</button>
              <button onClick={() => setShowQuiz(true)} className={`rounded-lg px-3 py-2 text-sm font-bold ${showQuiz ? 'bg-white text-indigo-800' : 'bg-white/15'}`}>📝 Module Quiz ({mod.quiz.length} questions, pass {PASS_PERCENT}%)</button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {!showQuiz && (
              <div className="space-y-3">
                <p className="text-sm text-slate-500">Click a lesson - it opens on its own page.</p>
                {mod.lessons.map((l, i) => {
                  const done = !!progress.lessons[lessonKey(i)];
                  return (
                    <Link key={l.title} href={`${base}/lesson?m=${mod.id}&l=${i}`}
                      className={`flex items-center gap-3 rounded-2xl border p-4 transition hover:bg-slate-50 ${done ? 'border-green-300' : 'border-slate-200 hover:border-indigo-400'}`}>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-black ${done ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-800'}`}>{done ? '✓' : i + 1}</span>
                      <span className="flex-1 font-bold">{l.title}</span>
                      <span className="hidden text-sm text-slate-500 sm:inline">{labNames[l.lab]}</span>
                      <span className="text-indigo-500">→</span>
                    </Link>
                  );
                })}
                <div className="flex flex-wrap justify-between gap-2 pt-2">
                  <button disabled={idx === 0} onClick={() => pick(modules[idx - 1].id)} className="rounded-full bg-slate-100 px-4 py-2 font-bold disabled:opacity-40">← Previous module</button>
                  <button onClick={() => setShowQuiz(true)} className="rounded-full bg-indigo-600 px-5 py-2 font-bold text-white">Take the module quiz 📝</button>
                </div>
              </div>
            )}
            {showQuiz && (
              <div>
                {progress.quiz[mod.id] !== undefined && <p className={`mb-3 rounded-lg p-3 text-sm font-semibold ${passed(mod) ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>Your best score: {progress.quiz[mod.id]}% {passed(mod) ? '- module passed ✅' : `- you need ${PASS_PERCENT}% to pass. Read the lessons again and retry.`}</p>}
                <Quiz questions={quiz} resetKey={mod.id} onFinish={(score, total) => { const pct = Math.round((score / total) * 100); update((p) => ({ ...p, quiz: { ...p.quiz, [mod.id]: Math.max(pct, p.quiz[mod.id] || 0) } })); }} />
                {idx + 1 < modules.length && <button onClick={() => pick(modules[idx + 1].id)} className="mt-4 rounded-full bg-indigo-600 px-5 py-2 font-bold text-white">Next module: {modules[idx + 1].title} →</button>}
              </div>
            )}
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
