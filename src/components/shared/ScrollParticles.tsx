"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "circle" | "hexagon" | "rect";
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export function ScrollParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const animationRef = useRef<number>(0);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getParticlesForSection = (progress: number): Particle[] => {
    const particles: Particle[] = [];
    const maxParticles = 40;

    // Hero section (0-20%)
    if (progress < 0.2) {
      const intensity = 1 - progress / 0.2;
      for (let i = 0; i < Math.floor(6 * intensity); i++) {
        particles.push({
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 80 + Math.random() * 40,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -0.2 - Math.random() * 0.3,
          opacity: 0.03 * intensity,
          type: "circle",
          color: "#E8330A",
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    }

    // Skills/About section (20-45%)
    if (progress >= 0.2 && progress < 0.45) {
      const intensity = progress < 0.3 ? (progress - 0.2) / 0.1 : progress < 0.4 ? 1 : 1 - (progress - 0.4) / 0.05;
      for (let i = 0; i < Math.floor(10 * intensity); i++) {
        particles.push({
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 15 + Math.random() * 10,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: 0.04 * intensity,
          type: "hexagon",
          color: Math.random() > 0.5 ? "#D97706" : "#4A7C59",
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    }

    // Projects section (45-65%)
    if (progress >= 0.45 && progress < 0.65) {
      const intensity = progress < 0.5 ? (progress - 0.45) / 0.05 : progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.05;
      for (let i = 0; i < Math.floor(8 * intensity); i++) {
        particles.push({
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 30 + Math.random() * 20,
          speedX: 0.5 + Math.random() * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: 0.03 * intensity,
          type: "rect",
          color: "#2E78B5",
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    }

    // Experience/Certs section (65-85%)
    if (progress >= 0.65 && progress < 0.85) {
      const intensity = progress < 0.7 ? (progress - 0.65) / 0.05 : progress < 0.8 ? 1 : 1 - (progress - 0.8) / 0.05;
      for (let i = 0; i < Math.floor(12 * intensity); i++) {
        particles.push({
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 4 + Math.random() * 4,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: 0.05 * intensity,
          type: "circle",
          color: "#E8330A",
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    }

    // Contact section (85-100%)
    if (progress >= 0.85) {
      const intensity = (progress - 0.85) / 0.15;
      const colors = ["#E8330A", "#D97706", "#2E78B5", "#4A7C59"];
      for (let i = 0; i < Math.floor(15 * intensity); i++) {
        const types: Particle["type"][] = ["circle", "hexagon", "rect"];
        particles.push({
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 10 + Math.random() * 30,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: 0.04 * intensity,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    }

    return particles.slice(0, maxParticles);
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    switch (p.type) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "hexagon":
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const x = Math.cos(angle) * p.size / 2;
          const y = Math.sin(angle) * p.size / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case "rect":
        const radius = 6;
        const w = p.size;
        const h = p.size * 0.7;
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, radius);
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let currentParticles: Particle[] = [];

    function animate() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "rgba(8, 8, 8, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const targetParticles = getParticlesForSection(scrollProgressRef.current);

      currentParticles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.size) p.x = canvas!.width + p.size;
        if (p.x > canvas!.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas!.height + p.size;
        if (p.y > canvas!.height + p.size) p.y = -p.size;

        if (index >= targetParticles.length) {
          p.opacity *= 0.95;
        }

        if (p.opacity > 0.01) {
          drawParticle(ctx, p);
        }
      });

      while (currentParticles.length < targetParticles.length && currentParticles.length < 40) {
        currentParticles.push(targetParticles[currentParticles.length]);
      }

      currentParticles = currentParticles.filter((p) => p.opacity > 0.01);

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  if (!isMounted || isMobile || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
}