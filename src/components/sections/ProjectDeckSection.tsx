"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProjectModal } from "@/components/ui/ProjectModal";
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
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const accent = accentColors[project.category] || "#00ff88";
  const gradient =
    cardGradients[project.category] || cardGradients.fullstack;

  return (
    <motion.div
      className="relative cursor-pointer rounded-2xl overflow-hidden"
      style={{ aspectRatio: "3/4", background: gradient }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        className="absolute top-0 left-0 w-20 h-20"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, transparent 60%)`,
          opacity: 0.15,
        }}
      />

      {/* Badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <span
          className="px-2.5 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-wider"
          style={{
            background: `${accent}20`,
            color: accent,
            border: `1px solid ${accent}40`,
          }}
        >
          {project.category}
        </span>
        <span
          className="px-2 py-0.5 rounded text-xs font-mono"
          style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.5)" }}
        >
          {project.year}
        </span>
      </div>

      {/* Initials Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-bold opacity-[0.04] select-none pointer-events-none"
        style={{ color: "white", fontFamily: "var(--font-bebas)" }}
      >
        {project.slug.slice(0, 2).toUpperCase()}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className="text-3xl font-bold mb-1 tracking-tight"
          style={{
            fontFamily: "var(--font-bebas)",
            color: "white",
            textShadow: `0 0 30px ${accent}40`,
          }}
        >
          {project.title}
        </h3>

        <AnimatePresence>
          {isHovered && (
            <motion.p
              className="text-sm mb-3 line-clamp-2"
              style={{ color: "rgba(255,255,255,0.8)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.tagline}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[0.55rem] font-mono"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover indicator */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="flex items-center gap-2 text-xs font-mono mt-3"
              style={{ color: accent }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <span>Explore project</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glow line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────────
export function ProjectDeckSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,51,10,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
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

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
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
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
