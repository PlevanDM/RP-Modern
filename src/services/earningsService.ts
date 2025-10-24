import {
  MasterEarning,
  MasterBalance,
  CommissionConfig,
  PlatformRevenue,
  EarningType,
  EarningStatus,
} from '../types';

class EarningsService {
  private static instance: EarningsService;
  private earnings: MasterEarning[] = [];
  private balances: Map<string, MasterBalance> = new Map();
  private commissionConfigs: CommissionConfig[] = [];
  private platformRevenues: PlatformRevenue[] = [];

  private constructor() {
    this.initializeDefaultConfigs();
    this.loadFromStorage();
  }

  public static getInstance(): EarningsService {
    if (!EarningsService.instance) {
      EarningsService.instance = new EarningsService();
    }
    return EarningsService.instance;
  }

  /**
   * Инициализировать стандартные конфигурации комиссий
   */
  private initializeDefaultConfigs(): void {
    this.commissionConfigs = [
      {
        id: 'platform-fee-standard',
        type: 'platform_fee',
        description: 'Стандартная комиссия платформы',
        percentage: 10,
        active: true,
        createdAt: new Date(),
      },
      {
        id: 'platform-fee-premium',
        type: 'platform_fee',
        description: 'Комиссия для мастеров премиум',
        percentage: 5,
        minAmount: 5000,
        active: true,
        createdAt: new Date(),
      },
      {
        id: 'referral-bonus',
        type: 'referral',
        description: 'Бонус за реферала',
        percentage: 5,
        active: true,
        createdAt: new Date(),
      },
      {
        id: 'successful-deal-bonus',
        type: 'successful_deal',
        description: 'Бонус за успешную сделку',
        percentage: 2,
        minAmount: 1000,
        active: true,
        createdAt: new Date(),
      },
    ];
  }

  /**
   * Создать запись о заработке мастера
   */
  public createEarning(
    masterId: string,
    orderId: string,
    type: EarningType,
    grossAmount: number,
    description: string,
    currency: string = 'UAH'
  ): MasterEarning {
    // Определить процент комиссии на основе типа заработка
    const commissionPercent = this.getCommissionPercent(type, grossAmount);
    const commissionAmount = (grossAmount * commissionPercent) / 100;
    const netAmount = grossAmount - commissionAmount;

    const earning: MasterEarning = {
      id: `earning-${Date.now()}-${Math.random()}`,
      masterId,
      orderId,
      type,
      grossAmount,
      commissionPercent,
      commissionAmount,
      netAmount,
      currency,
      status: 'pending',
      description,
      createdAt: new Date(),
    };

    this.earnings.push(earning);
    
    // Создать запись о доходе платформы
    this.platformRevenues.push({
      id: `revenue-${Date.now()}`,
      masterId,
      orderId,
      commissionAmount,
      commissionPercent,
      currency,
      createdAt: new Date(),
    });

    // Обновить баланс мастера
    this.updateMasterBalance(masterId, currency);
    this.saveToStorage();

    return earning;
  }

