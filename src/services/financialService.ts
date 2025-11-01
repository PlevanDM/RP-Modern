/**
 * FINANCIAL SERVICE
 * Сервіс для управління фінансами, транзакціями та гаманцями
 */

import { FinancialTransaction, Wallet, TransactionType } from '../types/spareParts';

interface CommissionRates {
  sale: number;           // % від продажу
  escrow: number;         // % за гарант-сервіс
  withdrawal: number;     // % за виведення
  minCommission: number;  // Мінімальна комісія
}

class FinancialService {
  private commissionRates: CommissionRates = {
    sale: 5,              // 5% від продажу
    escrow: 2,            // 2% за escrow
    withdrawal: 1,        // 1% за виведення
    minCommission: 10     // Мінімум 10 грн
  };

  /**
   * Розрахувати комісію платформи
   */
  calculateCommission(amount: number, type: TransactionType = 'sale'): number {
    let rate = 0;
    
    switch (type) {
      case 'sale':
        rate = this.commissionRates.sale;
        break;
      case 'withdrawal':
        rate = this.commissionRates.withdrawal;
        break;
      default:
        rate = 0;
    }

    const commission = (amount * rate) / 100;
    return Math.max(commission, this.commissionRates.minCommission);
  }

  /**
   * Розрахувати суму після комісії
   */
  calculateNetAmount(amount: number, type: TransactionType = 'sale'): number {
    const commission = this.calculateCommission(amount, type);
    return amount - commission;
  }

