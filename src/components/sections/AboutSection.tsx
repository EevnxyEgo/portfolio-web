"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui";

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Pull quote — the human hook */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <blockquote className="pull-quote">
            &ldquo;I don&apos;t stop until the idea actually works.&rdquo;
          </blockquote>
        </motion.div>

        {/* Main content */}
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

            {/* Flowing bio text */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <p className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed">
                Computer Engineering graduate from{" "}
                <span className="font-heading font-semibold text-[var(--color-text-primary)]">
                  ITS Surabaya
                </span>{" "}
                — where I learned that the most interesting problems live at the
                boundary between disciplines. I build things that are smart: web
                apps with AI at their core, ML models that run in the real world,
                and systems that feel alive.
              </p>

              <p className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed">
                From real-time exercise detection on mobile to voice-powered AI
                fitness trainers and dynamic camera systems in{" "}
                <span className="font-heading font-semibold text-[var(--color-text-primary)]">
                  Unreal Engine 5
                </span>{" "}
                — my projects share one common thread.
              </p>

              <p className="text-[var(--color-text-secondary)] text-body-lg leading-relaxed">
                As a{" "}
                <span className="tag tag-primary text-xs font-mono">Google Bangkit</span>
                {" "}
                Machine Learning alumnus, I was trained to ship AI solutions at
                scale — combining research rigor with the speed of a startup engineer.
              </p>
            </motion.div>

            {/* Inline stats */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 py-6 border-y border-[var(--color-border)]"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-[var(--color-primary)]">5+</span>
                <span className="text-[var(--color-text-secondary)] text-sm">projects built</span>
              </div>
              <span className="text-[var(--color-text-tertiary)]">·</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-[var(--color-accent)]">3</span>
                <span className="text-[var(--color-text-secondary)] text-sm">ML models deployed</span>
              </div>
              <span className="text-[var(--color-text-tertiary)]">·</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-[var(--color-sage)]">1</span>
                <span className="text-[var(--color-text-secondary)] text-sm">undergrad thesis</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                variant="primary"
                size="lg"
                magnetic
                leftIcon={<Download size={18} />}
              >
                Download CV
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
