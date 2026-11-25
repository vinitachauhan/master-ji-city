'use client';
// One course module on its own page - its lessons (each on its own page) and the module quiz.
// /computer-course/module?m=excel   (&quiz=1 opens the quiz). Used by the Computer Course and the React Course.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Quiz from '@/components/Quiz';
import { PASS_PERCENT, moduleQuiz } from '@/lib/data/computerCourse.mjs';
import { loadProgress, saveProgress } from './CourseHome';

export default function CourseModule({ config }) {
  const { base, storageKey, modules, labNames } = config;
  const [progress, setProgress] = useState({ lessons: {}, quiz: {} });
  const [active, setActive] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search);
      setActive(modules.some((m) => m.id === q.get('m')) ? q.get('m') : modules[0].id);
      setShowQuiz(q.get('quiz') === '1');
    };
    read(); window.addEventListener('popstate', read);
    setProgress(loadProgress(storageKey));
    return () => window.removeEventListener('popstate', read);
  }, [storageKey, modules]);
  const update = (fn) => setProgress((p) => { const next = fn(p); saveProgress(storageKey, next); return next; });

  const mod = modules.find((m) => m.id === active);
  const quiz = useMemo(() => (mod ? moduleQuiz(mod) : []), [mod]);
  if (!mod) return <main className="min-h-screen bg-slate-900" />;
  const idx = modules.findIndex((m) => m.id === active);
  const lessonKey = (i) => `${mod.id}|${i}`;
  const passed = (m) => (progress.quiz[m.id] ?? 0) >= PASS_PERCENT;
  const go = (id) => { window.history.pushState(null, '', `${base}/module?m=${id}`); setActive(id); setShowQuiz(false); window.scrollTo(0, 0); };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link href={base} className="text-sm font-semibold text-sky-300">← {config.title} - all modules</Link>
          <Link href={config.labLink} className="rounded-full border border-sky-400 px-4 py-1.5 text-sm font-bold text-sky-300 hover:bg-sky-400 hover:text-slate-900">🖥️ Open the Lab</Link>
        </div>
        <section className="mt-4 overflow-hidden rounded-3xl bg-white text-slate-900">
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
                  <button disabled={idx === 0} onClick={() => go(modules[idx - 1].id)} className="rounded-full bg-slate-100 px-4 py-2 font-bold disabled:opacity-40">← Previous module</button>
                  <button onClick={() => setShowQuiz(true)} className="rounded-full bg-indigo-600 px-5 py-2 font-bold text-white">Take the module quiz 📝</button>
                </div>
              </div>
            )}
            {showQuiz && (
              <div>
                {progress.quiz[mod.id] !== undefined && <p className={`mb-3 rounded-lg p-3 text-sm font-semibold ${passed(mod) ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>Your best score: {progress.quiz[mod.id]}% {passed(mod) ? '- module passed ✅' : `- you need ${PASS_PERCENT}% to pass. Read the lessons again and retry.`}</p>}
                <Quiz questions={quiz} resetKey={mod.id} onFinish={(score, total) => { const pct = Math.round((score / total) * 100); update((p) => ({ ...p, quiz: { ...p.quiz, [mod.id]: Math.max(pct, p.quiz[mod.id] || 0) } })); }} />
                {idx + 1 < modules.length && <button onClick={() => go(modules[idx + 1].id)} className="mt-4 rounded-full bg-indigo-600 px-5 py-2 font-bold text-white">Next module: {modules[idx + 1].title} →</button>}
              </div>
            )}
          </div>
        </section>

        <div className="mt-5 flex flex-wrap justify-between gap-2">
          {idx > 0 ? <button onClick={() => go(modules[idx - 1].id)} className="rounded-full bg-white/10 px-5 py-2 font-bold">← {modules[idx - 1].title}</button> : <span />}
          {idx + 1 < modules.length && <button onClick={() => go(modules[idx + 1].id)} className="rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">{modules[idx + 1].title} →</button>}
        </div>
      </div>
    </main>
  );
}
