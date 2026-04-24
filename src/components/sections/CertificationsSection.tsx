"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const certifications = [
  {
    title: "Bangkit Academy Machine Learning Cohort",
    issuer: "Google × Tokopedia × Traveloka × Gojek",
    date: "2024",
    credentialId: "Bangkit-2024-ML-XXXXX",
    category: "ml",
    credentialUrl: null,
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "TensorFlow-XXXXX",
    category: "ml",
    credentialUrl: "https://www.tensorflow.org/certificate",
  },
  {
    title: "Google Cloud Platform Fundamentals",
    issuer: "Google Cloud",
    date: "2024",
    credentialId: "GCP-XXXXX",
    category: "cloud",
    credentialUrl: null,
  },
];

export function CertificationsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="certifications"
      className="relative py-[clamp(5rem,10vw,8rem)] overflow-hidden"
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
            Credentials & Recognition
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mt-2">
            CERTIFICATIONS
          </h2>
          <p className="text-[var(--color-text-secondary)] text-body-lg mt-4 max-w-2xl mx-auto">
            Continuous learning, formally verified
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={cn(
                "group relative p-6 rounded-lg border border-[var(--color-border)]",
                "bg-[var(--color-bg)]",
                "hover:border-[var(--color-border-bright)]",
                "transition-all duration-300"
              )}
            >
              {/* Category badge */}
              <div className="mb-4">
                <Badge variant="accent" size="sm">
                  {cert.category.toUpperCase()}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-[var(--color-text-secondary)] text-sm mb-2">
                {cert.issuer}
              </p>

              {/* Date & Credential ID */}
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)] mb-4">
                <span className="font-mono">{cert.date}</span>
                <span className="font-mono">ID: {cert.credentialId}</span>
              </div>

              {/* Credential link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 text-sm",
                    "text-[var(--color-accent)] hover:text-[var(--color-accent-glow)]",
                    "transition-colors"
                  )}
                >
                  Verify Certificate
                  <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 font-heading text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            View All Certifications
          </Link>
        </motion.div>
      </div>
    </section>
  );
}