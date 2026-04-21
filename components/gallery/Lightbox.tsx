"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";

type Props = {
  photos: readonly string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  const { t } = useT();
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && index !== null ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-black)]/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute right-5 top-5 rounded-full border border-[var(--color-border-hairline)] px-4 py-2 text-xs tracking-widest text-[var(--color-text-primary)] hover:text-[var(--color-ice)]"
            onClick={onClose}
            aria-label={t.gallery.close}
          >
            ✕ {t.gallery.close}
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-hairline)] p-4 text-[var(--color-text-primary)] hover:text-[var(--color-ice)]"
            onClick={onPrev}
            aria-label={t.gallery.prev}
          >
            ‹
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-hairline)] p-4 text-[var(--color-text-primary)] hover:text-[var(--color-ice)]"
            onClick={onNext}
            aria-label={t.gallery.next}
          >
            ›
          </button>
          <motion.div
            key={index}
            className="relative h-[80vh] w-[92vw] max-w-6xl overflow-hidden rounded-2xl border border-[var(--color-border-hairline)]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <Image
              src={photos[index]}
              alt=""
              fill
              className="object-cover"
              sizes="92vw"
              priority
            />
          </motion.div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-[var(--color-text-dim)]">
            {index + 1} / {photos.length}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
