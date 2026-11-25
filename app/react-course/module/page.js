'use client';
import CourseModule from '@/components/course/CourseModule';
import { REACT_COURSE_CONFIG } from '@/lib/data/reactCourseConfig.mjs';

export default function Module() {
  return <CourseModule config={REACT_COURSE_CONFIG} />;
}
