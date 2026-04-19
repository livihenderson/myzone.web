"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";
import { facilityPhotos } from "@/lib/photos";

const photoSlots = facilityPhotos;

export function Vybaveni() {
  const { t } = useT();
  return (
    <section id="vybaveni" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealOnScroll staggerChildren className="flex flex-col gap-14">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.facilities.eyebrow}
              title={t.facilities.title}
              sub={t.facilities.sub}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 gap-5 md:grid-cols-6"
          >
            {t.facilities.cards.map((c, i) => {
              const layout =
                i === 0
                  ? "md:col-span-4 md:row-span-2 aspect-[5/3]"
                  : i === 1
                    ? "md:col-span-2 aspect-[4/3]"
                    : i === 2
                      ? "md:col-span-3 aspect-[4/3]"
                      : "md:col-span-3 aspect-[4/3]";
              return (
                <div
                  key={c.title}
                  className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border-hairline)] ${layout}`}
                >
                  <Image
                    src={photoSlots[i]}
                    alt=""
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-black)] via-[var(--color-bg-black)]/30 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end gap-2 p-6 md:p-8">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-dim)]">
                      {c.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
