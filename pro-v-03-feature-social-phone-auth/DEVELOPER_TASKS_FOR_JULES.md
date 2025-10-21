# 🎯 ЗАДАЧИ ДЛЯ JULES - RepairHub Pro V.03

## 👋 Привет, Jules!

Вот полный список задач для улучшения проекта. Проект уже выложен на GitHub: https://github.com/PlevanDM/pro-v-03

---

## 📝 БЫСТРЫЙ СТАРТ

### 1. Клонируйте репозиторий
```bash
git clone https://github.com/PlevanDM/pro-v-03.git
cd pro-v-03
npm install
npm run dev
```

### 2. Откройте браузер
```
http://localhost:5173
```

### 3. Проверьте консоль браузера (F12)
- Нажмите F12
- Откройте вкладку Console
- Ищите красные ошибки ❌

---

## 🟢 ЗАДАЧИ УРОВНЯ 1 (Легко - 1-2 часа)

### Задача 1.1: Исправить ошибки в коде

**Что делать:**
1. Откройте DevTools (F12 → Console)
2. Ищите красные ошибки
3. Исправьте их в коде

**Типичные ошибки:**
- ❌ `warning: missing key prop in list`
- ❌ `undefined is not a function`
- ❌ `Cannot read property of undefined`

**Файлы для проверки:**
- `src/components/features/orders/OrdersBoard.tsx`
- `src/hooks/useApi.ts`
- `src/services/api/escrowService.ts`

**Как исправить:**
```typescript
// ❌ ПЛОХО
{orders.map(order => (
  <div>{order.title}</div>
))}

// ✅ ХОРОШО
{orders.map(order => (
  <div key={order.id}>{order.title}</div>
))}
```

**Критерий завершения:** Консоль браузера чиста (нет красных ошибок)

---

### Задача 1.2: Добавить кнопку "Создать заявку" в DeviceCatalog

**Что делать:**
Добавить быструю кнопку для создания заявки прямо из каталога устройств.

**Файл:** `src/components/DeviceCatalog.tsx`

**Код для добавления:**

```typescript
// После кода выбора устройства, добавить кнопку
{selectedDevice && (
  <div className="create-order-button-container">
    <button 
      onClick={() => {
        setCreatedOrderData({
          device: selectedDevice.name,
          color: selectedColor || 'default',
          storage: selectedStorage || 'default'
        });
        // Здесь откроется CreateOrderModal с предзаполненными данными
      }}
      className="btn btn-primary btn-large"
    >
      📝 Создать заявку
    </button>
  </div>
)}
```

**Критерий завершения:**
- ✅ Кнопка видна при выборе устройства
- ✅ При клике открывается окно создания заявки
- ✅ Данные устройства предзаполнены

---

### Задача 1.3: Добавить Румынский и Русский языки

**Что делать:**
1. Создайте файлы переводов
2. Обновите конфиг i18n
3. Протестируйте переключение

**Шаг 1: Создайте файлы**

```bash
# Создайте директории
mkdir -p src/locales/ro
mkdir -p src/locales/ru

# Скопируйте украинский перевод как шаблон
cp src/locales/uk/translation.json src/locales/ro/translation.json
cp src/locales/uk/translation.json src/locales/ru/translation.json
```

**Шаг 2: Переведите ключевые фразы**

**Румынский (ro):**
```json
{
  "header": {
    "logo": "RepairHub",
    "login": "Conectare",
    "register": "Înregistrare"
  },
  "landing": {
    "hero": {
      "title": "Obțineți clienți, nu condiții de șef",
      "subtitle": "Primiți comenzi direct pe contul dvs",
      "description": "Noi pregătim comenzile, voi faceți munca, banii merg pe contul vostru. Fără intermediari, fără comisiile negustorilor. Doar voi și clientul vostru."
    }
  }
}
```

**Русский (ru):**
```json
{
  "header": {
    "logo": "RepairHub",
    "login": "Вход",
    "register": "Регистрация"
  },
  "landing": {
    "hero": {
      "title": "Получайте клиентов, а не условия босса",
      "subtitle": "Получайте заказы прямо на свой счет",
      "description": "Мы готовим заказы, вы делаете работу, деньги идут на ваш счет. Без посредников, без комиссий скупщиков. Только вы и ваш клиент."
    }
  }
}
```

