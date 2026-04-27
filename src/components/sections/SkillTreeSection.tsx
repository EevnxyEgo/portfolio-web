"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Skill Data Types ──────────────────────────────────────────────────────────
interface SkillNode {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  category: "frontend" | "backend" | "ml-ai" | "mobile" | "3d" | "tools";
  x: number;
  y: number;
  connections: string[];
  description: string;
  projectsUsedIn: string[];
}

const skillNodes: SkillNode[] = [
  // ROOT
  { id: "root", name: "A", level: 3, category: "frontend", x: 400, y: 50, connections: ["frontend-root", "backend-root", "ml-root"], description: "Full Stack Developer & ML Engineer", projectsUsedIn: [] },

  // FRONTEND BRANCH
  { id: "frontend-root", name: "Frontend", level: 3, category: "frontend", x: 150, y: 160, connections: ["react", "nextjs", "typescript"], description: "Building beautiful, responsive UIs", projectsUsedIn: [] },
  { id: "react", name: "React", level: 3, category: "frontend", x: 60, y: 270, connections: [], description: "Component-based UI library by Meta", projectsUsedIn: ["fitbuddy-ai"] },
  { id: "nextjs", name: "Next.js", level: 3, category: "frontend", x: 140, y: 290, connections: [], description: "React framework for production", projectsUsedIn: ["fitbuddy-ai"] },
  { id: "typescript", name: "TypeScript", level: 3, category: "frontend", x: 220, y: 280, connections: [], description: "Typed JavaScript at scale", projectsUsedIn: ["fitbuddy-ai"] },

  // BACKEND BRANCH
  { id: "backend-root", name: "Backend", level: 2, category: "backend", x: 400, y: 180, connections: ["nodejs", "python", "expressjs"], description: "Server-side logic and APIs", projectsUsedIn: [] },
  { id: "nodejs", name: "Node.js", level: 2, category: "backend", x: 330, y: 300, connections: [], description: "JavaScript runtime for servers", projectsUsedIn: [] },
  { id: "python", name: "Python", level: 3, category: "backend", x: 400, y: 310, connections: [], description: "Versatile language for web and ML", projectsUsedIn: ["baki", "healthylicious", "41-card-game"] },
  { id: "expressjs", name: "Express.js", level: 2, category: "backend", x: 470, y: 300, connections: [], description: "Fast, minimal Node.js framework", projectsUsedIn: [] },

  // ML/AI BRANCH
  { id: "ml-root", name: "AI / ML", level: 3, category: "ml-ai", x: 650, y: 160, connections: ["tensorflow", "opencv", "mlkit", "gemini"], description: "Building intelligent systems", projectsUsedIn: [] },
  { id: "tensorflow", name: "TensorFlow", level: 3, category: "ml-ai", x: 580, y: 270, connections: [], description: "ML platform by Google", projectsUsedIn: ["baki", "healthylicious", "41-card-game"] },
  { id: "opencv", name: "OpenCV", level: 3, category: "ml-ai", x: 660, y: 290, connections: [], description: "Computer vision library", projectsUsedIn: ["baki", "41-card-game"] },
  { id: "mlkit", name: "MLKit", level: 2, category: "ml-ai", x: 740, y: 280, connections: [], description: "ML for mobile by Google", projectsUsedIn: ["baki"] },
  { id: "gemini", name: "Gemini API", level: 2, category: "ml-ai", x: 800, y: 290, connections: [], description: "Generative AI by Google", projectsUsedIn: ["fitbuddy-ai"] },
];

const categoryColors: Record<SkillNode["category"], string> = {
  frontend: "var(--color-primary)",
  backend: "var(--color-sky)",
  "ml-ai": "var(--color-amber)",
  mobile: "var(--color-sage)",
  "3d": "var(--color-blush)",
  tools: "var(--color-text-secondary)",
};

// ── SVG Hexagon Path ──────────────────────────────────────────────────────────
function getHexagonPath(size: number): string {
  const s = size / 2;
  return `M ${s} 0 L ${s * 1.866} ${s * 0.5} L ${s * 1.866} ${s * 1.5} L ${s} ${s * 2} L ${s * 0.134} ${s * 1.5} L ${s * 0.134} ${s * 0.5} Z`;
}

