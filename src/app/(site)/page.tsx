import { Suspense } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  CertificationsSection,
  ContactSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
    </Suspense>
  );
}
