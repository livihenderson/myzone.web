"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/motion/variants";

export function RevealOnScroll({
  children,
  as = "div",
  className = "",
  staggerChildren = false,
  amount = 0.25,
}: {
  children: ReactNode;
  as?: "div" | "section" | "article";
  className?: string;
  staggerChildren?: boolean;
  amount?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerChildren ? stagger : fadeUp}
    >
      {children}
    </Comp>
  );
}
