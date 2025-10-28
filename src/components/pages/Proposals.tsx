import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  X, 
  Clock, 
  DollarSign, 
  Calendar, 
  User,
  Star,
  AlertCircle,
  Send,
  Check,
  Ban
} from 'lucide-react';
import { Proposal } from '../..//models';

interface Order {
  id: string;
  status: string;
  title: string;
  deviceType: string;
}

interface ProposalsProps {
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
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [selectedProposalId, setSelectedProposalId] = useState<string>('');
  const [formData, setFormData] = useState({ price: '', description: '', estimatedDays: '1' });
  const [cancelReason, setCancelReason] = useState('');
  const [rejectReason, setRejectReason] = useState('');

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
    setSelectedProposalId(proposalId);
    setShowRejectModal(true);
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

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      onShowToast?.('⚠️ Вкажіть причину відхилення');
      return;
    }
    
    onRejectProposal?.(selectedProposalId);
    onShowToast?.(`❌ Пропозиція ${selectedProposalId} відхилена. Причина: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason('');
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
    <div className="space-y-6 overflow-x-hidden w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Пропозиції</h2>
        {isMaster && (
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Send className="w-5 h-5" /> Розмістити пропозицію
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
        <div className="space-y-3">
          {filteredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Замовлення #{proposal.orderId}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-3.5 h-3.5" />
                      <span>{proposal.masterName}</span>
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{proposal.masterRating}</span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  {proposal.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      Очікує
                    </span>
                  )}
                  {proposal.status === 'accepted' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      <Check className="w-3 h-3" />
                      Прийнята
                    </span>
                  )}
                  {proposal.status === 'cancelled' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      <Ban className="w-3 h-3" />
                      Скасовано
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-3">{proposal.description}</p>

                {/* Cancel Reason */}
                {proposal.status === 'cancelled' && proposal.cancelReason && (
                  <div className="p-2 bg-gray-50 border-l-2 border-gray-300 rounded mb-3">
                    <p className="text-xs text-gray-500 mb-0.5">Причина скасування:</p>
                    <p className="text-sm text-gray-700">{proposal.cancelReason}</p>
                  </div>
                )}

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-gray-900">${proposal.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{proposal.estimatedDays} днів</span>
                  </div>
                </div>

                {/* Actions */}
                {!isMaster && proposal.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(proposal.id);
                      }}
                      className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors"
                    >
                      Прийняти
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(proposal.id);
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
                    >
                      Відхилити
                    </button>
                  </div>
                )}

                {!isMaster && proposal.status === 'accepted' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancel(proposal.id);
                    }}
                    className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
                  >
                    Скасувати
                  </button>
                )}
              </div>
            </motion.div>
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

      {/* Модальное окно для отклонения пропозиции */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Відхилити пропозицію</h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Причина відхилення *
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Вкажіть причину відхилення пропозиції..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                rows={4}
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Скасувати
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <CancelIcon sx={{ fontSize: 20 }} /> Підтвердити відхилення
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


