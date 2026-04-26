"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/shared/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next =
      theme === "dark" || (theme === "system" && resolvedTheme === "dark")
        ? "light"
        : "dark";
    setTheme(next);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300",
          isScrolled
            ? "bg-[var(--color-bg-overlay)] backdrop-blur-xl border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[var(--content-max)] mx-auto px-[var(--content-px)]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              data-logo
              className="font-dm-sans font-semibold text-base text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors"
            >
              A.
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-dm-sans text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] transition-all duration-300"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </motion.div>
              </button>

              {/* CTA — text link, not button */}
              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-1 font-dm-sans font-medium text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                Let&apos;s talk →
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-[var(--color-bg)] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-dm-sans text-3xl text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="font-dm-sans font-medium text-[var(--color-primary)] text-xl"
              >
                Let&apos;s talk →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
