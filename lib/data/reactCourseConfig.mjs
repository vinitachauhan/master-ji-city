// Settings for the Complete React Course pages.
import { REACT_COURSE } from './reactCourse.mjs';
import { LAB_NAMES } from './courseLabs.mjs';

export const REACT_COURSE_CONFIG = {
  base: '/react-course', storageKey: 'reactCourse:progress', modules: REACT_COURSE, labNames: LAB_NAMES, labLink: '/computer-lab?tool=react',
  title: '⚛️ Complete React Course',
  intro: 'From modern JavaScript to job-ready React developer: JSX, components, props, state, events, lists, forms, useEffect and APIs, all hooks, styling and Tailwind, React Router, Context and Redux, Next.js and deployment, performance, testing, TypeScript and real projects. Every lesson has a live example you can edit and run',
  certCourse: 'Complete React Course',
  certTopics: 'Modern JavaScript · JSX · Components & Props · State & Events · Lists · Forms · useEffect & APIs · Hooks · Styling & Tailwind · React Router · Context & Redux · Next.js & Deployment · Performance & Testing · TypeScript · Projects',
  certNote: 'A practice certificate from the Master Ji learning website. Show your deployed projects and GitHub to employers.',
};
