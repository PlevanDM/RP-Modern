import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Eye,
  MessageSquare,
  CheckCircle,
  X,
  Camera,
  FileText,
  Download,
  Send,
  Phone,
  Mail,
  Video,
  Activity
} from 'lucide-react';

interface Order {
  id: string;
  deviceType: string;
  brand: string;
  model: string;
  repairType: string;
  description: string;
  urgency: 'urgent' | 'normal' | 'flexible';
  budget: { min: number; max: number };
  location: string;
  preferredTime: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientRating: number;
  createdAt: Date;
  estimatedCompletion: Date;
  proposals: any[];
  photos: string[];
  videos: string[];
  documents: string[];
}

interface MasterOrderBoardProps {
  currentUser: any;
}

export const MasterOrderBoard: React.FC<MasterOrderBoardProps> = ({ currentUser }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'urgent' | 'normal' | 'flexible'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalData, setProposalData] = useState({
    price: 0,
    estimatedTime: '',
    description: '',
    conditions: ''
  });

  // Mock data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'order_1',
        deviceType: 'smartphone',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        repairType: 'screen',
        description: 'Треснул экран после падения. Нужна замена дисплея.',
        urgency: 'urgent',
        budget: { min: 5000, max: 15000 },
        location: 'Киев, Печерск',
        preferredTime: 'Вечером',
        status: 'pending',
        clientId: 'client_1',
        clientName: 'Анна Коваленко',
        clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
        clientRating: 4.8,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        proposals: [],
        photos: ['photo1.jpg', 'photo2.jpg'],
        videos: [],
        documents: []
      },
      {
        id: 'order_2',
        deviceType: 'laptop',
        brand: 'Dell',
        model: 'XPS 13',
        repairType: 'battery',
        description: 'Батарея быстро разряжается. Нужна диагностика и замена.',
        urgency: 'normal',
        budget: { min: 3000, max: 8000 },
        location: 'Киев, Оболонь',
        preferredTime: 'Выходные',
        status: 'pending',
        clientId: 'client_2',
        clientName: 'Олександр Петренко',
        clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olexandr',
        clientRating: 4.6,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        proposals: [],
        photos: ['photo3.jpg'],
        videos: [],
        documents: ['warranty.pdf']
      },
      {
        id: 'order_3',
        deviceType: 'tablet',
        brand: 'Samsung',
        model: 'Galaxy Tab S9',
        repairType: 'water',
        description: 'Попала вода в планшет. Не включается, нужна чистка.',
        urgency: 'urgent',
        budget: { min: 4000, max: 12000 },
        location: 'Киев, Шевченківський',
        preferredTime: 'Как можно скорее',
        status: 'in_progress',
        clientId: 'client_3',
        clientName: 'Марія Іваненко',
        clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
        clientRating: 4.9,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        proposals: [{ id: 'proposal_1', masterId: currentUser.id, price: 8000, status: 'accepted' }],
        photos: ['photo4.jpg', 'photo5.jpg'],
        videos: ['video1.mp4'],
        documents: []
      }
    ];
    
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, [currentUser.id]);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(order => order.urgency === urgencyFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchQuery, statusFilter, urgencyFilter]);

  const handleSendProposal = () => {
    if (selectedOrder) {
      const proposal = {
        id: `proposal_${Date.now()}`,
        masterId: currentUser.id,
        masterName: currentUser.name,
        price: proposalData.price,
        estimatedTime: proposalData.estimatedTime,
        description: proposalData.description,
        conditions: proposalData.conditions,
        status: 'pending',
        createdAt: new Date()
      };

      setOrders(prev => prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, proposals: [...order.proposals, proposal] }
          : order
      ));

      setShowProposalModal(false);
      setProposalData({ price: 0, estimatedTime: '', description: '', conditions: '' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'normal': return 'text-blue-600 bg-blue-100';
      case 'flexible': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in_progress': return Activity;
      case 'completed': return CheckCircle;
      case 'cancelled': return X;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Доска заказов
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Найдите подходящие заказы и отправьте предложения
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{filteredOrders.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Доступно</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'in_progress').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">В работе</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Завершено</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск заказов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Все статусы</option>
              <option value="pending">Ожидают</option>
              <option value="in_progress">В работе</option>
              <option value="completed">Завершены</option>
            </select>

            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Любая срочность</option>
              <option value="urgent">Срочно</option>
              <option value="normal">Обычно</option>
              <option value="flexible">Не спешу</option>
            </select>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order, index) => {
            const StatusIcon = getStatusIcon(order.status);
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{order.brand} {order.model}</h3>
                      <p className="text-sm text-blue-100">{order.deviceType}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status === 'pending' ? 'Ожидает' :
                         order.status === 'in_progress' ? 'В работе' :
                         order.status === 'completed' ? 'Завершен' : 'Отменен'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Client Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={order.clientAvatar}
                      alt={order.clientName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.clientName}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {order.clientRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {order.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{order.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{order.preferredTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget and Urgency */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ₴{order.budget.min} - ₴{order.budget.max}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(order.urgency)}`}>
                      {order.urgency === 'urgent' ? 'Срочно' :
                       order.urgency === 'normal' ? 'Обычно' : 'Не спешу'}
                    </span>
                  </div>

                  {/* Media Count */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    {order.photos.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Camera className="w-4 h-4" />
                        <span>{order.photos.length}</span>
                      </div>
                    )}
                    {order.videos.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span>{order.videos.length}</span>
                      </div>
                    )}
                    {order.documents.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{order.documents.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                        setShowProposalModal(true);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Предложить
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{selectedOrder.brand} {selectedOrder.model}</h2>
                      <p className="text-blue-100">{selectedOrder.deviceType} • {selectedOrder.repairType}</p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Info */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Информация о заказе
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Статус:</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                              {selectedOrder.status === 'pending' ? 'Ожидает' :
                               selectedOrder.status === 'in_progress' ? 'В работе' :
                               selectedOrder.status === 'completed' ? 'Завершен' : 'Отменен'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Срочность:</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(selectedOrder.urgency)}`}>
                              {selectedOrder.urgency === 'urgent' ? 'Срочно' :
                               selectedOrder.urgency === 'normal' ? 'Обычно' : 'Не спешу'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Бюджет:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ₴{selectedOrder.budget.min} - ₴{selectedOrder.budget.max}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Местоположение:</span>
                            <span className="text-gray-900 dark:text-white">{selectedOrder.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Предпочтительное время:</span>
                            <span className="text-gray-900 dark:text-white">{selectedOrder.preferredTime}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Описание проблемы
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedOrder.description}
                        </p>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Информация о клиенте
                        </h3>
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <img
                            src={selectedOrder.clientAvatar}
                            alt={selectedOrder.clientName}
                            className="w-16 h-16 rounded-full"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {selectedOrder.clientName}
                            </h4>
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {selectedOrder.clientRating}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                                <Phone className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-lg">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Media */}
                      {(selectedOrder.photos.length > 0 || selectedOrder.videos.length > 0 || selectedOrder.documents.length > 0) && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Медиафайлы
                          </h3>
                          <div className="space-y-3">
                            {selectedOrder.photos.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Фотографии ({selectedOrder.photos.length})
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {selectedOrder.photos.map((photo, index) => (
                                    <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                      <Camera className="w-8 h-8 text-gray-400" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {selectedOrder.videos.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Видео ({selectedOrder.videos.length})
                                </h4>
                                <div className="space-y-2">
                                  {selectedOrder.videos.map((video, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                      <div className="flex items-center space-x-2">
                                        <Video className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900 dark:text-white">{video}</span>
                                      </div>
                                      <button className="p-1 text-blue-600 hover:text-blue-800">
                                        <Download className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {selectedOrder.documents.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Документы ({selectedOrder.documents.length})
                                </h4>
                                <div className="space-y-2">
                                  {selectedOrder.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                      <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900 dark:text-white">{doc}</span>
                                      </div>
                                      <button className="p-1 text-blue-600 hover:text-blue-800">
                                        <Download className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                      <Eye className="w-4 h-4 mr-2 inline" />
                      Просмотр
                    </button>
                    <button className="px-4 py-2 text-blue-600 hover:text-blue-800">
                      <MessageSquare className="w-4 h-4 mr-2 inline" />
                      Сообщение
                    </button>
                  </div>
                  <button
                    onClick={() => setShowProposalModal(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Отправить предложение
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proposal Modal */}
        <AnimatePresence>
          {showProposalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full"
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Отправить предложение</h2>
                    <button
                      onClick={() => setShowProposalModal(false)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Цена (₴)
                    </label>
                    <input
                      type="number"
                      value={proposalData.price}
                      onChange={(e) => setProposalData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Время выполнения
                    </label>
                    <input
                      type="text"
                      value={proposalData.estimatedTime}
                      onChange={(e) => setProposalData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                      placeholder="Например: 2-3 дня"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Описание работы
                    </label>
                    <textarea
                      value={proposalData.description}
                      onChange={(e) => setProposalData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Опишите, что будете делать..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Условия
                    </label>
                    <textarea
                      value={proposalData.conditions}
                      onChange={(e) => setProposalData(prev => ({ ...prev, conditions: e.target.value }))}
                      placeholder="Гарантия, условия оплаты, дополнительные услуги..."
                      rows={2}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowProposalModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleSendProposal}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Отправить предложение
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
