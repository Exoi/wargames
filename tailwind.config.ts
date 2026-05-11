import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        gunmetal: "#0A0A0F",
        carbon: "#141419",
        crimson: "#CC0000",
        blood: "#990000",
        "tactical-red": "#FF1A1A",
        bone: "#C8C8C8",
        ash: "#8A8A8A",
        dust: "#5A5A5A",
        white: "#F0F0F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Rajdhani", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        input: "6px",
      },
      transitionTimingFunction: {
        tactical: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
