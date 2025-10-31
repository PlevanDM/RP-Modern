// Browser cache management utilities

/**
 * Force clear all caches when needed
 */
export const clearBrowserCache = () => {
  // Clear all caches
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }

  // Clear localStorage cache busting flag
  localStorage.removeItem('cache-version');
  
  // Force reload
  location.reload();
};

/**
 * Add cache busting on each load
 */
export const setupCacheBusting = () => {
  // Set cache version in localStorage
  const CACHE_VERSION = Date.now().toString();
  localStorage.setItem('cache-version', CACHE_VERSION);
  
  // Add meta tag for no-cache
  const existingMeta = document.querySelector('meta[http-equiv="Cache-Control"]');
  if (existingMeta) {
    existingMeta.setAttribute('content', 'no-cache, no-store, must-revalidate');
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'Cache-Control');
    meta.setAttribute('content', 'no-cache, no-store, must-revalidate');
    document.head.appendChild(meta);
  }
};

/**
 * Check if cache needs to be cleared
 */
export const shouldClearCache = (): boolean => {
  const storedVersion = localStorage.getItem('cache-version');
  const currentVersion = document.querySelector('meta[name="app-version"]')?.getAttribute('content');
  
  if (!storedVersion || storedVersion !== currentVersion) {
    return true;
  }
  
  return false;
};

// Initialize on page load
if (typeof window !== 'undefined') {
  setupCacheBusting();
}

