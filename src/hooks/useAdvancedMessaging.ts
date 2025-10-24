import { useState, useEffect, useCallback } from 'react';
import { AdvancedMessage, Chat, User } from '../types';
import { messagesService } from '../services/messagesService';
import { earningsService } from '../services/earningsService';

export const useAdvancedMessaging = (currentUserId: string) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<AdvancedMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Загрузить чаты пользователя
  useEffect(() => {
    setLoading(true);
    const userChats = messagesService.getUserChats(currentUserId);
    setChats(userChats);
    
    // Вычислить общее количество непрочитанных сообщений
    const total = userChats.reduce((sum, chat) => sum + (chat.unreadCount[currentUserId] || 0), 0);
    setUnreadCount(total);
    
    setLoading(false);

    // Подписаться на обновления
    const unsubscribe = messagesService.subscribe(() => {
      const updated = messagesService.getUserChats(currentUserId);
      setChats(updated);
      const newTotal = updated.reduce((sum, chat) => sum + (chat.unreadCount[currentUserId] || 0), 0);
      setUnreadCount(newTotal);
    });

    return unsubscribe;
  }, [currentUserId]);

  // Загрузить сообщения выбранного чата
  useEffect(() => {
    if (selectedChat) {
      const chatMessages = messagesService.getChatMessages(selectedChat.id);
      setMessages(chatMessages);
    }
  }, [selectedChat]);

  const sendMessage = useCallback(
    (
      receiverId: string,
      content: string,
      type: 'text' | 'document' | 'proposal' | 'estimate' = 'text',
      fileUrl?: string,
      fileName?: string,
      estimateData?: any
    ) => {
      if (!selectedChat) return;

      const message = messagesService.sendMessage(
        selectedChat.id,
        currentUserId,
        '', // senderName будет заполнен сервисом
        '', // senderAvatar будет заполнен сервисом
        receiverId,
        content,
        type,
        fileUrl,
        fileName,
        estimateData
      );

      setMessages([...messages, message]);
    },
    [selectedChat, messages, currentUserId]
  );

  const sendProposal = useCallback(
    (receiverId: string, price: number, currency: string, description: string, deadline: string) => {
      sendMessage(receiverId, `Пропозиція: ${description}`, 'proposal', undefined, undefined, {
        price,
        currency,
        description,
        deadline,
      });
    },
    [sendMessage]
  );

  const createOrSelectChat = useCallback(
    (participantIds: string[], participantNames: string[], orderId?: string) => {
      const chat = messagesService.getOrCreateChat(participantIds, participantNames, orderId);
      setSelectedChat(chat);
      const chatMessages = messagesService.getChatMessages(chat.id);
      setMessages(chatMessages);
      return chat;
    },
    []
  );

  const markChatAsRead = useCallback(() => {
    if (selectedChat) {
      messagesService.markAsRead(selectedChat.id, messages.map(m => m.id), currentUserId);
      setMessages(messages);
    }
  }, [selectedChat, messages, currentUserId]);

  const archiveChat = useCallback((chatId: string) => {
    messagesService.archiveChat(chatId, true);
    setChats(chats.filter(c => c.id !== chatId));
  }, [chats]);

  const pinMessage = useCallback((messageId: string, pinned: boolean) => {
    messagesService.pinMessage(messageId, pinned);
    setMessages([...messages]);
  }, [messages]);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    messagesService.addReaction(messageId, emoji, currentUserId);
    setMessages([...messages]);
  }, [messages, currentUserId]);

  return {
    chats,
    selectedChat,
    messages,
    unreadCount,
    loading,
    sendMessage,
    sendProposal,
    createOrSelectChat,
    markChatAsRead,
    archiveChat,
    pinMessage,
    addReaction,
    setSelectedChat,
  };
};
