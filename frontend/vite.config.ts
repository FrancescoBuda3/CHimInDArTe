import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  base: '/CHimInDArTe/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'model-viewer',
        },
      },
    }),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Chimindarte',
        short_name: 'Chimindarte',
        description: 'Web app interattiva per la mostra ChimInDArTe. Scopri gli elementi chimici, gioca ai quiz e esplora le opere d\'arte.',
        theme_color: '#ffffff',
        background_color: 'transparent',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/CHimInDArTe/',
        start_url: '/CHimInDArTe/',
        icons: [
          {
            src: '/CHimInDArTe/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/CHimInDArTe/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ]
});
