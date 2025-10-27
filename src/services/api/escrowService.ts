import { EscrowPayment, EscrowStatus, IEscrowDataProvider } from '../../types';
import { LocalStorageDataProvider } from '../dataProviders/LocalStorageDataProvider';
// import { ApiProvider } from '../dataProviders/ApiProvider'; // Раскомментируйте для перехода на API

export class EscrowService {
  private static instance: EscrowService;
  private dataProvider: IEscrowDataProvider;

  private readonly PLATFORM_FEE_PERCENT = 5; // 5% комиссия платформы
  private readonly ESCROW_EXPIRY_DAYS = 30; // 30 дней на возврат средств

  // В конструкторе мы выбираем, какой провайдер использовать.
  // По умолчанию — LocalStorage, но можно легко переключиться на ApiProvider.
  private constructor(dataProvider: IEscrowDataProvider) {
    this.dataProvider = dataProvider;
  }

  public static getInstance(): EscrowService {
    if (!EscrowService.instance) {
      // Здесь мы решаем, какой провайдер использовать.
      // Для разработки и тестирования — LocalStorage.
      // Для продакшена — ApiProvider.
      const dataProvider = new LocalStorageDataProvider();
      // const dataProvider = new ApiProvider(); // Для переключения на API

      EscrowService.instance = new EscrowService(dataProvider);
    }
    return EscrowService.instance;
  }

