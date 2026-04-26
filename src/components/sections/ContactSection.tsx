"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL = "arseniuswahyu@gmail.com";
const GITHUB = "https://github.com/EevnxyEgo";
const LINKEDIN = "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251";

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
      {/* Warm editorial grid: 45% left / 55% right */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="grid gap-16 lg:gap-20"
          style={{ gridTemplateColumns: "minmax(0, 45fr) minmax(0, 55fr)" }}
        >
          {/* ── Left column ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <span className="text-[var(--color-text-tertiary)] font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] uppercase mb-6">
              Get in touch
            </span>

            {/* Headline — Playfair Display, mixed normal + italic */}
            <h2
              className="text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let&apos;s build{" "}
              <em
                className="not-italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "var(--color-primary)",
                }}
              >
                something
              </em>
              <br />
              <span style={{ fontFamily: "var(--font-serif)" }}>together.</span>
            </h2>

            {/* Sub text */}
            <p
              className="mt-5 mb-8 text-sm leading-relaxed max-w-[380px]"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}
            >
              Open for full-time roles, freelance projects, and interesting collaborations. I
              combine fullstack web development with AI and automation.
            </p>

            {/* Email link */}
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-base mb-8 transition-colors duration-150"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text)",
                fontSize: "0.95rem",
              }}
            >
              <Mail size={18} style={{ color: "var(--color-primary)" }} />
              <span className="hover:text-[var(--color-primary)] transition-colors duration-150">
                {EMAIL}
              </span>
            </a>

            {/* Social links — icon + text (NOT buttons) */}
            <div className="flex items-center gap-8">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <FaGithub size={18} />
                <span className="hover:text-[var(--color-text)]">GitHub</span>
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <FaLinkedin size={18} />
                <span className="hover:text-[var(--color-text)]">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* ── Right column — Form ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center justify-center text-center p-12 rounded-xl border"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-bg)",
                  minHeight: "340px",
                }}
              >
                <CheckCircle
                  size={52}
                  style={{ color: "var(--color-primary)", marginBottom: "1rem" }}
                />
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
                >
                  Message sent!
                </h3>
                <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="form-input"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label">
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
                    className="form-input resize-none"
                  />
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div
                    className="flex items-center gap-3 p-4 rounded-lg border"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-bg)",
                    }}
                  >
                    <AlertCircle size={18} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}
                    >
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}

                {/* Submit — pill button, bg primary, no glow */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full text-white text-sm font-medium transition-all duration-200 self-start mt-2"
                  style={{
                    background: "var(--color-primary)",
                    fontFamily: "var(--font-body)",
                    opacity: status === "loading" ? 0.7 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <span
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        style={{ animation: "spin 0.7s linear infinite" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Keyframe for loading spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}