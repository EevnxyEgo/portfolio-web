"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui";
import { SplitText } from "@/components/shared/SplitText";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const prefersReduced = useReducedMotion();

  const statusColors = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    dev: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  const categoryLabels = {
    "ml-ai": "ML/AI",
    fullstack: "Fullstack",
    "3d": "3D / Creative Tech",
    cv: "Computer Vision",
    mobile: "Mobile",
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-12">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            <Badge variant="outline" className={statusColors[project.status]}>
              {project.status}
            </Badge>
            <Badge variant="outline" className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
              {categoryLabels[project.category]}
            </Badge>
            <Badge variant="outline" className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20">
              {project.year}
            </Badge>
          </motion.div>

          <h1 className="text-display font-display mb-4">
            <SplitText text={project.title} />
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] font-heading">
            {project.tagline}
          </p>
        </header>

        {/* Links */}
        {project.links && Object.values(project.links).some(Boolean) && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
              >
                <FaGithub size={16} />
                <span className="text-sm">View Code</span>
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-glow)] transition-colors"
              >
                <ExternalLink size={16} />
                <span className="text-sm">Live Demo</span>
              </a>
            )}
            {project.links.report && (
              <a
                href={project.links.report}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
              >
                <FileText size={16} />
                <span className="text-sm">Report</span>
              </a>
            )}
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Summary */}
            <section>
              <h2 className="text-h3 font-heading mb-4">Overview</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.summary}
              </p>
            </section>

            {/* My Role */}
            <section>
              <h2 className="text-h3 font-heading mb-4">My Role</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.myRole}
              </p>
            </section>

            {/* Impact */}
            <section>
              <h2 className="text-h3 font-heading mb-4">Impact</h2>
              <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-[var(--color-text-primary)] leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </section>

            {/* Learnings */}
            <section>
              <h2 className="text-h3 font-heading mb-4">Key Learnings</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.learnings}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Context */}
            <div>
              <h3 className="text-sm font-heading uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
                Context
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {project.context}
              </p>
            </div>

            {/* Role */}
            <div>
              <h3 className="text-sm font-heading uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
                My Role
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {project.role}
              </p>
            </div>

            {/* Type */}
            <div>
              <h3 className="text-sm font-heading uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
                Type
              </h3>
              <Badge variant="outline" className="capitalize">
                {project.type}
              </Badge>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-heading uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.techStack || []).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}