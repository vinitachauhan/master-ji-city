// Complete Computer Course - 16 modules from computer basics to Python, AI and jobs.
import { MODULES_1 } from './computerCourse1.mjs';
import { MODULES_2 } from './computerCourse2.mjs';

export const COMPUTER_COURSE = [...MODULES_1, ...MODULES_2];
export const PASS_PERCENT = 60; // module quiz pass mark

// Quiz rows → Quiz component format, options in a fixed (but mixed) order
export function moduleQuiz(mod) {
  return mod.quiz.map(([question, correct, ...wrong], i) => {
    const options = [correct, ...wrong];
    const k = (i * 7 + mod.id.length) % options.length; // rotate so the answer is not always first
    return { question, correctAnswer: correct, options: [...options.slice(k), ...options.slice(0, k)] };
  });
}
