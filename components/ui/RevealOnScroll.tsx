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
      // Trigger ~300px before the element enters the viewport so content
      // reveals early instead of waiting until it is well in view — avoids
      // near-viewport blocks lingering at opacity:0.
      viewport={{ once: true, amount, margin: "0px 0px 300px 0px" }}
      variants={staggerChildren ? stagger : fadeUp}
    >
      {children}
    </Comp>
  );
}
