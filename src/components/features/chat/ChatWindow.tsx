import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon, X, Smile, Edit2, Trash2, Reply, Check, CheckCheck, Loader2, Download, Eye } from 'lucide-react';
import { Message, Conversation } from '../../../types/models';
import { 
  sendMessage as sendMessageService, 
  getMessages, 
  markMessageAsRead, 
  markConversationAsRead,
  editMessage, 
  deleteMessage, 
  addReaction
} from '../../../services/chatService';
import { Button } from '../../ui/button';

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: string;
  currentUserName: string;
  currentUserRole: 'client' | 'master' | 'admin' | 'superadmin';
  onMessageSent?: (message: Message) => void;
  onClose?: () => void;
  isCompact?: boolean;
}

export function ChatWindow({
  conversation,
  currentUserId,
  currentUserName,
  currentUserRole,
  onMessageSent,
  onClose,
  isCompact = false,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [selectedAttachments, setSelectedAttachments] = useState<File[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const filePreviewRef = useRef<HTMLDivElement>(null);

  const otherUserId = conversation.participants.find(id => id !== currentUserId) || '';
  const otherUserName = conversation.participantNames?.[otherUserId] || 'Користувач';

  const loadMessages = useCallback(() => {
    const loadedMessages = getMessages(conversation.id);
    setMessages(loadedMessages);
    
    // Позначаємо непрочитані повідомлення як прочитані
    loadedMessages.forEach(msg => {
      if (msg.recipientId === currentUserId && !msg.read) {
        markMessageAsRead(msg.id);
      }
    });
  }, [conversation.id, currentUserId]);

  useEffect(() => {
    loadMessages();
    // Позначаємо розмову як прочитану
    markConversationAsRead(conversation.id, currentUserId);
    
    // Оновлюємо повідомлення кожні 2 секунди
    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [conversation.id, currentUserId, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if ((!inputValue.trim() && selectedPhotos.length === 0 && selectedAttachments.length === 0) || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const message = sendMessageService(
        conversation.id,
        currentUserId,
        currentUserName,
        currentUserRole,
        otherUserId,
        inputValue.trim(),
        selectedPhotos.length > 0 ? selectedPhotos : undefined,
        selectedAttachments.length > 0 ? selectedAttachments : undefined,
        replyTo?.id,
        conversation.orderId
      );

      // Очікуємо трохи для обробки файлів
      setTimeout(() => {
        setInputValue('');
        setSelectedPhotos([]);
        setSelectedAttachments([]);
        setReplyTo(null);
        setEditingMessage(null);
        loadMessages();
        setIsLoading(false);
        
        if (onMessageSent) {
          onMessageSent(message);
        }
      }, 300);
    } catch (error) {
      console.error('Помилка при відправці повідомлення:', error);
      setIsLoading(false);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedPhotos(prev => [...prev, ...imageFiles].slice(0, 10)); // Максимум 10 фото
  };

  const handleAttachmentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedAttachments(prev => [...prev, ...files].slice(0, 5)); // Максимум 5 файлів
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAttachment = (index: number) => {
    setSelectedAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (message: Message) => {
    setEditingMessage(message);
    setInputValue(message.content || message.text || '');
    setReplyTo(null);
  };

  const handleSaveEdit = async () => {
    if (!editingMessage || !inputValue.trim()) return;
    
    const success = editMessage(editingMessage.id, inputValue.trim());
    if (success) {
      setEditingMessage(null);
      setInputValue('');
      loadMessages();
    }
  };

  const handleDelete = async (messageId: string) => {
    if (confirm('Ви впевнені, що хочете видалити це повідомлення?')) {
      const success = deleteMessage(messageId, currentUserId);
      if (success) {
        loadMessages();
      }
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, currentUserId, currentUserName, emoji);
    setShowReactions(null);
    loadMessages();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getReplyMessage = (replyToId?: string): Message | undefined => {
    return messages.find(m => m.id === replyToId);
  };

  return (
    <div className={`flex flex-col ${isCompact ? 'h-96' : 'h-[600px]'} bg-white rounded-lg shadow-lg border border-gray-200`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
            {otherUserName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold">{otherUserName}</h3>
            <p className="text-xs text-blue-100">
              {conversation.orderId ? `Замовлення #${conversation.orderId.slice(-4)}` : 'Особисте повідомлення'}
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Повідомлень поки немає</p>
            <p className="text-sm mt-2">Почніть розмову!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId;
            const replyMsg = message.replyToId ? getReplyMessage(message.replyToId) : undefined;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] group ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Reply preview */}
                  {replyMsg && (
                    <div className={`mb-1 p-2 bg-gray-100 rounded-lg border-l-4 ${isOwn ? 'border-blue-500' : 'border-gray-400'} text-xs`}>
                      <p className="font-semibold">{replyMsg.senderName || 'Користувач'}</p>
                      <p className="text-gray-600 truncate">{replyMsg.content || replyMsg.text || ''}</p>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div className={`rounded-2xl px-4 py-2 ${isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {!isOwn && (
                      <p className="text-xs font-semibold mb-1 opacity-70">{message.senderName || 'Користувач'}</p>
                    )}
                    
                    {message.content || message.text ? (
                      <p className="whitespace-pre-wrap break-words">{message.content || message.text}</p>
                    ) : null}

                    {/* Photos */}
                    {message.photos && message.photos.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {message.photos.map((photo, idx) => (
                          <div key={idx} className="relative group/photo">
                            <img 
                              src={photo} 
                              alt={`Photo ${idx + 1}`} 
                              className="rounded-lg w-full h-32 object-cover cursor-pointer"
                              onClick={() => setPreviewImage(photo)}
                            />
                            <button
                              onClick={() => setPreviewImage(photo)}
                              className="absolute inset-0 bg-black/0 hover:bg-black/10 rounded-lg transition flex items-center justify-center opacity-0 group-hover/photo:opacity-100"
                            >
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {message.attachments.map((attachment) => (
                          <a
                            key={attachment.id}
                            href={attachment.url}
                            download={attachment.name}
                            className={`flex items-center gap-2 p-2 rounded-lg border ${
                              isOwn ? 'bg-blue-500/20 border-blue-400' : 'bg-gray-200 border-gray-300'
                            } hover:opacity-80 transition`}
                          >
                            {attachment.type === 'image' && <ImageIcon className="w-4 h-4" />}
                            {attachment.type === 'document' && <Download className="w-4 h-4" />}
                            <div className="flex- min-w-0">
                              <p className="text-sm font-medium truncate">{attachment.name}</p>
                              <p className="text-xs opacity-70">{formatFileSize(attachment.size)}</p>
                            </div>
                            <Download className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Object.entries(
                          message.reactions.reduce((acc, r) => {
                            if (!acc[r.emoji]) acc[r.emoji] = [];
                            acc[r.emoji].push(r);
                            return acc;
                          }, {} as Record<string, MessageReaction[]>)
                        ).map(([emoji, reactions]) => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(message.id, emoji)}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isOwn ? 'bg-blue-500/20' : 'bg-gray-200'
                            } hover:opacity-80 transition`}
                            title={reactions.map(r => r.userName).join(', ')}
                          >
                            {emoji} {reactions.length}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Edited indicator */}
                    {message.edited && (
                      <p className="text-xs opacity-50 mt-1">(відредаговано)</p>
                    )}

                    {/* Timestamp and status */}
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {isOwn && (
                        <div className="flex items-center gap-1">
                          {message.delivered ? (
                            message.read ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )
                          ) : (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message actions */}
                  {!message.deleted && (
                    <div className={`flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition ${isOwn ? 'flex-row-reverse' : ''}`}>
                      <button
                        onClick={() => setReplyTo(message)}
                        className="h-6 px-2 text-xs hover:bg-gray-100 rounded flex items-center gap-1"
                      >
                        <Reply className="w-3 h-3 mr-1" />
                        Відповісти
                      </button>
                      <button
                        onClick={() => setShowReactions(showReactions === message.id ? null : message.id)}
                        className="h-6 px-2 text-xs hover:bg-gray-100 rounded"
                      >
                        <Smile className="w-3 h-3" />
                      </button>
                      {message.senderId === currentUserId && (
                        <>
                          <button
                            onClick={() => handleEdit(message)}
                            className="h-6 px-2 text-xs hover:bg-gray-100 rounded"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(message.id)}
                            className="h-6 px-2 text-xs hover:bg-red-100 text-red-600 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Reactions popup */}
                  {showReactions === message.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bg-white rounded-lg shadow-lg p-2 flex gap-2 border border-gray-200 z-10"
                      style={{ [isOwn ? 'right' : 'left']: 0, bottom: '100%', marginBottom: '8px' }}
                    >
                      {REACTIONS.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(message.id, emoji)}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File previews */}
      {(selectedPhotos.length > 0 || selectedAttachments.length > 0) && (
        <div ref={filePreviewRef} className="px-4 py-2 border-t bg-gray-50 max-h-32 overflow-y-auto">
          {selectedPhotos.map((photo, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <img src={URL.createObjectURL(photo)} alt="Preview" className="w-12 h-12 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate">{photo.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(photo.size)}</p>
              </div>
              <button onClick={() => handleRemovePhoto(idx)} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {selectedAttachments.map((file, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                <Download className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <button onClick={() => handleRemoveAttachment(idx)} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Reply preview */}
      {replyTo && (
        <div className="px-4 py-2 border-t bg-blue-50 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-700">Відповідь на повідомлення від {replyTo.senderName}</p>
            <p className="text-xs text-gray-600 truncate">{replyTo.content || replyTo.text || ''}</p>
          </div>
          <button onClick={() => setReplyTo(null)} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Edit mode indicator */}
      {editingMessage && (
        <div className="px-4 py-2 border-t bg-yellow-50 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-yellow-700">Редагування повідомлення</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setEditingMessage(null); setInputValue(''); }} className="text-xs text-gray-600 hover:text-gray-800">
              Скасувати
            </button>
            <button onClick={handleSaveEdit} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">
              Зберегти
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={editingMessage ? 'Редагуйте повідомлення...' : 'Напишіть повідомлення...'}
              className="w-full min-h-[44px] max-h-32 resize-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoSelect}
            accept="image/*"
            multiple
            className="hidden"
          />
          <input
            type="file"
            ref={attachmentInputRef}
            onChange={handleAttachmentSelect}
            multiple
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-11"
            title="Додати фото"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => attachmentInputRef.current?.click()}
            className="h-11"
            title="Додати файл"
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleSend}
            disabled={(!inputValue.trim() && selectedPhotos.length === 0 && selectedAttachments.length === 0) || isLoading}
            className="h-11 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Image preview modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full object-contain" />
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

