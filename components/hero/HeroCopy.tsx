"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { Button } from "@/components/ui/Button";

export function HeroCopy({ progress }: { progress: MotionValue<number> }) {
  const { t } = useT();
  // Copy reveals in the SAME tight window as the neon logo's partial fade
  // (progress 0.10 → 0.12). The moment the logo finishes growing, its
  // opacity drops from 1 → 0.4 while the slogan fades/blurs up over it.
  // The final composition is locked in by ~30vh of scroll from the top, so
  // the user isn't scrolling through a half-built state. Text then holds
  // steady through the rest of the sticky pin (up to 0.6).
  const opacity = useTransform(progress, [0.10, 0.12], [0, 1]);
  const y = useTransform(progress, [0.10, 0.12], [30, 0]);
  const blurValue = useTransform(progress, [0.10, 0.12], [6, 0]);
  const filter = useTransform(blurValue, (b) => `blur(${b}px)`);

  return (
    <motion.div
      className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center"
      style={{ opacity, y, filter }}
    >
      <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]">
        {t.hero.eyebrow}
      </span>
      <h1 className="mt-6 whitespace-pre-line font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-[clamp(3.5rem,8vw,7rem)]">
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
