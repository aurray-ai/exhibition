"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="pointer-events-none fixed z-[9999] mix-blend-difference"
            animate={{
              x: position.x - 6,
              y: position.y - 6,
              scale: isHovering ? 2.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          >
            <div className="h-3 w-3 rounded-full bg-warm-white" />
          </motion.div>
          <motion.div
            className="pointer-events-none fixed z-[9998]"
            animate={{
              x: position.x - 20,
              y: position.y - 20,
              scale: isHovering ? 1.8 : 1,
              opacity: isHovering ? 0.6 : 0.3,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
          >
            <div className="h-10 w-10 rounded-full border border-violet-accent/50" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
