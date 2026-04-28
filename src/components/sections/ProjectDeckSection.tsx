"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";

// ── Project Card Data ───────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    slug: "baki",
    title: "BAKI",
    tagline: "AI-powered fitness app with real-time exercise detection",
    category: "ml-ai",
    status: "active",
    year: 2024,
    type: "group",
    featured: true,
    order: 1,
    techStack: ["React Native", "Python", "TensorFlow", "MLKit", "OpenCV"],
    summary: "AI-powered fitness app with real-time exercise detection and form correction.",
    context: "A comprehensive fitness app leveraging computer vision and ML for real-time exercise form analysis.",
    role: "ML Engineer",
    learnings: "Deep learning model training, computer vision optimization, mobile ML deployment.",
    myRole: "ML Engineer",
    impact: "Deployed to 500+ beta users with 85% pose detection accuracy.",
    links: {
      github: "https://github.com/EevnxyEgo/baki",
      demo: "https://baki.app",
    },
  },
  {
    slug: "fitbuddy-ai",
    title: "FitBuddy AI",
    tagline: "Voice AI fitness trainer powered by Gemini",
    category: "fullstack",
    status: "active",
    year: 2024,
    type: "individual",
    featured: true,
    order: 2,
    techStack: ["Next.js", "TypeScript", "Gemini API", "Framer Motion", "Vapi.ai"],
    summary: "Voice AI fitness trainer with real-time feedback and personalized workouts.",
    context: "An innovative voice-powered AI fitness trainer using Gemini for natural conversation.",
    role: "Full-stack Developer",
    learnings: "Voice AI integration, real-time streaming, conversational UI design.",
    myRole: "Full-stack Developer",
    impact: "Featured in ITS innovation showcase.",
    links: {
      github: "https://github.com/EevnxyEgo/fitbuddy-ai",
      demo: "https://fitbuddy-ai.vercel.app",
    },
  },
  {
    slug: "digital-twin-concert",
    title: "Digital Twin Concert",
    tagline: "360° dynamic camera system for virtual K-pop concerts",
    category: "3d",
    status: "active",
    year: 2024,
    type: "group",
    featured: true,
    order: 3,
    techStack: ["Unreal Engine 5", "Python", "OpenCV", "C++"],
    summary: "Real-time 360° camera system for immersive virtual concert experiences.",
    context: "Undergraduate thesis exploring virtual concert experiences using digital twin technology.",
    role: "Research Lead",
    learnings: "360° camera calibration, real-time tracking, immersive media production.",
    myRole: "Research Lead",
    impact: "Part of undergraduate thesis, published in ITS technical journal.",
    links: {
      report: "https://example.com/digital-twin-paper",
    },
  },
  {
    slug: "healthylicious",
    title: "Healthylicious",
    tagline: "ML-powered recipe recommendation system",
    category: "ml-ai",
    status: "active",
    year: 2024,
    type: "group",
    featured: true,
    order: 4,
    techStack: ["TensorFlow", "Python", "Flask", "React", "TensorFlow Recommenders"],
    summary: "Bangkit Academy capstone project: recipe recommendation based on user preferences.",
    context: "Bangkit Academy ML cohort capstone project focusing on personalized recipe recommendations.",
    role: "ML Engineer",
    learnings: "Recommendation systems, TensorFlow Serving, collaborative filtering.",
    myRole: "ML Engineer",
    impact: "Won 'Best Technical Implementation' in Bangkit cohort 2024.",
    links: {
      github: "https://github.com/EevnxyEgo/healthylicious",
      demo: "https://healthylicious.app",
    },
  },
  {
    slug: "41-card-game",
    title: "41 Card Game",
    tagline: "Real-time playing card detection with CNN + OpenCV",
    category: "cv",
    status: "archived",
    year: 2023,
    type: "individual",
    featured: true,
    order: 5,
    techStack: ["Python", "OpenCV", "TensorFlow", "CNN", "Keras"],
    summary: "Computer vision system for real-time card detection and game automation.",
    context: "Personal project exploring computer vision for card game automation.",
    role: "Solo Developer",
    learnings: "CNN architecture design, OpenCV image processing, custom dataset creation.",
    myRole: "Solo Developer",
    impact: "Achieved 96% detection accuracy on 2600+ training images.",
    links: {
      github: "https://github.com/EevnxyEgo/41-card-game",
      report: "https://example.com/41-card-report",
    },
  },
];

// ── Card Gradients ─────────────────────────────────────────────────────────────
const cardGradients: Record<string, string> = {
  "ml-ai": "linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
  "fullstack": "linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 50%, #0f3460 100%)",
  "3d": "linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 50%, #4a1a6b 100%)",
  "cv": "linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 50%, #1a4a3a 100%)",
  "mobile": "linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 50%, #7a4a1a 100%)",
};

