import type { Metadata } from "next";
import { getCertifications } from "@/lib/keystatic";
import { CertificationsClient } from "@/components/sections/CertificationsClient";

export const metadata: Metadata = {
  title: "Certifications | Arsenius Audley",
  description:
    "Credentials and certifications from Arsenius Audley — Bangkit Academy ML, academic achievements, and professional training.",
};

export default function CertificationsPage() {
  const certifications = getCertifications();

  return <CertificationsClient certifications={certifications} />;
}