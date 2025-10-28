// src/components/features/ai/JarvisChat.tsx

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Brain, Sparkles, Loader2, HelpCircle, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: Date;
  context?: string;
}

import { Order, User } from '../../../../types';

interface JarvisChatProps {
  onCreateOrder?: (orderData: Partial<Order>) => void;
  onSearchMasters?: (query: string) => void;
  currentUser?: User;
}

export const JarvisChat: React.FC<JarvisChatProps> = ({ onCreateOrder, onSearchMasters: _, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getWelcomeMessage = () => {
    if (currentUser?.role === 'master') {
      return '🔧 Привіт, Майстер! Я Джарвіс - твій AI помічник! 🛠️\n\nМожу:\n🎯 Допомогти з пропозиціями\n🔍 Знайти замовлення\n💰 Підказувати ціни\n📊 Аналізувати ринок\n\nЯк можу допомогти?';
    }
    return '🔧 Привіт! Я Джарвіс - твій AI помічник з ремонту пристроїв! 🛠️\n\nМожу:\n🎯 Аналізувати проблему\n🔍 Шукати майстрів\n📝 Створювати замовлення\n💰 Підказувати ціни\n\nОпишіть проблему з пристроєм!';
  };
  
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'jarvis', text: getWelcomeMessage(), timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [conversationContext, setConversationContext] = useState<string>('');
  const [suggestedOrder, setSuggestedOrder] = useState<Partial<Order> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'uk-UA';
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      setVoiceSupported(true);
    }
  }, []);

  // Швидкі підказки
  const quickActions = [
    'Ремонт iPhone',
    'Ремонт Android',
    'Ремонт ноутбука',
    'Заміна екрана',
    'Заміна батареї',
    'Діагностика',
    'Як обрати майстра?',
    'Ціни на ремонт'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Розумніша логіка відповідей
  // const findResponse - логіка перенесена до analyzeProblem

  // Розумний аналіз проблеми з підтримкою всіх мов та скорочень
  const analyzeProblem = React.useCallback((problemDescription: string) => {
    const lowerText = problemDescription.toLowerCase();
    
    // Збираємо всю інформацію з повідомлень для контексту
    const allMessages = messages.map(m => m.text).join(' ').toLowerCase() + ' ' + lowerText;
    
    const analysis = {
      device: '',
      deviceModel: '',
      issue: '',
      deviceType: 'Other',
      urgency: 'medium' as 'low' | 'medium' | 'high',
      budget: 50,
      description: conversationContext ? `${conversationContext}\n${problemDescription}` : problemDescription
    };

    // Розширений список розпізнавання пристроїв
    const deviceKeywords = {
      iphone: ['iphone', 'айфон', 'айфон', 'іфон', 'iphone', 'apple phone', 'apple'],
      ipad: ['ipad', 'айпад', 'іпад', 'таблет'],
      android: ['android', 'андроід', 'андроїд', 'samsung', 'самсунг', 'xiaomi', 'xiaomi', 'redmi', 'huawei', 'oneplus', 'oppo', 'vivo'],
      laptop: ['ноутбук', 'laptop', 'macbook', 'asus', 'acer', 'lenovo', 'dell', 'hp'],
      pc: ['комп\'ютер', 'desktop', 'пк']
    };

    // Нормалізація тексту для розпізнавання
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/ё/gi, 'е')
        .replace(/ъ/gi, 'ь')
        .replace(/’/gi, '')
        .replace(/\s+/g, ' ');
    };

    const normalized = normalizeText(allMessages);

    // Визначаємо пристрій (СПОЧАТКУ Android бренди!)
    if (deviceKeywords.android.some(kw => normalized.includes(kw))) {
      // Визначаємо конкретний Android бренд та модель
      if (normalized.includes('samsung') || normalized.includes('самсунг') || normalized.includes('с23')) {
        analysis.deviceType = 'Android';
        
        // Моделі Samsung (спочатку перевіряємо конкретні моделі з числами)
        const samsungModels = [
          { name: 'S23 Ultra', keywords: ['s23 ultra', 'с23 ультра', 's23u', 'с23ультра'] },
          { name: 'S23 Plus', keywords: ['s23 plus', 'с23 плюс', 'с23плюс'] },
          { name: 'S23', keywords: ['s23', 'с23', 'с 23', 's 23'] },
          { name: 'S24 Ultra', keywords: ['s24 ultra', 'с24 ультра', 's24u'] },
          { name: 'S24 Plus', keywords: ['s24 plus', 'с24 плюс'] },
          { name: 'S24', keywords: ['s24', 'с24'] },
          { name: 'S22 Ultra', keywords: ['s22 ultra', 'с22 ультра', 's22u'] },
          { name: 'S22 Plus', keywords: ['s22 plus', 'с22 плюс'] },
          { name: 'S22', keywords: ['s22', 'с22'] },
          { name: 'S21 Ultra', keywords: ['s21 ultra', 'с21 ультра', 's21u'] },
          { name: 'S21 Plus', keywords: ['s21 plus', 'с21 плюс'] },
          { name: 'S21', keywords: ['s21', 'с21'] },
          { name: 'S20', keywords: ['s20', 'с20'] },
          { name: 'A73', keywords: ['a73', 'а73'] },
          { name: 'A53', keywords: ['a53', 'а53'] },
          { name: 'A33', keywords: ['a33', 'а33'] },
          { name: 'Note 20', keywords: ['note 20', 'ноут 20'] },
          { name: 'Note 10', keywords: ['note 10', 'ноут 10'] }
        ];
        
        let modelFound = false;
        for (const model of samsungModels) {
          if (model.keywords.some(kw => normalized.includes(kw))) {
            analysis.device = `Samsung ${model.name}`;
            modelFound = true;
            break;
          }
        }
        
        if (!modelFound) {
          analysis.device = 'Samsung';
        }
      } else if (normalized.includes('xiaomi') || normalized.includes('xiaomi') || normalized.includes('redmi') || normalized.includes('редмі')) {
        analysis.deviceType = 'Android';
        const xiaomiModels = [
          { name: '13 Pro', keywords: ['13 pro', '13 про'] },
          { name: '13', keywords: ['13'] },
          { name: '12 Pro', keywords: ['12 pro', '12 про'] },
          { name: '12', keywords: ['12'] },
          { name: '11T Pro', keywords: ['11t pro', '11t про'] },
          { name: '11T', keywords: ['11t'] }
        ];
        
        let modelFound = false;
        for (const model of xiaomiModels) {
          if (model.keywords.some(kw => normalized.includes(kw))) {
            analysis.device = `Xiaomi ${model.name}`;
            modelFound = true;
            break;
          }
        }
        
        if (!modelFound) {
          analysis.device = 'Xiaomi';
        }
      } else if (normalized.includes('huawei') || normalized.includes('хуавей') || normalized.includes('honor') || normalized.includes('хомор')) {
        analysis.device = 'Huawei';
        analysis.deviceType = 'Android';
      } else if (normalized.includes('oneplus') || normalized.includes('ванплюс')) {
        analysis.device = 'OnePlus';
        analysis.deviceType = 'Android';
      } else if (normalized.includes('oppo') || normalized.includes('оппо')) {
        analysis.device = 'OPPO';
        analysis.deviceType = 'Android';
      } else if (normalized.includes('vivo') || normalized.includes('виво')) {
        analysis.device = 'Vivo';
        analysis.deviceType = 'Android';
      } else {
        analysis.device = 'Android телефон';
        analysis.deviceType = 'Android';
      }
    } else if (deviceKeywords.iphone.some(kw => normalized.includes(kw))) {
      analysis.device = 'iPhone';
      analysis.deviceType = 'iPhone';
      
      // Визначаємо модель (з всіма варіантами)
      const models = [
        { name: '15 Pro Max', keywords: ['15 pro max', '15 промакс', '15 promax'] },
        { name: '15 Pro', keywords: ['15 pro', '15 про'] },
        { name: '15 Plus', keywords: ['15 plus', '15 плюс'] },
        { name: '15', keywords: ['15'] },
        { name: '14 Pro Max', keywords: ['14 pro max', '14 промакс', '14 promax'] },
        { name: '14 Pro', keywords: ['14 pro', '14 про'] },
        { name: '14 Plus', keywords: ['14 plus', '14 плюс'] },
        { name: '14', keywords: ['14'] },
        { name: '13 Pro Max', keywords: ['13 pro max', '13 промакс', '13 promax'] },
        { name: '13 Pro', keywords: ['13 pro', '13 про'] },
        { name: '13 Mini', keywords: ['13 mini', '13 міні'] },
        { name: '13', keywords: ['13'] },
        { name: '12 Pro Max', keywords: ['12 pro max', '12 промакс'] },
        { name: '12 Pro', keywords: ['12 pro', '12 про'] },
        { name: '12', keywords: ['12'] },
        { name: '11 Pro Max', keywords: ['11 pro max', '11 промакс'] },
        { name: '11 Pro', keywords: ['11 pro', '11 про'] },
        { name: '11', keywords: ['11'] },
        { name: 'XR', keywords: ['xr'] },
        { name: 'XS Max', keywords: ['xs max', 'xs макс'] },
        { name: 'XS', keywords: ['xs'] },
        { name: 'X', keywords: ['x', 'ікс'] },
        { name: 'SE', keywords: ['se'] }
      ];

      for (const model of models) {
        if (model.keywords.some(kw => normalized.includes(kw))) {
          analysis.device = `iPhone ${model.name}`;
          analysis.deviceModel = model.name;
          break;
        }
      }
    } else if (deviceKeywords.ipad.some(kw => normalized.includes(kw))) {
      analysis.device = 'iPad';
      analysis.deviceType = 'iPhone';
    } else if (deviceKeywords.laptop.some(kw => normalized.includes(kw))) {
      analysis.device = 'Ноутбук';
      analysis.deviceType = 'Other';
    } else {
      analysis.device = 'Пристрій';
    }

    // Розширений список розпізнавання проблем
    const issueKeywords = {
      screen: ['екран', 'screen', 'дисплей', 'display', 'разбит', 'розбився', 'треснув', 'cracked', 'display', 'матриця', 'матрица'],
      battery: ['батарея', 'battery', 'заміна батареї', 'батарейка', 'батарей', 'розряд', 'не держить', 'заряд', 'charge', 'рідко ходить', 'швидко розряджається'],
      camera: ['камера', 'camera', 'фото', 'відео', 'не працює камера', 'camera broken', 'не фокусує'],
      charging: ['зарядка', 'charging', 'порт', 'порт', 'не заряжає', 'не заряджає', 'підключити', 'cable', 'кабель'],
      touch: ['сенсор', 'touch', 'не реагує', 'не працює екран', 'touch screen', 'кнопки'],
      power: ['не вмикається', 'не включается', 'не працює', 'not working', 'power', 'живлення', 'ne включается', 'не вклюается'],
      water: ['вода', 'water', 'потрапила вода', 'намок', 'moisture', 'промок'],
      speaker: ['динамік', 'speaker', 'sound', 'звук', 'не чути'],
      mic: ['мікрофон', 'microphone', 'не чути'],
      button: ['кнопка', 'button', 'home', 'power', 'volume'],
      software: ['глючить', 'висить', 'програмне', 'software', 'update', 'оновая версия']
    };

    // Визначаємо проблему з урахуванням всіх синонімів
    if (issueKeywords.screen.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Пошкодження екрану';
      analysis.budget = 40;
    } else if (issueKeywords.battery.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Заміна батареї';
      analysis.budget = 30;
    } else if (issueKeywords.camera.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Камера';
      analysis.budget = 35;
    } else if (issueKeywords.charging.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Проблема з заряджанням';
      analysis.budget = 25;
    } else if (issueKeywords.touch.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Проблема з сенсором';
      analysis.budget = 35;
    } else if (issueKeywords.power.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Пристрій не вмикається';
      analysis.budget = 0;
    } else if (issueKeywords.water.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Пошкодження від води';
      analysis.budget = 50;
    } else if (issueKeywords.speaker.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Динамік';
      analysis.budget = 20;
    } else if (issueKeywords.mic.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Мікрофон';
      analysis.budget = 20;
    } else if (issueKeywords.button.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Кнопки';
      analysis.budget = 20;
    } else if (issueKeywords.software.some(kw => normalized.includes(kw))) {
      analysis.issue = 'Програмне забезпечення';
      analysis.budget = 30;
    } else {
      analysis.issue = 'Діагностика потрібна';
      analysis.budget = 0;
    }

    // Визначаємо терміновість (всі мови)
    const urgentKeywords = ['терміново', 'urgent', 'urgent', 'швидко', 'quickly', 'скоріше', 'asap', 'скоро', 'skoro'];
    const lowKeywords = ['не терміново', 'може зачекати', 'not urgent', 'не екстренно', 'не екстренно'];

    if (urgentKeywords.some(kw => normalized.includes(kw))) {
      analysis.urgency = 'high' as const;
    } else if (lowKeywords.some(kw => normalized.includes(kw))) {
      analysis.urgency = 'low' as const;
    }

      return analysis;
  }, [messages, conversationContext]);

  const handleVoiceInput = () => {
    if (!voiceSupported || !recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Voice recognition error:', e);
        setIsListening(false);
      }
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isThinking) return;

    const userMessage: Message = { 
      sender: 'user', 
      text: inputValue, 
      timestamp: new Date(),
      context: conversationContext 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Аналізуємо проблему
    const analysis = analyzeProblem(inputValue);
    
    // Оновлюємо контекст
    setConversationContext(inputValue);
    
    setInputValue('');
    setIsThinking(true);

    // Імітація обробки
    setTimeout(() => {
      // Аналізую проблему
      const hasProblem = analysis.device && analysis.issue !== 'Діагностика потрібна';
      
      let response = '';
      
      if (hasProblem) {
        // Якщо є проблема - робимо розумний аналіз
        response = `🎯 Розумію вашу проблему!\n\n📱 Пристрій: ${analysis.device}\n🔧 Проблема: ${analysis.issue}\n💰 Орієнтовна вартість: ${analysis.budget}$\n\n✅ Хочете створити замовлення? Я запропоную відповідних майстрів!`;
        
        // Зберігаємо аналіз для створення замовлення
        setSuggestedOrder({
          title: `${analysis.device} - ${analysis.issue}`,
          device: analysis.device,
          deviceType: analysis.deviceType,
          issue: analysis.issue,
          description: analysis.description,
          budget: analysis.budget,
          urgency: analysis.urgency,
          city: currentUser?.city || 'Київ'
        });
      } else {
        // Якщо немає достатньої інформації - питаємо деталі
        response = `🔍 Зрозумів. Для швидкої допомоги мені потрібно знати:\n\n• Який пристрій? (iPhone, Android, ноутбук)\n• Що саме не працює? (екран, батарея, зарядка, камера)\n• Яка модель? (наприклад: iPhone 13 Pro)\n\nСпробуйте описати детальніше, а я створю замовлення!`;
      }
      
      setMessages(prev => [...prev, { 
        sender: 'jarvis', 
        text: response, 
        timestamp: new Date(),
        context: userMessage.text
      }]);
      setIsThinking(false);
    }, 1500);
  };

  const handleCreateOrder = () => {
    // Тільки клієнти можуть створювати замовлення
    if (currentUser?.role !== 'client') {
      setMessages(prev => [...prev, { 
        sender: 'jarvis', 
        text: '❌ Вибачте, але майстри не можуть створювати замовлення. Ви можете тільки подавати пропозиції до існуючих замовлень.',
        timestamp: new Date()
      }]);
      return;
    }
    
    if (suggestedOrder && onCreateOrder && currentUser) {
      const orderData = {
        title: suggestedOrder.title,
        description: suggestedOrder.description,
        device: suggestedOrder.device,
        deviceType: suggestedOrder.deviceType,
        issue: suggestedOrder.issue,
        budget: suggestedOrder.budget,
        urgency: suggestedOrder.urgency,
        clientId: currentUser.id,
        clientName: currentUser.name,
        city: suggestedOrder.city,
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
        proposalCount: 0,
        clientPhone: currentUser.phone || '',
        clientEmail: currentUser.email || ''
      };
      
      onCreateOrder(orderData);
      setSuggestedOrder(null);
      
      // Додаємо підтвердження в чат
      setMessages(prev => [...prev, { 
        sender: 'jarvis', 
        text: '✅ Замовлення створено! Зараз шукаю підходящих майстрів...',
        timestamp: new Date()
      }]);
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 group"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-4 h-4" />
        </motion.div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="font-semibold text-sm">JARVIS</span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      className="fixed bottom-6 left-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-50"
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
            <p className="text-xs text-blue-100">Ваш помічник</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

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
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Кнопка створення замовлення якщо є запропоноване - ТІЛЬКИ ДЛЯ КЛІЄНТІВ */}
        {suggestedOrder && currentUser?.role === 'client' && (
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
        <div className="flex space-x-2 mb-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Задайте питання..."
              className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {voiceSupported && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleVoiceInput}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </motion.button>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-2xl hover:shadow-lg shadow-blue-500/50"
          >
            <Send size={20} />
          </motion.button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {quickActions.map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInputValue(action)}
              className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {action}
            </motion.button>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          <HelpCircle className="w-3 h-3 inline mr-1" />
          Press Enter to send
        </p>
      </div>
    </motion.div>
  );
};
