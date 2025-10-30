// Helper function to auto-detect API URL based on current host
// This ensures API calls work correctly when accessing via IP address

export const getApiUrl = (): string => {
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
