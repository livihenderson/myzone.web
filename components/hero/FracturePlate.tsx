"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Shards } from "./Shards";

const UPPER_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%)";
const LOWER_CLIP = "polygon(0% 0%, 100% 100%, 0% 100%)";

const SPOKE_POINTS = "38,-5 102,-12 102,12 38,5";
const SPOKE_ANGLES = [-45, 45, -135, 135] as const;

function PlateBody({ half }: { half: "upper" | "lower" }) {
  const id = half;
  const grainSeed = half === "upper" ? 3 : 7;
  return (
    <svg
      viewBox="-120 -120 240 240"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* Matte cast-iron body — uniform dark with subtle depth */}
        <radialGradient id={`body-${id}`} cx="30%" cy="26%" r="92%">
          <stop offset="0%" stopColor="#2A2F38" />
          <stop offset="50%" stopColor="#141820" />
          <stop offset="100%" stopColor="#070A0E" />
        </radialGradient>

        {/* Outer rim bevel — vertical world-space gradient so top edge is
            lit and bottom edge is shadowed. */}
        <linearGradient
          id={`rim-${id}`}
          x1="0"
          y1="-110"
          x2="0"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.38)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.65)" />
        </linearGradient>

        {/* Spoke ridge — dark / mid / light / mid / dark perpendicular to
            spoke axis, applied in spoke-local coords so it follows each
            rotated spoke and gives a raised-ridge read. */}
        <linearGradient
          id={`spoke-${id}`}
          x1="0"
          y1="-12"
          x2="0"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0A0E15" />
          <stop offset="22%" stopColor="#242A36" />
          <stop offset="50%" stopColor="#3E4553" />
          <stop offset="78%" stopColor="#242A36" />
          <stop offset="100%" stopColor="#0A0E15" />
        </linearGradient>

        {/* Hub cylindrical side wall — diagonal gradient for the raised-cylinder read */}
        <linearGradient
          id={`hubCyl-${id}`}
          x1="-44"
          y1="-44"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#424A58" />
          <stop offset="50%" stopColor="#1F2432" />
          <stop offset="100%" stopColor="#080C13" />
        </linearGradient>

        {/* Hub flat-top surface */}
        <radialGradient id={`hubTop-${id}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#2E343F" />
          <stop offset="100%" stopColor="#11151E" />
        </radialGradient>

        {/* Center hole depth gradient — simulates light falling into the hole */}
        <radialGradient id={`hole-${id}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0A0D12" />
          <stop offset="60%" stopColor="#020305" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* Cast-iron grain — a fine noise overlay that gives the plate
            surface an authentic rough-cast texture, clipped to the source
            shape so it only appears on the plate. */}
        <filter
          id={`grain-${id}`}
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="3.2"
            numOctaves="2"
            seed={grainSeed}
          />
          <feColorMatrix
            values="0 0 0 0 0.06
                    0 0 0 0 0.06
                    0 0 0 0 0.08
                    0 0 0 0.45 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Arc paths for engraved text. Radius 90 places "STANDARD" /
            "BARBELL" close to the rim but with a comfortable margin
            before the edge — matches a classic Olympic-plate layout. */}
        <path
          id={`topArc-${id}`}
          d="M -40 -78 A 90 90 0 0 1 40 -78"
          fill="none"
        />
        <path
          id={`botArc-${id}`}
          d="M -40 78 A 90 90 0 0 0 40 78"
          fill="none"
        />
      </defs>

      {/* Cast shadow below plate */}
      <ellipse
        cx="0"
        cy="116"
        rx="104"
        ry="9"
        fill="rgba(0,0,0,0.7)"
        style={{ filter: "blur(8px)" }}
      />

      {/* Plate body — matte cast iron */}
      <circle r="110" fill={`url(#body-${id})`} />

      {/* Cast-iron grain overlay */}
      <circle r="110" fill="#000" filter={`url(#grain-${id})`} />

      {/* Outer rim beveled edge */}
      <circle r="110" fill="none" stroke={`url(#rim-${id})`} strokeWidth="4.5" />
      {/* Crisp outer edge */}
      <circle r="110" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="0.5" />
      {/* Inner rim shadow — where the rim meets the flat plate surface */}
      <circle r="103" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
      <circle r="102" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* Faint casting rings on the flat plate face — machining marks */}
      <circle r="92" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.4" />
      <circle r="75" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.3" />

      {/* 4 trapezoidal raised spokes in an X pattern */}
      {SPOKE_ANGLES.map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <polygon points={SPOKE_POINTS} fill={`url(#spoke-${id})`} />
          {/* Upper edge highlight — reinforces the raised-ridge read */}
          <line
            x1="38"
            y1="-5"
            x2="102"
            y2="-12"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          {/* Lower edge shadow */}
          <line
            x1="38"
            y1="5"
            x2="102"
            y2="12"
            stroke="rgba(0,0,0,0.85)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          {/* Outer end shadow cap */}
          <line
            x1="102"
            y1="-12"
            x2="102"
            y2="12"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Cast-in text. Classic Olympic plate layout:
             top (N) arc:    "STANDARD"
             bottom (S) arc: "BARBELL"
             left  (W) side: 45  /  LB
             right (E) side: 20.4 / KG
          All share the same emboss-shadow filter so they read as part of
          the cast surface, not floating on top. */}
      <text
        fontFamily="var(--font-display)"
        fontSize="13"
        fontWeight="700"
        letterSpacing="2.6"
        fill="rgba(226,231,238,0.92)"
        textAnchor="middle"
        style={{
          filter:
            "drop-shadow(0.5px 0.9px 0.5px rgba(0,0,0,0.9)) drop-shadow(-0.3px -0.4px 0.3px rgba(255,255,255,0.22))",
        }}
      >
        <textPath href={`#topArc-${id}`} startOffset="50%">
          STANDARD
        </textPath>
      </text>
      <text
        fontFamily="var(--font-display)"
        fontSize="13"
        fontWeight="700"
        letterSpacing="2.6"
        fill="rgba(226,231,238,0.92)"
        textAnchor="middle"
        style={{
          filter:
            "drop-shadow(0.5px 0.9px 0.5px rgba(0,0,0,0.9)) drop-shadow(-0.3px -0.4px 0.3px rgba(255,255,255,0.22))",
        }}
      >
        <textPath href={`#botArc-${id}`} startOffset="50%">
          BARBELL
        </textPath>
      </text>

      {/* Left (W) weight label */}
      <g
        style={{
          filter:
            "drop-shadow(0.5px 0.9px 0.5px rgba(0,0,0,0.9)) drop-shadow(-0.3px -0.4px 0.3px rgba(255,255,255,0.22))",
        }}
      >
        <text
          x="-73"
          y="-4"
          fontFamily="var(--font-display)"
          fontSize="15"
          fontWeight="700"
          fill="rgba(226,231,238,0.92)"
          textAnchor="middle"
        >
          45
        </text>
        <text
          x="-73"
          y="14"
          fontFamily="var(--font-display)"
          fontSize="12"
          fontWeight="700"
          letterSpacing="1"
          fill="rgba(226,231,238,0.92)"
          textAnchor="middle"
        >
          LB
        </text>
      </g>

      {/* Right (E) weight label */}
      <g
        style={{
          filter:
            "drop-shadow(0.5px 0.9px 0.5px rgba(0,0,0,0.9)) drop-shadow(-0.3px -0.4px 0.3px rgba(255,255,255,0.22))",
        }}
      >
        <text
          x="73"
          y="-4"
          fontFamily="var(--font-display)"
          fontSize="15"
          fontWeight="700"
          fill="rgba(226,231,238,0.92)"
          textAnchor="middle"
        >
          20.4
        </text>
        <text
          x="73"
          y="14"
          fontFamily="var(--font-display)"
          fontSize="12"
          fontWeight="700"
          letterSpacing="1"
          fill="rgba(226,231,238,0.92)"
          textAnchor="middle"
        >
          KG
        </text>
      </g>

      {/* Raised central hub — cylindrical with beveled top rim.
          Wider outer ring (r=44) + narrower top surface (r=36) = visible
          8-unit cylinder side wall with gradient shading. */}
      <circle r="44" fill={`url(#hubCyl-${id})`} />
      {/* Top highlight arc (cylinder rim catching light) */}
      <path
        d="M -40 -15 A 42 42 0 0 1 40 -15"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Bottom shadow arc (cylinder rim in shadow) */}
      <path
        d="M -40 15 A 42 42 0 0 0 40 15"
        fill="none"
        stroke="rgba(0,0,0,0.65)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Hub outer edge crisp line */}
      <circle r="44" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="0.5" />

      {/* Hub flat top surface + subtle machining rings */}
      <circle r="36" fill={`url(#hubTop-${id})`} />
      <circle r="36" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.6" />
      <circle r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
      <circle r="30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      <circle r="22" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.3" />

      {/* Deep recessed center hole with subtle chamfer */}
      <circle r="12" fill={`url(#hole-${id})`} />
      <circle r="12" fill="none" stroke="rgba(0,0,0,0.95)" strokeWidth="1.8" />
      {/* Top rim highlight — light catching the chamfered inner edge */}
      <path
        d="M -10 -4 A 11 11 0 0 1 10 -4"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      {/* Bottom rim shadow — deep shadow on far inner wall */}
      <path
        d="M -9 4 A 10 10 0 0 0 9 4"
        fill="none"
        stroke="rgba(0,0,0,0.9)"
        strokeWidth="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlateHalf({ half }: { half: "upper" | "lower" }) {
  const clipPath = half === "upper" ? UPPER_CLIP : LOWER_CLIP;
  return (
    <div
      className="absolute inset-0"
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      <PlateBody half={half} />
    </div>
  );
}

