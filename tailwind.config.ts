import type { Config } from "tailwindcss";

// Brand palette: red, white, black and brown, plus the plaster tones from the
// painted walls. The home page walks from light (morning) to dark (night).
//   red      — the logo red. Big shapes, buttons, LED glow.
//   brick    — a deeper red for small text on light backgrounds (passes AA).
//   ink      — warm black for text and the night sections.
//   espresso — the brown family, evening surfaces.
//   chalk / plaster / sand — the light-to-dark daytime surfaces.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#E21E02",
          dark: "#B91800",
        },
        brick: "#B32A14",
        ink: "#17110E",
        espresso: "#2B1D17",
        brown: "#6E4B3C",
        chalk: "#FBF8F3",
        plaster: "#F3ECE1",
        sand: "#E2D3BE",
        // Kept so older class names keep resolving.
        cream: "#F3ECE1",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Narrow", "sans-serif"],
        body: ["var(--font-blinker)", "Helvetica", "Arial", "sans-serif"],
        led: ["var(--font-led)", "monospace"],
      },
      maxWidth: {
        page: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
