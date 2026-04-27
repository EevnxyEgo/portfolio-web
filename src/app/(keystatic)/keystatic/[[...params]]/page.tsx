"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FileText, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockProjects = [
  { title: "BAKI", slug: "baki", category: "ml-ai" },
  { title: "FitBuddy AI", slug: "fitbuddy-ai", category: "fullstack" },
  { title: "Digital Twin Concert", slug: "digital-twin-concert", category: "3d" },
  { title: "Healthylicious", slug: "healthylicious", category: "ml-ai" },
  { title: "41-Card Game", slug: "41-card-game", category: "cv" },
];

const mockCerts = [
  { title: "Bangkit Academy ML Certificate", category: "ml-ai" },
  { title: "TensorFlow Developer Certificate", category: "ml-ai" },
  { title: "GCP Fundamentals", category: "cloud" },
  { title: "ITS Computer Engineering Degree", category: "academic" },
];

export default function KeystaticPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"projects" | "certifications">("projects");

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-[var(--color-primary)]">
              Content Manager
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Manage portfolio content via YAML files
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading text-sm transition-colors ${
              activeTab === "projects"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
            }`}
          >
            <FileText size={16} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading text-sm transition-colors ${
              activeTab === "certifications"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
            }`}
          >
            <Award size={16} />
            Certifications
          </button>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-primary)]/30">
          <p className="text-sm text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-primary)] font-medium">Content Management:</span> Edit YAML files directly in <code className="bg-[var(--color-bg)] px-2 py-0.5 rounded text-xs">src/content/</code> directory. Run <code className="bg-[var(--color-bg)] px-2 py-0.5 rounded text-xs">npm run dev</code> and open <a href="http://localhost:3000/keystatic" className="text-[var(--color-primary)] underline">localhost:3000/keystatic</a> to access the visual editor.
          </p>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl">Projects</h2>
              <Link
                href="https://github.com/EevnxyEgo/arsenius-portfolio/edit/main/src/content/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
              >
                <ExternalLink size={14} />
                Edit on GitHub
              </Link>
            </div>
            <div className="grid gap-4">
              {mockProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  <div>
                    <h3 className="font-heading text-lg">{project.title}</h3>
                    <span className="text-sm text-[var(--color-text-tertiary)] font-mono">
                      src/content/projects/{project.slug}.yaml
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                      {project.category}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="p-2 rounded hover:bg-[var(--color-bg)] transition-colors"
                    >
                      <ExternalLink size={16} className="text-[var(--color-text-secondary)]" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === "certifications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl">Certifications</h2>
              <Link
                href="https://github.com/EevnxyEgo/arsenius-portfolio/edit/main/src/content/certifications"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
              >
                <ExternalLink size={14} />
                Edit on GitHub
              </Link>
            </div>
            <div className="grid gap-4">
              {mockCerts.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  <div>
                    <h3 className="font-heading text-lg">{cert.title}</h3>
                    <span className="text-sm text-[var(--color-text-tertiary)] font-mono">
                      src/content/certifications/*.yaml
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                      {cert.category}
                    </span>
                    <button className="p-2 rounded hover:bg-[var(--color-bg)] transition-colors">
                      <ExternalLink size={16} className="text-[var(--color-text-secondary)]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          <Link
            href="/projects"
            className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
          >
            <FileText size={24} className="text-[var(--color-primary)] mb-3" />
            <h3 className="font-heading text-lg mb-1">View Projects</h3>
            <p className="text-sm text-[var(--color-text-tertiary)]">Browse all portfolio projects</p>
          </Link>
          <Link
            href="/certifications"
            className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            <Award size={24} className="text-[var(--color-accent)] mb-3" />
            <h3 className="font-heading text-lg mb-1">View Certifications</h3>
            <p className="text-sm text-[var(--color-text-tertiary)]">Browse all certificates</p>
          </Link>
          <Link
            href="/"
            className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-secondary)] transition-colors"
          >
            <ExternalLink size={24} className="text-[var(--color-text-secondary)] mb-3" />
            <h3 className="font-heading text-lg mb-1">Homepage</h3>
            <p className="text-sm text-[var(--color-text-tertiary)]">Return to portfolio site</p>
          </Link>
        </div>
      </main>
    </div>
  );
}