import { User, Order } from '../types/models';

// Тестові користувачі для входу
export const TEST_LOGIN_USERS: Array<{ email: string; password: string; user: Partial<User> }> = [
  {
    email: 'admin@test.com',
    password: 'admin123',
    user: {
      id: 'admin-test',
      name: 'Адмін Тест',
      email: 'admin@test.com',
      role: 'admin',
      city: 'Київ',
      phone: '+380501111111',
      verified: true,
      balance: 0,
    }
  },
  {
    email: 'superadmin@test.com',
    password: 'admin123',
    user: {
      id: 'superadmin-test',
      name: 'Суперадмін Тест',
      email: 'superadmin@test.com',
      role: 'superadmin',
      city: 'Київ',
      phone: '+380501111112',
      verified: true,
      balance: 0,
    }
  },
  {
    email: 'master1@test.com',
    password: 'master123',
    user: {
      id: 'master1-test',
      name: 'Майстер Сервісний',
      email: 'master1@test.com',
      role: 'master',
      city: 'Київ',
      phone: '+380502222221',
      workLocation: 'service',
      repairBrands: ['Samsung', 'Apple'],
      repairTypes: ['Екрани', 'Батареї'],
      workExperience: 5,
      verified: true,
      balance: 15000,
      rating: 4.8,
    }
  },
  {
    email: 'master2@test.com',
    password: 'master123',
    user: {
      id: 'master2-test',
      name: 'Майстер Виїздний',
      email: 'master2@test.com',
      role: 'master',
      city: 'Львів',
      phone: '+380502222222',
      workLocation: 'mobile',
      repairBrands: ['Xiaomi', 'Huawei'],
      repairTypes: ['Зарядка', 'Камера'],
      workExperience: 3,
      verified: true,
      balance: 12000,
      rating: 4.9,
    }
  },
  {
    email: 'master3@test.com',
    password: 'master123',
    user: {
      id: 'master3-test',
      name: 'Майстер Домашній',
      email: 'master3@test.com',
      role: 'master',
      city: 'Харків',
      phone: '+380502222223',
      workLocation: 'home',
      repairBrands: ['Apple', 'Samsung'],
      repairTypes: ['Екрани', 'Корпус'],
      workExperience: 7,
      verified: true,
      balance: 20000,
      rating: 5.0,
    }
  },
  {
    email: 'client1@test.com',
    password: 'client123',
    user: {
      id: 'client1-test',
      name: 'Клієнт iOS',
      email: 'client1@test.com',
      role: 'client',
      city: 'Київ',
      phone: '+380503333331',
      clientMobileOS: 'ios',
      clientComputerOS: 'mac',
      verified: true,
      balance: 5000,
    }
  },
  {
    email: 'client2@test.com',
    password: 'client123',
    user: {
      id: 'client2-test',
      name: 'Клієнт Android',
      email: 'client2@test.com',
      role: 'client',
      city: 'Львів',
      phone: '+380503333332',
      clientMobileOS: 'android',
      clientComputerOS: 'windows',
      verified: true,
      balance: 3000,
    }
  },
  {
    email: 'client3@test.com',
    password: 'client123',
    user: {
      id: 'client3-test',
      name: 'Клієнт Windows',
      email: 'client3@test.com',
      role: 'client',
      city: 'Харків',
      phone: '+380503333333',
      clientMobileOS: 'android',
      clientComputerOS: 'windows',
      verified: true,
      balance: 8000,
    }
  },
  {
    email: 'client4@test.com',
    password: 'client123',
    user: {
      id: 'client4-test',
      name: 'Клієнт Mac',
      email: 'client4@test.com',
      role: 'client',
      city: 'Одеса',
      phone: '+380503333334',
      clientMobileOS: 'ios',
      clientComputerOS: 'mac',
      verified: true,
      balance: 10000,
    }
  },
  {
    email: 'test@test.com',
    password: 'test123',
    user: {
      id: 'test-user',
      name: 'Тестовий Користувач',
      email: 'test@test.com',
      role: 'client',
      city: 'Київ',
      phone: '+380509999999',
      verified: false,
      balance: 0,
    }
  },
];

