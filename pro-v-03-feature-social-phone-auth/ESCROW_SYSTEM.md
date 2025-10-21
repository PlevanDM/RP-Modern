# 🔒 Escrow система платежів RepairHub Pro

##概述

Escrow система платежей - безпечна система умовного депонування коштів, як на криптобіржах (Binance, Kraken). Гроші блокуються до підтвердження обох сторін.

## 📋 Основні характеристики

### ✅ Безпека
- Гроші не йдуть безпосередньо мастеру
- Депоновані кошти захищені від обох сторін
- Система розв'язання спорів
- Автоматичний повернення при листеченні строку

### ✅ Справедливість
- Обидві сторони повинні підтвердити
- Можливість відкрити спір на будь-якому етапі
- Модератори можуть розглянути справу
- Прозорий процес розрахунків

### ✅ Комфорт
- Комісія платформи тільки 5%
- Миттєва виплата після підтвердження
- Автоматичне звільнення коштів
- Сповіщення на кожному етапі

## 🔄 Процес платежу

```
1. AWAITING_CLIENT
   ⏳ Ожидание платежа от клиента
   └─> Клієнт підтверджує платіж
   
2. AWAITING_MASTER  
   ⏳ Платіж отримано, ждемо роботи
   └─> Мастер підтверджує виконання
   
3. CONFIRMED_BY_MASTER
   ⏳ Работа готова, ждем клиента
   └─> Клієнт підтверджує якість
   
4. RELEASED_TO_MASTER ✅
   💰 Платіж виплачено мастеру
   
Альтернативні сценарії:
- DISPUTED - спір у розгляді
- REFUNDED_TO_CLIENT - платіж повернено
- CANCELLED - скасовано
```

## 💾 Структура даних

```typescript
interface EscrowPayment {
  id: string;
  orderId: string;
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR';
  clientId: string;
  masterId: string;
  status: EscrowStatus;
  
  // Підтвердження обох сторін
  clientConfirmed: boolean;
  clientConfirmedAt?: string;
  masterConfirmed: boolean;
  masterConfirmedAt?: string;
  
  // Платіж
  paymentMethod: 'card' | 'bank_transfer' | 'crypto' | 'mono' | 'privat24';
  
  // Комісія (5%)
  platformFeePercent: number;
  platformFeeAmount: number;
  masterReceiveAmount: number;
  
  // Сроки
  createdAt: string;
  expiresAt: string; // 30 днів
  releasedAt?: string;
  refundedAt?: string;
}

enum EscrowStatus {
  AWAITING_CLIENT = 'awaiting_client',
  AWAITING_MASTER = 'awaiting_master',
  CONFIRMED_BY_MASTER = 'confirmed_by_master',
  RELEASED_TO_MASTER = 'released_to_master',
  REFUNDED_TO_CLIENT = 'refunded_to_client',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled'
}
```

## 🎯 API Методи

### createEscrowPayment()
Створює новий escrow платіж для замовлення

```typescript
escrowService.createEscrowPayment(
  orderId: string,
  clientId: string,
  masterId: string,
  amount: number,
  currency: 'UAH' = 'UAH',
  paymentMethod: 'card' = 'card'
): EscrowPayment
```

### confirmPaymentByClient()
Клієнт підтверджує платіж (переводить гроші)

```typescript
escrowService.confirmPaymentByClient(escrowId: string): EscrowPayment
```

### confirmWorkByMaster()
Мастер підтверджує виконання роботи

```typescript
escrowService.confirmWorkByMaster(escrowId: string): EscrowPayment
```

### approveWorkByClient()
Клієнт підтверджує якість роботи і звільняє платіж

```typescript
escrowService.approveWorkByClient(escrowId: string): EscrowPayment
```

### openDispute()
Відкрити спір якщо виникли проблеми

```typescript
escrowService.openDispute(
  escrowId: string,
  reason: string,
  initiatedBy: 'client' | 'master'
): EscrowPayment
```

