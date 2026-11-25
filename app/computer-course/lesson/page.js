'use client';
// One Computer Course lesson on its own page: /computer-course/lesson?m=excel&l=2
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COMPUTER_COURSE } from '@/lib/data/computerCourse.mjs';

const LAB_NAMES = { paint: '🎨 Paint', notepad: '🗒️ Notepad', wordpad: '📝 WordPad', excel: '📊 Excel', typing: '⌨️ Typing', code: '🌐 HTML & JS', python: '🐍 Python' };
const KEY = 'computerCourse:progress';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const save = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* private mode */ } };
// every lesson of the course in order, so Next / Previous can cross into the next module
const ALL = COMPUTER_COURSE.flatMap((m) => m.lessons.map((_, i) => ({ m: m.id, l: i })));

export default function Lesson() {
  const [pos, setPos] = useState(null);
  const [progress, setProgress] = useState({ lessons: {}, quiz: {} });

  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search);
      const m = COMPUTER_COURSE.find((x) => x.id === p.get('m')) || COMPUTER_COURSE[0];
      setPos({ m: m.id, l: Math.min(Math.max(0, Number(p.get('l') || 0)), m.lessons.length - 1) });
    };
    read(); window.addEventListener('popstate', read);
    const pr = load(); setProgress({ lessons: pr.lessons || {}, quiz: pr.quiz || {} });
    return () => window.removeEventListener('popstate', read);
  }, []);
  if (!pos) return <main className="min-h-screen bg-slate-900" />;

  const mi = COMPUTER_COURSE.findIndex((x) => x.id === pos.m);
  const mod = COMPUTER_COURSE[mi];
  const lesson = mod.lessons[pos.l];
  const key = `${pos.m}|${pos.l}`;
  const done = !!progress.lessons[key];
  const at = ALL.findIndex((x) => x.m === pos.m && x.l === pos.l);
  const go = (p) => { window.history.pushState(null, '', `/computer-course/lesson?m=${p.m}&l=${p.l}`); setPos(p); window.scrollTo(0, 0); };
  const isLastInModule = pos.l === mod.lessons.length - 1;
  const toggleDone = () => {
    const next = { ...progress, lessons: { ...progress.lessons, [key]: !done } };
    setProgress(next); save(next);
    if (!done && ALL[at + 1] && !isLastInModule) go(ALL[at + 1]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Link href={`/computer-course?m=${mod.id}`} className="text-sm font-semibold text-sky-300">← {mod.emoji} {mod.title} - all lessons</Link>
        <p className="mt-4 text-sm text-sky-200">Module {mi + 1} · Lesson {pos.l + 1} of {mod.lessons.length}</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{done ? '✅ ' : ''}{lesson.title}</h1>

        <article className="mt-5 space-y-4 rounded-3xl bg-white p-5 text-slate-900 sm:p-7">
          <p className="text-lg leading-relaxed">{lesson.learn}</p>
          <div className="rounded-xl bg-sky-50 p-4">
            <p className="font-bold text-sky-800">👣 Step by step</p>
            <ol className="mt-1 list-decimal space-y-1 pl-6 font-mono text-sm sm:text-base">{lesson.steps.map((s) => <li key={s} className="whitespace-pre-wrap">{s}</li>)}</ol>
          </div>
          {lesson.keys.length > 0 && (
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="font-bold text-amber-800">⌨️ Shortcut keys</p>
              <div className="mt-2 flex flex-wrap gap-2">{lesson.keys.map(([k, w]) => <span key={k} className="rounded-lg border border-amber-200 bg-white px-2 py-1 text-sm"><kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-white">{k}</kbd> {w}</span>)}</div>
            </div>
          )}
          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-4">
            <p className="font-bold text-green-800">🖐️ Do it yourself</p>
            <p className="mt-1">{lesson.practice}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/computer-lab?tool=${lesson.lab}`} target="_blank" className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">Open {LAB_NAMES[lesson.lab]} in the Lab ↗</Link>
              <button onClick={toggleDone} className={`rounded-full px-4 py-2 text-sm font-bold ${done ? 'bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{done ? '↩️ Mark as not done' : '✅ I have done it - next lesson'}</button>
            </div>
          </div>
        </article>

        <div className="mt-5 flex flex-wrap justify-between gap-2">
          <button disabled={at <= 0} onClick={() => go(ALL[at - 1])} className="rounded-full bg-white/10 px-5 py-2 font-bold disabled:opacity-40">← Previous lesson</button>
          {isLastInModule
            ? <Link href={`/computer-course?m=${mod.id}&quiz=1`} className="rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">Take the {mod.title} quiz 📝</Link>
            : <button onClick={() => go(ALL[at + 1])} className="rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">Next lesson →</button>}
        </div>
      </div>
    </main>
  );
}
