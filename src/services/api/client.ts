// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    timestamp: string;
    requestId: string;
    duration: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableStatusCodes: number[];
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = parseInt(process.env.VITE_API_TIMEOUT || '30000');

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 32000,
  backoffMultiplier: 2,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
};

const DEFAULT_CIRCUIT_BREAKER_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 5,
  successThreshold: 2,
  timeout: 60000,
};

// ============================================================================
// CIRCUIT BREAKER PATTERN
// ============================================================================

type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitBreakerState = 'CLOSED';
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime?: number;
  private config: CircuitBreakerConfig;

  constructor(config: Partial<CircuitBreakerConfig> = {}) {
    this.config = { ...DEFAULT_CIRCUIT_BREAKER_CONFIG, ...config };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - (this.lastFailureTime || 0) > this.config.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.config.successThreshold) {
        this.state = 'CLOSED';
        this.successCount = 0;
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.config.failureThreshold) {
      this.state = 'OPEN';
    }
  }

  getState() {
    return this.state;
  }
}

// ============================================================================
// REQUEST DEDUPLICATION
// ============================================================================

class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<unknown>>();

  private createKey(method: string, url: string, data?: unknown): string {
    const dataStr = data ? JSON.stringify(data) : '';
    return `${method}:${url}:${dataStr}`;
  }

  async deduplicate<T>(
    method: string,
    url: string,
    fn: () => Promise<T>,
    data?: unknown
  ): Promise<T> {
    const key = this.createKey(method, url, data);

    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    const promise = fn()
      .then((result) => {
        this.pendingRequests.delete(key);
        return result;
      })
      .catch((error) => {
        this.pendingRequests.delete(key);
        throw error;
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  clear() {
    this.pendingRequests.clear();
  }
}

// ============================================================================
// API CLIENT
// ============================================================================

export class AdvancedApiClient {
  private baseURL: string;
  private timeout: number;
  private circuitBreaker: CircuitBreaker;
  private deduplicator: RequestDeduplicator;
  private retryConfig: RetryConfig;

  constructor(
    baseURL: string = API_BASE_URL,
    timeout: number = API_TIMEOUT,
    retryConfig: Partial<RetryConfig> = {},
    cbConfig: Partial<CircuitBreakerConfig> = {}
  ) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    this.circuitBreaker = new CircuitBreaker(cbConfig);
    this.deduplicator = new RequestDeduplicator();
  }

  private _getRequestHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Client-Version', '1.0.0');

    const token = localStorage.getItem('authToken');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private async _fetch<T>(
    url: string,
    options: RequestInit,
    retryCount = 0
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const headers = new Headers(options.headers);
        if (
          response.status === 401 &&
          !headers.get('X-Retry')
        ) {
          await this._handleTokenRefresh();
          headers.set('X-Retry', 'true');
          options.headers = headers;
          return this._fetch(url, options, retryCount);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ApiResponse<T> = await response.json();

      if (!apiResponse.success) {
        throw apiResponse.error;
      }

      return apiResponse.data as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if (retryCount < this.retryConfig.maxRetries) {
        await this.delay(this._calculateBackoffDelay(retryCount + 1));
        return this._fetch(url, options, retryCount + 1);
      }
      throw error;
    }
  }

  private async _handleTokenRefresh(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        this.logout();
        throw new Error('No refresh token available');
      }

      const response = await this.post('/auth/refresh', {
        refreshToken,
      });

      const { token } = response as { token: string };
      localStorage.setItem('authToken', token);
    } catch (error) {
      this.logout();
      return Promise.reject(error);
    }
  }

  private _calculateBackoffDelay(retryCount: number): number {
    const exponentialDelay =
      this.retryConfig.initialDelayMs *
      Math.pow(this.retryConfig.backoffMultiplier, retryCount - 1);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    const delay = exponentialDelay + jitter;

    return Math.min(delay, this.retryConfig.maxDelayMs);
  }

  // ========================================================================
  // HTTP METHODS
  // ========================================================================

  async get<T = unknown>(url: string): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this.deduplicator.deduplicate('GET', url, () =>
        this._fetch(url, {
          method: 'GET',
          headers: this._getRequestHeaders(),
        })
      )
    );
  }

  async post<T = unknown>(url:string, data: unknown): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this._fetch(url, {
        method: 'POST',
        headers: this._getRequestHeaders(),
        body: JSON.stringify(data),
      })
    );
  }

  async put<T = unknown>(url: string, data: unknown): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this._fetch(url, {
        method: 'PUT',
        headers: this._getRequestHeaders(),
        body: JSON.stringify(data),
      })
    );
  }

  async patch<T = unknown>(url: string, data: unknown): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this._fetch(url, {
        method: 'PATCH',
        headers: this._getRequestHeaders(),
        body: JSON.stringify(data),
      })
    );
  }

  async delete<T = unknown>(url: string): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this._fetch(url, {
        method: 'DELETE',
        headers: this._getRequestHeaders(),
      })
    );
  }

  async uploadFile<T = unknown>(url: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = this._getRequestHeaders();
    headers.delete('Content-Type'); // Let the browser set the correct content type for FormData

    return this.circuitBreaker.execute(() =>
      this._fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData,
      })
    );
  }

  // ========================================================================
  // UTILITIES
  // ========================================================================

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  }

  getCircuitBreakerState() {
    return this.circuitBreaker.getState();
  }

  clearCache() {
    this.deduplicator.clear();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const apiClient = new AdvancedApiClient();

export default apiClient;