const accentColors: Record<string, string> = {
  "ml-ai": "#00ff88",
  "fullstack": "#00d4ff",
  "3d": "#a855f7",
  "cv": "#22d3ee",
  "mobile": "#fb923c",
};

// ── Project Card Component ──────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  totalCards,
  currentIndex,
  isCenter,
  isDimmed,
  onFlip,
  isFlipped,
}: {
  project: Project;
  index: number;
  totalCards: number;
  currentIndex: number;
  isCenter: boolean;
  isDimmed: boolean;
  onFlip: () => void;
  isFlipped: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const offsetX = isCenter ? 0 : index < totalCards / 2
    ? -(totalCards / 2 - index) * 60
    : (index - Math.floor(totalCards / 2)) * 60;

  const scale = isCenter ? 1 : 0.85;
  const opacity = isDimmed ? 0.3 : isCenter ? 1 : 0.6;
  const zIndex = isCenter ? 10 : totalCards - Math.abs(index - currentIndex);

  const accent = accentColors[project.category] || "#00ff88";
  const gradient = cardGradients[project.category] || cardGradients.fullstack;

  return (
    <motion.div
      ref={cardRef}
      className="absolute cursor-pointer"
      style={{
        left: "50%",
        top: "50%",
        x: `calc(-50% + ${offsetX}px)`,
        y: "-50%",
        scale,
        opacity,
        zIndex,
      }}
      initial={false}
      animate={{
        scale: isHovered && isCenter ? 1.02 : scale,
        x: `calc(-50% + ${offsetX}px)`,
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (isCenter) {
          onFlip();
        } else {
          // Side cards will navigate when clicked — coming in a future update
        }
      }}
    >
      <div
        className="relative w-[320px] h-[400px] rounded-2xl overflow-hidden"
        style={{
          background: gradient,
          boxShadow: isCenter
            ? `0 0 60px -20px ${accent}40, 0 25px 50px -12px rgba(0,0,0,0.5)`
            : "0 10px 40px -10px rgba(0,0,0,0.4)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Scan line effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`,
            }}
          />

          {/* Corner accent */}
          <div
            className="absolute top-0 left-0 w-16 h-16"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, transparent 60%)`,
              opacity: 0.15,
            }}
          />

          {/* Category & Year */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span
              className="px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-wider"
              style={{
                background: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}40`,
              }}
            >
              {project.category}
            </span>
            <span
              className="px-2 py-1 rounded text-xs font-mono"
              style={{ background: "rgba(0,0,0,0.4)", color: "#888" }}
            >
              {project.year}
            </span>
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Initials Watermark */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-bold opacity-[0.03] select-none"
              style={{ color: "white", fontFamily: "var(--font-bebas)" }}
            >
              {project.slug.slice(0, 2).toUpperCase()}
            </div>

            {/* Title */}
            <h3
              className="text-2xl font-bold mb-2 tracking-tight"
              style={{
                color: "white",
                fontFamily: "var(--font-space-grotesk)",
                textShadow: `0 0 30px ${accent}40`,
              }}
            >
              {project.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {project.tagline}
            </p>

            {/* Tech Stack */}
            <div className="flex gap-2 flex-wrap mb-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[0.6rem] font-mono"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Hover indicator */}
            <div
              className="flex items-center gap-2 text-xs font-mono"
              style={{ color: accent }}
            >
              <span className="opacity-60">Click to explore</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Glow line at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </div>

        {/* Back Face — Full Project Details */}
        <div
          className="absolute inset-0 rounded-2xl p-5 overflow-y-auto"
          style={{
            background: `linear-gradient(160deg, var(--color-bg-elevated) 0%, ${accent}08 100%)`,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: `1px solid ${accent}30`,
          }}
        >
          {/* Header row: Category + Year + Status */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded-full text-[0.6rem] font-mono uppercase tracking-wider"
                style={{
                  background: `${accent}20`,
                  color: accent,
                  border: `1px solid ${accent}40`,
                }}
              >
                {project.category}
              </span>
              <span
                className="px-2 py-0.5 rounded text-[0.6rem] font-mono"
                style={{ background: "rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.5)" }}
              >
                {project.year}
              </span>
            </div>
            {/* Status pill */}
            <span
              className="px-2 py-0.5 rounded-full text-[0.55rem] font-mono"
              style={{
                background: project.status === "active" ? "rgba(74,197,94,0.15)" : project.status === "archived" ? "rgba(156,163,175,0.15)" : "rgba(234,179,8,0.15)",
                color: project.status === "active" ? "#4ade80" : project.status === "archived" ? "#9ca3af" : "#eab308",
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Title + Tagline */}
          <h3
            className="text-base font-bold mb-1"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-bebas)",
              letterSpacing: "0.05em",
              textShadow: `0 0 20px ${accent}30`,
            }}
          >
            {project.title}
          </h3>
          <p className="text-[0.7rem] leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>
            {project.tagline}
          </p>

          {/* Overview section */}
          <div className="mb-2">
            <span className="text-[0.55rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
              Overview
            </span>
            <p className="text-[0.72rem] leading-relaxed mt-0.5 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
              {project.summary}
            </p>
          </div>

          {/* My Role section */}
          <div className="mb-2">
            <span className="text-[0.55rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
              My Role
            </span>
            <p className="text-[0.72rem] leading-relaxed mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              {project.myRole}
            </p>
          </div>

          {/* Impact section */}
          <div className="mb-3">
            <span className="text-[0.55rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
              Impact
            </span>
            <p className="text-[0.72rem] leading-relaxed mt-0.5" style={{ color: "var(--color-text)" }}>
              {project.impact}
            </p>
          </div>

          {/* Tech Stack — ALL pills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[0.55rem] font-mono"
                style={{
                  background: `${accent}15`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Full link */}
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center justify-center gap-1 w-full py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              background: accent,
              color: "var(--color-text-inverse)",
            }}
          >
            View Full →
          </Link>

          {/* Back hint */}
          <div className="text-center mt-2 text-[0.55rem]" style={{ color: "var(--color-text-tertiary)" }}>
            ← Click card to flip back
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────────
export function ProjectDeckSection() {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(projects.length / 2));
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const exploredCount = flippedCards.size;
  const totalCards = projects.length;

  const handleFlip = useCallback((slug: string) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const navigateCard = useCallback((direction: "left" | "right") => {
    setFlippedCards(new Set()); // Reset flips when navigating
    setCurrentIndex((prev) => {
      if (direction === "left" && prev > 0) return prev - 1;
      if (direction === "right" && prev < projects.length - 1) return prev + 1;
      return prev;
    });
  }, []);

  return (
    <section id="projects" className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,51,10,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono uppercase tracking-widest mb-3 block"
              style={{ color: "var(--color-primary)" }}
            >
              Things I&apos;ve built
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-text)",
              }}
            >
              Projects.
            </motion.h2>
          </div>

          {/* Stats & Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div
                className="px-4 py-2 rounded-full"
                style={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className="font-mono text-sm">
                  <span style={{ color: "var(--color-primary)", fontWeight: "bold" }}>{exploredCount}</span>
                  <span style={{ color: "var(--color-text-tertiary)" }}> / {totalCards}</span>
                  <span className="ml-2" style={{ color: "var(--color-text-secondary)" }}>explored</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateCard("left")
                }}
                disabled={currentIndex === 0}
                className="p-3 rounded-xl disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} style={{ color: "var(--color-text)" }} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateCard("right")
                }}
                disabled={currentIndex === projects.length - 1}
                className="p-3 rounded-xl disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Next project"
              >
                <ChevronRight size={20} style={{ color: "var(--color-text)" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Card Deck */}
        <div
          className="relative flex items-center justify-center py-12"
          style={{ minHeight: "480px" }}
          onClick={() => setFlippedCards(new Set())}
        >
          {projects.map((project, index) => {
            const isCenter = index === currentIndex;
            const isDimmed = Math.abs(index - currentIndex) > 2;

            return (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                totalCards={projects.length}
                currentIndex={currentIndex}
                isCenter={isCenter}
                isDimmed={isDimmed}
                onFlip={() => handleFlip(project.slug)}
                isFlipped={flippedCards.has(project.slug)}
              />
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFlippedCards(new Set());
                setCurrentIndex(index);
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: index === currentIndex
                  ? "var(--color-primary)"
                  : "var(--color-border)",
                transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* All explored celebration */}
        <AnimatePresence>
          {exploredCount === totalCards && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-12"
            >
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), #ff6b35)",
                  color: "white",
                }}
              >
                <span className="text-xl">🎉</span>
                <span className="font-medium">You&apos;ve explored all my work!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden mt-12 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 -mx-6 px-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex-shrink-0 w-[280px] snap-center rounded-xl p-5"
              style={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-0.5 rounded text-[0.6rem] font-mono uppercase"
                  style={{
                    background: `${accentColors[project.category] || "#00ff88"}20`,
                    color: accentColors[project.category] || "#00ff88",
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs font-mono" style={{ color: "var(--color-text-tertiary)" }}>
                  {project.year}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                {project.title}
              </h3>
              <p className="text-sm line-clamp-2 mb-3" style={{ color: "var(--color-text-secondary)" }}>
                {project.tagline}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[0.6rem] font-mono"
                    style={{
                      background: "var(--color-bg)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            View all projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
