import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X, Search, Clock, DollarSign, 
  User, Phone, MapPin, Star, Eye, TrendingUp, CheckCircle, Trash2, Send, Zap, Smartphone, Monitor, Laptop
} from 'lucide-react';

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  clientRating: number;
  deviceType: string;
  deviceModel: string;
  problemDescription: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  dueDate: string;
  estimatedPrice: number;
  location: string;
  proposalCount: number;
  hasMyProposal: boolean;
  clientMobileOS?: 'android' | 'ios';
  clientComputerOS?: 'windows' | 'mac' | 'linux';
}

interface MyProposal {
  id: string;
  orderId: string;
  offerPrice: number;
  estimatedDays: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}

const mockAvailableOrders: Order[] = [
  {
    id: '#1001',
    clientName: 'Анна Коваленко',
    clientPhone: '+38(099) 123-45-67',
    clientRating: 4.9,
    deviceType: 'iPhone',
    deviceModel: 'iPhone 15 Pro',
    problemDescription: 'Розбите скло, камера не працює',
    priority: 'high',
    createdAt: '2025-01-21 14:30',
    dueDate: '2025-01-23',
    estimatedPrice: 2500,
    location: 'Київ, вул. Франка 25',
    proposalCount: 2,
    hasMyProposal: false
  },
  {
    id: '#1002',
    clientName: 'Борис Сидоренко',
    clientPhone: '+38(095) 234-56-78',
    clientRating: 4.6,
    deviceType: 'Samsung',
    deviceModel: 'Galaxy S24',
    problemDescription: 'Батарея швидко розряджається',
    priority: 'medium',
    createdAt: '2025-01-20 10:15',
    dueDate: '2025-01-24',
    estimatedPrice: 1500,
    location: 'Львів, Площа Ринок 15',
    proposalCount: 1,
    hasMyProposal: false
  },
  {
    id: '#1005',
    clientName: 'Олена Петренко',
    clientPhone: '+38(093) 567-89-01',
    clientRating: 4.8,
    deviceType: 'iPad',
    deviceModel: 'iPad Air',
    problemDescription: 'Екран зависає, затримка в роботі',
    priority: 'medium',
    createdAt: '2025-01-21 11:00',
    dueDate: '2025-01-25',
    estimatedPrice: 1800,
    location: 'Одеса, вул. Деніївська 12',
    proposalCount: 0,
    hasMyProposal: false
  }
];

const mockMyProposals: MyProposal[] = [
  {
    id: 'mp1',
    orderId: '#1003',
    offerPrice: 4500,
    estimatedDays: 3,
    description: 'Заміна дисплею з установкою та тестуванням',
    timestamp: '2025-01-19 09:30',
    status: 'accepted'
  },
  {
    id: 'mp2',
    orderId: '#1002',
    offerPrice: 1400,
    estimatedDays: 1,
    description: 'Заміна батареї оригіналом з гарантією',
    timestamp: '2025-01-20 11:00',
    status: 'pending'
  }
];

