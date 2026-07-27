import type { Metadata } from "next";
import ReflectionForm from "@/components/reflections/ReflectionForm";

export const metadata: Metadata = {
  title: "Visitor Reflections | 2025: A Year of Closing Cycles",
  description: "Share your reflection on the exhibition. Anonymous visitor responses.",
};

export default function ReflectionsPage() {
  return <ReflectionForm />;
}
