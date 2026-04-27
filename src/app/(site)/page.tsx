import { Suspense } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectDeckSection,
  ExperienceSection,
  CertificationsSection,
  ContactSection,
} from "@/components/sections";
import { getSiteConfig } from "@/lib/keystatic";

export default async function HomePage() {
  const siteConfig = await getSiteConfig();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <HeroSection
        availableText={siteConfig.heroAvailableText}
        firstName={siteConfig.heroFirstName}
        lastName={siteConfig.heroLastName}
      />
      <AboutSection
        heading={siteConfig.aboutHeading}
        location={siteConfig.aboutLocation}
        availability={siteConfig.aboutAvailability}
      />
      <SkillsSection />
      <ProjectDeckSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection
        headline1={siteConfig.contactHeadline1}
        headline2={siteConfig.contactHeadline2}
        headline3={siteConfig.contactHeadline3}
        subtext={siteConfig.contactSubtext}
        email={siteConfig.contactEmail}
        github={siteConfig.socialGithub}
        linkedin={siteConfig.socialLinkedin}
      />
    </Suspense>
  );
}