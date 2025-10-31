import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './i18n/config'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CookieConsent } from './components/CookieConsent'
import { ToastProvider } from './components/common/Toast/ToastProvider'

// Initialize error handling
import './utils/errorHandler'

// Initialize cache management
import './utils/browserCache'

// ============================================================================
// QUERY CLIENT CONFIGURATION
// ============================================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

// ============================================================================
// PWA INITIALIZATION
// ============================================================================

// Initialize PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch((error) => {
        console.warn('❌ Service Worker registration failed:', error);
      });
  });
}

// ============================================================================
// MAIN RENDER
// ============================================================================

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Завантаження...</div>}>
          <App />
        </React.Suspense>
        <CookieConsent />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </ToastProvider>
    </QueryClientProvider>
  </ErrorBoundary>
)
