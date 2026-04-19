import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)]/80 backdrop-blur ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
