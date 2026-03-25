import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "https://ai-dam.ai",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        ir_deck: "ir_deck.html",
        visionai: "visionai.html",
        visionai_form: "visionai_form.html",
      },
    },
  },
});
