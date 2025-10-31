import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: false,
    cors: true,
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

