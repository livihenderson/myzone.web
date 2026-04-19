"use client";

import { useT } from "@/lib/i18n/useT";
import type { Locale } from "@/lib/i18n/dictionary";

export function LanguageToggle() {
  const { locale, setLocale } = useT();
  const btn = (l: Locale) => (
    <button
      key={l}
      type="button"
      onClick={() => setLocale(l)}
      aria-pressed={locale === l}
      className={`px-2 py-1 text-xs font-semibold tracking-wider transition-colors ${
        locale === l
          ? "text-[var(--color-ice)]"
          : "text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]"
      }`}
    >
      {l.toUpperCase()}
    </button>
  );
  return (
    <div className="flex items-center gap-0 rounded-full border border-[var(--color-border-hairline)] px-1 py-0.5">
      {btn("cs")}
      <span className="h-3 w-px bg-[var(--color-border-hairline)]" />
      {btn("en")}
    </div>
  );
}
