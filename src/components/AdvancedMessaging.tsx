import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send,
  Paperclip,
  FileText,
  Video,
  Smile,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  ArrowRight,
  X,
  Phone
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'proposal' | 'estimate' | 'system';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions: { emoji: string; userId: string; timestamp: Date }[];
  isEdited?: boolean;
  editedAt?: Date;
  replyTo?: string;
  attachments?: {
    type: 'image' | 'file' | 'video' | 'audio';
    url: string;
    name: string;
    size: number;
  }[];
  proposalData?: {
    price: number;
    estimatedTime: string;
    description: string;
    conditions: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
}

interface AdvancedMessagingProps {
  currentUser: any;
  otherUser: any;
  orderId?: string;
  onClose?: () => void;
}

export const AdvancedMessaging: React.FC<AdvancedMessagingProps> = ({
  currentUser,
  otherUser,
  orderId,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: 'msg_1',
        senderId: otherUser.id,
        senderName: otherUser.name,
        senderAvatar: otherUser.avatar,
        receiverId: currentUser.id,
        content: 'Привет! Я вижу ваш заказ на ремонт iPhone. Могу помочь!',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'read',
        reactions: []
      },
      {
        id: 'msg_2',
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        receiverId: otherUser.id,
        content: 'Отлично! Когда сможете посмотреть устройство?',
        type: 'text',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        status: 'read',
        reactions: []
      },
      {
        id: 'msg_3',
        senderId: otherUser.id,
        senderName: otherUser.name,
        senderAvatar: otherUser.avatar,
        receiverId: currentUser.id,
        content: 'Могу завтра утром. Вот мое предложение:',
        type: 'text',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'read',
        reactions: []
      },
      {
        id: 'msg_4',
        senderId: otherUser.id,
        senderName: otherUser.name,
        senderAvatar: otherUser.avatar,
        receiverId: currentUser.id,
        content: 'Предложение по ремонту',
        type: 'proposal',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: 'read',
        reactions: [],
        proposalData: {
          price: 8000,
          estimatedTime: '2-3 дня',
          description: 'Замена экрана iPhone 15 Pro с оригинальной деталью',
          conditions: 'Гарантия 6 месяцев, бесплатная диагностика',
          status: 'pending'
        }
      },
      {
        id: 'msg_5',
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        receiverId: otherUser.id,
        content: 'Фото повреждения',
        type: 'image',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: 'read',
        reactions: [],
        attachments: [
          {
            type: 'image',
            url: '/api/images/damage1.jpg',
            name: 'damage1.jpg',
            size: 1024000
          }
        ]
      }
    ];
    
    setMessages(mockMessages);
  }, [currentUser, otherUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: otherUser.id,
      content: newMessage,
      type: 'text',
      timestamp: new Date(),
      status: 'sent',
      reactions: [],
      replyTo: replyingTo?.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const message: Message = {
        id: `msg_${Date.now()}_${Math.random()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        receiverId: otherUser.id,
        content: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        timestamp: new Date(),
        status: 'sent',
        reactions: [],
        attachments: [{
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        }]
      };

      setMessages(prev => [...prev, message]);
    });
  };

  const handleSendProposal = (proposalData: any) => {
    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: otherUser.id,
      content: 'Предложение по ремонту',
      type: 'proposal',
      timestamp: new Date(),
      status: 'sent',
      reactions: [],
      proposalData: {
        ...proposalData,
        status: 'pending'
      }
    };

    setMessages(prev => [...prev, message]);
    setShowProposalForm(false);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.userId === currentUser.id && r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.filter(r => !(r.userId === currentUser.id && r.emoji === emoji))
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, userId: currentUser.id, timestamp: new Date() }]
          };
        }
      }
      return msg;
    }));
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: newContent, isEdited: true, editedAt: new Date() }
        : msg
    ));
    setEditingMessage(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getReactionCount = (message: Message, emoji: string) => {
    return message.reactions.filter(r => r.emoji === emoji).length;
  };

  const hasUserReacted = (message: Message, emoji: string) => {
    return message.reactions.some(r => r.userId === currentUser.id && r.emoji === emoji);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{otherUser.name}</h3>
              <p className="text-sm text-blue-100">Онлайн</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            {onClose && (
              <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === currentUser.id;
          const repliedMessage = replyingTo ? messages.find(m => m.id === replyingTo.id) : null;
          
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                {/* Reply indicator */}
                {message.replyTo && repliedMessage && (
                  <div className={`mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm ${isOwn ? 'ml-auto' : 'mr-auto'}`}>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ответ на: {repliedMessage.content.substring(0, 50)}...
                    </p>
                  </div>
                )}

                <div className={`flex items-start space-x-2 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {!isOwn && (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  
                  <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                    {!isOwn && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {message.senderName}
                      </p>
                    )}
                    
                    <div className={`relative group ${isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'} rounded-lg p-3`}>
                      {/* Message content */}
                      {message.type === 'text' && (
                        <p className="text-sm">{message.content}</p>
                      )}
                      
                      {message.type === 'image' && message.attachments && (
                        <div className="space-y-2">
                          <img
                            src={message.attachments[0].url}
                            alt={message.attachments[0].name}
                            className="max-w-full h-auto rounded-lg"
                          />
                          <p className="text-sm">{message.content}</p>
                        </div>
                      )}
                      
                      {message.type === 'file' && message.attachments && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-600 rounded">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{message.attachments[0].name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(message.attachments[0].size)}</p>
                            </div>
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      )}
                      
                      {message.type === 'proposal' && message.proposalData && (
                        <div className="space-y-3">
                          <div className="p-3 bg-white dark:bg-gray-600 rounded-lg">
                            <h4 className="font-semibold mb-2">Предложение по ремонту</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Цена:</span>
                                <span className="font-semibold text-green-600">₴{message.proposalData.price}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Время:</span>
                                <span className="text-sm">{message.proposalData.estimatedTime}</span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Описание:</span>
                                <p className="text-sm mt-1">{message.proposalData.description}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Условия:</span>
                                <p className="text-sm mt-1">{message.proposalData.conditions}</p>
                              </div>
                            </div>
                          </div>
                          
                          {message.proposalData.status === 'pending' && isOwn && (
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                                Принять
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                                Отклонить
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Edit indicator */}
                      {message.isEdited && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          (изменено)
                        </p>
                      )}

                      {/* Timestamp */}
                      <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {/* Reactions */}
                    {message.reactions.length > 0 && (
                      <div className={`flex flex-wrap gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        {Array.from(new Set(message.reactions.map(r => r.emoji))).map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(message.id, emoji)}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                              hasUserReacted(message, emoji)
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {emoji} {getReactionCount(message, emoji)}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Message actions */}
                    <div className={`flex items-center space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <button
                        onClick={() => handleReaction(message.id, '👍')}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleReaction(message.id, '❤️')}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => handleReaction(message.id, '😂')}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        😂
                      </button>
                      {isOwn && (
                        <>
                          <button
                            onClick={() => setEditingMessage(message)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setReplyingTo(message)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        {/* Reply indicator */}
        {replyingTo && (
          <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ответ на: {replyingTo.content.substring(0, 50)}...
              </p>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowProposalForm(true)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Напишите сообщение..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            
            {/* Emoji picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <div className="grid grid-cols-8 gap-1">
                  {['😀', '😂', '😍', '🥰', '😎', '🤔', '👍', '❤️', '🎉', '🔥', '💯', '👏'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setNewMessage(prev => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Proposal Form Modal */}
      <AnimatePresence>
        {showProposalForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full"
            >
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Отправить предложение</h2>
                  <button
                    onClick={() => setShowProposalForm(false)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Цена (₴)
                  </label>
                  <input
                    type="number"
                    placeholder="Введите цену"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Время выполнения
                  </label>
                  <input
                    type="text"
                    placeholder="Например: 2-3 дня"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Описание работы
                  </label>
                  <textarea
                    placeholder="Опишите, что будете делать..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Условия
                  </label>
                  <textarea
                    placeholder="Гарантия, условия оплаты, дополнительные услуги..."
                    rows={2}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowProposalForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleSendProposal({})}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Отправить предложение
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};