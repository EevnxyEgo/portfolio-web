import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
    <footer className="bg-[var(--color-bg-elevated)] border-t border-[var(--color-border)]">
      <div className="max-w-[var(--content-max)] mx-auto px-[var(--content-px)] py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left — logo + tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className="font-dm-sans font-semibold text-base text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors"
            >
              A.
            </Link>
            <p className="font-dm-sans text-sm text-[var(--color-text-tertiary)] text-center sm:text-left">
              Crafted with care in Surabaya 🇮🇩
            </p>
          </div>

          {/* Center — nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-dm-sans text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — copyright + socials */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="font-dm-sans text-sm text-[var(--color-text-tertiary)]">
              © {currentYear} Arsenius Audley
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