**Шаг 3: Обновите конфиг**

```typescript
// src/i18n/config.ts
import roTranslation from '../locales/ro/translation.json';
import ruTranslation from '../locales/ru/translation.json';

const resources = {
  // ... существующие языки
  ro: { translation: roTranslation },
  ru: { translation: ruTranslation }
};

i18n.init({
  resources,
  supportedLngs: ['uk', 'en', 'ro', 'ru'],
  // ... остальной конфиг
});
```

**Критерий завершения:**
- ✅ Языки добавлены в селектор
- ✅ Интерфейс переключается между языками
- ✅ LocalStorage сохраняет выбор

---

## 🟡 ЗАДАЧИ УРОВНЯ 2 (Средне - 3-6 часов)

### Задача 2.1: Создать сервис курсов валют

**Что делать:**
Создать сервис для получения актуальных курсов BTC, USD, EUR, UAH, RON

**Файл:** `src/services/currency/currencyService.ts` (новый)

**Код:**

```typescript
// src/services/currency/currencyService.ts

interface CurrencyRates {
  BTC: number;
  USD: number;
  EUR: number;
  UAH: number;
  RON: number;
  timestamp: number;
  lastUpdated: string;
}

interface CurrencyConfig {
  provider: 'coingecko' | 'exchangerate' | 'custom';
  apiKey?: string;
  refreshInterval: number;
}

class CurrencyService {
  private config: CurrencyConfig;
  private cache: CurrencyRates | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor(config?: Partial<CurrencyConfig>) {
    this.config = {
      provider: 'coingecko',
      refreshInterval: 5 * 60 * 1000, // 5 минут
      ...config
    };
  }

  async getRates(): Promise<CurrencyRates> {
    // Если кэш актуален, верните его
    if (this.cache && Date.now() - this.cache.timestamp < this.config.refreshInterval) {
      return this.cache;
    }

    try {
      const rates = await this.fetchFromProvider();
      this.cache = rates;
      return rates;
    } catch (error) {
      console.error('Error fetching rates:', error);
      // Возвращаем fallback значения
      return this.getFallbackRates();
    }
  }

  private async fetchFromProvider(): Promise<CurrencyRates> {
    if (this.config.provider === 'coingecko') {
      return this.fetchFromCoinGecko();
    } else if (this.config.provider === 'exchangerate') {
      return this.fetchFromExchangeRate();
    }
    throw new Error('Unknown provider');
  }

  private async fetchFromCoinGecko(): Promise<CurrencyRates> {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,uah,ron&include_market_cap=false'
    );
    const data = await response.json();
    
    return {
      BTC: 1,
      USD: 1 / (data.bitcoin.usd || 1),
      EUR: 1 / (data.bitcoin.eur || 1),
      UAH: 1 / (data.bitcoin.uah || 1),
      RON: 1 / (data.bitcoin.ron || 1),
      timestamp: Date.now(),
      lastUpdated: new Date().toISOString()
    };
  }

  private async fetchFromExchangeRate(): Promise<CurrencyRates> {
    const response = await fetch('https://api.exchangerate.host/latest?base=USD');
    const data = await response.json();
    
    return {
      BTC: data.rates.BTC || 0,
      USD: 1,
      EUR: data.rates.EUR || 1,
      UAH: data.rates.UAH || 1,
      RON: data.rates.RON || 1,
      timestamp: Date.now(),
      lastUpdated: new Date().toISOString()
    };
  }

  convertAmount(amount: number, from: string, to: string): number {
    // Реализуйте конвертацию
    return amount * 1.0; // Placeholder
  }

  setCustomApiKey(provider: string, key: string): void {
    this.config.apiKey = key;
  }

  private getFallbackRates(): CurrencyRates {
    return {
      BTC: 1,
      USD: 0.000025,
      EUR: 0.000023,
      UAH: 0.001,
      RON: 0.0001,
      timestamp: Date.now(),
      lastUpdated: new Date().toISOString()
    };
  }

  startAutoRefresh(): void {
    this.refreshTimer = setInterval(() => {
      this.getRates();
    }, this.config.refreshInterval);
  }

  stopAutoRefresh(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }
}

export const currencyService = new CurrencyService();
```

**Создайте хук:**

