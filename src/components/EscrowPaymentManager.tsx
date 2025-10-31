import { useState, useEffect, useCallback } from 'react';
import { EscrowPayment, EscrowStatus } from '../types';
import { escrowService } from '../services/api/escrowService';
import { AlertCircle, Clock, Loader } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { safeLocaleCurrency, safeLocaleDate } from '../utils/localeUtils';

interface EscrowPaymentManagerProps {
  orderId: string;
  clientId: string;
  masterId: string;
  amount: number;
  userRole: 'client' | 'master';
}

export function EscrowPaymentManager({
  orderId,
  clientId,
  masterId,
  amount,
  userRole,
}: EscrowPaymentManagerProps) {
  const [payment, setPayment] = useState<EscrowPayment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const handleApiCall = useCallback(async (apiCall: () => Promise<EscrowPayment | EscrowPayment[] | void>) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      await apiCall();
      const updatedPayment = escrowService.getOrderPayments(orderId)[0] || null;
      setPayment(updatedPayment);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Произошла ошибка';
      setError(errorMessage);
      alert(`Ошибка: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    handleApiCall(async () => {
      const payments = escrowService.getOrderPayments(orderId);
      if (payments.length > 0) {
        setPayment(payments[0]);
      } else {
        setPayment(null); // Явно устанавливаем null, если платежей нет
      }
    });
  }, [orderId, handleApiCall]);

  const createEscrow = () => handleApiCall(() =>
    escrowService.createEscrowPayment(orderId, clientId, masterId, amount)
  );

  const confirmPayment = () => payment && handleApiCall(() =>
    escrowService.confirmPaymentByClient(payment.id)
  );

  const confirmWork = () => payment && handleApiCall(() =>
    escrowService.confirmWorkByMaster(payment.id)
  );

  const approveWork = () => payment && handleApiCall(() =>
    escrowService.approveWorkByClient(payment.id)
  );

  const openDispute = () => {
    if (!payment || !disputeReason) return;
    handleApiCall(() =>
      escrowService.openDispute(payment.id, disputeReason, userRole)
    );
    setShowDispute(false);
  };

  if (isLoading && !payment) {
    return (
      <div className="flex justify-center items-center p-6 bg-gray-50 rounded-lg">
        <Loader className="animate-spin text-blue-600" size={32} />
        <p className="ml-2 text-gray-700">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto text-red-500" size={32} />
        <p className="mt-2 text-red-800 font-semibold">{error}</p>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Escrow Платеж</h3>
        <p className="text-gray-700 mb-4">
          Сума: <span className="font-bold">{safeLocaleCurrency(amount)} грн</span>
        </p>
        {userRole === 'client' && (
          <button
            onClick={createEscrow}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-semibold transition disabled:bg-blue-300 flex items-center justify-center"
          >
            {isLoading ? <Loader className="animate-spin" size={20} /> : '✅ Створити Escrow Платеж'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center rounded-lg z-10">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">📊 Статус Escrow Платежу</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
          {getStatusLabel(payment.status)}
        </span>
      </div>

      {/* === ВОССТАНОВЛЕННЫЙ БЛОК: ДЕТАЛИ ПЛАТЕЖА === */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Сума платежу</p>
          <p className="text-lg font-bold text-gray-900">{safeLocaleCurrency(payment.amount)} грн</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Мастер отримає</p>
          <p className="text-lg font-bold text-green-600">{safeLocaleCurrency(payment.masterReceiveAmount)} грн</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Клієнт підтвердив</p>
          <p className="text-sm font-semibold">
            {payment.clientConfirmed ? '✅ Так' : '⏳ Ні'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Майстер підтвердив</p>
          <p className="text-sm font-semibold">
            {payment.masterConfirmed ? '✅ Так' : '⏳ Ні'}
          </p>
        </div>
      </div>

      {/* === ВОССТАНОВЛЕННЫЙ БЛОК: ТАЙМЛАЙН ПРОГРЕССА === */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${payment.clientConfirmed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
              {payment.clientConfirmed ? '✓' : '1'}
            </div>
            <p className="font-semibold">Платеж від клієнта</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${payment.masterConfirmed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
              {payment.masterConfirmed ? '✓' : '2'}
            </div>
            <p className="font-semibold">Майстер виконав роботу</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${payment.status === EscrowStatus.RELEASED_TO_MASTER ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
              {payment.status === EscrowStatus.RELEASED_TO_MASTER ? '✓' : '3'}
            </div>
            <p className="font-semibold">Платеж виплачено мастеру</p>
          </div>
        </div>
      </div>

      {/* ACTIONS (используем новый ActionButton) */}
      <div className="space-y-3">
        <ActionButton
          payment={payment}
          userRole={userRole}
          isLoading={isLoading}
          onConfirmPayment={confirmPayment}
          onApproveWork={approveWork}
          onConfirmWork={confirmWork}
          onShowDispute={() => setShowDispute(true)}
        />

        {showDispute && (
          <div className="bg-white border-2 border-red-300 rounded-lg p-4 space-y-3">
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="Описати причину спору..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
            <div className="flex gap-2">
              <button onClick={openDispute} disabled={isLoading} className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg">
                {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : 'Відкрити Спір'}
              </button>
              <button onClick={() => setShowDispute(false)} className="flex-1 bg-gray-300 text-gray-900 px-3 py-2 rounded-lg">
                Скасувати
              </button>
            </div>
          </div>
        )}

        {/* === ВОССТАНОВЛЕННЫЙ БЛОК: СТАТУСНЫЕ СООБЩЕНИЯ === */}
        {payment.status === EscrowStatus.DISPUTED && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <p className="text-red-900 font-semibold mb-2">⚖️ Спір у розгляді</p>
            <p className="text-sm text-red-700">Причина: {payment.disputeReason}</p>
          </div>
        )}
        {payment.status === EscrowStatus.RELEASED_TO_MASTER && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <p className="text-green-900 font-semibold mb-2">✅ Платеж завершено</p>
            <p className="text-sm text-green-700">Майстер отримав {payment.masterReceiveAmount} грн</p>
          </div>
        )}
        {payment.status === EscrowStatus.REFUNDED_TO_CLIENT && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <p className="text-blue-900 font-semibold mb-2">🔄 Платеж повернено</p>
            <p className="text-sm text-blue-700">Клієнт отримав {payment.amount} грн назад</p>
          </div>
        )}
      </div>

      {/* === ВОССТАНОВЛЕННЫЙ БЛОК: ИНФОРМАЦИЯ О СРОКЕ ДЕЙСТВИЯ === */}
      {payment.status === EscrowStatus.AWAITING_CLIENT && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3">
          <Clock size={18} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-900">Час дії: {safeLocaleDate(payment.expiresAt)}</p>
            <p className="text-xs text-yellow-700">Якщо не буде підтверджено, платеж буде автоматично повернено</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Функции getStatusColor и getStatusLabel остаются без изменений
function getStatusColor(status: EscrowStatus): string {
  switch (status) {
    case EscrowStatus.AWAITING_CLIENT: return 'bg-yellow-100 text-yellow-800';
    case EscrowStatus.AWAITING_MASTER: return 'bg-blue-100 text-blue-800';
    case EscrowStatus.CONFIRMED_BY_MASTER: return 'bg-purple-100 text-purple-800';
    case EscrowStatus.RELEASED_TO_MASTER: return 'bg-green-100 text-green-800';
    case EscrowStatus.REFUNDED_TO_CLIENT: return 'bg-blue-100 text-blue-800';
    case EscrowStatus.DISPUTED: return 'bg-red-100 text-red-800';
    case EscrowStatus.CANCELLED: return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusLabel(status: EscrowStatus): string {
  switch (status) {
    case EscrowStatus.AWAITING_CLIENT: return '⏳ Очікування платежу';
    case EscrowStatus.AWAITING_MASTER: return '⏳ Ожидающий подтверждения';
    case EscrowStatus.CONFIRMED_BY_MASTER: return '⏳ Очікування підтвердження клієнта';
    case EscrowStatus.RELEASED_TO_MASTER: return '✅ Виплачено';
    case EscrowStatus.REFUNDED_TO_CLIENT: return '🔄 Повернено';
    case EscrowStatus.DISPUTED: return '⚖️ Спір';
    case EscrowStatus.CANCELLED: return '❌ Отменено';
    default: return 'Невідомий статус';
  }
}
