import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark":       "var(--color-bg-dark)",
        "bg-mid":        "var(--color-bg-mid)",
        "green-deep":    "var(--color-green-deep)",
        cream:           "var(--color-cream)",
        gold:            "var(--color-gold)",
        "light-surface": "var(--color-light-surface)",
        charcoal:        "var(--color-charcoal)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono:    ["var(--font-mono)"],
        serif:   ["var(--font-serif)"],
      },
      fontSize: {
        "footer-headline": "clamp(3.5rem, 10vw, 10rem)",
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":       { transform: "translate(-2%, -3%)" },
          "20%":       { transform: "translate(3%, 2%)" },
          "30%":       { transform: "translate(-1%, 4%)" },
          "40%":       { transform: "translate(4%, -1%)" },
          "50%":       { transform: "translate(-3%, 3%)" },
          "60%":       { transform: "translate(2%, -4%)" },
          "70%":       { transform: "translate(-4%, 1%)" },
          "80%":       { transform: "translate(1%, -2%)" },
          "90%":       { transform: "translate(3%, 4%)" },
        },
        "ken-burns": {
          "0%":   { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1.5%, -1%)" },
        },
        "vinyl-spin": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        grain:        "grain-shift 0.4s steps(1) infinite",
        "ken-burns":  "ken-burns 30s ease-in-out infinite alternate",
        "vinyl-spin": "vinyl-spin 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
