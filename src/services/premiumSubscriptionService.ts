import { PremiumSubscription, Receipt, WarrantyCase } from '../types/models';

const PREMIUM_PRICE = 4.99; // EUR
const STORAGE_KEY = 'repairhub_premium_subscriptions';
const RECEIPTS_STORAGE_KEY = 'repairhub_receipts';
const WARRANTY_CASES_STORAGE_KEY = 'repairhub_warranty_cases';

// Завантаження підписок з localStorage
export function loadSubscriptions(): PremiumSubscription[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Помилка при завантаженні підписок:', error);
    }
    return [];
  }
}

// Збереження підписок в localStorage
export function saveSubscriptions(subscriptions: PremiumSubscription[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Помилка при збереженні підписок:', error);
    }
  }
}

// Отримати підписку користувача
export function getUserSubscription(userId: string): PremiumSubscription | null {
  const subscriptions = loadSubscriptions();
  const activeSubscription = subscriptions.find(
    sub => sub.userId === userId && sub.status === 'active'
  );
  
  if (activeSubscription) {
    // Перевіряємо чи не закінчилась підписка
    if (activeSubscription.endDate && new Date(activeSubscription.endDate) < new Date()) {
      // Оновлюємо статус
      activeSubscription.status = 'expired';
      updateSubscription(activeSubscription);
      return null;
    }
    return activeSubscription;
  }
  
  return null;
}

// Перевірити чи має користувач активну підписку
export function hasActivePremium(userId: string): boolean {
  return getUserSubscription(userId) !== null;
}

// Створити нову підписку
export function createSubscription(
  userId: string,
  paymentMethodId?: string,
  autoRenew: boolean = false
): PremiumSubscription {
  const newSubscription: PremiumSubscription = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    status: 'active',
    plan: 'premium',
    price: PREMIUM_PRICE,
    currency: 'EUR',
    startDate: new Date(),
    endDate: autoRenew ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 днів для одноразової
    renewalDate: autoRenew ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined,
    autoRenew,
    benefits: {
      warrantySupport: true,
      receiptStorage: true,
      prioritySupport: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const subscriptions = loadSubscriptions();
  subscriptions.push(newSubscription);
  saveSubscriptions(subscriptions);

  return newSubscription;
}

// Оновити підписку
export function updateSubscription(subscription: PremiumSubscription): void {
  const subscriptions = loadSubscriptions();
  const index = subscriptions.findIndex(sub => sub.id === subscription.id);
  
  if (index >= 0) {
    subscriptions[index] = { ...subscription, updatedAt: new Date() };
    saveSubscriptions(subscriptions);
  }
}

// Скасувати підписку
export function cancelSubscription(subscriptionId: string): void {
  const subscriptions = loadSubscriptions();
  const subscription = subscriptions.find(sub => sub.id === subscriptionId);
  
  if (subscription) {
    subscription.status = 'cancelled';
    subscription.updatedAt = new Date();
    saveSubscriptions(subscriptions);
  }
}

// ============================================================
// РОБОТА З ЧЕКАМИ
// ============================================================

export function loadReceipts(userId: string): Receipt[] {
  try {
    const stored = localStorage.getItem(RECEIPTS_STORAGE_KEY);
    const allReceipts: Receipt[] = stored ? JSON.parse(stored) : [];
    return allReceipts.filter(receipt => receipt.userId === userId);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Помилка при завантаженні чеків:', error);
    }
    return [];
  }
}

export function saveReceipt(receipt: Receipt): void {
  try {
    const stored = localStorage.getItem(RECEIPTS_STORAGE_KEY);
    const allReceipts: Receipt[] = stored ? JSON.parse(stored) : [];
    
    const existingIndex = allReceipts.findIndex(r => r.id === receipt.id);
    if (existingIndex >= 0) {
      allReceipts[existingIndex] = receipt;
    } else {
      allReceipts.push(receipt);
    }
    
    localStorage.setItem(RECEIPTS_STORAGE_KEY, JSON.stringify(allReceipts));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Помилка при збереженні чека:', error);
    }
  }
}

export function deleteReceipt(receiptId: string): void {
  try {
    const stored = localStorage.getItem(RECEIPTS_STORAGE_KEY);
    const allReceipts: Receipt[] = stored ? JSON.parse(stored) : [];
    const filtered = allReceipts.filter(r => r.id !== receiptId);
    localStorage.setItem(RECEIPTS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Помилка при видаленні чека:', error);
    }
  }
}

export function getReceipt(receiptId: string): Receipt | null {
  try {
    const stored = localStorage.getItem(RECEIPTS_STORAGE_KEY);
    const allReceipts: Receipt[] = stored ? JSON.parse(stored) : [];
    return allReceipts.find(r => r.id === receiptId) || null;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Помилка при отриманні чека:', error);
    }
    return null;
  }
}

// ============================================================
// РОБОТА З ГАРАНТІЙНИМИ ВИПАДКАМИ
// ============================================================

export function loadWarrantyCases(userId: string): WarrantyCase[] {
  try {
    const stored = localStorage.getItem(WARRANTY_CASES_STORAGE_KEY);
    const allCases: WarrantyCase[] = stored ? JSON.parse(stored) : [];
    return allCases.filter(case_ => case_.userId === userId);
  } catch (error) {
    console.error('Помилка при завантаженні гарантійних випадків:', error);
    return [];
  }
}

export function saveWarrantyCase(warrantyCase: WarrantyCase): void {
  try {
    const stored = localStorage.getItem(WARRANTY_CASES_STORAGE_KEY);
    const allCases: WarrantyCase[] = stored ? JSON.parse(stored) : [];
    
    const existingIndex = allCases.findIndex(c => c.id === warrantyCase.id);
    if (existingIndex >= 0) {
      allCases[existingIndex] = warrantyCase;
    } else {
      allCases.push(warrantyCase);
    }
    
    localStorage.setItem(WARRANTY_CASES_STORAGE_KEY, JSON.stringify(allCases));
  } catch (error) {
    console.error('Помилка при збереженні гарантійного випадку:', error);
  }
}

export function getWarrantyCase(caseId: string): WarrantyCase | null {
  try {
    const stored = localStorage.getItem(WARRANTY_CASES_STORAGE_KEY);
    const allCases: WarrantyCase[] = stored ? JSON.parse(stored) : [];
    return allCases.find(c => c.id === caseId) || null;
  } catch (error) {
    console.error('Помилка при отриманні гарантійного випадку:', error);
    return null;
  }
}

// Створити гарантійний випадок
export function createWarrantyCase(
  userId: string,
  receiptId: string,
  deviceBrand: string,
  deviceModel: string,
  issue: string,
  issueType: WarrantyCase['issueType'],
  merchantName: string
): WarrantyCase {
  const newCase: WarrantyCase = {
    id: `warranty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    receiptId,
    deviceBrand,
    deviceModel,
    issue,
    issueType,
    status: 'pending',
    priority: 'medium',
    merchantName,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  saveWarrantyCase(newCase);
  return newCase;
}
