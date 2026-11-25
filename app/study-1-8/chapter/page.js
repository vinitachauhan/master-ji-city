'use client';
// Step 4: one chapter - its topics (each opens on its own page), practice questions and the test.
// /study-1-8/chapter?class=5&subject=Maths&no=3   (&tab=test opens the test)
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/components/Profile';
import BoloMaster from '@/components/BoloMaster';
import StarBank from '@/components/StarBank';
import Quiz from '@/components/Quiz';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { label18, url18 } from '@/lib/study18Nav.mjs';

const TABS = [['topics', '📑 Topics'], ['questions', '❓ Practice Questions'], ['test', '📝 Test - 10 Questions (+⭐)']];

function Chapter18() {
  const { addStars } = useProfile();
  const router = useRouter();
  const p = useSearchParams();
  const cls = p.get('class') || ''; const subject = p.get('subject') || ''; const no = Number(p.get('no') || 1);
  const tab = TABS.some(([k]) => k === p.get('tab')) ? p.get('tab') : 'topics';
  const data = useJson(cls && subject ? url18.api(cls, subject) : null);
  const chapters = data?.chapters;
  const ch = chapters?.find((c) => c.chapterNo === no);
  const setTab = (k) => router.replace(url18.chapter(cls, subject, no, k === 'topics' ? '' : k), { scroll: false });

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs items={[['🏠 Home', '/'], ['Classes', url18.classes()], [label18(cls), url18.subjects(cls)], [subject, url18.chapters(cls, subject)], [`Chapter ${no}`]]} />
        {!chapters ? <p className="mt-6 text-xl">⏳ Loading...</p> : !ch ? (
          <p className="mt-6 text-xl">Chapter not found. <Link href={url18.chapters(cls, subject)} className="font-bold text-pink-600">Choose a chapter</Link></p>
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_340px]">
            <section className="rounded-3xl border-4 border-sky-300 bg-white p-4 shadow-pop sm:p-6">
              <p className="text-lg font-bold text-sky-700">{label18(cls)} · {subject} · Chapter {ch.chapterNo} of {chapters.length}</p>
              <h1 className="text-3xl font-extrabold text-pink-600 sm:text-4xl">📖 {ch.chapterName}</h1>
              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
                {TABS.map(([k, t]) => (
                  <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-full px-4 py-2 text-lg font-extrabold ${tab === k ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-800'}`}>{t}</button>
                ))}
              </div>
              <div className="mt-5 text-xl leading-relaxed">
                {tab === 'topics' && (
                  <>
                    <p className="text-base text-slate-600">4️⃣ Read the topics one by one - each topic opens on its own page.</p>
                    <div className="mt-3 grid gap-3">
                      {ch.topics.map((t, i) => (
                        <Link key={i} href={url18.topic(cls, subject, ch.chapterNo, i + 1)}
                          className="flex items-center gap-3 rounded-2xl border-4 border-yellow-200 bg-yellow-50 p-3 transition hover:border-pink-300 hover:bg-pink-50 active:translate-y-1">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-500 text-lg font-black text-white">{i + 1}</span>
                          <span className="flex-1 font-extrabold">{t.title}</span>
                          <span className="text-pink-500">→</span>
                        </Link>
                      ))}
                    </div>
                    <Link href={url18.topic(cls, subject, ch.chapterNo, 1)} className="mt-4 inline-block rounded-full bg-pink-500 px-5 py-2 text-lg font-extrabold text-white">▶️ Start with Topic 1</Link>
                  </>
                )}
                {tab === 'questions' && (
                  <ol className="list-decimal space-y-2 pl-6">{ch.importantQuestions.map((x, i) => <li key={i} className="rounded-xl bg-pink-50 p-2">{x}</li>)}</ol>
                )}
                {tab === 'test' && <Quiz questions={ch.testQuestions} theme="kid" onCorrect={() => addStars(1)} resetKey={`${cls}-${subject}-${ch.chapterNo}`} />}
              </div>
              <div className="mt-6 flex flex-wrap justify-between gap-2">
                {ch.chapterNo > 1 ? <Link href={url18.chapter(cls, subject, ch.chapterNo - 1)} className="rounded-full bg-sky-100 px-5 py-2 text-lg font-extrabold text-sky-800">← Previous chapter</Link> : <span />}
                {ch.chapterNo < chapters.length && <Link href={url18.chapter(cls, subject, ch.chapterNo + 1)} className="rounded-full bg-pink-500 px-5 py-2 text-lg font-extrabold text-white">Next chapter →</Link>}
              </div>
            </section>
            <aside className="space-y-6">
              <BoloMaster chapters={chapters} theme="kid" />
              <StarBank />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
export default withSuspense(Chapter18);
