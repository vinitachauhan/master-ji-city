'use client';
// Class 9-12 Step 2: subjects of one class - /study-9-12/subjects?class=10
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Crumbs, withSuspense } from '@/components/study/common';
import { CLASSES_912, subjectsFor912, url912 } from '@/lib/study912Nav.mjs';

function Subjects912() {
  const cls = useSearchParams().get('class') || '';
  const ok = CLASSES_912.includes(cls);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Crumbs className="text-blue-100" items={[['🏠 Home', '/'], ['Class 9-12', url912.classes()], [ok ? `Class ${cls}` : 'Class']]} />
          <h1 className="mt-2 text-2xl font-extrabold sm:text-4xl">📘 Class {cls}</h1>
          <p className="text-blue-100">2. Choose a subject</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {!ok ? <p>Class not found. <Link href={url912.classes()} className="font-bold text-blue-700">Choose your class</Link></p> : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {subjectsFor912(cls).map(([s, e]) => (
                <Link key={s} href={url912.chapters(cls, s)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg">
                  <div className="text-4xl">{e}</div>
                  <div className="mt-2 font-bold text-slate-900">{s}</div>
                  <div className="text-sm font-semibold text-green-700">Chapters →</div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {CLASSES_912.filter((c) => c !== cls).map((c) => <Link key={c} href={url912.subjects(c)} className="rounded-full bg-white px-4 py-2 font-semibold text-blue-700 shadow-sm">Class {c}</Link>)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
export default withSuspense(Subjects912);
