// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import vercelAdapter from "@astrojs/vercel";

import alpinejs from "@astrojs/alpinejs";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",

  // Default base URL
  base: "/",

  output: "server",
  trailingSlash: "never",
  integrations: [mdx(), sitemap(), alpinejs(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  // adapter: node({
  //   mode: "standalone",
  // }),

  adapter: vercelAdapter({
    maxDuration: 30,
  }),
});