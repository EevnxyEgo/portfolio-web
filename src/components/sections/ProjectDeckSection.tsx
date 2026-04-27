"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Link from "next/link";
import { ExternalLink, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
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

// ── Card Colors ────────────────────────────────────────────────────────────────
const cardGradients: Record<string, string> = {
  "ml-ai": "linear-gradient(135deg, #E8330A 0%, #D97706 50%, #78350F 100%)",
  "fullstack": "linear-gradient(135deg, #1E3A5F 0%, #2E5A8B 50%, #0D1B2A 100%)",
  "3d": "linear-gradient(135deg, #4A1A7A 0%, #7B2D8E 50%, #2D0A4E 100%)",
  "cv": "linear-gradient(135deg, #1A4A3A 0%, #2D7A5A 50%, #0A2A1A 100%)",
  "mobile": "linear-gradient(135deg, #7A4A1A 0%, #B87A2D 50%, #4A2A0A 100%)",
};

// ── Card Component ────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  totalCards,
  isCenter,
  isDimmed,
  onFlip,
  isFlipped,
}: {
  project: Project;
  index: number;
  totalCards: number;
  isCenter: boolean;
  isDimmed: boolean;
  onFlip: () => void;
  isFlipped: boolean;
}) {
  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  }));

  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      if (down) {
        api.start({
          x: mx,
          y: my,
          scale: 1.05,
        });
      } else {
        if (Math.abs(mx) > 150 || Math.abs(my) > 150) {
          api.start({
            x: mx * 3,
            y: my * 3,
            scale: 0.8,
            opacity: 0,
          });
        } else {
          api.start({
            x: 0,
            y: 0,
            scale: 1,
            opacity: isDimmed ? 0.6 : 1,
          });
        }
      }
    },
    {
      from: () => [spring.x.get(), spring.y.get()],
    }
  );

  const rotation = isCenter ? 0 : index < totalCards / 2 ? -(totalCards - index) * 4 : (index - Math.floor(totalCards / 2)) * 4;
  const offsetX = isCenter ? 0 : index < totalCards / 2 ? -(totalCards / 2 - index) * 80 : (index - Math.floor(totalCards / 2)) * 80;

  const gradient = cardGradients[project.category] || cardGradients.fullstack;

  return (
    <animated.div
      {...bind()}
      style={{
        x: spring.x,
        y: spring.y,
        scale: spring.scale,
        opacity: spring.opacity,
        touchAction: "none",
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: `calc(-50% + ${offsetX}px)`,
        translateY: "-50%",
        rotate: rotation,
        cursor: "grab",
      }}
      className="w-[300px] h-[420px] rounded-2xl"
      onClick={() => {
          if (Math.abs(spring.x.get()) < 10 && Math.abs(spring.y.get()) < 10) {
            onFlip();
          }
        }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: gradient,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Large initials watermark */}
          <div
            className="absolute top-8 left-8 text-8xl font-display opacity-10 select-none"
            style={{ color: "white" }}
          >
            {project.slug.slice(0, 2).toUpperCase()}
          </div>

          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Category badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono uppercase"
            style={{
              background: "rgba(0,0,0,0.4)",
              color: "white",
              backdropFilter: "blur(4px)",
            }}
          >
            {project.category}
          </div>

          {/* Year badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: "rgba(0,0,0,0.4)",
              color: "white",
              backdropFilter: "blur(4px)",
            }}
          >
            {project.year}
          </div>

          {/* Bottom info */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6"
            style={{
              background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            }}
          >
            <h3 className="text-xl font-heading text-white mb-2">{project.title}</h3>
            <p className="text-sm text-white/70 mb-4 line-clamp-2">{project.tagline}</p>

            {/* Tech stack */}
            <div className="flex gap-2 flex-wrap">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[0.65rem] font-mono"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-4 right-4 text-xs text-white/50 font-mono">
              click to flip →
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6"
          style={{
            background: "var(--color-bg-elevated)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 className="text-xl font-serif italic mb-4" style={{ color: "var(--color-text)" }}>
            {project.title}
          </h3>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">
                My Role
              </span>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                {project.myRole}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">
                Impact
              </span>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                {project.impact}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">
                Tech Stack
              </span>
              <div className="flex gap-2 flex-wrap mt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[0.65rem] font-mono"
                    style={{
                      background: "var(--color-primary)",
                      color: "white",
                      opacity: 0.8,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
                style={{ background: "var(--color-bg)" }}
              >
                <FaGithub size={18} className="text-[var(--color-text-secondary)]" />
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
                style={{ background: "var(--color-bg)" }}
              >
                <ExternalLink size={18} className="text-[var(--color-text-secondary)]" />
              </a>
            )}
            {project.links?.report && (
              <a
                href={project.links.report}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
                style={{ background: "var(--color-bg)" }}
              >
                <FileText size={18} className="text-[var(--color-text-secondary)]" />
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="ml-auto px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: "var(--color-primary)",
                color: "white",
              }}
            >
              View →
            </Link>
          </div>

          {/* Back hint */}
          <div className="absolute bottom-4 left-4 text-xs text-[var(--color-text-tertiary)] font-mono">
            ← Back
          </div>
        </div>
      </motion.div>
    </animated.div>
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
    setCurrentIndex((prev) => {
      if (direction === "left" && prev > 0) return prev - 1;
      if (direction === "right" && prev < projects.length - 1) return prev + 1;
      return prev;
    });
  }, []);

  return (
    <section id="projects" className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="section-eyebrow block mb-2">Things I&apos;ve built</span>
            <h2 className="text-h2 font-serif" style={{ fontFamily: "var(--font-serif)" }}>
              Projects.
            </h2>
          </div>

          {/* Exploration counter */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full border" style={{ borderColor: "var(--color-border)" }}>
              <span className="font-mono text-sm">
                <span style={{ color: "var(--color-primary)" }}>{exploredCount}</span>
                <span className="text-[var(--color-text-tertiary)]"> / {totalCards}</span>
                <span className="text-[var(--color-text-secondary)] ml-2">explored</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateCard("left")}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg disabled:opacity-30"
                style={{ background: "var(--color-bg-elevated)" }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigateCard("right")}
                disabled={currentIndex === projects.length - 1}
                className="p-2 rounded-lg disabled:opacity-30"
                style={{ background: "var(--color-bg-elevated)" }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Deck */}
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: "500px" }}
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
                isCenter={isCenter}
                isDimmed={isDimmed}
                onFlip={() => handleFlip(project.slug)}
                isFlipped={flippedCards.has(project.slug)}
              />
            );
          })}
        </div>

        {/* All explored celebration */}
        <AnimatePresence>
          {exploredCount === totalCards && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                }}
              >
                <span className="text-lg">🎉</span>
                <span className="font-medium">You&apos;ve explored all my work!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden mt-8 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="flex-shrink-0 w-[280px] snap-center p-6 rounded-xl border"
              style={{
                background: "var(--color-bg-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <span className="text-xs font-mono text-[var(--color-primary)] uppercase">
                {project.category}
              </span>
              <h3 className="text-lg font-heading mt-2" style={{ color: "var(--color-text)" }}>
                {project.title}
              </h3>
              <p className="text-sm mt-2 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                {project.tagline}
              </p>
              <div className="flex gap-2 flex-wrap mt-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[0.65rem] font-mono"
                    style={{
                      background: "var(--color-bg)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            View all projects
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}