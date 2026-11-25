// Addresses of the Class 9-12 pages: Class → Subject → Chapter → Topic, each on its own page.
export const CLASSES_912 = ['9', '10', '11', '12'];
export const SUBJECTS_912 = [
  ['Maths', '📐'], ['Science', '🔬'], ['Physics', '⚛️'], ['Chemistry', '🧪'], ['Biology', '🧬'], ['Accounts', '📒'], ['Business Studies', '💼'],
  ['Economics', '📈'], ['History', '🏛️'], ['Geography', '🗺️'], ['Pol Science', '⚖️'], ['Hindi', '🅰️'], ['English', '🔤'], ['Computer', '💻'],
];
// Science is one subject in Class 9-10; in 11-12 it is Physics, Chemistry and Biology
export const subjectsFor912 = (cls) => SUBJECTS_912.filter(([s]) => s !== 'Science' || cls === '9' || cls === '10');
const e = encodeURIComponent;
export const url912 = {
  classes: () => '/study-9-12/study',
  subjects: (cls) => `/study-9-12/subjects?class=${e(cls)}`,
  chapters: (cls, subject) => `/study-9-12/chapters?class=${e(cls)}&subject=${e(subject)}`,
  chapter: (cls, subject, no, tab) => `/study-9-12/chapter?class=${e(cls)}&subject=${e(subject)}&no=${no}${tab ? `&tab=${tab}` : ''}`,
  topic: (cls, subject, no, t) => `/study-9-12/topic?class=${e(cls)}&subject=${e(subject)}&no=${no}&t=${t}`,
  api: (cls, subject) => `/api/study-9-12?class=${e(cls)}&subject=${e(subject)}`,
};
