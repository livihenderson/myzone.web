# MyZone Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed, icy-blue-accented, techy private gym website with a diagonal-fracture hero animation, 4 pages (Landing, O nás, Fotogalerie, Rezervovat), and CZ/EN toggle.

**Architecture:** Next.js 16.2.4 App Router + React 19 + Tailwind v4. Pages are Server Components; interactive sections are `'use client'`. Animations via `motion`. Client-side i18n via React context + `localStorage`. No backend; form logs to console, leads handled manually.

**Tech Stack:** Next 16.2.4, React 19, Tailwind v4 (`@theme` tokens), `motion`, `next/font/google` (Space Grotesk + Inter), SVG for logo/plate, vanilla HTML5 for custom lightbox.

**Note on testing:** This is a visualization UI build with no meaningful unit-test surface (animations, layout, static content). Each task's "Verify" step is a visual/manual browser check at `localhost:3000`, not a unit test. Run `npm run dev` once at the start and leave it running.

---

## File Structure

```
app/
  layout.tsx                    # modify: fonts + providers + bg
  providers.tsx                 # new: LanguageProvider
  page.tsx                      # rewrite: landing composition
  o-nas/page.tsx                # new
  fotogalerie/page.tsx          # new
  rezervovat/page.tsx           # new
  globals.css                   # rewrite: tokens + base styles

components/
  layout/
    Navbar.tsx                  # new: sticky blur navbar
    Footer.tsx                  # new
    LanguageToggle.tsx          # new: CZ/EN switch
  hero/
    FracturePlate.tsx           # new: scroll-driven fracture
    NeonLogo.tsx                # new: SVG logo w/ beam-trace
    HeroCopy.tsx                # new: headline + CTAs
  sections/
    TrustStrip.tsx              # new
    JakToFunguje.tsx            # new
    PhoneMock.tsx               # new: looping phone UI
    Vybaveni.tsx                # new: bento cards
    Komfort.tsx                 # new: pictogram row
    Kapacita.tsx                # new
    KontaktMap.tsx              # new
    SlevaForm.tsx               # new: validated contact form
  ui/
    Button.tsx                  # new: primary + ghost
    Card.tsx                    # new
    Input.tsx                   # new
    Select.tsx                  # new
    RevealOnScroll.tsx          # new: scroll-in wrapper
    SectionHeading.tsx          # new: eyebrow + h2
  gallery/
    PhotoGrid.tsx               # new
    Lightbox.tsx                # new

lib/
  i18n/
    dictionary.ts               # new: cs + en copy
    useT.ts                     # new: hook
  motion/
    variants.ts                 # new: shared variants

public/
  brand/
    logo.png                    # already saved
    plate-reference.png         # already saved
  photos/                       # 9 stock gym photos (downloaded)
```

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install motion**

Run:
```bash
npm install motion
```

- [ ] **Step 2: Start dev server (leave running)**

Run in a new background terminal:
```bash
npm run dev
```

Expected: server at http://localhost:3000.

- [ ] **Step 3: Verify**

Open http://localhost:3000. Default Next.js starter renders without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add motion dependency"
```

---

## Task 2: Tailwind v4 theme tokens + global base styles

**Files:**
- Rewrite: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with the design tokens**

```css
@import "tailwindcss";

@theme {
  --color-bg-black: #05070A;
  --color-bg-panel: #0B1017;
  --color-ice: #6BD8FF;
  --color-ice-deep: #2B9BD1;
  --color-text-primary: #E8F4FB;
  --color-text-dim: #7E8B98;
  --color-border-hairline: rgba(107, 216, 255, 0.12);

  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-inter);

  --shadow-glow-sm: 0 0 18px rgba(107, 216, 255, 0.25);
  --shadow-glow-md: 0 0 32px rgba(107, 216, 255, 0.35);
  --shadow-glow-lg: 0 0 56px rgba(107, 216, 255, 0.45);
}

:root {
  color-scheme: dark;
}

html,
body {
  background: var(--color-bg-black);
  color: var(--color-text-primary);
  font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background: rgba(107, 216, 255, 0.25);
  color: var(--color-text-primary);
}

/* Respect reduced motion globally */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

/* Utility: dotted grid background */
.bg-grid-dots {
  background-image: radial-gradient(
    rgba(107, 216, 255, 0.12) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}

/* Utility: icy gradient hairline */
.hairline {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(107, 216, 255, 0.35),
    transparent
  );
}

/* Utility: neon glow text */
.neon-text {
  text-shadow:
    0 0 6px rgba(107, 216, 255, 0.9),
    0 0 18px rgba(107, 216, 255, 0.55),
    0 0 40px rgba(107, 216, 255, 0.3);
}
```

- [ ] **Step 2: Verify**

Refresh http://localhost:3000. Background should become near-black and the starter text should still render but on dark.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: set up dark theme tokens and base styles"
```

---

## Task 3: Root layout — fonts, metadata, providers slot

**Files:**
- Rewrite: `app/layout.tsx`

- [ ] **Step 1: Rewrite `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyZone — Soukromé fitness, Kladno",
  description:
    "Soukromé fitness v Kladně. Tvoje zóna. Tvůj čas. Rezervuj, obdrž kód, odemkni dveře a cvič v klidu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg-black)] text-[var(--color-text-primary)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--color-ice)] focus:px-3 focus:py-2 focus:text-[var(--color-bg-black)]"
        >
          Přeskočit na obsah
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Stub `app/providers.tsx` so the build doesn't break**

```tsx
"use client";

import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Verify**

Refresh. Page should render, fonts should load (Space Grotesk + Inter visible in devtools Network).

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/providers.tsx
git commit -m "feat: set up root layout with Space Grotesk + Inter fonts"
```

---

## Task 4: i18n dictionary + provider + hook

**Files:**
- New: `lib/i18n/dictionary.ts`
- New: `lib/i18n/useT.ts`
- Modify: `app/providers.tsx`

- [ ] **Step 1: Create `lib/i18n/dictionary.ts`**

```ts
export type Locale = "cs" | "en";