```typescript
// src/hooks/useCurrencyRates.ts
import { useState, useEffect } from 'react';
import { currencyService } from '../services/currency/currencyService';

export function useCurrencyRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await currencyService.getRates();
        setRates(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    currencyService.startAutoRefresh();

    return () => currencyService.stopAutoRefresh();
  }, []);

  return { rates, loading, error };
}
```

**Критерий завершения:**
- ✅ Сервис получает курсы с API
- ✅ Данные кэшируются
- ✅ Обновляются каждые 5 минут
- ✅ При ошибке используются fallback значения

---

### Задача 2.2: Создать компонент отображения курсов

**Файл:** `src/components/common/CurrencyDisplay/CurrencyDisplay.tsx` (новый)

```typescript
import { useCurrencyRates } from '../../../hooks/useCurrencyRates';

interface CurrencyDisplayProps {
  amount: number;
  currency?: 'USD' | 'EUR' | 'UAH' | 'RON' | 'BTC';
  showAll?: boolean;
}

export function CurrencyDisplay({ 
  amount, 
  currency = 'USD', 
  showAll = false 
}: CurrencyDisplayProps) {
  const { rates, loading } = useCurrencyRates();

  if (loading || !rates) return <span>Loading...</span>;

  if (showAll) {
    return (
      <div className="currency-display-all">
        <span>${(amount * rates.USD).toFixed(2)} USD</span>
        <span>€{(amount * rates.EUR).toFixed(2)} EUR</span>
        <span>₴{(amount * rates.UAH).toFixed(2)} UAH</span>
        <span>lei {(amount * rates.RON).toFixed(2)} RON</span>
        <span>₿{(amount * rates.BTC).toFixed(8)} BTC</span>
      </div>
    );
  }

  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    UAH: '₴',
    RON: 'lei',
    BTC: '₿'
  };

  return (
    <span className="currency-display">
      {symbols[currency]}{(amount * rates[currency]).toFixed(2)} {currency}
    </span>
  );
}
```

**Критерий завершения:**
- ✅ Компонент показывает цены в разных валютах
- ✅ Значение обновляется автоматически
- ✅ Работает с разными валютами

---

### Задача 2.3: Унифицировать дизайн с использованием темы

**Создайте файл:**

```typescript
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#007AFF',      // Голубой
    secondary: '#34C759',    // Зелёный
    error: '#FF3B30',        // Красный
    warning: '#FF9500',      // Оранжевый
    success: '#34C759',      // Зелёный
    background: '#F2F2F7',   // Светло-серый
    surface: '#FFFFFF',      // Белый
    text: '#000000',         // Чёрный
    textSecondary: '#8E8E93' // Серый
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    h1: { fontSize: '32px', fontWeight: 'bold' },
    h2: { fontSize: '24px', fontWeight: '600' },
    body: { fontSize: '16px', fontWeight: '400' },
    caption: { fontSize: '12px', fontWeight: '400' }
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '24px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  }
};
```

**Обновите компоненты:**

```typescript
// Пример: src/components/common/Button/Button.tsx
import { theme } from '../../../styles/theme';

export function Button({ children, variant = 'primary', ...props }) {
  const styles = {
    backgroundColor: theme.colors[variant],
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    border: 'none',
    color: 'white',
    fontSize: theme.typography.body.fontSize,
    cursor: 'pointer',
    boxShadow: theme.shadows.md,
    fontWeight: theme.typography.body.fontWeight
  };

  return <button style={styles} {...props}>{children}</button>;
}
```

**Критерий завершения:**
- ✅ Все кнопки используют одинаковые цвета
- ✅ Расстояния и размеры унифицированы
- ✅ Одинаковые шрифты везде

---

## 🔴 ЗАДАЧИ УРОВНЯ 3 (Сложно - 6+ часов)

### Задача 3.1: Создать админ-панель для настройки API

**Создайте компонент:**

