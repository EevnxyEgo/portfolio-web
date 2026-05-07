"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, User, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--color-text-secondary)]">Loading...</div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-20">
        <Mail size={48} className="mx-auto mb-4 text-[var(--color-text-tertiary)]" />
        <h2 className="font-heading text-xl mb-2">No submissions yet</h2>
        <p className="text-[var(--color-text-secondary)]">
          Contact form submissions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl">
          {submissions.length} Submission{submissions.length !== 1 ? "s" : ""}
        </h2>
        <Link
          href="/keystatic"
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          Manage Content →
        </Link>
      </div>

      <div className="space-y-4">
        {submissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg">{submission.subject}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {submission.name}
                  </span>
                  <span>{submission.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]">
                <Calendar size={14} />
                {new Date(submission.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {submission.message}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`mailto:${submission.email}?subject=Re: ${encodeURIComponent(submission.subject)}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
              >
                <ExternalLink size={14} />
                Reply via Email
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