const priorityConfig = {
  low: { label: 'Низька', color: 'bg-gray-100 text-gray-700', icon: '⚪' },
  medium: { label: 'Середня', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
  high: { label: 'Висока', color: 'bg-orange-100 text-orange-700', icon: '🟠' },
  urgent: { label: 'Терміно', color: 'bg-red-100 text-red-700', icon: '🔴' }
};

const proposalStatusConfig = {
  pending: { label: 'Очікує', color: 'bg-blue-50 border-blue-500', icon: '⏳' },
  accepted: { label: 'Прийнято', color: 'bg-green-50 border-green-500', icon: '✅' },
  rejected: { label: 'Відхилено', color: 'bg-red-50 border-red-500', icon: '❌' },
  completed: { label: 'Завершено', color: 'bg-purple-50 border-purple-500', icon: '✨' }
};

export function MasterOrdersBoard() {
  const [availableOrders, setAvailableOrders] = useState<Order[]>(mockAvailableOrders);
  const [myProposals, setMyProposals] = useState<MyProposal[]>(mockMyProposals);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<Order['priority'] | 'all'>('all');
  
  // Proposal form
  const [proposalPrice, setProposalPrice] = useState('');
  const [proposalDays, setProposalDays] = useState('');
  const [proposalDesc, setProposalDesc] = useState('');
  const [showProposalForm, setShowProposalForm] = useState(false);

  const filteredOrders = availableOrders.filter(order =>
    (order.id.toLowerCase().includes(filterSearch.toLowerCase()) ||
     order.clientName.toLowerCase().includes(filterSearch.toLowerCase()) ||
     order.deviceModel.toLowerCase().includes(filterSearch.toLowerCase())) &&
    (filterPriority === 'all' || order.priority === filterPriority)
  );

  const { t } = useTranslation();
  const submitProposal = () => {
    if (!selectedOrder || !proposalPrice || !proposalDays || !proposalDesc) {
      alert(t('common.fillAllFields'));
      return;
    }

    const newProposal: MyProposal = {
      id: `mp${myProposals.length + 1}`,
      orderId: selectedOrder.id,
      offerPrice: Number(proposalPrice),
      estimatedDays: Number(proposalDays),
      description: proposalDesc,
      timestamp: new Date().toLocaleString('uk-UA'),
      status: 'pending'
    };

    setMyProposals([...myProposals, newProposal]);
    setAvailableOrders(availableOrders.map(o => 
      o.id === selectedOrder.id 
        ? { ...o, hasMyProposal: true, proposalCount: o.proposalCount + 1 }
        : o
    ));
    setSelectedOrder({ ...selectedOrder, hasMyProposal: true, proposalCount: selectedOrder.proposalCount + 1 });
    
    setProposalPrice('');
    setProposalDays('');
    setProposalDesc('');
    setShowProposalForm(false);
  };

  const deleteProposal = (proposalId: string) => {
    const proposal = myProposals.find(p => p.id === proposalId);
    if (proposal && window.confirm(t('proposals.deleteConfirm'))) {
      setMyProposals(myProposals.filter(p => p.id !== proposalId));
      const order = availableOrders.find(o => o.id === proposal.orderId);
      if (order) {
        setAvailableOrders(availableOrders.map(o => 
          o.id === proposal.orderId 
            ? { ...o, hasMyProposal: false, proposalCount: Math.max(0, o.proposalCount - 1) }
            : o
        ));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">📋 {t('masterOrders.myOrders')}</h1>
              <p className="text-slate-600">{t('masterOrders.description')}</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-lg shadow-lg">
                <p className="text-white text-sm">📊 {t('masterOrders.activeProposals')}</p>
                <p className="text-2xl font-bold text-white">{myProposals.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Available Orders - Left Side */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" /> {t('masterOrders.availableOrders')} ({filteredOrders.length})
                </h2>
              </div>

              {/* Filters */}
              <div className="p-6 border-b border-slate-200 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('masterOrders.searchPlaceholder')}
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterPriority('all')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      filterPriority === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Усі
                  </button>
                  {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setFilterPriority(p)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        filterPriority === p
                          ? priorityConfig[p].color + ' ring-2 ring-offset-2 ring-offset-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {priorityConfig[p].icon} {priorityConfig[p].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">😴 Немає доступних замовлень</p>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all transform hover:scale-102"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-lg">{order.id}</p>
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <User className="w-3 h-3" /> {order.clientName}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig[order.priority].color}`}>
                          {priorityConfig[order.priority].icon} {priorityConfig[order.priority].label}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 mb-3">
                        {order.deviceType} <strong>{order.deviceModel}</strong>: {order.problemDescription}
                      </p>

                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center gap-4 text-slate-600">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" /> {order.estimatedPrice} ₴
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {order.dueDate}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Star className="w-4 h-4" /> {order.clientRating}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="text-xs text-slate-600">
                          💬 {order.proposalCount} пропоз.
                        </span>
                        {order.hasMyProposal && (
                          <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Ваша пропоз.
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* My Proposals - Right Side */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Мої Пропозиції ({myProposals.length})
                </h2>
              </div>

              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {myProposals.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">📝 {t('masterOrders.noProposals')}</p>
                    <p className="text-slate-400 text-sm">{t('masterOrders.selectOrderAndSubmit')}</p>
                  </div>
                ) : (
                  myProposals.map(proposal => (
                    <div
                      key={proposal.id}
                      className={`p-4 rounded-lg border-l-4 ${proposalStatusConfig[proposal.status].color}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-slate-900">{proposal.orderId}</p>
                          <p className="text-xs text-slate-600">{proposal.timestamp}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          proposal.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          proposal.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          proposal.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {proposalStatusConfig[proposal.status].icon} {proposalStatusConfig[proposal.status].label}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 mb-3">{proposal.description}</p>

                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="font-bold text-slate-900">💰 {proposal.offerPrice} ₴</span>
                        <span className="text-slate-600">⏱️ {proposal.estimatedDays} дн.</span>
                      </div>

                      {proposal.status === 'pending' && (
                        <button
                          onClick={() => deleteProposal(proposal.id)}
                          className="w-full px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-semibold text-sm flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> {t('common.delete')}
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-96 overflow-y-auto animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedOrder.id}</h2>
                  <p className="text-slate-600">{selectedOrder.deviceType} {selectedOrder.deviceModel}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Client Info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" /> Клієнт
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Ім'я:</span> {selectedOrder.clientName}</p>
                    <p className="text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> {selectedOrder.clientPhone}</p>
                    <p className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedOrder.location}</p>
                    <p className="text-sm flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> Рейтинг: {selectedOrder.clientRating}/5</p>
                    
                    {/* Client Devices */}
                    {(selectedOrder.clientMobileOS || selectedOrder.clientComputerOS) && (
                      <div className="flex items-center gap-2 pt-2 mt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-600 font-medium">Пристрої:</p>
                        <div className="flex items-center gap-2">
                          {selectedOrder.clientMobileOS && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                              <Smartphone className={`w-4 h-4 ${
                                selectedOrder.clientMobileOS === 'android' ? 'text-green-600' : 'text-gray-900'
                              }`} />
                              <span className="text-xs font-semibold text-slate-700">
                                {selectedOrder.clientMobileOS === 'android' ? 'Android' : 'iOS'}
                              </span>
                            </div>
                          )}
                          {selectedOrder.clientComputerOS && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                              {selectedOrder.clientComputerOS === 'windows' ? (
                                <Monitor className="w-4 h-4 text-blue-600" />
                              ) : selectedOrder.clientComputerOS === 'mac' ? (
                                <Laptop className="w-4 h-4 text-gray-900" />
                              ) : (
                                <Monitor className="w-4 h-4 text-orange-600" />
                              )}
                              <span className="text-xs font-semibold text-slate-700 capitalize">
                                {selectedOrder.clientComputerOS === 'windows' ? 'Windows' : selectedOrder.clientComputerOS === 'mac' ? 'macOS' : 'Linux'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Детали замовлення
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Пріоритет:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityConfig[selectedOrder.priority].color}`}>{priorityConfig[selectedOrder.priority].label}</span></p>
                    <p className="text-sm"><span className="font-semibold">Вартість:</span> {selectedOrder.estimatedPrice} ₴</p>
                    <p className="text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> До: {selectedOrder.dueDate}</p>
                    <p className="text-sm"><span className="font-semibold">Пропоз.:</span> {selectedOrder.proposalCount}</p>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">🔧 Опис проблеми</h3>
                <p className="text-slate-700 text-sm">{selectedOrder.problemDescription}</p>
              </div>

              {/* Proposal Form */}
              {!showProposalForm ? (
                <button
                  onClick={() => setShowProposalForm(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> {t('masterOrders.sendProposal')}
                </button>
              ) : (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="font-bold text-slate-900">{t('masterOrders.fillProposalDetails')}</p>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{t('masterOrders.yourPrice')}</label>
                    <input
                      type="number"
                      value={proposalPrice}
                      onChange={(e) => setProposalPrice(e.target.value)}
                      placeholder={t('masterOrders.priceExample')}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{t('masterOrders.estimatedDays')}</label>
                    <input
                      type="number"
                      value={proposalDays}
                      onChange={(e) => setProposalDays(e.target.value)}
                      placeholder={t('masterOrders.daysExample')}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{t('masterOrders.workDescription')}</label>
                    <textarea
                      value={proposalDesc}
                      onChange={(e) => setProposalDesc(e.target.value)}
                      placeholder={t('masterOrders.descriptionPlaceholder')}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={submitProposal}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                    >
                      {t('masterOrders.sendProposal')}
                    </button>
                    <button
                      onClick={() => setShowProposalForm(false)}
                      className="flex-1 px-4 py-2 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400 transition font-semibold"
                    >
                      {t('common.cancel')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .hover:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
