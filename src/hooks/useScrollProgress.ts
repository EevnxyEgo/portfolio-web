"use client";

import { useState, useEffect } from "react";

interface ScrollProgress {
  progress: number;
  scrollY: number;
  direction: "up" | "down" | null;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const progress = documentHeight > windowHeight
        ? scrollY / (documentHeight - windowHeight)
        : 0;

      const direction = scrollY > lastScrollY ? "down" : "up";
      const isAtTop = scrollY < 100;
      const isAtBottom = scrollY + windowHeight >= documentHeight - 100;

      setScrollData({
        progress,
        scrollY,
        direction,
        isAtTop,
        isAtBottom,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollData;
}
