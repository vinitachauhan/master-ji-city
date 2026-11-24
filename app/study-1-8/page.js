'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import BoloMaster from '@/components/BoloMaster';
import StarBank from '@/components/StarBank';
import Quiz from '@/components/Quiz';
import PictureCards from '@/components/PictureCards';
import { speak } from '@/components/speech';

const CLASSES = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8'];
const SUBJECTS = [
  ['Hindi', '🅰️', 'bg-orange-300'], ['English', '🔤', 'bg-sky-300'], ['Maths', '➕', 'bg-yellow-300'],
  ['Science', '🔬', 'bg-green-300'], ['SST', '🌍', 'bg-pink-300'], ['Computer', '💻', 'bg-violet-300'], ['Sanskrit', '🕉️', 'bg-amber-300'],
];
const TABS = [['notes', '📒 Notes'], ['example', '🏙️ Example'], ['questions', '❓ Practice Questions'], ['test', '📝 Test - 10 Questions (+⭐)']];
const label = (c) => (/^\d+$/.test(c) ? `Class ${c}` : c);

export default function Study18() {
  const { profile, addStars } = useProfile();
  const [cls, setCls] = useState('');
  const [subject, setSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState('notes');

  useEffect(() => { if (profile && !cls && CLASSES.includes(profile.class)) setCls(profile.class); }, [profile, cls]);

  useEffect(() => {
    if (!cls || !subject) return;
    setLoading(true); setActive(null);
    fetch(`/api/study-1-8?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subject)}`)
      .then((r) => r.json()).then((d) => setChapters(d.chapters || [])).catch(() => setChapters([]))
      .finally(() => setLoading(false));
  }, [cls, subject]);

  const ch = chapters.find((c) => c.chapterNo === active);

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link href="/" className="font-bold text-pink-600">← Home</Link>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">📚 Play School to Class 8</h1>
        <p className="text-xl font-bold text-pink-600">COMPLETE Study - Learn with fun! 🎈</p>

        {/* Step 1 - Class */}
        <section className="mt-6">
          <h2 className="text-2xl font-extrabold text-sky-700">1️⃣ Choose your Class</h2>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {CLASSES.map((c) => (
              <button key={c} onClick={() => setCls(c)}
                className={`rounded-2xl border-4 px-2 py-4 text-xl font-extrabold shadow-pop transition active:translate-y-1 ${cls === c ? 'border-pink-500 bg-pink-500 text-white' : 'border-white bg-white text-slate-800 hover:bg-yellow-100'}`}>
                {label(c)}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 - Subject */}
        {cls && (
          <section className="mt-6">
            <h2 className="text-2xl font-extrabold text-sky-700">2️⃣ Choose a Subject</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {SUBJECTS.map(([s, e, bg]) => (
                <button key={s} onClick={() => setSubject(s)}
                  className={`rounded-3xl border-4 p-4 text-center shadow-pop transition active:translate-y-1 ${subject === s ? 'border-slate-900 scale-105' : 'border-white'} ${bg}`}>
                  <div className="text-4xl">{e}</div>
                  <div className="text-xl font-extrabold text-slate-900">{s}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            {cls && subject && (
              <section>
                <h2 className="text-2xl font-extrabold text-sky-700">3️⃣ {label(cls)} - {subject} Chapters</h2>
                {loading ? <p className="mt-3 text-xl">⏳ Loading...</p> : (
                  <div className="mt-3 grid gap-3">
                    {chapters.map((c) => (
                      <button key={c.chapterNo} onClick={() => { setActive(c.chapterNo); setTab('notes'); }}
                        className={`flex items-center gap-4 rounded-3xl border-4 p-4 text-left shadow-pop transition active:translate-y-1 ${active === c.chapterNo ? 'border-pink-500 bg-pink-50' : 'border-white bg-white hover:bg-yellow-50'}`}>
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-300 text-2xl font-black">{c.chapterNo}</span>
                        <span className="text-xl font-extrabold">Chapter {c.chapterNo} - {c.chapterName}</span>
                      </button>
                    ))}
                    {chapters.length === 0 && <p className="text-lg">No data found for this class/subject.</p>}
                  </div>
                )}
              </section>
            )}

            {ch && (
              <section className="mt-6 rounded-3xl border-4 border-sky-300 bg-white p-4 shadow-pop sm:p-6">
                <h3 className="text-2xl font-extrabold text-pink-600 sm:text-3xl">📖 {ch.chapterName}</h3>
                <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
                  {TABS.map(([k, t]) => (
                    <button key={k} onClick={() => setTab(k)}
                      className={`shrink-0 rounded-full px-4 py-2 text-lg font-extrabold ${tab === k ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-800'}`}>{t}</button>
                  ))}
                </div>
                <div className="mt-5 text-xl leading-relaxed">
                  {tab === 'notes' && (
                    <div className="rounded-2xl bg-yellow-100 p-5">
                      <p className="whitespace-pre-line">{ch.notes}</p>
                      <button onClick={() => speak(ch.notes)} className="mt-3 rounded-full bg-pink-500 px-4 py-2 text-base font-bold text-white">🔊 Listen to Master Ji</button>
                    </div>
                  )}
                  {tab === 'notes' && ch.pictures?.length > 0 && (
                    <div className="mt-6">
                      <PictureCards pictures={ch.pictures} lang={['Hindi', 'Sanskrit'].includes(subject) ? 'hi' : 'en'} resetKey={`${cls}-${subject}-${ch.chapterNo}`} />
                    </div>
                  )}
                  {tab === 'example' && (
                    <div className="rounded-2xl bg-sky-100 p-5">
                      <p className="text-sm font-bold uppercase tracking-wide text-sky-700">City + Village Example</p>
                      <p className="mt-1">{ch.examples}</p>
                      <button onClick={() => speak(ch.examples)} className="mt-3 rounded-full bg-sky-500 px-4 py-2 text-base font-bold text-white">🔊 Listen</button>
                    </div>
                  )}
                  {tab === 'questions' && (
                    <ol className="list-decimal space-y-2 pl-6">
                      {ch.importantQuestions.map((q, i) => <li key={i} className="rounded-xl bg-pink-50 p-2">{q}</li>)}
                    </ol>
                  )}
                  {tab === 'test' && (
                    <Quiz questions={ch.testQuestions} theme="kid" onCorrect={() => addStars(1)} resetKey={`${cls}-${subject}-${ch.chapterNo}`} />
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <BoloMaster chapters={chapters} theme="kid" />
            <StarBank />
          </aside>
        </div>
      </div>
    </main>
  );
}
