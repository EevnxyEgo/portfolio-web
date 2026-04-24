"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    name: "Frontend",
    color: "primary" as const,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES2022+)",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "shadcn-ui",
      "Bootstrap",
      "Framer Motion",
    ],
  },
  {
    name: "Backend",
    color: "accent" as const,
    skills: [
      "Express.js",
      "Node.js",
      "Python",
      "REST APIs",
      "Convex",
      "Clerk (Auth)",
    ],
  },
  {
    name: "AI / Machine Learning",
    color: "accent" as const,
    skills: [
      "TensorFlow / Keras",
      "scikit-learn",
      "OpenCV",
      "MLKit",
      "TensorFlow Recommenders",
      "Gemini API",
      "vapi.ai (Voice AI)",
      "Pose Detection",
      "Transfer Learning",
      "CNN",
      "Recommendation Systems",
      "NLP (basics)",
    ],
  },
  {
    name: "Mobile & Cross-platform",
    color: "default" as const,
    skills: ["Kotlin (Android)", "Android Development"],
  },
  {
    name: "3D & Creative Tech",
    color: "primary" as const,
    skills: [
      "Unreal Engine 5",
      "Blender",
      "MetaHuman",
      "Rokoko (Motion Capture)",
      "React Three Fiber",
      "Three.js",
    ],
  },
  {
    name: "Tools & DevOps",
    color: "default" as const,
    skills: [
      "Git / GitHub",
      "Docker",
      "Nginx",
      "Linux (Ubuntu)",
      "Vercel",
      "Google Cloud Platform",
      "Jupyter Notebook",
      "Google Colab",
      "Figma",
      "VS Code",
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

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
              }}
              className={cn(
                "p-6 rounded-lg border border-[var(--color-border)]",
                "bg-[var(--color-bg)] hover:border-[var(--color-border-bright)]",
                "transition-all duration-300"
              )}
            >
              <h3
                className={cn(
                  "font-heading text-lg mb-4 pb-3 border-b border-[var(--color-border)]",
                  category.color === "primary" && "text-[var(--color-primary)]",
                  category.color === "accent" && "text-[var(--color-accent)]",
                  category.color === "default" && "text-[var(--color-text-primary)]"
                )}
              >
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <Badge variant={category.color}>{skill}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}