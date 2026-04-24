"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { lerpFactor, magneticStrength } from "@/lib/animations";

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export function MagneticElement({
  children,
  className = "",
  strength = magneticStrength,
  disabled = false,
}: MagneticElementProps) {
  const { isMobile } = useMediaQuery();
  const prefersReduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = x - centerX;
      const distanceY = y - centerY;

      const targetX = distanceX * strength;
      const targetY = distanceY * strength;

      currentX.current += (targetX - currentX.current) * lerpFactor;
      currentY.current += (targetY - currentY.current) * lerpFactor;

      containerRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (isMobile || prefersReduced || disabled) return;
      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      currentX.current = 0;
      currentY.current = 0;
      if (containerRef.current) {
        containerRef.current.style.transform = "translate(0, 0)";
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [x, y, strength, isMobile, prefersReduced, disabled]);

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      whileHover={prefersReduced || isMobile || disabled ? {} : { scale: 1.05 }}
      whileTap={prefersReduced || isMobile || disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