// ── Tooltip Component ─────────────────────────────────────────────────────────
function SkillTooltip({ skill, position }: { skill: SkillNode; position: { x: number; y: number } }) {
  const color = categoryColors[skill.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y - 10,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div
        className="px-4 py-3 rounded-lg border shadow-lg"
        style={{
          background: "var(--color-bg-elevated)",
          borderColor: "var(--color-border)",
          minWidth: "180px",
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-heading font-semibold text-sm" style={{ color: "var(--color-text)" }}>
            {skill.name}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className="text-xs"
                style={{ color: star <= skill.level ? color : "var(--color-border)" }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mb-2">{skill.description}</p>
        {skill.projectsUsedIn.length > 0 && (
          <div className="pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
            <span className="text-[0.65rem] text-[var(--color-text-tertiary)] font-mono">
              Used in: {skill.projectsUsedIn.join(", ")}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Connection Lines ───────────────────────────────────────────────────────────
function ConnectionLines({ nodes, activeNodeId }: { nodes: SkillNode[]; activeNodeId: string | null }) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {nodes.map((node) =>
        node.connections.map((targetId) => {
          const target = nodeMap.get(targetId);
          if (!target) return null;

          const isActive = activeNodeId === node.id || activeNodeId === targetId;
          const color = isActive ? categoryColors[node.category] : "var(--color-border)";

          return (
            <motion.line
              key={`${node.id}-${targetId}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke={color}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              style={{ opacity: isActive ? 1 : 0.4 }}
            />
          );
        })
      )}
    </svg>
  );
}

// ── Skill Node Component ───────────────────────────────────────────────────────
function Node({ skill, onHover, onLeave, onClick, isActive }: {
  skill: SkillNode;
  onHover: (skill: SkillNode, x: number, y: number) => void;
  onLeave: () => void;
  onClick: () => void;
  isActive: boolean;
}) {
  const color = categoryColors[skill.category];
  const size = skill.id === "root" ? 36 : 26;
  const isExpert = skill.level === 3;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: skill.x, top: skill.y, transform: "translate(-50%, -50%)" }}
      whileHover={{ scale: 1.15 }}
      onHoverStart={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        onHover(skill, rect.left + rect.width / 2, rect.top);
      }}
      onHoverEnd={onLeave}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: skill.id === "root" ? 0.2 : 0.5 }}
    >
      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`}>
        {/* Glow effect for expert nodes */}
        {isExpert && (
          <motion.circle
            cx={size}
            cy={size}
            r={size * 0.9}
            fill="none"
            stroke={color}
            strokeWidth={3}
            opacity={0.3}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Hexagon */}
        <motion.path
          d={getHexagonPath(size * 2)}
          fill={isActive ? color : skill.level === 1 ? "var(--color-bg-elevated)" : `${color}15`}
          fillOpacity={isActive ? 0.3 : 1}
          stroke={isActive ? color : skill.level === 1 ? "var(--color-border)" : color}
          strokeWidth={skill.level === 1 ? 1.5 : 2}
          animate={isExpert && !isActive ? {
            filter: ["drop-shadow(0 0 2px transparent)", `drop-shadow(0 0 4px ${color})`, "drop-shadow(0 0 2px transparent)"],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Icon/text inside */}
        <text
          x={size}
          y={size + 4}
          textAnchor="middle"
          fill={skill.level === 1 ? "var(--color-text-tertiary)" : "var(--color-text)"}
          fontSize={skill.id === "root" ? 16 : 10}
          fontFamily="var(--font-bebas)"
          fontWeight="bold"
        >
          {skill.name}
        </text>
      </svg>

      {/* Level stars for non-root nodes */}
      {skill.id !== "root" && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5">
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: star <= skill.level ? color : "transparent",
                border: star > skill.level ? `1px solid var(--color-border)` : "none",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
interface SkillTreeSectionProps {
  initialView?: "tree" | "list";
}

export function SkillTreeSection({ initialView = "list" }: SkillTreeSectionProps) {
  const [viewMode, setViewMode] = useState<"tree" | "list">(
    typeof window !== "undefined" && window.innerWidth >= 768 ? initialView : "list"
  );
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((skill: SkillNode, x: number, y: number) => {
    setHoveredSkill(skill);
    setHoverPosition({ x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  const handleClick = useCallback((skill: SkillNode) => {
    setActiveSkill((prev) => (prev?.id === skill.id ? null : skill));
  }, []);

  return (
    <section id="skills" className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg-elevated)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="section-eyebrow block mb-2">What I work with</span>
            <h2 className="text-h2 font-serif" style={{ fontFamily: "var(--font-serif)" }}>
              Technical arsenal.
            </h2>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--color-bg)" }}>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("tree")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "tree"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              Tree View
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === "tree" ? (
            <motion.div
              key="tree"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* SVG Canvas */}
              <div
                ref={containerRef}
                className="relative w-full overflow-x-auto"
                style={{ height: "450px" }}
              >
                <div className="relative w-[900px] h-full mx-auto">
                  <ConnectionLines nodes={skillNodes} activeNodeId={activeSkill?.id || hoveredSkill?.id || null} />

                  {skillNodes.map((skill) => (
                    <Node
                      key={skill.id}
                      skill={skill}
                      onHover={handleHover}
                      onLeave={handleLeave}
                      onClick={() => handleClick(skill)}
                      isActive={activeSkill?.id === skill.id}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-8">
                {[
                  { category: "frontend", label: "Frontend" },
                  { category: "backend", label: "Backend" },
                  { category: "ml-ai", label: "AI / ML" },
                ].map(({ category, label }) => (
                  <div key={category} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] }}
                    />
                    <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Clicked skill detail panel */}
              <AnimatePresence>
                {activeSkill && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-8 p-6 rounded-xl border"
                    style={{
                      background: "var(--color-bg)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-heading mb-1" style={{ color: "var(--color-text)" }}>
                          {activeSkill.name}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          {activeSkill.description}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((star) => (
                          <span
                            key={star}
                            className="text-lg"
                            style={{ color: star <= activeSkill.level ? categoryColors[activeSkill.category] : "var(--color-border)" }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {activeSkill.projectsUsedIn.length > 0 && (
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                        <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
                          Used in projects:
                        </span>
                        <div className="flex gap-2 mt-2">
                          {activeSkill.projectsUsedIn.map((slug) => (
                            <Link
                              key={slug}
                              href={`/projects/${slug}`}
                              className="px-3 py-1 rounded-full text-xs font-mono"
                              style={{
                                background: `${categoryColors[activeSkill.category]}15`,
                                color: categoryColors[activeSkill.category],
                              }}
                            >
                              {slug}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredSkill && !activeSkill && (
                  <SkillTooltip skill={hoveredSkill} position={hoverPosition} />
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Simple list view - use existing SkillsSection */}
              <p className="text-center text-[var(--color-text-secondary)]">
                Switch to Tree View to explore the skill tree interactively.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}