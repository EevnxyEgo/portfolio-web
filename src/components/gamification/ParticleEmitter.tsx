"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticleEmitterProps {
  x: number;
  y: number;
  color: string;
  count?: number;
  active: boolean;
}

export function ParticleEmitter({
  x,
  y,
  color,
  count = 12,
  active,
}: ParticleEmitterProps) {
  // Deterministic seed: count+color change on each new activation for fresh particles.
  // No Math.random — ESLint react-hooks/purity rule compliance.
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (360 / count) * i + ((i * 137.508) % 20 - 10),
      speed: 40 + ((i * 31) % 30),
      size: 3 + ((i * 17) % 3),
      color,
    }));
  }, [count, color]);

  if (!active) return null;
  const container =
    typeof document !== "undefined" ? document.body : null;
  if (!container) return null;

  return createPortal(
    <div className="pointer-events-none" style={{ overflow: "hidden" }}>
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.speed;
        const ty = Math.sin(rad) * p.speed;
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: tx,
              y: ty,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </div>,
    container
  );
}
