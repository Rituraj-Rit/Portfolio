import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        name: "Rituraj Verma Portfolio",
        short_name: "Rituraj Portfolio",
        description:
          "Rituraj Verma's portfolio showcasing projects, experience, and skills.",
        theme_color: "#050816",
        background_color: "#050816",
        start_url: "/",
        scope: "/",
        display: "standalone",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
});
