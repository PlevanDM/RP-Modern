import { Message, Conversation, MessageAttachment, ChatLog } from '../types/models';

// Ключі для localStorage
const CONVERSATIONS_STORAGE_KEY = 'repairhub_conversations';
const MESSAGES_STORAGE_KEY = 'repairhub_messages';
const CHAT_LOGS_STORAGE_KEY = 'repairhub_chat_logs';

// ============================================================
// ГЕНЕРАЦІЯ ID
// ============================================================

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateConversationId(userId1: string, userId2: string): string {
  const sorted = [userId1, userId2].sort();
  return `conv_${sorted[0]}_${sorted[1]}`;
}

// ============================================================
// РОБОТА З РОЗМОВАМИ
// ============================================================

export function getConversation(conversationId: string): Conversation | null {
  try {
    const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    const conversations: Conversation[] = stored ? JSON.parse(stored) : [];
    return conversations.find(c => c.id === conversationId) || null;
  } catch (error) {
    console.error('Помилка при завантаженні розмови:', error);
    return null;
  }
}

export function getOrCreateConversation(
  userId1: string,
  userId2: string,
  orderId?: string
): Conversation {
  const conversationId = generateConversationId(userId1, userId2);
  const existing = getConversation(conversationId);

  if (existing) {
    return existing;
  }

  const newConversation: Conversation = {
    id: conversationId,
    participants: [userId1, userId2],
    participantNames: {},
    participantRoles: {},
    orderId,
    unreadCount: {
      [userId1]: 0,
      [userId2]: 0,
    },
    pinned: false,
    muted: {},
    archived: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  saveConversation(newConversation);
  return newConversation;
}

export function saveConversation(conversation: Conversation): void {
  try {
    const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    const conversations: Conversation[] = stored ? JSON.parse(stored) : [];
    const index = conversations.findIndex(c => c.id === conversation.id);

    if (index >= 0) {
      conversations[index] = { ...conversation, updatedAt: new Date() };
    } else {
      conversations.push(conversation);
    }

    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Помилка при збереженні розмови:', error);
  }
}

export function getUserConversations(userId: string): Conversation[] {
  try {
    const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    const conversations: Conversation[] = stored ? JSON.parse(stored) : [];
    return conversations
      .filter(c => c.participants.includes(userId))
      .filter(c => !c.archived?.[userId])
      .sort((a, b) => {
        const timeA = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : new Date(a.createdAt).getTime();
        const timeB = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : new Date(b.createdAt).getTime();
        return timeB - timeA;
      });
  } catch (error) {
    console.error('Помилка при завантаженні розмов:', error);
    return [];
  }
}

export function updateConversationLastMessage(conversationId: string, message: Message): void {
  const conversation = getConversation(conversationId);
  if (!conversation) return;

  conversation.lastMessage = message;
  conversation.lastMessageAt = message.createdAt;
  conversation.updatedAt = new Date();

  // Оновлюємо лічильник непрочитаних для отримувача
  if (!message.read && message.recipientId) {
    if (!conversation.unreadCount[message.recipientId]) {
      conversation.unreadCount[message.recipientId] = 0;
    }
    conversation.unreadCount[message.recipientId]++;
  }

  saveConversation(conversation);
}

export function markConversationAsRead(conversationId: string, userId: string): void {
  const conversation = getConversation(conversationId);
  if (!conversation) return;

  conversation.unreadCount[userId] = 0;
  conversation.updatedAt = new Date();
  saveConversation(conversation);

  // Також позначаємо всі повідомлення як прочитані
  const messages = getMessages(conversationId);
  messages.forEach(msg => {
    if (msg.recipientId === userId && !msg.read) {
      markMessageAsRead(msg.id);
    }
  });
}

// ============================================================
// РОБОТА З ПОВІДОМЛЕННЯМИ
// ============================================================

export function sendMessage(
  conversationId: string,
  senderId: string,
  senderName: string,
  senderRole: 'client' | 'master' | 'admin' | 'superadmin',
  recipientId: string,
  content: string,
  photos?: File[],
  attachments?: File[],
  replyToId?: string,
  orderId?: string
): Message {
  const messageId = generateId();
  const now = new Date();

  // Обробка фото
  const photoUrls: string[] = [];
  if (photos && photos.length > 0) {
    photos.forEach(photo => {
      // Конвертуємо в base64 для збереження
      const reader = new FileReader();
      reader.onloadend = () => {
        photoUrls.push(reader.result as string);
      };
      reader.readAsDataURL(photo);
    });
  }

  // Обробка вкладень
  const messageAttachments: MessageAttachment[] = [];
  if (attachments && attachments.length > 0) {
    attachments.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const attachment: MessageAttachment = {
          id: `${messageId}_attach_${index}`,
          type: getFileType(file.type),
          name: file.name,
          url: reader.result as string,
          size: file.size,
          mimeType: file.type,
          thumbnailUrl: file.type.startsWith('image/') ? reader.result as string : undefined,
        };
        messageAttachments.push(attachment);
      };
      reader.readAsDataURL(file);
    });
  }

  const message: Message = {
    id: messageId,
    conversationId,
    orderId,
    senderId,
    senderName,
    senderRole,
    recipientId,
    content,
    text: content, // Для сумісності
    photos: photoUrls.length > 0 ? photoUrls : undefined,
    attachments: messageAttachments.length > 0 ? messageAttachments : undefined,
    messageType: photos && photos.length > 0 ? 'image' : 
                attachments && attachments.length > 0 ? 'file' : 
                'text',
    read: false,
    delivered: false,
    edited: false,
    deleted: false,
    replyToId,
    reactions: [],
    createdAt: now,
    timestamp: now,
    updatedAt: now,
  };

  // Асинхронне збереження після обробки файлів
  setTimeout(() => {
    saveMessage(message);
    updateConversationLastMessage(conversationId, message);
    logChatAction(conversationId, messageId, 'sent', senderId, senderName);
  }, 100);

  return message;
}

