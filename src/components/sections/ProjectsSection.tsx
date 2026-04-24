"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    slug: "baki",
    title: "BAKI",
    tagline: "AI-powered fitness app that counts your reps in real time",
    gradientClass: "project-gradient-baki",
    year: "2024",
    featured: true,
    techStack: ["Kotlin", "TensorFlow", "OpenCV", "MLKit"],
  },
  {
    slug: "fitbuddy-ai",
    title: "FitBuddy AI",
    tagline: "Voice AI fitness trainer — talk to your workout plan",
    gradientClass: "project-gradient-fitbuddy",
    year: "2024",
    featured: true,
    techStack: ["Next.js", "TypeScript", "Gemini API", "vapi.ai"],
  },
  {
    slug: "digital-twin-concert",
    title: "Digital Twin Concert",
    tagline: "360° dynamic camera system for a virtual music concert",
    gradientClass: "project-gradient-digital",
    year: "2024",
    featured: false,
    techStack: ["Unreal Engine 5", "Blender", "MetaHuman"],
  },
  {
    slug: "healthylicious",
    title: "Healthylicious",
    tagline: "Smart recipe recommendations tailored to your ingredients",
    gradientClass: "project-gradient-healthy",
    year: "2024",
    featured: false,
    techStack: ["Python", "TensorFlow Recommenders", "GCP"],
  },
  {
    slug: "41-card-game",
    title: "41-Card Game",
    tagline: "Play cards with your webcam — real-time CNN detection",
    gradientClass: "project-gradient-cards",
    year: "2023",
    featured: false,
    techStack: ["Python", "TensorFlow", "OpenCV", "CNN"],
  },
];

const gradientMap: Record<string, string> = {
  "project-gradient-baki": "from-[#E8330A] via-[#F97316] to-[#FBBF24]",
  "project-gradient-fitbuddy": "from-[#6366F1] via-[#8B5CF6] to-[#A855F7]",
  "project-gradient-digital": "from-[#06B6D4] via-[#22D3EE] to-[#67E8F9]",
  "project-gradient-healthy": "from-[#F59E0B] via-[#84CC16] to-[#22C55E]",
  "project-gradient-cards": "from-[#10B981] via-[#34D399] to-[#6EE7B7]",
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

        {/* Projects grid with numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const isFeatured = project.featured;

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
                  isFeatured ? "md:col-span-1" : "",
                  "bg-[var(--color-bg)]"
                )}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block h-full"
                >
                  <div className="flex">
                    {/* Gradient image */}
                    <div className={cn(
                      "relative w-32 sm:w-48 flex-shrink-0",
                      `bg-gradient-to-br ${gradientMap[project.gradientClass] || gradientMap["project-gradient-baki"]}`
                    )}>
                      {/* Project number (faded) */}
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-[8rem] leading-none text-white/10 select-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </span>

                      {/* Year badge */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-xs text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        {/* Title */}
                        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                          {project.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Tech stack & arrow */}
                      <div className="flex items-end justify-between mt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg-elevated)] px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 2 && (
                            <span className="text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg-elevated)] px-2 py-1 rounded">
                              +{project.techStack.length - 2}
                            </span>
                          )}
                        </div>

                        <div className="p-2 bg-[var(--color-bg-elevated)] rounded-full group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
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
