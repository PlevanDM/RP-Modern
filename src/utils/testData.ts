import { Order } from '../types/models';
import { testUsers } from './testUsers';

// Функция для создания тестовых заказов
export function createTestOrders(): Order[] {
  const now = new Date();
  
  const orders: Order[] = [
    // Заказ 1: Клиент 1 -> Мастер 1 (iPhone ремонт)
    {
      id: 'order-001',
      clientId: testUsers.clients[0].id,
      clientName: testUsers.clients[0].name,
      city: testUsers.clients[0].city,
      title: 'iPhone 13 Pro Max - Ремонт екрану',
      description: 'Екран чіпляється, потрібна заміна дисплея',
      deviceType: 'smartphone',
      brand: 'Apple',
      device: 'iPhone 13 Pro Max',
      issue: 'Ремонт екрану',
      status: 'in_progress',
      assignedMasterId: testUsers.masters[0].id,
      amount: 3500,
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      proposalCount: 2
    },
    // Заказ 2: Клиент 2 -> Мастер 2 (Samsung ремонт)
    {
      id: 'order-002',
      clientId: testUsers.clients[1].id,
      clientName: testUsers.clients[1].name,
      city: testUsers.clients[1].city,
      title: 'Samsung Galaxy S23 Ultra - Заміна батареї',
      description: 'Батарея швидко розряжається',
      deviceType: 'smartphone',
      brand: 'Samsung',
      device: 'Galaxy S23 Ultra',
      issue: 'Заміна батареї',
      status: 'proposed',
      amount: 2500,
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      proposalCount: 1
    },
    // Заказ 3: Клиент 3 -> Мастер 3 (MacBook ремонт)
    {
      id: 'order-003',
      clientId: testUsers.clients[2].id,
      clientName: testUsers.clients[2].name,
      city: testUsers.clients[2].city,
      title: 'MacBook Air M2 - Ремонт клавіатури',
      description: 'Деякі клавіші не працюють',
      deviceType: 'laptop',
      brand: 'Apple',
      device: 'MacBook Air M2',
      issue: 'Ремонт клавіатури',
      status: 'open',
      amount: 4500,
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      proposalCount: 0
    },
    // Заказ 4: Клиент 1 -> Мастер 2 (iPad ремонт)
    {
      id: 'order-004',
      clientId: testUsers.clients[0].id,
      clientName: testUsers.clients[0].name,
      city: testUsers.clients[0].city,
      title: 'iPad Pro 12.9" - Ремонт дисплея',
      description: 'Тріщина на екрані',
      deviceType: 'tablet',
      brand: 'Apple',
      device: 'iPad Pro 12.9"',
      issue: 'Ремонт дисплея',
      status: 'accepted',
      assignedMasterId: testUsers.masters[1].id,
      amount: 5500,
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      proposalCount: 3
    },
    // Заказ 5: Клиент 2 -> Мастер 3 (Ноутбук ремонт)
    {
      id: 'order-005',
      clientId: testUsers.clients[1].id,
      clientName: testUsers.clients[1].name,
      city: testUsers.clients[1].city,
      title: 'Lenovo ThinkPad - Ремонт материнської плати',
      description: 'Не включається',
      deviceType: 'laptop',
      brand: 'Lenovo',
      device: 'ThinkPad X1 Carbon',
      issue: 'Ремонт материнської плати',
      status: 'completed',
      assignedMasterId: testUsers.masters[2].id,
      amount: 3800,
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      proposalCount: 2
    },
    // Заказ 6: Клиент 3 -> Мастер 1 (iPhone ремонт)
    {
      id: 'order-006',
      clientId: testUsers.clients[2].id,
      clientName: testUsers.clients[2].name,
      city: testUsers.clients[2].city,
      title: 'iPhone 12 - Заміна камери',
      description: 'Камера не фокусує',
      deviceType: 'smartphone',
      brand: 'Apple',
      device: 'iPhone 12',
      issue: 'Заміна камери',
      status: 'open',
      amount: 2800,
      createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      proposalCount: 0
    }
  ];

  return orders;
}

// Функция для инициализации тестовых данных
export function initializeTestData() {
  try {
    // Регистрируем пользователей
    registerTestUsers();
    
    // Получаем существующие заказы
    const existingOrders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
    
    // Создаем новые заказы
    const testOrders = createTestOrders();
    
    // Добавляем только новые заказы (проверяем по ID)
    testOrders.forEach(newOrder => {
      const exists = existingOrders.some((o: Order) => o.id === newOrder.id);
      if (!exists) {
        existingOrders.push(newOrder);
      }
    });
    
    localStorage.setItem('repair_master_orders', JSON.stringify(existingOrders));
    console.log('✅ Test data initialized:', existingOrders.length, 'orders');
    
    // Инициализируем чаты
    initializeTestChats();
    
    return existingOrders;
  } catch (error) {
    console.error('❌ Error initializing test data:', error);
    return [];
  }
}

// Импорт для обратной совместимости
import { registerTestUsers } from './testUsers';
import { initializeTestChats } from './testChatData';

