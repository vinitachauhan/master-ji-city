import { NextResponse } from 'next/server';
import { find } from '@/lib/db.mjs';
import { COURSE_JOBS } from '@/lib/data/college.mjs';
import { topicsCollege } from '@/lib/topics.mjs';

export const dynamic = 'force-dynamic';

// GET /api/college-study?course=B.Tech&semester=1&subject=Maths
// without subject: returns the list of subjects for that semester
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const course = searchParams.get('course');
  const semester = Number(searchParams.get('semester') || 1);
  const subject = searchParams.get('subject');
  if (!course) return NextResponse.json({ error: 'course is required' }, { status: 400 });

  if (!subject) {
    const rows = await find('collegeStudy', { course, semester }, { sort: { unitNo: 1 } });
    const subjects = [...new Map(rows.map((r) => [r.subject, { subject: r.subject, subjectTitle: r.subjectTitle }])).values()];
    return NextResponse.json({ course, semester, subjects, courseJobs: COURSE_JOBS[course] || null });
  }

  const units = await find('collegeStudy', { course, semester, subject }, { sort: { unitNo: 1 } });
  return NextResponse.json({
    course, semester, subject,
    subjectTitle: units[0]?.subjectTitle || subject,
    studyPlan: units[0]?.studyPlan || null,
    jobs: units[0]?.jobs || COURSE_JOBS[course] || null,
    units: units.map((u) => ({ ...u, topics: u.topics?.length ? u.topics : topicsCollege(u) })),
  });
}
