'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import BoloMaster from '@/components/BoloMaster';
import StarBank from '@/components/StarBank';

const CLASSES = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8'];
const SUBJECTS = [
  ['Hindi', '🅰️', 'bg-orange-300'], ['English', '🔤', 'bg-sky-300'], ['Maths', '➕', 'bg-yellow-300'],
  ['Science', '🔬', 'bg-green-300'], ['SST', '🌍', 'bg-pink-300'], ['Computer', '💻', 'bg-violet-300'], ['Sanskrit', '🕉️', 'bg-amber-300'], ['Drawing', '🎨', 'bg-rose-300'],
];
const label = (c) => (/^\d+$/.test(c) ? `Class ${c}` : c);

export default function Study18() {
  const { profile } = useProfile();
  const [cls, setCls] = useState('');
  const [subject, setSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);

  // class / subject are kept in the address, so Back from a chapter page returns to the same list
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (CLASSES.includes(p.get('class'))) setCls(p.get('class'));
    if (SUBJECTS.some(([s]) => s === p.get('subject'))) setSubject(p.get('subject'));
  }, []);
  useEffect(() => { if (profile && !cls && CLASSES.includes(profile.class)) setCls(profile.class); }, [profile, cls]);
  useEffect(() => {
    if (cls) window.history.replaceState(null, '', `/study-1-8?class=${encodeURIComponent(cls)}${subject ? `&subject=${encodeURIComponent(subject)}` : ''}`);
  }, [cls, subject]);

  useEffect(() => {
    if (!cls || !subject) return;
    setLoading(true);
    fetch(`/api/study-1-8?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subject)}`)
      .then((r) => r.json()).then((d) => setChapters(d.chapters || [])).catch(() => setChapters([]))
      .finally(() => setLoading(false));
  }, [cls, subject]);

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
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                <p className="text-slate-600">Click a chapter - it opens on its own page.</p>
                {loading ? <p className="mt-3 text-xl">⏳ Loading...</p> : (
                  <div className="mt-3 grid gap-3">
                    {chapters.map((c) => (
                      <Link key={c.chapterNo} href={`/study-1-8/chapter?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subject)}&no=${c.chapterNo}`}
                        className="flex items-center gap-4 rounded-3xl border-4 border-white bg-white p-4 text-left shadow-pop transition hover:bg-yellow-50 active:translate-y-1">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-300 text-2xl font-black">{c.chapterNo}</span>
                        <span className="flex-1 text-xl font-extrabold">Chapter {c.chapterNo} - {c.chapterName}</span>
                        <span className="text-2xl text-pink-500">→</span>
                      </Link>
                    ))}
                    {chapters.length === 0 && <p className="text-lg">No data found for this class/subject.</p>}
                  </div>
                )}
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
