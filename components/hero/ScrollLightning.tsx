"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Scroll-driven lightning strike. Instead of playing on page mount, this
 * fires as the user begins scrolling — bolts draw down from the top,
 * strike the plate, flash — all within the first ~3% of scroll progress.
 * Immediately after, the plate fractures (see FracturePlate's timings).
 *
 * Timeline (in scroll progress, not seconds):
 *   0.000 – 0.012 : primary bolt draws in (pathLength 0 → 1)
 *   0.003 – 0.015 : secondary offset bolt draws in
 *   0.010 – 0.025 : impact shockwave ring expands and fades
 *   0.011 – 0.024 : full-screen flash peaks at 0.016
 *   0.005 – 0.028 : residual icy wash around the plate
 */
export function ScrollLightning({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const bolt1Length = useTransform(progress, [0, 0.012], [0, 1]);
  const bolt2Length = useTransform(progress, [0.003, 0.015], [0, 1]);
  const boltOpacity = useTransform(
    progress,
    [0, 0.001, 0.02, 0.028],
    [0, 1, 1, 0],
  );
  const flashOpacity = useTransform(
    progress,
    [0, 0.011, 0.016, 0.028],
    [0, 0, 0.85, 0],
  );
  const shockwaveScale = useTransform(progress, [0.01, 0.025], [0.1, 14]);
  const shockwaveOpacity = useTransform(
    progress,
    [0.01, 0.015, 0.025],
    [0, 1, 0],
  );
  const washOpacity = useTransform(
    progress,
    [0.005, 0.015, 0.03],
    [0, 0.6, 0],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary bolt */}
      <motion.svg
        className="absolute left-1/2 top-0 h-[55vh] w-[min(60vw,500px)] -translate-x-1/2"
        viewBox="0 0 100 200"
        style={{ opacity: boltOpacity }}
      >
        {/* halo */}
        <motion.path
          d="M 52 0 L 44 32 L 58 58 L 36 92 L 60 122 L 38 156 L 54 200"
          stroke="var(--color-ice)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.55}
          style={{
            pathLength: bolt1Length,
            filter:
              "drop-shadow(0 0 10px rgba(107,216,255,1)) drop-shadow(0 0 25px rgba(107,216,255,0.7)) drop-shadow(0 0 50px rgba(107,216,255,0.4))",
          }}
        />
        {/* core */}
        <motion.path
          d="M 52 0 L 44 32 L 58 58 L 36 92 L 60 122 L 38 156 L 54 200"
          stroke="#F5FBFF"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: bolt1Length }}
        />
      </motion.svg>

      {/* Secondary offset bolt */}
      <motion.svg
        className="absolute left-[42%] top-0 h-[50vh] w-[min(45vw,380px)] -translate-x-1/2"
        viewBox="0 0 100 200"
        style={{ opacity: boltOpacity }}
      >
        <motion.path
          d="M 48 0 L 62 38 L 42 68 L 58 100 L 40 140 L 54 180 L 46 200"
          stroke="var(--color-ice)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
          style={{
            pathLength: bolt2Length,
            filter:
              "drop-shadow(0 0 6px rgba(107,216,255,0.9)) drop-shadow(0 0 18px rgba(107,216,255,0.5))",
          }}
        />
      </motion.svg>

      {/* Impact shockwave ring at plate center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          border: "2px solid rgba(107,216,255,0.8)",
          boxShadow:
            "0 0 20px rgba(107,216,255,0.8), inset 0 0 20px rgba(107,216,255,0.5)",
          scale: shockwaveScale,
          opacity: shockwaveOpacity,
        }}
      />

      {/* Full-screen flash on impact */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.95)",
          opacity: flashOpacity,
        }}
      />

      {/* Residual icy-blue wash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 50% 50%, rgba(107,216,255,0.35), transparent 70%)",
          opacity: washOpacity,
        }}
      />
    </div>
  );
}