export const dictionary = {
  cs: {
    nav: {
      home: "Úvod",
      about: "O nás",
      gallery: "Fotogalerie",
      reserve: "Rezervovat",
    },
    hero: {
      eyebrow: "SOUKROMÉ FITNESS · KLADNO",
      title: "Tvoje zóna.\nTvůj čas.",
      sub: "Soukromé fitness pro tebe a tvou partu. Žádné fronty, žádné čekání, žádné rušivé pohledy.",
      ctaPrimary: "Rezervovat",
      ctaGhost: "Prohlédnout prostory",
    },
    trust: {
      private: "100% soukromé",
      capacity: "Max 3 osoby + trenér",
      access: "Přístup 24/7",
      location: "Kladno",
    },
    how: {
      eyebrow: "01 / JAK TO FUNGUJE",
      title: "Čtyři kroky k tvému tréninku",
      steps: [
        {
          n: "01",
          title: "Rezervuj slot",
          desc: "Vyber si volný čas přímo online. Rezervace na pár kliknutí.",
        },
        {
          n: "02",
          title: "Obdrž kód",
          desc: "Unikátní kód ti přijde e-mailem těsně před tvým slotem.",
        },
        {
          n: "03",
          title: "Odemkni dveře",
          desc: "Kód tě pustí do gymu. Bez recepce, bez čekání.",
        },
        {
          n: "04",
          title: "Cvič v klidu",
          desc: "Celý prostor patří jen tobě a tvé partě.",
        },
      ],
    },
    facilities: {
      eyebrow: "02 / VYBAVENÍ",
      title: "Vše, co potřebuješ",
      sub: "Kompletní silové, kardio i doplňkové vybavení v moderním prostoru.",
      cards: [
        {
          title: "Silový trénink",
          desc: "Leg press, klec, multi-press, rohový multifunkční stroj (záda, veslování, zakopávání, kladky).",
        },
        {
          title: "Činky 2–35 kg",
          desc: "Kompletní sada jednoručních činek ve všech váhách.",
        },
        {
          title: "Kardio",
          desc: "Běžecký pás a prostor pro tvou rozcvičku.",
        },
        {
          title: "Volné váhy & doplňky",
          desc: "Osy, zakřivená osa, lavice, gumy, podložky, kotouče.",
        },
      ],
    },
    comfort: {
      eyebrow: "03 / KOMFORT",
      title: "Staráme se o tvůj komfort",
      sub: "Nemusíš nic nosit. Vše potřebné máme pro tebe připravené.",
      items: [
        {
          title: "Šatna & sprcha",
          desc: "Sprchový kout se vším vybavením — sprchové gely, gumičky do vlasů, tampony, vložky.",
        },
        {
          title: "Nespresso zdarma",
          desc: "Káva na uvítanou nebo po tréninku. Na náklady podniku.",
        },
        {
          title: "Aktin bar",
          desc: "Proteinové shaky, elektrolyty a tyčinky. Platba QR kódem.",
        },
        {
          title: "Reproduktory & Wi-Fi",
          desc: "Tvůj playlist, tvé tempo. Wi-Fi pro hosty samozřejmostí.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / KAPACITA",
      title: "3 osoby + trenér",
      sub: "Na jednu rezervaci. Celý prostor patří jen vám.",
    },
    contact: {
      eyebrow: "05 / KONTAKT",
      title: "Najdeš nás v Kladně",
      address: "Petra Bezruče 3388, Kladno",
      phone: "+420 000 000 000",
      email: "ahoj@myzone.cz",
      hours: "Po–Ne · 24/7 po rezervaci",
    },
    sleva: {
      eyebrow: "06 / PŘEDOTEVÍRACÍ BONUS",
      title: "Sleva 15 % na první vstup",
      sub: "Přihlaš se před oficiálním otevřením a pošleme ti osobní slevový kód 15 %.",
      name: "Jméno",
      email: "E-mail",
      phone: "Telefon (nepovinné)",
      source: "Odkud o nás víš?",
      sourceOptions: ["Instagram", "Kamarád", "Google", "Jiné"],
      message: "Zpráva (nepovinné)",
      submit: "Chci slevu",
      submitting: "Odesílám…",
      successTitle: "Díky!",
      successBody:
        "Před oficiálním otevřením ti na e-mail pošleme osobní 15% slevový kód. Sleduj schránku.",
      errorRequired: "Toto pole je povinné.",
      errorEmail: "Neplatný e-mail.",
    },
    reserve: {
      status: "STATUS: V PŘÍPRAVĚ",
      title: "Rezervační systém připravujeme",
      body: "Spouštíme brzy. Mezitím se přihlaš na 15% slevu na hlavní stránce.",
      back: "Zpět na hlavní stránku",
    },
    about: {
      eyebrow: "O NÁS",
      title: "Prostor, kde si nemusíš hlídat záda",
      body: [
        "Když jsme začínali cvičit, komerční gymy nám přišly nepříjemné. Stovky lidí, fronty, nikdo po sobě neuklidí, pohledy. Nedalo se soustředit na trénink.",
        "Chtěli jsme moderní prostor, který dá klid a soukromí. Místo, kam přijdeš ty a tvá parta, zavřete za sebou a je to jen vaše.",
        "MyZone je přesně to — tvoje zóna, tvoje pravidla, tvůj čas.",
      ],
      pullquote: "Tvoje zóna. Tvoje pravidla.",
      cta: "Rezervovat slot",
    },
    gallery: {
      eyebrow: "FOTOGALERIE",
      title: "Nahlédni do MyZone",
      sub: "Prohlédni si prostor, než u nás cvičíš poprvé.",
      prev: "Předchozí",
      next: "Další",
      close: "Zavřít",
    },
    footer: {
      tag: "Tvoje zóna. Tvůj čas.",
      rights: "Všechna práva vyhrazena.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      reserve: "Book now",
    },
    hero: {
      eyebrow: "PRIVATE FITNESS · KLADNO",
      title: "Your zone.\nYour time.",
      sub: "Private fitness for you and your crew. No queues, no waiting, no eyes on you.",
      ctaPrimary: "Book now",
      ctaGhost: "See the space",
    },
    trust: {
      private: "100% private",
      capacity: "Max 3 + trainer",
      access: "24/7 access",
      location: "Kladno",
    },
    how: {
      eyebrow: "01 / HOW IT WORKS",
      title: "Four steps to your workout",
      steps: [
        {
          n: "01",
          title: "Book a slot",
          desc: "Pick your time online. A few clicks and you're in.",
        },
        {
          n: "02",
          title: "Get your code",
          desc: "A unique code lands in your inbox right before your slot.",
        },
        {
          n: "03",
          title: "Unlock the door",
          desc: "Your code gets you in. No reception, no waiting.",
        },
        {
          n: "04",
          title: "Train in peace",
          desc: "The whole space is yours and your crew's.",
        },
      ],
    },
    facilities: {
      eyebrow: "02 / EQUIPMENT",
      title: "Everything you need",
      sub: "Full strength, cardio and accessory equipment in a modern space.",
      cards: [
        {
          title: "Strength",
          desc: "Leg press, power rack, multi-press, multi-station (back, rows, leg curls, cable stack).",
        },
        {
          title: "Dumbbells 2–35 kg",
          desc: "Full dumbbell set across the weight range.",
        },
        {
          title: "Cardio",
          desc: "Treadmill and space for your warm-up.",
        },
        {
          title: "Free weights & extras",
          desc: "Bars, EZ bar, benches, bands, mats, plates.",
        },
      ],
    },
    comfort: {
      eyebrow: "03 / COMFORT",
      title: "We take care of the details",
      sub: "You don't need to bring a thing. We've got you covered.",
      items: [
        {
          title: "Changing room & shower",
          desc: "Fully stocked — shower gels, hair ties, tampons, pads.",
        },
        {
          title: "Free Nespresso",
          desc: "Welcome coffee or post-workout kick. On the house.",
        },
        {
          title: "Aktin bar",
          desc: "Protein shakes, electrolytes and bars. QR-code payment.",
        },
        {
          title: "Speakers & Wi-Fi",
          desc: "Your playlist, your pace. Wi-Fi for guests, obviously.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / CAPACITY",
      title: "3 people + trainer",
      sub: "Per booking. The whole space is yours.",
    },
    contact: {
      eyebrow: "05 / CONTACT",
      title: "Find us in Kladno",
      address: "Petra Bezruče 3388, Kladno",
      phone: "+420 000 000 000",
      email: "hello@myzone.cz",
      hours: "Mon–Sun · 24/7 after booking",
    },
    sleva: {
      eyebrow: "06 / PRE-LAUNCH BONUS",
      title: "15% off your first visit",
      sub: "Sign up before we open and we'll send you a personal 15% discount code.",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      source: "How did you hear about us?",
      sourceOptions: ["Instagram", "A friend", "Google", "Other"],
      message: "Message (optional)",
      submit: "Get my discount",
      submitting: "Sending…",
      successTitle: "Thanks!",
      successBody:
        "Before we officially open, we'll email your personal 15% discount code. Watch your inbox.",
      errorRequired: "This field is required.",
      errorEmail: "Invalid email.",
    },
    reserve: {
      status: "STATUS: COMING SOON",
      title: "Booking system in the works",
      body: "Launching soon. In the meantime, grab the 15% discount on the home page.",
      back: "Back to home",
    },
    about: {
      eyebrow: "ABOUT",
      title: "A space where you don't have to watch your back",
      body: [
        "When we started training, commercial gyms felt uncomfortable. Crowds, queues, nobody cleans up, eyes everywhere. You couldn't focus on a set.",
        "We wanted a modern space that gave us calm and privacy. A place you and your crew walk into, lock the door, and it's yours.",
        "MyZone is exactly that — your zone, your rules, your time.",
      ],
      pullquote: "Your zone. Your rules.",
      cta: "Book a slot",
    },
    gallery: {
      eyebrow: "GALLERY",
      title: "Look inside MyZone",
      sub: "See the space before your first session.",
      prev: "Previous",
      next: "Next",
      close: "Close",
    },
    footer: {
      tag: "Your zone. Your time.",
      rights: "All rights reserved.",
    },
  },
} as const;

export type Dictionary = typeof dictionary.cs;
```

- [ ] **Step 2: Create `lib/i18n/useT.ts`**

```ts
"use client";

import { createContext, useContext } from "react";
import { dictionary, type Dictionary, type Locale } from "./dictionary";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback for Server Components / outside provider
    return {
      locale: "cs",
      setLocale: () => {},
      t: dictionary.cs,
    };
  }
  return ctx;
}
```

- [ ] **Step 3: Update `app/providers.tsx`**

```tsx
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Locale } from "@/lib/i18n/dictionary";
import { LanguageContext } from "@/lib/i18n/useT";

const STORAGE_KEY = "myzone.locale";

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("cs");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "cs" || stored === "en") {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionary[locale] }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
```

- [ ] **Step 4: Verify**

Refresh. No errors. `useT()` will be used in subsequent tasks.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n app/providers.tsx
git commit -m "feat(i18n): add CZ/EN dictionary + language provider"
```

