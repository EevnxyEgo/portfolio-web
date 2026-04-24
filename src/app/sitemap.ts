import { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/keystatic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://arsendev.net";
  const projectSlugs = getAllProjectSlugs();

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/projects`, priority: 0.9 },
    { url: `${baseUrl}/certifications`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
  ];

  const projectPages = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}