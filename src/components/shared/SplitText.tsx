"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  staggerDelay?: number;
  variants?: Variants;
}

export function SplitText({
  text,
  className = "",
  element: Component = "div",
  delay = 0,
  staggerDelay = 0.04,
  variants,
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * staggerDelay,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const activeVariants = variants || defaultVariants;

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`inline ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            custom={wordIndex}
            variants={activeVariants}
            initial="hidden"
            animate="visible"
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && " "}
        </span>
      ))}
    </Component>
  );
}

interface CharTextProps {
  text: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  staggerDelay?: number;
}

export function CharText({
  text,
  className = "",
  element: Component = "div",
  delay = 0,
  staggerDelay = 0.04,
}: CharTextProps) {
  const prefersReduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * staggerDelay,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`inline ${className}`} aria-label={text}>
      {text.split("").map((char, charIndex) => (
        <span
          key={charIndex}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            custom={charIndex}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
