# MyZone — Private Gym Website Design Spec

**Date:** 2026-04-18
**Status:** Approved for planning
**Stakeholder:** Lukas (owner, also Reservine)
**Goal:** Client-visualization build of a modern, techy, dark-themed site for a soon-to-open private gym in Kladno. Pre-launch lead capture is a first-class goal.

---

## 1. Goals & Non-goals

### Goals
- Convey an ultra-modern, energetic, slightly techy vibe through motion, type, and an icy-blue accent on near-black.
- Establish the MyZone brand through a cinematic hero: a weight plate with the neon logo that fractures diagonally on scroll to reveal the page.
- Present facilities, comfort, process, and location clearly and without padding.
- Drive pre-launch lead capture via a 15% discount form; collected leads will be followed up manually by the owner.
- Bilingual: Czech primary, English secondary.

### Non-goals
- Real backend for the form (leads handled manually; client-side `console.log` for now).
- Real Remotion phone-UI video (animated placeholder loop for now, swappable later).
- Authentic gym photos (stock interim photos, swap later).
- Real reservation flow (reservation page is a placeholder; integrated later via reservine.io).
- CMS, analytics, sitemap, robots.txt, i18n URL routes (`/cs`, `/en`).

---

## 2. Brand & Visual System

### Colors
| Token | Hex | Use |
| --- | --- | --- |
| `--bg-black` | `#05070A` | Page background (near-black, slight blue cast) |
| `--bg-panel` | `#0B1017` | Cards and panels |
| `--ice` | `#6BD8FF` | Primary icy-blue accent (neon glow) |
| `--ice-deep` | `#2B9BD1` | Secondary accent (eyebrows, hairlines) |
| `--ice-glow` | `rgba(107, 216, 255, 0.45)` | Shadow/glow on hover, CTAs, fracture cracks |
| `--text-primary` | `#E8F4FB` | Body and headings |
| `--text-dim` | `#7E8B98` | Secondary copy, captions |
| `--border-hairline` | `rgba(107, 216, 255, 0.12)` | 1px dividers, card borders |

Colors exposed in `app/globals.css` via Tailwind v4 `@theme`.

### Typography
- Display / headings: **Space Grotesk** (600 and 700) — geometric, techy.
- Body: **Inter** (400 and 500).
- Both loaded via `next/font/google` with CSS variables (`--font-display`, `--font-body`).
- Generous tracking on display sizes; `text-6xl`–`text-8xl` for hero headings.

### Vibe devices (used sparingly)
- Monospace eyebrow labels (e.g. `01 / JAK TO FUNGUJE`) in `--ice-deep`.
- Animated icy gradient hairlines between sections.
- Subtle dotted/grid backdrop behind hero.
- "Scanning" icy-blue beam transitions on scroll-reveals.
- Cursor-follow soft glow on primary CTAs.

### Motion principles
- Every scroll-reveal, every transform: GPU-friendly transforms only.
- Every animation honors `prefers-reduced-motion` — fallback to fade or no motion.
- Entry animations stagger (parent-child variants), never all-at-once.

---

## 3. Information Architecture

Pages (Next.js app router):

| Route | Purpose |
| --- | --- |
| `/` | Landing |
| `/o-nas` | O nás (story/manifesto) |
| `/fotogalerie` | Photo gallery with lightbox |
| `/rezervovat` | Placeholder "reservation system coming soon" |

**Navbar** (sticky, translucent blur backdrop):
- Left: logo mark + wordmark, links to `/`.
- Center (desktop): `Úvod`, `O nás`, `Fotogalerie`.
- Right: `CZ / EN` toggle + primary CTA `Rezervovat` → `/rezervovat`.
- Mobile: hamburger opens a full-screen dark overlay with icy-blue accents and the same links + toggle + CTA.

**Footer:** logo, one-line tagline, kontakty (adresa, tel, email), social icons (placeholders), copyright. Thin icy hairline above it.

---

## 4. Landing Page Composition (top to bottom)

1. **Hero / Fracture.** Full-viewport. Black plate with centered neon MyZone logo. On open, icy-blue beam traces the M path (powering up the neon). On scroll, plate fractures along the logo's diagonal seam; halves drift apart revealing hero copy layer beneath.
2. **Hero copy layer** (revealed by fracture). Large CZ display headline (e.g. *Tvoje zóna. Tvůj čas.*), one-line sub, two CTAs: `Rezervovat` (primary, icy-blue glow) + `Prohlédnout prostory` (ghost, scrolls to Vybavení).
3. **Trust strip.** Thin row of icons + micro-copy: *Soukromý · Max 3 + trenér · 24/7 přístup · Kladno*.
4. **Jak to funguje.** Split layout. Left = 4 numbered steps with animated icy connectors:
   - `01 Rezervuj slot` — vyber si čas online
   - `02 Obdrž kód` — unikátní kód ti přijde e-mailem
   - `03 Odemkni dveře` — kód tě pustí do gymu
   - `04 Cvič v klidu` — prostor jen pro tebe a tvou partu
   Right = phone mockup with looping mock-UI (reservation → code screen → door unlock).
