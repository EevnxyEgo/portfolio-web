"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ScrollProgress() {
  const { isMobile } = useMediaQuery();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-primary)] origin-left z-[var(--z-sticky)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
