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

export async function getSiteConfig() {
  const config = await reader.singletons.siteConfig.read();
  return config;
}