"use client";

import { useState, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition((prev) => ({
        ...prev,
        targetX: event.clientX,
        targetY: event.clientY,
      }));
    };

    const animate = () => {
      setPosition((prev) => ({
        ...prev,
        x: prev.targetX,
        y: prev.targetY,
      }));
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return position;
}
