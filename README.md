# Master Ji - City - Play School Se College Tak - COMPLETE Study 🎓

Next.js 14 + Tailwind CSS + MongoDB. Simple Hindi + English. No login: students only enter their Name, Class and City.

## Chalao (Run)

```bash
npm install
cp .env.local.example .env.local   # MONGODB_URI set karo (local ya Atlas)
npm run dev                        # http://localhost:3000
```

- **MongoDB connected:** on the first API call, the app fills any empty collection in `master_ji_city_complete` with the default data automatically.
- **MongoDB not reachable:** the app still runs on its built-in data. Results and stars are then kept in memory and are lost on restart. Each API response has a `source` field (`mongodb` / `built-in`).
- `npm run seed` deletes the default collections and fills them again. It does not touch `results` or `stars`.

## Languages

- All subjects are in **English**, except **Hindi** (written in Hindi / Devanagari, like a Hindi textbook) and **Sanskrit** (written like a Sanskrit textbook, with Hindi meanings for the younger classes).
- Hindi (Play School - Class 8) has a **story with a moral (कहानी)** and a **poem (कविता)** in every class. English has **2 poems per class** - nursery rhymes for the youngest, then classic poems (Stevenson, Rossetti, Lear, Tagore, Wordsworth, Tennyson, Kipling, Frost). All are public domain or written new for this site.
- If your MongoDB already has the older content, run `npm run seed` once to load the new content (results, stars and school records are not touched).

## Pages

| Route | Kya hai |
|---|---|
| `/` | Home - 4 big buttons |
| `/study-1-8` | Play School-8th: Class → Subject → Chapters → Notes / Example / 10 Questions / 5 MCQ (+1 ⭐) · Bolo Master (mic) · Star Bank + Leaderboard |
| `/study-9-12/study` | Class 9-12: Notes (step by step), Formula, 10 Board Questions, Previous Year pattern, 10 MCQ, Study Plan |
| `/study-9-12/best-subject` | 24 questions (4 each: Maths, Science, English, SST, Reasoning, Interest) → Bar Graph + Hindi advice, saved to `results` |
| `/study-9-12/stream` | PCM / PCB / Commerce / Arts details + "Tumhare Liye Ye Stream Best Hai, Kyunki..." |
| `/college-study` | Course → Semester → Subject → Units, Notes, Important Qs, PYQ, Study Plan, Jobs |
| `/college-study/guide` | 12th ke baad kaunsa course (Delhi / Noida / Bulandshahr), Scholarships, Free courses |

## AI Doubt Solver, Mock Test, Certificate

| Route | What it does |
|---|---|
| `/doubt` | Student types a question (Hindi or English) or uploads / clicks a photo. Answer in simple Hindi + English: Answer, Step by Step, Example, English Summary. Can be read aloud. Saved in `doubts` (the photo itself is not stored). |
| `/mock-test` | Class 9-12, any subject: 20 MCQ, 30-minute timer (auto-submits). Result shows score, %, rank, right / wrong / skipped with correct answers, and a top-10 list. Answers are checked on the server. Saved in `mockResults`. Each correct answer = +1 ⭐. |
| `/certificate` | At 100 ⭐ (stars saved on the server), shows a "Name - Master Ji Topper - Class - City" certificate with Download (PNG) and Print / Save as PDF. Each certificate has a number, checkable at `/api/certificate?verify=MJ-XXXXXX`. |

**AI setup:** the Doubt Solver uses Claude (`claude-opus-5-5`) through the official `@anthropic-ai/sdk`. Put `ANTHROPIC_API_KEY=...` in `.env.local` and restart. Without a key, typed questions are answered from the closest built-in chapter notes (marked "From built-in notes"), and photo questions ask the student to type instead. Server-side refusal fallback is on (`fallbacks: "default"`), so if Claude declines a question on safety grounds the API retries on a suitable fallback model. Each visitor (IP) can ask 8 doubts per 10 minutes, to control cost.

## School Management (`/school`) - admin PIN required

Open `/school` and enter the `ADMIN_PIN` from `.env.local`. **Change it from the default `1234` before using real data.** Salaries, fees and phone numbers are private, so every `/api/school/*` call needs the PIN in the `x-admin-pin` header. In production the section is disabled until `ADMIN_PIN` is set.

| Tab | What it does |
|---|---|
| Dashboard | Today's attendance, this month's fees collected/pending, salaries paid/pending, activity money pending |
| Attendance | Mark Present / Absent / Leave for students (by class), teachers, staff and managers; monthly report of days present / absent / leave with % (below 75% flagged) |
| Parents & Progress | Record parent / guardian meetings: did they come, who came, how the child is doing (Best / Good / Average / Needs Improvement), teacher's note, parent's reply |
| Salary | Monthly and yearly salary for teachers, staff and managers; who has been paid (date + mode) and who is still waiting; 12-month paid / not-paid grid |
| Student Fees | Per month: which students paid and which have not, with guardian phone numbers |
| Other Activities | Create trips, annual day, sports kit etc. (amount per student, classes); see who paid and who still owes |
| Students & Staff | Add / edit / delete students (class, roll no., guardian, monthly fee) and staff (role, designation, monthly salary) |

The app starts with **demo** students and staff so you can try it. Use **Dashboard → Delete all school records** to clear them; the demo data will not come back after that.

School collections: `students`, `staff`, `attendance`, `parentMeetings`, `salaryPayments`, `feePayments`, `activities`, `activityPayments` (+ `meta`). `npm run seed` never touches them.

## API

- `GET /api/study-1-8?class=5&subject=Maths`
- `GET /api/study-9-12?class=10&subject=Science`
- `GET /api/aptitude` (does not send the correct answers; the server does the scoring)
- `POST /api/result` `{ studentName, class, city, answers: { qid: option } }` · `GET /api/result` (last 20)
- `GET /api/colleges?stream=PCM` · `GET /api/streams`
- `GET /api/college-study?course=B.Tech&semester=1&subject=Maths` (leave out `subject` to get the list of subjects)
- `GET/POST /api/stars` (leaderboard)
- `POST /api/doubt` `{ name, class, city, subject, question, image?: { mediaType, data } }` · `GET /api/doubt?name=&class=&city=` (recent doubts)
- `GET /api/mock-test?class=10&subject=Science` (start) · `POST /api/mock-test` `{ sessionId, name, city, answers }` (submit) · `GET ...&top=1` (top 10)
- `GET /api/certificate?name=&class=&city=` · `GET /api/certificate?verify=MJ-XXXXXX`
- `/api/school/{summary|students|staff|attendance|meetings|salary|fees|activities|reset}` (PIN protected)

## Collections

`study_1_8` (231 chapters), `study_9_12` (270), `aptitudeQuestions` (24), `streams` (4), `collegeStudy` (40 units: B.Tech, B.Com and B.A. Sem 1), `colleges` (15 courses), `results`, `stars`.

To add more content, insert new documents into MongoDB with the same fields. Example: a `collegeStudy` document for BCA Sem 2. The UI picks them up automatically.

## Notes

- Bolo Master uses the browser's Speech API. It works best in Chrome on Android and desktop. Students can also type a question.
- "Previous Year" questions follow the board/university paper pattern; they are not copies of real papers.
- College fees and salaries are approximate. Check official websites before admission.
