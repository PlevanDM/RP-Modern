import { messagesService } from './messagesService';
import { earningsService } from './earningsService';
import { complianceService } from './complianceService';
import { Order, User, MasterEarning } from '../types';

/**
 * 🔗 ІНТЕГРАЦІЙНИЙ СЕРВІС
 * Координує роботу всіх сервісів системи
 * Забезпечує повний цикл: замовлення → робота → платіж → заробіток
 */

class IntegrationService {
  private static instance: IntegrationService;

  private constructor() {}

  public static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  /**
   * ✅ КРОК 1: Клієнт створює замовлення
   * Перевіряє все необхідне і створює контекст для спілкування
   */
  public initiateOrder(order: Order, client: User, master: User, amount: number): {
    chatId: string;
    earningId: string;
    status: 'success' | 'error';
    message: string;
  } {
    try {
      // 1. Перевіряємо згоди клієнта
      if (!complianceService.hasAllAgreements(client.id)) {
        return {
          status: 'error',
          message: 'Клієнт повинен прийняти всі необхідні угоди',
          chatId: '',
          earningId: '',
        };
      }

      // 2. Перевіряємо верифікацію
      const verificationStatus = complianceService.getUserVerificationStatus(client.id);
      if (verificationStatus.email !== 'verified') {
        return {
          status: 'error',
          message: 'Клієнт повинен верифікувати email',
          chatId: '',
          earningId: '',
        };
      }

      // 3. Перевіряємо риск мошенничества
      const snapshot = complianceService.getComplianceSnapshot(client.id);
      if (snapshot.riskLevel === 'critical') {
        return {
          status: 'error',
          message: 'Аккаунт заблокований через високий ризик',
          chatId: '',
          earningId: '',
        };
      }

      // 4. Логуємо дія
      complianceService.logUserActivity(
        client.id,
        'create_order',
        { orderId: order.id, amount, masterId: master.id },
        this.getClientIP(),
        this.getUserAgent()
      );

      // 5. Створюємо чат для обговорення
      const chat = messagesService.getOrCreateChat(
        [client.id, master.id],
        [client.fullName || 'Клієнт', master.fullName || 'Мастер'],
        order.id
      );

      // 6. Надсилаємо системне повідомлення
      messagesService.sendMessage(
        chat.id,
        'system',
        'Система',
        '',
        '',
        `📋 Замовлення створено. Сума: ${amount}₴\n\nПереведіть кошти в захищеному режимі. Всі кошти зберігаються в системі до завершення роботи.`,
        'system'
      );

      // 7. Створюємо запис про заробіток в статусі PENDING
      const earning = earningsService.createEarning(
        master.id,
        order.id,
        'labor_income',
        amount,
        `Замовлення від ${client.fullName}`,
        'UAH'
      );

      // 8. Логуємо дія мастера
      complianceService.logUserActivity(
        master.id,
        'order_assigned',
        { orderId: order.id, clientId: client.id, amount },
        this.getClientIP(),
        this.getUserAgent()
      );

      return {
        status: 'success',
        message: 'Замовлення успішно створено',
        chatId: chat.id,
        earningId: earning.id,
      };
    } catch (error) {
      console.error('Error initiating order:', error);
      return {
        status: 'error',
        message: 'Помилка при створенні замовлення',
        chatId: '',
        earningId: '',
      };
    }
  }

  /**
   * ✅ КРОК 2: Мастер виконує роботу
   * Може надсилати пропозиції, завантажувати файли, отримувати підтвердження
   */
  public sendProposalFromMaster(
    chatId: string,
    master: User,
    client: User,
    proposalData: {
      price: number;
      currency: string;
      description: string;
      deadline: string;
    }
  ): boolean {
    try {
      // Логуємо пропозицію
      complianceService.logUserActivity(
        master.id,
        'send_proposal',
        proposalData,
        this.getClientIP(),
        this.getUserAgent()
      );

      // Надсилаємо пропозицію як спеціальне повідомлення
      messagesService.sendMessage(
        chatId,
        master.id,
        master.fullName || 'Мастер',
        master.avatar || '',
        client.id,
        JSON.stringify(proposalData),
        'proposal',
        undefined,
        undefined,
        proposalData
      );

      return true;
    } catch (error) {
      console.error('Error sending proposal:', error);
      return false;
    }
  }

  /**
   * ✅ КРОК 3: Клієнт перевіряє якість роботи
   * Використовує інструменти перевірки та завантажує доказательства
   */
  public completeOrderAndProcessPayment(
    order: Order,
    client: User,
    master: User,
    finalAmount: number,
    qualityApproved: boolean
  ): {
    status: 'success' | 'error';
    message: string;
    earningUpdated: boolean;
  } {
    try {
      if (!qualityApproved) {
        return {
          status: 'error',
          message: 'Замовлення не завершено. Якість не перевірена.',
          earningUpdated: false,
        };
      }

      // 1. Логуємо завершення замовлення
      complianceService.logUserActivity(
        client.id,
        'complete_order',
        { orderId: order.id, masterId: master.id, amount: finalAmount },
        this.getClientIP(),
        this.getUserAgent()
      );

      // 2. Підтверджуємо заробіток мастера
      const masterEarnings = earningsService.getMasterEarnings(master.id);
      const orderEarning = masterEarnings.find((e) => e.orderId === order.id);

      if (orderEarning) {
        earningsService.confirmEarning(orderEarning.id);

        // 3. Логуємо підтвердження заробітку
        complianceService.logUserActivity(
          'system',
          'earning_confirmed',
          { earningId: orderEarning.id, masterId: master.id, amount: finalAmount },
          this.getClientIP(),
          this.getUserAgent()
        );
      }

      return {
        status: 'success',
        message: 'Замовлення завершено. Платіж обробляється.',
        earningUpdated: true,
      };
    } catch (error) {
      console.error('Error completing order:', error);
      return {
        status: 'error',
        message: 'Помилка при завершенні замовлення',
        earningUpdated: false,
      };
    }
  }

