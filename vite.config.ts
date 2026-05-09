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
        company_business: "company-business/index.html",
        company_introduction: "company_Introduction/index.html",
        company_what_is_k_me: "company-what-is-k-me/index.html",
        contact: "contact/index.html",
        experience: "experience/index.html",
        ir_deck: "ir_deck.html",
        k_me_dance: "k-me-dance/index.html",
        k_me_visionai: "k-me-visionai/index.html",
        visionai: "visionai.html",
        visionai_form: "visionai_form.html",
      },
    },
  },
});
