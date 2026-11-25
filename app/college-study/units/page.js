'use client';
// College Step 3: units (or recipes / lessons) of one subject - /college-study/units?course=B.Tech&sem=1&subject=Maths
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { urlCollege, wordsFor } from '@/lib/collegeNav.mjs';

function CollegeUnits() {
  const router = useRouter();
  const p = useSearchParams();
  const course = p.get('course') || ''; const sem = Number(p.get('sem')) || 1; const subject = p.get('subject') || '';
  const w = wordsFor(course);
  const TABS = [['units', `📑 ${w.units}`], ['imp', w.imp], ['pyq', w.pyq], ['plan', w.plan], ['jobs', w.jobs]];
  const tab = TABS.some(([k]) => k === p.get('tab')) ? p.get('tab') : 'units';
  const data = useJson(course && subject ? urlCollege.api(course, sem, subject) : null);
  const units = data?.units || [];
  const isCooking = course === 'Cooking Classes';
  const setTab = (k) => router.replace(urlCollege.units(course, sem, subject, k === 'units' ? '' : k), { scroll: false });

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs className="text-neon" items={[['🏠 Home', '/'], ['College', urlCollege.courses()], [course, urlCollege.subjects(course, sem)], [subject]]} />
        {!data ? <p className="mt-6 text-slate-300">Loading...</p> : units.length === 0 ? (
          <p className="mt-6">Nothing found. <Link href={urlCollege.subjects(course, sem)} className="font-bold text-neon">Choose a subject</Link></p>
        ) : (
          <section className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-white text-slate-900">
            <div className="bg-navy-800 p-5 text-white">
              <p className="text-sm text-neon">{course}{isCooking || course === 'Computer Courses' ? '' : ` · Semester ${sem}`}</p>
              <h1 className="text-2xl font-extrabold sm:text-3xl">{data.subjectTitle}</h1>
              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
                {TABS.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${tab === k ? 'bg-neon text-navy-900' : 'bg-white/10 hover:bg-white/20'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="p-5">
              {tab === 'units' && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Click a {w.unit.toLowerCase()} - it opens on its own page with its topics{isCooking ? ' in English and Hindi' : ''}.</p>
                  {units.map((u) => (
                    <Link key={u.unitNo} href={urlCollege.unit(course, sem, subject, u.unitNo)}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 font-bold transition hover:border-navy-700 hover:bg-slate-50">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-neon">{u.unitNo}</span>
                      <span className="flex-1">{u.unitName}<span className="block text-xs font-normal text-slate-500">{u.topics?.length || 0} topics</span></span>
                      <span className="text-slate-400">→</span>
                    </Link>
                  ))}
                </div>
              )}
              {tab === 'imp' && units.map((u) => (
                <div key={u.unitNo} className="mb-4">
                  <h3 className="font-bold text-navy-700">{u.unitName}</h3>
                  <ul className="mt-1 list-disc space-y-1 pl-5">{u.importantQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
              {tab === 'pyq' && (
                <>
                  <p className="mb-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{isCooking ? 'Cook it yourself at home with an adult, then try the practice task below.' : course === 'Computer Courses' ? 'Do these practicals yourself - try them in the 🖥️ Computer Lab of this website or on a real computer.' : 'Questions follow the university exam pattern. Also check the real past papers of your university (AKTU / CCSU / DU).'}</p>
                  {units.map((u) => (
                    <div key={u.unitNo} className="mb-4">
                      <h3 className="font-bold text-navy-700">{u.unitName}</h3>
                      <ul className="mt-1 list-disc space-y-1 pl-5">{u.previousYearQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
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
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
export default withSuspense(CollegeUnits);
