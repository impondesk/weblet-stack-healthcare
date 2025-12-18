/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class", // Enable dark mode support
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    // Safelist all primary color classes to ensure they're generated
    {
      pattern: /^bg-primary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^text-primary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^border-primary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^hover:bg-primary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    // Safelist all secondary color classes
    {
      pattern: /^bg-secondary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^text-secondary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^border-secondary-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    // Safelist all accent color classes
    {
      pattern: /^bg-accent-(50|100|500|600|900)$/,
    },
    {
      pattern: /^text-accent-(50|100|500|600|900)$/,
    },
    {
      pattern: /^border-accent-(50|100|500|600|900)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens instead of theme-specific ones
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
        secondary: {
          50: "rgb(var(--color-secondary-50) / <alpha-value>)",
          100: "rgb(var(--color-secondary-100) / <alpha-value>)",
          200: "rgb(var(--color-secondary-200) / <alpha-value>)",
          300: "rgb(var(--color-secondary-300) / <alpha-value>)",
          400: "rgb(var(--color-secondary-400) / <alpha-value>)",
          500: "rgb(var(--color-secondary-500) / <alpha-value>)",
          600: "rgb(var(--color-secondary-600) / <alpha-value>)",
          700: "rgb(var(--color-secondary-700) / <alpha-value>)",
          800: "rgb(var(--color-secondary-800) / <alpha-value>)",
          900: "rgb(var(--color-secondary-900) / <alpha-value>)",
        },
        accent: {
          50: "rgb(var(--color-accent-50) / <alpha-value>)",
          100: "rgb(var(--color-accent-100) / <alpha-value>)",
          500: "rgb(var(--color-accent-500) / <alpha-value>)",
          600: "rgb(var(--color-accent-600) / <alpha-value>)",
          900: "rgb(var(--color-accent-900) / <alpha-value>)",
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
};