5. **Vybavení / Facilities.** Section header + bento-grid of cards, each = category with copy + stock photo:
   - *Silový trénink* — leg press, klec, multi-press, rohový multifunkční stroj (záda, veslování, zakopávání, kladky).
   - *Činky 2–35 kg* — jednoručky ve všech váhách.
   - *Kardio* — běžecký pás.
   - *Volné váhy & doplňky* — osy, zakřivená osa, lavice, gumy, podložky, kotouče.
6. **Komfort.** Full-width darker panel with pictogram row:
   - Šatna + sprchový kout se vším (gumičky, tampóny, vložky, sprchové gely) — *staráme se o váš komfort*.
   - Nespresso zdarma.
   - Aktin bar (shaky, elektrolyty, tyčinky) — platba QR kódem.
   - Reproduktory.
   - Wi-Fi.
7. **Kapacita.** Big stat line: *3 osoby + trenér na jednu rezervaci*.
8. **Kontakt + Mapa.** Split: left = adresa (Petra Bezruče 3388, Kladno), telefon, e-mail, otevírací doba (placeholder until finalized). Right = dark-toned embedded map.
9. **Sleva / Pre-launch CTA.** Icy-blue glow section. Copy: *Chceš získat slevu na první vstup? Všem, kdo se přihlásí před oficiálním otevřením, pošleme slevový kód na 15 %.* Contact form below.
10. **Footer.**

---

## 5. Hero Animation Specification

