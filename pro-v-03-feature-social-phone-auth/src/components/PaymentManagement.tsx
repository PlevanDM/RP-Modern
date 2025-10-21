import { useState } from 'react';
import { CreditCard, Banknote, Smartphone, Shield, CheckCircle, AlertCircle, HelpCircle, MessageCircle, Lock } from 'lucide-react';
import { PaymentMethod } from '../types/models';

interface User {
  id: string;
  balance: number;
}

interface Order {
  id: string;
  clientId: string;
  title: string;
  deviceType: string;
  issue: string;
  paymentAmount: number;
  paymentStatus: 'pending' | 'escrowed' | 'released' | 'refunded';
  paymentMethod: string;
  escrowId: string;
  paymentDate: Date;
  disputeStatus: 'none' | 'open' | 'investigating' | 'resolved' | 'escalated';
  disputeReason?: string;
  proposedPrice?: number;
}

interface PaymentManagementProps {
  currentUser: User;
  orders: Order[];
  onUpdatePayment: (
    orderId: string,
    paymentData: {
      paymentStatus: 'escrowed';
      paymentDate: Date;
    }
  ) => void;
  onReleasePayment: (orderId: string) => void;
  onRefundPayment: (orderId: string) => void;
  onCreateDispute?: (orderId: string, reason: string, description: string) => void;
  onEscalateDispute?: (orderId: string) => void;
}

