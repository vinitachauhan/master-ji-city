'use client';
// College Step 1: choose a course. Each course opens its semesters and subjects on a new page.
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { COURSES, READY_COURSES } from '@/lib/data/college.mjs';
import { withSuspense } from '@/components/study/common';
import { urlCollege } from '@/lib/collegeNav.mjs';

const EMOJI = { 'B.Tech': '⚙️', 'B.Sc': '🔬', 'B.Com': '📊', 'B.A.': '📜', BCA: '💻', BBA: '💼', Nursing: '🩺', 'B.Pharmacy': '💊', 'B.Ed': '🧑‍🏫', LLB: '⚖️', MBBS: '🏥', 'B.Sc Agriculture': '🌾', 'BJMC (Mass Comm)': '🎙️', 'Hotel Management': '🏨', 'Fashion Design': '👗', 'Polytechnic Diploma': '🛠️', 'CA Foundation': '🧮', ITI: '🔧', 'Computer Courses': '🖥️', 'Cooking Classes': '🍳' };

function CollegeStudy() {
  const router = useRouter();
  const p = useSearchParams();

  // old links (/college-study?course=Cooking%20Classes&subject=...) open the new pages
  useEffect(() => {
    const course = p.get('course');
    if (!COURSES.some((c) => c.course === course)) return;
    const sem = Number(p.get('sem')) || 1;
    router.replace(p.get('subject') ? urlCollege.units(course, sem, p.get('subject')) : urlCollege.subjects(course, sem));
  }, [p, router]);

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-neon">← Home</Link>
          <Link href="/college-study/guide" className="rounded-full border border-neon px-4 py-2 text-sm font-bold text-neon hover:bg-neon hover:text-navy-900">🧭 College Guide - what after Class 12?</Link>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">🎓 College <span className="text-neon">COMPLETE</span> Study</h1>
        <p className="text-slate-300">Course → Semester & Subject → Unit → Topic · each step on its own page</p>

        <h2 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">1. Choose a course</h2>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COURSES.map((c) => (
            <Link key={c.course} href={urlCollege.subjects(c.course, 1, c.branches[0])}
              className="rounded-2xl border border-white/15 bg-navy-800 p-4 transition hover:-translate-y-1 hover:border-neon">
              <div className="text-3xl">{EMOJI[c.course] || '🎓'}</div>
              <div className="mt-1 font-extrabold">{c.course}</div>
              <div className="text-xs text-slate-400">{c.years} {c.years === 1 ? 'year' : 'years'}{READY_COURSES.includes(c.course) ? ' · notes ready' : ''}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
export default withSuspense(CollegeStudy);
