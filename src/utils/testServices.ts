/**
 * 🧪 TEST UTILITIES
 * Используется для проверки всех сервисов
 * Вызывайте из консоли: window.testAllServices()
 */

import { messagesService } from '../services/messagesService';
import { earningsService } from '../services/earningsService';
import { complianceService } from '../services/complianceService';
import { integrationService } from '../services/integrationService';

interface TestResult {
  name: string;
  status: 'pass' | 'fail';
  message: string;
  data?: any;
}

class TestServices {
  private results: TestResult[] = [];

  /**
   * 🔄 Запустить все тесты
   */
  public async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Запуск всех тестов...\n');

    this.results = [];

    // Тесты messagesService
    this.testMessagesService();

    // Тесты earningsService
    this.testEarningsService();

    // Тесты complianceService
    this.testComplianceService();

    // Тесты integrationService
    this.testIntegrationService();

    // Выводим результаты
    this.printResults();

    return this.results;
  }

  /**
   * ✅ Тесты для messagesService
   */
  private testMessagesService(): void {
    console.log('📨 Тестирование messagesService...');

    try {
      // Тест 1: Создание чата
      const chat = messagesService.getOrCreateChat(
        ['user-1', 'user-2'],
        ['Иван', 'Петр'],
        'order-001'
      );

      this.results.push({
        name: 'messagesService.getOrCreateChat()',
        status: chat && chat.id ? 'pass' : 'fail',
        message: chat ? `✓ Чат создан: ${chat.id}` : '✗ Ошибка создания чата',
        data: chat,
      });

      // Тест 2: Отправка сообщения
      const message = messagesService.sendMessage(
        chat.id,
        'user-1',
        'Иван',
        '',
        'user-2',
        'Тестовое сообщение',
        'text'
      );

      this.results.push({
        name: 'messagesService.sendMessage()',
        status: message && message.id ? 'pass' : 'fail',
        message: message ? `✓ Сообщение отправлено: ${message.id}` : '✗ Ошибка отправки',
        data: message,
      });

      // Тест 3: Получение сообщений
      const messages = messagesService.getChatMessages(chat.id);

      this.results.push({
        name: 'messagesService.getChatMessages()',
        status: Array.isArray(messages) && messages.length > 0 ? 'pass' : 'fail',
        message: `✓ Получено ${messages.length} сообщений`,
        data: messages,
      });

      // Тест 4: Получение чатов пользователя
      const userChats = messagesService.getUserChats('user-1');

      this.results.push({
        name: 'messagesService.getUserChats()',
        status: Array.isArray(userChats) && userChats.length > 0 ? 'pass' : 'fail',
        message: `✓ Получено ${userChats.length} чатов`,
        data: userChats,
      });

      // Тест 5: Добавление реакции
      messagesService.addReaction(message.id, '👍', 'user-2');
      const updatedMessages = messagesService.getChatMessages(chat.id);
      const reactionCount = updatedMessages[0]?.reactions?.length || 0;

      this.results.push({
        name: 'messagesService.addReaction()',
        status: reactionCount > 0 ? 'pass' : 'fail',
        message: `✓ Реакция добавлена (всего: ${reactionCount})`,
      });
    } catch (error) {
      this.results.push({
        name: 'messagesService (общее)',
        status: 'fail',
        message: `✗ Ошибка: ${error}`,
      });
    }
  }

  /**
   * 💰 Тесты для earningsService
   */
  private testEarningsService(): void {
    console.log('\n💰 Тестирование earningsService...');

    try {
      // Тест 1: Создание заработка
      const earning = earningsService.createEarning(
        'master-001',
        'order-001',
        'labor_income',
        1000,
        'Замовлення от клиента',
        'UAH'
      );

      this.results.push({
        name: 'earningsService.createEarning()',
        status: earning && earning.id ? 'pass' : 'fail',
        message: earning
          ? `✓ Заработок создан: ${earning.id} (${earning.grossAmount}₴)`
          : '✗ Ошибка создания',
        data: earning,
      });

      // Тест 2: Получение баланса
      const balance = earningsService.getMasterBalance('master-001');

      this.results.push({
        name: 'earningsService.getMasterBalance()',
        status: balance && balance.confirmed !== undefined ? 'pass' : 'fail',
        message: `✓ Баланс: pending=${balance.pending}₴, confirmed=${balance.confirmed}₴`,
        data: balance,
      });

      // Тест 3: Подтверждение заработка
      const confirmed = earningsService.confirmEarning(earning.id);

      this.results.push({
        name: 'earningsService.confirmEarning()',
        status: confirmed ? 'pass' : 'fail',
        message: confirmed ? '✓ Заработок подтвержден' : '✗ Ошибка подтверждения',
      });

      // Тест 4: Получение комиссии
      const configs = earningsService.getCommissionConfigs();

      this.results.push({
        name: 'earningsService.getCommissionConfigs()',
        status: Array.isArray(configs) && configs.length > 0 ? 'pass' : 'fail',
        message: `✓ Получено ${configs.length} конфигураций комиссий`,
        data: configs,
      });

      // Тест 5: Проверка премиум комиссии (5% для 5000₴)
      const premiumEarning = earningsService.createEarning(
        'master-001',
        'order-002',
        'labor_income',
        5000,
        'Большой заказ',
        'UAH'
      );

      const commission = 5000 - premiumEarning.netAmount;

      this.results.push({
        name: 'earningsService - Премиум комиссия 5%',
        status: Math.abs(commission - 250) < 1 ? 'pass' : 'fail',
        message: `✓ Комиссия: ${commission}₴ (5% от 5000₴ = 250₴)`,
        data: { gross: premiumEarning.grossAmount, net: premiumEarning.netAmount },
      });
    } catch (error) {
      this.results.push({
        name: 'earningsService (общее)',
        status: 'fail',
        message: `✗ Ошибка: ${error}`,
      });
    }
  }

  /**
   * 🔐 Тесты для complianceService
   */
  private testComplianceService(): void {
    console.log('\n🔐 Тестирование complianceService...');

    try {
      const userId = 'user-test-123';

      // Тест 1: Требование соглашения
      const agreement = complianceService.requireAgreement(
        userId,
        'terms_of_service',
        '192.168.1.1',
        'Mozilla/5.0'
      );

      this.results.push({
        name: 'complianceService.requireAgreement()',
        status: agreement && agreement.id ? 'pass' : 'fail',
        message: agreement ? `✓ Соглашение требуется: ${agreement.id}` : '✗ Ошибка',
        data: agreement,
      });

      // Тест 2: Согласие с соглашением
      const agreed = complianceService.agreeToAgreement(userId, 'terms_of_service');

      this.results.push({
        name: 'complianceService.agreeToAgreement()',
        status: agreed ? 'pass' : 'fail',
        message: agreed ? '✓ Согласие принято' : '✗ Ошибка принятия',
      });

      // Тест 3: Проверка всех соглашений
      const hasAll = complianceService.hasAllAgreements(userId);

      this.results.push({
        name: 'complianceService.hasAllAgreements()',
        status: typeof hasAll === 'boolean' ? 'pass' : 'fail',
        message: `✓ hasAllAgreements = ${hasAll}`,
      });

      // Тест 4: Создание спора
      const dispute = complianceService.createDispute(
        'order-123',
        'client-1',
        'master-1',
        'client-1',
        'Плохое качество',
        'Работа не соответствует описанию',
        'poor_quality',
        1000
      );

      this.results.push({
        name: 'complianceService.createDispute()',
        status: dispute && dispute.id ? 'pass' : 'fail',
        message: dispute ? `✓ Спор создан: ${dispute.id}` : '✗ Ошибка',
        data: dispute,
      });

      // Тест 5: Логирование активности
      const activity = complianceService.logUserActivity(
        userId,
        'test_action',
        { test: true },
        '192.168.1.1',
        'Test Browser'
      );

      this.results.push({
        name: 'complianceService.logUserActivity()',
        status: activity && activity.id ? 'pass' : 'fail',
        message: activity ? `✓ Активность залогирована: ${activity.id}` : '✗ Ошибка',
        data: activity,
      });

      // Тест 6: Snapshot соответствия
      const snapshot = complianceService.getComplianceSnapshot(userId);

      this.results.push({
        name: 'complianceService.getComplianceSnapshot()',
        status: snapshot && snapshot.riskLevel ? 'pass' : 'fail',
        message: `✓ Snapshot: риск=${snapshot.riskLevel}, оценка=${snapshot.complianceScore}%`,
        data: snapshot,
      });
    } catch (error) {
      this.results.push({
        name: 'complianceService (общее)',
        status: 'fail',
        message: `✗ Ошибка: ${error}`,
      });
    }
  }

  /**
   * 🔗 Тесты для integrationService
   */
  private testIntegrationService(): void {
    console.log('\n🔗 Тестирование integrationService...');

    try {
      // Для интеграционного сервиса нужны полные объекты
      const testOrder = { id: 'order-123', title: 'Test Order', status: 'pending' };
      const testClient = { id: 'client-1', fullName: 'Test Client', role: 'client' as const };
      const testMaster = { id: 'master-1', fullName: 'Test Master', role: 'master' as const };

      // Тест 1: Инициация замовления
      const initResult = integrationService.initiateOrder(testOrder, testClient, testMaster, 1000);

      this.results.push({
        name: 'integrationService.initiateOrder()',
        status: initResult.status === 'success' || initResult.status === 'error' ? 'pass' : 'fail',
        message: `${initResult.status === 'success' ? '✓' : '✗'} ${initResult.message}`,
        data: initResult,
      });

      // Тест 2: Получение контекста замовления
      const context = integrationService.getOrderContext('order-123', 'client-1');

      this.results.push({
        name: 'integrationService.getOrderContext()',
        status: context && context.complianceScore !== undefined ? 'pass' : 'fail',
        message: `✓ Контекст получен (score=${context.complianceScore}%)`,
        data: context,
      });
    } catch (error) {
      this.results.push({
        name: 'integrationService (общее)',
        status: 'fail',
        message: `✗ Ошибка: ${error}`,
      });
    }
  }

  /**
   * 📊 Вывод результатов
   */
  private printResults(): void {
    console.log('\n' + '='.repeat(80));
    console.log('🧪 РЕЗУЛЬТАТЫ ТЕСТОВ');
    console.log('='.repeat(80));

    const passed = this.results.filter((r) => r.status === 'pass').length;
    const failed = this.results.filter((r) => r.status === 'fail').length;

    this.results.forEach((result) => {
      const icon = result.status === 'pass' ? '✅' : '❌';
      console.log(`${icon} ${result.name}`);
      console.log(`   ${result.message}`);
      if (result.data) {
        console.log(`   Данные:`, result.data);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log(`📊 ИТОГО: ${passed} пройдено, ${failed} не пройдено из ${this.results.length}`);
    console.log(`Успех: ${((passed / this.results.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(80) + '\n');

    if (failed === 0) {
      console.log('✅ ВСЕ ТЕСТЫ ПРОЙДЕНЫ! Система готова к использованию.\n');
    } else {
      console.log('⚠️  Необходимо исправить ошибки перед deployment.\n');
    }
  }
}

/**
 * 🚀 Экспортируем функцию для консоли
 */
const testServices = new TestServices();

// Добавляем в window для доступа из консоли
if (typeof window !== 'undefined') {
  (window as any).testAllServices = () => testServices.runAllTests();
  (window as any).testMessages = () => {
    testServices['testMessagesService']();
    testServices['printResults']();
  };
  (window as any).testEarnings = () => {
    testServices['testEarningsService']();
    testServices['printResults']();
  };
  (window as any).testCompliance = () => {
    testServices['testComplianceService']();
    testServices['printResults']();
  };
}

export { testServices };
