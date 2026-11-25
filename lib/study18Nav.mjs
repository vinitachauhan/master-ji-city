// Addresses of the Play School - Class 8 pages: Class → Subject → Chapter → Topic, each on its own page.
export const CLASSES_18 = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8'];
export const SUBJECTS_18 = [
  ['Hindi', '🅰️', 'bg-orange-300'], ['English', '🔤', 'bg-sky-300'], ['Maths', '➕', 'bg-yellow-300'],
  ['Science', '🔬', 'bg-green-300'], ['SST', '🌍', 'bg-pink-300'], ['Computer', '💻', 'bg-violet-300'], ['Sanskrit', '🕉️', 'bg-amber-300'], ['Drawing', '🎨', 'bg-rose-300'],
];
export const label18 = (c) => (/^\d+$/.test(c) ? `Class ${c}` : c);
const e = encodeURIComponent;
export const url18 = {
  classes: () => '/study-1-8',
  subjects: (cls) => `/study-1-8/subjects?class=${e(cls)}`,
  chapters: (cls, subject) => `/study-1-8/chapters?class=${e(cls)}&subject=${e(subject)}`,
  chapter: (cls, subject, no, tab) => `/study-1-8/chapter?class=${e(cls)}&subject=${e(subject)}&no=${no}${tab ? `&tab=${tab}` : ''}`,
  topic: (cls, subject, no, t) => `/study-1-8/topic?class=${e(cls)}&subject=${e(subject)}&no=${no}&t=${t}`,
  api: (cls, subject) => `/api/study-1-8?class=${e(cls)}&subject=${e(subject)}`,
};
