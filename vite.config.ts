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
        test_company_business: "test/company-business/index.html",
        test_company_introduction: "test/company_Introduction/index.html",
        test_company_what_is_k_me: "test/company-what-is-k-me/index.html",
        test_contact: "test/contact/index.html",
        test_experience: "test/experience/index.html",
        test_k_me_dance: "test/k-me-dance/index.html",
        test_k_me_visionai: "test/k-me-visionai/index.html",
        visionai: "visionai.html",
        visionai_form: "visionai_form.html",
      },
    },
  },
});
