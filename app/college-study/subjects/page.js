'use client';
// College Step 2: semester and subjects of one course - /college-study/subjects?course=B.Tech&sem=1&branch=CSE
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BRANCH_SUBJECTS, COURSES, READY_COURSES } from '@/lib/data/college.mjs';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { urlCollege } from '@/lib/collegeNav.mjs';

function CollegeSubjects() {
  const p = useSearchParams();
  const course = p.get('course') || '';
  const info = COURSES.find((c) => c.course === course);
  const sem = Math.min(Math.max(1, Number(p.get('sem')) || 1), info?.semesters || 8);
  const branch = info?.branches.includes(p.get('branch')) ? p.get('branch') : info?.branches[0] || '';
  const data = useJson(info ? urlCollege.api(course, sem) : null);
  const groupSubjects = BRANCH_SUBJECTS[course]?.[branch];
  const subjects = (data?.subjects || []).filter((s) => !groupSubjects || groupSubjects.includes(s.subject));
  const single = (info?.semesters || 1) === 1;

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs className="text-neon" items={[['🏠 Home', '/'], ['College', urlCollege.courses()], [course || 'Course']]} />
        {!info ? <p className="mt-6">Course not found. <Link href={urlCollege.courses()} className="font-bold text-neon">Choose a course</Link></p> : (
          <>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">{course}{branch ? <span className="text-neon"> · {branch}</span> : ''}</h1>
            {groupSubjects && <p className="mt-2 text-slate-300">This group has {groupSubjects.length} subjects in every semester: <b className="text-white">{groupSubjects.join(' + ')}</b></p>}
            {info.branches.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {info.branches.map((b) => (
                  <Link key={b} href={urlCollege.subjects(course, sem, b)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${branch === b ? 'bg-white text-navy-900' : 'bg-white/10 hover:bg-white/20'}`}>{b}</Link>
                ))}
              </div>
            )}
            {!single && (
              <section className="mt-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">2. Choose a semester</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.from({ length: info.semesters }, (_, i) => i + 1).map((s) => (
                    <Link key={s} href={urlCollege.subjects(course, s, branch)} className={`rounded-lg px-4 py-2 font-bold ${sem === s ? 'bg-neon text-navy-900' : 'border border-white/15 bg-navy-800 hover:border-neon/60'}`}>Sem {s}</Link>
                  ))}
                </div>
              </section>
            )}
            <section className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">{single ? '2' : '3'}. Choose a subject</h2>
              {!data ? <p className="mt-2 text-slate-300">Loading...</p> : subjects.length === 0 ? (
                <div className="mt-2 rounded-xl border border-white/15 bg-navy-800 p-5">
                  <p className="font-semibold">⏳ {course}{branch ? ` (${branch})` : ''} - Semester {sem} data is being added soon.</p>
                  <p className="mt-1 text-slate-300">Ready now (Semester 1): {READY_COURSES.join(', ')}. More semesters can be added from the Admin Panel (College Study).</p>
                  {data.courseJobs && <p className="mt-3"><b className="text-neon">💼 {course} - jobs after this course:</b> {data.courseJobs}</p>}
                </div>
              ) : (
                <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((s) => (
                    <Link key={s.subject} href={urlCollege.units(course, sem, s.subject)}
                      className="rounded-2xl border border-white/15 bg-navy-800 p-4 transition hover:-translate-y-0.5 hover:border-neon">
                      <div className="text-lg font-bold">{s.subject}</div>
                      <div className="text-sm text-slate-400">{s.subjectTitle}</div>
                      <div className="mt-2 text-sm font-bold text-neon">Open →</div>
                    </Link>
                  ))}
                </div>
              )}
              {course === 'B.Tech' && subjects.length > 0 && <p className="mt-2 text-xs text-slate-400">Semester 1 subjects are common to all branches - CSE, Mechanical, Civil and Electrical.</p>}
            </section>
            {course === 'Computer Courses' && (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <Link href="/computer-course" className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neon bg-neon/10 p-4">
                  <span><b className="text-neon">💻 Complete Computer Course</b> - 16 modules, practicals in the Computer Lab, quizzes and a certificate.</span>
                  <span className="rounded-full bg-neon px-4 py-1.5 font-bold text-navy-900">Start →</span>
                </Link>
                <Link href="/react-course" className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-sky-400 bg-sky-400/10 p-4">
                  <span><b className="text-sky-300">⚛️ Complete React Course</b> - 15 modules, 50+ lessons with live React code, quizzes and a certificate.</span>
                  <span className="rounded-full bg-sky-400 px-4 py-1.5 font-bold text-navy-900">Start →</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
export default withSuspense(CollegeSubjects);
