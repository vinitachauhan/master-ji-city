'use client';
// Class 9-12 Step 4: one chapter - topics (each on its own page), formula, board questions, previous year and the test.
// /study-9-12/chapter?class=10&subject=Science&no=2   (&tab=test opens the test)
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/components/Profile';
import Quiz from '@/components/Quiz';
import BoloMaster from '@/components/BoloMaster';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { url912 } from '@/lib/study912Nav.mjs';

const TABS = [['topics', '📑 Topics'], ['formula', 'Formula / Definition'], ['imp', 'Important (Board)'], ['pyq', 'Previous Year'], ['test', '10 MCQ Test']];

function Chapter912() {
  const { addStars } = useProfile();
  const router = useRouter();
  const p = useSearchParams();
  const cls = p.get('class') || '10'; const subject = p.get('subject') || 'Science'; const no = Number(p.get('no') || 1);
  const tab = TABS.some(([k]) => k === p.get('tab')) ? p.get('tab') : 'topics';
  const data = useJson(url912.api(cls, subject));
  const chapters = data?.chapters;
  const ch = chapters?.find((c) => c.chapterNo === no);
  const setTab = (k) => router.replace(url912.chapter(cls, subject, no, k === 'topics' ? '' : k), { scroll: false });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <Crumbs className="text-blue-100" items={[['🏠 Home', '/'], ['Class 9-12', url912.classes()], [`Class ${cls}`, url912.subjects(cls)], [subject, url912.chapters(cls, subject)], [`Chapter ${no}`]]} />
          {ch && <>
            <p className="mt-2 text-sm font-semibold text-green-200">Class {cls} · {subject} · Chapter {ch.chapterNo} of {chapters.length}</p>
            <h1 className="text-2xl font-extrabold sm:text-4xl">{ch.chapterName}</h1>
          </>}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {!chapters ? <p className="text-slate-500">Loading...</p> : !ch ? (
          <p>Chapter not found. <Link href={url912.chapters(cls, subject)} className="font-bold text-blue-700">Choose a chapter</Link></p>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-slate-200 p-4">
                {TABS.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${tab === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}>{t}</button>
                ))}
              </div>
              <div className="p-5">
                {tab === 'topics' && (
                  <>
                    <p className="text-sm text-slate-500">4. Read the topics in order - each topic opens on its own page.</p>
                    <div className="mt-3 grid gap-2">
                      {ch.topics.map((t, i) => (
                        <Link key={i} href={url912.topic(cls, subject, ch.chapterNo, i + 1)}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-400 hover:bg-blue-50">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-black text-blue-800">{i + 1}</span>
                          <span className="flex-1 font-semibold text-slate-800">{t.title}</span>
                          <span className="text-blue-600">→</span>
                        </Link>
                      ))}
                    </div>
                    <Link href={url912.topic(cls, subject, ch.chapterNo, 1)} className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">▶️ Start with Topic 1</Link>
                  </>
                )}
                {tab === 'formula' && (
                  <div className="rounded-xl border-2 border-green-300 bg-green-50 p-5">
                    <p className="text-sm font-bold uppercase text-green-700">Formula / Definition - Easy way to remember</p>
                    <p className="mt-2 text-lg font-semibold">{ch.formulas}</p>
                    <p className="mt-3 text-sm text-slate-600">💡 Trick: write it on a card and say it once every morning - you will know it by heart in 7 days!</p>
                  </div>
                )}
                {tab === 'imp' && <ol className="list-decimal space-y-2 pl-5">{ch.importantQuestions.map((x, i) => <li key={i}>{x}</li>)}</ol>}
                {tab === 'pyq' && (
                  <>
                    <p className="mb-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">These questions follow the pattern of past board papers. For the actual papers, see the CBSE / UP Board website.</p>
                    <ol className="list-decimal space-y-2 pl-5">{ch.previousYearQuestions.map((x, i) => <li key={i}>{x}</li>)}</ol>
                  </>
                )}
                {tab === 'test' && <Quiz questions={ch.testQuestions} onCorrect={() => addStars(1)} resetKey={`${cls}-${subject}-${ch.chapterNo}`} />}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-between gap-2">
              {ch.chapterNo > 1 ? <Link href={url912.chapter(cls, subject, ch.chapterNo - 1)} className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm">← Previous chapter</Link> : <span />}
              {ch.chapterNo < chapters.length && <Link href={url912.chapter(cls, subject, ch.chapterNo + 1)} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Next chapter →</Link>}
            </div>
            <div className="mt-6"><BoloMaster chapters={chapters.map((c) => ({ ...c, notes: [].concat(c.notes).join(' '), examples: c.formulas }))} theme="study" /></div>
          </>
        )}
      </div>
    </main>
  );
}
export default withSuspense(Chapter912);
