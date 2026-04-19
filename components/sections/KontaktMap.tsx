"use client";

import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=14.10%2C50.13%2C14.14%2C50.16&layer=mapnik&marker=50.1436%2C14.1153";

export function KontaktMap() {
  const { t } = useT();
  return (
    <section id="kontakt" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:grid-cols-2 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-8">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
            />
          </motion.div>
          <motion.dl
            variants={fadeUp}
            className="grid grid-cols-1 gap-6 text-sm"
          >
            {[
              { k: "Adresa", v: t.contact.address },
              { k: "Telefon", v: t.contact.phone },
              { k: "E-mail", v: t.contact.email },
              { k: "Otevřeno", v: t.contact.hours },
            ].map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-1 border-l border-[var(--color-ice)]/40 pl-4"
              >
                <dt className="font-mono text-xs tracking-widest text-[var(--color-ice-deep)]">
                  {row.k.toUpperCase()}
                </dt>
                <dd className="text-[var(--color-text-primary)]">{row.v}</dd>
              </div>
            ))}
          </motion.dl>
        </RevealOnScroll>
        <RevealOnScroll className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border-hairline)]">
          <iframe
            src={MAP_SRC}
            title="MyZone map"
            className="h-full w-full"
            style={{
              filter:
                "invert(0.92) hue-rotate(180deg) saturate(0.9) brightness(0.9)",
            }}
            loading="lazy"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
