'use client';
// One lesson on its own page. If the lesson has `code`, a live React playground is shown to edit and run it.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { loadProgress, saveProgress } from './CourseHome';

const ReactPad = dynamic(() => import('@/components/lab/ReactPad'), { ssr: false });

export default function CourseLesson({ config }) {
  const { base, storageKey, modules, labNames } = config;
  const [pos, setPos] = useState(null);
  const [progress, setProgress] = useState({ lessons: {}, quiz: {} });
  const all = modules.flatMap((m) => m.lessons.map((_, i) => ({ m: m.id, l: i })));

  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search);
      const m = modules.find((x) => x.id === p.get('m')) || modules[0];
      setPos({ m: m.id, l: Math.min(Math.max(0, Number(p.get('l') || 0)), m.lessons.length - 1) });
    };
    read(); window.addEventListener('popstate', read);
    setProgress(loadProgress(storageKey));
    return () => window.removeEventListener('popstate', read);
  }, [modules, storageKey]);
  if (!pos) return <main className="min-h-screen bg-slate-900" />;

  const mi = modules.findIndex((x) => x.id === pos.m);
  const mod = modules[mi];
  const lesson = mod.lessons[pos.l];
  const key = `${pos.m}|${pos.l}`;
  const done = !!progress.lessons[key];
  const at = all.findIndex((x) => x.m === pos.m && x.l === pos.l);
  const isLastInModule = pos.l === mod.lessons.length - 1;
  const go = (p) => { window.history.pushState(null, '', `${base}/lesson?m=${p.m}&l=${p.l}`); setPos(p); window.scrollTo(0, 0); };
  const toggleDone = () => {
    const next = { ...progress, lessons: { ...progress.lessons, [key]: !done } };
    setProgress(next); saveProgress(storageKey, next);
    if (!done && !isLastInModule) go(all[at + 1]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className={`mx-auto px-4 py-6 ${lesson.code ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <Link href={`${base}/module?m=${mod.id}`} className="text-sm font-semibold text-sky-300">← {mod.emoji} {mod.title} - all lessons</Link>
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
          {lesson.code && (
            <div>
              <p className="mb-2 font-bold text-indigo-800">⚛️ Live example - edit the code and press Run</p>
              <ReactPad key={key} compact initialCode={lesson.code} storageKey={`${storageKey}:code:${key}`} />
            </div>
          )}
          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-4">
            <p className="font-bold text-green-800">🖐️ Do it yourself</p>
            <p className="mt-1">{lesson.practice}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!lesson.code && <Link href={`/computer-lab?tool=${lesson.lab}`} target="_blank" className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">Open {labNames[lesson.lab]} in the Lab ↗</Link>}
              <button onClick={toggleDone} className={`rounded-full px-4 py-2 text-sm font-bold ${done ? 'bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{done ? '↩️ Mark as not done' : '✅ I have done it - next lesson'}</button>
            </div>
          </div>
        </article>

        <div className="mt-5 flex flex-wrap justify-between gap-2">
          <button disabled={at <= 0} onClick={() => go(all[at - 1])} className="rounded-full bg-white/10 px-5 py-2 font-bold disabled:opacity-40">← Previous lesson</button>
          {isLastInModule
            ? <Link href={`${base}/module?m=${mod.id}&quiz=1`} className="rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">Take the {mod.title} quiz 📝</Link>
            : <button onClick={() => go(all[at + 1])} className="rounded-full bg-sky-400 px-5 py-2 font-bold text-slate-900">Next lesson →</button>}
        </div>
      </div>
    </main>
  );
}
