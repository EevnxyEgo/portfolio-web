"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// ── Skill Data ─────────────────────────────────────────────────────────────────
interface Skill {
  id: string;
  name: string;
  category: "ml" | "backend" | "frontend" | "tools";
  icon: string;
  color: string;
  level: number; // 1-5
  description: string;
  techs: { name: string; level: number }[];
}

const skills: Skill[] = [
  {
    id: "ml",
    name: "Machine Learning",
    category: "ml",
    icon: "brain",
    color: "#00ff88",
    level: 4,
    description: "Training models that go to production",
    techs: [
      { name: "TensorFlow", level: 4 },
      { name: "PyTorch", level: 3 },
      { name: "OpenCV", level: 4 },
      { name: "MLKit", level: 4 },
      { name: "Keras", level: 4 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    category: "backend",
    icon: "server",
    color: "#00d4ff",
    level: 3,
    description: "APIs and systems that scale",
    techs: [
      { name: "Python", level: 4 },
      { name: "Node.js", level: 3 },
      { name: "Flask", level: 4 },
      { name: "FastAPI", level: 3 },
      { name: "PostgreSQL", level: 3 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    category: "frontend",
    icon: "layout",
    color: "#a855f7",
    level: 3,
    description: "Interfaces that feel alive",
    techs: [
      { name: "React", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Framer Motion", level: 3 },
      { name: "Tailwind", level: 4 },
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    category: "tools",
    icon: "wrench",
    color: "#fb923c",
    level: 3,
    description: "The whole pipeline",
    techs: [
      { name: "Docker", level: 3 },
      { name: "Git", level: 4 },
      { name: "AWS", level: 2 },
      { name: "Vercel", level: 4 },
      { name: "GitHub Actions", level: 3 },
    ],
  },
];

// ── SVG Icons ───────────────────────────────────────────────────────────────────
const Icons = {
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  ),
  server: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  ),
  layout: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  ),
  wrench: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  ),
};

// ── Pixel Character ─────────────────────────────────────────────────────────────
function PixelCharacter({ isHovering, activeSkill }: { isHovering: boolean; activeSkill: string | null }) {
  const [frame, setFrame] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 600);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const lookDirection = activeSkill === "ml" ? -1 : activeSkill === "frontend" ? 1 : 0;

  return (
    <motion.div
      className="relative w-32 h-40"
      animate={{
        y: [0, -3, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Shadow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full"
        style={{
          background: "rgba(0,0,0,0.4)",
          transform: `translateX(-50%) scale(${1 + (frame % 2) * 0.1})`,
          filter: "blur(4px)",
        }}
      />

      {/* Body */}
      <svg viewBox="0 0 64 80" className="w-full h-full">
        {/* Lab coat */}
        <rect x="16" y="32" width="32" height="28" fill="#f0f0f0" />
        <rect x="14" y="32" width="4" height="28" fill="#e0e0e0" />
        <rect x="46" y="32" width="4" height="28" fill="#e0e0e0" />

        {/* Head */}
        <rect x="20" y="8" width="24" height="24" fill="#ffcc99" />

        {/* Hair */}
        <rect x="18" y="4" width="28" height="8" fill="#2a2a2a" />
        <rect x="16" y="8" width="4" height="8" fill="#2a2a2a" />
        <rect x="44" y="8" width="4" height="8" fill="#2a2a2a" />

        {/* Eyes */}
        <rect x="24" y="16" width="4" height={isHovering ? 6 : 4} fill="#2a2a2a">
          {isHovering && (
            <animate attributeName="y" values="16;14;16" dur="0.5s" repeatCount="indefinite" />
          )}
        </rect>
        <rect x="36" y={16 + (lookDirection === -1 ? -2 : lookDirection === 1 ? 2 : 0)} width="4" height={isHovering ? 6 : 4} fill="#2a2a2a" />

        {/* Mouth - slight smile */}
        <rect x="28" y="26" width="8" height="2" fill={isHovering ? "#ff6b6b" : "#cc9999"} rx="1" />

        {/* Glasses */}
        <rect x="22" y="14" width="8" height="6" fill="none" stroke="#333" strokeWidth="1" rx="1" />
        <rect x="34" y="14" width="8" height="6" fill="none" stroke="#333" strokeWidth="1" rx="1" />
        <rect x="30" y="16" width="4" height="1" fill="#333" />

        {/* Arms */}
        <rect x="8" y="36" width="8" height="16" fill="#f0f0f0" rx="2">
          {(isHovering || activeSkill) && (
            <animate attributeName="y" values="36;34;36" dur="1s" repeatCount="indefinite" />
          )}
        </rect>
        <rect x="48" y="36" width="8" height="16" fill="#f0f0f0" rx="2">
          {(isHovering || activeSkill) && (
            <animate attributeName="y" values="36;34;36" dur="1s" repeatCount="indefinite" />
          )}
        </rect>

        {/* Hands */}
        <circle cx="12" cy="54" r="4" fill="#ffcc99" />
        <circle cx="52" cy="54" r="4" fill="#ffcc99" />

        {/* Name tag */}
        <rect x="24" y="38" width="16" height="8" fill="var(--color-primary)" rx="1" />
        <text x="32" y="44" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace">AA</text>
      </svg>
    </motion.div>
  );
}

// ── Lab Machine: Server Rack ──────────────────────────────────────────────────────
function ServerRack() {
  const [blinkIndex, setBlinkIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkIndex((i) => (i + 1) % 5);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-20 h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Server lights */}
      <div className="absolute top-2 left-2 right-2 space-y-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: blinkIndex === i ? "#00ff88" : "#004d1a",
                boxShadow: blinkIndex === i ? "0 0 6px #00ff88" : "none",
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: (blinkIndex + i) % 3 === 0 ? "#00ff88" : "#004d1a",
                boxShadow: (blinkIndex + i) % 3 === 0 ? "0 0 6px #00ff88" : "none",
              }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
          </div>
        ))}
      </div>

      {/* Vent */}
      <div className="absolute bottom-3 left-2 right-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-0.5 bg-gray-700 mb-1" />
        ))}
      </div>

      {/* Status light */}
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    </div>
  );
}