---

## Task 5: Shared motion variants

**Files:**
- New: `lib/motion/variants.ts`

- [ ] **Step 1: Create `lib/motion/variants.ts`**

```ts
import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/motion
git commit -m "feat: shared motion variants"
```

---

## Task 6: Primitive UI components (Button, Card, Input, Select, SectionHeading, RevealOnScroll)

**Files:**
- New: `components/ui/Button.tsx`
- New: `components/ui/Card.tsx`
- New: `components/ui/Input.tsx`
- New: `components/ui/Select.tsx`
- New: `components/ui/SectionHeading.tsx`
- New: `components/ui/RevealOnScroll.tsx`

- [ ] **Step 1: `components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-black)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ice)] text-[var(--color-bg-black)] shadow-[0_0_32px_rgba(107,216,255,0.45)] hover:shadow-[0_0_56px_rgba(107,216,255,0.7)] hover:-translate-y-[1px]",
  ghost:
    "border border-[var(--color-border-hairline)] text-[var(--color-text-primary)] hover:border-[var(--color-ice)] hover:text-[var(--color-ice)]",
};

export function Button(
  props: BaseProps & ComponentPropsWithoutRef<"button">,
): React.ReactElement;
export function Button(
  props: BaseProps & { href: string } & Omit<
      ComponentPropsWithoutRef<"a">,
      "href"
    >,
): React.ReactElement;
export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: BaseProps & Record<string, unknown>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as { href: string } & Record<
      string,
      unknown
    >;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: `components/ui/Card.tsx`**

```tsx
import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)]/80 backdrop-blur ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: `components/ui/Input.tsx`**

```tsx
import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className = "", id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </span>
      <input
        ref={ref}
        id={inputId}
        className={`rounded-lg border bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-dim)]/60 focus:border-[var(--color-ice)] focus:shadow-[0_0_0_3px_rgba(107,216,255,0.15)] ${
          error
            ? "border-[var(--color-ice)]"
            : "border-[var(--color-border-hairline)]"
        } ${className}`}
        aria-invalid={!!error}
        {...rest}
      />
      {error ? (
        <span className="text-xs text-[var(--color-ice)]">{error}</span>
      ) : null}
    </label>
  );
});
```

- [ ] **Step 4: `components/ui/Select.tsx`**

```tsx
import { forwardRef, type SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: readonly string[];
  error?: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, options, error, placeholder, className = "", id, ...rest },
  ref,
) {
  const selectId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </span>
      <select
        ref={ref}
        id={selectId}
        className={`rounded-lg border bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-ice)] focus:shadow-[0_0_0_3px_rgba(107,216,255,0.15)] ${
          error
            ? "border-[var(--color-ice)]"
            : "border-[var(--color-border-hairline)]"
        } ${className}`}
        aria-invalid={!!error}
        defaultValue=""
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs text-[var(--color-ice)]">{error}</span>
      ) : null}
    </label>
  );
});
```

- [ ] **Step 5: `components/ui/SectionHeading.tsx`**

```tsx
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-ice-deep)]">
        {eyebrow}
      </span>
      <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {sub ? (
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-text-dim)] md:text-lg">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 6: `components/ui/RevealOnScroll.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/motion/variants";

export function RevealOnScroll({
  children,
  as = "div",
  className = "",
  staggerChildren = false,
  amount = 0.25,
}: {
  children: ReactNode;
  as?: "div" | "section" | "article";
  className?: string;
  staggerChildren?: boolean;
  amount?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerChildren ? stagger : fadeUp}
    >
      {children}
    </Comp>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add components/ui
git commit -m "feat(ui): primitive components (Button, Card, Input, Select, SectionHeading, RevealOnScroll)"
```

---

## Task 7: Language toggle

**Files:**
- New: `components/layout/LanguageToggle.tsx`

- [ ] **Step 1: `components/layout/LanguageToggle.tsx`**

```tsx
"use client";

import { useT } from "@/lib/i18n/useT";
import type { Locale } from "@/lib/i18n/dictionary";

export function LanguageToggle() {
  const { locale, setLocale } = useT();
  const btn = (l: Locale) => (
    <button
      key={l}
      type="button"
      onClick={() => setLocale(l)}
      aria-pressed={locale === l}
      className={`px-2 py-1 text-xs font-semibold tracking-wider transition-colors ${
        locale === l
          ? "text-[var(--color-ice)]"
          : "text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]"
      }`}
    >
      {l.toUpperCase()}
    </button>
  );
  return (
    <div className="flex items-center gap-0 rounded-full border border-[var(--color-border-hairline)] px-1 py-0.5">
      {btn("cs")}
      <span className="h-3 w-px bg-[var(--color-border-hairline)]" />
      {btn("en")}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/LanguageToggle.tsx
git commit -m "feat(i18n): CZ/EN toggle component"
```

---

## Task 8: Navbar

**Files:**
- New: `components/layout/Navbar.tsx`

- [ ] **Step 1: `components/layout/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/o-nas", label: t.nav.about },
    { href: "/fotogalerie", label: t.nav.gallery },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-black)]/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="MyZone">
            <Image
              src="/brand/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="font-[var(--font-display)] text-sm font-semibold tracking-[0.2em] text-[var(--color-text-primary)]">
              MYZONE
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-ice)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageToggle />
            <Button href="/rezervovat" variant="primary">
              {t.nav.reserve}
            </Button>
          </div>

          <button
            className="md:hidden rounded-md border border-[var(--color-border-hairline)] p-2 text-[var(--color-text-primary)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg-black)]/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-[var(--font-display)] text-sm font-semibold tracking-[0.2em]">
                MYZONE
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-md border border-[var(--color-border-hairline)] px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-[var(--font-display)] text-3xl font-semibold tracking-tight"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4 p-6">
              <LanguageToggle />
              <Button
                href="/rezervovat"
                variant="primary"
                onClick={() => setOpen(false)}
              >
                {t.nav.reserve}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat(layout): sticky blur navbar with mobile menu"
