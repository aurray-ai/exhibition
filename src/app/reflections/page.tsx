import type { Metadata } from "next";
import ReflectionForm from "@/components/reflections/ReflectionForm";
import { getReflections } from "@/lib/reflections-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visitor Reflections | 2025: A Year of Closing Cycles",
  description: "Share your reflection on the exhibition. Visitor responses.",
};

export default async function ReflectionsPage() {
  const reflections = await getReflections();
  return <ReflectionForm initialReflections={reflections} />;
}
