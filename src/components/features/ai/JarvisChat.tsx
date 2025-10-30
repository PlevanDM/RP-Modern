// src/components/features/ai/JarvisChat.tsx

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Brain, Sparkles, Loader2, HelpCircle, Mic, MicOff, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, User } from '../../../types';

interface Message {
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: Date;
  context?: string;
}

interface JarvisChatProps {
  onCreateOrder?: (orderData: Partial<Order>) => void;
  onSearchMasters?: (query: string) => void;
  currentUser?: User;
  isCollapsed?: boolean;
}

interface ProblemFormData {
  deviceType: 'smartphone' | 'tablet' | 'laptop' | 'other' | '';
  brand: string;
  model: string;
  issue: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  isFormComplete: boolean;
}

const DEVICE_BRANDS = {
  smartphone: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'OPPO', 'Vivo', 'Google', 'Realme', 'Motorola'],
  tablet: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Lenovo', 'Amazon'],
  laptop: ['Apple', 'ASUS', 'HP', 'Dell', 'Lenovo', 'Acer', 'MSI', 'Samsung'],
  other: ['Apple', 'Samsung', 'Sony', 'LG', 'Other']
};

const COMMON_ISSUES = [
  'Розбитий екран',
  'Не працює батарея',
  'Не заряджається',
  'Проблема з камерою',
  'Не вмикається',
  'Потрапила вода',
  'Не працює сенсор',
  'Проблема з динаміком',
  'Глючить / зависає',
  'Інша проблема'
];

