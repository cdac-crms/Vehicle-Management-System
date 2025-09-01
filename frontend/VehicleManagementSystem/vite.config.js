
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jwt-decode"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