  /**
   * Создает escrow платеж для заказа
   */
  public createEscrowPayment(
    orderId: string,
    clientId: string,
    masterId: string,
    amount: number,
    currency: 'UAH' | 'USD' | 'EUR' = 'UAH',
    paymentMethod: 'card' | 'bank_transfer' | 'crypto' | 'mono' | 'privat24' = 'card'
  ): EscrowPayment {
    const platformFeeAmount = Math.round(amount * (this.PLATFORM_FEE_PERCENT / 100));
    const masterReceiveAmount = amount - platformFeeAmount;

    const payment: EscrowPayment = {
      id: `escrow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      amount,
      currency,
      clientId,
      masterId,
      status: EscrowStatus.AWAITING_CLIENT,
      clientConfirmed: false,
      masterConfirmed: false,
      paymentMethod,
      platformFeePercent: this.PLATFORM_FEE_PERCENT,
      platformFeeAmount,
      masterReceiveAmount,
      createdAt: new Date().toISOString(),
      expiresAt: this.getExpiryDate(),
      description: `Escrow платеж для заказу ${orderId}`,
    };

    this.dataProvider.save(payment);
    console.log(`✅ Escrow платеж создан: ${payment.id}`, payment);

    return payment;
  }

  /**
   * Клиент подтверждает платеж
   */
  public confirmPaymentByClient(escrowId: string): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    if (payment.status !== EscrowStatus.AWAITING_CLIENT) {
      throw new Error(`Невозможно подтвердить платеж. Статус: ${payment.status}`);
    }

    payment.clientConfirmed = true;
    payment.clientConfirmedAt = new Date().toISOString();
    
    if (payment.masterConfirmed) {
      payment.status = EscrowStatus.RELEASED_TO_MASTER;
      payment.releasedAt = new Date().toISOString();
      this.notifyMasterOfRelease(payment);
    } else {
      payment.status = EscrowStatus.AWAITING_MASTER;
      this.notifyMasterOfPayment(payment);
    }

    this.dataProvider.save(payment);
    console.log(`💰 Клиент подтвердил платеж: ${escrowId}`);

    return payment;
  }

  /**
   * Мастер подтверждает выполнение работы
   */
  public confirmWorkByMaster(escrowId: string): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    if (payment.status !== EscrowStatus.AWAITING_CLIENT && payment.status !== EscrowStatus.AWAITING_MASTER) {
      throw new Error(`Невозможно подтвердить работу. Статус: ${payment.status}`);
    }

    payment.masterConfirmed = true;
    payment.masterConfirmedAt = new Date().toISOString();

    if (payment.clientConfirmed) {
      payment.status = EscrowStatus.RELEASED_TO_MASTER;
      payment.releasedAt = new Date().toISOString();
      this.notifyMasterOfRelease(payment);
      this.notifyClientOfCompletion(payment);
    } else {
      payment.status = EscrowStatus.CONFIRMED_BY_MASTER;
    }

    this.dataProvider.save(payment);
    console.log(`✅ Мастер подтвердил работу: ${escrowId}`);

    return payment;
  }

  /**
   * Клиент подтверждает качество работы
   */
  public approveWorkByClient(escrowId: string): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    payment.clientConfirmed = true;
    payment.clientConfirmedAt = new Date().toISOString();
    payment.status = EscrowStatus.RELEASED_TO_MASTER;
    payment.releasedAt = new Date().toISOString();

    this.dataProvider.save(payment);
    this.notifyMasterOfRelease(payment);

    console.log(`✅ Клиент подтвердил качество работы: ${escrowId}`);

    return payment;
  }

  /**
   * Открыть спор
   */
  public openDispute(escrowId: string, reason: string, initiatedBy: 'client' | 'master'): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    payment.status = EscrowStatus.DISPUTED;
    payment.disputeReason = reason;
    payment.notes = `Спор открыт ${initiatedBy === 'client' ? 'клиентом' : 'мастером'}`;

    this.dataProvider.save(payment);
    this.notifyDispute(payment, initiatedBy);

    console.log(`⚠️ Спор открыт для escrow ${escrowId}:`, reason);

    return payment;
  }

  /**
   * Разрешить спор в пользу клиента
   */
  public resolveDisputeInClientFavor(escrowId: string, reason: string): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    if (payment.status !== EscrowStatus.DISPUTED) {
      throw new Error('Можно разрешить только спорный платеж');
    }

    payment.status = EscrowStatus.REFUNDED_TO_CLIENT;
    payment.refundedAt = new Date().toISOString();
    payment.notes = `Спор разрешен в пользу клиента. Причина: ${reason}`;

    this.dataProvider.save(payment);
    this.notifyRefund(payment);

    console.log(`🔄 Платеж возвращен клиенту: ${escrowId}`);

    return payment;
  }

  /**
   * Разрешить спор в пользу мастера
   */
  public resolveDisputeInMasterFavor(escrowId: string, reason: string): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    if (payment.status !== EscrowStatus.DISPUTED) {
      throw new Error('Можно разрешить только спорный платеж');
    }

    payment.status = EscrowStatus.RELEASED_TO_MASTER;
    payment.releasedAt = new Date().toISOString();
    payment.notes = `Спор разрешен в пользу мастера. Причина: ${reason}`;

    this.dataProvider.save(payment);
    this.notifyMasterOfRelease(payment);

    console.log(`✅ Платеж выплачен мастеру: ${escrowId}`);

    return payment;
  }

  /**
   * Отменить escrow
   */
  public cancelEscrow(escrowId: string, reason: string): EscrowPayment {
    const payment = this.dataProvider.getById(escrowId);
    if (!payment) throw new Error('Escrow платеж не найден');

    if (payment.status !== EscrowStatus.AWAITING_CLIENT) {
      throw new Error('Можно отменить только незаплаченный escrow');
    }

    payment.status = EscrowStatus.CANCELLED;
    payment.notes = `Отменено. Причина: ${reason}`;

    this.dataProvider.save(payment);
    console.log(`❌ Escrow отменен: ${escrowId}`);

    return payment;
  }

  /**
   * Получить статус платежа
   */
  public getPaymentStatus(escrowId: string): EscrowPayment | null {
    return this.dataProvider.getById(escrowId);
  }

  /**
   * Получить все платежи пользователя
   */
  public getUserEscrowPayments(userId: string, role: 'client' | 'master'): EscrowPayment[] {
    const allPayments = this.dataProvider.getAll();
    
    if (role === 'client') {
      return allPayments.filter(p => p.clientId === userId);
    } else {
      return allPayments.filter(p => p.masterId === userId);
    }
  }

  /**
   * Получить платежи по заказу
   */
  public getOrderPayments(orderId: string): EscrowPayment[] {
    return this.dataProvider.getByOrderId(orderId);
  }

  /**
   * Автоматический возврат средств при истечении срока
   */
  public processExpiredPayments(): EscrowPayment[] {
    const allPayments = this.dataProvider.getAll();
    const now = new Date();
    const expiredPayments: EscrowPayment[] = [];

    allPayments.forEach(payment => {
      if (payment.status === EscrowStatus.AWAITING_CLIENT && new Date(payment.expiresAt) < now) {
        payment.status = EscrowStatus.REFUNDED_TO_CLIENT;
        payment.refundedAt = now.toISOString();
        payment.notes = 'Автоматический возврат при истечении срока';
        this.dataProvider.save(payment);
        expiredPayments.push(payment);
        console.log(`🔄 Автоматический возврат: ${payment.id}`);
      }
    });

    return expiredPayments;
  }

  private getExpiryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + this.ESCROW_EXPIRY_DAYS);
    return date.toISOString();
  }

  // NOTIFICATIONS (заглушки)
  private notifyClientOfPayment(_payment: EscrowPayment): void {
    console.log(`📧 УВЕДОМЛЕНИЕ КЛИЕНТУ: Мастер получил ваш платеж (${_payment.masterReceiveAmount} грн после комиссии)`);
  }

  private notifyMasterOfPayment(payment: EscrowPayment): void {
    console.log(`📧 УВЕДОМЛЕНИЕ МАСТЕРУ: Клиент перевел ${payment.amount} грн на escrow`);
  }

  private notifyMasterOfRelease(payment: EscrowPayment): void {
    console.log(`📧 УВЕДОМЛЕНИЕ МАСТЕРУ: Платеж ${payment.masterReceiveAmount} грн выплачен на вашу карту`);
  }

  private notifyClientOfCompletion(_payment: EscrowPayment): void {
    console.log(`📧 УВЕДОМЛЕНИЕ КЛИЕНТУ: Мастер завершил работу. Ожидаем вашего подтверждения`);
  }

  private notifyDispute(payment: EscrowPayment, initiatedBy: 'client' | 'master'): void {
    console.log(`📧 СПОР: ${initiatedBy === 'client' ? 'Клиент' : 'Мастер'} открыл спор для платежа ${payment.id}`);
  }

  private notifyRefund(payment: EscrowPayment): void {
    console.log(`📧 ВОЗВРАТ: Деньги возвращены клиенту (${payment.amount} грн)`);
  }
}

export const escrowService = EscrowService.getInstance();
