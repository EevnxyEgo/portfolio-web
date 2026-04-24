import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Arsenius Audley",
  description:
    "Learn more about Arsenius Audley Wahyu Djatmiko — Fullstack Developer & ML Engineer from ITS Surabaya.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-display font-display">About Me</h1>
        <p className="text-[var(--color-text-secondary)] mt-4">
          Full page coming soon.
        </p>
      </div>
    </div>
  );
}