export const JarvisChat: React.FC<JarvisChatProps> = ({ onCreateOrder, onSearchMasters: _, currentUser, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormMode, setIsFormMode] = useState(true);
  const [formData, setFormData] = useState<ProblemFormData>({
    deviceType: '',
    brand: '',
    model: '',
    issue: '',
    description: '',
    urgency: 'medium',
    isFormComplete: false
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Перевірка чи форма заповнена
  useEffect(() => {
    const isComplete = 
      formData.deviceType !== '' &&
      formData.brand !== '' &&
      formData.issue !== '' &&
      formData.description.trim() !== '';
    setFormData(prev => ({ ...prev, isFormComplete: isComplete }));
  }, [formData.deviceType, formData.brand, formData.issue, formData.description]);

  const handleFormSubmit = () => {
    if (!formData.isFormComplete) return;

    // Переходимо в режим чату з зібраною інформацією
    setIsFormMode(false);
    
    // Створюємо початкові повідомлення з контекстом
    const deviceInfo = `${formData.brand}${formData.model ? ' ' + formData.model : ''}`;
    const welcomeMessage = `🔧 Привіт! Я Джарвіс - твій AI помічник! 🛠️\n\n✅ Зібрав інформацію:\n📱 Пристрій: ${deviceInfo}\n🔧 Проблема: ${formData.issue}\n📝 Опис: ${formData.description}\n\nЩо далі? Можу:\n🎯 Створити замовлення\n🔍 Знайти майстрів\n💰 Підказати орієнтовну ціну\n\nЗапитай що потрібно!`;

    setMessages([
      { 
        sender: 'jarvis', 
        text: welcomeMessage, 
        timestamp: new Date(),
        context: JSON.stringify(formData)
      }
    ]);

    // Якщо є onCreateOrder - автоматично пропонуємо створити замовлення
    if (onCreateOrder && currentUser?.role === 'client') {
      setTimeout(() => {
        const orderData = {
          title: `${deviceInfo} - ${formData.issue}`,
          device: deviceInfo,
          deviceType: formData.deviceType,
          issue: formData.issue,
          description: formData.description,
          urgency: formData.urgency,
          clientId: currentUser.id,
          clientName: currentUser.name,
          city: currentUser.city || 'Київ',
          status: 'open' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          proposalCount: 0,
          clientPhone: currentUser.phone || '',
          clientEmail: currentUser.email || ''
        };
        
        setMessages(prev => [...prev, {
          sender: 'jarvis',
          text: '✅ Я підготував замовлення! Натисни кнопку нижче, щоб створити його, або продовж спілкування.',
          timestamp: new Date()
        }]);

        // Зберігаємо для можливості створення
        (window as any).jarvisOrderData = orderData;
      }, 1000);
    }
  };

  const handleCreateOrder = () => {
    const orderData = (window as any).jarvisOrderData;
    if (orderData && onCreateOrder && currentUser?.role === 'client') {
      onCreateOrder(orderData);
      setMessages(prev => [...prev, {
        sender: 'jarvis',
        text: '✅ Замовлення створено! Зараз шукаю підходящих майстрів...',
        timestamp: new Date()
      }]);
      delete (window as any).jarvisOrderData;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isThinking) return;

    const userMessage: Message = { 
      sender: 'user', 
      text: inputValue, 
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Імітація відповіді AI
    setTimeout(() => {
      const lowerText = inputValue.toLowerCase();
      let response = '';

      if (lowerText.includes('створити') || lowerText.includes('замовлення') || lowerText.includes('створи')) {
        if ((window as any).jarvisOrderData && onCreateOrder && currentUser?.role === 'client') {
          handleCreateOrder();
          response = '✅ Замовлення створено успішно!';
        } else {
          response = 'Зверніть увагу: щоб створити замовлення, спочатку заповніть форму з інформацією про проблему.';
        }
      } else if (lowerText.includes('ціна') || lowerText.includes('вартість') || lowerText.includes('коштує')) {
        response = '💰 Орієнтовна вартість залежить від пристрою та проблеми:\n\n• Заміна екрану: 30-100 $\n• Заміна батареї: 20-50 $\n• Ремонт камери: 25-60 $\n• Заміна порту: 15-40 $\n\nТочну ціну підкаже майстер після діагностики!';
      } else if (lowerText.includes('майстр') || lowerText.includes('знайти')) {
        response = '🔍 Я знайду найкращих майстрів для вашого пристрою в вашому місті. Створіть замовлення, і майстри самі запропонують свої послуги!';
      } else {
        response = `Розумію! ${formData.description ? `Судячи з вашого опису "${formData.description}", ` : ''}найкраще створити замовлення, щоб отримати пропозиції від майстрів. Можу допомогти створити замовлення зараз!`;
      }

      setMessages(prev => [...prev, { 
        sender: 'jarvis', 
        text: response, 
        timestamp: new Date()
      }]);
      setIsThinking(false);
    }, 1500);
  };

  const resetForm = () => {
    setIsFormMode(true);
    setFormData({
      deviceType: '',
      brand: '',
      model: '',
      issue: '',
      description: '',
      urgency: 'medium',
      isFormComplete: false
    });
    setMessages([]);
    delete (window as any).jarvisOrderData;
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className增="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 group"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-4 h-4" />
        </motion.div>
        {!isCollapsed && (
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-semibold text-sm">JARVIS AI</span>
          </div>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-6 left-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-50"
    >
      <header className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Brain className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-white">JARVIS AI</h3>
            <p className="text-xs text-blue-100">
              {isFormMode ? 'Заповніть форму' : 'Ваш помічник'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isFormMode && (
            <button
              onClick={resetForm}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-colors text-xs"
              title="Почати спочатку"
            >
              Скинути
            </button>
          )}
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {isFormMode ? (
        /* ФОРМА ЗБОРУ ІНФОРМАЦІЇ */
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="space-y-4">
            {/* Тип пристрою */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1. Тип пристрою *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['smartphone', 'tablet', 'laptop', 'other'] as const).map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, deviceType: type, brand: '', model: '' }));
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.deviceType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm capitalize">
                      {type === 'smartphone' ? '📱 Смартфон' : 
                       type === 'tablet' ? '📱 Планшет' : 
                       type === 'laptop' ? '💻 Ноутбук' : '⚙️ Інше'}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Бренд */}
            {formData.deviceType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2. Бренд *
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value, model: '' }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Оберіть бренд</option>
                  {DEVICE_BRANDS[formData.deviceType].map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Модель (опціонально) */}
            {formData.brand && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  3. Модель (необов'язково)
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="Наприклад: iPhone 13 Pro, Galaxy S24"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Проблема */}
            {formData.brand && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  4. Що сталося? *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_ISSUES.map((issue) => (
                    <motion.button
                      key={issue}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, issue }))}
                      className={`p-2 rounded-lg border-2 text-xs transition-all ${
                        formData.issue === issue
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {issue}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Опис */}
            {formData.issue && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  5. Детальний опис *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Опишіть детальніше, що сталося, коли це сталося, чи були якісь передумови..."
                  rows={4}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            )}

            {/* Терміновість */}
            {formData.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  6. Терміновість
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((urgency) => (
                    <motion.button
                      key={urgency}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, urgency }))}
                      className={`flex-1 p-2 rounded-lg border-2 text-sm transition-all ${
                        formData.urgency === urgency
                          ? urgency === 'high'
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : urgency === 'medium'
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {urgency === 'high' ? '🔴 Терміново' : 
                       urgency === 'medium' ? '🟡 Звичайно' : 
                       '🟢 Не терміново'}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопка продовжити */}
            {formData.isFormComplete && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFormSubmit}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Продовжити в чат</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        /* РЕЖИМ ЧАТУ */
        <>
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={`${msg.timestamp.getTime()}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Кнопка створення замовлення */}
            {(window as any).jarvisOrderData && currentUser?.role === 'client' && onCreateOrder && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateOrder}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold hover:shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>✅ Створити замовлення</span>
                </motion.button>
              </motion.div>
            )}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-gray-100 p-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                  <span className="text-gray-600 text-sm">Джарвіс друкує...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Задайте питання..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-2xl hover:shadow-lg shadow-blue-500/50"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};