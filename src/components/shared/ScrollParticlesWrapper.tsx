"use client";

import dynamic from "next/dynamic";

const ScrollParticles = dynamic(
  () => import("./ScrollParticles").then((m) => m.ScrollParticles),
  { ssr: false }
);

export function ScrollParticlesWrapper() {
  return <ScrollParticles />;
}
