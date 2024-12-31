import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// vite.config.ts

export default defineConfig({

  base: "",
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@data": resolve(__dirname, "./data"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  assetsInclude: ['**/*.svg'],
});
