import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#090909", charcoal: "#171716", soft: "#20201E",
        ivory: "#F0EDE5", silver: "#AAA9A4", muted: "#92918C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { wider2: "0.22em" },
    },
  },
  plugins: [],
};
export default config;