```

---

## Task 9: Footer

**Files:**
- New: `components/layout/Footer.tsx`

- [ ] **Step 1: `components/layout/Footer.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/lib/i18n/useT";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 border-t border-[var(--color-border-hairline)] bg-[var(--color-bg-black)]">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div className="flex items-start gap-3">
          <Image
            src="/brand/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <div>
            <div className="font-[var(--font-display)] text-sm font-semibold tracking-[0.2em]">
              MYZONE
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-dim)]">
              {t.footer.tag}
            </p>
          </div>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-mono text-xs tracking-[0.2em] text-[var(--color-ice-deep)]">
            {t.contact.eyebrow}
          </div>
          <div className="space-y-1 text-[var(--color-text-dim)]">
            <div>{t.contact.address}</div>
            <div>{t.contact.phone}</div>
            <div>{t.contact.email}</div>
          </div>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-mono text-xs tracking-[0.2em] text-[var(--color-ice-deep)]">
            NAV
          </div>
          <div className="flex flex-col gap-1 text-[var(--color-text-dim)]">
            <Link href="/" className="hover:text-[var(--color-ice)]">
              {t.nav.home}
            </Link>
            <Link href="/o-nas" className="hover:text-[var(--color-ice)]">
              {t.nav.about}
            </Link>
            <Link href="/fotogalerie" className="hover:text-[var(--color-ice)]">
              {t.nav.gallery}
            </Link>
            <Link href="/rezervovat" className="hover:text-[var(--color-ice)]">
              {t.nav.reserve}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border-hairline)] px-5 py-5 text-center text-xs text-[var(--color-text-dim)] md:px-8">
        © {year} MyZone. {t.footer.rights}
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat(layout): footer"
```

---

## Task 10: Neon logo SVG + beam trace

**Files:**
- New: `components/hero/NeonLogo.tsx`

This replicates the two-triangle M from the logo: left triangle ▲ (apex top-left of seam) and right triangle ▼ (apex bottom-right of seam). The two are separated by a diagonal seam line from bottom-left corner to top-right corner. Each "arm" is a stroke-only path we animate with `stroke-dasharray`/`stroke-dashoffset` to create the "beam tracing" effect.

- [ ] **Step 1: `components/hero/NeonLogo.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

type Props = {
  size?: number;
  animate?: boolean;
  className?: string;
  /** "whole" | "upper" | "lower" — render only one half for the fracture */
  half?: "whole" | "upper" | "lower";
};

/*
 * The M is drawn as two triangles (left triangle + right triangle),
 * separated along a diagonal seam that runs from the bottom-left to the
 * top-right corner of the logo box.
 *
 * Coordinate box: 200 x 240 (w x h). Seam: (0, 240) → (200, 0).
 *
 * Upper half (visible above the seam): right triangle — points (200,240) (200,0) (0,0)
 * Lower half (visible below the seam): left triangle — points (0,0) (0,240) (200,240)
 *
 * Logo strokes (inside the box, forming the M):
 *   left outer:  (10,240) → (10,10)  → (100,120)
 *   right outer: (190,240) → (190,10) → (100,120)
 *   seam line:  (10,240) → (190,10)   (the diagonal divider / light accent)
 */
const STROKE = 10;

const UPPER_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%)";
const LOWER_CLIP = "polygon(0% 0%, 100% 100%, 0% 100%)";

export function NeonLogo({
  size = 220,
  animate = true,
  className = "",
  half = "whole",
}: Props) {
  const clipStyle =
    half === "upper"
      ? { clipPath: UPPER_CLIP, WebkitClipPath: UPPER_CLIP }
      : half === "lower"
        ? { clipPath: LOWER_CLIP, WebkitClipPath: LOWER_CLIP }
        : undefined;

  const tracePath = (d: string, delay: number, length = 800) => (
    <motion.path
      d={d}
      stroke="var(--color-ice)"
      strokeWidth={STROKE}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={animate ? { pathLength: 0, opacity: 0.25 } : false}
      animate={animate ? { pathLength: 1, opacity: 1 } : false}
      transition={{
        pathLength: {
          duration: 1.4,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.3, delay },
      }}
      style={{
        filter:
          "drop-shadow(0 0 6px rgba(107,216,255,0.9)) drop-shadow(0 0 18px rgba(107,216,255,0.55))",
        strokeDasharray: length,
      }}
    />
  );

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 1.2,
        ...clipStyle,
      }}
    >
      <svg
        viewBox="0 0 200 240"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        {/* seam / diagonal accent (thinner, appears first) */}
        {tracePath("M 10 240 L 190 10", 0)}
        {/* left outer (upper ▲ side) */}
        {tracePath("M 10 240 L 10 10 L 100 120", 0.5)}
        {/* right outer (lower ▼ side) */}
        {tracePath("M 190 10 L 190 240 L 100 120", 0.9)}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero/NeonLogo.tsx
git commit -m "feat(hero): neon M logo with stroke-trace animation"
```

---

## Task 11: Fracture plate (SVG + scroll-driven fracture)

**Files:**
- New: `components/hero/FracturePlate.tsx`

- [ ] **Step 1: `components/hero/FracturePlate.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { NeonLogo } from "./NeonLogo";

/**
 * Plate composition (SVG):
 *  - outer ring (metallic dark)
 *  - inner hub
 *  - wrap-around text "BARBELL STANDARD" + "45 LBS" decoration
 *  - MyZone neon logo centered
 *
 * The plate is rendered twice — once as an "upper" half (clipped along the
 * diagonal seam) and once as a "lower" half — so we can translate/rotate
 * each independently during the scroll-driven fracture.
 */

const UPPER_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%)";
const LOWER_CLIP = "polygon(0% 0%, 100% 100%, 0% 100%)";

