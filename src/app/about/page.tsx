import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About Julio Parejo | 2025: A Year of Closing Cycles",
  description: "Learn about the artist behind the exhibition — Julio Parejo.",
};

export default function AboutPage() {
  return <AboutSection />;
}