function getFileType(mimeType: string): MessageAttachment['type'] {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
  return 'other';
}

export function saveMessage(message: Message): void {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    const index = messages.findIndex(m => m.id === message.id);

    if (index >= 0) {
      messages[index] = { ...message, updatedAt: new Date() };
    } else {
      messages.push(message);
    }

    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Помилка при збереженні повідомлення:', error);
  }
}

export function getMessages(conversationId: string, limit?: number): Message[] {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    let filtered = messages
      .filter(m => m.conversationId === conversationId && !m.deleted)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    if (limit) {
      filtered = filtered.slice(-limit);
    }

    return filtered;
  } catch (error) {
    console.error('Помилка при завантаженні повідомлень:', error);
    return [];
  }
}

export function markMessageAsRead(messageId: string): void {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    const message = messages.find(m => m.id === messageId);

    if (message && !message.read) {
      message.read = true;
      message.readAt = new Date();
      message.updatedAt = new Date();
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
      logChatAction(message.conversationId, messageId, 'read', message.recipientId, '');
    }
  } catch (error) {
    console.error('Помилка при позначенні повідомлення як прочитаного:', error);
  }
}

export function markMessageAsDelivered(messageId: string): void {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    const message = messages.find(m => m.id === messageId);

    if (message && !message.delivered) {
      message.delivered = true;
      message.deliveredAt = new Date();
      message.updatedAt = new Date();
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    }
  } catch (error) {
    console.error('Помилка при позначенні повідомлення як доставленого:', error);
  }
}

export function editMessage(messageId: string, newContent: string): boolean {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    const message = messages.find(m => m.id === messageId);

    if (message && !message.deleted) {
      message.content = newContent;
      message.text = newContent;
      message.edited = true;
      message.editedAt = new Date();
      message.updatedAt = new Date();
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
      logChatAction(message.conversationId, messageId, 'edited', message.senderId, message.senderName || '');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Помилка при редагуванні повідомлення:', error);
    return false;
  }
}

