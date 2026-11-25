# MyZone website

The public website of MyZone, a private fitness gym in Kladno: [myzonegym.cz](https://myzonegym.cz). Czech is the primary language and English the secondary one, switched in the page without separate URLs.

## Why it exists

The site introduces a small private gym to people who would book it: the space, its equipment and comfort, how a visit works, where it is, and the way to book.

- **Visitors** (individuals or a small group): see what the gym offers and reach the booking widget or the contact details.
- **The gym owner**: one public place for the offer, contact details and legal terms.
- **Developers**: a single Next.js app; there is no CMS, so copy changes are code changes.

The copy (75-minute slots, an entry code sent by SMS, a door code, up to 4 people) describes the gym as the owner presents it. It is marketing text, not a description of booking, SMS or door systems in this repository.

## What is in the code

| Route | What it is |
|---|---|
| `/` | Landing: hero animation, how it works, equipment, comfort, capacity, contact with map, FAQ |
| `/o-nas` | About the gym |
| `/fotogalerie` | Photo gallery with a custom lightbox |
| `/rezervovat` | Booking status page ("in preparation"); noindex and left out of the sitemap |
| `/gdpr`, `/obchodni-podminky` | Privacy notice and terms, Czech only |
| `/api/contact` | Server route that e-mails a discount lead to the owner and a confirmation to the submitter (reCAPTCHA v3, rate limit, SMTP) |

- Copy for both locales: `lib/i18n/dictionary.ts`.
- Booking buttons use the Reservine widget: instance and branch in `lib/reservine.ts`, script pinned in `app/layout.tsx`.
- Server environment variables for `/api/contact` are named and explained in `.env.example`.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Docs

- [Design spec, 2026-04-18](docs/superpowers/specs/2026-04-18-myzone-website-design.md): brand, motion and accessibility targets. Its scope has changed since: the discount form was replaced by the Reservine widget, and a sitemap, robots rules and a lead e-mail route were added.
- [Implementation plan, 2026-04-18](docs/superpowers/plans/2026-04-18-myzone-website.md): the original build plan.
- Agent instructions: [AGENTS.md](AGENTS.md), which `CLAUDE.md` imports.
