# ⚖️ Полное руководство по правовой защите и соответствию

## 📋 Содержание

1. [Архитектура правовой защиты](#архитектура-правовой-защиты)
2. [Защита трех сторон](#защита-трех-сторон)
3. [Система согласий](#система-согласий)
4. [Верификация и KYC](#верификация-и-kyc)
5. [Разрешение споров](#разрешение-споров)
6. [Борьба с мошенничеством](#борьба-с-мошенничеством)
7. [Аудит и мониторинг](#аудит-и-мониторинг)

---

## Архитектура правовой защиты

```
┌─────────────────────────────────────────────────────────┐
│              COMPLIANCE LAYER                            │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ LegalAgreementsModal (UI)                           │ │
│ │ - Terms of Service                                  │ │
│ │ - Privacy Policy                                    │ │
│ │ - Commission Agreement                              │ │
│ │ - Dispute Resolution Agreement                      │ │
│ └──────────────────┬──────────────────────────────────┘ │
│                    │                                     │
│ ┌──────────────────▼──────────────────────────────────┐ │
│ │ ComplianceService (Business Logic)                  │ │
│ │ - Agreement Tracking                                │ │
│ │ - Verification Management                           │ │
│ │ - Dispute Resolution                                │ │
│ │ - Fraud Detection & Reporting                       │ │
│ │ - User Activity Logging                             │ │
│ │ - Compliance Snapshots                              │ │
│ └──────────────────┬──────────────────────────────────┘ │
│                    │                                     │
│ ┌──────────────────▼──────────────────────────────────┐ │
│ │ localStorage + Audit Trail                          │ │
│ │ - All agreements and their signatures               │ │
│ │ - Verification history                              │ │
│ │ - Dispute records                                   │ │
│ │ - Fraud reports                                     │ │
│ │ - User activity logs                                │ │
│ └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Защита трех сторон

### 👤 1. ЗАЩИТА КЛИЕНТА

**Что мы защищаем:**
- Финансовые средства (эскроу система)
- Личные данные (GDPR compliance)
- Права на справедливое разрешение (система споров)

**Механизмы защиты:**

```typescript
// 1. Эскроу платеж
const escrow = new PaymentEscrow({
  id: 'escrow-123',
  orderId: 'order-456',
  clientId: 'client-1',
  masterId: 'master-1',
  amount: 1000, // Удерживается платформой
  status: 'held', // Не у мастера, не у клиента
  autoReleaseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Автоматический возврат через 7 дней
});

// 2. Прав на спор
const dispute = complianceService.createDispute(
  orderId,
  clientId,
  masterId,
  'client', // Клиент инициирует спор
  'Качество работы ниже ожидаемого',
  'Мастер выполнил работу некачественно',
  'quality_issue',
  amount
);

// 3. Обратный отсчет 30 дней на рефунд
const refundDeadline = new Date(orderCompletedDate);
refundDeadline.setDate(refundDeadline.getDate() + 30);

// 4. Верификация платежа
complianceService.startVerification(clientId, 'payment_method');
```

**Права клиента в договоре:**
- ✅ Полный рефунд при неудовлетворительном качестве (30 дней)
- ✅ Частичный рефунд при частичном несоответствии
- ✅ Переделку работы за счет мастера
- ✅ Апелляция по решению модератора (14 дней)
- ✅ Доступ к личным данным
- ✅ Удаление аккаунта

### 🔧 2. ЗАЩИТА МАСТЕРА

**Что мы защищаем:**
- Заработки и комиссии
- Репутация и рейтинг
- Справедливое разрешение конфликтов

**Механизмы защиты:**

```typescript
// 1. Гарантированный заработок
const earning = earningsService.createEarning(
  masterId,
  orderId,
  'labor_income',
  agreedPrice, // Согласованная цена
  description
);
// Статусы: pending -> confirmed -> withdrawn
// Даже если клиент не доволен, мастер получит свои деньги через эскроу

// 2. Система рейтинга защиты
// Рейтинг не может быть изменен без доказательств
const fraudReport = complianceService.reportFraud(
  reportedBy,
  masterId,
  'fake_rating', // Попытка подделать плохой рейтинг
  evidence
);

// 3. Защита от несправедливых споров
// Все доказательства фиксируются
complianceService.addDisputeEvidence(
  disputeId,
  'message', // Чат платформы зафиксирован
  messageUrl,
  masterId,
  'Переписка подтверждает выполнение работы'
);

// 4. Гарантия возврата даже при спорах
if (escrow.status === 'disputed') {
  // Платеж остается в эскроу до разрешения
  // Затем выплачивается на основе решения модератора
}
```

**Права мастера в договоре:**
- ✅ Гарантированный заработок (после выполнения работы)
- ✅ Защита от ложных обвинений
- ✅ Апелляция по решению модератора
- ✅ Доступ к полной истории заказов
- ✅ Возможность восстановления репутации после предыдущих ошибок

### 🏢 3. ЗАЩИТА ПЛАТФОРМЫ

**Что мы защищаем:**
- От мошенничества (поддельные заказы, кража)
- От неправомерного использования
- От ответственности перед третьими лицами

**Механизмы защиты:**

```typescript
// 1. Система мониторинга активности
complianceService.logUserActivity(
  userId,
  'payment',
  { amount, orderId },
  ipAddress,
  userAgent
);
// Флаги: rapid_requests, ip_changed, unverified_action, etc.

// 2. AI-скоринг мошенничества
const fraudReport = complianceService.reportFraud(
  reporter,
  targetUser,
  'payment_fraud',
  description,
  evidence
);
const aiScore = fraudReport.aiScore; // 0-100
// Критический риск (>75) -> автоматическое расследование

// 3. Аудит всех соглашений
const snapshot = complianceService.getComplianceSnapshot(userId);
// {
//   complianceScore: 95,
//   verificationsStatus: { email: 'verified', id_document: 'verified' },
//   agreementsStatus: { terms_of_service: 'agreed' },
//   riskLevel: 'low'
// }

// 4. Ограничение ответственности
const agreement = {
  type: 'service_agreement',
  status: 'agreed', // Доказано согласие пользователя
  agreedAt: new Date(), // С этой даты и времени
  ipAddress: '192.168.1.1', // От этого IP
  documentHash: 'hash123' // Неизменяемый хеш
};
```

**Защита платформы:**
- ✅ Полная верификация пользователей (KYC/AML)
- ✅ Отслеживание всех транзакций
- ✅ Запись всех согласий с датой, временем и IP
- ✅ Система автоматического блокирования подозрительных аккаунтов
- ✅ Ограничение ответственности в соглашениях

---

## Система согласий

### Обязательные соглашения

| Соглашение | Сроки | Действие | Обновление |
|-----------|-------|---------|-----------|
| **Условия использования** | 2 года | Обязательное | Каждые 6 месяцев |
| **Политика конфиденциальности** | 2 года | Обязательное | При любом изменении |
| **Соглашение о комиссиях** | 1 год | Обязательное | При смене комиссий |
| **Разрешение споров** | 2 года | Обязательное | При изменении процедуры |

### Процесс согласия

```typescript
// 1. Требовать согласие
const agreement = complianceService.requireAgreement(
  userId,
  'terms_of_service',
  ipAddress, // Для отслеживания
  userAgent   // Для отслеживания
);

// 2. Пользователь читает и соглашается
// (показывается LegalAgreementsModal)

// 3. Записать согласие
const agreed = complianceService.agreeToAgreement(
  userId,
  'terms_of_service',
  signature // Криптографическая подпись
);

// 4. Проверить, согласился ли пользователь
const canProceed = complianceService.hasAllAgreements(userId);
// Если false -> блокировать доступ до согласия

// 5. Получить статус для аудита
const snapshot = complianceService.getComplianceSnapshot(userId);
// {
//   agreementsStatus: {
//     terms_of_service: 'agreed',
//     privacy_policy: 'agreed',
//     commission_agreement: 'agreed'
//   }
// }
```

---

## Верификация и KYC

### Типы верификации

```typescript
// 1. Email верификация (обязательная)
const emailVerification = complianceService.startVerification(userId, 'email');
// Процесс: отправить письмо -> пользователь переходит по ссылке -> подтвердить

// 2. Телефон верификация (для мастеров)
const phoneVerification = complianceService.startVerification(userId, 'phone');
// Процесс: отправить SMS -> пользователь вводит код -> подтвердить

// 3. ID документ (для мастеров - обязательно)
const idVerification = complianceService.startVerification(userId, 'id_document');
complianceService.confirmVerification(
  verificationId,
  'passport',           // тип документа
  'AB123456',          // номер
  new Date('2028-12-31') // срок действия
);

// 4. Банковский счет (для вывода средств)
const bankVerification = complianceService.startVerification(userId, 'bank_account');
complianceService.confirmVerification(
  verificationId,
  'bank_account',
  'UA1234567890123456' // IBAN
);

// 5. Платежная система (для платежей)
const paymentVerification = complianceService.startVerification(userId, 'payment_method');
```

### Процесс верификации

```
1. ЗАПРОС
   ├─ startVerification() -> status: 'pending'
   └─ Запрос отправлен пользователю

2. ПОПЫТКА
   ├─ Пользователь предоставляет документы
   ├─ Максимум 3 попытки
   └─ attemptsCount++

3. ПРОВЕРКА
   ├─ confirmVerification() -> status: 'verified'
   ├─ Срок действия: 1 год
   └─ Может потребоваться переверификация

4. ОТКЛОНЕНИЕ
   ├─ rejectVerification() -> status: 'rejected'
   ├─ Причина отклонения хранится
   └─ После 3 отклонений -> status: 'suspended'

5. БЛОКИРОВКА
   ├─ После 3 неудачных попыток
   ├─ status: 'suspended'
   └─ Требуется обращение в поддержку
```

---

## Разрешение споров

### Четырехуровневый процесс

```
УРОВЕНЬ 1: ПЕРЕГОВОРЫ (5 дней)
├─ Стороны общаются напрямую в чате
├─ Платформа предоставляет рекомендации
└─ Если нет результата -> УРОВЕНЬ 2

УРОВЕНЬ 2: МЕДИАЦИЯ (10 дней)
├─ Нейтральный модератор
├─ Обе стороны предоставляют доказательства
├─ Модератор анализирует переписку и файлы
└─ Если нет результата -> УРОВЕНЬ 3

УРОВЕНЬ 3: РЕШЕНИЕ (5 дней)
├─ Модератор выносит обязательное решение
├─ Варианты: полный рефунд, частичный, переделка, пеня
├─ Решение выполняется автоматически через эскроу
└─ Если одна сторона не согласна -> УРОВЕНЬ 4

УРОВЕНЬ 4: АПЕЛЛЯЦИЯ (14 дней)
├─ Только 1 апелляция возможна
├─ Рассматривается старшим модератором
├─ Если апелляция отклонена -> решение финально
└─ Если апелляция принята -> возврат на УРОВЕНЬ 3
```

### Типы доказательств

```typescript
// 1. Переписка в чате платформы (НАИВЫСШИЙ ПРИОРИТЕТ)
complianceService.addDisputeEvidence(
  disputeId,
  'message',
  chatMessageUrl,
  userId,
  'Клиент согласился с ценой 1500₴'
);

// 2. Фотографии/видео работ
complianceService.addDisputeEvidence(
  disputeId,
  'photo',
  photoUrl,
  userId,
  'Фото отремонтированного устройства'
);

// 3. Скриншоты (если необходимо)
complianceService.addDisputeEvidence(
  disputeId,
  'screenshot',
  screenshotUrl,
  userId,
  'Скриншот подтверждения оплаты'
);

// 4. Документы/квитанции
complianceService.addDisputeEvidence(
  disputeId,
  'document',
  documentUrl,
  userId,
  'Квитанция о поступлении платежа'
);

// 5. Видео (запись процесса)
complianceService.addDisputeEvidence(
  disputeId,
  'video',
  videoUrl,
  userId,
  'Видео процесса ремонта'
);
```

### Возможные решения

| Решение | Условие | Действие |
|---------|---------|---------|
| **Полный рефунд** | Мастер не выполнил работу | Вернуть 100% клиенту + пеня |
| **Частичный рефунд** | Работа выполнена на 50% | Вернуть 50% клиенту |
| **Переделка** | Некачественно, но исправимо | Мастер переделает бесплатно |
| **Сохранение платежа** | Мастер прав, качество хорошее | Заберет все средства + бонус |
| **Пеня** | Мастер виноват в задержке | +500₴ компенсация к рефунду |
| **Штраф платформы** | Клиент подал ложный спор | -100₴ штраф клиенту |

---

## Борьба с мошенничеством

### Система оценки риска (AI Score)

```typescript
// AI Score: 0-100 (вероятность мошенничества)
const fraudReport = complianceService.reportFraud(
  reporterUserId,
  targetUserId,
  'payment_fraud',
  'Попытка оплаты чужой карточкой',
  ['payment_confirmation.jpg', 'chargeback_notice.pdf']
);

// Расчет AI Score:
// - Тип (базовый риск):
//   - account_activity: 20
//   - fake_order: 40
//   - payment_fraud: 50
//   - identity_fraud: 80
//   - abuse: 30
//
// - Описание (если > 100 символов): +10
// - Доказательства (за каждое): +5 (макс 20)
//
// ИТОГО: 50 + 10 + 15 = 75 (HIGH risk -> автоматическое расследование)
```

### Уровни риска

| Уровень | Score | Действие |
|---------|-------|---------|
| **LOW** | 0-24 | Логирование, мониторинг |
| **MEDIUM** | 25-49 | Требуется верификация, ограничения |
| **HIGH** | 50-74 | Мониторинг транзакций, уведомление модератору |
| **CRITICAL** | 75-100 | Немедленное расследование, временное блокирование |

### Анализ активности

```typescript
// Флаги автоматического анализа
const activity = complianceService.logUserActivity(
  userId,
  'payment',
  { amount: 50000, orderId: 'order-1' },
  ipAddress,
  userAgent
);

// Возможные флаги:
// - rapid_requests: более 10 запросов в минуту
// - ip_changed: смена IP адреса
// - unverified_action: платеж без верификации
// - unusual_time: платеж в 3 утра
// - high_amount: необычно большая сумма
// - new_account: аккаунт меньше 7 дней
// - multiple_failures: несколько неудачных попыток
```

### Действия при мошенничестве

```typescript
// Расследование
complianceService.investigateFraud(
  fraudReportId,
  moderatorUserId,
  'account_temp_suspended', // Действие
  true // Мошенничество подтверждено
);

// Возможные действия:
const actions = [
  'warning',                  // Предупреждение
  'account_temp_suspended',   // Временная блокировка (24-48 ч)
  'account_permanent_banned', // Постоянный бан
  'refund_to_other_party',   // Рефунд потерпевшему
  'fine',                     // Штраф
  'report_to_authorities'     // Заявление в органы
];
```

---

## Аудит и мониторинг

### Снимок соответствия (Compliance Snapshot)

```typescript
const snapshot = complianceService.getComplianceSnapshot(userId);

// Возвращает:
// {
//   complianceScore: 95,      // 0-100 (выше лучше)
//   verificationsStatus: {
//     email: 'verified',       // verified, pending, rejected, suspended
//     phone: 'pending',
//     id_document: 'verified'
//   },
//   agreementsStatus: {
//     terms_of_service: 'agreed',
//     privacy_policy: 'agreed',
//     commission_agreement: 'agreed'
//   },
//   riskLevel: 'low',          // low, medium, high, critical
//   flagsCount: 2,             // Количество рисков
//   notes: 'All verifications passed'
// }
```

### История аудита

```
1. СОГЛАШЕНИЯ ЗАФИКСИРОВАНЫ
   ├─ ID соглашения: agreement-123
   ├─ Тип: terms_of_service
   ├─ Статус: agreed
   ├─ Согласие дано: 2024-10-24 14:30:00
   ├─ IP адрес: 192.168.1.1
   ├─ User Agent: Mozilla/5.0...
   ├─ Document Hash: 3f4c5d...
   └─ Версия: 1.0

2. ВЕРИФИКАЦИЯ ВЫПОЛНЕНА
   ├─ ID верификации: verification-456
   ├─ Тип: id_document
   ├─ Статус: verified
   ├─ Документ: passport
   ├─ Номер: AB123456
   ├─ Срок: 2028-12-31
   ├─ Подтверждено: 2024-10-24 14:35:00
   └─ Модератор: moderator-1

3. СПОР СОЗДАН
   ├─ ID спора: dispute-789
   ├─ Статус: open -> mediation -> resolved
   ├─ Этапы: переговоры (5д) -> медиация (10д) -> решение (5д)
   ├─ Доказательства: 5 файлов загружено
   ├─ Решение: частичный рефунд (50%)
   ├─ Разрешено: 2024-10-31
   └─ Модератор: moderator-2

4. МОШЕННИЧЕСТВО РАССЛЕДОВАНО
   ├─ ID отчета: fraud-101
   ├─ Тип: payment_fraud
   ├─ AI Score: 82 (CRITICAL)
   ├─ Статус: confirmed
   ├─ Действие: account_temp_suspended
   ├─ Конец блокировки: 2024-10-26
   └─ Модератор: moderator-admin
```

---

## Интеграция в приложение

### Блокпост при регистрации

```typescript
function RegisterFlow() {
  const [step, setStep] = useState(0);

  return (
    <>
      {/* ШАГ 1: Заполнить форму */}
      {step === 0 && <RegistrationForm onNext={() => setStep(1)} />}

      {/* ШАГ 2: Обязательные соглашения */}
      {step === 1 && (
        <LegalAgreementsModal
          user={newUser}
          isOpen={true}
          onClose={() => setStep(0)} // Вернуться
          onAgreedAll={() => {
            // Сохранить согласия
            complianceService.agreeToAgreement(...);
            setStep(2);
          }}
        />
      )}

      {/* ШАГ 3: Верификация */}
      {step === 2 && <VerificationStep onComplete={() => setStep(3)} />}

      {/* ШАГ 4: Успех */}
      {step === 3 && <SuccessScreen />}
    </>
  );
}
```

### Блокировка функционала

```typescript
function OrderCreation() {
  const user = getCurrentUser();
  const compliance = complianceService.getComplianceSnapshot(user.id);

  // Требование 1: Все соглашения
  if (!complianceService.hasAllAgreements(user.id)) {
    return <BlockedScreen reason="Please agree to all terms" />;
  }

  // Требование 2: Email верификация
  if (compliance.verificationsStatus.email !== 'verified') {
    return <BlockedScreen reason="Verify your email" />;
  }

  // Требование 3: Для мастеров - ID верификация
  if (user.role === 'master' && compliance.verificationsStatus.id_document !== 'verified') {
    return <BlockedScreen reason="Verify your identity" />;
  }

  // Требование 4: Не высокий риск
  if (compliance.riskLevel === 'critical') {
    return <BlockedScreen reason="Account under review" />;
  }

  // ВСЕ ТРЕБОВАНИЯ ВЫПОЛНЕНЫ
  return <CreateOrderForm />;
}
```

---

## Чек-лист для юриста

- [ ] Все соглашения переведены на украинский/русский
- [ ] Соглашения соответствуют местному законодательству
- [ ] GDPR compliance (политика конфиденциальности)
- [ ] Условия возврата соответствуют закону о защите прав потребителей
- [ ] Система хранит все согласия (для судебных целей)
- [ ] IP адреса и User Agent логируются (для аутентификации)
- [ ] Система автоматических действий обоснована
- [ ] Процедура апелляции справедлива
- [ ] Все допускаемые действия модератора задокументированы

---

## Контакты для поддержки

**Юридический отдел:** legal@platform.com  
**Служба поддержки:** support@platform.com  
**Служба модерации:** moderation@platform.com  

---

**Версия**: 1.0  
**Последнее обновление**: October 2024  
**Ответственность за соответствие**: Юридический отдел
