"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const experiences = [
  {
    year: "2024",
    title: "Fresh Graduate",
    organization: "Institut Teknologi Sepuluh Nopember (ITS)",
    location: "Surabaya, Indonesia",
    tags: ["C++", "Python", "Computer Networks", "Computer Vision", "Embedded Systems"],
    description: "Computer Engineering degree — learned that the most interesting problems live at the boundary between disciplines.",
  },
  {
    year: "2024",
    title: "Undergraduate Thesis",
    organization: "ITS Surabaya",
    location: "Surabaya, Indonesia",
    tags: ["Unreal Engine 5", "C++", "Blender", "MetaHuman", "FSM", "Interpolation"],
    description: "\"Pengembangan Sistem Kamera 360° dengan Dynamic View Control untuk Digital Twin Konser Musik Menggunakan Unreal Engine 5.\"",
  },
  {
    year: "2024",
    title: "Bangkit Academy — ML Cohort",
    organization: "Program by Google × Tokopedia × Traveloka × Gojek",
    location: "Remote",
    tags: ["TensorFlow", "Python", "ML Pipelines", "Google Cloud", "Collaboration"],
    description: "Machine Learning specialization. Capstone Project: Healthylicious as ML Developer.",
  },
  {
    year: "2024",
    title: "Self-Directed Learning",
    organization: "Coursera + Udemy",
    location: "Self-paced",
    tags: ["Next.js", "TypeScript", "vapi.ai", "Gemini API", "Clerk", "Convex"],
    description: "Advanced Next.js & TypeScript courses. Output: FitBuddy AI (voice AI fitness trainer).",
  },
  {
    year: "2023",
    title: "Computer Vision Final Project",
    organization: "ITS — Computer Vision/Image Processing Course",
    location: "Surabaya, Indonesia",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN", "Dataset Creation"],
    description: "41-Card Game: Real-time playing card detection with CNN + OpenCV.",
  },
  {
    year: "2023",
    title: "Telematics Final Project",
    organization: "ITS",
    location: "Surabaya, Indonesia",
    tags: ["Python", "TensorFlow", "OpenCV", "MLKit", "Kotlin", "Mobile Integration"],
    description: "BAKI: AI-powered fitness app with real-time exercise detection using MLKit.",
  },
];

export function ExperienceSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.2"],
  });

  // Animate line drawing as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
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
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary)]/50 to-[var(--color-text-tertiary)]" />
            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[var(--color-primary)] origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience entries */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.title + exp.year}
                  initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                  className={cn(
                    "relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12",
                    "items-start"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 -translate-y-1">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/20" />
                  </div>

                  {/* Content card - alternates sides */}
                  <div
                    className={cn(
                      "pl-8 md:pl-0 md:pr-12",
                      isLeft ? "md:text-right" : "md:order-2 md:pl-12"
                    )}
                  >
                    <motion.div
                      initial={prefersReduced ? false : { opacity: 0, x: isLeft ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={cn(
                        "p-6 rounded-lg border border-[var(--color-border)]",
                        "bg-[var(--color-bg)]",
                        "hover:border-[var(--color-border-bright)]",
                        "transition-all duration-300"
                      )}
                    >
                      {/* Year badge */}
                      <span className="inline-block font-mono text-sm text-[var(--color-accent)] mb-2">
                        {exp.year}
                      </span>

                      {/* Title & org */}
                      <h3 className="font-heading text-lg font-semibold mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] text-sm mb-2">
                        {exp.organization}
                      </p>

                      {/* Location */}
                      <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
                        {exp.location}
                      </p>

                      {/* Description */}
                      <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                        {exp.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space on alternate side for desktop layout */}
                  <div className={cn("hidden md:block", !isLeft && "md:order-1")} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}