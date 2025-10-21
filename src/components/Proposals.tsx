import { useState, useMemo } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { X } from 'lucide-react';
import { Proposal, User } from '../types/models';

interface Order {
  id: string;
  status: string;
  title: string;
  deviceType: string;
}

interface ProposalsProps {
  currentUser: User;
  proposals?: Proposal[];
  orders?: Order[];
  isMaster?: boolean;
  onSubmitProposal?: (orderId: string, price: number, description: string) => void;
  onUpdateProposal?: (proposalId: string, updates: Partial<Proposal>) => void;
  onAcceptProposal?: (proposalId: string) => void;
  onRejectProposal?: (proposalId: string) => void;
  onShowToast?: (message: string) => void;
}

export function Proposals({
  proposals = [],
  orders = [],
  isMaster = false,
  onSubmitProposal,
  onUpdateProposal,
  onAcceptProposal,
  onRejectProposal,
  onShowToast,
}: ProposalsProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [selectedProposalId, setSelectedProposalId] = useState<string>('');
  const [formData, setFormData] = useState({ price: '', description: '', estimatedDays: '1' });
  const [cancelReason, setCancelReason] = useState('');

  const filteredProposals = useMemo(() => {
    // Фильтруем по статусу (ролевая фильтрация уже выполнена в App.tsx)
    return filterStatus === 'all'
      ? proposals
      : proposals.filter(p => p.status === filterStatus);
  }, [proposals, filterStatus]);

  const handleAccept = (proposalId: string) => {
    onAcceptProposal?.(proposalId);
    onShowToast?.(`✅ Пропозиція ${proposalId} прийнята!`);
  };

  const handleReject = (proposalId: string) => {
    onRejectProposal?.(proposalId);
    onShowToast?.(`❌ Пропозиція ${proposalId} відхилена!`);
  };

  const handleCancel = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) {
      onShowToast?.('⚠️ Вкажіть причину скасування');
      return;
    }
    
    // Обновляем статус предложения на cancelled
    onUpdateProposal?.(selectedProposalId, {
      status: 'cancelled',
      cancelReason: cancelReason,
      cancelledAt: new Date()
    });
    
    onShowToast?.(`❌ Пропозиція ${selectedProposalId} скасована. Причина: ${cancelReason}`);
    setShowCancelModal(false);
    setCancelReason('');
    setSelectedProposalId('');
  };

  const handleSubmitProposal = () => {
    if (!selectedOrderId || !formData.price || !formData.description) {
      onShowToast?.('⚠️ Заповніть всі поля');
      return;
    }
    onSubmitProposal?.(selectedOrderId, parseFloat(formData.price), formData.description);
    setShowSubmitModal(false);
    setFormData({ price: '', description: '', estimatedDays: '1' });
    setSelectedOrderId('');
  };

  const openProposals =
    orders?.filter((o) => o.status === 'open' || o.status === 'proposed') || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Пропозиції</h2>
        {isMaster && openProposals.length > 0 && (
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <SendIcon sx={{ fontSize: 20 }} /> Розмістити пропозицію
          </button>
        )}
      </div>

      {/* Modal for submitting proposal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Розмістити пропозицію</h3>
              <button onClick={() => setShowSubmitModal(false)}>
                <X size={20} />
              </button>
            </div>

            {isMaster && (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Замовлення</label>
                    <select
                      value={selectedOrderId}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Виберіть замовлення</option>
                      {openProposals.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.title} - {order.deviceType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ціна ($)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="300"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Кількість днів</label>
                    <input
                      type="number"
                      value={formData.estimatedDays}
                      onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Опис роботи</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Поясніть як ви виконаєте роботу..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitProposal}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Розмістити
                    </button>
                    <button
                      onClick={() => setShowSubmitModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                    >
                      Скасувати
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Filters */}
      {!isMaster && (
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Всі
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Очікуючі
          </button>
          <button
            onClick={() => setFilterStatus('accepted')}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === 'accepted'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Прийняті
          </button>
        </div>
      )}

      {/* Proposals List */}
      {filteredProposals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Немає пропозицій</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProposals.map(proposal => (
            <div 
              key={proposal.id} 
              className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-lg hover:border-indigo-300 transition cursor-pointer"
              onClick={() => {
                // Відкриває деталі пропозиції при натисканні
                if (onShowToast) {
                  onShowToast(`📋 Переглядаєте пропозицію: ${proposal.masterName} - ₴${proposal.price}`);
                }
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-gray-900">Замовлення #{proposal.orderId}</p>
                  <p className="text-sm text-indigo-600 mt-1">від {proposal.masterName} ⭐ {proposal.masterRating}</p>
                  <p className="text-sm text-gray-600 mt-2">{proposal.description}</p>
                  {proposal.status === 'cancelled' && proposal.cancelReason && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                      <p className="text-xs text-gray-500 font-medium">Причина скасування:</p>
                      <p className="text-sm text-gray-700 mt-1">{proposal.cancelReason}</p>
                    </div>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4 ${
                  proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  proposal.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {proposal.status === 'pending' ? '⏳ Очікує' :
                   proposal.status === 'accepted' ? '✅ Прийнята' :
                   proposal.status === 'cancelled' ? '🚫 Скасовано' :
                   '❌ Відхилена'}
                </span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">${proposal.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{proposal.estimatedDays} днів</span>
                  </div>
                </div>

                {!isMaster && proposal.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(proposal.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircleIcon sx={{ fontSize: 20 }} /> Прийняти
                    </button>
                    <button
                      onClick={() => handleReject(proposal.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <CancelIcon sx={{ fontSize: 20 }} /> Відхилити
                    </button>
                  </div>
                )}

                {!isMaster && proposal.status === 'accepted' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancel(proposal.id)}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                    >
                      <CancelIcon sx={{ fontSize: 20 }} /> Скасувати
                    </button>
                  </div>
                )}

                {proposal.status === 'cancelled' && (
                  <div className="flex gap-2">
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2">
                      <CancelIcon sx={{ fontSize: 20 }} /> Скасовано
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно для отмены заказа */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Скасувати замовлення</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Причина скасування *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Вкажіть причину скасування замовлення..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                rows={4}
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Скасувати
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
              >
                <CancelIcon sx={{ fontSize: 20 }} /> Підтвердити скасування
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
