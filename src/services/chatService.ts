import { Message, Conversation } from '../types/models';
import api from './api/client';

export async function getConversations(): Promise<Conversation[]> {
  try {
    const response = await api.get('/conversations');
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
}

export async function getOrCreateConversation(recipientId: string): Promise<Conversation> {
  try {
    const response = await api.post('/conversations', { recipientId });
    return response.data;
  } catch (error) {
    console.error('Error creating or getting conversation:', error);
    throw error;
  }
}

export async function addReaction(messageId: string, emoji: string): Promise<Message> {
  try {
    const response = await api.post(`/messages/${messageId}/reactions`, { emoji });
    return response.data;
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
}

export async function editMessage(messageId: string, content: string): Promise<Message> {
  try {
    const response = await api.patch(`/messages/${messageId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Error editing message:', error);
    throw error;
  }
}

export async function deleteMessage(messageId: string): Promise<void> {
  try {
    await api.delete(`/messages/${messageId}`);
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

export async function markConversationAsRead(conversationId: string): Promise<void> {
  try {
    await api.post(`/conversations/${conversationId}/read`);
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw error;
  }
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  try {
    const response = await api.get(`/messages?conversationId=${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function sendMessage(conversationId: string, recipientId: string, content: string): Promise<Message> {
  try {
    const response = await api.post('/messages', { conversationId, recipientId, content });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}
