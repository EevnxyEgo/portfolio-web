"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

export function FlipCard({ front, back }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleClick = () => {
    if (prefersReduced) return;
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="relative"
      style={{ perspective: "1200px" }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? "Flip card back" : "Flip card to see details"}
    >
      {/* FRONT */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ backfaceVisibility: "hidden" }}
        className="will-change-transform"
      >
        {front}
      </motion.div>

      {/* BACK */}
      <motion.div
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backfaceVisibility: "hidden",
          position: "absolute",
          inset: 0,
        }}
        className="will-change-transform"
      >
        {back}
      </motion.div>
    </div>
  );
}
