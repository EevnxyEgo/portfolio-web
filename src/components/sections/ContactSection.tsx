"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/metadata";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const prefersReduced = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="relative py-[clamp(5rem,10vw,8rem)] bg-[var(--color-bg-elevated)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column - Headline & Info */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <div>
              <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
                Get in Touch
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] mt-2 leading-[0.95]">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                TOGETHER.
              </h2>
            </div>

            <p className="text-[var(--color-text-secondary)] text-body-lg max-w-md">
              Open for full-time roles, freelance projects, and interesting
              collaborations. I&apos;m currently looking for opportunities where I can
              combine fullstack web development with AI and automation.
            </p>

            {/* Direct contact */}
            <div className="space-y-4">
              <span className="text-sm text-[var(--color-text-tertiary)] uppercase tracking-wider font-mono">
                Drop me a line
              </span>
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="inline-flex items-center gap-3 text-xl font-heading text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Mail size={24} className="text-[var(--color-primary)]" />
                {siteConfig.links.email}
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-[var(--color-border)] text-sm font-mono hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                GitHub
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-[var(--color-border)] text-sm font-mono hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 text-center"
              >
                <CheckCircle size={64} className="text-[var(--color-success)] mb-4" />
                <h3 className="font-heading text-2xl mb-2">Message Sent!</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "bg-[var(--color-bg)] border border-[var(--color-border)]",
                      "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                      "focus:border-[var(--color-primary)] focus:outline-none",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "bg-[var(--color-bg)] border border-[var(--color-border)]",
                      "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                      "focus:border-[var(--color-primary)] focus:outline-none",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider"
                  >
                    What&apos;s this about?
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Collaboration opportunity"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "bg-[var(--color-bg)] border border-[var(--color-border)]",
                      "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                      "focus:border-[var(--color-primary)] focus:outline-none",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg resize-none",
                      "bg-[var(--color-bg)] border border-[var(--color-border)]",
                      "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                      "focus:border-[var(--color-primary)] focus:outline-none",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 text-[var(--color-error)]">
                    <AlertCircle size={20} />
                    <p className="text-sm">
                      Something went wrong. Please try again or email directly.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  magnetic
                  disabled={status === "loading"}
                  className="w-full"
                  rightIcon={status !== "loading" ? <Send size={18} /> : undefined}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}