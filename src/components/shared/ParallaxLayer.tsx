"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
}: ParallaxLayerProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setElementTop(rect.top + window.scrollY);
        setElementHeight(rect.height);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const yRange = [-elementHeight * speed, window.innerHeight + elementHeight * speed];
  const y = useTransform(smoothScrollY, [elementTop - window.innerHeight, elementTop + elementHeight], yRange);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}