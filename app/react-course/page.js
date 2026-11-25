'use client';
import CourseHome from '@/components/course/CourseHome';
import { REACT_COURSE_CONFIG } from '@/lib/data/reactCourseConfig.mjs';

export default function ReactCourse() {
  return <CourseHome config={REACT_COURSE_CONFIG} />;
}
