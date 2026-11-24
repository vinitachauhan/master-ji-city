// Demo data for the School Management section (attendance, parents, salary, fees, activities).
// Dates are generated relative to "today" so the demo always looks current.

export const SCHOOL_COLLECTIONS = ['students', 'staff', 'attendance', 'parentMeetings', 'salaryPayments', 'feePayments', 'activities', 'activityPayments'];

// [name, class, section, guardian, monthly fee]
const STUDENTS = [
  ['Aarav Sharma', '5', 'A', 'Rajesh Sharma (Father)', 900], ['Vinita Chauhan', '10', 'A', 'Sunita Chauhan (Mother)', 1500],
  ['Kabir Khan', '8', 'A', 'Imran Khan (Father)', 1200], ['Ananya Verma', '3', 'A', 'Pooja Verma (Mother)', 800],
  ['Rohit Yadav', '12', 'A', 'Mahesh Yadav (Father)', 1800], ['Sana Ali', '7', 'A', 'Farhan Ali (Father)', 1100],
  ['Priya Singh', '1', 'A', 'Neha Singh (Mother)', 700], ['Arjun Gupta', '9', 'A', 'Amit Gupta (Father)', 1400],
  ['Meera Joshi', 'KG', 'A', 'Kavita Joshi (Mother)', 600], ['Dev Malik', '11', 'A', 'Sanjay Malik (Father)', 1700],
  ['Ishita Rana', '6', 'A', 'Ramesh Rana (Guardian - Uncle)', 1000], ['Yash Tyagi', '4', 'A', 'Anil Tyagi (Father)', 850],
  ['Riya Bansal', '5', 'A', 'Manoj Bansal (Father)', 900], ['Aditya Pal', '5', 'B', 'Geeta Pal (Mother)', 900],
  ['Zoya Qureshi', '5', 'B', 'Salim Qureshi (Father)', 900], ['Harsh Chaudhary', '10', 'A', 'Vijay Chaudhary (Father)', 1500],
  ['Nisha Kumari', '10', 'B', 'Rekha Devi (Mother)', 1500], ['Mohit Saini', '10', 'B', 'Ravi Saini (Father)', 1500],
];

const STAFF = [
  ['Mrs. Rekha Saxena', 'Teacher', 'Maths', 32000], ['Mr. Vikas Tomar', 'Teacher', 'Science', 30000],
  ['Ms. Shalini Arora', 'Teacher', 'English', 28000], ['Mr. Naresh Bhati', 'Teacher', 'Hindi / Sanskrit', 26000],
  ['Mrs. Farah Siddiqui', 'Teacher', 'Computer', 27000], ['Mr. Suresh Kumar', 'Staff', 'Office Clerk', 15000],
  ['Mr. Ramu Prasad', 'Staff', 'Peon', 11000], ['Mr. Harish Nagar', 'Staff', 'Bus Driver', 14000],
  ['Mr. Deepak Chaudhary', 'Manager', 'School Manager', 45000],
];

function rng(seed) { let s = seed || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 10000) / 10000; }; }
const pad = (n) => String(n).padStart(2, '0');
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const ym = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;

