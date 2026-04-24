"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltIntensity = 15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();

  const mouseX = useSpring(0, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (isHovered) {
      mouseX.set((x - centerX) / 10);
      mouseY.set((y - centerY) / 10);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [x, y, isHovered, mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [`-${tiltIntensity}deg`, `${tiltIntensity}deg`]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [`${tiltIntensity}deg`, `-${tiltIntensity}deg`]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10">{children}</div>
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(232,51,10,0.1) 0%, transparent 70%)",
            transform: "translateZ(20px)",
          }}
        />
      )}
    </motion.div>
  );
}