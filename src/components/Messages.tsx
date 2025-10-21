import { useState, useMemo, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

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
}

import { User } from '../types/models';

interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
}

interface MessagesProps {
  selectedMaster?: User;
}

const mockContacts: Contact[] = [
  {
    id: 'master1',
    name: 'Олександр Петренко',
    avatar: 'https://i.pravatar.cc/96?img=4',
    status: 'online',
    lastMessage: 'Можу почати завтра о 10:00',
    lastMessageTime: '10:30',
    unreadCount: 0
  },
  {
    id: 'master2',
    name: 'Марія Коваленко',
    avatar: 'https://i.pravatar.cc/96?img=5',
    status: 'online',
    lastMessage: 'Батарея готова! Можете забирати.',
    lastMessageTime: '16:12',
    unreadCount: 0
  },
  {
    id: 'master3',
    name: 'Ігор Мельник',
    avatar: 'https://i.pravatar.cc/96?img=6',
    status: 'online',
    lastMessage: 'MacBook готовий до видачі',
    lastMessageTime: '16:11',
    unreadCount: 0
  },
  {
    id: 'master4',
    name: 'Тарас Бандера',
    avatar: 'https://i.pravatar.cc/96?img=7',
    status: 'offline',
    lastMessage: 'iPad відремонтований',
    lastMessageTime: '16:12',
    unreadCount: 0
  },
  {
    id: 'master5',
    name: 'Оксана Петренко',
    avatar: 'https://i.pravatar.cc/96?img=8',
    status: 'online',
    lastMessage: 'Добро пожаловать! Чем могу помочь?',
    lastMessageTime: '15:30',
    unreadCount: 0
  },
  {
    id: 'master6',
    name: 'Андрій Павленко',
    avatar: 'https://i.pravatar.cc/96?img=9',
    status: 'offline',
    lastMessage: 'Професійний ремонт - моя спеціалізація',
    lastMessageTime: '14:45',
    unreadCount: 0
  }
];

const mockChats: Record<string, Chat> = {
  'master1': {
    id: 'master1',
    contactId: 'master1',
    messages: [
      { id: '1', senderId: 'user', text: 'Привіт! Можеш сьогодні переглянути мій iPhone?', timestamp: '10:15', read: true },
      { id: '2', senderId: 'master1', text: 'Привіт! Так, звісно можу', timestamp: '10:20', read: true },
      { id: '3', senderId: 'master1', text: 'Можу почати завтра о 10:00', timestamp: '10:30', read: true }
    ]
  },
  'master2': {
    id: 'master2',
    contactId: 'master2',
    messages: [
      { id: '1', senderId: 'user', text: 'Замовляю заміну батареї', timestamp: '09:00', read: true },
      { id: '2', senderId: 'master2', text: 'Добре! Коли зможете приїхати?', timestamp: '09:15', read: true },
      { id: '3', senderId: 'master2', text: 'Батарея готова! Можете забирати.', timestamp: '16:12', read: true }
    ]
  },
  'master3': {
    id: 'master3',
    contactId: 'master3',
    messages: [
      { id: '1', senderId: 'user', text: 'MacBook не включається', timestamp: '12:00', read: true },
      { id: '2', senderId: 'master3', text: 'Можу подивитися', timestamp: '12:15', read: true },
      { id: '3', senderId: 'master3', text: 'MacBook готовий до видачі', timestamp: '16:11', read: true }
    ]
  },
  'master4': {
    id: 'master4',
    contactId: 'master4',
    messages: [
      { id: '1', senderId: 'user', text: 'iPad потрібен ремонт екрану', timestamp: '11:00', read: true },
      { id: '2', senderId: 'master4', text: 'Приїжджайте до мене', timestamp: '11:30', read: true },
      { id: '3', senderId: 'master4', text: 'iPad відремонтований', timestamp: '16:12', read: true }
    ]
  },
  'master5': {
    id: 'master5',
    contactId: 'master5',
    messages: [
      { id: '1', senderId: 'master5', text: 'Добро пожаловать! Чем могу помочь?', timestamp: '15:30', read: true }
    ]
  },
  'master6': {
    id: 'master6',
    contactId: 'master6',
    messages: [
      { id: '1', senderId: 'master6', text: 'Професійний ремонт - моя спеціалізація', timestamp: '14:45', read: true }
    ]
  }
};

export function Messages({ selectedMaster }: MessagesProps) {
  const [selectedContactId, setSelectedContactId] = useState(mockContacts[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [chats, setChats] = useState(mockChats);
  const [contacts, setContacts] = useState(mockContacts);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const selectedChat = chats[selectedContactId];
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      read: true
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
      {selectedChat && selectedContact && (
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedChat.messages.map(message => (
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
            ))}
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
      )}
    </div>
  );
}