```typescript
// src/components/features/admin/SettingsPanel.tsx
import { useState } from 'react';

interface AdminSettings {
  currencyProvider: 'coingecko' | 'exchangerate';
  currencyApiKey: string;
  supportedCurrencies: string[];
  commissionPercentage: number;
}

export function SettingsPanel() {
  const [settings, setSettings] = useState<AdminSettings>({
    currencyProvider: 'coingecko',
    currencyApiKey: '',
    supportedCurrencies: ['USD', 'EUR', 'UAH', 'RON', 'BTC'],
    commissionPercentage: 5
  });

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    console.log('Настройки сохранены:', settings);
  };

  return (
    <div className="settings-panel">
      <h2>⚙️ Настройки API</h2>
      
      <div className="setting-group">
        <label>Провайдер курсов валют:</label>
        <select 
          value={settings.currencyProvider}
          onChange={(e) => setSettings({
            ...settings,
            currencyProvider: e.target.value as any
          })}
        >
          <option value="coingecko">CoinGecko (бесплатный)</option>
          <option value="exchangerate">ExchangeRate (бесплатный)</option>
        </select>
      </div>

      <div className="setting-group">
        <label>API ключ (если требуется):</label>
        <input 
          type="password"
          value={settings.currencyApiKey}
          onChange={(e) => setSettings({
            ...settings,
            currencyApiKey: e.target.value
          })}
          placeholder="Оставьте пусто для бесплатного плана"
        />
      </div>

      <div className="setting-group">
        <label>Комиссия (%):</label>
        <input 
          type="number"
          value={settings.commissionPercentage}
          onChange={(e) => setSettings({
            ...settings,
            commissionPercentage: Number(e.target.value)
          })}
          min="0"
          max="100"
        />
      </div>

      <button onClick={handleSave} className="btn btn-success">
        💾 Сохранить
      </button>
    </div>
  );
}
```

**Критерий завершения:**
- ✅ Админ может выбирать провайдер
- ✅ Настройки сохраняются в localStorage
- ✅ Интеграция с CurrencyService

---

### Задача 3.2: Добавить Польский, Болгарский и Испанский языки

**Следуйте шагам из Задачи 1.3 для каждого языка:**

```json
// Польский (pl)
{
  "header": {
    "logo": "RepairHub",
    "login": "Zaloguj się",
    "register": "Zarejestruj się"
  }
}

// Болгарский (bg)
{
  "header": {
    "logo": "RepairHub",
    "login": "Влезни",
    "register": "Регистрирайте се"
  }
}

// Испанский (es)
{
  "header": {
    "logo": "RepairHub",
    "login": "Iniciar sesión",
    "register": "Registrarse"
  }
}
```

**Критерий завершения:**
- ✅ 5+ языков в селекторе
- ✅ Все интерфейсы переведены
- ✅ Тестирование на каждом языке

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

### Документация для изучения:
1. **React**: https://react.dev/
2. **TypeScript**: https://www.typescriptlang.org/
3. **i18next**: https://www.i18next.com/
4. **Tailwind CSS**: https://tailwindcss.com/

### API для интеграции:
- **CoinGecko**: https://www.coingecko.com/api/docs
- **ExchangeRate**: https://exchangerate.host/
- **DeepL (переводы)**: https://www.deepl.com/docs/

---

## 🎯 ПОРЯДОК ВЫПОЛНЕНИЯ

### Первая неделя:
1. ✅ Задача 1.1 - Исправить ошибки
2. ✅ Задача 1.2 - Кнопка создания заявки
3. ✅ Задача 1.3 - Два новых языка

### Вторая неделя:
4. ✅ Задача 2.1 - Сервис курсов
5. ✅ Задача 2.2 - Компонент отображения
6. ✅ Задача 2.3 - Тема дизайна

### Третья неделя:
7. ✅ Задача 3.1 - Админ-панель
8. ✅ Задача 3.2 - Остальные языки

---

## 📊 КОНТРОЛЬНЫЙ СПИСОК

### Перед пушем на GitHub:
- [ ] Все ошибки в консоли исправлены
- [ ] Код отформатирован (prettier)
- [ ] Типы TypeScript корректны
- [ ] Все компоненты работают
- [ ] Все языки переключаются
- [ ] Версия commit сообщения: `✨ feature: описание`

### Git команды:
```bash
# Создать новый branch
git checkout -b feature/task-name

# Commit
git commit -m "✨ feature: название фичи"

# Push
git push origin feature/task-name

# Создать Pull Request на GitHub
```

---

## 📞 ВОПРОСЫ?

Если у вас возникают вопросы:
1. Проверьте консоль браузера (F12)
2. Прочитайте DEVELOPMENT_ROADMAP.md
3. Напишите комментарий в Pull Request

---

**Удачи в разработке! 🚀**

**Готово!** Начинайте с Задачи 1.1!
