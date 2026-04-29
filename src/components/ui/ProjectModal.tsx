"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GitBranch, ExternalLink, FileText } from "lucide-react";
import type { Project } from "@/types/project";

const accentColors: Record<string, string> = {
  "ml-ai": "#00ff88",
  "fullstack": "#00d4ff",
  "3d": "#a855f7",
  "cv": "#22d3ee",
  "mobile": "#fb923c",
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const accent = project ? (accentColors[project.category] || "#00ff88") : "#00ff88";

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            style={{
              background: "var(--color-bg-elevated)",
              maxHeight: "90vh",
              borderTop: `2px solid ${accent}40`,
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close bar */}
            <div className="flex justify-center pt-3 pb-1">
              <button
                onClick={onClose}
                className="w-12 h-1.5 rounded-full transition-colors"
                style={{ background: "var(--color-border)" }}
                aria-label="Close"
              />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 pb-10" style={{ maxHeight: "calc(90vh - 24px)" }}>
              {/* Header row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-[0.7rem] font-mono uppercase tracking-wider"
                    style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs font-mono"
                    style={{ background: "rgba(0,0,0,0.3)", color: "var(--color-text-tertiary)" }}
                  >
                    {project.year}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[0.6rem] font-mono"
                    style={{
                      background: project.status === "active" ? "rgba(74,197,94,0.15)" : "rgba(156,163,175,0.15)",
                      color: project.status === "active" ? "#4ade80" : "#9ca3af",
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full transition-colors hover:bg-[var(--color-border)]"
                  aria-label="Close"
                >
                  <X size={18} style={{ color: "var(--color-text-secondary)" }} />
                </button>
              </div>

              {/* Title */}
              <h2
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-bebas)",
                  color: "var(--color-text)",
                  textShadow: `0 0 40px ${accent}20`,
                }}
              >
                {project.title}
              </h2>
              <p className="text-base mb-6" style={{ color: "var(--color-text-secondary)" }}>
                {project.tagline}
              </p>

              {/* Video embed area — placeholder ready for future video */}
              <div
                className="w-full rounded-xl mb-6 flex items-center justify-center"
                style={{
                  aspectRatio: "16/9",
                  background: `linear-gradient(135deg, ${accent}10, ${accent}05)`,
                  border: `1px dashed ${accent}30`,
                }}
              >
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🎬</span>
                  <span className="font-mono text-[0.7rem]" style={{ color: "var(--color-text-tertiary)" }}>
                    Video embed — ready for future content
                  </span>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-5">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                  Overview
                </span>
                <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  {project.summary}
                </p>
              </div>

              {/* My Role */}
              <div className="mb-5">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                  My Role
                </span>
                <p className="text-sm mt-1" style={{ color: "var(--color-text)" }}>
                  {project.myRole}
                </p>
              </div>

              {/* Impact */}
              <div className="mb-5">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                  Impact
                </span>
                <p className="text-sm mt-1" style={{ color: "var(--color-text)" }}>
                  {project.impact}
                </p>
              </div>

              {/* Context (if exists) */}
              {project.context && (
                <div className="mb-5">
                  <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                    Context
                  </span>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--color-text-secondary)" }}>
                    {project.context}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-5">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-[0.7rem] font-mono"
                      style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documentation — placeholder */}
              <div className="mb-5">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                  Documentation
                </span>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                  Documentation — ready for your detailed writeup
                </p>
              </div>

              {/* Links */}
              <div className="mb-6">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{ color: accent }}>
                  Links
                </span>
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                      style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      <GitBranch size={14} />
                      GitHub
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                      style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                  {project.links.report && (
                    <a
                      href={project.links.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                      style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      <FileText size={14} />
                      Report
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}