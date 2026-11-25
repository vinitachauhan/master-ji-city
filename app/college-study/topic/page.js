'use client';
// College Step 5: one topic of a unit on its own page - /college-study/topic?course=..&sem=1&subject=..&unit=2&t=1
// Recipes show English and Hindi side by side; coding lessons are shown as code and link to the Computer Lab.
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { branchFor } from '@/lib/data/college.mjs';
import TopicDiagram from '@/components/study/TopicDiagram';
import { LAB_FOR, urlCollege, wordsFor } from '@/lib/collegeNav.mjs';

function CollegeTopic() {
  const p = useSearchParams();
  const course = p.get('course') || ''; const sem = Number(p.get('sem')) || 1; const subject = p.get('subject') || '';
  const no = Number(p.get('unit')) || 1; const t = Number(p.get('t')) || 1;
  const w = wordsFor(course);
  const data = useJson(course && subject ? urlCollege.api(course, sem, subject) : null);
  const units = data?.units || [];
  const u = units.find((x) => x.unitNo === no);
  const topic = u?.topics?.[t - 1];
  const total = u?.topics?.length || 0;
  const lab = course === 'Computer Courses' ? LAB_FOR[subject] : null;

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs className="text-neon" items={[['🏠 Home', '/'], ['College', urlCollege.courses()], [course, urlCollege.subjects(course, sem, branchFor(course, subject))], [subject, urlCollege.units(course, sem, subject)], [`${w.unit} ${no}`, urlCollege.unit(course, sem, subject, no)], [`Topic ${t}`]]} />
        {!data ? <p className="mt-6 text-slate-300">Loading...</p> : !topic ? (
          <p className="mt-6">Topic not found. <Link href={urlCollege.unit(course, sem, subject, no)} className="font-bold text-neon">Open the {w.unit.toLowerCase()}</Link></p>
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
            <section>
              <p className="text-sm text-neon">{u.unitName} · Topic {t} of {total}</p>
              <h1 className="text-2xl font-extrabold sm:text-4xl">{topic.title}</h1>
              <div className="mt-4 rounded-2xl bg-white p-5 text-slate-900 sm:p-6">
                {topic.textHi ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl bg-orange-50 p-4">
                      <p className="mb-2 text-sm font-bold uppercase tracking-wide text-orange-700">🇬🇧 English</p>
                      <p className="whitespace-pre-line leading-relaxed">{topic.text}</p>
                    </div>
                    <div className="rounded-xl bg-green-50 p-4">
                      <p className="mb-2 text-sm font-bold uppercase tracking-wide text-green-700">🇮🇳 हिंदी</p>
                      <p className="whitespace-pre-line text-lg leading-relaxed">{topic.textHi}</p>
                    </div>
                  </div>
                ) : (
                  <div className={`whitespace-pre-line text-lg leading-relaxed ${lab && topic.text.includes('\n') ? 'rounded-xl bg-slate-900 p-4 font-mono text-sm text-green-200 sm:text-base' : ''}`}>{topic.text}</div>
                )}
                {lab && <Link href={`/computer-lab?tool=${lab}`} target="_blank" className="mt-4 inline-block rounded-full bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700">▶️ Type and run it yourself in the Computer Lab ↗</Link>}
              </div>
              <TopicDiagram theme="dark" topic={topic} topics={u.topics} current={t} chapterName={u.unitName.replace(/^(Unit|Recipe|Lesson) \d+\s*-\s*/, '')} hrefFor={(i) => urlCollege.topic(course, sem, subject, no, i)} />
              <div className="mt-4 flex flex-wrap justify-between gap-2">
                {t > 1 ? <Link href={urlCollege.topic(course, sem, subject, no, t - 1)} className="rounded-full bg-white/10 px-5 py-2 font-bold">← Previous topic</Link> : <Link href={urlCollege.unit(course, sem, subject, no)} className="rounded-full bg-white/10 px-5 py-2 font-bold">← All topics</Link>}
                {t < total ? (
                  <Link href={urlCollege.topic(course, sem, subject, no, t + 1)} className="rounded-full bg-neon px-5 py-2 font-bold text-navy-900">Next topic →</Link>
                ) : (
                  <Link href={urlCollege.unit(course, sem, subject, no)} className="rounded-full bg-neon px-5 py-2 font-bold text-navy-900">{w.imp} & {w.pyq} →</Link>
                )}
              </div>
              {t === total && no < units.length && (
                <p className="mt-4 text-right"><Link href={urlCollege.unit(course, sem, subject, no + 1)} className="font-bold text-neon">Next {w.unit.toLowerCase()}: {units.find((x) => x.unitNo === no + 1)?.unitName} →</Link></p>
              )}
            </section>
            <aside className="h-fit rounded-2xl border border-white/15 bg-navy-800 p-4">
              <p className="font-bold">📑 Topics</p>
              <ol className="mt-2 space-y-1 text-sm">
                {u.topics.map((x, i) => (
                  <li key={i}><Link href={urlCollege.topic(course, sem, subject, no, i + 1)} className={`block rounded-lg px-3 py-1.5 font-semibold ${i + 1 === t ? 'bg-neon text-navy-900' : 'hover:bg-white/10'}`}>{i + 1}. {x.title}</Link></li>
                ))}
              </ol>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
export default withSuspense(CollegeTopic);
