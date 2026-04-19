"use client";

import { useT } from "@/lib/i18n/useT";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-hairline)] text-[var(--color-ice)]">
    {children}
  </span>
);

export function TrustStrip() {
  const { t } = useT();
  const items = [
    { icon: "◐", label: t.trust.private },
    { icon: "⌘", label: t.trust.capacity },
    { icon: "◷", label: t.trust.access },
    { icon: "⌖", label: t.trust.location },
  ];
  return (
    <RevealOnScroll>
      <div className="border-y border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)]/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 md:px-8">
          {items.map((i) => (
            <div key={i.label} className="flex items-center gap-3">
              <Icon>{i.icon}</Icon>
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {i.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}
