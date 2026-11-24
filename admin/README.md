# Master Ji - Super Admin Panel

React + Vite + Tailwind (screens) · Node.js + Express (API) · MongoDB (the **same database as the website**).

## Start

```bash
cd admin
npm install          # first time only
npm run dev          # http://localhost:5050
```

Or from the website folder: `npm run admin`.

**Production:** `npm run build` then `npm start` (serves the built app + API on `ADMIN_PORT`). `ADMIN_JWT_SECRET` and `MONGODB_URI` must be set - in production the API answers 503 instead of running on temporary data.

**Hosting:** the panel is a Node.js server, so it needs a host that runs one (Render, Railway, a VPS...) plus a MongoDB Atlas database shared with the website. Start command: `npm --prefix admin install && npm --prefix admin run build && npm --prefix admin start` from the repository root.

## First login

Settings are read from the website's `.env.local`:

| Variable | Meaning |
|---|---|
| `MONGODB_URI`, `MONGODB_DB` | Same database as the website. **Required** - without MongoDB the panel runs on temporary data that is not saved and does not reach the website (a yellow warning is shown). |
| `ADMIN_PORT` | Port of the panel (default 5050). |
| `ADMIN_JWT_SECRET` | Long random secret for sign-in sessions. |
| `SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_PASSWORD` | Used **once**, when there are no admin users yet, to create the first Super Admin. You must change the password at first login. |

## Sections

| Section | What you can do |
|---|---|
| Dashboard | Key numbers, today's attendance, doubts this week, recent activity |
| Reports | Mock-test averages by subject, test counts by class, recommended streams, doubts per day, attendance %, fees, star leaderboard |
| Students / Teachers & Staff | Full CRUD - same records as the website's School section (deleting a student also removes their attendance, fees and meetings) |
| Classes & Sections | Every class divided into Section A, B, C… Pick a class and a section to manage **that section's own students** (add, edit, move between sections), **teachers** (class teacher + subject teachers) and **study materials** (notes, homework, worksheets, links with due dates). Add sections; remove a section once it is empty. |
| Schools / Class details / Subjects | Full CRUD |
| Study Materials | Edit every chapter on the website: notes, examples, practice questions and the **MCQ test editor** (Play School-8, Class 9-12, College) |
| Tests & Results | Best Subject Test questions (CRUD), Mock Test and Best Subject results (view / delete) |
| Doubts | Read students' doubts, correct the answer, mark as reviewed |
| Certificates | Issue, edit, revoke (delete) topper certificates |
| Notifications | Announcements shown as a banner on the website and / or in this panel, with start / end dates |
| Admin Users | Add admins, assign roles, disable, reset passwords |
| Roles & Permissions | 5 built-in roles + your own roles; tick "can see" / "can change" per section |
| Website Settings | Turn the Doubt Solver / Mock Test on or off, doubts per visitor, stars needed for a certificate, a banner message |
| Activity Logs | Every sign-in (and failed sign-in) and every change, with who / when / what (cannot be deleted) |

## Roles

| Role | Can do |
|---|---|
| Super Admin | Everything (cannot be edited or deleted; there must always be one) |
| Admin | Everything except managing admins, roles and settings (can view them) |
| Teacher | Edit materials, tests and doubts; view students, teachers, classes, reports |
| Content Editor | Edit materials, tests, subjects and classes |
| Viewer | View-only access to everything except admins, roles and logs |

## Security

- Passwords hashed with scrypt; strong-password rule; forced change on first login and after a reset.
- Session in an **HttpOnly, SameSite=Strict** cookie (8 hours); changing a role, disabling a user or resetting a password logs that user out immediately.
- Every change needs a custom request header (CSRF protection); 5 failed logins → 15-minute lock.
- Permissions are checked on the server for every request (the screens only hide what you cannot use).
- `npm run seed` in the website no longer overwrites content edited here (use `npm run seed -- --force` to reset it on purpose).
