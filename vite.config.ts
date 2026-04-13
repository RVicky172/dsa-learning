import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', '*.svg'],
      manifest: {
        name: 'DSA Master',
        short_name: 'DSAMaster',
        description: 'Master Data Structures and Algorithms with interactive platforms',
        theme_color: '#060b18',
        background_color: '#060b18',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    target: 'ES2020',
    chunkSizeWarningLimit: 1000, // 1MB - increased from 500KB default
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
          
          // Feature chunks
          'topics-data': ['./src/data/topicsData.ts'],
          'ui-components': [
            './src/components/TopicCard.tsx',
            './src/components/TopicDetail.tsx',
            './src/components/ProblemsPage.tsx',
          ],
          'page-components': [
            './src/components/Hero.tsx',
            './src/pages/Home.tsx',
            './src/components/Navbar.tsx',
            './src/components/Roadmap.tsx',
            './src/components/BigO.tsx',
            './src/components/BigODetail.tsx',
          ],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