  /**
   * Створити транзакцію
   */
  async createTransaction(data: {
    orderId: string;
    type: TransactionType;
    amount: number;
    fromUserId: string;
    toUserId: string;
    description: string;
  }): Promise<FinancialTransaction> {
    try {
      const commission = this.calculateCommission(data.amount, data.type);
      const commissionRate = this.getCommissionRate(data.type);

      const transaction: FinancialTransaction = {
        id: this.generateTransactionId(),
        orderId: data.orderId,
        type: data.type,
        amount: data.amount,
        currency: 'UAH',
        fromUserId: data.fromUserId,
        toUserId: data.toUserId,
        platformCommission: commission,
        commissionRate: commissionRate,
        status: 'pending',
        description: data.description,
        createdAt: new Date()
      };

      // TODO: Зберегти в базу даних
      if (import.meta.env.DEV) {
        console.log('Transaction created:', transaction);
      }

      return transaction;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error creating transaction:', error);
      }
      throw error;
    }
  }

  /**
   * Завершити транзакцію
   */
  async completeTransaction(transactionId: string): Promise<FinancialTransaction> {
    try {
      // TODO: Оновити статус в базі даних
      const transaction: FinancialTransaction = {
        id: transactionId,
        orderId: '',
        type: 'sale',
        amount: 0,
        currency: 'UAH',
        fromUserId: '',
        toUserId: '',
        platformCommission: 0,
        commissionRate: 0,
        status: 'completed',
        description: '',
        createdAt: new Date(),
        completedAt: new Date()
      };

      return transaction;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error completing transaction:', error);
      }
      throw error;
    }
  }

  /**
   * Повернути кошти
   */
  async refundTransaction(transactionId: string, reason: string): Promise<FinancialTransaction> {
    try {
      // TODO: Створити refund транзакцію
      const refundTransaction: FinancialTransaction = {
        id: this.generateTransactionId(),
        orderId: '',
        type: 'refund',
        amount: 0,
        currency: 'UAH',
        fromUserId: '',
        toUserId: '',
        platformCommission: 0,
        commissionRate: 0,
        status: 'completed',
        description: `Refund: ${reason}`,
        createdAt: new Date(),
        completedAt: new Date()
      };

      return refundTransaction;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error refunding transaction:', error);
      }
      throw error;
    }
  }

  /**
   * Отримати гаманець користувача
   */
  async getWallet(userId: string): Promise<Wallet> {
    try {
      // TODO: Отримати з бази даних
      const wallet: Wallet = {
        userId,
        balance: 0,
        currency: 'UAH',
        pendingBalance: 0,
        availableBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        transactions: []
      };

      return wallet;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error getting wallet:', error);
      }
      throw error;
    }
  }

  /**
   * Поповнити гаманець
   */
  async depositToWallet(userId: string, amount: number): Promise<Wallet> {
    try {
      const transaction = await this.createTransaction({
        orderId: 'deposit-' + Date.now(),
        type: 'deposit',
        amount,
        fromUserId: 'system',
        toUserId: userId,
        description: 'Поповнення гаманця'
      });

      await this.completeTransaction(transaction.id);

      return this.getWallet(userId);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error depositing to wallet:', error);
      }
      throw error;
    }
  }

  /**
   * Вивести кошти з гаманця
   */
  async withdrawFromWallet(userId: string, amount: number, method: string): Promise<Wallet> {
    try {
      const commission = this.calculateCommission(amount, 'withdrawal');
      const netAmount = amount - commission;

      const transaction = await this.createTransaction({
        orderId: 'withdrawal-' + Date.now(),
        type: 'withdrawal',
        amount: netAmount,
        fromUserId: userId,
        toUserId: 'system',
        description: `Виведення коштів через ${method}`
      });

      await this.completeTransaction(transaction.id);

      return this.getWallet(userId);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error withdrawing from wallet:', error);
      }
      throw error;
    }
  }

  /**
   * Обробити продаж
   */
  async processSale(data: {
    orderId: string;
    sellerId: string;
    buyerId: string;
    amount: number;
    useEscrow: boolean;
  }): Promise<{ transaction: FinancialTransaction; sellerAmount: number; commission: number }> {
    try {
      const commission = this.calculateCommission(data.amount, 'sale');
      const sellerAmount = data.amount - commission;

      const transaction = await this.createTransaction({
        orderId: data.orderId,
        type: 'sale',
        amount: data.amount,
        fromUserId: data.buyerId,
        toUserId: data.sellerId,
        description: `Продаж запчастини (замовлення ${data.orderId})`
      });

      // Якщо використовується escrow, кошти утримуються
      if (data.useEscrow) {
        transaction.status = 'held';
      } else {
        await this.completeTransaction(transaction.id);
      }

      return {
        transaction,
        sellerAmount,
        commission
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error processing sale:', error);
      }
      throw error;
    }
  }

  /**
   * Відпустити кошти з escrow
   */
  async releaseEscrow(transactionId: string): Promise<FinancialTransaction> {
    try {
      const transaction = await this.completeTransaction(transactionId);
      transaction.status = 'released';
      return transaction;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error releasing escrow:', error);
      }
      throw error;
    }
  }

  /**
   * Отримати історію транзакцій
   */
  async getTransactionHistory(userId: string, limit = 50): Promise<FinancialTransaction[]> {
    try {
      // TODO: Отримати з бази даних
      return [];
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error getting transaction history:', error);
      }
      throw error;
    }
  }

  /**
   * Отримати статистику доходів
   */
  async getEarningsStats(userId: string, period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<{
    totalEarnings: number;
    totalSales: number;
    totalCommissions: number;
    averageSale: number;
    pendingAmount: number;
  }> {
    try {
      // TODO: Розрахувати з бази даних
      return {
        totalEarnings: 0,
        totalSales: 0,
        totalCommissions: 0,
        averageSale: 0,
        pendingAmount: 0
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error getting earnings stats:', error);
      }
      throw error;
    }
  }

  // Helper methods
  private generateTransactionId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCommissionRate(type: TransactionType): number {
    switch (type) {
      case 'sale':
        return this.commissionRates.sale;
      case 'withdrawal':
        return this.commissionRates.withdrawal;
      default:
        return 0;
    }
  }

  /**
   * Отримати поточні ставки комісії
   */
  getCommissionRates(): CommissionRates {
    return { ...this.commissionRates };
  }

  /**
   * Оновити ставки комісії (тільки для адміністраторів)
   */
  updateCommissionRates(rates: Partial<CommissionRates>): void {
    this.commissionRates = { ...this.commissionRates, ...rates };
  }
}

export const financialService = new FinancialService();

