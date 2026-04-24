import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Arsenius Audley",
  description:
    "Get in touch with Arsenius Audley for full-time roles, freelance projects, or interesting collaborations.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-display font-display">Contact</h1>
        <p className="text-[var(--color-text-secondary)] mt-4">
          Full page coming soon.
        </p>
      </div>
    </div>
  );
}
