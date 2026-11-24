'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COURSES } from '@/lib/data/college.mjs';

const SEMS = [1, 2, 3, 4, 5, 6];
const TABS = [['units', '📑 Units & Notes'], ['imp', '❗ Important Qs'], ['pyq', '🕘 Previous Year'], ['plan', '🗓️ Study Plan'], ['jobs', '💼 Jobs']];

export default function CollegeStudy() {
  const [course, setCourse] = useState('B.Tech');
  const [branch, setBranch] = useState('CSE');
  const [sem, setSem] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [courseJobs, setCourseJobs] = useState('');
  const [subject, setSubject] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('units');
  const [openUnit, setOpenUnit] = useState(1);

  const info = COURSES.find((c) => c.course === course);

  useEffect(() => {
    setSubject(''); setData(null);
    fetch(`/api/college-study?course=${encodeURIComponent(course)}&semester=${sem}`)
      .then((r) => r.json()).then((d) => { setSubjects(d.subjects || []); setCourseJobs(d.courseJobs || ''); });
  }, [course, sem]);

  useEffect(() => {
    if (!subject) return;
    setTab('units'); setOpenUnit(1);
    fetch(`/api/college-study?course=${encodeURIComponent(course)}&semester=${sem}&subject=${encodeURIComponent(subject)}`)
      .then((r) => r.json()).then(setData);
  }, [course, sem, subject]);

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-neon">← Home</Link>
          <Link href="/college-study/guide" className="rounded-full border border-neon px-4 py-2 text-sm font-bold text-neon hover:bg-neon hover:text-navy-900">🧭 College Guide - what after Class 12?</Link>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">🎓 College <span className="text-neon">COMPLETE</span> Study</h1>
        <p className="text-slate-300">Any Subject · Simple explanations</p>

        {/* Course */}
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">1. Choose a course</h2>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {COURSES.map((c) => (
              <button key={c.course} onClick={() => { setCourse(c.course); setBranch(c.branches[0] || ''); setSem(1); }}
                className={`rounded-xl border px-3 py-3 font-bold transition ${course === c.course ? 'border-neon bg-neon text-navy-900 shadow-neon' : 'border-white/15 bg-navy-800 hover:border-neon/60'}`}>{c.course}</button>
            ))}
          </div>
          {info?.branches.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {info.branches.map((b) => (
                <button key={b} onClick={() => setBranch(b)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${branch === b ? 'bg-white text-navy-900' : 'bg-white/10 hover:bg-white/20'}`}>{b}</button>
              ))}
            </div>
          )}
        </section>

        {/* Semester */}
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">2. Choose a semester</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {SEMS.filter((s) => s <= (info?.semesters || 6)).map((s) => (
              <button key={s} onClick={() => setSem(s)} className={`rounded-lg px-4 py-2 font-bold ${sem === s ? 'bg-neon text-navy-900' : 'bg-navy-800 border border-white/15 hover:border-neon/60'}`}>Sem {s}</button>
            ))}
          </div>
        </section>

        {/* Subject */}
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">3. Choose a subject</h2>
          {subjects.length === 0 ? (
            <div className="mt-2 rounded-xl border border-white/15 bg-navy-800 p-5">
              <p className="font-semibold">⏳ {course}{branch ? ` (${branch})` : ''} - Semester {sem} data is being added soon.</p>
              <p className="mt-1 text-slate-300">Ready now: B.Tech, B.Com, B.A. - Semester 1. You can add any subject by inserting new units into the <code className="text-neon">collegeStudy</code> collection in MongoDB.</p>
              {courseJobs && <p className="mt-3"><b className="text-neon">💼 {course} - jobs after this course:</b> {courseJobs}</p>}
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button key={s.subject} onClick={() => setSubject(s.subject)}
                  className={`rounded-xl border px-4 py-3 text-left ${subject === s.subject ? 'border-neon bg-neon/10' : 'border-white/15 bg-navy-800 hover:border-neon/60'}`}>
                  <div className="font-bold">{s.subject}</div>
                  <div className="text-xs text-slate-400">{s.subjectTitle}</div>
                </button>
              ))}
            </div>
          )}
          {course === 'B.Tech' && subjects.length > 0 && <p className="mt-2 text-xs text-slate-400">Semester 1 subjects are common to all branches - CSE, Mechanical, Civil and Electrical.</p>}
        </section>

        {/* Study */}
        {data && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-white text-slate-900">
            <div className="bg-navy-800 p-5 text-white">
              <p className="text-sm text-neon">{course}{branch ? ` ${branch}` : ''} · Semester {sem}</p>
              <h2 className="text-2xl font-extrabold">{data.subjectTitle}</h2>
              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
                {TABS.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${tab === k ? 'bg-neon text-navy-900' : 'bg-white/10 hover:bg-white/20'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="p-5">
              {tab === 'units' && (
                <div className="space-y-2">
                  {data.units.map((u) => (
                    <div key={u.unitNo} className="rounded-xl border border-slate-200">
                      <button onClick={() => setOpenUnit(openUnit === u.unitNo ? 0 : u.unitNo)} className="flex w-full items-center justify-between p-4 text-left font-bold">
                        {u.unitName} <span className="text-slate-400">{openUnit === u.unitNo ? '−' : '+'}</span>
                      </button>
                      {openUnit === u.unitNo && <p className="border-t border-slate-200 bg-slate-50 p-4 leading-relaxed">{u.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
              {tab === 'imp' && data.units.map((u) => (
                <div key={u.unitNo} className="mb-4">
                  <h3 className="font-bold text-navy-700">{u.unitName}</h3>
                  <ul className="mt-1 list-disc space-y-1 pl-5">{u.importantQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
                </div>
              ))}
              {tab === 'pyq' && (
                <>
                  <p className="mb-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Questions follow the university exam pattern. Also check the real past papers of your university (AKTU / CCSU / DU).</p>
                  {data.units.map((u) => (
                    <div key={u.unitNo} className="mb-4">
                      <h3 className="font-bold text-navy-700">{u.unitName}</h3>
                      <ul className="mt-1 list-disc space-y-1 pl-5">{u.previousYearQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
                    </div>
                  ))}
                </>
              )}
              {tab === 'plan' && (
                <div className="rounded-xl border-2 border-green-400 bg-green-50 p-5">
                  <h3 className="text-lg font-bold">How to study this subject? How many hours a day?</h3>
                  <p className="mt-2">{data.studyPlan}</p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                    <li>Write a 1-page summary after every unit.</li>
                    <li>3 weeks before the exam: important questions; 2 weeks before: previous year papers.</li>
                    <li>Free help: videos on this subject on NPTEL / SWAYAM.</li>
                  </ul>
                </div>
              )}
              {tab === 'jobs' && (
                <div className="rounded-xl border-2 border-navy-700 bg-slate-50 p-5">
                  <h3 className="text-lg font-bold">Which jobs can this subject lead to, and what salary?</h3>
                  <p className="mt-2">{data.jobs}</p>
                  {courseJobs && <p className="mt-2 text-slate-600"><b>{course} overall:</b> {courseJobs}</p>}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
