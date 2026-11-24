// Resource registry: one entry per manageable collection. The server validates with it and the
// React app builds its tables and forms from it (single source of truth).
import { CLASSES_1_8, SUBJECTS_1_8 } from '../../lib/data/study18.mjs';
import { CLASSES_9_12, SUBJECTS_9_12 } from '../../lib/data/study912.mjs';
import { randomBytes } from 'node:crypto';
import { newId } from './core.js';

export const CLASS_LIST = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
const APT_SUBJECTS = ['Maths', 'Science', 'English', 'SST', 'Reasoning', 'Interest'];

// field helpers
const text = (label, o = {}) => ({ type: 'string', label, max: 200, ...o });
const long = (label, o = {}) => ({ type: 'text', label, max: 20000, ...o });
const num = (label, o = {}) => ({ type: 'number', label, ...o });
const bool = (label, o = {}) => ({ type: 'boolean', label, ...o });
const pick = (label, values, o = {}) => ({ type: 'enum', label, values, ...o });
const lines = (label, o = {}) => ({ type: 'stringArray', label, ...o });
const date = (label, o = {}) => ({ type: 'date', label, ...o });

export const RESOURCES_CONFIG = {
  students: {
    label: 'Students', collection: 'students', keyFields: ['id'], perm: 'students', icon: '🎒',
    fields: {
      name: text('Name', { required: true }), class: pick('Class', CLASS_LIST, { required: true }), section: pick('Section', SECTIONS, { default: 'A' }),
      rollNo: num('Roll no.', { min: 0 }), guardianName: text('Parent / guardian'), guardianPhone: text('Guardian phone', { max: 15 }),
      monthlyFee: num('Monthly fee (Rs)', { required: true, min: 0 }), schoolId: { type: 'ref', ref: 'schools', label: 'School' },
    },
    columns: ['name', 'class', 'section', 'rollNo', 'guardianName', 'guardianPhone', 'monthlyFee'],
    search: ['name', 'guardianName', 'guardianPhone'], filters: ['class', 'section'], sort: 'name',
    beforeCreate: (d) => ({ id: newId(), ...d }),
    cascade: (id) => [['attendance', { personType: 'student', personId: id }], ['feePayments', { studentId: id }], ['activityPayments', { studentId: id }], ['parentMeetings', { studentId: id }]],
  },
  teachers: {
    label: 'Teachers & Staff', collection: 'staff', keyFields: ['id'], perm: 'teachers', icon: '👩‍🏫',
    fields: {
      name: text('Name', { required: true }), role: pick('Role', ['Teacher', 'Staff', 'Manager'], { required: true, default: 'Teacher' }),
      designation: text('Designation / subject'), phone: text('Phone', { max: 15 }), monthlySalary: num('Monthly salary (Rs)', { required: true, min: 0 }),
      schoolId: { type: 'ref', ref: 'schools', label: 'School' },
    },
    columns: ['name', 'role', 'designation', 'phone', 'monthlySalary'], search: ['name', 'designation', 'phone'], filters: ['role'], sort: 'name',
    beforeCreate: (d) => ({ id: newId(), ...d }),
    cascade: (id) => [['attendance', { personType: 'staff', personId: id }], ['salaryPayments', { staffId: id }]],
  },
  schools: {
    label: 'Schools', collection: 'schools', keyFields: ['id'], perm: 'schools', icon: '🏫',
    fields: {
      name: text('School name', { required: true }), city: text('City / village'), address: long('Address', { max: 500 }),
      principal: text('Principal'), phone: text('Phone', { max: 15 }), email: text('Email', { format: 'email' }),
      board: pick('Board', ['CBSE', 'UP Board', 'ICSE', 'Other'], { default: 'CBSE' }), active: bool('Active', { default: true }),
    },
    columns: ['name', 'city', 'principal', 'phone', 'board', 'active'], search: ['name', 'city', 'principal'], filters: ['board'], sort: 'name',
    beforeCreate: (d) => ({ id: newId(), ...d }),
  },
  classes: {
    label: 'Classes', collection: 'classes', keyFields: ['id'], perm: 'classes', icon: '🏷️',
    fields: {
      name: text('Class name', { required: true, max: 40 }), level: pick('Level', ['Play School - 8', '9 - 12', 'College'], { required: true }),
      sections: lines('Sections (one per line)', { default: ['A'] }), order: num('Display order', { min: 0 }),
      classTeacherId: { type: 'ref', ref: 'teachers', label: 'Class teacher' },
    },
    columns: ['name', 'level', 'sections', 'order'], search: ['name'], filters: ['level'], sort: 'order',
    beforeCreate: (d) => ({ id: newId(), ...d }),
  },
  subjects: {
    label: 'Subjects', collection: 'subjects', keyFields: ['id'], perm: 'subjects', icon: '📚',
    fields: {
      name: text('Subject name', { required: true, max: 60 }), level: pick('Level', ['Play School - 8', '9 - 12', 'College', 'All'], { required: true }),
      description: long('Description', { max: 1000 }), active: bool('Active', { default: true }),
    },
    columns: ['name', 'level', 'active'], search: ['name'], filters: ['level'], sort: 'name',
    beforeCreate: (d) => ({ id: newId(), ...d }),
  },

  // ---------- website study content (edits appear on the website) ----------
  materials18: {
    label: 'Play School - Class 8', collection: 'study_1_8', keyFields: ['class', 'subject', 'chapterNo'], perm: 'materials', icon: '📒', markEdited: true,
    fields: {
      class: pick('Class', CLASSES_1_8, { required: true, immutable: true }), subject: pick('Subject', SUBJECTS_1_8, { required: true, immutable: true }),
      chapterNo: num('Chapter no.', { required: true, min: 1, immutable: true }), chapterName: text('Chapter name', { required: true }),
      notes: long('Notes', { required: true }), examples: long('City + Village example'),
      importantQuestions: lines('Practice questions (one per line)'), testQuestions: { type: 'questions', label: 'Test questions (MCQ)' },
    },
    columns: ['class', 'subject', 'chapterNo', 'chapterName', 'testQuestions'], search: ['chapterName', 'notes'], filters: ['class', 'subject'], sort: 'chapterNo',
  },
  materials912: {
    label: 'Class 9 - 12', collection: 'study_9_12', keyFields: ['class', 'subject', 'chapterNo'], perm: 'materials', icon: '📘', markEdited: true,
    fields: {
      class: pick('Class', CLASSES_9_12, { required: true, immutable: true }), subject: pick('Subject', SUBJECTS_9_12, { required: true, immutable: true }),
      chapterNo: num('Chapter no.', { required: true, min: 1, immutable: true }), chapterName: text('Chapter name', { required: true }),
      notes: lines('Notes - step by step (one step per line)', { required: true }), formulas: long('Formula / definition'),
      importantQuestions: lines('Important (board) questions'), previousYearQuestions: lines('Previous-year pattern questions'),
      testQuestions: { type: 'questions', label: 'Test questions (MCQ)' }, studyPlan: long('Study plan', { max: 2000 }),
    },
    columns: ['class', 'subject', 'chapterNo', 'chapterName', 'testQuestions'], search: ['chapterName', 'formulas'], filters: ['class', 'subject'], sort: 'chapterNo',
  },
  materialsCollege: {
    label: 'College units', collection: 'collegeStudy', keyFields: ['course', 'semester', 'subject', 'unitNo'], perm: 'materials', icon: '🎓', markEdited: true,
    fields: {
      course: pick('Course', ['B.Tech', 'B.Sc', 'B.Com', 'B.A.', 'BCA', 'BBA', 'Nursing', 'B.Pharmacy', 'B.Ed', 'LLB'], { required: true, immutable: true }),
      semester: num('Semester', { required: true, min: 1, max: 8, immutable: true }), subject: text('Subject', { required: true, immutable: true, max: 60 }),
      unitNo: num('Unit no.', { required: true, min: 1, immutable: true }), subjectTitle: text('Subject title'), unitName: text('Unit name', { required: true }),
      notes: long('Notes', { required: true }), importantQuestions: lines('Important questions'), previousYearQuestions: lines('Previous-year pattern questions'),
      studyPlan: long('Study plan', { max: 2000 }), jobs: long('Jobs after this subject', { max: 2000 }),
    },
    columns: ['course', 'semester', 'subject', 'unitNo', 'unitName'], search: ['unitName', 'subject', 'subjectTitle'], filters: ['course', 'semester'], sort: 'unitNo',
  },

  // ---------- tests ----------
  aptitude: {
    label: 'Best Subject Test questions', collection: 'aptitudeQuestions', keyFields: ['qid'], perm: 'tests', icon: '🧠', markEdited: true,
    fields: {
      subject: pick('Subject', APT_SUBJECTS, { required: true }), question: long('Question', { required: true, max: 1000 }),
      options: { type: 'options4', label: 'Options (4)', required: true },
      correctAnswer: text('Correct answer (must match an option; leave empty for Interest)'),
      optionStreams: lines('Interest only: stream for each option (PCM / PCB / Commerce / Arts, one per line)'),
    },
    columns: ['subject', 'question', 'correctAnswer'], search: ['question'], filters: ['subject'], sort: 'qid',
    beforeCreate: (d) => ({ qid: `q-${randomBytes(4).toString('hex')}`, ...d }),
    validate: (d) => {
      if (d.subject === 'Interest') {
        if (!Array.isArray(d.optionStreams) || d.optionStreams.length !== 4 || d.optionStreams.some((s) => !['PCM', 'PCB', 'Commerce', 'Arts'].includes(s))) return 'Interest questions need 4 option streams (PCM / PCB / Commerce / Arts).';
      } else if (!d.options?.includes(d.correctAnswer)) return 'Correct answer must be exactly one of the 4 options.';
      return null;
    },
  },
  mockResults: {
    label: 'Mock Test results', collection: 'mockResults', keyFields: ['sessionId'], perm: 'tests', icon: '📝', readOnly: true,
    fields: {
      name: text('Student'), city: text('City'), class: text('Class'), subject: text('Subject'), score: num('Score'), total: num('Out of'),
      percent: num('%'), timeTakenSec: num('Time (sec)'), late: bool('Late'), createdAt: date('Taken on'),
    },
    columns: ['name', 'city', 'class', 'subject', 'score', 'percent', 'createdAt'], search: ['name', 'city'], filters: ['class', 'subject'], sort: '-createdAt',
  },
  results: {
    label: 'Best Subject Test results', collection: 'results', keyFields: ['id'], perm: 'tests', icon: '📊', readOnly: true,
    fields: {
      studentName: text('Student'), class: text('Class'), city: text('City'), bestSubject: text('Best subject'), recommendedStream: text('Recommended stream'),
      mathsScore: num('Maths %'), scienceScore: num('Science %'), englishScore: num('English %'), sstScore: num('SST %'), createdAt: date('Taken on'),
    },
    columns: ['studentName', 'class', 'city', 'bestSubject', 'recommendedStream', 'createdAt'], search: ['studentName', 'city'], filters: ['recommendedStream'], sort: '-createdAt',
  },

  doubts: {
    label: 'Doubts', collection: 'doubts', keyFields: ['id'], perm: 'doubts', icon: '🤖', noCreate: true,
    fields: {
      name: text('Student', { readOnly: true }), class: text('Class', { readOnly: true }), city: text('City', { readOnly: true }), subject: text('Subject', { readOnly: true }),
      question: long('Question', { readOnly: true }), hasImage: bool('Photo question', { readOnly: true }), source: text('Answered by', { readOnly: true }),
      answer: long('Answer (shown to the student)', { max: 20000 }), reviewed: bool('Reviewed by a teacher'), teacherNote: long('Teacher note (internal)', { max: 2000 }),
      createdAt: date('Asked on', { readOnly: true }),
    },
    columns: ['name', 'class', 'subject', 'question', 'source', 'reviewed', 'createdAt'], search: ['name', 'question', 'city'], filters: ['source', 'reviewed'], sort: '-createdAt',
  },
  certificates: {
    label: 'Certificates', collection: 'certificates', keyFields: ['certificateNo'], perm: 'certificates', icon: '🏆',
    fields: {
      certificateNo: text('Certificate no.', { readOnly: true }), name: text('Student name', { required: true }), class: text('Class', { required: true, max: 20 }),
      city: text('City', { required: true }), title: text('Title', { default: 'Master Ji Topper' }), starsAtIssue: num('Stars at issue', { min: 0 }),
      issuedOn: date('Issued on'),
    },
    columns: ['certificateNo', 'name', 'class', 'city', 'starsAtIssue', 'issuedOn'], search: ['certificateNo', 'name', 'city'], filters: [], sort: '-issuedOn',
    beforeCreate: (d) => ({ certificateNo: `MJ-${randomBytes(3).toString('hex').toUpperCase()}`, issuedOn: new Date().toISOString().slice(0, 10), createdAt: new Date(), ...d }),
  },
  notifications: {
    label: 'Notifications', collection: 'notifications', keyFields: ['id'], perm: 'notifications', icon: '📣',
    fields: {
      title: text('Title', { required: true, max: 120 }), message: long('Message', { required: true, max: 1000 }),
      type: pick('Type', ['info', 'success', 'warning', 'urgent'], { default: 'info' }),
      audience: pick('Show to', ['website', 'admins', 'all'], { default: 'website', help: 'website = banner on the Master Ji website; admins = admin panel only' }),
      link: text('Link (optional)', { max: 300 }), active: bool('Active', { default: true }),
      startsAt: date('Show from'), endsAt: date('Show until'),
    },
    columns: ['title', 'type', 'audience', 'active', 'startsAt', 'endsAt'], search: ['title', 'message'], filters: ['type', 'audience', 'active'], sort: '-createdAt',
    beforeCreate: (d) => ({ id: newId(), createdAt: new Date(), ...d }),
  },
  logs: {
    label: 'Activity Logs', collection: 'activityLogs', keyFields: ['id'], perm: 'logs', icon: '🧾', readOnly: true, noDelete: true,
    fields: {
      at: date('When'), actorName: text('Who'), actorRole: text('Role'), action: text('Action'), entity: text('Section'), entityKey: text('Item'),
      summary: long('Details'), ip: text('IP'),
    },
    columns: ['at', 'actorName', 'action', 'entity', 'summary'], search: ['actorName', 'summary', 'entity', 'entityKey'], filters: ['action', 'entity'], sort: '-at',
  },
};

// Public description for the React app (functions removed)
export function resourceMeta() {
  return Object.fromEntries(Object.entries(RESOURCES_CONFIG).map(([k, c]) => [k, {
    key: k, label: c.label, icon: c.icon, perm: c.perm, keyFields: c.keyFields, fields: c.fields, columns: c.columns,
    filters: c.filters, readOnly: !!c.readOnly, noCreate: !!(c.noCreate || c.readOnly), noDelete: !!c.noDelete, search: c.search?.length > 0,
  }]));
}
