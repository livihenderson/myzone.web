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
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
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
