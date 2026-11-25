'use client';
// Complete Computer Course - 16 modules, step-by-step lessons, practicals in the Computer Lab, module quizzes and a certificate.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Quiz from '@/components/Quiz';
import { useProfile } from '@/components/Profile';
import { COMPUTER_COURSE, PASS_PERCENT, moduleQuiz } from '@/lib/data/computerCourse.mjs';

const LAB_NAMES = { paint: '🎨 Paint', notepad: '🗒️ Notepad', wordpad: '📝 WordPad', excel: '📊 Excel', typing: '⌨️ Typing', code: '🌐 HTML & JS', python: '🐍 Python' };
const KEY = 'computerCourse:progress';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const save = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* private mode */ } };

export default function ComputerCourse() {
  const { profile } = useProfile();
  const [progress, setProgress] = useState({ lessons: {}, quiz: {} });
  const [active, setActive] = useState(COMPUTER_COURSE[0].id);
  const [open, setOpen] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => { const p = load(); setProgress({ lessons: p.lessons || {}, quiz: p.quiz || {} }); }, []);
  useEffect(() => { if (profile?.name && !name) setName(profile.name); }, [profile, name]);
  const update = (fn) => setProgress((p) => { const next = fn(p); save(next); return next; });

  const mod = COMPUTER_COURSE.find((m) => m.id === active);
  const quiz = useMemo(() => moduleQuiz(mod), [mod]);
  const totalLessons = COMPUTER_COURSE.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = Object.values(progress.lessons).filter(Boolean).length;
  const passed = (m) => (progress.quiz[m.id] ?? 0) >= PASS_PERCENT;
  const modulesPassed = COMPUTER_COURSE.filter(passed).length;
  const allDone = modulesPassed === COMPUTER_COURSE.length;
  const avg = Math.round(COMPUTER_COURSE.reduce((a, m) => a + (progress.quiz[m.id] || 0), 0) / COMPUTER_COURSE.length);
  const totalHours = COMPUTER_COURSE.reduce((a, m) => a + m.hours, 0);

  const pick = (id) => { setActive(id); setOpen(0); setShowQuiz(false); document.getElementById('module')?.scrollIntoView({ behavior: 'smooth' }); };
  const lessonKey = (i) => `${mod.id}|${i}`;
  const idx = COMPUTER_COURSE.findIndex((m) => m.id === active);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link href="/" className="text-sm font-semibold text-sky-300">← Home</Link>
          <Link href="/computer-lab" className="rounded-full border border-sky-400 px-4 py-1.5 text-sm font-bold text-sky-300 hover:bg-sky-400 hover:text-slate-900">🖥️ Open Computer Lab</Link>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">💻 Complete Computer Course</h1>
        <p className="mt-1 text-lg text-slate-300">From zero to job-ready: basics, Windows, typing, Paint, Notepad, WordPad, Word, Excel, PowerPoint, Internet, cyber safety, Tally, HTML/CSS, JavaScript, Python, AI and career - {COMPUTER_COURSE.length} modules, {totalLessons} lessons, about {totalHours} hours. Learn every lesson and do it yourself in the Computer Lab.</p>

        {/* Progress */}
        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          {[['📖 Lessons done', `${doneLessons} / ${totalLessons}`, doneLessons / totalLessons], ['✅ Modules passed', `${modulesPassed} / ${COMPUTER_COURSE.length}`, modulesPassed / COMPUTER_COURSE.length], ['🎯 Average quiz score', `${avg}%`, avg / 100]].map(([t, v, f]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">{t}</p>
              <p className="text-2xl font-extrabold">{v}</p>
              <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-sky-400" style={{ width: `${Math.round(f * 100)}%` }} /></div>
            </div>
          ))}
        </section>

        {/* Modules */}
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Course modules - start from 1, or jump to any module</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {COMPUTER_COURSE.map((m, i) => {
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

        {/* Module */}
        <section id="module" className="mt-6 overflow-hidden rounded-3xl bg-white text-slate-900">
          <div className="bg-gradient-to-r from-indigo-700 to-sky-600 p-5 text-white">
            <p className="text-sm font-semibold text-sky-100">Module {idx + 1} of {COMPUTER_COURSE.length} · {mod.level} · about {mod.hours} hours</p>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{mod.emoji} {mod.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => setShowQuiz(false)} className={`rounded-lg px-3 py-2 text-sm font-bold ${!showQuiz ? 'bg-white text-indigo-800' : 'bg-white/15'}`}>📑 Lessons ({mod.lessons.length})</button>
              <button onClick={() => setShowQuiz(true)} className={`rounded-lg px-3 py-2 text-sm font-bold ${showQuiz ? 'bg-white text-indigo-800' : 'bg-white/15'}`}>📝 Module Quiz ({mod.quiz.length} questions, pass {PASS_PERCENT}%)</button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {!showQuiz && (
              <div className="space-y-3">
                {mod.lessons.map((l, i) => {
                  const done = !!progress.lessons[lessonKey(i)];
                  return (
                    <div key={l.title} className={`rounded-2xl border ${done ? 'border-green-300' : 'border-slate-200'}`}>
                      <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
                        <span className="font-bold">{done ? '✅' : `${i + 1}.`} {l.title}</span><span className="text-slate-400">{open === i ? '−' : '+'}</span>
                      </button>
                      {open === i && (
                        <div className="space-y-4 border-t border-slate-200 p-4">
                          <p className="leading-relaxed">{l.learn}</p>
                          <div className="rounded-xl bg-sky-50 p-4">
                            <p className="font-bold text-sky-800">👣 Step by step</p>
                            <ol className="mt-1 list-decimal space-y-1 pl-6 font-mono text-sm sm:text-base">{l.steps.map((s) => <li key={s} className="whitespace-pre-wrap">{s}</li>)}</ol>
                          </div>
                          {l.keys.length > 0 && (
                            <div className="rounded-xl bg-amber-50 p-4">
                              <p className="font-bold text-amber-800">⌨️ Shortcut keys</p>
                              <div className="mt-2 flex flex-wrap gap-2">{l.keys.map(([k, w]) => <span key={k} className="rounded-lg border border-amber-200 bg-white px-2 py-1 text-sm"><kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-white">{k}</kbd> {w}</span>)}</div>
                            </div>
                          )}
                          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-4">
                            <p className="font-bold text-green-800">🖐️ Do it yourself</p>
                            <p className="mt-1">{l.practice}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Link href={`/computer-lab?tool=${l.lab}`} target="_blank" className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">Open {LAB_NAMES[l.lab]} in the Lab ↗</Link>
                              <button onClick={() => { update((p) => ({ ...p, lessons: { ...p.lessons, [lessonKey(i)]: !done } })); if (!done && i + 1 < mod.lessons.length) setOpen(i + 1); }}
                                className={`rounded-full px-4 py-2 text-sm font-bold ${done ? 'bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{done ? '↩️ Mark as not done' : '✅ I have done it - next lesson'}</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex flex-wrap justify-between gap-2 pt-2">
                  <button disabled={idx === 0} onClick={() => pick(COMPUTER_COURSE[idx - 1].id)} className="rounded-full bg-slate-100 px-4 py-2 font-bold disabled:opacity-40">← Previous module</button>
                  <button onClick={() => setShowQuiz(true)} className="rounded-full bg-indigo-600 px-5 py-2 font-bold text-white">Take the module quiz 📝</button>
                </div>
              </div>
            )}
            {showQuiz && (
              <div>
                {progress.quiz[mod.id] !== undefined && <p className={`mb-3 rounded-lg p-3 text-sm font-semibold ${passed(mod) ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>Your best score: {progress.quiz[mod.id]}% {passed(mod) ? '- module passed ✅' : `- you need ${PASS_PERCENT}% to pass. Read the lessons again and retry.`}</p>}
                <Quiz questions={quiz} resetKey={mod.id} onFinish={(score, total) => { const pct = Math.round((score / total) * 100); update((p) => ({ ...p, quiz: { ...p.quiz, [mod.id]: Math.max(pct, p.quiz[mod.id] || 0) } })); }} />
                {idx + 1 < COMPUTER_COURSE.length && <button onClick={() => pick(COMPUTER_COURSE[idx + 1].id)} className="mt-4 rounded-full bg-indigo-600 px-5 py-2 font-bold text-white">Next module: {COMPUTER_COURSE[idx + 1].title} →</button>}
              </div>
            )}
          </div>
        </section>

        {/* Certificate */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-extrabold">🏆 Course Completion Certificate</h2>
          {!allDone ? (
            <p className="mt-1 text-slate-300">Pass all {COMPUTER_COURSE.length} module quizzes ({PASS_PERCENT}% or more) to get your certificate. Passed so far: {modulesPassed}.</p>
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
                <p className="mt-3">has successfully completed the <b>Complete Computer Course</b> ({COMPUTER_COURSE.length} modules, about {totalHours} hours of learning and practicals) with an average quiz score of <b>{avg}%</b>.</p>
                <p className="mt-3 text-sm text-slate-600">Computer Fundamentals · Windows · Typing · Paint · Notepad · WordPad · MS Word · MS Excel · PowerPoint · Internet · Cyber Safety · Tally with GST · HTML & CSS · JavaScript · Python · AI · Career</p>
                <p className="mt-5 text-sm">Date: {new Date().toLocaleDateString('en-IN')}</p>
                <p className="mt-2 text-xs text-slate-500">A practice certificate from the Master Ji learning website. For government jobs, also take an official certificate such as NIELIT CCC or O Level.</p>
              </div>
              <button onClick={() => window.print()} className="mt-4 rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">🖨️ Print / Save as PDF</button>
            </>
          )}
        </section>
      </div>
      <style>{`@media print { body * { visibility: hidden; } #course-certificate, #course-certificate * { visibility: visible; } #course-certificate { position: absolute; left: 0; top: 0; width: 100%; } }`}</style>
    </main>
  );
}
