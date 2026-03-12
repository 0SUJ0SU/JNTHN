import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0d1410",
        mid: "#1a2420",
        "green-deep": "#1e3a2f",
        cream: "#e8e0d0",
        gold: "#b8a164",
        "light-surface": "#dddbd5",
        charcoal: "#2a2a2a",
      },
      fontFamily: {
        display: ["var(--font-big-shoulders)", "sans-serif"],
        mono: ["var(--font-martian-mono)", "monospace"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      zIndex: {
        "0": "0",
        "10": "10",
        "40": "40",
        "50": "50",
        "60": "60",
      },
    },
  },
  plugins: [],
};

export default config;
