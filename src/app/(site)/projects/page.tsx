import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Arsenius Audley",
  description:
    "Explore projects built by Arsenius Audley — ML-powered apps, 3D experiences, and fullstack web applications.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-display font-display">Projects</h1>
        <p className="text-[var(--color-text-secondary)] mt-4">
          Full page coming soon.
        </p>
      </div>
    </div>
  );
}
