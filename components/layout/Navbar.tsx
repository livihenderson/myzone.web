"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/o-nas", label: t.nav.about },
    { href: "/fotogalerie", label: t.nav.gallery },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-black)]/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="MyZone"
          >
            <Image
              src="/brand/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] text-[var(--color-text-primary)]">
              MYZONE
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-ice)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageToggle />
            <Button href="/rezervovat" variant="primary">
              {t.nav.reserve}
            </Button>
          </div>

          <button
            className="rounded-md border border-[var(--color-border-hairline)] p-2 text-[var(--color-text-primary)] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg-black)]/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em]">
                MYZONE
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-md border border-[var(--color-border-hairline)] px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4 p-6">
              <LanguageToggle />
              <Button
                href="/rezervovat"
                variant="primary"
                onClick={() => setOpen(false)}
              >
                {t.nav.reserve}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
