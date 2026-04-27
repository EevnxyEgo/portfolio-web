"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { viewportConfig } from "@/lib/animations";
import { useState, useEffect } from "react";

interface AboutSectionProps {
  heading?: string;
  location?: string;
  availability?: "available" | "open" | "busy";
}

export function AboutSection({
  heading = "The human behind the code.",
  location = "Surabaya, Indonesia",
  availability = "available",
}: AboutSectionProps) {
  const prefersReduced = useReducedMotion();
  const [showBubble, setShowBubble] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [hasProfileImage, setHasProfileImage] = useState(false);

  useEffect(() => {
    fetch("/images/profile/arsenius.jpg")
      .then((res) => setHasProfileImage(res.ok))
      .catch(() => setHasProfileImage(false));
  }, []);

  return (
    <section
      id="about"
      className="py-[var(--section-py)] overflow-hidden"
    >
      <div className="max-w-[var(--content-max)] mx-auto px-[var(--content-px)]">
        {/* 2-column layout: left photo column (40%), right content column (55%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_2.4fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: Photo + Status Pill ────────────────────── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Photo container */}
            <div className="relative w-full max-w-[340px]">
              {/* Decorative warm accent frame */}
              <div
                className="absolute -inset-3 border border-[var(--color-primary)]/10 rounded-[var(--radius-xl)] pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-6 border border-[var(--color-border)] rounded-[var(--radius-2xl)] pointer-events-none"
                aria-hidden="true"
              />

              {/* Photo / placeholder */}
              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                animate={
                  isWiggling
                    ? { rotate: [-5, 5, -3, 3, 0], transition: { duration: 0.5 } }
                    : {}
                }
                onClick={() => {
                  setIsWiggling(true);
                  setShowBubble(true);
                  setTimeout(() => setIsWiggling(false), 500);
                  setTimeout(() => setShowBubble(false), 4000);
                }}
                className="relative aspect-[3/4] w-full rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-bg-elevated)] cursor-pointer"
              >
                {hasProfileImage ? (
                  /* Actual photo with hover effect */
                  <Image
                    src="/images/profile/arsenius.jpg"
                    alt="Arsenius Audley"
                    fill
                    className="object-cover transition-all duration-300 hover:grayscale-[50%]"
                    sizes="(max-width: 1024px) 340px, 400px"
                  />
                ) : (
                  /* Geometric SVG placeholder */
                  <>
                    <div
                      className="absolute inset-0 rounded-[var(--radius-xl)]"
                      style={{
                        background:
                          "linear-gradient(145deg, var(--color-bg-elevated) 0%, var(--color-bg-subtle) 100%)",
                      }}
                    />

                    {/* Geometric shapes */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 340 453"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      {/* Large circle */}
                      <circle
                        cx="170"
                        cy="120"
                        r="80"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="1"
                        opacity="0.3"
                      />

                      {/* Medium tilted rectangle */}
                      <rect
                        x="80"
                        y="200"
                        width="100"
                        height="140"
                        rx="8"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="1"
                        opacity="0.5"
                        transform="rotate(15, 130, 270)"
                      />

                      {/* Small hexagon */}
                      <polygon
                        points="280,320 295,335 295,355 280,370 265,355 265,335"
                        fill="var(--color-primary)"
                        opacity="0.1"
                      />

                      {/* Dot grid */}
                      <defs>
                        <pattern
                          id="dotGrid"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle cx="10" cy="10" r="1" fill="var(--color-border)" opacity="0.3" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#dotGrid)" />
                    </svg>

                    {/* Initials */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-serif italic text-6xl text-[var(--color-text-tertiary)] select-none"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        AA
                      </span>
                    </div>

                    {/* Photo coming soon hint */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span
                        className="text-[0.7rem] text-[var(--color-text-tertiary)] font-mono"
                        style={{ opacity: 0.7 }}
                      >
                        📸 Photo coming soon
                      </span>
                    </div>
                  </>
                )}

                {/* Speech bubble */}
                <AnimatePresence>
                  {showBubble && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] px-4 py-2 rounded-xl font-body text-sm shadow-lg whitespace-nowrap z-10"
                    >
                      That&apos;s me! Click to learn more
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Warm decorative circle accent */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: "var(--color-primary-muted)",
                  filter: "blur(30px)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Status pill */}
            <div className="mt-8 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: availability === "busy"
                    ? "var(--color-amber)"
                    : availability === "open"
                    ? "var(--color-sky)"
                    : "var(--color-sage)"
                }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-xs tracking-wide"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Currently in {location} {
                  availability === "available" ? "· Available for work" :
                  availability === "open" ? "· Open to opportunities" :
                  "· Limited availability"
                }
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Bio + Stats + Education ───────────────── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            {/* Section eyebrow */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="section-eyebrow"
            >
              About me
            </motion.p>

            {/* Heading — Playfair Display italic */}
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-h2 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                lineHeight: 1.2,
                color: "var(--color-text)",
              }}
            >
              {heading}
            </motion.h2>

            {/* Bio paragraphs with inline stats */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <p
                className="text-body leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Computer Engineering graduate from{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  ITS Surabaya
                </span>
                . I build things that are smart — web apps with AI at their core,
                ML models that run in production, and systems that feel alive. With
                {" "}
                <span
                  className="font-semibold"
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: "1.15em",
                  }}
                >
                  5+ projects
                </span>
                {" "}spanning real-time mobile to cloud, I work across the full stack —
                from research to deployed model.
              </p>

              <p
                className="text-body leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                My ML background trained me to ship intelligence at scale — combining
                research rigor with the speed of someone who owns the whole pipeline.
                I have{" "}
                <span
                  className="font-semibold"
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: "1.15em",
                  }}
                >
                  3 ML models deployed
                </span>
                {" "}in the wild, and{" "}
                <span
                  className="font-semibold"
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: "1.15em",
                  }}
                >
                  1 undergrad thesis
                </span>
                {" "}under my belt. I don&apos;t stop until the idea actually works.
              </p>

              <p
                className="text-body leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                As a{" "}
                <span
                  className="tag tag-primary text-xs font-mono"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Google Bangkit ML
                </span>
                {" "}alumnus, I sit at the intersection of software engineering and
                machine learning — building at the edge of what&apos;s possible with
                real-world data and real users.
              </p>
            </motion.div>

            {/* Education pills */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              <span
                className="tag tag-sage text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ITS Surabaya
              </span>
              <span
                className="tag tag-amber text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Bangkit Academy
              </span>
              <span
                className="tag text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Computer Engineering
              </span>
            </motion.div>

            {/* Download CV button */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <a
                href="/cv.pdf"
                className={cn(
                  "inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[var(--radius-full)]",
                  "font-semibold text-sm transition-all duration-200",
                  "bg-[var(--color-text)] text-[var(--color-text-inverse)]",
                  "hover:bg-[var(--color-primary)] hover:text-white"
                )}
              >
                <Download size={16} strokeWidth={2.5} />
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}