import { useState } from 'react';
import { Send, X, Eye, Trash2, TrendingUp, Clock, DollarSign, Star, MessageSquare } from 'lucide-react';

interface Proposal {
  id: string;
  orderId: string;
  masterName: string;
  masterRating: number;
  offerPrice: number;
  estimatedDays: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  submittedAt: Date;
}

export function OptimizedProposalFlow() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 'p1',
      orderId: '#1001',
      masterName: 'Олександр Петренко',
      masterRating: 4.9,
      offerPrice: 2200,
      estimatedDays: 1,
      description: 'Замічу скло оригінальним утруженням з гарантією 6 місяців',
      status: 'pending',
      submittedAt: new Date(Date.now() - 30 * 60000)
    },
    {
      id: 'p2',
      orderId: '#1001',
      masterName: 'Максим Іванов',
      masterRating: 4.7,
      offerPrice: 2500,
      estimatedDays: 2,
      description: 'Повна діагностика та ремонт з тестуванням',
      status: 'pending',
      submittedAt: new Date(Date.now() - 15 * 60000)
    }
  ]);

  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string>('');
  const [rejectReason, setRejectReason] = useState('');
  const [formData, setFormData] = useState({
    price: '',
    days: '',
    description: ''
  });

  const handleSubmitProposal = () => {
    if (formData.price && formData.days && formData.description) {
      alert('✅ Пропозиція успішно надіслана майстру!');
      setShowForm(false);
      setFormData({ price: '', days: '', description: '' });
    }
  };

  const acceptProposal = (id: string) => {
    setProposals(proposals.map(p => 
      p.id === id ? { ...p, status: 'accepted' } : { ...p, status: 'rejected' }
    ));
    alert('✅ Пропозиція прийнята! Майстер розпочне роботу.');
  };

  const rejectProposal = (id: string) => {
    setSelectedProposalId(id);
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert('⚠️ Вкажіть причину відхилення');
      return;
    }
    
    setProposals(proposals.map(p => 
      p.id === selectedProposalId ? { ...p, status: 'rejected' } : p
    ));
    alert(`❌ Пропозиція відхилена. Причина: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedProposalId('');
  };

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-50 border-blue-200';
      case 'accepted':
        return 'bg-green-50 border-green-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      case 'expired':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">⏳ Очікує</span>;
      case 'accepted':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">✅ Прийнято</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">❌ Відхилено</span>;
      case 'expired':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">⏱️ Застарілі</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💼 Пропозиції від Майстрів</h1>
        <p className="text-gray-600">Порівняйте пропозиції та виберіть найкращу для вас</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Всього пропозицій</p>
          <p className="text-2xl font-bold text-gray-900">{proposals.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Очікує відповіді</p>
          <p className="text-2xl font-bold text-blue-600">{proposals.filter(p => p.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Прийнято</p>
          <p className="text-2xl font-bold text-green-600">{proposals.filter(p => p.status === 'accepted').length}</p>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4 mb-8">
        {proposals.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Пропозиції ще не надійшли</p>
          </div>
        ) : (
          proposals.map(proposal => (
            <div
              key={proposal.id}
              className={`border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all ${getStatusColor(proposal.status)}`}
              onClick={() => setSelectedProposal(selectedProposal?.id === proposal.id ? null : proposal)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`https://i.pravatar.cc/96?img=${Math.random() * 100}`}
                      alt={proposal.masterName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{proposal.masterName}</h3>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600">{proposal.masterRating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
                {getStatusBadge(proposal.status)}
              </div>

              <p className="text-gray-700 mb-4 text-sm">{proposal.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Вартість</p>
                    <p className="font-bold text-gray-900">{proposal.offerPrice} ₴</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Час виконання</p>
                    <p className="font-bold text-gray-900">{proposal.estimatedDays} дн.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600">Надіслано</p>
                    <p className="font-bold text-gray-900">
                      {Math.floor((Date.now() - proposal.submittedAt.getTime()) / 60000)}м назад
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {proposal.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptProposal(proposal.id);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    ✓ Прийняти
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      rejectProposal(proposal.id);
                    }}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition"
                  >
                    ✗
                  </button>
                </div>
              )}

              {proposal.status === 'accepted' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  <span>✅ Ви прийняли цю пропозицію</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Compare Button */}
      {proposals.filter(p => p.status === 'pending').length > 1 && (
        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mb-8 flex items-center justify-center gap-2">
          📊 Порівняти пропозиції
        </button>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-bold text-gray-900 mb-4">💡 Рекомендація</h3>
        <p className="text-gray-700 text-sm mb-3">
          За співвідношенням ціни та якості найкраще пропозиція від <strong>Олександра Петренко</strong>:
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ Найнижча ціна: 2200 ₴</li>
          <li>✅ Найшвидше виконання: 1 день</li>
          <li>✅ Найвищий рейтинг: 4.9/5</li>
          <li>✅ Гарантія 6 місяців</li>
        </ul>
      </div>

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
                <X className="w-6 h-6" />
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
                ✗ Підтвердити відхилення
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
