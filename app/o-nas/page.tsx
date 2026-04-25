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
        <section className="relative pb-16 pt-40 md:pb-24 md:pt-48">
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
                className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
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
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center md:px-8">
            <Button href="/rezervovat">{t.about.cta}</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
