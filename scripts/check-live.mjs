// npm run check:live [url]  ->  checks every page and feature on the live website after a deployment.
// Read-only except for one test result / doubt / mock test (marked "Live Check"), like a real student would create.
const U = (process.argv[2] || 'https://master-ji-city.vercel.app').replace(/\/$/, '');
let pass = 0, fail = 0;
const ok = (c, m, x = '') => { if (c) { pass++; console.log('  ✔', m); } else { fail++; console.log('  ✖', m, x); } };
const get = async (p) => { const r = await fetch(U + p); let d = {}; try { d = await r.json(); } catch {} return [r.status, d]; };
const post = async (p, body) => { const r = await fetch(U + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); let d = {}; try { d = await r.json(); } catch {} return [r.status, d]; };

console.log(`Checking ${U}\n# Pages`);
for (const p of ['/', '/study-1-8', '/study-9-12', '/study-9-12/study', '/study-9-12/best-subject', '/study-9-12/stream', '/college-study', '/college-study/guide', '/doubt', '/mock-test', '/certificate', '/school']) {
  const r = await fetch(U + p); ok(r.status === 200, `${p} → ${r.status}`);
}

console.log('# Study content');
let [s, d] = await get('/api/study-1-8?class=Play%20School&subject=Hindi');
ok(s === 200 && d.chapters?.length >= 5 && d.chapters.every((c) => c.testQuestions.length === 10), `Play School Hindi: ${d.chapters?.length} chapters, 10 questions each (data: ${d.source})`);
[s, d] = await get('/api/study-9-12?class=10&subject=Science');
ok(s === 200 && d.chapters?.length === 5, 'Class 10 Science chapters');
[s, d] = await get('/api/college-study?course=B.Tech&semester=1&subject=Maths');
ok(s === 200 && d.units?.length >= 4, 'College units');
[s, d] = await get('/api/jobs?stream=PCM');
ok(s === 200 && d.jobs?.length > 0, `Jobs: ${d.jobs?.length}`);

console.log('# Tests and tools');
[s, d] = await get('/api/aptitude');
ok(s === 200 && d.questions?.length === 24 && !d.questions.some((q) => 'correctAnswer' in q), 'Best Subject Test (answers hidden)');
[s, d] = await get('/api/mock-test?class=10&subject=Science');
ok((s === 200 && d.questions?.length === 20) || (s === 503 && /closed/i.test(d.error || '')), s === 200 ? 'Mock test: 20 questions' : 'Mock test switched off in admin settings');
[s, d] = await post('/api/doubt', { name: 'Live Check', class: '7', city: 'Noida', question: 'What are simple equations?' });
ok(s === 200 || s === 429 || (s === 503 && /closed/i.test(d.error || '')), `Doubt Solver → ${s} ${d.source || d.error || ''}`);
[s, d] = await get('/api/certificate?name=Nobody&class=7&city=Noida');
ok(s === 200 && d.eligible === false, 'Certificate check');
[s, d] = await get('/api/notifications');
ok(s === 200 && Array.isArray(d.notifications), `Announcements: ${d.notifications?.length ?? 0}`);

console.log('# Security');
[s, d] = await get('/api/school/summary');
ok(s === 401 || s === 503, `School data needs the admin PIN (→ ${s})`);
ok((await fetch(U + '/.env.local')).status === 404, '.env.local is not public');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
