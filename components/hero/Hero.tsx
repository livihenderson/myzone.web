"use client";

import { useEffect } from "react";
import { animate, useMotionValue } from "motion/react";
import { FracturePlate } from "./FracturePlate";
import { HeroCopy } from "./HeroCopy";
import { NeonLogo } from "./NeonLogo";
import { ScrollLightning } from "./ScrollLightning";

// Animation covers progress 0 → END. Everything past END in the child
// components was the old "hold steady during sticky pin / scroll away"
// region, which no longer exists.
const END = 0.12;
const DURATION_S = 2.8;

/**
 * Time-driven hero intro. The client flagged that a scroll-locked
 * animation made some visitors unsure whether they should scroll, so the
 * sequence now plays automatically on mount while the section behaves as
 * a normal 100dvh block — the user scrolls past it naturally.
 *
 * Timeline (progress 0 → 0.12 over ~2.8s easeOut):
 *   0.000 – 0.028 : lightning bolts strike down, flash, shockwave
 *   0.010 – 0.022 : neon MYZONE logo flashes in at plate center
 *   0.013 – 0.080 : plate fractures diagonally, halves fly out and fade
 *   0.080 – 0.100 : neon logo grows from plate-size to full viewport
 *   0.100 – 0.120 : logo dims, slogan reveals in the same crossfade
 *   0.120 +       : final composition held
 */
export function Hero() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      progress.set(END);
      return;
    }

    const controls = animate(progress, END, {
      duration: DURATION_S,
      ease: [0.22, 0.61, 0.36, 1],
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <section className="relative h-[100dvh]">
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-grid-dots">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(43,155,209,0.22), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[62%] h-[40vh] w-[60vw] max-w-[700px] -translate-x-1/2 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.7), transparent 70%)",
          }}
        />
        <ScrollLightning progress={progress} />
        <FracturePlate progress={progress} />
        <NeonLogo progress={progress} />
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroCopy progress={progress} />
        </div>
      </div>
    </section>
  );
}
