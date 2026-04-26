"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    slug: "baki",
    title: "BAKI",
    tagline: "AI-powered fitness app that counts your reps in real time",
    gradientClass: "project-gradient-baki",
    initials: "BK",
    year: "2024",
    type: "Group Project",
    featured: true,
    category: "Mobile + AI",
    techStack: ["Kotlin", "TensorFlow", "OpenCV", "MLKit"],
  },
  {
    slug: "fitbuddy-ai",
    title: "FitBuddy AI",
    tagline: "Voice AI fitness trainer — talk to your workout plan",
    gradientClass: "project-gradient-fitbuddy",
    initials: "FB",
    year: "2024",
    type: "Solo",
    featured: true,
    category: "Fullstack + AI",
    techStack: ["Next.js", "TypeScript", "Gemini API", "vapi.ai"],
  },
  {
    slug: "digital-twin-concert",
    title: "Digital Twin Concert",
    tagline: "360° dynamic camera system for a virtual music concert",
    gradientClass: "project-gradient-digital",
    initials: "DT",
    year: "2024",
    type: "Solo",
    featured: false,
    category: "3D + Immersive",
    techStack: ["Unreal Engine 5", "Blender", "MetaHuman"],
  },
  {
    slug: "healthylicious",
    title: "Healthylicious",
    tagline: "Smart recipe recommendations tailored to your ingredients",
    gradientClass: "project-gradient-healthy",
    initials: "HL",
    year: "2024",
    type: "Group Project",
    featured: false,
    category: "AI + Backend",
    techStack: ["Python", "TensorFlow Recommenders", "GCP"],
  },
  {
    slug: "41-card-game",
    title: "41-Card Game",
    tagline: "Play cards with your webcam — real-time CNN detection",
    gradientClass: "project-gradient-cards",
    initials: "CG",
    year: "2023",
    type: "Group Project",
    featured: false,
    category: "Computer Vision",
    techStack: ["Python", "TensorFlow", "OpenCV", "CNN"],
  },
];

function TechPill({ tech }: { tech: string }) {
  return (
    <span className="tag tag-amber">{tech}</span>
  );
}

function ProjectCard({
  project,
  index,
  prefersReduced,
}: {
  project: (typeof projects)[number];
  index: number;
  prefersReduced: boolean | null;
}) {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative block",
          "bg-[var(--color-bg-elevated)]",
          "border border-[var(--color-border)]",
          "rounded-[var(--radius-xl)]",
          "transition-all duration-300",
          "hover:shadow-[var(--shadow-lg)]",
          "hover:-translate-y-1",
        )}
      >
        <div className={cn(
          "flex flex-col sm:flex-row",
          "overflow-hidden rounded-[var(--radius-xl)]",
          isEven ? "sm:flex-row-reverse" : "",
        )}>
          {/* Image area — 45% on desktop */}
          <div className={cn(
            "relative w-full sm:w-[45%] flex-shrink-0",
            "aspect-video sm:aspect-auto",
          )}>
            <div
              className={cn(
                "absolute inset-0",
                project.gradientClass,
                "rounded-t-[var(--radius-xl)] sm:rounded-none",
                isEven ? "sm:rounded-tr-[var(--radius-xl)]" : "sm:rounded-tl-[var(--radius-xl)]",
                index === projects.length - 1 ? (
                  isEven ? "sm:rounded-br-[var(--radius-xl)]" : "sm:rounded-bl-[var(--radius-xl)]"
                ) : "",
              )}
            >
              {/* Subtle texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Project initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-white/15 select-none tracking-tight"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {project.initials}
                </span>
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5",
                    "px-3 py-1 rounded-full",
                    "font-mono text-[0.65rem] uppercase tracking-widest",
                    "bg-[var(--color-primary)] text-white",
                  )}>
                    Featured
                  </span>
                </div>
              )}

              {/* Year + type */}
              <div className="absolute bottom-4 left-4">
                <span className={cn(
                  "font-mono text-xs text-white/70",
                  "bg-white/10 backdrop-blur-sm",
                  "px-2.5 py-1 rounded-full",
                )}>
                  {project.year} — {project.type}
                </span>
              </div>
            </div>
          </div>

          {/* Content area — 55% on desktop */}
          <div className={cn(
            "flex flex-col justify-between p-6 sm:p-8",
            "w-full sm:w-[55%]",
          )}>
            <div>
              {/* Category badge */}
              <div className="mb-4">
                <span className={cn(
                  "inline-flex items-center",
                  "px-3 py-1 rounded-full",
                  "font-mono text-[0.7rem] uppercase tracking-widest",
                  "bg-[var(--color-amber-muted)] text-[var(--color-amber)]",
                  "border border-[var(--color-amber)]/20",
                )}>
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className={cn(
                "font-serif text-[clamp(1.4rem,2.5vw,1.75rem)]",
                "leading-tight mb-3",
                "text-[var(--color-text)]",
                "group-hover:text-[var(--color-primary)]",
                "transition-colors duration-200",
              )}>
                {project.title}
              </h3>

              {/* Tagline */}
              <p className={cn(
                "text-[var(--color-text-secondary)]",
                "text-sm sm:text-base leading-relaxed",
                "max-w-lg",
              )}>
                {project.tagline}
              </p>
            </div>

            {/* Bottom row: tech pills + view link */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-6">
              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechPill key={tech} tech={tech} />
                ))}
              </div>

              {/* View project link */}
              <div className="flex items-center gap-2 group/link flex-shrink-0">
                <span className={cn(
                  "font-heading text-sm",
                  "text-[var(--color-text-secondary)]",
                  "group-hover/link:text-[var(--color-primary)]",
                  "transition-colors duration-200",
                )}>
                  View project
                </span>
                <span className={cn(
                  "relative flex items-center justify-center w-7 h-7 rounded-full",
                  "border border-[var(--color-border)]",
                  "text-[var(--color-text-secondary)]",
                  "group-hover/link:border-[var(--color-primary)]",
                  "group-hover/link:bg-[var(--color-primary)]",
                  "group-hover/link:text-white",
                  "group-hover/link:translate-x-0.5",
                  "transition-all duration-200",
                )}>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg-elevated)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header — left-aligned */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-16"
        >
          <p className="section-eyebrow mb-3">
            Things I&apos;ve Built
          </p>
          <h2 className={cn(
            "font-serif text-[clamp(2rem,5vw,3rem)]",
            "leading-tight text-[var(--color-text)]",
          )}>
            Projects.
          </h2>
        </motion.div>

        {/* Projects list — alternating horizontal cards */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 sm:mt-16 flex justify-center sm:justify-start"
        >
          <Link
            href="/projects"
            className={cn(
              "group inline-flex items-center gap-3",
              "font-heading text-base",
              "text-[var(--color-text-secondary)]",
              "hover:text-[var(--color-primary)]",
              "transition-colors duration-200",
              "border-b border-transparent",
              "hover:border-[var(--color-primary)]",
              "pb-0.5",
            )}
          >
            View All Projects
            <span className={cn(
              "inline-flex items-center",
              "group-hover:translate-x-1",
              "transition-transform duration-200",
            )}>
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}