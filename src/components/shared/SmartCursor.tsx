"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type CursorState = "default" | "link" | "project" | "skill" | "text";

export function SmartCursor() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        setState(el.dataset.cursor as CursorState);
        setLabel(el.dataset.cursorLabel ?? "");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setState("link");
        setLabel("");
      } else {
        setState("default");
        setLabel("");
      }
    };

    let currentRingPos = ringPos;

    const animate = () => {
      setDotPos({ x: pos.current.x, y: pos.current.y });
      const nx = currentRingPos.x + (pos.current.x - currentRingPos.x) * 0.12;
      const ny = currentRingPos.y + (pos.current.y - currentRingPos.y) * 0.12;
      currentRingPos = { x: nx, y: ny };
      setRingPos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]); // ringPos intentionally handled via closure to avoid stale state

  if (!mounted) return null;
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const ringSize = state === "link" ? 48 : state === "project" ? 64 : state === "skill" ? 20 : 32;
  const showInnerDot = state !== "link";

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] hidden md:block"
        animate={{
          x: dotPos.x - 4,
          y: dotPos.y - 4,
          opacity: showInnerDot ? 1 : 0,
          scale: showInnerDot ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] hidden md:block"
        animate={{
          x: ringPos.x - ringSize / 2,
          y: ringPos.y - ringSize / 2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            borderRadius: state === "text"
              ? "2px"
              : state === "project"
              ? "12px"
              : "50%",
            backgroundColor:
              state === "link"
                ? "rgba(232,51,10,0.08)"
                : state === "project"
                ? "rgba(232,51,10,0.06)"
                : state === "skill"
                ? "rgba(232,51,10,0.10)"
                : "transparent",
            border:
              state === "default"
                ? "1px solid rgba(232,51,10,0.3)"
                : state === "skill"
                ? "1px solid var(--color-primary)"
                : "1px solid var(--color-primary)",
            opacity: state === "text" ? 0.3 : 0.6,
          }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {label && (
            <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-primary)] font-medium">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}