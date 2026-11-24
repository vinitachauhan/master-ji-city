'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import Quiz from '@/components/Quiz';
import BoloMaster from '@/components/BoloMaster';

const CLASSES = ['9', '10', '11', '12'];
const SUBJECTS = ['Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 'Accounts', 'Business Studies', 'Economics', 'History', 'Geography', 'Pol Science', 'Hindi', 'English', 'Computer'];
const SCIENCE_ONLY_9_10 = 'Science';
const TABS = [['notes', 'COMPLETE Notes'], ['formula', 'Formula / Definition'], ['imp', 'Important (Board)'], ['pyq', 'Previous Year'], ['test', '10 MCQ Test']];

export default function Study912() {
  const { profile, addStars } = useProfile();
  const [cls, setCls] = useState('10');
  const [subject, setSubject] = useState('Science');
  const [data, setData] = useState({ chapters: [] });
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState('notes');

  useEffect(() => { if (profile && CLASSES.includes(profile.class)) setCls(profile.class); }, [profile]);
  useEffect(() => { if ((cls === '11' || cls === '12') && subject === SCIENCE_ONLY_9_10) setSubject('Physics'); }, [cls, subject]);

  useEffect(() => {
    setLoading(true); setActive(null);
    fetch(`/api/study-9-12?class=${cls}&subject=${encodeURIComponent(subject)}`)
      .then((r) => r.json()).then(setData).catch(() => setData({ chapters: [] }))
      .finally(() => setLoading(false));
  }, [cls, subject]);

  const subjects = SUBJECTS.filter((s) => s !== SCIENCE_ONLY_9_10 || cls === '9' || cls === '10');
  const ch = data.chapters.find((c) => c.chapterNo === active);
  const plan = data.chapters[0]?.studyPlan;

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

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold text-blue-800">Class {cls} · {subject}</h2>
            <p className="text-sm text-slate-500">{data.chapters.length} Chapters</p>
            {loading ? <p className="mt-3 text-slate-500">Loading...</p> : (
              <ul className="mt-3 space-y-1">
                {data.chapters.map((c) => (
                  <li key={c.chapterNo}>
                    <button onClick={() => { setActive(c.chapterNo); setTab('notes'); }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm ${active === c.chapterNo ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}>
                      <b>Ch {c.chapterNo}</b> - {c.chapterName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {plan && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <h3 className="font-bold text-green-800">🗓️ Study Plan</h3>
              <p className="mt-1 text-sm font-semibold text-slate-700">How to study this subject?</p>
              <p className="mt-1 text-sm text-slate-700">{plan}</p>
              <p className="mt-2 text-xs text-slate-500">Tip: study 25 min + 5 min break (Pomodoro). Revise for 10 min before sleeping.</p>
            </div>
          )}
        </aside>

        <section>
          {!ch ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              <div className="text-4xl">👈</div>
              <p className="mt-2 font-semibold">Choose a chapter - notes, formulas, questions and the test will show here.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-5">
                <p className="text-sm font-semibold text-green-700">Class {cls} · {subject} · Chapter {ch.chapterNo}</p>
                <h2 className="text-2xl font-extrabold text-slate-900">{ch.chapterName}</h2>
                <div className="no-scrollbar mt-4 flex gap-1 overflow-x-auto">
                  {TABS.map(([k, t]) => (
                    <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${tab === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="p-5">
                {tab === 'notes' && (
                  <ol className="space-y-3">
                    {ch.notes.map((n, i) => <li key={i} className="rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">{n}</li>)}
                  </ol>
                )}
                {tab === 'formula' && (
                  <div className="rounded-xl border-2 border-green-300 bg-green-50 p-5">
                    <p className="text-sm font-bold uppercase text-green-700">Formula / Definition - Easy way to remember</p>
                    <p className="mt-2 text-lg font-semibold">{ch.formulas}</p>
                    <p className="mt-3 text-sm text-slate-600">💡 Trick: write it on a card and say it once every morning - you will know it by heart in 7 days!</p>
                  </div>
                )}
                {tab === 'imp' && (
                  <ol className="list-decimal space-y-2 pl-5">{ch.importantQuestions.map((q, i) => <li key={i}>{q}</li>)}</ol>
                )}
                {tab === 'pyq' && (
                  <>
                    <p className="mb-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">These questions follow the pattern of past board papers. For the actual papers, see the CBSE / UP Board website.</p>
                    <ol className="list-decimal space-y-2 pl-5">{ch.previousYearQuestions.map((q, i) => <li key={i}>{q}</li>)}</ol>
                  </>
                )}
                {tab === 'test' && <Quiz questions={ch.testQuestions} onCorrect={() => addStars(1)} resetKey={`${cls}-${subject}-${ch.chapterNo}`} />}
              </div>
            </div>
          )}
          <div className="mt-6"><BoloMaster chapters={data.chapters.map((c) => ({ ...c, notes: c.notes.join(' '), examples: c.formulas }))} theme="study" /></div>
        </section>
      </div>
    </main>
  );
}