  /**
   * Подтвердить заработок (изменить статус с pending на confirmed)
   */
  public confirmEarning(earningId: string): boolean {
    const earning = this.earnings.find(e => e.id === earningId);
    if (earning && earning.status === 'pending') {
      earning.status = 'confirmed';
      earning.confirmedAt = new Date().toISOString();
      this.updateMasterBalance(earning.masterId, earning.currency);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Вывести заработок (изменить статус на withdrawn)
   */
  public withdrawEarning(earningId: string): boolean {
    const earning = this.earnings.find(e => e.id === earningId);
    if (earning && (earning.status === 'confirmed' || earning.status === 'pending')) {
      earning.status = 'withdrawn';
      earning.withdrawnAt = new Date().toISOString();
      this.updateMasterBalance(earning.masterId, earning.currency);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Вернуть заработок (refund)
   */
  public refundEarning(earningId: string, reason: string): boolean {
    const earning = this.earnings.find(e => e.id === earningId);
    if (earning && earning.status !== 'withdrawn') {
      earning.status = 'refunded';
      this.updateMasterBalance(earning.masterId, earning.currency);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Получить баланс мастера
   */
  public getMasterBalance(masterId: string): MasterBalance {
    let balance = this.balances.get(masterId);
    if (!balance) {
      balance = this.createEmptyBalance(masterId);
      this.balances.set(masterId, balance);
    }
    return balance;
  }

  /**
   * Получить заработки мастера
   */
  public getMasterEarnings(masterId: string): MasterEarning[] {
    return this.earnings.filter(e => e.masterId === masterId);
  }

  /**
   * Получить заработки по статусу
   */
  public getEarningsByStatus(masterId: string, status: EarningStatus): MasterEarning[] {
    return this.earnings.filter(e => e.masterId === masterId && e.status === status);
  }

  /**
   * Получить статистику по заработкам за период
   */
  public getEarningsStatistics(
    masterId: string,
    startDate: Date,
    endDate: Date
  ): {
    totalEarnings: number;
    totalCommissions: number;
    netIncome: number;
    ordersCount: number;
    averageOrderValue: number;
  } {
    const masterEarnings = this.earnings.filter(
      e =>
        e.masterId === masterId &&
        new Date(e.createdAt) >= startDate &&
        new Date(e.createdAt) <= endDate
    );

    const totalEarnings = masterEarnings.reduce((sum, e) => sum + e.grossAmount, 0);
    const totalCommissions = masterEarnings.reduce((sum, e) => sum + e.commissionAmount, 0);
    const netIncome = masterEarnings.reduce((sum, e) => sum + e.netAmount, 0);

    return {
      totalEarnings,
      totalCommissions,
      netIncome,
      ordersCount: masterEarnings.length,
      averageOrderValue: masterEarnings.length > 0 ? totalEarnings / masterEarnings.length : 0,
    };
  }

  /**
   * Получить доход платформы
   */
  public getPlatformRevenue(startDate?: Date, endDate?: Date): PlatformRevenue[] {
    if (!startDate || !endDate) {
      return this.platformRevenues;
    }

    return this.platformRevenues.filter(
      r =>
        new Date(r.createdAt) >= startDate &&
        new Date(r.createdAt) <= endDate
    );
  }

  /**
   * Получить общий доход платформы
   */
  public getTotalPlatformRevenue(startDate?: Date, endDate?: Date): number {
    const revenues = this.getPlatformRevenue(startDate, endDate);
    return revenues.reduce((sum, r) => sum + r.commissionAmount, 0);
  }

  /**
   * Обновить конфигурацию комиссии
   */
  public updateCommissionConfig(configId: string, updates: Partial<CommissionConfig>): boolean {
    const config = this.commissionConfigs.find(c => c.id === configId);
    if (config) {
      Object.assign(config, updates);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Получить конфигурации комиссий
   */
  public getCommissionConfigs(): CommissionConfig[] {
    return this.commissionConfigs;
  }

  /**
   * Получить активные заработки мастера (pending + confirmed)
   */
  public getActiveMasterEarnings(masterId: string): MasterEarning[] {
    return this.earnings.filter(
      e =>
        e.masterId === masterId &&
        (e.status === 'pending' || e.status === 'confirmed')
    );
  }

  /**
   * Получить доступный баланс мастера для вывода
   */
  public getWithdrawableBalance(masterId: string): number {
    const confirmedEarnings = this.getEarningsByStatus(masterId, 'confirmed');
    return confirmedEarnings.reduce((sum, e) => sum + e.netAmount, 0);
  }

  /**
   * Получить детальный отчет о заработках
   */
  public getDetailedEarningsReport(masterId: string): {
    totalGrossIncome: number;
    totalCommissionsPaid: number;
    totalNetIncome: number;
    pendingEarnings: number;
    confirmedEarnings: number;
    withdrawnTotal: number;
    availableBalance: number;
    earnings: MasterEarning[];
  } {
    const earnings = this.getMasterEarnings(masterId);
    const balance = this.getMasterBalance(masterId);

    return {
      totalGrossIncome: earnings.reduce((sum, e) => sum + e.grossAmount, 0),
      totalCommissionsPaid: earnings.reduce((sum, e) => sum + e.commissionAmount, 0),
      totalNetIncome: earnings.reduce((sum, e) => sum + e.netAmount, 0),
      pendingEarnings: earnings
        .filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + e.netAmount, 0),
      confirmedEarnings: earnings
        .filter(e => e.status === 'confirmed')
        .reduce((sum, e) => sum + e.netAmount, 0),
      withdrawnTotal: balance.withdrawnTotal,
      availableBalance: this.getWithdrawableBalance(masterId),
      earnings,
    };
  }

  private getCommissionPercent(type: EarningType, amount: number): number {
    if (type === 'labor_income' || type === 'parts_markup') {
      // Проверить премиум комиссию (5% если больше 5000)
      if (amount >= 5000) {
        return 5;
      }
      // Иначе стандартная комиссия (10%)
      return 10;
    } else if (type === 'commission_earned' || type === 'bonus_earned') {
      return 0; // Без комиссии для бонусов
    } else if (type === 'refund') {
      return 0;
    }
    return 10;
  }

  private updateMasterBalance(masterId: string, currency: string): void {
    const earnings = this.getMasterEarnings(masterId);

    const totalEarnings = earnings.reduce((sum, e) => sum + e.grossAmount, 0);
    const totalCommissions = earnings.reduce((sum, e) => sum + e.commissionAmount, 0);
    const netBalance = earnings.reduce((sum, e) => sum + e.netAmount, 0);
    const pendingEarnings = earnings
      .filter(e => e.status === 'pending')
      .reduce((sum, e) => sum + e.netAmount, 0);
    const withdrawnTotal = earnings
      .filter(e => e.status === 'withdrawn')
      .reduce((sum, e) => sum + e.netAmount, 0);

    const balance: MasterBalance = {
      masterId,
      totalEarnings,
      totalCommissions,
      netBalance,
      pendingEarnings,
      withdrawnTotal,
      currency,
      lastUpdated: new Date(),
    };

    this.balances.set(masterId, balance);
  }

  private createEmptyBalance(masterId: string): MasterBalance {
    return {
      masterId,
      totalEarnings: 0,
      totalCommissions: 0,
      netBalance: 0,
      pendingEarnings: 0,
      withdrawnTotal: 0,
      currency: 'UAH',
      lastUpdated: new Date(),
    };
  }

  private saveToStorage(): void {
    try {
      const data = {
        earnings: this.earnings,
        balances: Array.from(this.balances.entries()),
        commissionConfigs: this.commissionConfigs,
        platformRevenues: this.platformRevenues,
      };
      localStorage.setItem('earnings-service-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving earnings to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('earnings-service-data');
      if (data) {
        const parsed = JSON.parse(data);
        this.earnings = parsed.earnings || [];
        this.balances = new Map(parsed.balances || []);
        this.platformRevenues = parsed.platformRevenues || [];
      }
    } catch (error) {
      console.error('Error loading earnings from storage:', error);
    }
  }
}

export const earningsService = EarningsService.getInstance();
