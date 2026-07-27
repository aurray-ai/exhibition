"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineEvents } from "@/data/timeline";
import FadeIn from "@/components/ui/FadeIn";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase opacity-40">Timeline</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            How Every Artwork Connects
          </h2>
          <p className="mt-6 text-sm opacity-50">
            The events that shaped the exhibition — from endings to renewal.
          </p>
        </FadeIn>

        <div className="relative mt-20">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-charcoal/10 dark:bg-warm-white/10 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full bg-violet-accent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {timelineEvents.map((event, i) => (
              <FadeIn key={`${event.title}-${i}`} delay={i * 0.08}>
                <div
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 z-10 h-2 w-2 -translate-x-[3px] rounded-full bg-violet-accent md:left-1/2 md:-translate-x-1" />

                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="text-xs tracking-[0.3em] text-violet-accent uppercase">
                      {event.year}
                    </span>
                    <h3 className="mt-2 font-display text-xl md:text-2xl">{event.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed opacity-60">{event.description}</p>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
