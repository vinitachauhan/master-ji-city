'use client';
// Step 3: chapters of one subject - /study-1-8/chapters?class=5&subject=Maths
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import BoloMaster from '@/components/BoloMaster';
import StarBank from '@/components/StarBank';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { label18, url18 } from '@/lib/study18Nav.mjs';

function Chapters18() {
  const p = useSearchParams();
  const cls = p.get('class') || ''; const subject = p.get('subject') || '';
  const data = useJson(cls && subject ? url18.api(cls, subject) : null);
  const chapters = data?.chapters || [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs items={[['🏠 Home', '/'], ['Classes', url18.classes()], [label18(cls), url18.subjects(cls)], [subject]]} />
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">📗 {label18(cls)} · {subject}</h1>
        <p className="text-xl font-bold text-pink-600">3️⃣ Choose a Chapter - each chapter has its own topics</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section>
            {!data ? <p className="text-xl">⏳ Loading...</p> : (
              <div className="grid gap-3">
                {chapters.map((c) => (
                  <Link key={c.chapterNo} href={url18.chapter(cls, subject, c.chapterNo)}
                    className="flex items-center gap-4 rounded-3xl border-4 border-white bg-white p-4 text-left shadow-pop transition hover:bg-yellow-50 active:translate-y-1">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-300 text-2xl font-black">{c.chapterNo}</span>
                    <span className="flex-1">
                      <span className="block text-xl font-extrabold">Chapter {c.chapterNo} - {c.chapterName}</span>
                      <span className="block text-sm font-bold text-slate-500">{c.topics?.length || 0} topics · Practice questions · 10-question test</span>
                    </span>
                    <span className="text-2xl text-pink-500">→</span>
                  </Link>
                ))}
                {chapters.length === 0 && <p className="text-lg">No data found for this class/subject. <Link href={url18.subjects(cls)} className="font-bold text-pink-600">Choose another subject</Link></p>}
              </div>
            )}
          </section>
          <aside className="space-y-6">
            <BoloMaster chapters={chapters} theme="kid" />
            <StarBank />
          </aside>
        </div>
      </div>
    </main>
  );
}
export default withSuspense(Chapters18);
