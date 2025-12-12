/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import { defineConfig } from "@tailwindcss/vite";

export default defineConfig({
  darkMode: "class", // Enable dark mode support
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens instead of theme-specific ones
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
        surface: {
          primary: "rgb(var(--color-surface-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-surface-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-surface-tertiary) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-text-tertiary) / <alpha-value>)",
        },
        border: {
          primary: "rgb(var(--color-border-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-border-secondary) / <alpha-value>)",
        },
      },
      animation: {
        "theme-transition": "theme-fade 0.3s ease-in-out",
      },
      keyframes: {
        "theme-fade": {
          "0%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [typography],
});
