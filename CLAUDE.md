# Master Ji - City (project rules for Claude Code)

Next.js 14 website (`app/`, `components/`, `lib/`) + Super Admin Panel (`admin/`, React + Vite + Express). MongoDB via `lib/db.mjs` (falls back to built-in data when no database is connected).

- GitHub: `vinitachauhan/master-ji-city` - branch `main` is production.
- Vercel project `master-ji-city` is connected to that repo: **every push to `main` deploys automatically** to https://master-ji-city.vercel.app.

## Workflow for every change

1. Make the change in a small, focused way. Never overwrite or delete existing features or content unless asked.
2. Review: show the user what changed (`git status`, `git diff --stat`, and a short summary in plain words).
3. Test:
   - `npm run check` - every chapter / test question is valid and no secrets are in the files to be pushed.
   - `npm run build` - the website builds.
   - If the admin panel changed: `npm --prefix admin run build`.
   - For UI changes, run the site (`npm run dev`) and check the affected pages.
4. **Ask the user for approval before `git push` and before any production deployment.** Never push or deploy without an explicit "yes" for that change.
5. After approval: commit (clear message) → `git push origin main` → Vercel deploys automatically.
6. Wait for the deployment (`npx vercel ls master-ji-city`), read its build log if it fails (`npx vercel inspect --logs <url>`), fix, and ask again before re-pushing.
7. Verify the live site: `npm run check:live`.

## Never

- Never commit `.env.local` or print secret values (MongoDB password, `ADMIN_PIN`, `ADMIN_JWT_SECRET`, `ANTHROPIC_API_KEY`, tokens). Secrets live only in `.env.local` (local) and Vercel → Settings → Environment Variables.
- Never create a new GitHub repository or a new Vercel project for this site.
- Never force-push, rewrite history, or run `npm run seed -- --force` against the live database without asking.
- Never delete or reset database records; `npm run seed` keeps admin-edited content and never touches results, stars, school or admin data.

## Environment variables (names only)

| Name | Where | Secret? |
|---|---|---|
| `MONGODB_URI` | Vercel (Production + Preview), `.env.local` | Yes |
| `MONGODB_DB` | Vercel, `.env.local` (`master_ji_city_complete`) | No |
| `ADMIN_PIN` | Vercel, `.env.local` | Yes |
| `ANTHROPIC_API_KEY` | Vercel, `.env.local` (optional) | Yes |
| `ADMIN_JWT_SECRET`, `SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_PASSWORD`, `ADMIN_PORT` | admin panel host, `.env.local` | Yes (except port) |
