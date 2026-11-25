'use client';
// College Step 4: one unit / recipe / lesson - its topics (each on its own page) and its questions.
// /college-study/unit?course=..&sem=1&subject=..&unit=2
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { branchFor, periodOf } from '@/lib/data/college.mjs';
import { LAB_FOR, urlCollege, wordsFor } from '@/lib/collegeNav.mjs';

function CollegeUnit() {
  const p = useSearchParams();
  const course = p.get('course') || ''; const sem = Number(p.get('sem')) || 1; const subject = p.get('subject') || ''; const no = Number(p.get('unit')) || 1;
  const w = wordsFor(course);
  const data = useJson(course && subject ? urlCollege.api(course, sem, subject) : null);
  const units = data?.units || [];
  const u = units.find((x) => x.unitNo === no);
  const isCooking = course === 'Cooking Classes';
  const lab = course === 'Computer Courses' ? LAB_FOR[subject] : null;

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs className="text-neon" items={[['🏠 Home', '/'], ['College', urlCollege.courses()], [course, urlCollege.subjects(course, sem, branchFor(course, subject))], [subject, urlCollege.units(course, sem, subject)], [`${w.unit} ${no}`]]} />
        {!data ? <p className="mt-6 text-slate-300">Loading...</p> : !u ? (
          <p className="mt-6">Not found. <Link href={urlCollege.units(course, sem, subject)} className="font-bold text-neon">Open {subject}</Link></p>
        ) : (
          <>
            <p className="mt-4 text-sm text-neon">{course}{isCooking ? '' : ` · ${periodOf(course)} ${sem} · ${subject}`} · {data.subjectTitle} · {w.unit} {u.unitNo} of {units.length}</p>
            <h1 className="text-2xl font-extrabold sm:text-4xl">{u.unitName}</h1>

            <section className="mt-5 rounded-2xl bg-white p-5 text-slate-900 sm:p-6">
              <h2 className="font-extrabold text-navy-700">📑 Topics - each opens on its own page{isCooking ? ' (English + हिंदी)' : ''}</h2>
              <div className="mt-3 grid gap-2">
                {u.topics.map((t, i) => (
                  <Link key={i} href={urlCollege.topic(course, sem, subject, no, i + 1)}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 font-semibold transition hover:border-navy-700 hover:bg-slate-50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-neon">{i + 1}</span>
                    <span className="flex-1">{t.title}</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={urlCollege.topic(course, sem, subject, no, 1)} className="rounded-full bg-navy-800 px-5 py-2 font-bold text-neon">▶️ Start with Topic 1</Link>
                {course === 'Computer Courses' && subject === 'React' && <Link href="/react-course" className="rounded-full bg-sky-600 px-5 py-2 font-bold text-white hover:bg-sky-700">⚛️ Complete React Course →</Link>}
                {lab && <Link href={`/computer-lab?tool=${lab}`} target="_blank" className="rounded-full bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700">▶️ Practise in the Computer Lab ↗</Link>}
              </div>
            </section>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <section className="rounded-2xl bg-white p-5 text-slate-900">
                <h2 className="font-extrabold text-navy-700">{w.imp}</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">{u.importantQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
              </section>
              <section className="rounded-2xl bg-white p-5 text-slate-900">
                <h2 className="font-extrabold text-navy-700">{w.pyq}</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">{u.previousYearQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
                {isCooking && <p className="mt-3 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">Children cook only with an adult. Wash hands, tie hair, switch off the gas after cooking. / बच्चे बड़ों के साथ ही खाना बनाएँ। हाथ धोएँ, बाल बाँधें, काम के बाद गैस बंद करें।</p>}
              </section>
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-2">
              {no > 1 ? <Link href={urlCollege.unit(course, sem, subject, no - 1)} className="rounded-full bg-white/10 px-5 py-2 font-bold">← Previous {w.unit.toLowerCase()}</Link> : <span />}
              {no < units.length && <Link href={urlCollege.unit(course, sem, subject, no + 1)} className="rounded-full bg-neon px-5 py-2 font-bold text-navy-900">Next {w.unit.toLowerCase()} →</Link>}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
export default withSuspense(CollegeUnit);
