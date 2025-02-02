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
      "~assets": resolve(__dirname, "./src/assets")
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsInlineLimit: 0
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg','**/*.svg']
});
