import { useState, useMemo, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { QuickActions, ProposalMessage, NegotiateMessage } from '../features/chat/QuickActions';
import { ProposalModal } from '../features/chat/ProposalModal';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type?: 'text' | 'proposal' | 'negotiate';
  proposalData?: {
    proposalId: string;
    price: number;
    description: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
  negotiateData?: {
    currentPrice: number;
    newPrice: number;
    message: string;
  };
}

import { User } from '../../types/models';

interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
}

interface MessagesProps {
  currentUser?: User;
  masters?: User[];
  orders?: any[];
  selectedMaster?: User;
}

// Мок данные удалены - используем только реальные данные из заказов

export function Messages({ currentUser, masters = [], orders = [], selectedMaster }: MessagesProps) {
  const [selectedContactId, setSelectedContactId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isMaster = currentUser?.role === 'master';
  
  // Initialize contacts and chats based on orders and masters
  useEffect(() => {
    if (!currentUser) return;
    
    const generatedContacts: Contact[] = [];
    const generatedChats: Record<string, Chat> = {};
    
    // Generate contacts from orders
    orders.forEach(order => {
      if (currentUser.role === 'client' && order.assignedMasterId) {
        // Client chats with assigned masters
        const master = masters.find(m => m.id === order.assignedMasterId);
        if (master) {
          const contactId = master.id;
          generatedContacts.push({
            id: contactId,
            name: master.name,
            avatar: master.avatar || `https://i.pravatar.cc/96?img=${contactId}`,
            status: 'online',
            lastMessage: `Замовлення: ${order.title}`,
            lastMessageTime: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
            unreadCount: 0
          });
          
          if (!generatedChats[contactId]) {
            generatedChats[contactId] = {
              id: contactId,
              contactId,
              messages: [{
                id: '1',
                senderId: 'system',
                text: `Чат по замовленню: ${order.title}`,
                timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
                read: true
              }]
            };
          }
        }
      } else if (currentUser.role === 'master' && order.assignedMasterId === currentUser.id) {
        // Master chats with clients who have assigned orders
        const client = masters.find(m => m.id === order.clientId);
        if (client) {
          const contactId = client.id;
          generatedContacts.push({
            id: contactId,
            name: order.clientName || client.name,
            avatar: `https://i.pravatar.cc/96?img=${contactId}`,
            status: 'online',
            lastMessage: `Замовлення: ${order.title}`,
            lastMessageTime: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
            unreadCount: 0
          });
          
          if (!generatedChats[contactId]) {
            generatedChats[contactId] = {
              id: contactId,
              contactId,
              messages: [{
                id: '1',
                senderId: 'system',
                text: `Чат по замовленню: ${order.title}`,
                timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
                read: true
              }]
            };
          }
        }
      }
    });
    
    // Set generated contacts and chats (no fallback to mocks)
    setContacts(generatedContacts);
    setChats(generatedChats);
    if (generatedContacts.length > 0) {
      setSelectedContactId(generatedContacts[0].id);
    }
  }, [currentUser, masters, orders]);

  useEffect(() => {
    if (selectedMaster) {
      // Сначала пытаемся найти по ID
      const masterContactById = contacts.find(
        (contact) => contact.id === selectedMaster.id
      );
      if (masterContactById) {
        setSelectedContactId(masterContactById.id);
      } else {
        // Если не нашли по ID, ищем по имени
        const masterContactByName = contacts.find(
          (contact) => contact.name.toLowerCase() === selectedMaster.name.toLowerCase()
        );
        if (masterContactByName) {
          setSelectedContactId(masterContactByName.id);
        }
      }
    }
  }, [selectedMaster, contacts]);

  // Сброс счетчика непрочитанных при открытии чата
  useEffect(() => {
    if (selectedContactId) {
      setContacts(prev => prev.map(contact => {
        if (contact.id === selectedContactId) {
          return {
            ...contact,
            unreadCount: 0
          };
        }
        return contact;
      }));
    }
  }, [selectedContactId]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, contacts]);

  const selectedChat = selectedContactId ? chats[selectedContactId] : null;
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (selectedChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages, selectedChat]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: 'text'
    };

    const updatedChats = {
      ...chats,
      [selectedContactId]: {
        ...chats[selectedContactId],
        messages: [...chats[selectedContactId].messages, newMessage]
      }
    };

    setChats(updatedChats);
    
    // Обновляем контакт с новым последним сообщением и сбрасываем счетчик непрочитанных
    setContacts(prev => prev.map(contact => {
      if (contact.id === selectedContactId) {
        return {
          ...contact,
          lastMessage: messageText,
          lastMessageTime: newMessage.timestamp,
          unreadCount: 0 // Сбрасываем счетчик непрочитанных при отправке сообщения
        };
      }
      return contact;
    }));
    
    setMessageText('');
  };

  const handleMakeOffer = () => {
    setShowProposalModal(true);
  };

  const handleOfferPart = () => {
    setShowProposalModal(true);
  };

  const handleNegotiate = () => {
    setShowProposalModal(true);
  };

  const handleSubmitProposal = (data: { price: number; days: number; description: string }) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: `Пропозиція: ${data.price}₴ за ${data.days} днів`,
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: 'proposal',
      proposalData: {
        proposalId: `prop-${Date.now()}`,
        price: data.price,
        description: data.description,
        status: 'pending'
      }
    };

    const updatedChats = {
      ...chats,
      [selectedContactId]: {
        ...chats[selectedContactId],
        messages: [...chats[selectedContactId].messages, newMessage]
      }
    };

    setChats(updatedChats);
  };

  const handleAcceptProposal = (messageId: string) => {
    setChats(prev => {
      const chat = prev[selectedContactId];
      if (!chat) return prev;

      const updatedMessages = chat.messages.map(msg => {
        if (msg.id === messageId && msg.proposalData) {
          return {
            ...msg,
            proposalData: {
              ...msg.proposalData,
              status: 'accepted' as const
            }
          };
        }
        return msg;
      });

      return {
        ...prev,
        [selectedContactId]: {
          ...chat,
          messages: updatedMessages
        }
      };
    });
  };

  const handleRejectProposal = (messageId: string) => {
    setChats(prev => {
      const chat = prev[selectedContactId];
      if (!chat) return prev;

      const updatedMessages = chat.messages.map(msg => {
        if (msg.id === messageId && msg.proposalData) {
          return {
            ...msg,
            proposalData: {
              ...msg.proposalData,
              status: 'rejected' as const
            }
          };
        }
        return msg;
      });

      return {
        ...prev,
        [selectedContactId]: {
          ...chat,
          messages: updatedMessages
        }
      };
    });
  };

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Sidebar - Контакти */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Повідомлення</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Пошук..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContactId === contact.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                    <p className="text-xs text-gray-500 ml-2">{contact.lastMessageTime}</p>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat && selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  selectedContact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedContact.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedContact.status === 'online' ? 'Онлайн' : 'Офлайн'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <PhoneIcon className="text-gray-600" sx={{ fontSize: 22 }} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <VideocamIcon className="text-gray-600" sx={{ fontSize: 22 }} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <MoreVertIcon className="text-gray-600" sx={{ fontSize: 22 }} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions
            isMaster={isMaster}
            onMakeOffer={handleMakeOffer}
            onOfferPart={handleOfferPart}
            onNegotiate={handleNegotiate}
          />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedChat.messages.map(message => {
              // Handle proposal messages
              if (message.type === 'proposal' && message.proposalData) {
                return (
                  <div key={message.id} className="w-full">
                    <ProposalMessage
                      proposalId={message.proposalData.proposalId}
                      price={message.proposalData.price}
                      description={message.proposalData.description}
                      status={message.proposalData.status}
                      isFromMe={message.senderId === 'user'}
                      onAccept={() => handleAcceptProposal(message.id)}
                      onReject={() => handleRejectProposal(message.id)}
                    />
                  </div>
                );
              }

              // Handle negotiate messages
              if (message.type === 'negotiate' && message.negotiateData) {
                return (
                  <div key={message.id} className="w-full">
                    <NegotiateMessage
                      currentPrice={message.negotiateData.currentPrice}
                      newPrice={message.negotiateData.newPrice}
                      message={message.negotiateData.message}
                      isFromMe={message.senderId === 'user'}
                      onAccept={() => {}}
                      onCounter={() => {}}
                    />
                  </div>
                );
              }

              // Default text messages
              return (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.senderId === 'user' && (
                        <div className="flex items-center">
                          {message.read ? (
                            <DoneAllIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
                          ) : (
                            <CheckIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Напишіть повідомлення..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center"
              >
                <SendIcon sx={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty state when no chat selected
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Оберіть чат</h3>
            <p className="text-gray-500">Виберіть контакт для початку розмови</p>
          </div>
        </div>
      )}

      {/* Proposal Modal */}
      <ProposalModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        onSubmit={handleSubmitProposal}
        isMaster={isMaster}
      />
    </div>
  );
}

