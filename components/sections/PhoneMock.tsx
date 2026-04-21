"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/useT";
import type { Dictionary } from "@/lib/i18n/dictionary";

type Screen = "book" | "code" | "unlock";

function ScreenBook({ t }: { t: Dictionary }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-left">
      <div className="text-sm font-semibold">{t.how.steps[0].title}</div>
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            ["08:00", "09:15"],
            ["10:00", "11:15"],
            ["12:00", "13:15"],
            ["14:00", "15:15"],
            ["16:00", "17:15"],
            ["18:00", "19:15"],
          ] as const
        ).map(([start, end], i) => (
          <motion.div
            key={start}
            className={`flex flex-col items-center rounded-md border px-1.5 py-1.5 text-center leading-tight ${
              i === 3
                ? "border-[var(--color-ice)] bg-[rgba(107,216,255,0.1)] text-[var(--color-ice)]"
                : "border-[var(--color-border-hairline)] text-[var(--color-text-dim)]"
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-[11px] font-medium">{start}</span>
            <span className="text-[9px] opacity-70">{end}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-auto rounded-md bg-[var(--color-ice)] py-2 text-center text-xs font-semibold text-[var(--color-bg-black)]">
        {t.hero.ctaPrimary}
      </div>
    </div>
  );
}

function ScreenCode({ t }: { t: Dictionary }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-2 rounded-full border border-[var(--color-ice)]/30 bg-[rgba(107,216,255,0.08)] px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ice)] shadow-[0_0_6px_rgba(107,216,255,0.9)]" />
        <span className="text-[9px] font-mono tracking-widest text-[var(--color-ice)]">
          SMS · MYZONE
        </span>
      </div>
      <div className="flex gap-2">
        {["7", "2", "4", "9"].map((n, i) => (
          <motion.div
            key={i}
            className="flex h-12 w-9 items-center justify-center rounded-md border border-[var(--color-ice)] bg-[rgba(107,216,255,0.08)] font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ice)]"
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

function ScreenUnlock({ t }: { t: Dictionary }) {
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
      <div className="relative h-[480px] w-[240px] rounded-[40px] border border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)] p-2 shadow-[0_0_56px_rgba(107,216,255,0.2)]">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[var(--color-bg-black)]" />
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
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_50%_50%,rgba(107,216,255,0.18),transparent_70%)] blur-2xl" />
    </div>
  );
}
