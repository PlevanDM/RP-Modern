// Global Error Handler for Production

interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

export class ErrorHandler {
  private static errorLogs: ErrorLog[] = [];
  
  static init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    });
  }

  private static logError(error: ErrorLog) {
    console.error('Error logged:', error);
    this.errorLogs.push(error);
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(error);
    }
  }

  private static async sendToMonitoring(error: ErrorLog) {
    try {
      // TODO: Send to monitoring service (Sentry, LogRocket, etc.)
      // await fetch('/api/errors', { method: 'POST', body: JSON.stringify(error) });
    } catch (e) {
      console.error('Failed to send error to monitoring:', e);
    }
  }

  static getErrorLogs(): ErrorLog[] {
    return this.errorLogs;
  }

  static clearLogs() {
    this.errorLogs = [];
  }
}

// Initialize on import
if (typeof window !== 'undefined') {
  ErrorHandler.init();
}