function PlateHalf({
  half,
}: {
  half: "upper" | "lower";
}) {
  const clipPath = half === "upper" ? UPPER_CLIP : LOWER_CLIP;
  return (
    <div
      className="absolute inset-0"
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      <svg
        viewBox="-120 -120 240 240"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="plateGrad" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#2A3340" />
            <stop offset="60%" stopColor="#141A24" />
            <stop offset="100%" stopColor="#05070A" />
          </radialGradient>
          <radialGradient id="hubGrad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#1A2330" />
            <stop offset="100%" stopColor="#0A0F16" />
          </radialGradient>
          <path
            id="topArc"
            d="M -90 0 A 90 90 0 0 1 90 0"
            fill="none"
          />
          <path
            id="bottomArc"
            d="M -90 0 A 90 90 0 0 0 90 0"
            fill="none"
          />
        </defs>
        {/* outer plate */}
        <circle r="110" fill="url(#plateGrad)" />
        <circle
          r="110"
          fill="none"
          stroke="rgba(107,216,255,0.06)"
          strokeWidth="1"
        />
        {/* concentric ridges */}
        <circle r="95" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <circle r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        {/* decorative arc text */}
        <text
          fontFamily="var(--font-display)"
          fontSize="11"
          letterSpacing="3"
          fill="rgba(232,244,251,0.55)"
          textAnchor="middle"
        >
          <textPath href="#topArc" startOffset="50%">
            BARBELL • STANDARD
          </textPath>
        </text>
        <text
          fontFamily="var(--font-display)"
          fontSize="11"
          letterSpacing="3"
          fill="rgba(232,244,251,0.55)"
          textAnchor="middle"
        >
          <textPath href="#bottomArc" startOffset="50%">
            45 LBS • 45 LBS
          </textPath>
        </text>
        {/* inner hub */}
        <circle r="34" fill="url(#hubGrad)" />
        <circle r="34" fill="none" stroke="rgba(107,216,255,0.1)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function FracturePlate() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Upper half drifts up and right
  const upperX = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const upperY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const upperRot = useTransform(scrollYProgress, [0, 1], [0, 14]);
  // Lower half drifts down and left
  const lowerX = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const lowerY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const lowerRot = useTransform(scrollYProgress, [0, 1], [0, -14]);

  const halvesOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.8, 0]);
  const crackOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.5, 1],
    [0, 1, 1, 0],
  );

  // Logo inside the plate — also splits with the two halves
  return (
    <div
      ref={ref}
      className="pointer-events-none relative mx-auto aspect-square w-[min(78vw,560px)]"
      aria-hidden="true"
    >
      {/* Upper half of plate + upper half of logo */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          x: upperX,
          y: upperY,
          rotate: upperRot,
          opacity: halvesOpacity,
        }}
      >
        <PlateHalf half="upper" />
        <div className="absolute inset-0 flex items-center justify-center">
          <NeonLogo size={220} half="upper" />
        </div>
      </motion.div>

      {/* Lower half */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          x: lowerX,
          y: lowerY,
          rotate: lowerRot,
          opacity: halvesOpacity,
        }}
      >
        <PlateHalf half="lower" />
        <div className="absolute inset-0 flex items-center justify-center">
          <NeonLogo size={220} half="lower" />
        </div>
      </motion.div>

      {/* Crack line along diagonal seam */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: crackOpacity }}
      >
        <line
          x1="5"
          y1="95"
          x2="95"
          y2="5"
          stroke="var(--color-ice)"
          strokeWidth="0.6"
          strokeLinecap="round"
          style={{
            filter:
              "drop-shadow(0 0 4px rgba(107,216,255,0.9)) drop-shadow(0 0 14px rgba(107,216,255,0.6))",
          }}
        />
      </motion.svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero/FracturePlate.tsx
git commit -m "feat(hero): fracture plate with diagonal split on scroll"
```

---

## Task 12: Hero copy layer + hero section wrapper

**Files:**
- New: `components/hero/HeroCopy.tsx`
- New: `components/hero/Hero.tsx`

- [ ] **Step 1: `components/hero/HeroCopy.tsx`**

```tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useT } from "@/lib/i18n/useT";
import { Button } from "@/components/ui/Button";

export function HeroCopy() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.85], [40, 0]);
  const blur = useTransform(scrollYProgress, [0.4, 0.85], [8, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center"
      style={{
        opacity,
        y,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
      }}
    >
      <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]">
        {t.hero.eyebrow}
      </span>
      <h1 className="mt-6 whitespace-pre-line font-[var(--font-display)] text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-[clamp(3.5rem,8vw,7rem)]">
        {t.hero.title}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-dim)] md:text-lg">
        {t.hero.sub}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button href="/rezervovat" variant="primary">
          {t.hero.ctaPrimary}
        </Button>
        <Button href="#vybaveni" variant="ghost">
          {t.hero.ctaGhost}
        </Button>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: `components/hero/Hero.tsx`**

```tsx
"use client";

import { FracturePlate } from "./FracturePlate";
import { HeroCopy } from "./HeroCopy";

export function Hero() {
  return (
    <section className="relative">
      {/* The hero is 2 viewports tall so the scroll-driven fracture has room. */}
      <div className="relative h-[200vh]">
        {/* Sticky viewport: the plate + copy live here as we scroll through */}
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-grid-dots">
          {/* Backdrop glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(43,155,209,0.18), transparent 70%)",
            }}
          />
          {/* Plate */}
          <FracturePlate />
          {/* Copy sits behind, revealed as halves drift */}
          <div className="absolute inset-0 flex items-center justify-center">
            <HeroCopy />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify (interim)**

We'll verify after Task 13 wires the hero into the landing page.

- [ ] **Step 4: Commit**

```bash
git add components/hero/HeroCopy.tsx components/hero/Hero.tsx
git commit -m "feat(hero): copy reveal + hero section composition"
```

---

## Task 13: TrustStrip

**Files:**
- New: `components/sections/TrustStrip.tsx`

- [ ] **Step 1: `components/sections/TrustStrip.tsx`**

```tsx
"use client";

import { useT } from "@/lib/i18n/useT";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-hairline)] text-[var(--color-ice)]">
    {children}
  </span>
);

