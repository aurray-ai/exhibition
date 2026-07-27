import type { Metadata } from "next";
import Timeline from "@/components/timeline/Timeline";

export const metadata: Metadata = {
  title: "Timeline | 2025: A Year of Closing Cycles",
  description: "The events that shaped the exhibition — from endings to renewal.",
};

export default function TimelinePage() {
  return <Timeline />;
}
