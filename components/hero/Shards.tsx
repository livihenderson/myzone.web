"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

type ShardConfig = {
  startX: number;
  startY: number;
  velX: number;
  velY: number;
  rotate: number;
  size: number;
};

/** 14 fixed shards — hand-picked for good spread along the diagonal seam. */
const SHARDS: readonly ShardConfig[] = [
  { startX: 42, startY: 58, velX: -480, velY: -280, rotate: -210, size: 4 },
  { startX: 46, startY: 52, velX: -380, velY: 260, rotate: 180, size: 3 },
  { startX: 50, startY: 50, velX: 440, velY: -220, rotate: 240, size: 5 },
  { startX: 54, startY: 48, velX: 420, velY: 280, rotate: -180, size: 4 },
  { startX: 36, startY: 62, velX: -560, velY: -120, rotate: -90, size: 3 },
  { startX: 62, startY: 38, velX: 580, velY: -100, rotate: 110, size: 4 },
  { startX: 40, startY: 56, velX: -220, velY: -420, rotate: -310, size: 3 },
  { startX: 58, startY: 44, velX: 280, velY: -460, rotate: 290, size: 4 },
  { startX: 48, startY: 52, velX: 140, velY: 420, rotate: 140, size: 3 },
  { startX: 50, startY: 52, velX: -180, velY: 460, rotate: -140, size: 4 },
  { startX: 44, startY: 54, velX: -640, velY: 140, rotate: -170, size: 3 },
  { startX: 56, startY: 44, velX: 640, velY: -140, rotate: 170, size: 4 },
  { startX: 45, startY: 55, velX: -340, velY: -340, rotate: -260, size: 2 },
  { startX: 55, startY: 45, velX: 340, velY: 340, rotate: 260, size: 2 },
];

function Shard({
  progress,
  config,
}: {
  progress: MotionValue<number>;
  config: ShardConfig;
}) {
  // Shards launch at lightning impact (progress 0.013) and are gone by 0.09,
  // in sync with the halves' fade-out.
  const x = useTransform(progress, [0.013, 0.11], [0, config.velX]);
  const y = useTransform(progress, [0.013, 0.11], [0, config.velY]);
  const rot = useTransform(progress, [0.013, 0.11], [0, config.rotate]);
  const opacity = useTransform(
    progress,
    [0.013, 0.02, 0.055, 0.09],
    [0, 1, 0.6, 0],
  );
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${config.startX}%`,
        top: `${config.startY}%`,
        width: `${config.size}px`,
        height: `${config.size * 3}px`,
        background:
          "linear-gradient(180deg, #F5FBFF, var(--color-ice) 50%, rgba(107,216,255,0.3))",
        boxShadow:
          "0 0 6px rgba(107,216,255,0.9), 0 0 14px rgba(107,216,255,0.55)",
        x,
        y,
        rotate: rot,
        opacity,
      }}
    />
  );
}

export function Shards({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {SHARDS.map((s, i) => (
        <Shard key={i} progress={progress} config={s} />
      ))}
    </div>
  );
}
