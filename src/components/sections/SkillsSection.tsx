"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  skillProficiency,
  categoryMap,
  categoryStyles,
} from "@/components/gamification/data/skillConfig";
import { useGameState } from "@/components/gamification/XPBadgeSystem";
import { useToast } from "@/components/gamification/ToastNotification";
import { ParticleEmitter } from "@/components/gamification/ParticleEmitter";
import { XPBadgeSystem } from "@/components/gamification/XPBadgeSystem";

const TheLabPanel = dynamic(
  () =>
    import("@/components/gamification/TheLabPanel").then((m) => m.TheLabPanel),
  { ssr: false, loading: () => <div className="w-[200px] shrink-0" /> }
);

const ServerRoomPanel = dynamic(
  () =>
    import("@/components/gamification/ServerRoomPanel").then(
      (m) => m.ServerRoomPanel
    ),
  { ssr: false, loading: () => <div className="w-[200px] shrink-0" /> }
);

const SkillQuestMap = dynamic(
  () =>
    import("@/components/gamification/SkillQuestMap").then((m) => m.SkillQuestMap),
  { ssr: false, loading: () => <div className="h-28" /> }
);

// ─── Skill descriptions map ────────────────────────────────────────────────────
const skillDescriptions: Record<string, string> = {
  "React": "UI library by Meta",
  "Next.js": "React framework for production",
  "TypeScript": "Typed JavaScript superset",
  "TensorFlow": "ML platform by Google",
  "Keras": "Deep learning API",
  "scikit-learn": "ML library for Python",
  "OpenCV": "Computer vision library",
  "MLKit": "On-device ML by Google",
  "TensorFlow Recommenders": "Recommender system library",
  "Unreal Engine 5": "Real-time 3D creation suite",
  "MetaHuman": "Realistic digital humans",
  "React Three Fiber": "Three.js for React",
  "CNN": "Convolutional Neural Network",
  "NLP": "Natural Language Processing",
  "GCP": "Google Cloud Platform",
  "Python": "General-purpose programming",
  "Convex": "Full-stack TypeScript platform",
  "Clerk Auth": "Authentication platform",
  "Pose Detection": "Body pose estimation",
  "Gemini API": "Google's multimodal AI",
  "vapi.ai": "Voice AI platform",
  "Express.js": "Node.js web framework",
  "Node.js": "JavaScript runtime",
  "REST APIs": "API design & integration",
  "JavaScript": "Core web language",
  "HTML/CSS": "Web fundamentals",
  "Tailwind CSS": "Utility-first CSS",
  "shadcn-ui": "Copy/paste UI components",
  "Framer Motion": "Animation library",
  "Flutter": "Cross-platform UI toolkit",
  "React Native": "Mobile React framework",
  "iOS": "Apple mobile development",
  "Android": "Android mobile development",
  "Blender": "3D modeling & animation",
  "Three.js": "WebGL 3D library",
  "Git": "Version control system",
  "Docker": "Container platform",
  "Nginx": "Web server & proxy",
  "Linux": "Server operating system",
  "Vercel": "Deployment platform",
  "Figma": "Design & prototyping",
  "VS Code": "Code editor",
};

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
  description,
  onHover,
  onLeave,
  onClick,
}: {
  skill: string;
  accent: string;
  delay: number;
  reduced: boolean;
  description?: string;
  onHover?: (skill: string, e: React.MouseEvent) => void;
  onLeave?: () => void;
  onClick?: (skill: string) => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const initialState = reduced
    ? undefined
    : { opacity: 0, scale: 0.9 };
  const animateState = reduced
    ? undefined
    : { opacity: 1, scale: 1 };

  const profLevel = skillProficiency[skill] || 1;

  return (
    <div className="relative inline-block">
      <motion.button
        type="button"
        initial={initialState}
        whileInView={animateState}
        viewport={{ once: true }}
        transition={{ duration: 0.25, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="skill-tag cursor-pointer"
        style={
          {
            "--tag-accent": accent,
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          setShowTooltip(true);
          onHover?.(skill, e);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
          onLeave?.();
        }}
        onClick={() => onClick?.(skill)}
      >
        {skill}
        <span className="ml-1.5 flex gap-[3px] inline-block align-middle">
          {[1, 2, 3].map((level) => (
            <span
              key={level}
              className="w-[5px] h-[5px] rounded-full inline-block"
              style={{
                background: level <= profLevel ? accent : `${accent}30`,
              }}
            />
          ))}
        </span>
      </motion.button>
      {showTooltip && description && (
        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none"
        >
          <div
            className="bg-[var(--color-bg-elevated)] text-[var(--color-text-inverse)] px-3 py-1.5 rounded-full font-mono text-[0.75rem]"
          >
            {description}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Group row ────────────────────────────────────────────────────────────────

function SkillGroup({
  group,
  groupIndex,
  reduced,
  onSkillHover,
  onSkillLeave,
  onSkillClick,
  hidden,
}: {
  group: (typeof skillGroups)[number];
  groupIndex: number;
  reduced: boolean;
  onSkillHover?: (skill: string, e: React.MouseEvent) => void;
  onSkillLeave?: () => void;
  onSkillClick?: (skill: string) => void;
  hidden?: boolean;
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
      className={`flex flex-col gap-3 ${hidden ? "hidden" : ""}`}
    >
      {/* Category label */}
      <span
        className="text-label"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {group.label}
      </span>

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillTag
            key={skill}
            skill={skill}
            accent={group.accent}
            delay={baseDelay + i * 0.03}
            reduced={reduced}
            description={skillDescriptions[skill]}
            onHover={onSkillHover}
            onLeave={onSkillLeave}
            onClick={onSkillClick}
          />
        ))}
      </div>

      {/* Thin divider */}
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

  // ── Gamification state ────────────────────────────────────────────────
  const { state, isLoaded, currentLevel, levelName, showLevelUp, addXP, markSkillExplored, checkBadgeUnlock } =
    useGameState();
  const { showToast } = useToast();

  // ── Local state ────────────────────────────────────────────────────────
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showParticles, setShowParticles] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Particle clear timeout ref
  const particleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Skill hover handler ────────────────────────────────────────────────
  const handleSkillHover = useCallback(
    (skill: string, e: React.MouseEvent) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setMousePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setShowParticles(true);
      setActiveSkill(skill);
      setActiveCategory(categoryMap[skill] || null);
      markSkillExplored(skill);

      if (particleTimerRef.current) clearTimeout(particleTimerRef.current);
      particleTimerRef.current = setTimeout(() => setShowParticles(false), 600);
    },
    [markSkillExplored]
  );

  // ── Skill hover leave ──────────────────────────────────────────────────
  const handleSkillLeave = useCallback(() => {
    setActiveSkill(null);
    setActiveCategory(null);
    if (particleTimerRef.current) clearTimeout(particleTimerRef.current);
    particleTimerRef.current = setTimeout(() => setShowParticles(false), 200);
  }, []);

  // ── Skill click handler ────────────────────────────────────────────────
  const handleSkillClick = useCallback(
    (skill: string) => {
      addXP(10);
      setActiveSkill(skill);

      const cat = categoryMap[skill];
      const group = skillGroups.find((g) => g.label === cat);
      if (group) {
        const unlocked = checkBadgeUnlock(cat, [...group.skills]);
        if (unlocked) {
          const badgeEmoji =
            cat === "Frontend & Web"
              ? "⚡"
              : cat === "Backend & APIs"
              ? "⚙️"
              : cat === "AI / Machine Learning"
              ? "🧠"
              : cat === "Mobile"
              ? "📱"
              : cat === "3D & Creative Tech"
              ? "🎮"
              : "🔧";
          showToast(
            `${cat} Master Badge Unlocked! +50 XP`,
            badgeEmoji,
            categoryStyles[cat]?.hover?.border ?? "var(--color-primary)"
          );
        }
      }
    },
    [addXP, checkBadgeUnlock, showToast]
  );

  // ── Quest map category select ─────────────────────────────────────────
  const handleCategorySelect = useCallback((cat: string | null) => {
    setActiveCategory(cat);
    setFilterCategory((prev) => (prev === cat ? null : cat ?? null));
  }, []);

  // ── Clear filter ──────────────────────────────────────────────────────
  const handleClearFilter = useCallback(() => {
    setActiveSkill(null);
    setFilterCategory(null);
  }, []);

  // ── "Currently exploring" cycling ─────────────────────────────────────
  const currentlyLearning = [
    "Rust",
    "LangChain",
    "WebGPU",
    "Diffusion Models",
    "Edge AI",
  ];
  const [currentLearningIndex, setCurrentLearningIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLearningIndex((prev) => (prev + 1) % currentlyLearning.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ── Determine which particle color to use ─────────────────────────────
  const particleColor = (() => {
    if (!activeCategory) return "var(--color-primary)";
    const style = categoryStyles[activeCategory];
    return style?.hover?.border ?? "var(--color-primary)";
  })();

  // ── Determine which groups to show (filtered vs all) ──────────────────
  const filteredGroupIndex = filterCategory
    ? skillGroups.findIndex((g) => g.label === filterCategory)
    : -1;

  // ── Header animation ──────────────────────────────────────────────────
  const headerInitial = reduced ? undefined : { opacity: 0, y: 20 };
  const headerAnimate = reduced ? undefined : { opacity: 1, y: 0 };

  return (
    <section
      id="skills"
      className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg-elevated)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── XP Badge System (top-right anchor) ────────────────────── */}
        <div className="flex justify-end mb-8 -mt-4">
          <XPBadgeSystem
            state={state}
            currentLevel={currentLevel}
            levelName={levelName}
            showLevelUp={showLevelUp}
            isLoaded={isLoaded}
          />
        </div>

        {/* ── 3-column flex layout ─────────────────────────────────── */}
        <div className="flex gap-8 items-start">

          {/* ── LEFT: The Lab ─────────────────────────────────────── */}
          <TheLabPanel
            activeCategory={activeCategory}
            activeSkill={activeSkill}
          />

          {/* ── CENTER: Section header + skill groups ─────────────── */}
          <div className="flex-1 min-w-0">
            {/* Sticky header */}
            <div className="lg:sticky lg:top-[calc(2rem+var(--scroll-offset,0px))] self-start mb-8">
              <motion.div
                initial={headerInitial}
                whileInView={headerAnimate}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-eyebrow block mb-3">What I work with</span>
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

            {/* Filtered group indicator */}
            {filterCategory && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3"
              >
                <span
                  className="font-mono text-xs px-3 py-1 rounded-full"
                  style={{
                    background: `${categoryStyles[filterCategory]?.default?.bg ?? "rgba(0,0,0,0.1)"}`,
                    border: `1px solid ${categoryStyles[filterCategory]?.default?.border ?? "var(--color-border)"}`,
                    color: categoryStyles[filterCategory]?.default?.text ?? "var(--color-text-secondary)",
                  }}
                >
                  Showing: {filterCategory}
                </span>
                <button
                  onClick={() => setFilterCategory(null)}
                  className="font-mono text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
                >
                  Show all
                </button>
              </motion.div>
            )}

            {/* Skill groups */}
            {skillGroups.map((group, i) => (
              <SkillGroup
                key={group.label}
                group={group}
                groupIndex={i}
                reduced={reduced}
                onSkillHover={handleSkillHover}
                onSkillLeave={handleSkillLeave}
                onSkillClick={handleSkillClick}
                hidden={
                  filterCategory !== null && group.label !== filterCategory
                }
              />
            ))}
          </div>

          {/* ── RIGHT: The Server Room ─────────────────────────────── */}
          <ServerRoomPanel
            activeCategory={activeCategory}
            activeSkill={activeSkill}
          />
        </div>

        {/* ── Skill Quest Map ──────────────────────────────────────── */}
        <div className="mt-10">
          <SkillQuestMap
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* ── Hint for desktop users ───────────────────────────────── */}
        <div className="hidden lg:block text-center mt-4">
          <span
            className="font-mono text-[0.65rem]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Hover skills to explore &middot; Click zones to filter
          </span>
        </div>

        {/* ── Currently exploring strip ───────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-[0.85rem] text-[var(--color-text-tertiary)] font-body">
              Currently exploring
              <span className="ml-2 text-[var(--color-text-secondary)]">→</span>
            </span>
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentlyLearning[currentLearningIndex]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{
                    border: "1px dashed var(--color-amber)",
                    color: "var(--color-amber)",
                    background: "rgba(217, 119, 6, 0.05)",
                  }}
                >
                  {currentlyLearning[currentLearningIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter / active skill banner ────────────────────────────── */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full px-5 py-2 shadow-lg pointer-events-auto"
          >
            <span className="font-mono text-xs text-[var(--color-text-secondary)]">
              Showing projects with{" "}
              <strong style={{ color: "var(--color-primary)" }}>
                {activeSkill}
              </strong>
            </span>
            <button
              onClick={handleClearFilter}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors text-lg leading-none"
              aria-label="Clear filter"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Particle Emitter ────────────────────────────────────────── */}
      <ParticleEmitter
        x={mousePos.x}
        y={mousePos.y}
        color={particleColor}
        count={12}
        active={showParticles}
      />
    </section>
  );
}
