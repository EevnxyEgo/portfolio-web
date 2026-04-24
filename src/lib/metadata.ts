import type { Metadata } from "next";

export const siteConfig = {
  name: "Arsenius Audley Wahyu Djatmiko",
  title: "Arsenius Audley | Fullstack Developer & ML Engineer",
  description:
    "Portfolio of Arsenius Audley W.D. — Computer Engineering graduate from ITS Surabaya. Building fullstack web apps with AI at their core. Next.js, Python, TensorFlow. Alumni Bangkit Academy ML Cohort.",
  url: "https://arsendev.net",
  ogImage: "/og-image.png",
  keywords: [
    "Arsenius Audley",
    "Arsenius Audley Wahyu Djatmiko",
    "Fullstack Developer Indonesia",
    "Machine Learning Engineer Indonesia",
    "Next.js Developer",
    "React Developer",
    "TensorFlow Developer",
    "Bangkit Academy Alumni",
    "ITS Surabaya",
    "Fresh Graduate Developer",
    "AI Engineer Indonesia",
    "Portfolio Website",
    "arsendev.net",
  ],
  links: {
    github: "https://github.com/EevnxyEgo",
    linkedin:
      "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
    email: "arseniuswahyu@gmail.com",
  },
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arsenius Audley Wahyu Djatmiko",
  alternateName: "Arsenius Audley",
  jobTitle: "Fullstack Developer & Machine Learning Engineer",
  description:
    "Computer Engineering graduate from ITS Surabaya. Fullstack developer with ML/AI expertise. Bangkit Academy alumnus.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institut Teknologi Sepuluh Nopember",
    alternateName: "ITS Surabaya",
  },
  url: "https://arsendev.net",
  email: "arseniuswahyu@gmail.com",
  image: "https://arsendev.net/images/profile/arsenius.jpg",
  sameAs: [
    "https://github.com/EevnxyEgo",
    "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Machine Learning",
    "TensorFlow",
    "Python",
    "Fullstack Development",
    "Computer Vision",
    "Unreal Engine",
  ],
};

export function generateMetadata(override?: Partial<Metadata>): Metadata {
  return {
    ...override,
    title: override?.title ?? siteConfig.title,
    description: override?.description ?? siteConfig.description,
    keywords: override?.keywords ?? siteConfig.keywords,
  };
}
