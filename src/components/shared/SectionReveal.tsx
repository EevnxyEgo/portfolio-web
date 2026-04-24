"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const getDirectionVariant = (
  direction: SectionRevealProps["direction"],
  prefersReduced: boolean
): Variants => {
  if (prefersReduced === true) {
    return { hidden: {}, visible: {} };
  }

  const offsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 },
  };

  const offset = offsets[direction || "up"];

  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
};

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion();
  const variants = getDirectionVariant(direction, prefersReduced ?? false);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}