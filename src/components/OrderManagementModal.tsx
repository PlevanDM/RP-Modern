import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Order, User } from '../types';
import { integrationService } from '../services/integrationService';
import { earningsService } from '../services/earningsService';
import { messagesService } from '../services/messagesService';
import { complianceService } from '../services/complianceService';
import { AdvancedMessaging } from './AdvancedMessaging';
import { InteractionTools } from './InteractionTools';
import { MasterEarningsAnalytics } from './MasterEarningsAnalytics';

interface OrderManagementModalProps {
  order: Order | null;
  client: User | null;
  master: User | null;
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

interface OrderStatus {
  stage: 'created' | 'in_progress' | 'quality_check' | 'completed' | 'disputed';
  completed: boolean;
  timestamp: Date;
  message: string;
}

export const OrderManagementModal: React.FC<OrderManagementModalProps> = ({
  order,
  client,
  master,
  currentUser,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'tools' | 'earnings' | 'compliance'>('overview');
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [qualityApproved, setQualityApproved] = useState(false);
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [chat, setChat] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && order && client && master) {
      initializeOrder();
    }
  }, [isOpen, order]);

  const initializeOrder = async () => {
    setLoading(true);
    try {
      // Ініціалізуємо замовлення через інтеграційний сервіс
      const result = integrationService.initiateOrder(order!, client!, master!, amount || 1000);

      if (result.status === 'success') {
        setChat(messagesService.getUserChats(currentUser.id).find((c) => c.id === result.chatId));

        // Додаємо початковий статус
        setOrderStatus((prev) => [
          ...prev,
          {
            stage: 'created',
            completed: true,
            timestamp: new Date(),
            message: 'Замовлення успішно створено',
          },
        ]);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Помилка при ініціалізації замовлення');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWork = () => {
    setOrderStatus((prev) => [
      ...prev,
      {
        stage: 'in_progress',
        completed: true,
        timestamp: new Date(),
        message: `${master?.fullName} розпочав роботу`,
      },
    ]);
    setShowStartConfirm(false);
  };

  const handleCompleteOrder = () => {
    if (!qualityApproved) {
      setError('Спочатку потрібно перевірити якість роботи');
      return;
    }

    const result = integrationService.completeOrderAndProcessPayment(
      order!,
      client!,
      master!,
      amount || 1000,
      qualityApproved
    );

    if (result.status === 'success') {
      setOrderStatus((prev) => [
        ...prev,
        {
          stage: 'completed',
          completed: true,
          timestamp: new Date(),
          message: result.message,
        },
      ]);
      setShowCompleteConfirm(false);
    } else {
      setError(result.message);
    }
  };

  if (!isOpen || !order || !client || !master) return null;

  const masterBalance = earningsService.getMasterBalance(master.id);
  const masterEarnings = earningsService.getMasterEarnings(master.id);
  const orderEarning = masterEarnings.find((e) => e.orderId === order.id);
  const complianceSnapshot = complianceService.getComplianceSnapshot(currentUser.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{order.title || order.device}</h2>
              <p className="text-blue-100 mt-1">ID: {order.id}</p>
              <div className="flex gap-4 mt-3">
                <div>
                  <p className="text-xs text-blue-200">Клієнт</p>
                  <p className="text-sm font-medium">{client?.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200">Мастер</p>
                  <p className="text-sm font-medium">{master?.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200">Сума</p>
                  <p className="text-sm font-medium">{amount}₴</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition"
            >
              <CloseIcon className="text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 flex bg-gray-50 overflow-x-auto">
            {[
              { id: 'overview', label: '📊 Огляд', icon: '📋' },
              { id: 'messages', label: '💬 Обговорення', icon: '💭' },
              { id: 'tools', label: '🤝 Інструменти', icon: '⚙️' },
              { id: 'earnings', label: '💰 Заробітки', icon: '💵' },
              { id: 'compliance', label: '🔐 Правова захист', icon: '⚖️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Status Timeline */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-4">📈 Статус замовлення</h3>
                  <div className="space-y-3">
                    {orderStatus.map((status, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            ✓
                          </div>
                          {i < orderStatus.length - 1 && <div className="w-1 h-8 bg-gray-300 mt-1" />}
                        </div>
                        <div className="pt-1">
                          <p className="font-medium text-gray-900">{status.message}</p>
                          <p className="text-xs text-gray-600">
                            {status.timestamp.toLocaleString('uk-UA')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600">Статус мастера</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {complianceSnapshot.riskLevel === 'low' ? '✅' : '⚠️'}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600">Баланс мастера</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{masterBalance.confirmed}₴</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-gray-600">Комісія платформи</p>
                    <p className="text-2xl font-bold text-orange-600 mt-2">
                      {Math.round((amount * 0.1))}₴
                    </p>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Сума замовлення (₴)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введіть суму"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowStartConfirm(true)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    ▶️ Розпочати роботу
                  </button>
                  <button
                    onClick={() => setShowCompleteConfirm(true)}
                    disabled={!qualityApproved}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                  >
                    ✅ Завершити замовлення
                  </button>
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && chat && (
              <AdvancedMessaging
                chat={chat}
                currentUser={currentUser}
                otherUser={currentUser.role === 'client' ? master! : client!}
                messages={messagesService.getChatMessages(chat.id)}
                onClose={undefined}
              />
            )}

            {/* TOOLS TAB */}
            {activeTab === 'tools' && (
              <InteractionTools
                order={order}
                currentUser={currentUser}
                otherUser={currentUser.role === 'client' ? master! : client!}
              />
            )}

            {/* EARNINGS TAB */}
            {activeTab === 'earnings' && (
              <div className="space-y-4">
                <MasterEarningsAnalytics masterId={master.id} />

                {orderEarning && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-4">📊 Заробіток по цьому замовленню</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Грома сума</p>
                        <p className="text-2xl font-bold text-green-600">{orderEarning.grossAmount}₴</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Комісія</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {Math.round(
                            orderEarning.grossAmount - orderEarning.netAmount
                          )}₴
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Чистий доход</p>
                        <p className="text-2xl font-bold text-blue-600">{orderEarning.netAmount}₴</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Статус</p>
                        <p className="text-sm font-bold text-gray-900 mt-1">{orderEarning.status}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COMPLIANCE TAB */}
            {activeTab === 'compliance' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-4">🔐 Правова захист</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Рівень ризику</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {complianceSnapshot.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Оцінка відповідності</span>
                      <span className="text-lg font-bold text-purple-600">
                        {complianceSnapshot.complianceScore}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Усі угоди прийняті</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        ✅ Так
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quality Check */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">⭐ Контроль якості</h4>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qualityApproved}
                      onChange={(e) => setQualityApproved(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">
                      Я перевірив якість роботи та затверджую її
                    </span>
                  </label>
                  {qualityApproved && (
                    <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded text-green-800 text-sm">
                      ✅ Якість затверджена. Готово до завершення.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Закрити
            </button>
          </div>
        </motion.div>

        {/* Confirmation Dialogs */}
        <AnimatePresence>
          {showStartConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">Розпочати роботу?</h3>
                <p className="text-gray-600 mb-4">
                  Ви впевнені, що готові розпочати роботу з цьому замовленню?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowStartConfirm(false)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={handleStartWork}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Розпочати
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showCompleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">Завершити замовлення?</h3>
                <p className="text-gray-600 mb-4">
                  {!qualityApproved
                    ? '❌ Потрібно спочатку перевірити якість на вкладці "Правова захист"'
                    : '✅ Замовлення готово до завершення. Платіж буде обробляється автоматично.'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCompleteConfirm(false)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    disabled={!qualityApproved}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                  >
                    Завершити
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
