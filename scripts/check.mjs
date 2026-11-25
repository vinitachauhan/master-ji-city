// npm run check  ->  pre-push checks (run before every push to GitHub)
//   1. Every study chapter is complete and every test question is valid
//   2. No passwords / API keys / tokens in the files that would be pushed
//   3. No secret files (.env.local etc.) are tracked by git
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { buildSeed } from '../lib/seed.mjs';

let problems = 0;
const fail = (msg) => { problems++; console.log(`  ✖ ${msg}`); };
const pass = (msg) => console.log(`  ✔ ${msg}`);

// ---------- 1. content ----------
console.log('Content');
const seed = buildSeed();
const chapters = [...seed.study_1_8, ...seed.study_9_12];
let badQ = 0;
for (const d of chapters) {
  const need = 10;
  if (!d.chapterName || !d.notes || (Array.isArray(d.notes) && !d.notes.length)) fail(`empty chapter: ${d.class} ${d.subject} ${d.chapterNo}`);
  if (d.testQuestions.length !== need) { fail(`${d.class} ${d.subject} "${d.chapterName}" has ${d.testQuestions.length} test questions (needs ${need})`); continue; }
  const seen = new Set();
  for (const q of d.testQuestions) {
    if (!q.options.includes(q.correctAnswer) || new Set(q.options).size !== 4 || seen.has(q.question)) badQ++;
    seen.add(q.question);
  }
}
if (badQ) fail(`${badQ} invalid / duplicate test questions`);
else pass(`${chapters.length} chapters, every one with 10 valid test questions`);
const keys = new Set();
for (const d of seed.study_1_8) { const k = `${d.class}|${d.subject}|${d.chapterNo}`; if (keys.has(k)) fail(`duplicate chapter ${k}`); keys.add(k); }
pass(`${seed.collegeStudy.length} college units, ${seed.aptitudeQuestions.length} aptitude questions, ${seed.jobs.length} jobs`);

// Topics: every chapter / unit is split into topics (each topic has its own page); textbook topics must match a real chapter
const { topics18, topics912, topicsCollege } = await import('../lib/topics.mjs');
const { TOPICS_18 } = await import('../lib/data/topics/topics18.mjs');
const { TOPICS_912 } = await import('../lib/data/topics/topics912.mjs');
const allTopics = [...seed.study_1_8.map(topics18), ...seed.study_9_12.map(topics912), ...seed.collegeStudy.map(topicsCollege)];
const badTopics = allTopics.filter((t) => !t.length || t.some((x) => !x.title || !x.text)).length;
const normName = (x) => String(x).toLowerCase().replace(/[’'?!.,()]/g, '').replace(/\s+/g, ' ').trim();
const chapterKeys = new Set(chapters.map((d) => `${d.class}|${normName(d.chapterName)}`));
const orphan = Object.entries({ ...TOPICS_18, ...TOPICS_912 }).flatMap(([c, ch]) => Object.keys(ch).filter((n) => !chapterKeys.has(`${c}|${normName(n)}`)).map((n) => `${c} ${n}`));
if (badTopics) fail(`${badTopics} chapters / units without proper topics`);
if (orphan.length) fail(`textbook topics for chapters that do not exist: ${orphan.join(', ')}`);
if (!badTopics && !orphan.length) pass(`${allTopics.reduce((a, t) => a + t.length, 0)} topics in ${allTopics.length} chapters / units, each topic with a title and text`);

// Computer Course: every module has lessons and a valid quiz
const { COMPUTER_COURSE } = await import('../lib/data/computerCourse.mjs');
const { REACT_COURSE } = await import('../lib/data/reactCourse.mjs');
let badCourse = 0;
for (const l of REACT_COURSE.flatMap((m) => m.lessons)) if (!l.code || !/function App\s*\(/.test(l.code)) { badCourse++; fail(`React lesson without a runnable App: ${l.title}`); }
for (const [name, mods] of [['Computer', COMPUTER_COURSE], ['React', REACT_COURSE]]) if (new Set(mods.map((m) => m.id)).size !== mods.length) { badCourse++; fail(`duplicate module id in ${name} course`); }
for (const m of [...COMPUTER_COURSE, ...REACT_COURSE]) {
  if (!m.lessons.length || m.quiz.length < 5) { badCourse++; fail(`Computer Course module ${m.id} is incomplete`); }
  for (const q of m.quiz) if (q.length !== 5 || new Set(q.slice(1)).size !== 4) { badCourse++; fail(`bad quiz question in ${m.id}: ${q[0]}`); }
  for (const l of m.lessons) if (!l.title || !l.learn || !l.steps.length || !l.practice || !l.lab) { badCourse++; fail(`incomplete lesson in ${m.id}: ${l.title}`); }
}
if (!badCourse) for (const [name, mods] of [['Computer Course', COMPUTER_COURSE], ['React Course', REACT_COURSE]]) pass(`${name}: ${mods.length} modules, ${mods.reduce((a, m) => a + m.lessons.length, 0)} lessons, ${mods.reduce((a, m) => a + m.quiz.length, 0)} quiz questions`);

// ---------- 2 + 3. secrets ----------
console.log('Secrets');
const tracked = execSync('git ls-files --cached --others --exclude-standard', { encoding: 'utf8' }).split('\n').filter(Boolean);
const secretFiles = tracked.filter((f) => /(^|\/)\.env(\.|$)/.test(f) && !f.endsWith('.env.local.example'));
if (secretFiles.length) fail(`secret files would be pushed: ${secretFiles.join(', ')}`); else pass('no .env files will be pushed (only .env.local.example)');

const PATTERNS = [
  [/sk-ant-[A-Za-z0-9_-]{20,}/, 'Anthropic API key'],
  [/gh[pousr]_[A-Za-z0-9]{30,}/, 'GitHub token'],
  [/mongodb(\+srv)?:\/\/[^\s'"`<>]*:[^\s'"`<>@]+@/, 'MongoDB URL with password'],
  [/AKIA[0-9A-Z]{16}/, 'AWS key'],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'private key'],
  [/(ADMIN_JWT_SECRET|ADMIN_PIN|SUPER_ADMIN_PASSWORD|VERCEL_OIDC_TOKEN)\s*=\s*[^\s#]{4,}/, 'secret value in a settings file'],
];
let leaks = 0;
for (const f of tracked) {
  if (/\.(png|jpe?g|gif|ico|woff2?|lock)$/.test(f) || f.endsWith('package-lock.json')) continue;
  let text; try { text = readFileSync(f, 'utf8'); } catch { continue; }
  for (const [re, what] of PATTERNS) if (re.test(text)) { leaks++; fail(`${what} found in ${f}`); }
}
if (!leaks) pass(`scanned ${tracked.length} files - no passwords, keys or tokens`);

console.log(problems ? `\n✖ ${problems} problem(s) - fix before pushing.` : '\n✔ All checks passed - safe to push.');
process.exit(problems ? 1 : 0);
