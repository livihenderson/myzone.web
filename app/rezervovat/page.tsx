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
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pb-24 pt-32"
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
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
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