export function TrustStrip() {
  const { t } = useT();
  const items = [
    { icon: "◐", label: t.trust.private },
    { icon: "⌘", label: t.trust.capacity },
    { icon: "◷", label: t.trust.access },
    { icon: "⌖", label: t.trust.location },
  ];
  return (
    <RevealOnScroll>
      <div className="border-y border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)]/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 md:px-8">
          {items.map((i) => (
            <div key={i.label} className="flex items-center gap-3">
              <Icon>{i.icon}</Icon>
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {i.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/TrustStrip.tsx
git commit -m "feat(sections): trust strip"
```

---

## Task 14: PhoneMock — looping 3-screen mockup

**Files:**
- New: `components/sections/PhoneMock.tsx`

- [ ] **Step 1: `components/sections/PhoneMock.tsx`**

```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/useT";

type Screen = "book" | "code" | "unlock";

function ScreenBook({ t }: { t: ReturnType<typeof useT>["t"] }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-left">
      <div className="text-[10px] font-mono tracking-widest text-[var(--color-ice-deep)]">
        BOOK
      </div>
      <div className="text-sm font-semibold">{t.how.steps[0].title}</div>
      <div className="grid grid-cols-3 gap-2">
        {["08", "10", "12", "14", "16", "18"].map((h, i) => (
          <motion.div
            key={h}
            className={`rounded-md border px-2 py-2 text-center text-xs ${
              i === 3
                ? "border-[var(--color-ice)] bg-[rgba(107,216,255,0.1)] text-[var(--color-ice)]"
                : "border-[var(--color-border-hairline)] text-[var(--color-text-dim)]"
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {h}:00
          </motion.div>
        ))}
      </div>
      <div className="mt-auto rounded-md bg-[var(--color-ice)] py-2 text-center text-xs font-semibold text-[var(--color-bg-black)]">
        {t.hero.ctaPrimary}
      </div>
    </div>
  );
}

function ScreenCode({ t }: { t: ReturnType<typeof useT>["t"] }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
      <div className="text-[10px] font-mono tracking-widest text-[var(--color-ice-deep)]">
        {t.how.steps[1].title.toUpperCase()}
      </div>
      <div className="flex gap-2">
        {["7", "2", "4", "9"].map((n, i) => (
          <motion.div
            key={i}
            className="flex h-12 w-9 items-center justify-center rounded-md border border-[var(--color-ice)] bg-[rgba(107,216,255,0.08)] font-[var(--font-display)] text-xl font-semibold text-[var(--color-ice)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
            style={{
              textShadow: "0 0 12px rgba(107,216,255,0.8)",
            }}
          >
            {n}
          </motion.div>
        ))}
      </div>
      <div className="text-center text-[10px] text-[var(--color-text-dim)]">
        {t.how.steps[1].desc}
      </div>
    </div>
  );
}

function ScreenUnlock({ t }: { t: ReturnType<typeof useT>["t"] }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div className="text-[10px] font-mono tracking-widest text-[var(--color-ice-deep)]">
        {t.how.steps[2].title.toUpperCase()}
      </div>
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-ice)]"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(107,216,255,0.55)",
            "0 0 0 14px rgba(107,216,255,0)",
          ],
        }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <span
          className="text-3xl text-[var(--color-ice)]"
          style={{ textShadow: "0 0 12px rgba(107,216,255,0.8)" }}
        >
          ✓
        </span>
      </motion.div>
      <div className="text-center text-xs">{t.how.steps[2].title}</div>
    </div>
  );
}

export function PhoneMock() {
  const { t } = useT();
  const [screen, setScreen] = useState<Screen>("book");

  useEffect(() => {
    const order: Screen[] = ["book", "code", "unlock"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setScreen(order[i]);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[240px]">
      {/* phone frame */}
      <div className="relative h-[480px] w-[240px] rounded-[40px] border border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)] p-2 shadow-[0_0_56px_rgba(107,216,255,0.2)]">
        <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 h-4 w-20 rounded-full bg-[var(--color-bg-black)]" />
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[var(--color-bg-black)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              className="h-full w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {screen === "book" ? <ScreenBook t={t} /> : null}
              {screen === "code" ? <ScreenCode t={t} /> : null}
              {screen === "unlock" ? <ScreenUnlock t={t} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* icy glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_50%_50%,rgba(107,216,255,0.18),transparent_70%)] blur-2xl" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/PhoneMock.tsx
git commit -m "feat(sections): phone mockup with 3-screen loop"
```

---

## Task 15: JakToFunguje section

**Files:**
- New: `components/sections/JakToFunguje.tsx`

- [ ] **Step 1: `components/sections/JakToFunguje.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PhoneMock } from "./PhoneMock";
import { fadeUp } from "@/lib/motion/variants";

export function JakToFunguje() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 md:grid-cols-2 md:px-8 md:gap-10">
        <RevealOnScroll staggerChildren className="flex flex-col gap-10">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.how.eyebrow}
              title={t.how.title}
            />
          </motion.div>
          <ol className="relative flex flex-col gap-8 pl-6">
            <span className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-ice)]/0 via-[var(--color-ice)]/30 to-[var(--color-ice)]/0" />
            {t.how.steps.map((s) => (
              <motion.li
                key={s.n}
                variants={fadeUp}
                className="relative flex gap-5"
              >
                <span className="absolute -left-6 top-1 h-[22px] w-[22px] rounded-full border border-[var(--color-ice)] bg-[var(--color-bg-black)] shadow-[0_0_14px_rgba(107,216,255,0.5)]" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]">
                      {s.n}
                    </span>
                    <h3 className="font-[var(--font-display)] text-xl font-semibold">
                      {s.title}
                    </h3>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-dim)]">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </RevealOnScroll>
        <RevealOnScroll className="flex items-center justify-center">
          <PhoneMock />
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/JakToFunguje.tsx
git commit -m "feat(sections): Jak to funguje with phone mock"
```

---

## Task 16: Download 9 stock gym photos

**Files:**
- New: `public/photos/01.jpg` through `09.jpg`
- New: `public/photos/CREDITS.md`

Use Unsplash source URLs that reliably return dark/moody gym shots. Fetch each and save with a numbered filename.

- [ ] **Step 1: Download photos**

Run (adjust IDs if any URL fails):

```bash
mkdir -p public/photos
curl -L -o public/photos/01.jpg "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/02.jpg "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/03.jpg "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/04.jpg "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/05.jpg "https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/06.jpg "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/07.jpg "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/08.jpg "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/photos/09.jpg "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1600&q=80"
```

If any URL 404s, replace with any Unsplash photo ID from a "dark gym interior" search and retry.

- [ ] **Step 2: Write credits**

Write `public/photos/CREDITS.md`:

```md
# Photo credits

All images are placeholders sourced from Unsplash.com and are subject to the
Unsplash license. Replace with real MyZone photos before launch.
```

- [ ] **Step 3: Verify**

Open `http://localhost:3000/photos/01.jpg` — image loads in a new tab.

- [ ] **Step 4: Configure `next.config.ts` for remote fallback (only if curl fails and we have to fall back to placehold.co)**

Skip this step if all 9 photos downloaded successfully.

- [ ] **Step 5: Commit**

```bash
git add public/photos
git commit -m "chore: add stock gym photos (placeholder until real shoot)"
```

---

## Task 17: Vybaveni (bento cards) + Komfort + Kapacita

**Files:**
- New: `components/sections/Vybaveni.tsx`
- New: `components/sections/Komfort.tsx`
- New: `components/sections/Kapacita.tsx`

- [ ] **Step 1: `components/sections/Vybaveni.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

const photoSlots = ["/photos/01.jpg", "/photos/02.jpg", "/photos/03.jpg", "/photos/04.jpg"];

export function Vybaveni() {
  const { t } = useT();
  return (
    <section id="vybaveni" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-14">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.facilities.eyebrow}
              title={t.facilities.title}
              sub={t.facilities.sub}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 gap-5 md:grid-cols-6"
          >
            {t.facilities.cards.map((c, i) => {
              const layout =
                i === 0
                  ? "md:col-span-4 md:row-span-2 aspect-[5/3]"
                  : i === 1
                    ? "md:col-span-2 aspect-[4/3]"
                    : i === 2
                      ? "md:col-span-3 aspect-[4/3]"
                      : "md:col-span-3 aspect-[4/3]";
              return (
                <div
                  key={c.title}
                  className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border-hairline)] ${layout}`}
                >
                  <Image
                    src={photoSlots[i]}
                    alt=""
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-black)] via-[var(--color-bg-black)]/30 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end gap-2 p-6 md:p-8">
                    <h3 className="font-[var(--font-display)] text-2xl font-semibold md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-dim)]">
                      {c.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `components/sections/Komfort.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

const pictos = ["♻", "☕", "◈", "♪"];

export function Komfort() {
  const { t } = useT();
  return (
    <section className="relative bg-[var(--color-bg-panel)]/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-14">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.comfort.eyebrow}
              title={t.comfort.title}
              sub={t.comfort.sub}
            />
          </motion.div>
          <motion.ul
            variants={fadeUp}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {t.comfort.items.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border-hairline)] bg-[var(--color-bg-black)] p-6 transition-colors hover:border-[var(--color-ice)]/40"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border-hairline)] text-2xl text-[var(--color-ice)]"
                  style={{ textShadow: "0 0 10px rgba(107,216,255,0.6)" }}
                >
                  {pictos[i]}
                </span>
                <h3 className="font-[var(--font-display)] text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                  {item.desc}
                </p>
              </li>
            ))}
          </motion.ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `components/sections/Kapacita.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

export function Kapacita() {
  const { t } = useT();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-5">
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]"
          >
            {t.capacity.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-[var(--font-display)] text-6xl font-semibold tracking-tight md:text-8xl neon-text"
          >
            {t.capacity.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-xl text-base text-[var(--color-text-dim)] md:text-lg"
          >
            {t.capacity.sub}
          </motion.p>
        </RevealOnScroll>
      </div>
      <div className="hairline mx-auto mt-20 max-w-5xl" />
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Vybaveni.tsx components/sections/Komfort.tsx components/sections/Kapacita.tsx
git commit -m "feat(sections): facilities bento, comfort grid, capacity hero"
```

---

## Task 18: KontaktMap + SlevaForm

**Files:**
- New: `components/sections/KontaktMap.tsx`
- New: `components/sections/SlevaForm.tsx`

- [ ] **Step 1: `components/sections/KontaktMap.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

// Open-Street-Map embed centered roughly on Kladno Petra Bezruče.
// CSS filter tones the map to match the dark theme.
const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=14.10%2C50.13%2C14.14%2C50.16&layer=mapnik&marker=50.1436%2C14.1153";

export function KontaktMap() {
  const { t } = useT();
  return (
    <section id="kontakt" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:grid-cols-2 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-8">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
            />
          </motion.div>
          <motion.dl
            variants={fadeUp}
            className="grid grid-cols-1 gap-6 text-sm"
          >
            {[
              { k: "Adresa", v: t.contact.address },
              { k: "Telefon", v: t.contact.phone },
              { k: "E-mail", v: t.contact.email },
              { k: "Otevřeno", v: t.contact.hours },
            ].map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-1 border-l border-[var(--color-ice)]/40 pl-4"
              >
                <dt className="font-mono text-xs tracking-widest text-[var(--color-ice-deep)]">
                  {row.k.toUpperCase()}
                </dt>
                <dd className="text-[var(--color-text-primary)]">{row.v}</dd>
              </div>
            ))}
          </motion.dl>
        </RevealOnScroll>
        <RevealOnScroll className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border-hairline)]">
          <iframe
            src={MAP_SRC}
            title="MyZone map"
            className="h-full w-full"
            style={{
              filter: "invert(0.92) hue-rotate(180deg) saturate(0.9) brightness(0.9)",
            }}
            loading="lazy"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `components/sections/SlevaForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Errors = Partial<Record<"name" | "email" | "source", string>>;

export function SlevaForm() {
  const { t } = useT();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const name = (form.get("name") as string | null)?.trim() ?? "";
    const email = (form.get("email") as string | null)?.trim() ?? "";
    const phone = (form.get("phone") as string | null)?.trim() ?? "";
    const source = (form.get("source") as string | null)?.trim() ?? "";
    const message = (form.get("message") as string | null)?.trim() ?? "";

    const next: Errors = {};
    if (!name) next.name = t.sleva.errorRequired;
    if (!email) next.email = t.sleva.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t.sleva.errorEmail;
    if (!source) next.source = t.sleva.errorRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("[MyZone lead]", { name, email, phone, source, message });
    setSubmitting(false);
    setSent(true);
  };

  return (
    <section id="sleva" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Card className="relative overflow-hidden p-8 md:p-14">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(107,216,255,0.18), transparent 70%)",
            }}
          />
          <RevealOnScroll className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={t.sleva.eyebrow}
              title={t.sleva.title}
              sub={t.sleva.sub}
            />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-[var(--color-ice)]/40 bg-[rgba(107,216,255,0.06)] p-8 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-ice)] text-[var(--color-ice)]">
                    ✓
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl font-semibold">
                    {t.sleva.successTitle}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-text-dim)]">
                    {t.sleva.successBody}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <Input
                    name="name"
                    label={t.sleva.name}
                    required
                    error={errors.name}
                  />
                  <Input
                    name="email"
                    type="email"
                    label={t.sleva.email}
                    required
                    error={errors.email}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label={t.sleva.phone}
                  />
                  <Select
                    name="source"
                    label={t.sleva.source}
                    options={t.sleva.sourceOptions}
                    placeholder="—"
                    required
                    error={errors.source}
                  />
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-dim)]">
                      {t.sleva.message}
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-dim)]/60 focus:border-[var(--color-ice)]"
                    />
                  </label>
                  <div className="md:col-span-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? t.sleva.submitting : t.sleva.submit}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </RevealOnScroll>
        </Card>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/KontaktMap.tsx components/sections/SlevaForm.tsx
git commit -m "feat(sections): contact with map and pre-launch discount form"
```

---

## Task 19: Landing page composition

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JakToFunguje } from "@/components/sections/JakToFunguje";
import { Vybaveni } from "@/components/sections/Vybaveni";
import { Komfort } from "@/components/sections/Komfort";
import { Kapacita } from "@/components/sections/Kapacita";
import { KontaktMap } from "@/components/sections/KontaktMap";
import { SlevaForm } from "@/components/sections/SlevaForm";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <JakToFunguje />
        <Vybaveni />
        <Komfort />
        <Kapacita />
        <KontaktMap />
        <SlevaForm />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000.

Expected:
- Hero: plate with neon M logo visible. Beam traces M on load.
- Scroll: plate fractures diagonally; two halves drift opposite directions; hero copy fades up.
- All sections render in order with icy-blue accents and dark background.
- Navbar transitions to blurred bar on scroll.
- No console errors.

- [ ] **Step 3: Fix any runtime errors found**

If you see `Error: React Context not available` on SSR, double-check that the component using `useT` has `"use client"`. If logo PNG does not appear, verify `public/brand/logo.png` exists.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(landing): compose all sections"
```

---

## Task 20: O nás page

**Files:**
- New: `app/o-nas/page.tsx`

- [ ] **Step 1: `app/o-nas/page.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";
import { useT } from "@/lib/i18n/useT";

export default function ONasPage() {
  const { t } = useT();
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <section className="relative pt-40 pb-16 md:pt-48 md:pb-24">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <RevealOnScroll staggerChildren className="flex flex-col gap-8">
              <motion.span
                variants={fadeUp}
                className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]"
              >
                {t.about.eyebrow}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-[var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
              >
                {t.about.title}
              </motion.h1>
              <motion.div
                variants={fadeUp}
                className="h-px w-24 bg-[var(--color-ice)]"
              />
            </RevealOnScroll>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <RevealOnScroll staggerChildren className="flex flex-col gap-8">
              {t.about.body.map((p, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-lg leading-relaxed text-[var(--color-text-primary)] md:text-xl"
                >
                  {p}
                </motion.p>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
            <blockquote className="font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-tight md:text-6xl neon-text">
              “{t.about.pullquote}”
            </blockquote>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center md:px-8">
            <Button href="/rezervovat">{t.about.cta}</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to http://localhost:3000/o-nas. Essay renders, pull-quote glows, CTA to Rezervovat works.

- [ ] **Step 3: Commit**

```bash
git add app/o-nas
git commit -m "feat(page): O nás"
```

---

## Task 21: Fotogalerie — PhotoGrid + Lightbox

**Files:**
- New: `components/gallery/PhotoGrid.tsx`
- New: `components/gallery/Lightbox.tsx`
- New: `app/fotogalerie/page.tsx`

- [ ] **Step 1: `components/gallery/Lightbox.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";

type Props = {
  photos: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  const { t } = useT();
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && index !== null ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-black)]/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute right-5 top-5 rounded-full border border-[var(--color-border-hairline)] px-4 py-2 text-xs tracking-widest text-[var(--color-text-primary)] hover:text-[var(--color-ice)]"
            onClick={onClose}
            aria-label={t.gallery.close}
          >
            ✕ {t.gallery.close}
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-hairline)] p-4 text-[var(--color-text-primary)] hover:text-[var(--color-ice)]"
            onClick={onPrev}
            aria-label={t.gallery.prev}
          >
            ‹
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-hairline)] p-4 text-[var(--color-text-primary)] hover:text-[var(--color-ice)]"
            onClick={onNext}
            aria-label={t.gallery.next}
          >
            ›
          </button>
          <motion.div
            key={index}
            className="relative h-[80vh] w-[92vw] max-w-6xl overflow-hidden rounded-2xl border border-[var(--color-border-hairline)]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <Image
              src={photos[index]}
              alt=""
              fill
              className="object-cover"
              sizes="92vw"
              priority
            />
          </motion.div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-[var(--color-text-dim)]">
            {index + 1} / {photos.length}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: `components/gallery/PhotoGrid.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Lightbox } from "./Lightbox";
import { stagger, scaleIn } from "@/lib/motion/variants";

const ALL_PHOTOS = Array.from(
  { length: 9 },
  (_, i) => `/photos/${String(i + 1).padStart(2, "0")}.jpg`,
);

export function PhotoGrid() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <motion.ul
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
      >
        {ALL_PHOTOS.map((src, i) => (
          <motion.li
            key={src}
            variants={scaleIn}
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl border border-[var(--color-border-hairline)] transition-colors hover:border-[var(--color-ice)]/50"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="absolute inset-0"
              aria-label={`Photo ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <span className="absolute inset-0 bg-[var(--color-bg-black)]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <Lightbox
        photos={ALL_PHOTOS}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={() =>
          setIndex((i) =>
            i === null ? i : (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length,
          )
        }
        onNext={() =>
          setIndex((i) => (i === null ? i : (i + 1) % ALL_PHOTOS.length))
        }
      />
    </>
  );
}
```

- [ ] **Step 3: `app/fotogalerie/page.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";
import { useT } from "@/lib/i18n/useT";

export default function FotogaleriePage() {
  const { t } = useT();
  return (
    <>
      <Navbar />
      <main id="main" className="pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
          <RevealOnScroll staggerChildren className="flex flex-col gap-6">
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t.gallery.eyebrow}
                title={t.gallery.title}
                sub={t.gallery.sub}
              />
            </motion.div>
          </RevealOnScroll>
          <PhotoGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Open http://localhost:3000/fotogalerie. Grid of 9 photos; click any → lightbox opens. Arrow keys navigate. Esc closes. Counter shows.

- [ ] **Step 5: Commit**

```bash
git add components/gallery app/fotogalerie
git commit -m "feat(page): fotogalerie with custom lightbox"
```

---

## Task 22: Rezervovat placeholder page

**Files:**
- New: `app/rezervovat/page.tsx`

- [ ] **Step 1: `app/rezervovat/page.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n/useT";

export default function RezervovatPage() {
  const { t } = useT();
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-32 pb-24"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(107,216,255,0.15), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 px-5 text-center md:px-8">
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--color-ice)]"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(107,216,255,0.55)",
                "0 0 0 22px rgba(107,216,255,0)",
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-ice)]"
              style={{ textShadow: "0 0 8px rgba(107,216,255,0.8)" }}
            >
              WAIT
            </span>
          </motion.div>
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--color-ice-deep)]">
            {t.reserve.status}
          </span>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {t.reserve.title}
          </h1>
          <p className="max-w-md text-base text-[var(--color-text-dim)] md:text-lg">
            {t.reserve.body}
          </p>
          <Button href="/#sleva" variant="ghost">
            {t.reserve.back}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to http://localhost:3000/rezervovat. Pulse ring, status label, copy, CTA back to landing's `#sleva` section.

- [ ] **Step 3: Commit**

```bash
git add app/rezervovat
git commit -m "feat(page): rezervovat placeholder"
```

---

## Task 23: Polish pass — cross-page verification & fixes

- [ ] **Step 1: Walk every page and interaction**

Open http://localhost:3000 and go through:

- **Landing:**
  - Hero: beam traces M on load; scroll → plate fractures diagonally, halves drift, copy reveals.
  - All sections render with correct spacing.
  - Navbar blurs on scroll; `Rezervovat` button glows on hover.
  - Footer renders with address.
  - Scroll to form, fill in (with and without required fields), submit → success state.
  - Open devtools → `prefers-reduced-motion: reduce` → fracture doesn't animate, copy still visible.
- **/o-nas:** hero, essay, pull-quote (neon glow), CTA.
- **/fotogalerie:** 9 photos load, click opens lightbox, arrow/esc/counter work.
- **/rezervovat:** pulse ring animates, back CTA jumps to #sleva.
- **Navbar:** CZ/EN toggle flips all copy instantly; selection persists after refresh.
- **Mobile (resize devtools to 390px width):** hamburger menu opens full-screen overlay; all sections responsive.

- [ ] **Step 2: Fix any issues found**

Common likely fixes:
- Tune hero fracture scroll offsets if copy reveals too early/late.
- Adjust clip-path seam angle if the halves don't visually split along the logo diagonal.
- Adjust neon glow intensity if any element is too bright or washed out.

- [ ] **Step 3: Run lint and type check**

```bash
npm run lint
npx tsc --noEmit
```

Fix any errors. Expected: clean.

- [ ] **Step 4: Build**

```bash
npm run build
```

Expected: successful production build.

- [ ] **Step 5: Commit any polish fixes**

```bash
git add -A
git commit -m "polish: tune animations, fix layout edge cases"
```

---

## Self-Review (writer)

- **Spec coverage:**
  - Brand/visual system (Section 2 of spec) → Tasks 2, 3, 6.
  - IA + Navbar/Footer (Section 3) → Tasks 7, 8, 9.
  - Landing composition (Section 4) → Tasks 10–19.
  - Hero animation (Section 5) → Tasks 10, 11, 12.
  - O nás (Section 6) → Task 20.
  - Fotogalerie (Section 6) → Task 21.
  - Rezervovat (Section 6) → Task 22.
  - Form behavior (Section 7) → Task 18.
  - i18n (Section 8) → Task 4.
  - Tech stack / file layout (Section 9) → Tasks 1–22 align.
  - Assets (Section 10) → Task 16 + pre-saved brand assets.
  - A11y / performance (Section 11) → skip-link in Task 3, `prefers-reduced-motion` in globals (Task 2), focus rings in Task 6, verification in Task 23.

- **Placeholder scan:** All code blocks are complete. No "TODO", no "similar to Task N" shortcuts.
- **Type consistency:** `Locale`, `Dictionary`, `useT()` used consistently. All components that call `useT()` have `"use client"`. `Button`'s overload signature accepts `href` for Link; Navbar/Footer/HeroCopy/etc. all use it consistently.
- **Scope:** single visualization build; no decomposition needed.

---

## Execution

This plan will be executed inline via the `executing-plans` skill — each task's steps in order, commits after each task, verifying in the browser as we go.