// Функція для ініціалізації тестових замовлень
export function initializeTestOrders() {
  try {
    // Отримуємо користувачів для правильних ID
    const existingUsers = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
    
    // Створюємо мапу email -> id для швидкого пошуку
    const emailToIdMap = new Map<string, string>();
    existingUsers.forEach((u: User) => {
      if (u.email) {
        emailToIdMap.set(u.email, u.id);
      }
    });

    const getUserId = (email: string): string => {
      return emailToIdMap.get(email) || TEST_LOGIN_USERS.find(u => u.email === email)?.user.id || email.replace('@', '-');
    };

    const client1Id = getUserId('client1@test.com');
    const client2Id = getUserId('client2@test.com');
    const client3Id = getUserId('client3@test.com');
    const client4Id = getUserId('client4@test.com');
    
    const master1Id = getUserId('master1@test.com');
    const master2Id = getUserId('master2@test.com');
    const master3Id = getUserId('master3@test.com');

    const now = new Date();
    const testOrders: Order[] = [
      {
        id: 'test-order-001',
        clientId: client1Id,
        clientName: 'Клієнт iOS',
        city: 'Київ',
        title: 'iPhone 13 Pro Max - Ремонт екрану',
        description: 'Екран чіпляється, потрібна заміна дисплея',
        deviceType: 'smartphone',
        brand: 'Apple',
        device: 'iPhone 13 Pro Max',
        issue: 'Ремонт екрану',
        status: 'in_progress',
        assignedMasterId: master1Id,
        amount: 3500,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        proposalCount: 2
      },
      {
        id: 'test-order-002',
        clientId: client2Id,
        clientName: 'Клієнт Android',
        city: 'Львів',
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
      {
        id: 'test-order-003',
        clientId: client3Id,
        clientName: 'Клієнт Windows',
        city: 'Харків',
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
      {
        id: 'test-order-004',
        clientId: client1Id,
        clientName: 'Клієнт iOS',
        city: 'Київ',
        title: 'iPad Pro 12.9" - Ремонт дисплея',
        description: 'Тріщина на екрані',
        deviceType: 'tablet',
        brand: 'Apple',
        device: 'iPad Pro 12.9"',
        issue: 'Ремонт дисплея',
        status: 'accepted',
        assignedMasterId: master2Id,
        amount: 5500,
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        proposalCount: 3
      },
      {
        id: 'test-order-005',
        clientId: client2Id,
        clientName: 'Клієнт Android',
        city: 'Львів',
        title: 'Lenovo ThinkPad - Ремонт материнської плати',
        description: 'Не включається',
        deviceType: 'laptop',
        brand: 'Lenovo',
        device: 'ThinkPad X1 Carbon',
        issue: 'Ремонт материнської плати',
        status: 'completed',
        assignedMasterId: master3Id,
        amount: 3800,
        createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        proposalCount: 2
      },
      {
        id: 'test-order-006',
        clientId: client3Id,
        clientName: 'Клієнт Windows',
        city: 'Харків',
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
      },
      {
        id: 'test-order-007',
        clientId: client4Id,
        clientName: 'Клієнт Mac',
        city: 'Одеса',
        title: 'MacBook Pro 16" - Ремонт дисплея',
        description: 'Тріщини на екрані після падіння',
        deviceType: 'laptop',
        brand: 'Apple',
        device: 'MacBook Pro 16"',
        issue: 'Ремонт дисплея',
        status: 'open',
        amount: 8000,
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        proposalCount: 0
      }
    ];

    // Отримуємо існуючі замовлення
    const existingOrders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
    const existingOrderIds = new Set(existingOrders.map((o: Order) => o.id));

    // Додаємо тільки нові замовлення
    testOrders.forEach(newOrder => {
      if (!existingOrderIds.has(newOrder.id)) {
        existingOrders.push(newOrder);
      }
    });

    localStorage.setItem('repair_master_orders', JSON.stringify(existingOrders));
    console.log('✅ Test orders initialized:', existingOrders.length, 'orders total');
    return existingOrders;
  } catch (error) {
    console.error('❌ Error initializing test orders:', error);
    return [];
  }
}

// Функція для ініціалізації тестових користувачів в localStorage та на бекенді
export async function initializeTestUsers() {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
    const existingEmails = new Set(existingUsers.map((u: User) => u.email));

    // Імпортуємо динамічно, щоб уникнути циклічних залежностей
    const { getApiUrl } = await import('../services/apiUrlHelper');
    const axios = (await import('axios')).default;

    // Паролі для тестових користувачів
    const passwords: Record<string, string> = {
      'admin@test.com': 'admin123',
      'superadmin@test.com': 'admin123',
      'master1@test.com': 'master123',
      'master2@test.com': 'master123',
      'master3@test.com': 'master123',
      'client1@test.com': 'client123',
      'client2@test.com': 'client123',
      'client3@test.com': 'client123',
      'client4@test.com': 'client123',
      'test@test.com': 'test123',
    };

    for (const { email, password, user } of TEST_LOGIN_USERS) {
      if (!existingEmails.has(user.email!)) {
        const fullUser: User = {
          ...user,
          password: password || passwords[email] || 'password123',
          avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
          skills: [],
          specialization: user.role === 'master' ? 'Master' : 'Client',
          blocked: false,
          completedOrders: 0,
          rating: user.rating || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User;
        existingUsers.push(fullUser);
        existingEmails.add(user.email!);

        // Реєструємо користувача на бекенді
        try {
          const registerData = {
            email: fullUser.email,
            password: fullUser.password,
            name: fullUser.name,
            role: fullUser.role,
            city: fullUser.city || 'Київ',
            phone: fullUser.phone || '+380501111111',
            ...(fullUser.role === 'master' && {
              workLocation: fullUser.workLocation || 'service',
              repairBrands: fullUser.repairBrands || ['Apple', 'Samsung'],
              repairTypes: fullUser.repairTypes || ['Екрани', 'Батареї'],
              workExperience: fullUser.workExperience || 3,
            })
          };

          await axios.post(`${getApiUrl()}/auth/register`, registerData, {
            headers: { 'Content-Type': 'application/json' }
          });
          console.log(`✅ Registered ${email} on backend`);
        } catch (error: unknown) {
          // Якщо користувач вже існує, це нормально
          const errorObj = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
          if (errorObj.response?.status !== 409) {
            console.warn(`⚠️ Failed to register ${email} on backend:`, errorObj.response?.data?.message || errorObj.message);
          }
        }
      }
    }

    localStorage.setItem('repair_master_users', JSON.stringify(existingUsers));
    console.log('✅ Test users initialized:', existingUsers.length);
    
    // Ініціалізуємо тестові замовлення
    initializeTestOrders();
    
    return existingUsers;
  } catch (error) {
    console.error('❌ Error initializing test users:', error);
    return [];
  }
}

