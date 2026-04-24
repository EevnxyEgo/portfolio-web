import type { Metadata } from "next";
import { ContactClient } from "@/components/sections/ContactClient";

export const metadata: Metadata = {
  title: "Contact | Arsenius Audley",
  description:
    "Get in touch with Arsenius Audley for full-time roles, freelance projects, or interesting collaborations.",
};

export default function ContactPage() {
  return <ContactClient />;
}