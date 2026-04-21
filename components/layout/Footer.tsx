"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/useT";
import { MyZoneMark } from "@/components/brand/MyZoneMark";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 border-t border-[var(--color-border-hairline)] bg-[var(--color-bg-black)]">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div className="flex items-start gap-2.5">
          <MyZoneMark className="h-7 w-7 text-[var(--color-ice)]" />
          <div>
            <div className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] text-[var(--color-text-primary)]">
              MYZONE
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-dim)]">
              {t.footer.tag}
            </p>
          </div>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-mono text-xs tracking-[0.2em] text-[var(--color-ice-deep)]">
            {t.contact.eyebrow}
          </div>
          <div className="space-y-1 text-[var(--color-text-dim)]">
            <div>{t.contact.address}</div>
            <div>{t.contact.phone}</div>
            <div>{t.contact.email}</div>
          </div>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-mono text-xs tracking-[0.2em] text-[var(--color-ice-deep)]">
            NAV
          </div>
          <div className="flex flex-col gap-1 text-[var(--color-text-dim)]">
            <Link href="/" className="hover:text-[var(--color-ice)]">
              {t.nav.home}
            </Link>
            <Link href="/o-nas" className="hover:text-[var(--color-ice)]">
              {t.nav.about}
            </Link>
            <Link href="/fotogalerie" className="hover:text-[var(--color-ice)]">
              {t.nav.gallery}
            </Link>
            <Link href="/rezervovat" className="hover:text-[var(--color-ice)]">
              {t.nav.reserve}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 border-t border-[var(--color-border-hairline)] px-5 py-5 text-center text-xs text-[var(--color-text-dim)] md:px-8">
        <div>© {year} MyZone. {t.footer.rights}</div>
        <div className="italic uppercase tracking-[0.08em]">
          Designed and created by Olivia
        </div>
      </div>
    </footer>
  );
}