export function buildSchoolDemo(today = new Date()) {
  const r = rng(20261123);
  const roll = {};
  const students = STUDENTS.map(([name, cls, section, guardian, fee], i) => ({
    id: `stu-${pad(i + 1)}`, name, class: cls, section, rollNo: (roll[`${cls}-${section}`] = (roll[`${cls}-${section}`] || 0) + 1),
    guardianName: guardian, guardianPhone: `98000000${pad(i + 1)}`, monthlyFee: fee, demo: true,
  }));
  const staff = STAFF.map(([name, role, designation, salary], i) => ({
    id: `stf-${pad(i + 1)}`, name, role, designation, monthlySalary: salary, phone: `97000000${pad(i + 1)}`, demo: true,
  }));

  // Attendance: last 20 school days (Sundays skipped)
  const attendance = [];
  const d = new Date(today); let days = 0;
  while (days < 20) {
    d.setDate(d.getDate() - 1);
    if (d.getDay() === 0) continue;
    days++;
    const date = ymd(d);
    for (const s of students) attendance.push({ date, personType: 'student', personId: s.id, status: r() < 0.88 ? 'Present' : r() < 0.8 ? 'Absent' : 'Leave' });
    for (const s of staff) attendance.push({ date, personType: 'staff', personId: s.id, status: r() < 0.93 ? 'Present' : r() < 0.6 ? 'Absent' : 'Leave' });
  }

  const thisMonth = ym(today);
  const prev = (k) => { const x = new Date(today.getFullYear(), today.getMonth() - k, 1); return ym(x); };
  const payDate = (k, day) => ymd(new Date(today.getFullYear(), today.getMonth() - k, day));

  // Salary: last 3 months fully paid, this month only some paid
  const salaryPayments = [];
  for (const s of staff) {
    for (let k = 1; k <= 3; k++) salaryPayments.push({ staffId: s.id, month: prev(k), amount: s.monthlySalary, paidOn: payDate(k, 5), mode: 'Bank Transfer' });
    if (r() < 0.55) salaryPayments.push({ staffId: s.id, month: thisMonth, amount: s.monthlySalary, paidOn: payDate(0, Math.min(today.getDate(), 7)), mode: r() < 0.7 ? 'Bank Transfer' : 'Cash' });
  }

  // Fees: last month mostly paid, this month ~60%
  const feePayments = [];
  for (const s of students) {
    if (r() < 0.85) feePayments.push({ studentId: s.id, month: prev(1), amount: s.monthlyFee, paidOn: payDate(1, 10), mode: 'Cash' });
    if (r() < 0.6) feePayments.push({ studentId: s.id, month: thisMonth, amount: s.monthlyFee, paidOn: payDate(0, Math.min(today.getDate(), 10)), mode: r() < 0.5 ? 'UPI' : 'Cash' });
  }

  const activities = [
    { id: 'act-01', name: 'Annual Day Costume', amount: 300, date: payDate(-1, 15), classes: ['KG', '1', '3', '4', '5', '6', '7'], demo: true },
    { id: 'act-02', name: 'Science Trip - Nehru Planetarium, Delhi', amount: 500, date: payDate(0, 28), classes: ['8', '9', '10', '11', '12'], demo: true },
    { id: 'act-03', name: 'Sports Day Kit', amount: 250, date: payDate(1, 20), classes: [], demo: true }, // [] = all classes
  ];
  const activityPayments = [];
  for (const a of activities) {
    for (const s of students) {
      if (a.classes.length && !a.classes.includes(s.class)) continue;
      if (r() < 0.6) activityPayments.push({ activityId: a.id, studentId: s.id, amount: a.amount, paidOn: payDate(0, Math.min(today.getDate(), 12)) });
    }
  }

  const ratings = ['Best', 'Good', 'Good', 'Average', 'Needs Improvement'];
  const notes = {
    Best: 'Excellent in class tests and homework. Encourage olympiad participation.',
    Good: 'Regular and attentive. Needs a little more practice in written answers.',
    Average: 'Understands basics but homework is often incomplete. Daily 1 hour revision at home suggested.',
    'Needs Improvement': 'Weak in fundamentals and frequently absent. Parents to check homework daily; extra class suggested.',
  };
  const meetingDate = payDate(1, 25);
  const parentMeetings = students.map((s, i) => {
    const attended = r() < 0.75;
    const rating = ratings[Math.floor(r() * ratings.length)];
    return {
      id: `ptm-${pad(i + 1)}`, studentId: s.id, date: meetingDate, title: 'Monthly PTM',
      attended, attendedBy: attended ? s.guardianName : '', rating,
      teacherNote: notes[rating], parentFeedback: attended ? 'Will monitor study at home.' : '', demo: true,
    };
  });

  return { students, staff, attendance, parentMeetings, salaryPayments, feePayments, activities, activityPayments };
}
