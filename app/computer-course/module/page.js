'use client';
import CourseModule from '@/components/course/CourseModule';
import { COMPUTER_COURSE_CONFIG } from '@/lib/data/computerCourseConfig.mjs';

export default function Module() {
  return <CourseModule config={COMPUTER_COURSE_CONFIG} />;
}
