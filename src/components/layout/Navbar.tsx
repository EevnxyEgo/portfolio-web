"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use client-side check for mobile detection
  const isMobile = mounted && window.innerWidth < 768;

  const isScrolled = mounted && window.scrollY > 80;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300",
          isScrolled
            ? "bg-[var(--color-bg-overlay)]/80 backdrop-blur-xl border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-2xl text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors"
            >
              A.
            </Link>

            {/* Desktop Nav - shown when not mobile (client only) */}
            {!isMobile && (
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative font-heading text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Right side: CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/#contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "font-heading font-medium text-sm",
                  "h-9 px-4 rounded-[var(--radius-md)]",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-primary-glow)] hover:shadow-[var(--shadow-glow)]",
                  "active:bg-[var(--color-primary-dark)]",
                  "transition-all duration-200 ease-out",
                  "cursor-pointer"
                )}
              >
                Hire Me
              </Link>

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-[var(--color-text-primary)]"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-[var(--color-bg)]"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-3xl text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}