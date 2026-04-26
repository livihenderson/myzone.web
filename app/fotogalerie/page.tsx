"use client";

import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";
import { useT } from "@/lib/i18n/useT";

export default function FotogaleriePage() {
  const { t } = useT();
  return (
    <>
      <Navbar />
      <main id="main" className="pb-16 pt-40 md:pb-24 md:pt-48">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
          <RevealOnScroll staggerChildren className="flex flex-col gap-6">
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t.gallery.eyebrow}
                title={t.gallery.title}
                sub={t.gallery.sub}
              />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl border-l border-[var(--color-ice-deep)] pl-4 text-sm italic text-[var(--color-text-dim)] md:text-base"
            >
              {t.gallery.disclaimer}
            </motion.p>
          </RevealOnScroll>
          <PhotoGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
