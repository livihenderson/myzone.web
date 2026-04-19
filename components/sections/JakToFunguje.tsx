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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 md:grid-cols-2 md:gap-10 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-10">
          <motion.div variants={fadeUp}>
            <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} />
          </motion.div>
          <ol className="relative flex flex-col gap-8 pl-6">
            <span className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-[var(--color-ice)]/0 via-[var(--color-ice)]/30 to-[var(--color-ice)]/0" />
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
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
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
