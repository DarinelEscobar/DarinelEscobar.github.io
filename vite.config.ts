import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// vite.config.ts
export default defineConfig({
  base: "",
  plugins: [react()],
  esbuild: {
    // Trim dev-only calls in production bundles
    drop: process.env.NODE_ENV === 'production' ? ["console", "debugger"] : [],
  },
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
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg','**/*.svg']
});
