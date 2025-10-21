import { EscrowPayment, IEscrowDataProvider } from '../../types';

export class LocalStorageDataProvider implements IEscrowDataProvider {
  private readonly storageKey = 'repair_master_escrow_payments';

  public getById(id: string): EscrowPayment | null {
    const payments = this.getAll();
    return payments.find(p => p.id === id) || null;
  }

  public getByOrderId(orderId: string): EscrowPayment[] {
    const payments = this.getAll();
    return payments.filter(p => p.orderId === orderId);
  }

  public getAll(): EscrowPayment[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      // В случае ошибки парсинга JSON, возвращаем пустой массив
      return [];
    }
  }

  public save(payment: EscrowPayment): void {
    const allPayments = this.getAll();
    const index = allPayments.findIndex(p => p.id === payment.id);

    if (index >= 0) {
      // Обновляем существующий платеж
      allPayments[index] = payment;
    } else {
      // Добавляем новый платеж
      allPayments.push(payment);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(allPayments));
  }
}
