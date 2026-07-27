"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AmbientSound() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      aria-label={isMuted ? "Enable ambient sound" : "Mute ambient sound"}
      className="group flex items-center gap-2 rounded-full border border-charcoal/10 px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:border-violet-accent/50 dark:border-warm-white/10"
      data-cursor-hover
    >
      <motion.span
        animate={{ opacity: isMuted ? 0.4 : 1 }}
        className="flex items-center gap-2"
      >
        {isMuted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
        <span>{isMuted ? "Sound Off" : "Sound On"}</span>
      </motion.span>
    </button>
  );
}
