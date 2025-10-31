import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare } from 'lucide-react';
import { User, Order, Conversation } from '../../types/models';
import { 
  getUserConversations, 
  getOrCreateConversation
} from '../../services/chatService';
import { ChatWindow } from '../features/chat/ChatWindow';
import { Input } from '../ui/input';

interface MessagesNewProps {
  currentUser?: User;
  masters?: User[];
  orders?: Order[];
}

export function MessagesNew({ currentUser, masters = [], orders = [] }: MessagesNewProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentUser?.id) {
      loadConversations();
      
      const interval = setInterval(() => {
        loadConversations();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentUser?.id, loadConversations]);

  const loadConversations = useCallback(() => {
    try {
      if (!currentUser?.id) return;

      getUserConversations(currentUser.id);
      
      orders.forEach(order => {
      if (currentUser.role === 'client' && order.assignedMasterId) {
        const master = masters.find(m => m.id === order.assignedMasterId);
        if (master) {
          const conversation = getOrCreateConversation(currentUser.id, master.id, order.id);
          
          if (!conversation.participantNames) {
            conversation.participantNames = {};
          }
          conversation.participantNames[currentUser.id] = currentUser.name || 'Клієнт';
          conversation.participantNames[master.id] = master.name || 'Майстер';
          
          if (!conversation.participantRoles) {
            conversation.participantRoles = {};
          }
          conversation.participantRoles[currentUser.id] = 'client';
          conversation.participantRoles[master.id] = 'master';
        }
      } else if (currentUser.role === 'master' && order.assignedMasterId === currentUser.id) {
        const conversation = getOrCreateConversation(currentUser.id, order.clientId, order.id);
        
        if (!conversation.participantNames) {
          conversation.participantNames = {};
        }
        conversation.participantNames[currentUser.id] = currentUser.name || 'Майстер';
        conversation.participantNames[order.clientId] = order.clientName || 'Клієнт';
        
        if (!conversation.participantRoles) {
          conversation.participantRoles = {};
        }
        conversation.participantRoles[currentUser.id] = 'master';
        conversation.participantRoles[order.clientId] = 'client';
      }
    });

      const updatedConversations = getUserConversations(currentUser.id);
      setConversations(updatedConversations);
    } catch (error) {
      console.error('Помилка завантаження розмов:', error);
      setConversations([]);
    }
  }, [currentUser, masters, orders]);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter(conv => {
      const otherUserId = conv.participants.find(id => id !== currentUser?.id);
      const otherUserName = conv.participantNames?.[otherUserId || ''] || '';
      
      return (
        otherUserName.toLowerCase().includes(query) ||
        conv.lastMessage?.content?.toLowerCase().includes(query) ||
        conv.lastMessage?.text?.toLowerCase().includes(query)
      );
    });
  }, [conversations, searchQuery, currentUser?.id]);

  const getConversationPartner = (conversation: Conversation): { id: string; name: string; role?: string } => {
    const otherUserId = conversation.participants.find(id => id !== currentUser?.id) || '';
    return {
      id: otherUserId,
      name: conversation.participantNames?.[otherUserId] || 'Користувач',
      role: conversation.participantRoles?.[otherUserId],
    };
  };

  const formatLastMessageTime = (date?: Date): string => {
    if (!date) return '';
    const now = new Date();
    const msgDate = new Date(date);
    const diffMs = now.getTime() - msgDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'щойно';
    if (diffMins < 60) return `${diffMins} хв тому`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} год тому`;
    return msgDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Будь ласка, увійдіть в систему</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Повідомлення
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Пошук розмов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center text-gray-500 py-8 px-4">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Розмов поки немає</p>
              <p className="text-sm mt-1">Почніть нову розмову!</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const partner = getConversationPartner(conversation);
              const unreadCount = conversation.unreadCount[currentUser.id] || 0;
              const isSelected = selectedConversation?.id === conversation.id;

              return (
                <motion.button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 text-left border-b border-gray-200 hover:bg-gray-100 transition ${
                    isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'bg-white'
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {partner.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{partner.name}</h3>
                        {conversation.lastMessageAt && (
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {formatLastMessageTime(conversation.lastMessageAt)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage?.content || 
                           conversation.lastMessage?.text || 
                           (conversation.orderId ? `Замовлення #${conversation.orderId.slice(-4)}` : 'Почніть розмову')}
                        </p>
                        {unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </div>
                      {conversation.orderId && (
                        <p className="text-xs text-blue-600 mt-1">Замовлення #{conversation.orderId.slice(-4)}</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            currentUserId={currentUser.id}
            currentUserName={currentUser.name || 'Користувач'}
            currentUserRole={currentUser.role || 'client'}
            onMessageSent={() => {
              loadConversations();
            }}
            isCompact={false}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Оберіть розмову</h3>
              <p className="text-gray-500">Виберіть розмову з пошуку або почніть нову</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
