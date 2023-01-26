import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf}"],
      },
      manifest: {
        name: "Stopwatch Exercises",
        short_name: "Stopwatch Exercises",
        description:
          "App to train penalty box timing with a single stopwatch. Secondly you can train filling out the penalty box sheets.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
        ],
      },
    }),
    mkcert({
      hosts: ["localhost"],
    }),
  ],
  server: {
    // port: 3000
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/setupVitest.js"],
  },
});
