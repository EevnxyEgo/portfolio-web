import type { Metadata } from "next";
import { AboutClient } from "@/components/sections/AboutClient";

export const metadata: Metadata = {
  title: "About | Arsenius Audley",
  description:
    "Learn more about Arsenius Audley Wahyu Djatmiko — Fullstack Developer & ML Engineer from ITS Surabaya.",
};

export default function AboutPage() {
  return <AboutClient />;
}