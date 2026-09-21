import type { Config } from "tailwindcss";

// Brand palette: red, white, black and brown.
//   red     — the logo red, used sparingly as the single accent
//   ink     — warm black for text and dark surfaces
//   espresso/brown — the brown family (dark surfaces, secondary text)
//   sand    — hairlines and borders
//   cream   — page background (a soft white)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#E21E02",
          dark: "#B91800",
        },
        ink: "#1B1411",
        espresso: "#2B1D17",
        brown: "#7A5646",
        sand: "#E5DACE",
        cream: "#F8F4EF",
      },
      fontFamily: {
        display: ["var(--font-blinker)", "Helvetica", "Arial", "sans-serif"],
        body: ["var(--font-blinker)", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        page: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
