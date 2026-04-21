"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

export function FAQ() {
  const { t } = useT();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-12">
          <motion.div variants={fadeUp}>
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          </motion.div>
          <motion.ul
            variants={fadeUp}
            className="flex flex-col border-y border-[var(--color-border-hairline)]"
          >
            {t.faq.items.map((item, i) => {
              const open = openIdx === i;
              return (
                <li
                  key={item.q}
                  className="border-t border-[var(--color-border-hairline)] first:border-t-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-[var(--color-ice)]"
                  >
                    <span className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug md:text-xl">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="relative h-5 w-5 shrink-0 text-[var(--color-ice)]"
                    >
                      <motion.span
                        className="absolute left-1/2 top-1/2 block h-px w-full -translate-x-1/2 -translate-y-1/2 bg-current"
                      />
                      <motion.span
                        className="absolute left-1/2 top-1/2 block h-full w-px -translate-x-1/2 -translate-y-1/2 bg-current"
                        initial={false}
                        animate={{ scaleY: open ? 0 : 1 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 pr-10 text-sm leading-relaxed text-[var(--color-text-dim)] md:text-base">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
