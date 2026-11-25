'use client';
import CourseHome from '@/components/course/CourseHome';
import { COMPUTER_COURSE_CONFIG } from '@/lib/data/computerCourseConfig.mjs';

export default function ComputerCourse() {
  return <CourseHome config={COMPUTER_COURSE_CONFIG} />;
}