**Direction:** Option 1 (diagonal fracture along the logo's natural seam).

### Phase A — Entry (0s–2.2s, autoplay)
- Black plate fades in at center with a slight scale-up from 0.92 → 1.0.
- Icy-blue beam travels along the logo's SVG path using `stroke-dashoffset` animation.
- As the beam passes a segment, that segment of the neon tube lights up and begins glowing (`filter: drop-shadow(...)` ramps in).
- After the beam completes, a subtle ambient pulse loop runs on the finished neon.
- Mouse-leave / idle: logo keeps gently pulsing.

### Phase B — Scroll-driven fracture (scroll 0%–100% of hero viewport)
Driven by Motion's `useScroll` + `useTransform`:

| Scroll % | Behavior |
| --- | --- |
| 0–10% | Crack line appears along the diagonal seam, intensity ramps with icy glow |
| 10–25% | Small SVG-particle debris emits along the crack |
| 20–100% | Upper-right half translates up+right with slight rotation; lower-left half translates down+left with opposite rotation; both slightly scale down as they clear |
| 40–100% | Hero copy layer underneath fades up + blur-in, staggered (headline → sub → CTAs) |

### Reduced motion
If `prefers-reduced-motion: reduce`, the entire sequence collapses to: plate + logo render statically for a beat, then fade out, and the hero copy fades in. No fracture, no beam.

### Performance
- Plate and logo are SVG (not raster) — stay crisp, cheap to animate.
- Transforms only (no layout-shifting properties).
- Motion's `useMotionValue` + `useTransform` to keep re-renders minimal.
- `will-change: transform` applied judiciously on the two halves during the scroll range.

---

## 6. Other Pages

### `/o-nas`
Short hero (title `O nás` with icy underline), then one long centered essay block in the owner's voice:
- Goal was to build a modern gym focused on privacy.
- Commercial gyms felt uncomfortable — people don't clean up, no personal space.
- Wanted a safe space where everyone has their own zone — MyZone.
- Pull-quote mid-page: *"Tvoje zóna. Tvoje pravidla."*
- Closing CTA to `/rezervovat`.
- No team bios (per owner).

### `/fotogalerie`
- 3×3 grid, 9 photos. Subtle hover-zoom + icy-blue border on hover.
- Click opens full-screen lightbox: dark backdrop, arrow keys + on-screen prev/next, Esc to close, swipe on mobile, counter (`3 / 9`).
- Built custom (no external lightbox dep).

### `/rezervovat`
- Centered card on dark background.
- Big icy-blue pulse ring around a monospace label `STATUS: V PŘÍPRAVĚ`.
- Copy: *"Rezervační systém pro vás připravujeme. Spustíme brzy. Mezitím se přihlas na 15% slevu na hlavní stránce."*
- Secondary CTA back to landing.

---

## 7. Forms — Pre-launch Discount

**Fields (all required except where noted):**
- `Jméno` (text)
- `E-mail` (email, validated)
- `Telefon` (tel, optional)
- `Odkud o nás víš?` (select: Instagram / Kamarád / Google / Jiné)
- Optional: free-text `Zpráva`

**Behavior:**
- Client-side validation (required + email regex). Inline errors in icy-blue tone.
- Submit shows loading spinner on button.
- On submit, payload goes to `console.log` (no backend yet).
- Success state replaces the form with a card:
  *"Díky! Před oficiálním otevřením ti na e-mail pošleme osobní 15% slevový kód. Sleduj schránku."*
- Lead follow-up handled manually by the owner.

---

## 8. Internationalization

- Locales: `cs` (default) and `en`.
- `LanguageProvider` context in `app/providers.tsx`, persisted to `localStorage`.
- All copy in `lib/i18n/dictionary.ts` as `{ cs: {...}, en: {...} }`.
- `useT()` hook returns the active dictionary.
- Toggle `CZ / EN` in the navbar; no route changes (client-side swap).
- `html[lang]` updated dynamically.

---

## 9. Tech Stack & File Layout

### Stack
- Next.js **16.2.4** (app router) — read `node_modules/next/dist/docs/` before route code (per `AGENTS.md`).
- React **19.2.4**.
- Tailwind **v4** (via `@theme` in `globals.css`).
- `motion` (ex-Framer Motion) for all animations.
- `next/font/google` for Space Grotesk + Inter.

### Directory layout
```
app/
  layout.tsx              // root, fonts, providers, bg
  providers.tsx           // LanguageProvider
  page.tsx                // landing
  o-nas/page.tsx
  fotogalerie/page.tsx
  rezervovat/page.tsx
  globals.css             // Tailwind + theme tokens
components/
  layout/
    Navbar.tsx
    Footer.tsx
    LanguageToggle.tsx
  hero/
    FracturePlate.tsx     // scroll-driven fracture
    NeonLogo.tsx          // SVG w/ beam-trace animation
    HeroCopy.tsx          // headline + CTAs under the plate
  sections/
    TrustStrip.tsx
    JakToFunguje.tsx
    PhoneMock.tsx
    Vybaveni.tsx
    Komfort.tsx
    Kapacita.tsx
    KontaktMap.tsx
    SlevaForm.tsx
  ui/
    Button.tsx
    Card.tsx
    Input.tsx
    Select.tsx
    Toast.tsx
    RevealOnScroll.tsx
  gallery/
    PhotoGrid.tsx
    Lightbox.tsx
lib/
  i18n/
    dictionary.ts
    useT.ts
  motion/
    variants.ts
public/
  brand/
    logo.png              // saved
    plate-reference.png   // saved
    logo.svg              // traced vector
  photos/                 // 9 stock gym photos + facility shots
```

---

## 10. Assets & Images Plan

- **Logo:** vector SVG traced from the supplied PNG; used for hero + navbar + footer.
- **Plate:** drawn procedurally in SVG (two concentric circles + ridges + highlights) so it can animate as two halves via clip-path or two separate SVG groups.
- **Fotogalerie & Vybavení photos:** 9 stock moody gym photos downloaded from Unsplash (attribution stored in `public/photos/CREDITS.md`).
- **Phone mockup:** SVG phone frame + a looping inner `<div>` that cycles 3 fake screens via Motion.
- **Everything else:** `https://placehold.co` in dark theme (`placehold.co/600x400/05070A/6BD8FF`).

---

## 11. Accessibility & Performance

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Skip-to-content link at top.
- Focus rings in icy-blue, visible on all interactive elements.
- `prefers-reduced-motion` honored on every animation.
- `alt` attributes localized.
- Lighthouse target: ≥ 90 on Performance, Accessibility, Best Practices.
- Images use `next/image` where possible (except the animated plate which is inline SVG).
- No client-side bundle bloat — animation variants live in their own modules, imported per section.

---

## 12. Explicit Scope Boundaries

**In scope**
- All 4 pages built end-to-end with polished visuals.
- Full hero fracture animation (entry + scroll) with reduced-motion fallback.
- Client-side i18n toggle.
- Custom lightbox gallery.
- Form with validation and success state.
- Dark-toned map embed for the Kladno address.

**Out of scope (deferred)**
- Real backend / email delivery for the form.
- Real Remotion phone-UI video.
- Real gym photos (stock interim).
- Reservine integration.
- CMS, analytics, SEO (sitemap/robots/metadata beyond basics).
- URL-based i18n routing.

---

## 13. Open Questions (resolvable during build, not blockers)

- Exact otevírací doba — placeholder for now; owner to confirm later.
- Final phone number and e-mail for kontakty — placeholder until owner provides.
- Exact neon-beam duration tuning — will tune on real hardware.
