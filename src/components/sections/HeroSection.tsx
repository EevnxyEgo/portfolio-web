"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { SplitText } from "@/components/shared/SplitText";
import { siteConfig } from "@/lib/metadata";

const socialLinks = [
  {
    href: siteConfig.links.github,
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: `mailto:${siteConfig.links.email}`,
    label: "Email",
    icon: Mail,
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background: warm atmosphere circle top-right */}
      <div
        className="warm-atmosphere"
        style={{
          top: "-100px",
          right: "-80px",
        }}
        aria-hidden="true"
      />

      {/* Hero gradient overlay */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 60% 50% at 85% 0%, rgba(232,51,10,0.06), transparent 70%)",
      }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 lg:py-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Eyebrow: JetBrains Mono + blinking sage dot */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <span className="blinking-dot" aria-hidden="true" />
            <span
              className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-text-tertiary)]"
            >
              Surabaya, Indonesia &middot; Available for work
            </span>
          </motion.div>

          {/* Name: ARSENIUS */}
          <div className="overflow-hidden">
            {prefersReduced ? (
              <h1
                className="font-display leading-none text-[clamp(5rem,12vw,10rem)] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ARSENIUS
              </h1>
            ) : (
              <SplitText
                text="ARSENIUS"
                element="h1"
                className="block leading-none tracking-[-0.02em]"
                staggerDelay={0.06}
                delay={0.3}
              />
            )}
          </div>

          {/* Name: AUDLEY (indented ~4rem) */}
          <div
            className="overflow-hidden"
            style={{
              paddingLeft: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {prefersReduced ? (
              <h1
                className="font-display leading-none text-[clamp(5rem,12vw,10rem)] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                AUDLEY
              </h1>
            ) : (
              <SplitText
                text="AUDLEY"
                element="h1"
                className="block leading-none tracking-[-0.02em]"
                staggerDelay={0.06}
                delay={0.4}
              />
            )}
          </div>

          {/* Role line */}
          <motion.p
            variants={fadeInUp}
            className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-lg font-body leading-relaxed"
          >
            <span>Fullstack Developer &amp;</span>
            <span
              className="ml-1 font-serif italic text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              ML Engineer
            </span>
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base text-[var(--color-text-tertiary)] max-w-[520px] font-body leading-relaxed"
          >
            Building intelligent systems at the intersection of web, AI, and
            immersive technology. Computer Engineering graduate from ITS Surabaya,
            Bangkit Academy ML alumnus.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2"
          >
            {/* View my work */}
            <a
              href="/#projects"
              className="inline-flex items-center gap-1 font-body font-medium text-sm text-[var(--color-text)] transition-all hover:text-[var(--color-primary)] group"
            >
              View my work
              <span className="inline-flex items-center transition-transform duration-150 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>

            {/* Download CV */}
            <a
              href="#"
              className="inline-flex items-center gap-1 font-body font-medium text-sm text-[var(--color-text)] transition-all hover:text-[var(--color-primary)] group"
            >
              Download CV
              <span className="inline-flex items-center transition-transform duration-150 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>

            {/* Vertical separator */}
            <span
              className="hidden sm:block w-px h-4 bg-[var(--color-border)]"
              aria-hidden="true"
            />

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-150"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator: bouncing arrow at absolute bottom center */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown
            size={22}
            className="text-[var(--color-text-tertiary)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}