// ── Lab Machine: Monitor ─────────────────────────────────────────────────────────
function Monitor({ activeSkill }: { activeSkill: string | null }) {
  return (
    <div className="relative">
      {/* Monitor frame */}
      <div className="w-24 h-18 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden">
        {/* Screen */}
        <div
          className="w-full h-full p-2"
          style={{ background: "#0a1628" }}
        >
          {/* Code lines - static widths for idempotent render */}
          <div className="space-y-1">
            {[
              { word: "const", width: 60 },
              { word: "function", width: 75 },
              { word: "return", width: 50 },
            ].map(({ word, width }) => (
              <motion.div
                key={word}
                className="h-1.5 rounded-sm"
                style={{
                  width: `${width}%`,
                  background: word === "function" && activeSkill ? "#00ff88" : "#4a5568",
                }}
                animate={activeSkill === "frontend" && word === "function" ? {
                  opacity: [0.5, 1, 0.5],
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Cursor */}
          <motion.div
            className="w-2 h-3 bg-white mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Stand */}
      <div className="w-4 h-3 bg-gray-700 mx-auto rounded-b" />
      <div className="w-12 h-1 bg-gray-600 mx-auto rounded" />
    </div>
  );
}

// ── Lab Machine: Training Visualization ─────────────────────────────────────────
function TrainingViz({ activeSkill }: { activeSkill: string | null }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeSkill === "ml") {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 2));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [activeSkill]);

  return (
    <div className="relative w-24 h-24">
      {/* Circular progress */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a2e" strokeWidth="8" />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#00ff88"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={251}
          strokeDashoffset={251 - (progress / 100) * 251}
          style={{ filter: "drop-shadow(0 0 6px #00ff88)" }}
        />
      </svg>

      {/* Percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-mono" style={{ color: "#00ff88" }}>
          {Math.round(progress)}%
        </span>
      </div>

      {/* Label */}
      <div className="absolute -bottom-4 left-0 right-0 text-center">
        <span className="text-[0.6rem] font-mono uppercase" style={{ color: "#00ff88" }}>
          Training
        </span>
      </div>
    </div>
  );
}

// ── Skill Module ────────────────────────────────────────────────────────────────
function SkillModule({
  skill,
  isActive,
  onHover,
  onLeave,
  onClick,
}: {
  skill: Skill;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative p-4 rounded-xl border transition-all duration-300"
        style={{
          background: isActive ? `${skill.color}15` : "var(--color-bg-elevated)",
          borderColor: isActive ? skill.color : "var(--color-border)",
          boxShadow: isActive ? `0 0 30px ${skill.color}30` : "none",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-300"
          style={{
            background: `${skill.color}20`,
            color: skill.color,
            transform: isActive ? "scale(1.1)" : "scale(1)",
          }}
        >
          {Icons[skill.icon as keyof typeof Icons]}
        </div>

        {/* Name */}
        <h4
          className="font-bold text-sm mb-1 transition-colors"
          style={{ color: isActive ? skill.color : "var(--color-text)" }}
        >
          {skill.name}
        </h4>

        {/* Level bars */}
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: "16px",
                background: i < skill.level ? skill.color : "var(--color-border)",
                opacity: i < skill.level ? 1 : 0.3,
              }}
              animate={isActive && i < skill.level ? {
                opacity: [0.5, 1, 0.5],
              } : {}}
              transition={{
                duration: 0.3,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Description */}
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {skill.description}
        </p>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: isActive ? `inset 0 0 20px ${skill.color}20` : "none",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Connector line to center */}
      <div
        className="absolute left-1/2 top-full h-6 w-px"
        style={{
          background: isActive
            ? `linear-gradient(to bottom, ${skill.color}, transparent)`
            : "transparent",
        }}
      />
    </motion.div>
  );
}

// ── Expanded Skill Panel ────────────────────────────────────────────────────────
function ExpandedSkill({
  skill,
  onClose,
}: {
  skill: Skill;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "var(--color-bg-elevated)",
          border: `2px solid ${skill.color}40`,
          boxShadow: `0 0 60px ${skill.color}20`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {Icons.close}
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: `${skill.color}20`,
              color: skill.color,
            }}
          >
            {Icons[skill.icon as keyof typeof Icons]}
          </div>
          <div>
            <h3
              className="text-xl font-bold"
              style={{ color: skill.color, fontFamily: "var(--font-space-grotesk)" }}
            >
              {skill.name}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {skill.description}
            </p>
          </div>
        </div>

        {/* Tech stack grid */}
        <div className="grid grid-cols-2 gap-3">
          {skill.techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: "var(--color-bg)" }}
            >
              <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                {tech.name}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i < tech.level ? skill.color : "var(--color-border)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Level indicator */}
        <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase" style={{ color: "var(--color-text-tertiary)" }}>
              Proficiency
            </span>
            <span className="text-sm font-bold" style={{ color: skill.color }}>
              {skill.level}/5
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--color-bg)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: skill.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(skill.level / 5) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────────
export function LabSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeSkillData = skills.find((s) => s.id === activeSkill);

  return (
    <section
      id="skills"
      className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text-tertiary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-tertiary) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,51,10,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-mono uppercase tracking-widest mb-4 block"
            style={{ color: "var(--color-primary)" }}
          >
            Technical Arsenal
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-text)",
            }}
          >
            THE LAB.
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A workspace where ideas become reality. Each skill is a tool in the workshop —
            hover to see it in action, click to explore.
          </p>
        </motion.div>

        {/* Main Lab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 lg:gap-12 items-start">
          {/* LEFT: Pixel Character */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:sticky lg:top-32"
          >
            <div
              className="p-6 rounded-2xl mb-4"
              style={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
              }}
            >
              <PixelCharacter
                isHovering={!!hoveredSkill}
                activeSkill={activeSkill}
              />
            </div>

            <div className="text-center">
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "var(--color-text)" }}
              >
                Arsenius
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Fullstack × ML
              </p>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full" style={{ background: "var(--color-bg-elevated)" }}>
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: "#00ff88" }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono" style={{ color: "#00ff88" }}>
                Online
              </span>
            </div>
          </motion.div>

          {/* CENTER: Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Section title */}
            <div className="flex items-center gap-4 mb-6">
              <h3
                className="text-lg font-bold"
                style={{ color: "var(--color-text)", fontFamily: "var(--font-space-grotesk)" }}
              >
                Experiment Modules
              </h3>
              <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
            </div>

            {/* Skills modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkillModule
                    skill={skill}
                    isActive={hoveredSkill === skill.id}
                    onHover={() => setHoveredSkill(skill.id)}
                    onLeave={() => setHoveredSkill(null)}
                    onClick={() => setActiveSkill(skill.id === activeSkill ? null : skill.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Hint */}
            <p
              className="text-center text-xs mt-6"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Hover to preview • Click to explore full tech stack
            </p>
          </motion.div>

          {/* RIGHT: Lab Machines */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col items-center gap-8 pt-16"
          >
            {/* Server Rack */}
            <div>
              <p
                className="text-[0.6rem] font-mono uppercase mb-2 text-center"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Server Rack
              </p>
              <ServerRack />
            </div>

            {/* Monitor */}
            <div>
              <p
                className="text-[0.6rem] font-mono uppercase mb-2 text-center"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Active Session
              </p>
              <Monitor activeSkill={activeSkill} />
            </div>

            {/* Training Viz */}
            <div>
              <p
                className="text-[0.6rem] font-mono uppercase mb-2 text-center"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                ML Training
              </p>
              <TrainingViz activeSkill={activeSkill} />
            </div>
          </motion.div>
        </div>

        {/* Mobile: Horizontal scroll machines */}
        <div className="lg:hidden flex justify-center gap-8 mt-12 overflow-x-auto pb-4">
          <div className="flex flex-col items-center">
            <p className="text-[0.6rem] font-mono uppercase mb-2" style={{ color: "var(--color-text-tertiary)" }}>
              Server
            </p>
            <ServerRack />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[0.6rem] font-mono uppercase mb-2" style={{ color: "var(--color-text-tertiary)" }}>
              Session
            </p>
            <Monitor activeSkill={activeSkill} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[0.6rem] font-mono uppercase mb-2" style={{ color: "var(--color-text-tertiary)" }}>
              Training
            </p>
            <TrainingViz activeSkill={activeSkill} />
          </div>
        </div>
      </div>

      {/* Expanded Skill Modal */}
      <AnimatePresence>
        {activeSkill && activeSkillData && (
          <ExpandedSkill
            skill={activeSkillData}
            onClose={() => setActiveSkill(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
