"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExperienceEntry {
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  tags?: string[];
  /** Key entry = filled primary dot; other = border-only dot */
  keyEntry?: boolean;
}

const experiences: ExperienceEntry[] = [
  {
    year: "2024",
    title: "Fresh Graduate",
    organization: "Institut Teknologi Sepuluh Nopember (ITS)",
    location: "Surabaya, Indonesia",
    description: "Computer Engineering degree — learned that the most interesting problems live at the boundary between disciplines.",
    tags: ["Computer Engineering", "Systems Design", "Research"],
    keyEntry: true,
  },
  {
    year: "2024",
    title: "Undergraduate Thesis",
    organization: "ITS Surabaya",
    location: "Surabaya, Indonesia",
    description: "360° Dynamic Camera System for Digital Twin Concert Using Unreal Engine 5.",
    tags: ["Unreal Engine 5", "Digital Twin", "Real-time 3D", "Camera Systems"],
    keyEntry: true,
  },
  {
    year: "2024",
    title: "Bangkit Academy — ML Cohort",
    organization: "Google × Tokopedia × Traveloka × Gojek",
    location: "Remote",
    description: "Machine Learning specialization. Capstone: Healthylicious recipe recommender.",
    tags: ["Machine Learning", "TensorFlow", "Recommender Systems", "Capstone"],
    keyEntry: true,
  },
  {
    year: "2024",
    title: "Self-Directed Learning",
    organization: "Coursera + Udemy",
    location: "Self-paced",
    description: "Advanced Next.js & TypeScript. Output: FitBuddy AI — voice AI fitness trainer.",
    tags: ["Next.js", "TypeScript", "AI Integration"],
    keyEntry: false,
  },
  {
    year: "2023",
    title: "Computer Vision Project",
    organization: "ITS — Computer Vision Course",
    location: "Surabaya, Indonesia",
    description: "41-Card Game: Real-time playing card detection with CNN + OpenCV.",
    tags: ["Computer Vision", "CNN", "OpenCV", "Real-time Detection"],
    keyEntry: false,
  },
  {
    year: "2023",
    title: "Mobile ML Project",
    organization: "ITS — Telematics Course",
    location: "Surabaya, Indonesia",
    description: "BAKI: AI-powered fitness app with real-time exercise detection using MLKit.",
    tags: ["MLKit", "Mobile ML", "Pose Detection", "Android"],
    keyEntry: false,
  },
];

// Timeline geometry constants
const TIMELINE_LEFT = "120px"; // absolute position of the vertical line
const YEAR_LEFT = "0px";        // year anchors to the left edge of the container
const CONTENT_LEFT = "160px";   // content starts 40px right of the timeline

export function ExperienceSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg)]"
    >
      <div className="max-w-[680px] mx-auto px-6 lg:px-8">
        {/* Section header — left-aligned, editorial */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <span
            className="section-eyebrow"
            style={{ display: "block", marginBottom: "0.375rem" }}
          >
            My Journey
          </span>
          <h2
            className="font-serif"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
            }}
          >
            Experience.
          </h2>
        </motion.div>

        {/* Timeline body */}
        <div className="relative" style={{ minHeight: `${experiences.length * 100}px` }}>
          {/* Animated vertical line — draws from top to bottom */}
          <motion.div
            initial={prefersReduced ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              left: TIMELINE_LEFT,
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "var(--color-border)",
              transformOrigin: "top center",
            }}
          />

          {/* Experience entries */}
          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.year}-${exp.title}`}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative"
              >
                {/* Year — left of the timeline */}
                <div
                  style={{
                    position: "absolute",
                    left: YEAR_LEFT,
                    top: "2px",
                    width: "90px",
                    textAlign: "right",
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "1.2rem",
                    lineHeight: 1,
                    color: "var(--color-text-tertiary)",
                    letterSpacing: "0.05em",
                    userSelect: "none",
                  }}
                >
                  {exp.year}
                </div>

                {/* Dot — on the timeline */}
                <div
                  style={{
                    position: "absolute",
                    left: `calc(${TIMELINE_LEFT} - 4px)`,
                    top: "6px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: exp.keyEntry
                      ? "var(--color-primary)"
                      : "var(--color-bg)",
                    border: exp.keyEntry
                      ? "none"
                      : "1.5px solid var(--color-border)",
                    boxShadow: exp.keyEntry
                      ? "0 0 0 3px var(--color-bg), 0 0 0 4px var(--color-primary)"
                      : "none",
                    zIndex: 1,
                  }}
                />

                {/* Content — right of the timeline */}
                <div
                  style={{
                    marginLeft: CONTENT_LEFT,
                    paddingTop: "0",
                  }}
                >
                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: "var(--color-text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {exp.title}
                  </h3>

                  {/* Organization */}
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.4,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {exp.organization}
                  </p>

                  {/* Location */}
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "0.72rem",
                      color: "var(--color-text-tertiary)",
                      letterSpacing: "0.03em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {exp.location}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                      maxWidth: "48ch",
                      marginBottom: exp.tags ? "0.75rem" : 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Tags */}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
