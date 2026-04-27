import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import type { Project } from "@/types/project";
import type { Certification } from "@/types/certification";

const reader = createReader(process.cwd(), keystaticConfig);

const projectsDirectory = path.join(process.cwd(), "src/content/projects");
const certificationsDirectory = path.join(
  process.cwd(),
  "src/content/certifications"
);

// ── Site Config Types ─────────────────────────────────────────────────────────
export interface SiteConfig {
  heroAvailableText: string;
  heroFirstName: string;
  heroLastName: string;
  heroRoleSans: string;
  heroRoleSerif: string;
  heroDescription: string;
  aboutHeading: string;
  aboutLocation: string;
  aboutAvailability: "available" | "open" | "busy";
  contactHeadline1: string;
  contactHeadline2: string;
  contactHeadline3: string;
  contactSubtext: string;
  contactEmail: string;
  socialGithub: string;
  socialLinkedin: string;
  showSkills: boolean;
  showExperience: boolean;
  showCertifications: boolean;
  cvUrl: string;
}

// ── Default values ────────────────────────────────────────────────────────────
const defaultConfig: SiteConfig = {
  heroAvailableText: "Surabaya, Indonesia · Available for work",
  heroFirstName: "ARSENIUS",
  heroLastName: "AUDLEY",
  heroRoleSans: "Fullstack Developer &",
  heroRoleSerif: "ML Engineer",
  heroDescription: "Building intelligent systems at the intersection of web, AI, and immersive technology.",
  aboutHeading: "The human behind the code.",
  aboutLocation: "Surabaya, Indonesia",
  aboutAvailability: "available",
  contactHeadline1: "Let's build",
  contactHeadline2: "something",
  contactHeadline3: "together.",
  contactSubtext: "Open for full-time roles and interesting collaborations.",
  contactEmail: "arseniuswahyu@gmail.com",
  socialGithub: "https://github.com/EevnxyEgo",
  socialLinkedin: "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
  showSkills: true,
  showExperience: true,
  showCertifications: true,
  cvUrl: "/cv.pdf",
};

export function getProjects(): Project[] {
  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = fileNames
      .filter((fileName) => fileName.endsWith(".yaml"))
      .map((fileName) => {
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return {
          ...data,
          slug: fileName.replace(/\.yaml$/, ""),
        } as Project;
      });

    return projects.sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch {
    return [];
  }
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.yaml`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      ...data,
      slug,
    } as Project;
  } catch {
    return null;
  }
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getCertifications(): Certification[] {
  try {
    const fileNames = fs.readdirSync(certificationsDirectory);
    const certifications = fileNames
      .filter((fileName) => fileName.endsWith(".yaml"))
      .map((fileName) => {
        const fullPath = path.join(certificationsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return data as Certification;
      });

    return certifications;
  } catch {
    return [];
  }
}

export function getAllProjectSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".yaml"))
      .map((fileName) => fileName.replace(/\.yaml$/, ""));
  } catch {
    return [];
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const config = await reader.singletons.siteConfig.read();
    if (!config) {
      return defaultConfig;
    }
    return {
      heroAvailableText: config.heroAvailableText ?? defaultConfig.heroAvailableText,
      heroFirstName: config.heroFirstName ?? defaultConfig.heroFirstName,
      heroLastName: config.heroLastName ?? defaultConfig.heroLastName,
      heroRoleSans: config.heroRoleSans ?? defaultConfig.heroRoleSans,
      heroRoleSerif: config.heroRoleSerif ?? defaultConfig.heroRoleSerif,
      heroDescription: config.heroDescription ?? defaultConfig.heroDescription,
      aboutHeading: config.aboutHeading ?? defaultConfig.aboutHeading,
      aboutLocation: config.aboutLocation ?? defaultConfig.aboutLocation,
      aboutAvailability: config.aboutAvailability ?? defaultConfig.aboutAvailability,
      contactHeadline1: config.contactHeadline1 ?? defaultConfig.contactHeadline1,
      contactHeadline2: config.contactHeadline2 ?? defaultConfig.contactHeadline2,
      contactHeadline3: config.contactHeadline3 ?? defaultConfig.contactHeadline3,
      contactSubtext: config.contactSubtext ?? defaultConfig.contactSubtext,
      contactEmail: config.contactEmail ?? defaultConfig.contactEmail,
      socialGithub: config.socialGithub ?? defaultConfig.socialGithub,
      socialLinkedin: config.socialLinkedin ?? defaultConfig.socialLinkedin,
      showSkills: config.showSkills ?? defaultConfig.showSkills,
      showExperience: config.showExperience ?? defaultConfig.showExperience,
      showCertifications: config.showCertifications ?? defaultConfig.showCertifications,
      cvUrl: config.cvUrl ?? defaultConfig.cvUrl,
    };
  } catch {
    return defaultConfig;
  }
}