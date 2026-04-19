"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import { FracturePlate } from "./FracturePlate";
import { HeroCopy } from "./HeroCopy";
import { NeonLogo } from "./NeonLogo";
import { ScrollLightning } from "./ScrollLightning";

/**
 * On load: the plate alone is fully visible, static — no logo on it, no
 * entry animation. The user sees the piece immediately.
 *
 * On scroll (during the sticky pin):
 *   - 0.000 – 0.028 : lightning bolts strike down, flash, shockwave
 *   - 0.010 – 0.022 : neon MYZONE logo flashes in at plate center
 *   - 0.013 – 0.080 : plate fractures diagonally, halves fly out and fade
 *   - 0.080 – 0.100 : neon logo grows from plate-size to full viewport
 *   - 0.100 – 0.120 : the moment it's grown, logo fades AND slogan reveals
 *                     (snappy crossfade — logo → backdrop, text sharpens in)
 *   - 0.120 – 0.600 : clean hero — slogan over muted logo, pin active
 *   - 0.600 – 1.000 : hero scrolls away, next section comes in
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Raw scroll progress is fed in discrete wheel/trackpad ticks, which
  // makes every scroll-driven transform snap between those ticks and feel
  // choppy. Wrapping the progress in a spring smooths those jumps — every
  // child component reads an eased value instead of the raw one, giving
  // the hero the same fluid feel as native page scroll elsewhere on the
  // site. Tuning: moderate stiffness + generous damping = quick to catch
  // up, no overshoot. restDelta keeps the spring from oscillating around
  // threshold values (the halves-unmount check in FracturePlate).
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 38,
    mass: 0.4,
    restDelta: 0.0002,
  });

  return (
    <section
      ref={containerRef}
      // dvh (dynamic viewport height) matches the actual visible viewport
      // on mobile browsers whose URL bar shows/hides while scrolling. vh
      // on iOS Safari includes the URL bar area, which throws off scroll-
      // driven progress calculations and makes the sticky pin feel off.
      // 150 keeps the unpin-and-scroll-off motion at 1:1 (~100dvh), leaves
      // the animation window intact, and trims the post-composition hold
      // so the slogan doesn't linger frozen on screen.
      className="relative h-[150dvh]"
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-grid-dots">
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
        <ScrollLightning progress={smoothProgress} />
        <FracturePlate progress={smoothProgress} />
        <NeonLogo progress={smoothProgress} />
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroCopy progress={smoothProgress} />
        </div>
      </div>
    </section>
  );
}
