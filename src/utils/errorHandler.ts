// Global Error Handler for Production - Покращена версія з інформативними повідомленнями

interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  errorType?: 'network' | 'api' | 'validation' | 'auth' | 'unknown';
  statusCode?: number;
  retryable?: boolean;
  userMessage?: string; // Зрозуміле повідомлення для користувача
  suggestions?: string[]; // Можливі дії для користувача
}

export class ErrorHandler {
  private static errorLogs: ErrorLog[] = [];
  
  static init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      const errorInfo = this.parseError(event.error || new Error(event.message));
      this.logError(errorInfo);
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      const errorInfo = this.parseError(event.reason);
      this.logError(errorInfo);
    });
  }

  // Парсинг помилки для визначення типу та можливих дій
  private static parseError(error: unknown): ErrorLog {
    const errorObj = error && typeof error === 'object' ? error : {};
    const errorMessage = (errorObj && 'message' in errorObj && typeof errorObj.message === 'string' 
      ? errorObj.message 
      : String(error || 'Unknown error'));
    const errorStack = (errorObj && 'stack' in errorObj && typeof errorObj.stack === 'string' 
      ? errorObj.stack 
      : undefined);
    
    const baseLog: ErrorLog = {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorType: 'unknown',
    };

    // Визначення типу помилки
    const errorCode = errorObj && 'code' in errorObj ? String(errorObj.code) : '';
    if (errorCode === 'NETWORK_ERROR' || errorMessage.includes('Failed to fetch') || errorMessage.includes('ERR_')) {
      baseLog.errorType = 'network';
      baseLog.retryable = true;
      baseLog.userMessage = 'Проблема з інтернет-з\'єднанням';
      baseLog.suggestions = [
        'Перевірте інтернет-з\'єднання',
        'Перезавантажте сторінку',
        'Спробуйте через кілька хвилин'
      ];
    } else {
      const responseStatus = (errorObj && 'response' in errorObj && 
        errorObj.response && typeof errorObj.response === 'object' && 
        'status' in errorObj.response ? Number(errorObj.response.status) : undefined);
      const statusCode = responseStatus || (errorObj && 'statusCode' in errorObj && typeof errorObj.statusCode === 'number' 
        ? errorObj.statusCode 
        : undefined);
      
      if (statusCode) {
        baseLog.errorType = 'api';
        baseLog.statusCode = statusCode;
        baseLog.retryable = [408, 429, 500, 502, 503, 504].includes(statusCode);
        
        switch (statusCode) {
          case 401:
            baseLog.userMessage = 'Потрібна авторизація';
            baseLog.suggestions = ['Увійдіть в систему знову'];
            break;
          case 403:
            baseLog.userMessage = 'Доступ заборонено';
            baseLog.suggestions = ['Зверніться до адміністратора'];
            break;
          case 404:
            baseLog.userMessage = 'Ресурс не знайдено';
            baseLog.suggestions = ['Перевірте правильність даних'];
            break;
          case 429:
            baseLog.userMessage = 'Забагато запитів';
            baseLog.suggestions = ['Зачекайте кілька секунд'];
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            baseLog.userMessage = 'Проблема на сервері';
            baseLog.retryable = true;
            baseLog.suggestions = ['Спробуйте пізніше', 'Оновіть сторінку'];
            break;
          default:
            baseLog.userMessage = 'Помилка сервера';
        }
      } else if (errorMessage.includes('validation') || errorMessage.includes('required')) {
        baseLog.errorType = 'validation';
        baseLog.userMessage = 'Помилка введення даних';
        baseLog.suggestions = ['Перевірте заповнені поля'];
      } else if (errorMessage.includes('auth') || errorMessage.includes('token')) {
        baseLog.errorType = 'auth';
        baseLog.userMessage = 'Проблема з авторизацією';
        baseLog.suggestions = ['Увійдіть в систему знову'];
      }
    }

    return baseLog;
  }

  private static logError(error: ErrorLog) {
    console.error('Error logged:', error);
    this.errorLogs.push(error);
    
    // Обмежуємо кількість логів
    if (this.errorLogs.length > 100) {
      this.errorLogs = this.errorLogs.slice(-100);
    }
    
    // Відправка на моніторинг
    if (import.meta.env.PROD) {
      this.sendToMonitoring(error);
    }

    // Показуємо користувачу інформативне повідомлення
    this.showUserFriendlyError(error);
  }

  private static showUserFriendlyError(error: ErrorLog) {
    // Перевіряємо чи користувач залогінений перед показом повідомлення про авторизацію
    const isLoggedIn = localStorage.getItem('auth-storage') || localStorage.getItem('token');
    
    // Не показуємо повідомлення про авторизацію якщо користувач вже залогінений і це не критична помилка
    if (error.statusCode === 401 && isLoggedIn && !error.message.includes('Invalid credentials')) {
      // Це може бути просто проблема з API або токен прострочений, але не критична
      console.warn('API auth error (non-critical):', error.message);
      return;
    }
    
    // Створюємо інформативне повідомлення для користувача
    if (error.userMessage && error.suggestions) {
      // Перевіряємо чи вже є таке ж повідомлення (щоб не показувати дублікати)
      const existingNotification = document.querySelector('[data-error-id]');
      if (existingNotification) {
        return; // Не показуємо дублікати
      }
      
      // Використовуємо toast або модальне вікно
      const errorNotification = document.createElement('div');
      errorNotification.setAttribute('data-error-id', Date.now().toString());
      errorNotification.className = 'fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md shadow-lg z-50';
      errorNotification.innerHTML = `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-medium text-red-800">${error.userMessage}</h3>
            ${error.suggestions.length > 0 ? `
              <ul class="mt-2 text-sm text-red-700 list-disc list-inside">
                ${error.suggestions.map(s => `<li>${s}</li>`).join('')}
              </ul>
            ` : ''}
            ${error.retryable ? `
              <button onclick="window.location.reload()" class="mt-2 text-sm text-red-800 underline hover:text-red-900">
                Спробувати ще раз
              </button>
            ` : ''}
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </button>
        </div>
      `;
      document.body.appendChild(errorNotification);
      
      // Автоматичне приховування через 10 секунд
      setTimeout(() => {
        errorNotification.remove();
      }, 10000);
    }
  }

  private static async sendToMonitoring(error: ErrorLog) {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await fetch(`${API_URL}/errors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
      });
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

  // Функція для автоматичних повторних спроб
  static async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: unknown;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        const errorInfo = this.parseError(error);
        
        if (!errorInfo.retryable || attempt === maxRetries - 1) {
          throw error;
        }
        
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
}

// Initialize on import
if (typeof window !== 'undefined') {
  ErrorHandler.init();
}

