import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Separator } from "@/components/ui";

const socialLinks = [
  {
    href: "https://github.com/EevnxyEgo",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "mailto:arseniuswahyu@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-4xl text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors"
            >
              A.
            </Link>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-md">
              Fullstack Developer & ML Engineer building intelligent systems at
              the intersection of web, AI, and immersive technology.
            </p>
            <div className="mt-6 flex gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <a
              href="mailto:arseniuswahyu@gmail.com"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors group"
            >
              <span className="font-mono text-sm">arseniuswahyu@gmail.com</span>
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-tertiary)]">
            © {currentYear} Arsenius Audley Wahyu Djatmiko. All rights reserved.
          </p>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
