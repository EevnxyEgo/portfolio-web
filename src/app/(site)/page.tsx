import { Suspense } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HeroSection />
    </Suspense>
  );
}
