import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Try adding a manual chunking option or any specific options
      output: {
        manualChunks: undefined, // Helps with module resolution in some cases
      },
    },
  },
});