export function PaymentManagement({
  currentUser,
  orders,
  onUpdatePayment,
  onReleasePayment,
  onRefundPayment,
  onCreateDispute,
  onEscalateDispute,
}: PaymentManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDescription, setDisputeDescription] = useState('');

  // Mock payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'Visa **** 1234',
      last4: '1234',
      isDefault: true,
      isActive: true
    },
    {
      id: '2',
      type: 'bank',
      name: 'Монобанк',
      isDefault: false,
      isActive: true
    },
    {
      id: '3',
      type: 'crypto',
      name: 'USDT (TRC20)',
      isDefault: false,
      isActive: true
    }
  ];

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="w-5 h-5" />;
      case 'bank': return <Banknote className="w-5 h-5" />;
      case 'crypto': return <Shield className="w-5 h-5" />;
      case 'paypal': return <Smartphone className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'escrowed': return 'bg-blue-100 text-blue-800';
      case 'released': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '⏳ Очікує оплати';
      case 'escrowed': return '🔒 В ескроу';
      case 'released': return '✅ Виплачено';
      case 'refunded': return '↩️ Повернено';
      default: return status;
    }
  };

  const handlePayment = (order: Order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handleTopUpBalance = () => {
    if (topUpAmount && parseFloat(topUpAmount) > 0) {
      // Mock top up
      console.log(`Top up balance by ${topUpAmount} UAH`);
      setTopUpAmount('');
      setShowBalanceModal(false);
    }
  };

  const handleCreateDispute = (order: Order) => {
    setSelectedOrder(order);
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = () => {
    if (disputeReason && disputeDescription && selectedOrder && onCreateDispute) {
      onCreateDispute(selectedOrder.id, disputeReason, disputeDescription);
      setDisputeReason('');
      setDisputeDescription('');
      setShowDisputeModal(false);
    }
  };

  const handleEscalateDispute = (orderId: string) => {
    if (onEscalateDispute) {
      onEscalateDispute(orderId);
    }
  };

  // Add mock payment data for testing
  const ordersWithMockPayments = orders.map(order => ({
    ...order,
    paymentAmount: order.paymentAmount || (order.proposedPrice || 5000),
    paymentStatus: order.paymentStatus || 'escrowed',
    paymentMethod: order.paymentMethod || 'Visa **** 1234',
    escrowId: order.escrowId || `escrow_${order.id}`,
    paymentDate: order.paymentDate || new Date(),
    disputeStatus: order.disputeStatus || 'none'
  }));

  const ordersWithPayments = ordersWithMockPayments.filter(order => 
    order.clientId === currentUser.id
  );

  // Debug info
  console.log('Current user ID:', currentUser.id);
  console.log('All orders:', orders.length);
  console.log('Orders with payments:', ordersWithPayments.length);
  console.log('Orders for current user:', orders.filter(order => order.clientId === currentUser.id).length);
  console.log('All orders details:', orders.map(order => ({
    id: order.id,
    clientId: order.clientId,
    paymentAmount: order.paymentAmount,
    paymentStatus: order.paymentStatus,
    hasPaymentAmount: !!order.paymentAmount,
    paymentAmountType: typeof order.paymentAmount
  })));
  
  // Check if orders are loaded correctly
  if (orders.length === 0) {
    console.log('No orders loaded!');
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управління платежами</h1>
          <p className="text-gray-600 mt-1">Ескроу-система для безпечних платежів</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBalanceModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2"
          >
            <Banknote className="w-4 h-4" />
            Пополнити баланс
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Баланс</h3>
            <p className="text-3xl font-bold mt-1">{currentUser.balance || 0} ₴</p>
            <p className="text-indigo-200 text-sm mt-1">Доступно для використання</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm text-indigo-200">В ескроу</p>
              <p className="text-xl font-semibold">
                {ordersWithPayments
                  .filter(order => order.paymentStatus === 'escrowed')
                  .reduce((sum, order) => sum + (order.paymentAmount || 0), 0)} ₴
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Способи оплати</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                method.isDefault
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {getPaymentIcon(method.type)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">
                    {method.isDefault ? 'Основний' : 'Додатковий'}
                  </p>
                </div>
                {method.isDefault && (
                  <CheckCircle className="w-5 h-5 text-indigo-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders with Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Замовлення з платежами</h3>
        {ordersWithPayments.length === 0 ? (
          <div className="text-center py-8">
            <Banknote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">Немає замовлень з платежами</p>
            <p className="text-gray-400 text-sm mt-1">Створіть замовлення для початку роботи</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ordersWithPayments.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{order.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.deviceType} - {order.issue}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getPaymentStatusText(order.paymentStatus)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {order.paymentAmount} ₴
                      </span>
                      <span className="text-sm text-gray-500">
                        {order.paymentMethod}
                      </span>
                    </div>
                    
                    {/* Escrow information */}
                    {order.paymentStatus === 'escrowed' && (
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              В ескроу утримано до завершення ремонту
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              Кошти заблоковані та будуть виплачені майстру після успішного завершення роботи
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dispute information */}
                    {order.disputeStatus && order.disputeStatus !== 'none' && (
                      <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-orange-900">
                              Спір: {order.disputeReason}
                            </p>
                            <p className="text-xs text-orange-700 mt-1">
                              Статус: {order.disputeStatus === 'open' ? 'Відкрито' : 
                                      order.disputeStatus === 'investigating' ? 'Розглядається' :
                                      order.disputeStatus === 'resolved' ? 'Вирішено' : 'Ескаловано'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {order.paymentStatus === 'escrowed' && (
                      <button
                        onClick={() => onReleasePayment(order.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                      >
                        Виплатити
                      </button>
                    )}
                    {order.paymentStatus === 'escrowed' && (
                      <button
                        onClick={() => onRefundPayment(order.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors"
                      >
                        Повернути
                      </button>
                    )}
                    {order.paymentStatus === 'pending' && (
                      <button
                        onClick={() => handlePayment(order)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
                      >
                        Оплатити
                      </button>
                    )}
                    
                    {/* Dispute buttons */}
                    {order.paymentStatus === 'escrowed' && (!order.disputeStatus || order.disputeStatus === 'none') && (
                      <button
                        onClick={() => handleCreateDispute(order)}
                        className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        Спір
                      </button>
                    )}
                    
                    {order.disputeStatus === 'open' && (
                      <button
                        onClick={() => handleEscalateDispute(order.id)}
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Техпідтримка
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Оплата замовлення
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Замовлення</p>
                <p className="font-medium">{selectedOrder.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Сума</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {selectedOrder.paymentAmount || 0} ₴
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Спосіб оплати</p>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Ескроу-захист</p>
                    <p className="text-xs text-blue-700">
                      Гроші будуть заблоковані до завершення роботи
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={() => {
                  onUpdatePayment(selectedOrder.id, { 
                    paymentStatus: 'escrowed',
                    paymentDate: new Date()
                  });
                  setShowPaymentModal(false);
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
              >
                Оплатити
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Balance Top-up Modal */}
      {showBalanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Пополнити баланс
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Сума пополнення</p>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Спосіб оплати</p>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBalanceModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={handleTopUpBalance}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
              >
                Пополнити
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {showDisputeModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Створити спір
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Замовлення</p>
                <p className="font-medium">{selectedOrder.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Причина спору</p>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Оберіть причину</option>
                  <option value="Якість роботи">Якість роботи</option>
                  <option value="Не відповідає опису">Не відповідає опису</option>
                  <option value="Затримка виконання">Затримка виконання</option>
                  <option value="Поведінка майстра">Поведінка майстра</option>
                  <option value="Інше">Інше</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Опис проблеми</p>
                <textarea
                  value={disputeDescription}
                  onChange={(e) => setDisputeDescription(e.target.value)}
                  placeholder="Детально опишіть проблему..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Техпідтримка</p>
                    <p className="text-xs text-orange-700">
                      Після створення спору ви зможете підключити техпідтримку для його розгляду
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={handleSubmitDispute}
                disabled={!disputeReason || !disputeDescription}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Створити спір
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
