'use client';
import CourseLesson from '@/components/course/CourseLesson';
import { REACT_COURSE_CONFIG } from '@/lib/data/reactCourseConfig.mjs';

export default function ReactCourseLesson() {
  return <CourseLesson config={REACT_COURSE_CONFIG} />;
}
