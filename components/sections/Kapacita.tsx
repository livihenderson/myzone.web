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
            className="neon-text font-[family-name:var(--font-display)] text-6xl font-semibold tracking-tight md:text-8xl"
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
