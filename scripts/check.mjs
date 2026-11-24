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
