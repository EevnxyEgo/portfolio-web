"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { siteConfig } from "@/lib/metadata";

export function ContactClient() {
  const prefersReduced = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Info */}
          <div>
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-accent text-accent text-sm tracking-[0.08em] uppercase">
                Get in Touch
              </span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] mt-2 leading-tight">
                Let&apos;s Build
                <br />
                Something
                <br />
                Together.
              </h1>
            </motion.div>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[var(--color-text-secondary)] text-body-lg mt-6"
            >
              Open for full-time roles, freelance projects, and interesting
              collaborations.
            </motion.p>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[var(--color-text-secondary)] mt-4"
            >
              I&apos;m currently looking for opportunities where I can combine
              fullstack web development with AI and automation. If that sounds
              like something your team needs — let&apos;s talk.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 space-y-6"
            >
              <div>
                <p className="text-sm text-[var(--color-text-tertiary)] mb-2">
                  Drop me a line
                </p>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors font-mono"
                >
                  <Mail size={16} />
                  {siteConfig.links.email}
                </a>
              </div>

              <div>
                <p className="text-sm text-[var(--color-text-tertiary)] mb-2">
                  Location
                </p>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <MapPin size={16} className="text-[var(--color-accent)]" />
                  Surabaya, Indonesia
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex gap-5 mt-12"
            >
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                GitHub
                <ArrowRight size={14} className="inline ml-1" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                LinkedIn
                <ArrowRight size={14} className="inline ml-1" />
              </a>
            </motion.div>
          </div>

          {/* Right column - Form */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="p-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="text-[var(--color-primary)]" size={24} />
                </div>
                <h3 className="font-heading text-xl mb-2">Message Sent!</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-heading mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-heading mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-heading mb-2"
                  >
                    What&apos;s this about?
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="Job opportunity, project collaboration, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-heading mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  variant="primary"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}