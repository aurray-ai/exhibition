"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reflection } from "@/data/reflections";
import FadeIn from "@/components/ui/FadeIn";

interface ReflectionFormProps {
  initialReflections: Reflection[];
}

export default function ReflectionForm({ initialReflections }: ReflectionFormProps) {
  const [reflections, setReflections] = useState(initialReflections);
  const [name, setName] = useState("");
  const [newReflection, setNewReflection] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReflection.trim() || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), text: newReflection.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setReflections([data.reflection, ...reflections]);
      setNewReflection("");
      setName("");
      setStatus("submitted");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase opacity-40">Visitor Reflections</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            What Stayed With You
          </h2>
          <p className="mt-6 text-sm opacity-50">
            Share your reflection below. Your words become part of the exhibition&apos;s story.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={80}
              className="w-full border border-charcoal/10 bg-transparent px-6 py-3 text-sm leading-relaxed transition-colors placeholder:opacity-30 focus:border-violet-accent/50 focus:outline-none dark:border-warm-white/10"
            />
            <textarea
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              placeholder="This exhibition reminded me of..."
              rows={4}
              maxLength={1000}
              className="mt-4 w-full resize-none border border-charcoal/10 bg-transparent px-6 py-4 text-sm leading-relaxed transition-colors placeholder:opacity-30 focus:border-violet-accent/50 focus:outline-none dark:border-warm-white/10"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-xs opacity-30">
                {status === "error" ? errorMessage : "Leave your name or share anonymously"}
              </p>
              <button
                type="submit"
                disabled={!newReflection.trim() || status === "submitting"}
                className="shrink-0 border border-charcoal/20 px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all hover:border-violet-accent disabled:opacity-30 dark:border-warm-white/20"
                data-cursor-hover
              >
                {status === "submitting"
                  ? "Sharing..."
                  : status === "submitted"
                    ? "Thank You"
                    : "Share Reflection"}
              </button>
            </div>
          </form>
        </FadeIn>

        <div className="mt-20 flex flex-col gap-8">
          {reflections.map((reflection, i) => (
            <FadeIn key={reflection.id} delay={i * 0.05}>
              <motion.blockquote
                className="border-l-2 border-violet-accent/20 pl-6"
                whileHover={{ borderColor: "rgba(139, 126, 200, 0.5)" }}
              >
                <p className="leading-relaxed opacity-70">&ldquo;{reflection.text}&rdquo;</p>
                <cite className="mt-3 block text-xs opacity-30 not-italic">
                  {reflection.name} &middot; {reflection.date}
                </cite>
              </motion.blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
