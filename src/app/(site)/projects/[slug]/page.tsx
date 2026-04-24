import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project | Arsenius Audley",
};

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-h1 font-heading">Project: {params.slug}</h1>
        <p className="text-[var(--color-text-secondary)] mt-4">
          Full page coming soon.
        </p>
      </div>
    </div>
  );
}
