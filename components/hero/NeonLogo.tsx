"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Scroll-driven neon MYZONE logo overlay.
 *
 * Geometry is lifted directly from the designer's source SVG at
 * `public/MY ZONE_modre_logo-2.svg`. The mark is built from 10
 * rounded-end rectangles (each 5.04 units wide, rx=2.52) — the designer
 * used filled bars with rounded caps instead of strokes. Keeping the
 * original coordinates means the logo matches the brand file exactly and
 * stays razor-sharp at any scale.
 *
 * Animation phases:
 *   < 0.010           : invisible (clean plate on screen)
 *   0.010 – 0.022     : flash in — bright neon pop at plate-center size
 *   0.022 – 0.080     : hold bright while the halves fly outward
 *   0.080 – 0.100     : scale up to full viewport size (stays bright)
 *   0.100 – 0.120     : fade begins immediately (1 → 0.4); slogan reveals
 *                       in the same window so the composition locks in
 *                       within ~30vh of scroll
 *   0.120 +           : holds as a dimmed-but-present backdrop for text
 */
export function NeonLogo({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(
    progress,
    [0, 0.010, 0.018, 0.025, 0.080, 0.100, 1],
    [0.30, 0.30, 0.40, 0.35, 0.35, 1.00, 1.00],
  );

  const opacity = useTransform(
    progress,
    [0, 0.010, 0.018, 0.100, 0.120, 1],
    [0, 0, 1, 1, 0.40, 0.40],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.svg
        // Tight crop around the M mark (text is excluded). The source
        // file's M geometry occupies roughly (90, 25) → (270, 237) in
        // its native coords; this viewBox frames it with a small margin.
        viewBox="86 22 188 220"
        fill="var(--color-ice)"
        style={{
          // Width capped by vw (side margins), px (wide desktops), and vh
          // (so height = width × 220/188 ≈ 1.17 stays within viewport).
          width: "min(62vw, 580px, 58vh)",
          height: "auto",
          aspectRatio: "188 / 220",
          scale,
          opacity,
          // Four drop-shadow layers instead of six — at full viewport
          // scale the outer blur is recomputed every animation frame, and
          // trimming the stack reduces paint cost without losing the
          // tight-core → soft-halo neon read.
          filter:
            "drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 12px rgba(107,216,255,0.9)) drop-shadow(0 0 30px rgba(107,216,255,0.55)) drop-shadow(0 0 64px rgba(107,216,255,0.28))",
          willChange: "transform, opacity",
        }}
      >
        {/* The 10 rounded bars that make up the M — copied verbatim from
            public/MY ZONE_modre_logo-2.svg, original coordinates preserved. */}
        <rect width="5.04" height="189.98" x="91.72" y="29.18" rx="2.52" ry="2.52" />
        <rect
          width="5.04"
          height="269.53"
          x="177.56"
          y="-2.43"
          rx="2.52"
          ry="2.52"
          transform="rotate(-40.45 180.088 132.334)"
        />
        <rect
          width="5.04"
          height="72.01"
          x="148.08"
          y="115.31"
          rx="2.52"
          ry="2.52"
          transform="rotate(-40.45 150.608 151.313)"
        />
        <rect width="5.04" height="67.85" x="126.36" y="123.35" rx="2.52" ry="2.52" />
        <rect width="5.04" height="174.04" x="263.42" y="26.26" rx="2.52" ry="2.52" />
        <rect
          width="5.04"
          height="117.78"
          x="219.65"
          y="5.41"
          rx="2.52"
          ry="2.52"
          transform="rotate(50.93 222.164 64.298)"
        />
        <rect
          width="5.04"
          height="52.91"
          x="214.42"
          y="82.12"
          rx="2.52"
          ry="2.52"
          transform="rotate(50.93 216.934 108.572)"
        />
        <rect width="5.04" height="73.56" x="233" y="91" rx="2.52" ry="2.52" />
        <rect
          width="5.04"
          height="51.89"
          x="248.22"
          y="154"
          rx="2.52"
          ry="2.52"
          transform="rotate(-40.45 250.744 179.944)"
        />
        <rect
          width="5.04"
          height="49.54"
          x="109.07"
          y="177.97"
          rx="2.52"
          ry="2.52"
          transform="rotate(50.93 111.593 202.737)"
        />
      </motion.svg>
    </div>
  );
}
