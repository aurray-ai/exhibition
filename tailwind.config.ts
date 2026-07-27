import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: "#111111",
        "warm-white": "#F5F4F2",
        violet: {
          accent: "#8B7EC8",
          soft: "#A99BD4",
        },
        burgundy: {
          DEFAULT: "#6B2D3C",
          light: "#8B3A4F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "slow-pulse": "slowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
        heartbeat: "heartbeat 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(8px, -6px)" },
          "66%": { transform: "translate(-6px, 4px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.08)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.06)" },
          "70%": { transform: "scale(1)" },
        },
      },
      transitionDuration: {
        slow: "800ms",
        slower: "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
