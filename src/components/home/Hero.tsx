"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
      </div>
      <div className="fog-layer pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-warm-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-6 text-xs tracking-[0.4em] uppercase opacity-50"
        >
          An exhibition by Julio Parejo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="font-display text-7xl leading-none tracking-tight md:text-9xl lg:text-[12rem]"
        >
          2025
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-4 font-display text-xl tracking-wide opacity-70 md:text-2xl lg:text-3xl"
        >
          Year of Closing Cycles
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16"
        >
          <button
            onClick={onEnter}
            className="group relative overflow-hidden border border-warm-white/20 px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-slow hover:border-violet-accent"
            data-cursor-hover
          >
            <span className="relative z-10">Enter the Exhibition</span>
            <motion.div
              className="absolute inset-0 bg-violet-accent/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 opacity-30"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 1v18M1 14l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
