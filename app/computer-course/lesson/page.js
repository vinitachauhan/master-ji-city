'use client';
import CourseLesson from '@/components/course/CourseLesson';
import { COMPUTER_COURSE_CONFIG } from '@/lib/data/computerCourseConfig.mjs';

export default function ComputerCourseLesson() {
  return <CourseLesson config={COMPUTER_COURSE_CONFIG} />;
}
