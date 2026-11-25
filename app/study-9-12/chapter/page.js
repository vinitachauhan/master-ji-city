'use client';
// One Class 9-12 chapter on its own page: /study-9-12/chapter?class=10&subject=Science&no=2
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import Quiz from '@/components/Quiz';
import BoloMaster from '@/components/BoloMaster';

const TABS = [['notes', 'COMPLETE Notes'], ['formula', 'Formula / Definition'], ['imp', 'Important (Board)'], ['pyq', 'Previous Year'], ['test', '10 MCQ Test']];
const chapterUrl = (cls, subject, no) => `/study-9-12/chapter?class=${cls}&subject=${encodeURIComponent(subject)}&no=${no}`;

export default function Chapter912() {
  const { addStars } = useProfile();
  const [q, setQ] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [tab, setTab] = useState('notes');

  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search);
      setQ({ cls: p.get('class') || '10', subject: p.get('subject') || 'Science', no: Number(p.get('no') || 1) });
      setTab('notes');
    };
    read(); window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  useEffect(() => {
    if (!q) return;
    fetch(`/api/study-9-12?class=${q.cls}&subject=${encodeURIComponent(q.subject)}`)
      .then((r) => r.json()).then((d) => setChapters(d.chapters || [])).catch(() => setChapters([]));
  }, [q?.cls, q?.subject]); // eslint-disable-line react-hooks/exhaustive-deps
  const go = (no) => { window.history.pushState(null, '', chapterUrl(q.cls, q.subject, no)); setQ({ ...q, no }); setTab('notes'); window.scrollTo(0, 0); };

  const ch = chapters?.find((c) => c.chapterNo === q?.no);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          {q && <Link href={`/study-9-12/study?class=${q.cls}&subject=${encodeURIComponent(q.subject)}`} className="text-sm font-semibold text-blue-100">← Class {q.cls} · {q.subject} - all chapters</Link>}
          {ch && <>
            <p className="mt-2 text-sm font-semibold text-green-200">Class {q.cls} · {q.subject} · Chapter {ch.chapterNo} of {chapters.length}</p>
            <h1 className="text-2xl font-extrabold sm:text-4xl">{ch.chapterName}</h1>
          </>}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {!chapters ? <p className="text-slate-500">Loading...</p> : !ch ? (
          <p>Chapter not found. <Link href="/study-9-12/study" className="font-bold text-blue-700">Choose a chapter</Link></p>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-slate-200 p-4">
                {TABS.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${tab === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}>{t}</button>
                ))}
              </div>
              <div className="p-5">
                {tab === 'notes' && <ol className="space-y-3">{ch.notes.map((n, i) => <li key={i} className="rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">{n}</li>)}</ol>}
                {tab === 'formula' && (
                  <div className="rounded-xl border-2 border-green-300 bg-green-50 p-5">
                    <p className="text-sm font-bold uppercase text-green-700">Formula / Definition - Easy way to remember</p>
                    <p className="mt-2 text-lg font-semibold">{ch.formulas}</p>
                    <p className="mt-3 text-sm text-slate-600">💡 Trick: write it on a card and say it once every morning - you will know it by heart in 7 days!</p>
                  </div>
                )}
                {tab === 'imp' && <ol className="list-decimal space-y-2 pl-5">{ch.importantQuestions.map((x, i) => <li key={i}>{x}</li>)}</ol>}
                {tab === 'pyq' && (
                  <>
                    <p className="mb-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">These questions follow the pattern of past board papers. For the actual papers, see the CBSE / UP Board website.</p>
                    <ol className="list-decimal space-y-2 pl-5">{ch.previousYearQuestions.map((x, i) => <li key={i}>{x}</li>)}</ol>
                  </>
                )}
                {tab === 'test' && <Quiz questions={ch.testQuestions} onCorrect={() => addStars(1)} resetKey={`${q.cls}-${q.subject}-${ch.chapterNo}`} />}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <button disabled={ch.chapterNo <= 1} onClick={() => go(ch.chapterNo - 1)} className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm disabled:opacity-40">← Previous chapter</button>
              <button disabled={ch.chapterNo >= chapters.length} onClick={() => go(ch.chapterNo + 1)} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-40">Next chapter →</button>
            </div>
            <div className="mt-6"><BoloMaster chapters={chapters.map((c) => ({ ...c, notes: c.notes.join(' '), examples: c.formulas }))} theme="study" /></div>
          </>
        )}
      </div>
    </main>
  );
}
