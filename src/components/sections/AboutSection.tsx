"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/metadata";

const socialLinks = [
  { href: siteConfig.links.github, icon: FaGithub, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email" },
];

const stats = [
  { value: "5+", label: "Projects Built" },
  { value: "3", label: "ML Models Deployed" },
  { value: "2", label: "Platforms" },
  { value: "1", label: "Undergraduate Thesis" },
];

const bioParagraphs = [
  "I'm a Computer Engineering graduate from ITS Surabaya — where I learned that the most interesting problems live at the boundary between disciplines. I build things that are smart: web apps with AI at their core, ML models that run in the real world, and systems that feel alive.",
  "From real-time exercise detection on mobile to voice-powered AI fitness trainers and dynamic camera systems in Unreal Engine 5 — my projects share one common thread: I don't stop until the idea actually works.",
  "As a Google Bangkit Academy Machine Learning alumnus, I was trained to ship AI solutions at scale — combining research rigor with the speed of a startup engineer.",
];

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image column */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-[var(--color-primary)]/20 rounded-lg" />
              <div className="absolute -inset-2 border border-[var(--color-border)] rounded-lg" />

              {/* Profile image placeholder */}
              <div className="relative w-full h-full bg-[var(--color-bg-elevated)] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-8xl text-[var(--color-text-tertiary)]">
                    AA
                  </span>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                animate={
                  prefersReduced
                    ? {}
                    : {
                        y: [0, -10, 0],
                      }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full blur-2xl"
              />
            </div>
          </motion.div>

          {/* Content column */}
          <div className="space-y-8">
            {/* Section header */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
                About Me
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mt-2">
                WHO I AM
              </h2>
            </motion.div>

            {/* Bio paragraphs */}
            <div className="space-y-4">
              {bioParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                  }}
                  className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[var(--color-border)]"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1,
                    }}
                    className="font-display text-[clamp(2rem,4vw,3rem)] text-[var(--color-primary)]"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-[var(--color-text-tertiary)] font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                magnetic
                leftIcon={<Download size={18} />}
              >
                Download CV
              </Button>

              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-2 text-[var(--color-text-secondary)] transition-colors",
                      "hover:text-[var(--color-primary)]"
                    )}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}