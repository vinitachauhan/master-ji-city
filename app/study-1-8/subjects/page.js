'use client';
// Step 2: subjects of one class - /study-1-8/subjects?class=5
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import StarBank from '@/components/StarBank';
import { Crumbs, withSuspense } from '@/components/study/common';
import { CLASSES_18, SUBJECTS_18, label18, url18 } from '@/lib/study18Nav.mjs';

function Subjects18() {
  const p = useSearchParams();
  const cls = p.get('class') || '';
  const ok = CLASSES_18.includes(cls);

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs items={[['🏠 Home', '/'], ['Classes', url18.classes()], [ok ? label18(cls) : 'Class']]} />
        {!ok ? (
          <p className="mt-6 text-xl">Class not found. <Link href={url18.classes()} className="font-bold text-pink-600">Choose your class</Link></p>
        ) : (
          <>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">🎒 {label18(cls)}</h1>
            <p className="text-xl font-bold text-pink-600">2️⃣ Choose a Subject</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {SUBJECTS_18.map(([s, e, bg]) => (
                  <Link key={s} href={url18.chapters(cls, s)}
                    className={`rounded-3xl border-4 border-white p-5 text-center shadow-pop transition hover:-translate-y-1 active:translate-y-1 ${bg}`}>
                    <div className="text-5xl">{e}</div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-900">{s}</div>
                    <div className="text-sm font-bold text-slate-700">Chapters →</div>
                  </Link>
                ))}
              </div>
              <aside className="space-y-6"><StarBank /></aside>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {CLASSES_18.indexOf(cls) > 0 && <Link href={url18.subjects(CLASSES_18[CLASSES_18.indexOf(cls) - 1])} className="rounded-full bg-white px-5 py-2 text-lg font-extrabold text-sky-800">← {label18(CLASSES_18[CLASSES_18.indexOf(cls) - 1])}</Link>}
              {CLASSES_18.indexOf(cls) < CLASSES_18.length - 1 && <Link href={url18.subjects(CLASSES_18[CLASSES_18.indexOf(cls) + 1])} className="rounded-full bg-pink-500 px-5 py-2 text-lg font-extrabold text-white">{label18(CLASSES_18[CLASSES_18.indexOf(cls) + 1])} →</Link>}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
export default withSuspense(Subjects18);
