"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sampleReflections } from "@/data/reflections";
import FadeIn from "@/components/ui/FadeIn";

export default function ReflectionForm() {
  const [reflections, setReflections] = useState(sampleReflections);
  const [newReflection, setNewReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReflection.trim()) return;

    const reflection = {
      id: Date.now().toString(),
      text: newReflection.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    setReflections([reflection, ...reflections]);
    setNewReflection("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
            Share your reflection anonymously. Your words become part of the exhibition&apos;s story.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12">
            <textarea
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              placeholder="This exhibition reminded me of..."
              rows={4}
              className="w-full resize-none border border-charcoal/10 bg-transparent px-6 py-4 text-sm leading-relaxed transition-colors placeholder:opacity-30 focus:border-violet-accent/50 focus:outline-none dark:border-warm-white/10"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs opacity-30">Anonymous &middot; Shared with the community</p>
              <button
                type="submit"
                disabled={!newReflection.trim()}
                className="border border-charcoal/20 px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all hover:border-violet-accent disabled:opacity-30 dark:border-warm-white/20"
                data-cursor-hover
              >
                {submitted ? "Thank You" : "Share Reflection"}
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
                <cite className="mt-3 block text-xs opacity-30 not-italic">{reflection.date}</cite>
              </motion.blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
