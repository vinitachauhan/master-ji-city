'use client';
// One chapter on its own page: /study-1-8/chapter?class=5&subject=Maths&no=3
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useProfile } from '@/components/Profile';
import BoloMaster from '@/components/BoloMaster';
import StarBank from '@/components/StarBank';
import Quiz from '@/components/Quiz';
import PictureCards from '@/components/PictureCards';
import { speak } from '@/components/speech';

const PaintPad = dynamic(() => import('@/components/lab/PaintPad'), { ssr: false });
const TABS = [['notes', '📒 Notes'], ['example', '🏙️ Example'], ['questions', '❓ Practice Questions'], ['test', '📝 Test - 10 Questions (+⭐)']];
const label = (c) => (/^\d+$/.test(c) ? `Class ${c}` : c);
const listUrl = (cls, subject) => `/study-1-8?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subject)}`;
const chapterUrl = (cls, subject, no) => `/study-1-8/chapter?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subject)}&no=${no}`;
const labLevel = (cls) => (['Play School', 'Nursery', 'KG'].includes(cls) ? cls : Number(cls) <= 2 ? 'Class 1-2' : Number(cls) <= 5 ? 'Class 3-5' : 'Class 6-8');

export default function Chapter18() {
  const { addStars } = useProfile();
  const [q, setQ] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [tab, setTab] = useState('notes');

  // read the address (also when the browser Back / Forward buttons change it)
  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search);
      setQ({ cls: p.get('class') || '', subject: p.get('subject') || '', no: Number(p.get('no') || 1) });
      setTab('notes');
    };
    read(); window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  useEffect(() => {
    if (!q?.cls || !q.subject) return;
    fetch(`/api/study-1-8?class=${encodeURIComponent(q.cls)}&subject=${encodeURIComponent(q.subject)}`)
      .then((r) => r.json()).then((d) => setChapters(d.chapters || [])).catch(() => setChapters([]));
  }, [q?.cls, q?.subject]);
  const go = (no) => { window.history.pushState(null, '', chapterUrl(q.cls, q.subject, no)); setQ({ ...q, no }); setTab('notes'); window.scrollTo(0, 0); };

  const ch = chapters?.find((c) => c.chapterNo === q?.no);
  const { cls, subject } = q || {};

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {q && <Link href={listUrl(cls, subject)} className="font-bold text-pink-600">← {label(cls)} - {subject} chapters</Link>}
        {!chapters ? <p className="mt-6 text-xl">⏳ Loading...</p> : !ch ? (
          <p className="mt-6 text-xl">Chapter not found. <Link href="/study-1-8" className="font-bold text-pink-600">Choose a chapter</Link></p>
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_340px]">
            <section className="rounded-3xl border-4 border-sky-300 bg-white p-4 shadow-pop sm:p-6">
              <p className="text-lg font-bold text-sky-700">{label(cls)} · {subject} · Chapter {ch.chapterNo} of {chapters.length}</p>
              <h1 className="text-3xl font-extrabold text-pink-600 sm:text-4xl">📖 {ch.chapterName}</h1>
              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
                {TABS.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-full px-4 py-2 text-lg font-extrabold ${tab === k ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-800'}`}>{t}</button>
                ))}
              </div>
              <div className="mt-5 text-xl leading-relaxed">
                {tab === 'notes' && (
                  <div className="rounded-2xl bg-yellow-100 p-5">
                    <p className="whitespace-pre-line">{ch.notes}</p>
                    <button onClick={() => speak(ch.notes)} className="mt-3 rounded-full bg-pink-500 px-4 py-2 text-base font-bold text-white">🔊 Listen to Master Ji</button>
                  </div>
                )}
                {tab === 'notes' && subject === 'Drawing' && (
                  <div className="mt-6">
                    <p className="mb-2 text-xl font-extrabold text-pink-600">✏️ Now draw it yourself here!</p>
                    <PaintPad key={`${cls}-${ch.chapterNo}`} compact />
                  </div>
                )}
                {tab === 'notes' && subject === 'Computer' && (
                  <Link href={`/computer-lab?level=${encodeURIComponent(labLevel(cls))}`}
                    className="mt-4 inline-block rounded-full bg-violet-600 px-5 py-2 text-lg font-extrabold text-white hover:bg-violet-700">🖥️ Practise it in the Computer Lab - Paint, Notepad, WordPad, Excel, Typing →</Link>
                )}
                {tab === 'notes' && ch.pictures?.length > 0 && (
                  <div className="mt-6"><PictureCards pictures={ch.pictures} lang={['Hindi', 'Sanskrit'].includes(subject) ? 'hi' : 'en'} resetKey={`${cls}-${subject}-${ch.chapterNo}`} /></div>
                )}
                {tab === 'example' && (
                  <div className="rounded-2xl bg-sky-100 p-5">
                    <p className="text-sm font-bold uppercase tracking-wide text-sky-700">City + Village Example</p>
                    <p className="mt-1">{ch.examples}</p>
                    <button onClick={() => speak(ch.examples)} className="mt-3 rounded-full bg-sky-500 px-4 py-2 text-base font-bold text-white">🔊 Listen</button>
                  </div>
                )}
                {tab === 'questions' && (
                  <ol className="list-decimal space-y-2 pl-6">{ch.importantQuestions.map((x, i) => <li key={i} className="rounded-xl bg-pink-50 p-2">{x}</li>)}</ol>
                )}
                {tab === 'test' && <Quiz questions={ch.testQuestions} theme="kid" onCorrect={() => addStars(1)} resetKey={`${cls}-${subject}-${ch.chapterNo}`} />}
              </div>
              <div className="mt-6 flex flex-wrap justify-between gap-2">
                <button disabled={ch.chapterNo <= 1} onClick={() => go(ch.chapterNo - 1)} className="rounded-full bg-sky-100 px-5 py-2 text-lg font-extrabold text-sky-800 disabled:opacity-40">← Previous chapter</button>
                <button disabled={ch.chapterNo >= chapters.length} onClick={() => go(ch.chapterNo + 1)} className="rounded-full bg-pink-500 px-5 py-2 text-lg font-extrabold text-white disabled:opacity-40">Next chapter →</button>
              </div>
            </section>
            <aside className="space-y-6">
              <BoloMaster chapters={chapters} theme="kid" />
              <StarBank />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