  /**
   * ✅ КРОК 4: Мастер виводить заробітки
   */
  public withdrawMasterEarnings(
    master: User,
    amount: number
  ): {
    status: 'success' | 'error';
    message: string;
    withdrawalId?: string;
  } {
    try {
      // 1. Перевіряємо верифікацію банківського рахунку
      const verificationStatus = complianceService.getUserVerificationStatus(master.id);
      if (verificationStatus.bank_account !== 'verified') {
        return {
          status: 'error',
          message: 'Потрібна верифікація банківського рахунку для виводу коштів',
        };
      }

      // 2. Перевіряємо залишок
      const balance = earningsService.getMasterBalance(master.id);
      if (balance.pending < amount) {
        return {
          status: 'error',
          message: `Недостатньо коштів. Доступно: ${balance.pending}₴`,
        };
      }

      // 3. Логуємо вихід коштів
      complianceService.logUserActivity(
        master.id,
        'withdraw_earnings',
        { amount, date: new Date() },
        this.getClientIP(),
        this.getUserAgent()
      );

      return {
        status: 'success',
        message: `Вивід ${amount}₴ успішно запрошено`,
        withdrawalId: `WD-${Date.now()}`,
      };
    } catch (error) {
      console.error('Error withdrawing earnings:', error);
      return {
        status: 'error',
        message: 'Помилка при виводі коштів',
      };
    }
  }

  /**
   * ✅ КРОК 5: Спір - один з учасників незадоволений
   */
  public createDisputeIfNeeded(
    order: Order,
    initiator: User,
    otherParty: User,
    reason: 'poor_quality' | 'non_payment' | 'miscommunication' | 'other',
    description: string,
    amount: number
  ): {
    status: 'success' | 'error';
    message: string;
    disputeId?: string;
  } {
    try {
      const disputeId = complianceService.createDispute(
        order.id,
        order.status === 'completed' ? initiator.id : initiator.id, // Клієнт
        order.status === 'completed' ? otherParty.id : otherParty.id, // Мастер
        initiator.id,
        `Спір щодо замовлення ${order.id}`,
        description,
        reason,
        amount
      );

      // Логуємо спір
      complianceService.logUserActivity(
        initiator.id,
        'create_dispute',
        {
          disputeId: disputeId.id,
          reason,
          amount,
          against: otherParty.id,
        },
        this.getClientIP(),
        this.getUserAgent()
      );

      // Надсилаємо повідомлення про спір в чат
      const chat = messagesService.getOrCreateChat(
        [initiator.id, otherParty.id],
        [initiator.fullName || 'User1', otherParty.fullName || 'User2'],
        order.id
      );

      messagesService.sendMessage(
        chat.id,
        'system',
        'Система',
        '',
        '',
        `⚠️ СПІР: ${initiator.fullName} розпочав спір.\n\nПричина: ${reason}\n\nОпис: ${description}\n\nВідведено сума в еськроу. Модератор буде розглядати справу.`,
        'system'
      );

      return {
        status: 'success',
        message: 'Спір успішно створено. Модератор буде розглядати справу.',
        disputeId: disputeId.id,
      };
    } catch (error) {
      console.error('Error creating dispute:', error);
      return {
        status: 'error',
        message: 'Помилка при створенні спору',
      };
    }
  }

  /**
   * 📊 Отримати всю інформацію про замовлення
   */
  public getOrderContext(
    orderId: string,
    userId: string
  ): {
    chats: any[];
    earnings: MasterEarning[];
    activities: any[];
    complianceScore: number;
  } {
    try {
      const userChats = messagesService.getUserChats(userId);
      const orderChats = userChats.filter((chat) => chat.orderId === orderId);

      return {
        chats: orderChats,
        earnings: earningsService.getMasterEarnings(userId),
        activities: complianceService.logUserActivity(
          userId,
          'get_activities',
          {},
          this.getClientIP(),
          this.getUserAgent()
        ) as any[],
        complianceScore: complianceService.getComplianceSnapshot(userId).complianceScore,
      };
    } catch (error) {
      console.error('Error getting order context:', error);
      return {
        chats: [],
        earnings: [],
        activities: [],
        complianceScore: 0,
      };
    }
  }

  /**
   * 🔐 Приватні методи
   */
  private getClientIP(): string {
    return typeof window !== 'undefined'
      ? (window as any).clientIP || '192.168.1.1'
      : '0.0.0.0';
  }

  private getUserAgent(): string {
    return typeof navigator !== 'undefined'
      ? navigator.userAgent
      : 'Unknown';
  }
}

export const integrationService = IntegrationService.getInstance();
