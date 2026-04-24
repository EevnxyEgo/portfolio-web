"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui";
import { SplitText } from "@/components/shared/SplitText";
import { siteConfig } from "@/lib/metadata";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((mod) => mod.ParticleField),
  {
    ssr: false,
    loading: () => null,
  }
);

const FloatingGeometry = dynamic(
  () => import("@/components/three/FloatingGeometry").then((mod) => mod.FloatingGeometry),
  {
    ssr: false,
    loading: () => null,
  }
);

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

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <ParticleField />
      <FloatingGeometry />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="space-y-8">
            {/* Eyebrow label */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
                Fullstack Developer × ML Engineer
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden">
              {prefersReduced ? (
                <h1 className="text-hero font-display leading-[0.9]">
                  ARSENIUS
                  <br />
                  AUDLEY
                </h1>
              ) : (
                <SplitText
                  text="ARSENIUS"
                  element="h1"
                  className="text-hero font-display leading-[0.9]"
                  delay={0.4}
                  staggerDelay={0.05}
                />
              )}
            </div>
            <div className="overflow-hidden -mt-2">
              {prefersReduced ? (
                <h1 className="text-hero font-display leading-[0.9]">
                  AUDLEY
                </h1>
              ) : (
                <SplitText
                  text="AUDLEY"
                  element="h1"
                  className="text-hero font-display leading-[0.9]"
                  delay={0.5}
                  staggerDelay={0.05}
                />
              )}
            </div>

            {/* Tagline */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-lg text-[var(--color-text-secondary)] max-w-md font-body"
            >
              Building intelligent systems at the intersection of web, AI, and
              immersive technology.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                magnetic
                asChild
                href="/#projects"
                rightIcon={<ArrowDown size={18} />}
              >
                View My Work
              </Button>
              <Button
                variant="secondary"
                size="lg"
                magnetic
                leftIcon={<Download size={18} />}
              >
                Download CV
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="flex items-center gap-5 pt-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Visual column - empty space for 3D geometry on desktop */}
          <div className="hidden lg:block relative h-[500px]" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown
            size={24}
            className="text-[var(--color-text-tertiary)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
