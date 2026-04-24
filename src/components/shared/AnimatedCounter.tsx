"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export function AnimatedCounter({
  end,
  duration = 2,
  className = "",
  suffix = "",
}: AnimatedCounterProps) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleViewportEnter = () => {
    if (hasAnimated || prefersReduced) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  };

  if (prefersReduced) {
    return <span className={className}>{end}{suffix}</span>;
  }

  return (
    <motion.span
      className={className}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={handleViewportEnter}
    >
      {count}{suffix}
    </motion.span>
  );
}