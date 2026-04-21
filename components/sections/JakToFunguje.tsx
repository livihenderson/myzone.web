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
          <ol className="flex flex-col gap-8">
            {t.how.steps.map((s) => (
              <motion.li
                key={s.n}
                variants={fadeUp}
                className="flex gap-5 md:gap-6"
              >
                <span className="shrink-0 font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tabular-nums text-[var(--color-ice)]/60 md:text-4xl">
                  {s.n}
                </span>
                <div className="flex flex-col gap-1 pt-[2px] md:pt-[3px]">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {s.title}
                  </h3>
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
