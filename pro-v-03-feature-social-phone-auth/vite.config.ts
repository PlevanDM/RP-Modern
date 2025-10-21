import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    rollupOptions: {
      output: {
        // Разделение кода для лучшей производительности
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
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

