// Helper function to auto-detect API URL based on current host
// This ensures API calls work correctly when accessing via IP address

export const getApiUrl = (): string => {
  // Prefer configured backend URL from settings store when available
  try {
    // Lazy import to avoid circular deps in SSR/build
    const settingsStore = (window as Window & typeof globalThis & { useSettingsStore?: () => { getState: () => { settings: { backendUrl: string } } } })?.useSettingsStore || undefined;
    if (!settingsStore && typeof window !== 'undefined') {
      // Attempt dynamic import only in browser
      // Note: this is best-effort; failures fall through to env/auto-detect
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // dynamic import avoided here to keep this helper synchronous
    }
    // If zustand store is attached globally by app bootstrap
    const settings = settingsStore?.getState?.().settings;
    if (settings?.backendUrl) {
      return settings.backendUrl;
    }
  } catch {
    // ignore - fallback to auto-detect
  }
  // Auto-detect based on current hostname (priority)
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    
    // If accessing via IP address (not localhost), always use IP for API
    // This overrides VITE_API_URL to ensure consistency
    const ipAddressRegex = /^\d+\.\d+\.\d+\.\d+$/;
    if (ipAddressRegex.test(host)) {
      return `http://${host}:3001/api`;
    }
  }
  
  // If explicitly configured via env variable, use it (only for localhost/hostname)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:3001/api';
};

export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  
  try {
    // Get JWT token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt-token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore if localStorage is not available
  }

  try {
    // Try to get additional settings from localStorage
    if (typeof window !== 'undefined') {
      const settingsStorage = localStorage.getItem('app-settings');
      if (settingsStorage) {
        const parsed = JSON.parse(settingsStorage);
        if (parsed?.state?.settings) {
          const settings = parsed.state.settings;
          if (settings.apiKey) headers['x-api-key'] = settings.apiKey;
          if (settings.secretKey) headers['x-api-secret'] = settings.secretKey;
        }
      }
    }
  } catch {
    // ignore
  }

  return headers;
};
