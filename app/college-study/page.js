'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { COURSES, READY_COURSES } from '@/lib/data/college.mjs';

const SEMS = [1, 2, 3, 4, 5, 6];
const TABS = [['units', '📑 Units & Notes'], ['imp', '❗ Important Qs'], ['pyq', '🕘 Previous Year'], ['plan', '🗓️ Study Plan'], ['jobs', '💼 Jobs']];
// Cooking Classes and Computer Courses are practical courses, so their tabs have practical names.
const COOK_TABS = [['units', '🍳 Recipes'], ['imp', '💡 Tips & Safety'], ['pyq', '🧑‍🍳 Practice'], ['plan', '🗓️ How to Practise'], ['jobs', '💼 Earn from Cooking']];
const PRACTICAL_TABS = [['units', '📑 Lessons'], ['imp', '❗ Important Qs'], ['pyq', '🖱️ Practicals'], ['plan', '🗓️ Practice Plan'], ['jobs', '💼 Jobs']];

export default function CollegeStudy() {
  const [course, setCourse] = useState('B.Tech');
  const [branch, setBranch] = useState('CSE');
  const [sem, setSem] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [courseJobs, setCourseJobs] = useState('');
  const [subject, setSubject] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('units');
  const wantSubject = useRef(''); // subject from the address, chosen once the subject list arrives

  const info = COURSES.find((c) => c.course === course);

  // open a course / subject directly from a link, e.g. /college-study?course=Cooking%20Classes&subject=Baking%20and%20Cakes
  // (Back from a unit page also returns here with the same subject open)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const found = COURSES.find((x) => x.course === p.get('course'));
    if (found) { setCourse(found.course); setBranch(found.branches[0] || ''); }
    const sm = Number(p.get('sem'));
    if (sm >= 1 && sm <= 8) setSem(sm);
    wantSubject.current = p.get('subject') || '';
  }, []);
  useEffect(() => {
    const qs = new URLSearchParams({ course, sem: String(sem), ...(subject ? { subject } : {}) });
    window.history.replaceState(null, '', `/college-study?${qs}`);
  }, [course, sem, subject]);
  const isCooking = course === 'Cooking Classes';
  const tabs = isCooking ? COOK_TABS : course === 'Computer Courses' ? PRACTICAL_TABS : TABS;

  useEffect(() => {
    setSubject(''); setData(null);
    let current = true; // ignore an older answer if the course was changed meanwhile
    fetch(`/api/college-study?course=${encodeURIComponent(course)}&semester=${sem}`)
      .then((r) => r.json()).then((d) => {
        if (!current) return;
        setSubjects(d.subjects || []); setCourseJobs(d.courseJobs || '');
        if (wantSubject.current && (d.subjects || []).some((x) => x.subject === wantSubject.current)) setSubject(wantSubject.current);
        wantSubject.current = '';
      });
    return () => { current = false; };
  }, [course, sem]);

  useEffect(() => {
    if (!subject) return;
    setTab('units');
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
              <p className="mt-1 text-slate-300">Ready now (Semester 1): {READY_COURSES.join(', ')}. More semesters can be added from the Admin Panel (College Study).</p>
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
          {course === 'Computer Courses' && (
            <Link href="/computer-course" className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neon bg-neon/10 p-4">
              <span><b className="text-neon">💻 Complete Computer Course</b> - learn everything step by step: 16 modules, practicals in the Computer Lab, quizzes and a certificate.</span>
              <span className="rounded-full bg-neon px-4 py-1.5 font-bold text-navy-900">Start →</span>
            </Link>
          )}
          {course === 'B.Tech' && subjects.length > 0 && <p className="mt-2 text-xs text-slate-400">Semester 1 subjects are common to all branches - CSE, Mechanical, Civil and Electrical.</p>}
        </section>

        {/* Study */}
        {data && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-white text-slate-900">
            <div className="bg-navy-800 p-5 text-white">
              <p className="text-sm text-neon">{course}{branch ? ` ${branch}` : ''}{isCooking ? '' : ` · Semester ${sem}`}</p>
              <h2 className="text-2xl font-extrabold">{data.subjectTitle}</h2>
              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
                {tabs.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${tab === k ? 'bg-neon text-navy-900' : 'bg-white/10 hover:bg-white/20'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="p-5">
              {tab === 'units' && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Click a {isCooking ? 'recipe' : 'unit'} - it opens on its own page{isCooking ? ' in English and Hindi' : ''}.</p>
                  {data.units.map((u) => (
                    <Link key={u.unitNo} href={`/college-study/unit?${new URLSearchParams({ course, sem: String(sem), subject, unit: String(u.unitNo) })}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 font-bold transition hover:border-navy-700 hover:bg-slate-50">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-neon">{u.unitNo}</span>
                      <span className="flex-1">{u.unitName}</span>
                      <span className="text-slate-400">→</span>
                    </Link>
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
                  <p className="mb-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{isCooking ? 'Cook it yourself at home with an adult, then try the practice task below.' : course === 'Computer Courses' ? 'Do these practicals yourself - try them in the 🖥️ Computer Lab of this website or on a real computer.' : 'Questions follow the university exam pattern. Also check the real past papers of your university (AKTU / CCSU / DU).'}</p>
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
                  <h3 className="text-lg font-bold">{isCooking ? 'How to practise these recipes?' : 'How to study this subject? How many hours a day?'}</h3>
                  <p className="mt-2">{data.studyPlan}</p>
                  {isCooking ? (
                    <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                      <li>Children cook only with an adult. Wash hands, tie hair, wear an apron.</li>
                      <li>Read the full recipe and keep all ingredients ready before switching on the gas.</li>
                      <li>Clean - Cut - Cook - Clean: leave the kitchen clean and switch off the gas.</li>
                    </ul>
                  ) : (
                    <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                      <li>Write a 1-page summary after every unit.</li>
                      <li>3 weeks before the exam: important questions; 2 weeks before: previous year papers.</li>
                      <li>Free help: videos on this subject on NPTEL / SWAYAM.</li>
                    </ul>
                  )}
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
