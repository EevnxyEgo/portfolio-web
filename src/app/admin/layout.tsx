import Link from "next/link";
import { FileText, Mail, ExternalLink } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Admin Header */}
      <header className="border-b border-[var(--color-border)] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-[var(--color-primary)]">
              Admin Panel
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              arsenius-portfolio management
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"
          >
            <ExternalLink size={14} />
            Back to Site
          </Link>
        </div>
      </header>

      {/* Admin Nav */}
      <nav className="border-b border-[var(--color-border)] px-8">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link
            href="/admin/contact"
            className="flex items-center gap-2 py-4 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border-b-2 border-transparent hover:border-[var(--color-primary)] transition-colors -mb-px"
          >
            <Mail size={16} />
            Contact Submissions
          </Link>
          <Link
            href="/keystatic"
            className="flex items-center gap-2 py-4 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border-b-2 border-transparent hover:border-[var(--color-primary)] transition-colors -mb-px"
          >
            <FileText size={16} />
            Content Manager
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">{children}</main>
    </div>
  );
}