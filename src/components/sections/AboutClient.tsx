"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, MapPin, GraduationCap, Award, Code2, Brain } from "lucide-react";
import { siteConfig } from "@/lib/metadata";
import { Badge } from "@/components/ui";
import { SplitText } from "@/components/shared/SplitText";

const stats = [
  { value: "5+", label: "Projects Built", icon: Code2 },
  { value: "3", label: "ML Models Deployed", icon: Brain },
  { value: "1", label: "Undergraduate Thesis", icon: GraduationCap },
];

const timeline = [
  {
    year: "2024",
    title: "Fresh Graduate",
    org: "Institut Teknologi Sepuluh Nopember (ITS)",
    description:
      "Computer Engineering degree. Thesis: 360° Camera System with Dynamic View Control for Digital Twin Concert in Unreal Engine 5.",
    tags: ["C++", "Python", "Computer Vision", "Embedded Systems"],
  },
  {
    year: "2024",
    title: "Bangkit Academy — ML Cohort",
    org: "Google × Tokopedia × Traveloka × Gojek",
    description:
      "Machine Learning track. Built recommendation systems, deployed ML pipelines on GCP. Capstone: Healthylicious.",
    tags: ["TensorFlow", "Python", "ML Pipelines", "Google Cloud"],
  },
  {
    year: "2024",
    title: "Self-Directed Learning",
    org: "Coursera × Udemy",
    description:
      "Advanced Next.js & TypeScript. Built FitBuddy AI — voice AI fitness trainer with Gemini API and vapi.ai.",
    tags: ["Next.js", "TypeScript", "vapi.ai", "Clerk", "Convex"],
  },
  {
    year: "2023",
    title: "BAKI — AI Fitness App",
    org: "Telematics Final Project, ITS",
    description:
      "AI-powered fitness app with real-time exercise detection using MLKit. Part of Telematics Engineering curriculum.",
    tags: ["Python", "TensorFlow", "OpenCV", "MLKit", "Kotlin"],
  },
];

export function AboutClient() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero section */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
            About Me
          </span>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] mt-2">
            <SplitText text="ARSENIUS AUDLEY" />
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] font-heading mt-4">
            Fullstack Developer × ML Engineer
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 space-y-6"
        >
          <p className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed">
            I&apos;m a Computer Engineering graduate from ITS Surabaya — where I
            learned that the most interesting problems live at the boundary
            between disciplines. I build things that are smart: web apps with
            AI at their core, ML models that run in the real world, and systems
            that feel alive.
          </p>
          <p className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed">
            From real-time exercise detection on mobile to voice-powered AI
            fitness trainers and dynamic camera systems in Unreal Engine 5 —
            my projects share one common thread: I don&apos;t stop until the idea
            actually works.
          </p>
          <p className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed">
            As a Google Bangkit Academy Machine Learning alumnus, I was trained
            to ship AI solutions at scale — combining research rigor with the
            speed of a startup engineer.
          </p>
        </motion.div>

        {/* Quick info */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-6 mt-8"
        >
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <MapPin size={16} className="text-[var(--color-primary)]" />
            <span>Surabaya, Indonesia</span>
          </div>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Mail size={16} className="text-[var(--color-primary)]" />
            <span>{siteConfig.links.email}</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-5 mt-6"
        >
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-16 mb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon
                  size={24}
                  className="text-[var(--color-primary)] mx-auto mb-2"
                />
                <div className="font-display text-[clamp(2rem,4vw,3rem)] text-[var(--color-primary)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] font-heading">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} className="text-[var(--color-primary)]" />
            <h2 className="font-heading text-h2">Experience & Journey</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-primary)]" />

                  {/* Year */}
                  <div className="font-mono text-sm text-[var(--color-primary)] mb-1">
                    {item.year}
                  </div>

                  {/* Title & org */}
                  <h3 className="font-heading text-xl mb-1">{item.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                    {item.org}
                  </p>

                  {/* Description */}
                  <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="subtle" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education & Skills summary */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={24} className="text-[var(--color-accent)]" />
              <h2 className="font-heading text-h3">Education</h2>
            </div>
            <div className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <h3 className="font-heading text-lg mb-1">
                Bachelor of Computer Engineering
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-2">
                Institut Teknologi Sepuluh Nopember (ITS)
              </p>
              <p className="text-[var(--color-text-tertiary)] text-sm">
                Surabaya, Indonesia • 2024
              </p>
            </div>
          </motion.div>

          {/* Currently exploring */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 size={24} className="text-[var(--color-accent)]" />
              <h2 className="font-heading text-h3">Currently Exploring</h2>
            </div>
            <div className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <ul className="space-y-3">
                {[
                  "Advanced AI Agent patterns",
                  "Real-time 3D web experiences",
                  "Fullstack AI integration",
                  "System design & architecture",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}