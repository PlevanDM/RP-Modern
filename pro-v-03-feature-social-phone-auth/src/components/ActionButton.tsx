import React from 'react';
import { EscrowPayment, EscrowStatus } from '../types';
import { Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface ActionButtonProps {
  payment: EscrowPayment;
  userRole: 'client' | 'master';
  isLoading: boolean;
  onConfirmPayment: () => void;
  onApproveWork: () => void;
  onConfirmWork: () => void;
  onShowDispute: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  payment,
  userRole,
  isLoading,
  onConfirmPayment,
  onApproveWork,
  onConfirmWork,
  onShowDispute,
}) => {
  const commonButtonClasses = "w-full text-white px-4 py-3 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2";

  const renderClientActions = () => {
    switch (payment.status) {
      case EscrowStatus.AWAITING_CLIENT:
        return (
          <button onClick={onConfirmPayment} disabled={isLoading} className={`${commonButtonClasses} bg-green-600 hover:bg-green-700`}>
            {isLoading ? <Loader className="animate-spin" size={20} /> : <CheckCircle size={20} />}
            💳 Підтвердити Платеж
          </button>
        );
      case EscrowStatus.CONFIRMED_BY_MASTER:
        return (
          <button onClick={onApproveWork} disabled={isLoading} className={`${commonButtonClasses} bg-green-600 hover:bg-green-700`}>
            {isLoading ? <Loader className="animate-spin" size={20} /> : <CheckCircle size={20} />}
            ✅ Підтвердити Якість Роботи
          </button>
        );
      default:
        return null;
    }
  };

  const renderMasterActions = () => {
    if (payment.status === EscrowStatus.AWAITING_MASTER) {
      return (
        <button onClick={onConfirmWork} disabled={isLoading} className={`${commonButtonClasses} bg-green-600 hover:bg-green-700`}>
          {isLoading ? <Loader className="animate-spin" size={20} /> : <CheckCircle size={20} />}
          ✅ Підтвердити Виконання Роботи
        </button>
      );
    }
    return null;
  };

  const renderDisputeButton = () => {
    const canDispute = [
      EscrowStatus.AWAITING_CLIENT,
      EscrowStatus.AWAITING_MASTER,
      EscrowStatus.CONFIRMED_BY_MASTER
    ].includes(payment.status);

    if (canDispute) {
      return (
        <button onClick={onShowDispute} disabled={isLoading} className={`${commonButtonClasses} bg-red-600 hover:bg-red-700`}>
          <AlertCircle size={20} />
          ⚠️ Відкрити Спір
        </button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {userRole === 'client' && renderClientActions()}
      {userRole === 'master' && renderMasterActions()}
      {renderDisputeButton()}
    </div>
  );
};
