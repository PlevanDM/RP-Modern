import { User } from '../types/models';

export const testUsers = {
  clients: [
    {
      id: 'client-001',
      name: 'Олександр Мельниченко',
      email: 'alex.client@test.com',
      role: 'client' as const,
      city: 'Київ',
      phone: '+380501234001',
      avatar: 'https://i.pravatar.cc/96?img=68',
      balance: 0,
      skills: [],
      specialization: 'Client',
      verified: false,
      blocked: false,
      completedOrders: 0,
      rating: 0,
      clientMobileOS: 'ios',
      clientComputerOS: 'mac'
    },
    {
      id: 'client-002',
      name: 'Марія Петренко',
      email: 'maria.client@test.com',
      role: 'client' as const,
      city: 'Львів',
      phone: '+380501234002',
      avatar: 'https://i.pravatar.cc/96?img=47',
      balance: 0,
      skills: [],
      specialization: 'Client',
      verified: false,
      blocked: false,
      completedOrders: 0,
      rating: 0,
      clientMobileOS: 'android',
      clientComputerOS: 'windows'
    },
    {
      id: 'client-003',
      name: 'Ігор Ковальов',
      email: 'igor.client@test.com',
      role: 'client' as const,
      city: 'Харків',
      phone: '+380501234003',
      avatar: 'https://i.pravatar.cc/96?img=51',
      balance: 0,
      skills: [],
      specialization: 'Client',
      verified: false,
      blocked: false,
      completedOrders: 0,
      rating: 0,
      clientMobileOS: 'android',
      clientComputerOS: 'linux'
    }
  ],
  masters: [
    {
      id: 'master-001',
      name: 'Олексій Майстров',
      email: 'alex.master@test.com',
      role: 'master' as const,
      city: 'Київ',
      phone: '+380501234004',
      avatar: 'https://i.pravatar.cc/96?img=33',
      balance: 5000,
      skills: ['apple', 'screens', 'batteries'],
      specialization: 'Ремонт iPhone та iPad',
      verified: true,
      blocked: false,
      completedOrders: 15,
      rating: 4.8,
      clientMobileOS: undefined,
      clientComputerOS: undefined
    },
    {
      id: 'master-002',
      name: 'Сергій Павленко',
      email: 'sergey.master@test.com',
      role: 'master' as const,
      city: 'Львів',
      phone: '+380501234005',
      avatar: 'https://i.pravatar.cc/96?img=28',
      balance: 4500,
      skills: ['samsung', 'xiaomi', 'hardware'],
      specialization: 'Ремонт Android пристроїв',
      verified: true,
      blocked: false,
      completedOrders: 12,
      rating: 4.9,
      clientMobileOS: undefined,
      clientComputerOS: undefined
    },
    {
      id: 'master-003',
      name: 'Анна Коваленко',
      email: 'anna.master@test.com',
      role: 'master' as const,
      city: 'Харків',
      phone: '+380501234006',
      avatar: 'https://i.pravatar.cc/96?img=45',
      balance: 6000,
      skills: ['laptops', 'screens', 'motherboard'],
      specialization: 'Ремонт ноутбуків і комп\'ютерів',
      verified: true,
      blocked: false,
      completedOrders: 20,
      rating: 5.0,
      clientMobileOS: undefined,
      clientComputerOS: undefined
    }
  ]
};

// Обратная совместимость
export const testUsers_legacy = {
  master: testUsers.masters[0],
  client: testUsers.clients[0]
};

// Функція для автоматичної реєстрації тестових користувачів
export function registerTestUsers() {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
    
    // Додаємо всіх тестових користувачів якщо їх ще немає
    [...testUsers.clients, ...testUsers.masters].forEach(user => {
      const exists = existingUsers.some((u: User) => u.id === user.id);
      if (!exists) {
        existingUsers.push(user);
      }
    });
    
    localStorage.setItem('repair_master_users', JSON.stringify(existingUsers));
    console.log('✅ Test users registered:', existingUsers.length);
    return existingUsers;
  } catch (error) {
    console.error('❌ Error registering test users:', error);
    return [];
  }
}

