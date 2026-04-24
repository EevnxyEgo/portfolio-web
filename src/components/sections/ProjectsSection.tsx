"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const projects = [
  {
    slug: "baki",
    title: "BAKI",
    tagline: "AI-powered fitness app that counts your reps in real time",
    category: "ml-ai",
    year: "2024",
    featured: true,
    image: "/images/projects/baki.jpg",
    techStack: ["Kotlin", "TensorFlow", "OpenCV", "MLKit"],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: "fitbuddy-ai",
    title: "FitBuddy AI",
    tagline: "Voice AI fitness trainer — talk to your workout plan",
    category: "fullstack",
    year: "2024",
    featured: true,
    image: "/images/projects/fitbuddy-ai.jpg",
    techStack: ["Next.js", "TypeScript", "Gemini API", "vapi.ai"],
    links: {
      github: "https://github.com/EevnxyEgo/FitBuddyAI",
      demo: null,
    },
  },
  {
    slug: "digital-twin-concert",
    title: "Digital Twin Concert",
    tagline: "360° dynamic camera system for a virtual music concert",
    category: "3d",
    year: "2024",
    featured: false,
    image: "/images/projects/digital-twin-concert.jpg",
    techStack: ["Unreal Engine 5", "Blender", "MetaHuman"],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: "healthylicious",
    title: "Healthylicious",
    tagline: "Smart recipe recommendations tailored to your ingredients and diet",
    category: "ml-ai",
    year: "2024",
    featured: false,
    image: "/images/projects/healthylicious.jpg",
    techStack: ["Python", "TensorFlow Recommenders", "GCP"],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: "41-card-game",
    title: "41-Card Game",
    tagline: "Play cards with your webcam — real-time CNN card detection",
    category: "cv",
    year: "2023",
    featured: false,
    image: "/images/projects/41-card-game.jpg",
    techStack: ["Python", "TensorFlow", "OpenCV", "CNN"],
    links: {
      github: null,
      demo: null,
    },
  },
];

const categoryColors = {
  "ml-ai": "accent" as const,
  fullstack: "primary" as const,
  "3d": "primary" as const,
  cv: "default" as const,
};

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
            Things I&apos;ve Built
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mt-2">
            PROJECTS
          </h2>
          <p className="text-[var(--color-text-secondary)] text-body-lg mt-4 max-w-2xl mx-auto">
            A selection of projects at the intersection of web, AI, and engineering
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* Featured projects span 2 cols or rows */}
          {projects.map((project, index) => {
            const isFeatured = project.featured;
            const isLarge = isFeatured && index < 2;

            return (
              <motion.div
                key={project.slug}
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={cn(
                  "group relative overflow-hidden rounded-lg",
                  "border border-[var(--color-border)]",
                  "transition-all duration-300",
                  "hover:border-[var(--color-border-bright)]",
                  isLarge ? "md:col-span-2 lg:row-span-2" : "",
                  "bg-[var(--color-bg)]"
                )}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block h-full w-full"
                >
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-[var(--color-bg-elevated)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-4xl text-[var(--color-text-tertiary)]">
                        {project.title}
                      </span>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t",
                      "from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent",
                      "opacity-80 group-hover:opacity-60"
                    )}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category badge */}
                    <motion.div
                      initial={prefersReduced ? {} : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="mb-3"
                    >
                      <Badge
                        variant={categoryColors[project.category as keyof typeof categoryColors]}
                        size="sm"
                      >
                        {project.category.toUpperCase().replace("-", " / ")}
                      </Badge>
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Tech stack & links */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 overflow-hidden">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="p-2 bg-[var(--color-bg)]/80 rounded-full group-hover:bg-[var(--color-primary)] transition-colors">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-4 right-4">
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-heading text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            View All Projects
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}