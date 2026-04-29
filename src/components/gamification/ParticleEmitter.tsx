"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

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
  const particles = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (360 / count) * i + Math.random() * 20 - 10,
      speed: 40 + Math.random() * 30,
      size: 3 + Math.random() * 3,
      color,
    }));
  }, [active, count, color]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ overflow: "hidden" }}
    >
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
    </div>
  );
}