### resolveDisputeInClientFavor()
Адміністратор повертає гроші клієнту

```typescript
escrowService.resolveDisputeInClientFavor(
  escrowId: string,
  reason: string
): EscrowPayment
```

### resolveDisputeInMasterFavor()
Адміністратор виплачує гроші мастеру

```typescript
escrowService.resolveDisputeInMasterFavor(
  escrowId: string,
  reason: string
): EscrowPayment
```

## 🛠️ Використання у компонентах

### Як додати escrow до замовлення

```tsx
import { EscrowPaymentManager } from './components/EscrowPaymentManager';

function OrderDetail() {
  return (
    <EscrowPaymentManager
      orderId="order-123"
      clientId="client-1"
      masterId="master-1"
      amount={44000}  // гривні
      userRole="client"  // або "master"
    />
  );
}
```

### Сцени використання

1. **Клієнт створює замовлення**
   - Escrow платіж готується
   - Клієнт отримує уведомлення

2. **Клієнт підтверджує платіж**
   - Гроші переводяться в escrow
   - Мастер отримує сповіщення

3. **Мастер виконує роботу**
   - Мастер підтверджує завершення
   - Клієнт отримує сповіщення для перевірки

4. **Клієнт перевіряє роботу**
   - Якщо все ОК - підтверджує
   - Платіж вивільняється мастеру

5. **Якщо виникнули проблеми**
   - Одна зі сторін відкриває спір
   - Модератор розглядає справу (24-48 годин)
   - Прийняється рішення

## 📊 Комісії

- **Платформа**: 5%
- **Мастер отримує**: 95% від суми замовлення
- **Приклад**: Замовлення 1000 грн
  - Платформа: 50 грн
  - Мастер: 950 грн

## ⏰ Сроки

- **Дія escrow**: 30 днів
- **Розгляд спору**: 24-48 годин
- **Автоматичний повернення**: Якщо клієнт не платить за 30 днів

## 🔔 Уведомлення

Система автоматично надсилає сповіщення:

1. Клієнту: Мастер отримав платіж
2. Мастеру: Клієнт перевів гроші
3. Мастеру: Платіж звільнено
4. Клієнту: Мастер завершив роботу
5. Обом: Спір відкрито
6. Всім: Спір розв'язано

## 🔐 Безпека

- Все зберігається в localStorage (для демонстрації)
- Готово до міграції на Backend + БД
- Без прямого доступу до коштів обом сторонам
- Логування всіх дій

## 📝 Приклади сценаріїв

### Сценарій 1: Успішне виконання
```
1. Клієнт платить 5000 грн → Escrow
2. Мастер працює 2 дні
3. Мастер пише "готово" → CONFIRMED_BY_MASTER
4. Клієнт перевіряє → "все добре"
5. Клієнт підтверджує → RELEASED_TO_MASTER
6. Мастер отримує 4750 грн (5% комісія = 250 грн)
```

### Сценарій 2: Спір
```
1. Клієнт платить 5000 грн → Escrow
2. Мастер працює 2 дні
3. Мастер пише "готово"
4. Клієнт бачить "це не нормально!"
5. Клієнт відкриває спір → DISPUTED
6. Адміністратор розглядає (24 години)
7. Рішення: платіж повертається клієнту
```

### Сценарій 3: Автоматичний повернення
```
1. Клієнт платить 5000 грн → Escrow
2. Мастер не відповідає 30 днів
3. Автоматичний повернення → REFUNDED_TO_CLIENT
4. Клієнт отримує 5000 грн назад
```

## 🚀 Майбутні удосконалення

- [ ] Інтеграція з реальними платіжними системами
- [ ] Crypto платежі (Bitcoin, Ethereum)
- [ ] Push-сповіщення
- [ ] Email уведомлення
- [ ] SMS оповіщення
- [ ] Веб-хуки для Backend
- [ ] Analytics дашборд
- [ ] Статистика спорів
