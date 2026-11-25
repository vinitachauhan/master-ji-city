// Settings for the Complete Computer Course pages.
import { COMPUTER_COURSE } from './computerCourse.mjs';
import { LAB_NAMES } from './courseLabs.mjs';

export const COMPUTER_COURSE_CONFIG = {
  base: '/computer-course', storageKey: 'computerCourse:progress', modules: COMPUTER_COURSE, labNames: LAB_NAMES, labLink: '/computer-lab',
  title: '💻 Complete Computer Course',
  intro: 'From zero to job-ready: basics, Windows, typing, Paint, Notepad, WordPad, Word, Excel, PowerPoint, Internet, cyber safety, Tally, HTML/CSS, JavaScript, Python, AI and career. Learn every lesson and do it yourself in the Computer Lab',
  certCourse: 'Complete Computer Course',
  certTopics: 'Computer Fundamentals · Windows · Typing · Paint · Notepad · WordPad · MS Word · MS Excel · PowerPoint · Internet · Cyber Safety · Tally with GST · HTML & CSS · JavaScript · Python · AI · Career',
  certNote: 'A practice certificate from the Master Ji learning website. For government jobs, also take an official certificate such as NIELIT CCC or O Level.',
};
