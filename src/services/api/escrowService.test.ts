import { EscrowService } from './escrowService';
import { EscrowStatus, IEscrowDataProvider, EscrowTransaction } from '../../types';
import { mock, MockProxy } from 'jest-mock-extended';

describe('EscrowService', () => {
  let escrowService: EscrowService;
  let mockDataProvider: MockProxy<IEscrowDataProvider>;

  beforeEach(() => {
    // Создаем мок-провайдер данных перед каждым тестом
    mockDataProvider = mock<IEscrowDataProvider>();

    // "Внедряем" мок-провайдер в наш сервис
    // @ts-expect-error - получаем доступ к приватному конструктору для тестов
    escrowService = new EscrowService(mockDataProvider);
  });

  // Тест 1: Успешное создание Escrow платежа
  it('должен успешно создавать escrow платеж', () => {
    const payment = escrowService.createEscrowPayment(
      'order-123',
      'client-1',
      'master-1',
      1000
    );

    expect(payment.amount).toBe(1000);
    expect(payment.status).toBe(EscrowStatus.AWAITING_CLIENT);
    expect(payment.platformFeeAmount).toBe(50); // 5% от 1000
    expect(payment.masterReceiveAmount).toBe(950);

    // Проверяем, что метод save был вызван с правильными данными
    expect(mockDataProvider.save).toHaveBeenCalledWith(payment);
  });

  // Тест 2: Клиент подтверждает платеж
  it('должен изменять статус на AWAITING_MASTER, когда клиент подтверждает платеж', () => {
    const payment: Partial<EscrowTransaction> = {
      id: 'escrow-1',
      status: EscrowStatus.AWAITING_CLIENT,
    };

    mockDataProvider.getById.calledWith('escrow-1').mockReturnValue(payment as EscrowTransaction);

    const updatedPayment = escrowService.confirmPaymentByClient('escrow-1');

    expect(updatedPayment.status).toBe(EscrowStatus.AWAITING_MASTER);
    expect(updatedPayment.clientConfirmed).toBe(true);
    expect(mockDataProvider.save).toHaveBeenCalledWith(updatedPayment);
  });

  // Тест 3: Мастер подтверждает работу
  it('должен изменять статус на CONFIRMED_BY_MASTER, когда мастер подтверждает работу (клиент еще не платил)', () => {
    const payment: Partial<EscrowTransaction> = {
      id: 'escrow-1',
      status: EscrowStatus.AWAITING_CLIENT,
      clientConfirmed: false,
    };

    mockDataProvider.getById.calledWith('escrow-1').mockReturnValue(payment as EscrowTransaction);

    const updatedPayment = escrowService.confirmWorkByMaster('escrow-1');

    expect(updatedPayment.status).toBe(EscrowStatus.CONFIRMED_BY_MASTER);
    expect(updatedPayment.masterConfirmed).toBe(true);
    expect(mockDataProvider.save).toHaveBeenCalledWith(updatedPayment);
  });

  // Тест 4: Успешное завершение (выплата мастеру)
  it('должен изменять статус на RELEASED_TO_MASTER, когда обе стороны подтвердили', () => {
    const payment: Partial<EscrowTransaction> = {
      id: 'escrow-1',
      status: EscrowStatus.AWAITING_MASTER,
      clientConfirmed: true, // Клиент уже заплатил
    };

    mockDataProvider.getById.calledWith('escrow-1').mockReturnValue(payment as EscrowTransaction);

    const updatedPayment = escrowService.confirmWorkByMaster('escrow-1');

    expect(updatedPayment.status).toBe(EscrowStatus.RELEASED_TO_MASTER);
    expect(updatedPayment.masterConfirmed).toBe(true);
    expect(mockDataProvider.save).toHaveBeenCalledWith(updatedPayment);
  });

  // Тест 5: Открытие спора
  it('должен изменять статус на DISPUTED при открытии спора', () => {
    const payment: Partial<EscrowTransaction> = {
      id: 'escrow-1',
      status: EscrowStatus.AWAITING_MASTER,
    };

    mockDataProvider.getById.calledWith('escrow-1').mockReturnValue(payment as EscrowTransaction);

    const updatedPayment = escrowService.openDispute('escrow-1', 'Некачественная работа', 'client');

    expect(updatedPayment.status).toBe(EscrowStatus.DISPUTED);
    expect(updatedPayment.disputeReason).toBe('Некачественная работа');
    expect(mockDataProvider.save).toHaveBeenCalledWith(updatedPayment);
  });

  // Тест 6: Разрешение спора в пользу клиента
  it('должен изменять статус на REFUNDED_TO_CLIENT при разрешении спора в пользу клиента', () => {
      const payment: Partial<EscrowTransaction> = {
          id: 'escrow-1',
          status: EscrowStatus.DISPUTED,
      };

      mockDataProvider.getById.calledWith('escrow-1').mockReturnValue(payment as EscrowTransaction);

      const updatedPayment = escrowService.resolveDisputeInClientFavor('escrow-1', 'Работа не выполнена');

      expect(updatedPayment.status).toBe(EscrowStatus.REFUNDED_TO_CLIENT);
      expect(mockDataProvider.save).toHaveBeenCalledWith(updatedPayment);
  });

  // Тест 7: Выбрасывание ошибки при попытке подтвердить платеж в неверном статусе
  it('должен выбрасывать ошибку при попытке подтвердить платеж в неверном статусе', () => {
    const payment: Partial<EscrowTransaction> = {
      id: 'escrow-1',
      status: EscrowStatus.AWAITING_MASTER, // Неверный статус
    };

    mockDataProvider.getById.calledWith('escrow-1').mockReturnValue(payment as EscrowTransaction);

    expect(() => {
      escrowService.confirmPaymentByClient('escrow-1');
    }).toThrow('Невозможно подтвердить платеж. Статус: awaiting_master');
  });
});
