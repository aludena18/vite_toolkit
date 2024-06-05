import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/vite_toolkit/",
  plugins: [
    react({
      // basename: "/vite_toolkit/",
    }),
  ],
  build: {
    outDir: "dist", // Ensure this matches your deploy settings
  },
});
