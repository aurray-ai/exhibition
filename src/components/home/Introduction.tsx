"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { introductionSteps } from "@/data/introduction";
import FadeIn from "@/components/ui/FadeIn";

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="introduction"
      ref={containerRef}
      className="relative px-6 py-32 md:px-12 md:py-48"
    >
      <motion.div style={{ opacity }} className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-20 text-xs tracking-[0.4em] uppercase opacity-40">
            A journey through
          </p>
        </FadeIn>

        <div className="flex flex-col items-center gap-0">
          {introductionSteps.map((step, i) => (
            <IntroductionStep key={step} step={step} index={i} total={introductionSteps.length} />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-24 max-w-lg mx-auto text-sm leading-relaxed opacity-50 md:text-base">
            From the stages of Barcelona to the streets of Mexico — a year of endings
            that became the beginning of something new. Each chapter a cycle closed.
            Each artwork a door opened.
          </p>
        </FadeIn>
      </motion.div>
    </section>
  );
}

function IntroductionStep({
  step,
  index,
  total,
}: {
  step: string;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <FadeIn delay={index * 0.1} duration={1}>
      <div className="flex flex-col items-center">
        <motion.p
          className={`font-display tracking-wide transition-all duration-slow ${
            isLast
              ? "text-3xl text-violet-accent md:text-5xl"
              : index >= total - 3
                ? "text-2xl opacity-80 md:text-4xl"
                : "text-xl opacity-50 md:text-3xl"
          }`}
        >
          {step}
        </motion.p>
        {!isLast && (
          <div className="my-4 flex flex-col items-center opacity-20">
            <div className="h-8 w-px bg-current" />
          </div>
        )}
      </div>
    </FadeIn>
  );
}
