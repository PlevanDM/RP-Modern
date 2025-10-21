// src/components/features/ai/JarvisChat.tsx

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const JarvisChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'jarvis'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { sender: 'user' as const, text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate Jarvis response
    setTimeout(() => {
      setMessages([...newMessages, { sender: 'jarvis' as const, text: 'Я анализирую ваш вопрос...' }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <MessageCircle />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
      <header className="p-4 bg-gray-100 rounded-t-2xl flex justify-between items-center border-b">
        <h3 className="text-lg font-bold text-gray-800">JARVIS Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
          <X />
        </button>
      </header>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Спросите что-нибудь..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
