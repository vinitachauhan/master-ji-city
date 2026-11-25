// Addresses of the College pages: Course → Semester & Subject → Unit → Topic, each on its own page.
const q = (o) => new URLSearchParams(Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v]) => [k, String(v)]))).toString();
export const urlCollege = {
  courses: () => '/college-study',
  subjects: (course, sem, branch) => `/college-study/subjects?${q({ course, sem, branch })}`,
  units: (course, sem, subject, tab) => `/college-study/units?${q({ course, sem, subject, tab })}`,
  unit: (course, sem, subject, unit) => `/college-study/unit?${q({ course, sem, subject, unit })}`,
  topic: (course, sem, subject, unit, t) => `/college-study/topic?${q({ course, sem, subject, unit, t })}`,
  api: (course, sem, subject) => `/api/college-study?${q({ course, semester: sem, subject })}`,
};
// practical courses use practical words
export const wordsFor = (course) => course === 'Cooking Classes'
  ? { unit: 'Recipe', units: 'Recipes', imp: '💡 Tips & Safety', pyq: '🧑‍🍳 Practice', plan: '🗓️ How to Practise', jobs: '💼 Earn from Cooking' }
  : course === 'Computer Courses'
    ? { unit: 'Lesson', units: 'Lessons', imp: '❗ Important Qs', pyq: '🖱️ Practicals', plan: '🗓️ Practice Plan', jobs: '💼 Jobs' }
    : { unit: 'Unit', units: 'Units', imp: '❗ Important Qs', pyq: '🕘 Previous Year', plan: '🗓️ Study Plan', jobs: '💼 Jobs' };
export const LAB_FOR = { Python: 'python', 'Web Design': 'code', React: 'code', DCA: 'excel', Tally: 'excel' };
