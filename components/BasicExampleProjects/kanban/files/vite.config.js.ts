export const language = 'typescript';
export const content = `import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  //https://stackoverflow.com/questions/68380194/tranform-vue-config-js-to-vite-config-js-build-path
  base:
    process.env.NODE_ENV === "production"
      ? "/vuejs-kanban-yorkie/" // prod
      : "/", // dev
});`;
