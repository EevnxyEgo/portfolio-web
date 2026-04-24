export interface Project {
  title: string;
  slug: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  type: ProjectType;
  context: string;
  role: string;
  featured: boolean;
  order: number;
  techStack: string[];
  summary: string;
  myRole: string;
  impact: string;
  learnings: string;
  links: ProjectLinks;
  image?: string;
}

export type ProjectCategory = "ml-ai" | "fullstack" | "3d" | "cv" | "mobile";

export type ProjectStatus = "active" | "archived" | "dev";

export type ProjectType = "individual" | "group";

export interface ProjectLinks {
  github?: string;
  demo?: string;
  canva?: string;
  report?: string;
  sourceCode?: string;
  video?: string;
}

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
}
