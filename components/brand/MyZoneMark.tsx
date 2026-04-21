import type { SVGProps } from "react";

/**
 * The MYZONE M mark, rendered as pure SVG.
 *
 * Geometry is lifted directly from `public/MY ZONE_modre_logo-2.svg` — 10
 * rounded-end bars at the designer's exact coordinates. Defaults to
 * `currentColor` so it inherits the surrounding text color; pass `fill`
 * to override. Nothing animated here — the hero wraps the same geometry
 * with its own motion + filter stack.
 */
export function MyZoneMark({
  fill = "currentColor",
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="86 22 188 220"
      fill={fill}
      aria-hidden="true"
      {...rest}
    >
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
    </svg>
  );
}
