'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import BoloMaster from '@/components/BoloMaster';

const CLASSES = ['9', '10', '11', '12'];
const SUBJECTS = ['Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 'Accounts', 'Business Studies', 'Economics', 'History', 'Geography', 'Pol Science', 'Hindi', 'English', 'Computer'];
const SCIENCE_ONLY_9_10 = 'Science';

export default function Study912() {
  const { profile } = useProfile();
  const [cls, setCls] = useState('10');
  const [subject, setSubject] = useState('Science');
  const [fromUrl, setFromUrl] = useState(false);
  const [data, setData] = useState({ chapters: [] });
  const [loading, setLoading] = useState(false);

  // class / subject are kept in the address, so Back from a chapter page returns to the same list
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (CLASSES.includes(p.get('class'))) { setCls(p.get('class')); setFromUrl(true); }
    if (SUBJECTS.includes(p.get('subject'))) setSubject(p.get('subject'));
  }, []);
  useEffect(() => { if (!fromUrl && profile && CLASSES.includes(profile.class)) setCls(profile.class); }, [profile, fromUrl]);
  useEffect(() => { if ((cls === '11' || cls === '12') && subject === SCIENCE_ONLY_9_10) setSubject('Physics'); }, [cls, subject]);
  useEffect(() => { window.history.replaceState(null, '', `/study-9-12/study?class=${cls}&subject=${encodeURIComponent(subject)}`); }, [cls, subject]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/study-9-12?class=${cls}&subject=${encodeURIComponent(subject)}`)
      .then((r) => r.json()).then(setData).catch(() => setData({ chapters: [] }))
      .finally(() => setLoading(false));
  }, [cls, subject]);

  const subjects = SUBJECTS.filter((s) => s !== SCIENCE_ONLY_9_10 || cls === '9' || cls === '10');
  const plan = data.chapters[0]?.studyPlan;
  const chapterHref = (no) => `/study-9-12/chapter?class=${cls}&subject=${encodeURIComponent(subject)}&no=${no}`;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link href="/study-9-12" className="text-sm font-semibold text-blue-100">← Class 9-12</Link>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-4xl">📘 COMPLETE Study · Class 9-12</h1>
          <p className="text-blue-100">Step by step · Board exam ready</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CLASSES.map((c) => (
              <button key={c} onClick={() => setCls(c)} className={`rounded-full px-5 py-2 font-bold ${cls === c ? 'bg-white text-blue-800' : 'bg-white/15 hover:bg-white/25'}`}>Class {c}</button>
            ))}
          </div>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {subjects.map((s) => (
              <button key={s} onClick={() => setSubject(s)} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold ${subject === s ? 'bg-green-300 text-slate-900' : 'bg-white/10 hover:bg-white/20'}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        <section>
          <h2 className="text-xl font-extrabold text-slate-900">Class {cls} · {subject} - {data.chapters.length} chapters</h2>
          <p className="text-sm text-slate-500">Click a chapter - it opens on its own page with notes, formulas, board questions and a 10 MCQ test.</p>
          {loading ? <p className="mt-3 text-slate-500">Loading...</p> : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {data.chapters.map((c) => (
                <Link key={c.chapterNo} href={chapterHref(c.chapterNo)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">{c.chapterNo}</span>
                  <span className="flex-1 font-bold text-slate-800">{c.chapterName}</span>
                  <span className="text-blue-600">→</span>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-6"><BoloMaster chapters={data.chapters.map((c) => ({ ...c, notes: c.notes.join(' '), examples: c.formulas }))} theme="study" /></div>
        </section>

        <aside className="space-y-4">
          {plan && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <h3 className="font-bold text-green-800">🗓️ Study Plan</h3>
              <p className="mt-1 text-sm font-semibold text-slate-700">How to study this subject?</p>
              <p className="mt-1 text-sm text-slate-700">{plan}</p>
              <p className="mt-2 text-xs text-slate-500">Tip: study 25 min + 5 min break (Pomodoro). Revise for 10 min before sleeping.</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