export function deleteMessage(messageId: string, userId: string): boolean {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    const message = messages.find(m => m.id === messageId);

    if (message && (message.senderId === userId || userId === 'admin')) {
      message.deleted = true;
      message.deletedAt = new Date();
      message.updatedAt = new Date();
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
      logChatAction(message.conversationId, messageId, 'deleted', userId, '');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Помилка при видаленні повідомлення:', error);
    return false;
  }
}

export function addReaction(messageId: string, userId: string, userName: string, emoji: string): boolean {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    const message = messages.find(m => m.id === messageId);

    if (message && !message.deleted) {
      if (!message.reactions) {
        message.reactions = [];
      }

      // Перевіряємо, чи користувач вже додав цю реакцію
      const existingIndex = message.reactions.findIndex(r => r.userId === userId && r.emoji === emoji);
      
      if (existingIndex >= 0) {
        // Видаляємо реакцію, якщо вона вже є
        message.reactions.splice(existingIndex, 1);
        logChatAction(message.conversationId, messageId, 'reaction_removed', userId, userName, { emoji });
      } else {
        // Додаємо нову реакцію
        message.reactions.push({
          userId,
          userName,
          emoji,
          createdAt: new Date(),
        });
        logChatAction(message.conversationId, messageId, 'reaction_added', userId, userName, { emoji });
      }

      message.updatedAt = new Date();
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Помилка при додаванні реакції:', error);
    return false;
  }
}

// ============================================================
// ЛОГУВАННЯ
// ============================================================

export function logChatAction(
  conversationId: string,
  messageId: string,
  action: ChatLog['action'],
  userId: string,
  userName: string,
  details?: Record<string, unknown>
): void {
  try {
    const stored = localStorage.getItem(CHAT_LOGS_STORAGE_KEY);
    const logs: ChatLog[] = stored ? JSON.parse(stored) : [];

    const log: ChatLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      conversationId,
      messageId,
      action,
      userId,
      userName,
      details,
      timestamp: new Date(),
      ipAddress: undefined, // Можна додати через API
      userAgent: navigator.userAgent,
    };

    logs.push(log);

    // Зберігаємо тільки останні 10000 логів
    if (logs.length > 10000) {
      logs.splice(0, logs.length - 10000);
    }

    localStorage.setItem(CHAT_LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Помилка при логуванні дії чату:', error);
  }
}

export function getChatLogs(
  conversationId?: string,
  userId?: string,
  action?: ChatLog['action'],
  limit: number = 1000
): ChatLog[] {
  try {
    const stored = localStorage.getItem(CHAT_LOGS_STORAGE_KEY);
    let logs: ChatLog[] = stored ? JSON.parse(stored) : [];

    if (conversationId) {
      logs = logs.filter(l => l.conversationId === conversationId);
    }
    if (userId) {
      logs = logs.filter(l => l.userId === userId);
    }
    if (action) {
      logs = logs.filter(l => l.action === action);
    }

    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return logs.slice(0, limit);
  } catch (error) {
    console.error('Помилка при завантаженні логів:', error);
    return [];
  }
}

// ============================================================
// ПОШУК
// ============================================================

export function searchMessages(query: string, conversationId?: string): Message[] {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    let messages: Message[] = stored ? JSON.parse(stored) : [];

    if (conversationId) {
      messages = messages.filter(m => m.conversationId === conversationId);
    }

    const lowerQuery = query.toLowerCase();
    return messages.filter(m => 
      !m.deleted && (
        (m.content && m.content.toLowerCase().includes(lowerQuery)) ||
        (m.text && m.text.toLowerCase().includes(lowerQuery)) ||
        (m.senderName && m.senderName.toLowerCase().includes(lowerQuery))
      )
    );
  } catch (error) {
    console.error('Помилка при пошуку повідомлень:', error);
    return [];
  }
}

// ============================================================
// ЕКСПОРТ ДАНИХ (для адміністраторів)
// ============================================================

export function exportConversationData(conversationId: string): {
  conversation: Conversation | null;
  messages: Message[];
  logs: ChatLog[];
} {
  return {
    conversation: getConversation(conversationId),
    messages: getMessages(conversationId),
    logs: getChatLogs(conversationId),
  };
}

