import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      'autopsical-forgetfully-lashonda.ngrok-free.dev',
      'localhost',
      '127.0.0.1'
    ]
  },
  css: {
    postcss: null
  },
  build: {
    // Оптимизация для продакшена
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        // Разделение кода для лучшей производительности
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          stores: ['zustand', 'zustand/middleware'],
        },
        // Hash для cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    },
    // Оптимизация изображений
    assetsInlineLimit: 4096,
    // Чанк размер предупреждения
    chunkSizeWarningLimit: 1000
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})

