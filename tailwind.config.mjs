/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

// Tailwind v4 - Minimal config, theme defined in CSS via @theme directive
export default {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,tsx,ts}",
  ],
  plugins: [typography],
};
