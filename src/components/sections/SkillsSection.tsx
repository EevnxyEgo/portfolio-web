"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    name: "Frontend",
    tagClass: "tag-primary",
    skills: [
      "React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS",
      "Tailwind CSS", "shadcn-ui", "Framer Motion",
    ],
  },
  {
    name: "Backend",
    tagClass: "tag-warm",
    skills: [
      "Express.js", "Node.js", "Python", "REST APIs",
      "Convex", "Clerk Auth",
    ],
  },
  {
    name: "AI / ML",
    tagClass: "tag-cool",
    skills: [
      "TensorFlow", "Keras", "scikit-learn", "OpenCV", "MLKit",
      "TensorFlow Recommenders", "Gemini API", "vapi.ai",
      "Pose Detection", "CNN", "NLP",
    ],
  },
  {
    name: "3D & Creative",
    tagClass: "tag-sage",
    skills: [
      "Unreal Engine 5", "Blender", "MetaHuman",
      "React Three Fiber", "Three.js",
    ],
  },
  {
    name: "Tools",
    tagClass: "tag",
    skills: [
      "Git", "Docker", "Nginx", "Linux", "Vercel",
      "GCP", "Figma", "VS Code",
    ],
  },
];

export function SkillsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="skills"
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
            My Technical Arsenal
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mt-2">
            SKILLS
          </h2>
          <p className="text-[var(--color-text-secondary)] text-body-lg mt-4 max-w-2xl mx-auto">
            Technologies I use to turn ideas into reality
          </p>
        </motion.div>

        {/* Flowing tag cloud */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto"
        >
          {skillCategories.map((category, categoryIndex) =>
            category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: (categoryIndex * 0.1) + (skillIndex * 0.03),
                }}
              >
                <span className={category.tagClass}>{skill}</span>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Category labels below */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-[var(--color-border)]"
        >
          {skillCategories.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                category.tagClass === "tag-primary" && "bg-[var(--color-primary)]",
                category.tagClass === "tag-warm" && "bg-[var(--color-warm)]",
                category.tagClass === "tag-cool" && "bg-[var(--color-cool)]",
                category.tagClass === "tag-sage" && "bg-[var(--color-sage)]",
                category.tagClass === "tag" && "bg-[var(--color-text-tertiary)]",
              )} />
              <span className="font-heading text-sm text-[var(--color-text-secondary)]">
                {category.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
