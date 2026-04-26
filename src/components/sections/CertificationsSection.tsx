"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface CertificationData {
  title: string;
  issuer: string;
  issuerInitials: string;
  date: string;
  credentialId: string;
  category: "ml" | "cloud" | "design";
  credentialUrl?: string;
}

const certifications: CertificationData[] = [
  {
    title: "Bangkit Academy Machine Learning Cohort",
    issuer: "Google × Tokopedia × Traveloka × Gojek",
    issuerInitials: "BA",
    date: "2024",
    credentialId: "Bangkit-2024-ML-XXXXX",
    category: "ml",
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    issuerInitials: "G",
    date: "2024",
    credentialId: "TF-XXXXX",
    category: "ml",
    credentialUrl: "https://www.tensorflow.org/certificate",
  },
  {
    title: "Google Cloud Platform Fundamentals",
    issuer: "Google Cloud",
    issuerInitials: "GC",
    date: "2024",
    credentialId: "GCP-XXXXX",
    category: "cloud",
  },
];

type FilterCategory = "all" | "ml" | "cloud" | "design";

const filterTabs: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "ML", value: "ml" },
  { label: "Cloud", value: "cloud" },
  { label: "Design", value: "design" },
];

const categoryStyles: Record<CertificationData["category"], { bg: string; text: string; border: string }> = {
  ml: {
    bg: "rgba(232, 51, 10, 0.10)",
    text: "#E8330A",
    border: "rgba(232, 51, 10, 0.25)",
  },
  cloud: {
    bg: "rgba(46, 120, 181, 0.10)",
    text: "#2E78B5",
    border: "rgba(46, 120, 181, 0.25)",
  },
  design: {
    bg: "rgba(194, 85, 106, 0.10)",
    text: "#C2556A",
    border: "rgba(194, 85, 106, 0.25)",
  },
};

export function CertificationsSection() {
  const prefersReduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredCertifications =
    activeFilter === "all"
      ? certifications
      : certifications.filter((c) => c.category === activeFilter);

  return (
    <section
      id="certifications"
      className="relative py-[clamp(5rem,10vw,8rem)]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header — left-aligned */}
        <div className="mb-12">
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-text-tertiary)] mb-3"
          >
            Credentials
          </motion.p>
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight"
          >
            CERTIFICATIONS
          </motion.h2>
        </div>

        {/* Filter tabs — pill style */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                "px-5 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-200",
                "border border-[var(--color-border)] cursor-pointer",
                activeFilter === tab.value
                  ? "bg-[var(--color-primary-muted)] border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "bg-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              )}
              aria-pressed={activeFilter === tab.value}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Certifications grid */}
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredCertifications.map((cert) => {
            const style = categoryStyles[cert.category];
            return (
              <motion.div
                key={cert.title}
                variants={fadeInUp}
                className={cn(
                  "group relative p-6 rounded-[var(--radius-xl)]",
                  "bg-[var(--color-bg-elevated)] border border-[var(--color-border)]",
                  "hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
                )}
              >
                {/* Issuer icon box */}
                <div
                  className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-5"
                  style={{ backgroundColor: style.bg }}
                >
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: style.text }}
                  >
                    {cert.issuerInitials}
                  </span>
                </div>

                {/* Certification name */}
                <h3 className="font-body font-semibold text-base text-[var(--color-text)] mb-1.5 leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="font-body text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {cert.issuer}
                </p>

                {/* Date and credential ID */}
                <div className="flex flex-col gap-0.5 mb-5">
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                    {cert.date}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                    {cert.credentialId}
                  </span>
                </div>

                {/* Verify link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-primary)] hover:gap-2.5 transition-all duration-200"
                    aria-label={`Verify ${cert.title} certificate`}
                  >
                    Verify
                    <ExternalLink size={12} strokeWidth={2} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 pt-2"
        >
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 group"
          >
            View All Certifications
            <span
              className="inline-block w-4 h-px bg-current transition-all duration-200 group-hover:w-6"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}