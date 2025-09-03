// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://benitoanagua.github.io",
  // base: "/ArawiAura",

  // output: "static",
  // trailingSlash: "always",
  // build: {
  //   format: "directory",
  // },

  vite: {
    plugins: [tailwindcss()],
    // optimizeDeps: {
    //   exclude: ["@astrojs/react"],
    // },
  },

  integrations: [react()],
});
