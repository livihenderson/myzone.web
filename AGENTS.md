<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MyZone website

Public website of MyZone, a private fitness gym in Kladno; Czech first, English second. Purpose and pages: [README.md](README.md).

- Stack: Next.js 16 App Router, React 19, Tailwind v4, `motion`; npm (`package-lock.json`).
- Copy for both locales: `lib/i18n/dictionary.ts`. Booking widget: `lib/reservine.ts`. Lead e-mail route: `app/api/contact/route.ts` (env names in `.env.example`).
- Design, motion and accessibility targets: `docs/superpowers/specs/2026-04-18-myzone-website-design.md` (dated; README notes what changed since).
- Checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