const HALVES_UNMOUNT_THRESHOLD = 0.095;

export function FracturePlate({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // Once the fracture completes, the halves are removed from the DOM
  // entirely — no more rendering, no more filter ghosts. They remount if
  // the user scrolls back up past the threshold.
  const [showHalves, setShowHalves] = useState(true);
  useMotionValueEvent(progress, "change", (v) => {
    setShowHalves(v <= HALVES_UNMOUNT_THRESHOLD);
  });

  // Halves start drifting at 0.013 — right at lightning impact. They scale
  // down as they fly apart and are fully gone by progress 0.09.
  const upperX = useTransform(progress, [0.013, 0.09], [0, 340]);
  const upperY = useTransform(progress, [0.013, 0.09], [0, -40]);
  const upperRot = useTransform(progress, [0.013, 0.09], [0, 10]);
  const upperScale = useTransform(progress, [0.013, 0.09], [1, 0.78]);
  const lowerX = useTransform(progress, [0.013, 0.09], [0, -340]);
  const lowerY = useTransform(progress, [0.013, 0.09], [0, 40]);
  const lowerRot = useTransform(progress, [0.013, 0.09], [0, -10]);
  const lowerScale = useTransform(progress, [0.013, 0.09], [1, 0.78]);

  // Halves hold solid until impact, then fade out entirely by progress 0.08.
  const halvesOpacity = useTransform(
    progress,
    [0, 0.013, 0.03, 0.08, 1],
    [1, 1, 0.7, 0, 0],
  );

  // Secondary break flash on the plate right as the crack opens (coincides
  // with the big screen flash from ScrollLightning).
  const breakFlashOpacity = useTransform(
    progress,
    [0, 0.013, 0.02, 0.05],
    [0, 0, 0.55, 0],
  );

  // Crack: appears at impact, brightens, then fades with the halves.
  const crackOpacity = useTransform(
    progress,
    [0.013, 0.02, 0.05, 0.09],
    [0, 1, 0.8, 0],
  );
  const crackScale = useTransform(progress, [0.013, 0.035], [0.6, 1]);

  // Screen-shake triggered at impact.
  const shakeX = useTransform(
    progress,
    [0.013, 0.02, 0.03, 0.045, 0.06, 0.08],
    [0, -8, 6, -4, 2, 0],
  );
  const shakeY = useTransform(
    progress,
    [0.013, 0.02, 0.03, 0.045, 0.06, 0.08],
    [0, 4, -6, 3, -2, 0],
  );

  return (
    <motion.div
      className="pointer-events-none relative mx-auto aspect-square w-[min(78vw,560px)]"
      aria-hidden="true"
      style={{ perspective: "1200px", x: shakeX, y: shakeY }}
    >
      {/* Break flash — covers the plate area briefly at the instant of cracking */}
      <motion.div
        className="pointer-events-none absolute inset-[-20%]"
        style={{
          opacity: breakFlashOpacity,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.95), rgba(107,216,255,0.6) 40%, transparent 70%)",
        }}
      />

      {/* Idle float */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {showHalves ? (
          <>
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                x: upperX,
                y: upperY,
                rotate: upperRot,
                scale: upperScale,
                opacity: halvesOpacity,
              }}
            >
              <PlateHalf half="upper" />
            </motion.div>

            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                x: lowerX,
                y: lowerY,
                rotate: lowerRot,
                scale: lowerScale,
                opacity: halvesOpacity,
              }}
            >
              <PlateHalf half="lower" />
            </motion.div>
          </>
        ) : null}

        {/* Jagged crack polyline — natural-looking fracture seam */}
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ opacity: crackOpacity, scale: crackScale }}
        >
          <path
            d="M 5 95 L 18 80 L 14 72 L 34 56 L 30 48 L 50 34 L 46 26 L 66 18 L 62 10 L 82 6 L 95 5"
            stroke="var(--color-ice)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter:
                "drop-shadow(0 0 5px rgba(107,216,255,1)) drop-shadow(0 0 18px rgba(107,216,255,0.75))",
            }}
          />
          {/* Bright core of the crack */}
          <path
            d="M 5 95 L 18 80 L 14 72 L 34 56 L 30 48 L 50 34 L 46 26 L 66 18 L 62 10 L 82 6 L 95 5"
            stroke="#F5FBFF"
            strokeWidth="0.25"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Small branching hairlines for natural spread */}
          <path
            d="M 32 52 L 38 60 L 35 66"
            stroke="var(--color-ice)"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            style={{ filter: "drop-shadow(0 0 3px rgba(107,216,255,0.9))" }}
          />
          <path
            d="M 60 26 L 54 20 L 57 14"
            stroke="var(--color-ice)"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            style={{ filter: "drop-shadow(0 0 3px rgba(107,216,255,0.9))" }}
          />
        </motion.svg>

        {/* Flying icy shards */}
        <Shards progress={progress} />
      </motion.div>
    </motion.div>
  );
}
