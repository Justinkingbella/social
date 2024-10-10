import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      manifest:{
        icons:[{
          src: "/assets/images/profile.png",
          sizes:"512x512",
          type: 'image/png',
          purpose: 'any maskable'
      }]

      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    })

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
