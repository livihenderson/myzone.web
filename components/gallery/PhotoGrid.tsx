"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Lightbox } from "./Lightbox";
import { stagger, scaleIn } from "@/lib/motion/variants";
import { gymPhotos } from "@/lib/photos";

const ALL_PHOTOS = gymPhotos;

export function PhotoGrid() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <motion.ul
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
      >
        {ALL_PHOTOS.map((src, i) => (
          <motion.li
            key={src}
            variants={scaleIn}
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl border border-[var(--color-border-hairline)] transition-colors hover:border-[var(--color-ice)]/50"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="absolute inset-0"
              aria-label={`Photo ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <span className="absolute inset-0 bg-[var(--color-bg-black)]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <Lightbox
        photos={ALL_PHOTOS}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={() =>
          setIndex((i) =>
            i === null ? i : (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length,
          )
        }
        onNext={() =>
          setIndex((i) => (i === null ? i : (i + 1) % ALL_PHOTOS.length))
        }
      />
    </>
  );
}
