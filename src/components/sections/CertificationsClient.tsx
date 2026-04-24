"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  skills?: string[];
  category: string;
  verified?: boolean;
}

interface CertificationsClientProps {
  certifications: Certification[];
}

export function CertificationsClient({ certifications }: CertificationsClientProps) {
  const prefersReduced = useReducedMotion();

  const categoryColors: Record<string, string> = {
    academic: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    professional: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "ml-ai": "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20",
    cloud: "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20",
    development: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const categoryLabels: Record<string, string> = {
    academic: "Academic",
    professional: "Professional",
    "ml-ai": "ML/AI",
    cloud: "Cloud",
    development: "Development",
  };

  const categories = ["all", ...Array.from(new Set(certifications.map((c) => c.category)))];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
            Credentials & Recognition
          </span>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] mt-4">
            CERTIFICATIONS
          </h1>
          <p className="text-[var(--color-text-secondary)] text-body-lg mt-4 max-w-2xl mx-auto">
            Continuous learning, formally verified
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-heading transition-colors",
                "border border-[var(--color-border)]",
                "hover:border-[var(--color-primary)]",
                cat === "all"
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-[var(--color-bg)] text-[var(--color-text-secondary)]"
              )}
            >
              {cat === "all" ? "All" : categoryLabels[cat] || cat}
            </button>
          ))}
        </motion.div>

        {/* Certifications grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className={cn(
                "group relative p-6 rounded-lg border border-[var(--color-border)]",
                "bg-[var(--color-bg)]",
                "hover:border-[var(--color-border-bright)]",
                "transition-all duration-300"
              )}
            >
              {/* Verified badge */}
              {cert.verified && (
                <div className="absolute top-4 right-4">
                  <CheckCircle
                    size={16}
                    className="text-green-400"
                  />
                </div>
              )}

              {/* Category badge */}
              <div className="mb-4">
                <Badge
                  variant="outline"
                  className={cn("text-xs", categoryColors[cert.category] || "")}
                >
                  {categoryLabels[cert.category] || cert.category}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                {cert.issuer}
              </p>

              {/* Description */}
              {cert.description && (
                <p className="text-[var(--color-text-tertiary)] text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>
              )}

              {/* Date & Credential ID */}
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)] mb-4">
                <span className="font-mono">{cert.date}</span>
                {cert.credentialId && (
                  <span className="font-mono">ID: {cert.credentialId}</span>
                )}
              </div>

              {/* Skills */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="subtle" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 4 && (
                    <Badge variant="subtle" size="sm">
                      +{cert.skills.length - 4}
                    </Badge>
                  )}
                </div>
              )}

              {/* Credential link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 text-sm mt-auto",
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
      </div>
    </div>
  );
}