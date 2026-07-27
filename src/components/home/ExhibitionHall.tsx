"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { artworks, type Artwork, type HoverEffect } from "@/data/artworks";
import FadeIn from "@/components/ui/FadeIn";

import MobileArtworkSwipe from "./MobileArtworkSwipe";

export default function ExhibitionHall() {
  return (
    <section id="exhibition" className="relative">
      <MobileArtworkSwipe />

      <div className="hidden px-6 py-24 md:block md:px-12 md:py-32">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs tracking-[0.4em] uppercase opacity-40">The Exhibition</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-6xl">
              Seven Rooms
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm opacity-50">
              Enter each room. Spend time with each piece. Let the journey unfold.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="hidden flex-col md:flex">
        {artworks.map((artwork, i) => (
          <ArtworkRoom key={artwork.slug} artwork={artwork} index={i} />
        ))}
      </div>
    </section>
  );
}

function ArtworkRoom({ artwork, index }: { artwork: Artwork; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeIn duration={1.2}>
      <Link
        href={`/exhibition/${artwork.slug}`}
        className="group relative block"
        data-cursor-hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex min-h-[70vh] items-center overflow-hidden md:min-h-screen">
          <ArtworkVisual artwork={artwork} isHovered={isHovered} />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase opacity-40">
                Room {String(index + 1).padStart(2, "0")} &mdash; {artwork.year}
              </span>
              <h3 className="mt-3 font-display text-4xl tracking-tight md:text-6xl lg:text-7xl">
                {artwork.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-60 md:text-base">
                {artwork.story}
              </p>
              <motion.span
                className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-40 transition-opacity group-hover:opacity-80"
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.4 }}
              >
                Enter Room
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            </motion.div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

function ArtworkVisual({ artwork, isHovered }: { artwork: Artwork; isHovered: boolean }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${artwork.gradient} artwork-gradient`}>
      <div className="absolute inset-0 bg-charcoal/30 dark:bg-charcoal/50" />
      <HoverEffectLayer effect={artwork.hoverEffect} isHovered={isHovered} accentColor={artwork.accentColor} />
    </div>
  );
}

function HoverEffectLayer({
  effect,
  isHovered,
  accentColor,
}: {
  effect: HoverEffect;
  isHovered: boolean;
  accentColor: string;
}) {
  switch (effect) {
    case "door":
      return <DoorEffect isHovered={isHovered} />;
    case "coins":
      return <CoinsEffect isHovered={isHovered} accentColor={accentColor} />;
    case "butterflies":
      return <ButterfliesEffect isHovered={isHovered} accentColor={accentColor} />;
    case "heartbeat":
      return <HeartbeatEffect isHovered={isHovered} accentColor={accentColor} />;
    case "warmth":
      return <SmokeEffect isHovered={isHovered} accentColor={accentColor} />;
    case "roulette":
      return <RouletteEffect isHovered={isHovered} accentColor={accentColor} />;
    default:
      return <SmokeEffect isHovered={isHovered} accentColor={accentColor} />;
  }
}

function DoorEffect({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative h-64 w-40 border-2 border-warm-white/20 md:h-80 md:w-48"
        animate={{ rotateY: isHovered ? 15 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-warm-white/10 bg-warm-white/5"
          animate={{ rotateY: isHovered ? -25 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute top-1/2 right-3 h-2 w-2 -translate-y-1/2 rounded-full bg-warm-white/30" />
        <motion.div
          className="absolute inset-0 bg-violet-accent/10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </div>
  );
}

function CoinsEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-10 w-10 rounded-full border-2 md:h-14 md:w-14"
          style={{
            borderColor: accentColor,
            left: `${30 + Math.cos((i / 8) * Math.PI * 2) * 20}%`,
            top: `${40 + Math.sin((i / 8) * Math.PI * 2) * 15}%`,
          }}
          animate={{
            rotateY: isHovered ? 360 : 0,
            rotateX: isHovered ? 180 : 0,
          }}
          transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ButterfliesEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 14}%`,
            top: `${25 + (i % 3) * 20}%`,
            color: accentColor,
          }}
          animate={
            isHovered
              ? {
                  x: [0, 30, -20, 40, 0],
                  y: [0, -40, -20, -50, 0],
                  rotate: [0, 15, -10, 20, 0],
                }
              : { y: [0, -8, 0] }
          }
          transition={{
            duration: isHovered ? 4 : 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity={0.6}>
            <path d="M12 2C8 6 4 8 4 12s4 6 8 10c4-4 8-6 8-10s-4-6-8-10zm0 14c-2-2-4-3.5-4-5.5S10 6 12 4c2 2 4 3.5 4 5.5S14 14 12 16z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function HeartbeatEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        animate={isHovered ? { scale: [1, 1.08, 1, 1.06, 1] } : { scale: 1 }}
        transition={isHovered ? { duration: 2, repeat: Infinity } : {}}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill={accentColor} opacity={0.3}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
      <div className="absolute h-32 w-48 border border-warm-white/10 md:h-40 md:w-64" />
    </div>
  );
}

function SmokeEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            width: 60 + i * 20,
            height: 60 + i * 20,
            backgroundColor: accentColor,
            left: `${40 + i * 5}%`,
            bottom: `${20 + i * 5}%`,
          }}
          animate={{
            y: isHovered ? [-20, -60, -40] : [-10, -30, -20],
            x: [0, 10, -5],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function RouletteEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative h-48 w-48 rounded-full border-2 md:h-64 md:w-64"
        style={{ borderColor: accentColor }}
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 4, ease: "linear", repeat: isHovered ? Infinity : 0 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 h-1/2 w-px origin-bottom"
            style={{
              transform: `rotate(${i * 30}deg)`,
              backgroundColor: `${accentColor}40`,
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </motion.div>
    </div>
  );
}
