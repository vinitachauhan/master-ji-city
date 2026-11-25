'use client';
// Class 9-12 Step 1: choose a class. Each class opens its subjects on a new page.
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/components/Profile';
import { Crumbs, withSuspense } from '@/components/study/common';
import { CLASSES_912, subjectsFor912, url912 } from '@/lib/study912Nav.mjs';

const INFO = { '9': 'Foundation year - NCERT basics', '10': 'Board exam year', '11': 'Stream year - PCM / PCB / Commerce / Arts', '12': 'Board exam + entrance exams' };

function Study912() {
  const { profile } = useProfile();
  const router = useRouter();
  const p = useSearchParams();

  // old links (/study-9-12/study?class=10&subject=Science) open the new pages
  useEffect(() => {
    const cls = p.get('class'); const subject = p.get('subject');
    if (!CLASSES_912.includes(cls)) return;
    router.replace(subjectsFor912(cls).some(([s]) => s === subject) ? url912.chapters(cls, subject) : url912.subjects(cls));
  }, [p, router]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Crumbs className="text-blue-100" items={[['🏠 Home', '/'], ['Class 9-12', '/study-9-12'], ['COMPLETE Study']]} />
          <h1 className="mt-2 text-2xl font-extrabold sm:text-4xl">📘 COMPLETE Study · Class 9-12</h1>
          <p className="text-blue-100">Class → Subject → Chapter → Topic · each step on its own page · Board exam ready</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-xl font-extrabold text-slate-900">1. Choose your class</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLASSES_912.map((c) => (
            <Link key={c} href={url912.subjects(c)}
              className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg ${profile?.class === c ? 'border-green-500' : 'border-slate-200'}`}>
              {profile?.class === c && <span className="absolute right-3 top-3 rounded-full bg-green-600 px-2 text-xs font-bold text-white">My class</span>}
              <div className="text-4xl font-black text-blue-700">{c}<sup className="text-lg">th</sup></div>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Class {c}</h3>
              <p className="text-sm text-slate-600">{INFO[c]}</p>
              <p className="mt-3 font-semibold text-green-700">{subjectsFor912(c).length} subjects →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
export default withSuspense(Study912);
