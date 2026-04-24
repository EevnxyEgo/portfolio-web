export interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
  category: CertificationCategory;
  verified: boolean;
}

export type CertificationCategory =
  | "academic"
  | "professional"
  | "ml-ai"
  | "cloud"
  | "development";

export interface CertificationCardProps {
  certification: Certification;
  index?: number;
}
