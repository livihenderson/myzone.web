"use client";

import { motion } from "motion/react";

/**
 * Plays once on mount. Two layered bolts descend from the top of the viewport,
 * strike the plate, then a brief bright flash washes the screen. After this,
 * the NeonLogo beam-trace begins (its `animationDelay` prop is timed to match).
 *
 * Timeline (seconds from mount):
 *   0.00 – 0.55 : bolts draw in (pathLength 0 → 1)
 *   0.55 – 0.70 : flash peaks
 *   0.70 – 1.10 : flash fades, bolts fade
 *   1.10+      : quiet; NeonLogo trace kicks in (delay ≈ 1.1s)
 */
export function LightningStrike() {
  const boltTransition = {
    pathLength: { duration: 0.5, ease: [0.55, 0, 0.7, 1] as const },
    opacity: { duration: 0.2 },
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary bolt — dramatic zigzag down to the plate center */}
      <motion.svg
        className="absolute left-1/2 top-0 h-[55vh] w-[min(60vw,500px)] -translate-x-1/2"
        viewBox="0 0 100 200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.1,
          times: [0, 0.1, 0.65, 1],
          ease: "linear",
        }}
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
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={boltTransition}
          style={{
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
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={boltTransition}
        />
      </motion.svg>

      {/* Secondary offset bolt for more chaos */}
      <motion.svg
        className="absolute left-[42%] top-0 h-[50vh] w-[min(45vw,380px)] -translate-x-1/2"
        viewBox="0 0 100 200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.7, 0] }}
        transition={{
          duration: 1.0,
          delay: 0.12,
          times: [0, 0.15, 0.6, 1],
          ease: "linear",
        }}
      >
        <motion.path
          d="M 48 0 L 62 38 L 42 68 L 58 100 L 40 140 L 54 180 L 46 200"
          stroke="var(--color-ice)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            pathLength: { duration: 0.45, delay: 0.12, ease: [0.55, 0, 0.7, 1] },
            opacity: { duration: 0.15, delay: 0.12 },
          }}
          style={{
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
        }}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{
          opacity: [0, 0, 1, 0],
          scale: [0.1, 0.1, 12, 16],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.45, 0.7, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Full-screen flash on impact */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(255,255,255,0.95)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.8, 0] }}
        transition={{
          duration: 1.1,
          times: [0, 0.5, 0.58, 0.85],
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Residual icy-blue wash fades out as the neon logo takes over */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 50% 50%, rgba(107,216,255,0.35), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{
          duration: 1.6,
          times: [0, 0.4, 0.55, 1],
          ease: "easeOut",
        }}
      />
    </div>
  );
}
