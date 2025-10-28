import { Order } from '../types/models';
import { testUsers } from './testUsers';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
  type?: 'text' | 'proposal';
  proposalData?: {
    proposalId: string;
    price: number;
    days: number;
    description: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
}

export interface Chat {
  orderId: string;
  orderTitle: string;
  participants: { clientId: string; masterId: string };
  messages: ChatMessage[];
  lastMessageTime: string;
}

// Создание тестовых чатов с сообщениями
export function createTestChats(): Record<string, Chat> {
  const chats: Record<string, Chat> = {};

  const now = new Date();

  // Чат 1: Клиент 1 <-> Мастер 1 по заказу order-001 (iPhone ремонт)
  chats['order-001'] = {
    orderId: 'order-001',
    orderTitle: 'iPhone 13 Pro Max - Ремонт екрану',
    participants: {
      clientId: testUsers.clients[0].id,
      masterId: testUsers.masters[0].id
    },
    messages: [
      {
        id: 'msg-001',
        senderId: testUsers.clients[0].id,
        senderName: testUsers.clients[0].name,
        text: 'Доброго дня! У мене проблема з екраном iPhone 13 Pro Max',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-002',
        senderId: testUsers.masters[0].id,
        senderName: testUsers.masters[0].name,
        text: 'Привіт! Опишіть детальніше, будь ласка. Які саме проблеми з екраном?',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-003',
        senderId: testUsers.clients[0].id,
        senderName: testUsers.clients[0].name,
        text: 'Екран чіпляється, нічого не відображається. Мабуть треба замінити дисплей',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-004',
        senderId: testUsers.masters[0].id,
        senderName: testUsers.masters[0].name,
        text: 'Зрозуміло. Можу виконати заміну оригінального дисплея за 3500 грн. Термін - 1 день. Гарантія 3 місяці.',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'proposal',
        proposalData: {
          proposalId: 'prop-001',
          price: 3500,
          days: 1,
          description: 'Заміна оригінального дисплея iPhone 13 Pro Max',
          status: 'accepted'
        }
      },
      {
        id: 'msg-005',
        senderId: testUsers.clients[0].id,
        senderName: testUsers.clients[0].name,
        text: 'Добре, згоден! Коли зможете взятися за роботу?',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-006',
        senderId: testUsers.masters[0].id,
        senderName: testUsers.masters[0].id,
        text: 'Зараз працюю над вашим пристроєм. Згодом повідомлю про готовність.',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        read: false,
        type: 'text'
      }
    ],
    lastMessageTime: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString()
  };

  // Чат 2: Клиент 2 <-> Мастер 2 по заказу order-002 (Samsung ремонт)
  chats['order-002'] = {
    orderId: 'order-002',
    orderTitle: 'Samsung Galaxy S23 Ultra - Заміна батареї',
    participants: {
      clientId: testUsers.clients[1].id,
      masterId: testUsers.masters[1].id
    },
    messages: [
      {
        id: 'msg-101',
        senderId: testUsers.clients[1].id,
        senderName: testUsers.clients[1].name,
        text: 'Привіт! Потрібна заміна батареї на Samsung Galaxy S23 Ultra. Батарея дуже швидко розряжається.',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-102',
        senderId: testUsers.masters[1].id,
        senderName: testUsers.masters[1].name,
        text: 'Добрий день! Можу замінити оригінальну батарею Samsung. Вартість 2500 грн, термін 4 години. Гарантія 6 місяців.',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'proposal',
        proposalData: {
          proposalId: 'prop-102',
          price: 2500,
          days: 1,
          description: 'Заміна оригінальної батареї Samsung Galaxy S23 Ultra',
          status: 'pending'
        }
      }
    ],
    lastMessageTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString()
  };

  // Чат 3: Клиент 3 <-> Мастер 3 по заказу order-005 (MacBook ремонт - завершено)
  chats['order-005'] = {
    orderId: 'order-005',
    orderTitle: 'Lenovo ThinkPad - Ремонт материнської плати',
    participants: {
      clientId: testUsers.clients[2].id,
      masterId: testUsers.masters[2].id
    },
    messages: [
      {
        id: 'msg-201',
        senderId: testUsers.clients[2].id,
        senderName: testUsers.clients[2].name,
        text: 'Добрий день! Ноутбук Lenovo ThinkPad не включається.',
        timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-202',
        senderId: testUsers.masters[2].id,
        senderName: testUsers.masters[2].name,
        text: 'Привіт! Ймовірно проблема з материнською платою. Можу діагностувати та відремонтувати. Вартість 3800 грн, термін 3 дні.',
        timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-203',
        senderId: testUsers.clients[2].id,
        senderName: testUsers.clients[2].name,
        text: 'Згоден! Коли зможу привезти ноутбук?',
        timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-204',
        senderId: testUsers.masters[2].id,
        senderName: testUsers.masters[2].name,
        text: 'Роботу завершено. Материнська плата відремонтована. Ноутбук працює ідеально. Коли зможете забрати?',
        timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: 'msg-205',
        senderId: testUsers.clients[2].id,
        senderName: testUsers.clients[2].name,
        text: 'Чудово! Заберу завтра. Дякую за роботу!',
        timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      }
    ],
    lastMessageTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  };

  return chats;
}

// Инициализация чатов
export function initializeTestChats() {
  try {
    const existingChats = JSON.parse(localStorage.getItem('repair_master_chats') || '{}');
    const newChats = createTestChats();
    
    // Объединяем существующие и новые чаты
    const allChats = { ...existingChats, ...newChats };
    
    localStorage.setItem('repair_master_chats', JSON.stringify(allChats));
    console.log('✅ Test chats initialized:', Object.keys(allChats).length, 'chats');
    
    return allChats;
  } catch (error) {
    console.error('❌ Error initializing test chats:', error);
    return {};
  }
}

