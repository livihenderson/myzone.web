import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-ice-deep)]">
        {eyebrow}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {sub ? (
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-text-dim)] md:text-lg">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
