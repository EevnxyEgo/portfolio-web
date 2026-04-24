"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const { isMobile } = useMediaQuery();
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] hidden md:block"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isClicking ? 0.8 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className={`
            w-8 h-8 rounded-full border transition-colors duration-200
            ${
              isHovering
                ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                : "bg-transparent border-[rgba(232,51,10,0.6)]"
            }
          `}
          style={{ mixBlendMode: "difference" }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] hidden md:block"
        animate={{
          x: x - 3,
          y: y - 3,
          scale: isClicking ? 0.8 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
      </motion.div>
    </>
  );
}
