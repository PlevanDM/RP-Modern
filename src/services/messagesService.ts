import { AdvancedMessage, Chat, MessageType, MessageStatus } from '../types';
import { useNotificationsStore } from '../store/notificationsStore';

class MessagesService {
  private static instance: MessagesService;
  private chats: Map<string, Chat> = new Map();
  private messages: AdvancedMessage[] = [];
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): MessagesService {
    if (!MessagesService.instance) {
      MessagesService.instance = new MessagesService();
    }
    return MessagesService.instance;
  }

  /**
   * Создать или получить чат между двумя пользователями
   */
  public getOrCreateChat(participantIds: string[], participantNames: string[], orderId?: string): Chat {
    const chatId = this.generateChatId(participantIds);
    
    let chat = this.chats.get(chatId);
    if (!chat) {
      chat = {
        id: chatId,
        orderId,
        participantIds,
        participantNames,
        unreadCount: Object.fromEntries(participantIds.map(id => [id, 0])),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.chats.set(chatId, chat);
    }
    return chat;
  }

  /**
   * Отправить сообщение
   */
  public sendMessage(
    chatId: string,
    senderId: string,
    senderName: string,
    senderAvatar: string,
    receiverId: string,
    content: string,
    type: MessageType = 'text',
    fileUrl?: string,
    fileName?: string,
    estimateData?: any
  ): AdvancedMessage {
    const message: AdvancedMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      chatId,
      senderId,
      senderName,
      senderAvatar,
      receiverId,
      type,
      content,
      fileUrl,
      fileName,
      fileSize: fileUrl ? Math.floor(Math.random() * 10000000) : undefined,
      estimateData,
      status: 'sent',
      timestamp: new Date(),
      reactions: [],
    };

    this.messages.push(message);
    
    // Обновить чат
    const chat = this.chats.get(chatId);
    if (chat) {
      chat.lastMessage = message;
      chat.updatedAt = new Date();
      
      // Увеличить счетчик непрочитанных для получателя
      chat.unreadCount[receiverId] = (chat.unreadCount[receiverId] || 0) + 1;
    }

    // Отправить уведомление
    this.notifyMessageReceived(message, chat);
    this.notifyListeners();
    this.saveToStorage();

    return message;
  }

  /**
   * Отметить сообщение как прочитанное
   */
  public markAsRead(chatId: string, messageIds: string[], userId: string): void {
    messageIds.forEach(messageId => {
      const message = this.messages.find(m => m.id === messageId);
      if (message) {
        message.status = 'read';
        message.readAt = new Date();
      }
    });

    // Сбросить счетчик непрочитанных
    const chat = this.chats.get(chatId);
    if (chat) {
      chat.unreadCount[userId] = 0;
    }

    this.notifyListeners();
    this.saveToStorage();
  }

  /**
   * Получить сообщения чата
   */
  public getChatMessages(chatId: string): AdvancedMessage[] {
    return this.messages.filter(m => m.chatId === chatId);
  }

  /**
   * Получить все чаты пользователя
   */
  public getUserChats(userId: string): Chat[] {
    return Array.from(this.chats.values()).filter(chat =>
      chat.participantIds.includes(userId)
    );
  }

  /**
   * Добавить реакцию на сообщение
   */
  public addReaction(messageId: string, emoji: string, userId: string): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      if (!message.reactions) {
        message.reactions = [];
      }
      
      const reaction = message.reactions.find(r => r.emoji === emoji);
      if (reaction) {
        if (!reaction.userIds.includes(userId)) {
          reaction.userIds.push(userId);
        }
      } else {
        message.reactions.push({ emoji, userIds: [userId] });
      }
      
      this.notifyListeners();
      this.saveToStorage();
    }
  }

  /**
   * Редактировать сообщение
   */
  public editMessage(messageId: string, newContent: string, userId: string): boolean {
    const message = this.messages.find(m => m.id === messageId);
    if (message && message.senderId === userId) {
      message.content = newContent;
      message.edited = true;
      message.editedAt = new Date();
      this.notifyListeners();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Удалить сообщение
   */
  public deleteMessage(messageId: string, userId: string): boolean {
    const index = this.messages.findIndex(m => m.id === messageId && m.senderId === userId);
    if (index !== -1) {
      this.messages.splice(index, 1);
      this.notifyListeners();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Закрепить сообщение
   */
  public pinMessage(messageId: string, pinned: boolean): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.pinned = pinned;
      this.notifyListeners();
      this.saveToStorage();
    }
  }

  /**
   * Архивировать чат
   */
  public archiveChat(chatId: string, archived: boolean): void {
    const chat = this.chats.get(chatId);
    if (chat) {
      chat.archived = archived;
      this.notifyListeners();
      this.saveToStorage();
    }
  }

  /**
   * Подписаться на обновления
   */
  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  private notifyMessageReceived(message: AdvancedMessage, chat?: Chat): void {
    const notificationsStore = useNotificationsStore.getState();
    
    let notificationMessage = `Новое сообщение от ${message.senderName}`;
    if (message.type === 'proposal') {
      notificationMessage = `Новое предложение от ${message.senderName}`;
    } else if (message.type === 'estimate') {
      notificationMessage = `Новая смета от ${message.senderName}`;
    }

    notificationsStore.addNotification({
      id: `notif-${Date.now()}`,
      userId: message.receiverId,
      title: message.senderName,
      message: notificationMessage,
      type: 'message',
      read: false,
      createdAt: new Date(),
      actionUrl: `/messages/${message.chatId}`,
    });
  }

  private generateChatId(participantIds: string[]): string {
    return participantIds.sort().join('_');
  }

  private saveToStorage(): void {
    try {
      const data = {
        chats: Array.from(this.chats.entries()),
        messages: this.messages,
      };
      localStorage.setItem('messages-service-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving messages to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('messages-service-data');
      if (data) {
        const parsed = JSON.parse(data);
        this.chats = new Map(parsed.chats);
        this.messages = parsed.messages;
      }
    } catch (error) {
      console.error('Error loading messages from storage:', error);
    }
  }
}

export const messagesService = MessagesService.getInstance();
