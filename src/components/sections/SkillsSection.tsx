"use client";

import { motion, useReducedMotion } from "framer-motion";

// ─── Skill data ────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    label: "Frontend & Web",
    accent: "var(--color-primary)",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "shadcn-ui",
      "Framer Motion",
    ],
  },
  {
    label: "Backend & APIs",
    accent: "var(--color-sky)",
    skills: [
      "Express.js",
      "Node.js",
      "Python",
      "REST APIs",
      "Convex",
      "Clerk Auth",
    ],
  },
  {
    label: "AI / Machine Learning",
    accent: "var(--color-amber)",
    skills: [
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "OpenCV",
      "MLKit",
      "TensorFlow Recommenders",
      "Gemini API",
      "vapi.ai",
      "Pose Detection",
      "CNN",
      "NLP",
    ],
  },
  {
    label: "Mobile",
    accent: "var(--color-sage)",
    skills: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    label: "3D & Creative Tech",
    accent: "var(--color-blush)",
    skills: [
      "Unreal Engine 5",
      "Blender",
      "MetaHuman",
      "React Three Fiber",
      "Three.js",
    ],
  },
  {
    label: "Tools & DevOps",
    accent: "var(--color-text-secondary)",
    skills: [
      "Git",
      "Docker",
      "Nginx",
      "Linux",
      "Vercel",
      "GCP",
      "Figma",
      "VS Code",
    ],
  },
] as const;

// ─── Tag atom ─────────────────────────────────────────────────────────────────

function SkillTag({
  skill,
  accent,
  delay,
  reduced,
}: {
  skill: string;
  accent: string;
  delay: number;
  reduced: boolean;
}) {
  const initialState = reduced
    ? undefined
    : { opacity: 0, scale: 0.9 };
  const animateState = reduced
    ? undefined
    : { opacity: 1, scale: 1 };

  return (
    <motion.span
      initial={initialState}
      whileInView={animateState}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="skill-tag"
      style={
        {
          "--tag-accent": accent,
        } as React.CSSProperties
      }
    >
      {skill}
    </motion.span>
  );
}

// ─── Group row ────────────────────────────────────────────────────────────────

function SkillGroup({
  group,
  groupIndex,
  reduced,
}: {
  group: (typeof skillGroups)[number];
  groupIndex: number;
  reduced: boolean;
}) {
  const baseDelay = groupIndex * 0.08;

  const initialState = reduced ? undefined : { opacity: 0, y: 10 };
  const animateState = reduced ? undefined : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initialState}
      whileInView={animateState}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: baseDelay }}
      className="flex flex-col gap-3"
    >
      {/* Category label */}
      <span className="text-label" style={{ color: "var(--color-text-secondary)" }}>
        {group.label}
      </span>

      {/* Tag cloud — no wrapping cards, just free-floating pills */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillTag
            key={skill}
            skill={skill}
            accent={group.accent}
            delay={baseDelay + i * 0.03}
            reduced={reduced}
          />
        ))}
      </div>

      {/* Thin divider — last group skips the separator */}
      {groupIndex < skillGroups.length - 1 && (
        <div className="mt-5 h-px w-full bg-[var(--color-border)]" />
      )}
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function SkillsSection() {
  const prefersReduced = useReducedMotion();
  const reduced = prefersReduced === true;

  const headerInitial = reduced ? undefined : { opacity: 0, y: 20 };
  const headerAnimate = reduced ? undefined : { opacity: 1, y: 0 };

  return (
    <section
      id="skills"
      className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg-elevated)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── 2-column grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: sticky section header ───────────────────────── */}
          <div className="lg:sticky lg:top-[calc(2rem+var(--scroll-offset,0px))] self-start">
            <motion.div
              initial={headerInitial}
              whileInView={headerAnimate}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow */}
              <span
                className="section-eyebrow block mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                What I work with
              </span>

              {/* Heading */}
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 2.5rem)",
                  lineHeight: 1.15,
                  color: "var(--color-text)",
                }}
              >
                My technical
                <br />
                arsenal.
              </h2>

              {/* Sub copy */}
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                From training ML models to shipping production web apps.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: skill group tag clouds ─────────────────────── */}
          <div className="flex flex-col gap-6">
            {skillGroups.map((group, i) => (
              <SkillGroup
                key={group.label}
                group={group}
                groupIndex={i}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}