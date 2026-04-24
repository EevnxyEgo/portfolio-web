"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const experiences = [
  {
    year: "2024",
    title: "Fresh Graduate",
    organization: "Institut Teknologi Sepuluh Nopember (ITS)",
    location: "Surabaya, Indonesia",
    colorClass: "bg-[var(--color-primary)]",
    description: "Computer Engineering degree — learned that the most interesting problems live at the boundary between disciplines.",
  },
  {
    year: "2024",
    title: "Undergraduate Thesis",
    organization: "ITS Surabaya",
    location: "Surabaya, Indonesia",
    colorClass: "bg-[var(--color-cool)]",
    description: "360° Dynamic Camera System for Digital Twin Concert Using Unreal Engine 5.",
  },
  {
    year: "2024",
    title: "Bangkit Academy — ML Cohort",
    organization: "Google × Tokopedia × Traveloka × Gojek",
    location: "Remote",
    colorClass: "bg-[var(--color-warm)]",
    description: "Machine Learning specialization. Capstone: Healthylicious recipe recommender.",
  },
  {
    year: "2024",
    title: "Self-Directed Learning",
    organization: "Coursera + Udemy",
    location: "Self-paced",
    colorClass: "bg-[var(--color-sage)]",
    description: "Advanced Next.js & TypeScript. Output: FitBuddy AI — voice AI fitness trainer.",
  },
  {
    year: "2023",
    title: "Computer Vision Project",
    organization: "ITS — Computer Vision Course",
    location: "Surabaya, Indonesia",
    colorClass: "bg-[var(--color-primary)]",
    description: "41-Card Game: Real-time playing card detection with CNN + OpenCV.",
  },
  {
    year: "2023",
    title: "Mobile ML Project",
    organization: "ITS — Telematics Course",
    location: "Surabaya, Indonesia",
    colorClass: "bg-[var(--color-cool)]",
    description: "BAKI: AI-powered fitness app with real-time exercise detection using MLKit.",
  },
];

export function ExperienceSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg-elevated)]"
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
            My Journey
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mt-2">
            EXPERIENCE
          </h2>
          <p className="text-[var(--color-text-secondary)] text-body-lg mt-4 max-w-2xl mx-auto">
            From student to builder — the path that shaped my skills
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[var(--color-border)]" />

          {/* Experience entries */}
          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div
                key={exp.title + exp.year}
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="relative pl-12 md:pl-0"
              >
                {/* Colored dot */}
                <div className={cn(
                  "absolute left-4 md:left-1/2 top-0 -translate-x-1/2 -translate-y-1",
                  "w-3 h-3 rounded-full ring-4 ring-[var(--color-bg-elevated)]",
                  exp.colorClass
                )} />

                {/* Content card */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={cn(
                    "p-5 rounded-lg border border-[var(--color-border)]",
                    "bg-[var(--color-bg)]",
                    "hover:border-[var(--color-border-bright)]",
                    "transition-all duration-300"
                  )}
                >
                  {/* Year */}
                  <span className="inline-block font-mono text-sm text-[var(--color-accent)] mb-1">
                    {exp.year}
                  </span>

                  {/* Title & org */}
                  <h3 className="font-heading text-lg font-semibold mb-0.5">
                    {exp.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-1">
                    {exp.organization}
                  </p>

                  {/* Location */}
                  <p className="text-xs text-[var(--color-text-tertiary)] mb-3">
                    {exp.location}
                  </p>

                  {/* Description */}
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    {exp.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
