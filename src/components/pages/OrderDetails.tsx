import React from 'react';
import { Order, User } from '../../types/models';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface OrderDetailsProps {
  order: Order;
  currentUser: User;
  handleEditOrder: () => void;
  handleSendToMaster: (orderId: string) => void;
  handleToggleActiveSearch: (order: Order) => void;
  handleDeleteOrder: (order: Order) => void;
  handleRestoreOrder: (order: Order) => void;
  setShowProposalModal: (show: boolean) => void;
  acceptProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string) => void;
  setActiveItem: (item: string) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  currentUser,
  handleEditOrder,
  handleSendToMaster,
  handleToggleActiveSearch,
  handleDeleteOrder,
  handleRestoreOrder,
  setShowProposalModal,
  acceptProposal,
  rejectProposal,
  setActiveItem,
}) => {
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      open: '🟡 Відкрито',
      proposed: '💬 Є пропозиції',
      accepted: '✅ Прийнято',
      in_progress: '🔧 В роботі',
      completed: '✔️ Завершено',
      cancelled: '❌ Скасовано',
      deleted: '🗑️ Видалено',
      searching: '🔍 Пошук майстра',
      active_search: '🔍 Активний пошук майстра',
    };
    return statusMap[status] || status;
  };

  const getUrgencyBadge = (urgency?: string) => {
    const urgencyMap: Record<string, string> = {
      high: '🔴 Терміно',
      medium: '🟡 Звичайно',
      low: '🟢 Не терміно',
    };
    return urgencyMap[urgency || 'low'] || '🟢 Не терміно';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Order Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Пристрій</p>
          <p className="font-medium text-gray-900">{order.deviceType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Проблема</p>
          <p className="font-medium text-gray-900">{order.issue}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Статус</p>
          <p className="font-medium text-gray-900">{getStatusText(order.status)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Терміновість</p>
          <p className="font-medium text-gray-900">{getUrgencyBadge(order.urgency)}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Опис</p>
        <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{order.description}</p>
      </div>

      {/* Master Info */}
      {order.assignedMasterId && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-500 mb-2">Призначений майстер</p>
          <p className="font-medium text-gray-900">Alex Master</p>
        </div>
      )}

      {/* Pricing Info */}
      {order.agreedPrice && (
        <div className="grid grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
          <div>
            <p className="text-sm text-gray-500">Запропонована ціна</p>
            <p className="text-lg font-bold text-green-600">
              ${order.proposedPrice || order.agreedPrice}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Узгоджена ціна</p>
            <p className="text-lg font-bold text-green-600">${order.agreedPrice}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4">
        {/* CLIENT ACTIONS */}
        {currentUser?.role === 'client' && (
          <>
            {order.status === 'proposed' && (
              <>
                <button
                  onClick={() => acceptProposal(order.proposals[0].id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon sx={{ fontSize: 20 }} /> Прийняти пропозицію
                </button>
                <button
                  onClick={() => rejectProposal(order.proposals[0].id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CancelIcon sx={{ fontSize: 20 }} /> Відхилити
                </button>
              </>
            )}

            {order.status === 'open' && (
              <>
                <button
                  onClick={handleEditOrder}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <EditIcon sx={{ fontSize: 20 }} /> Редагувати замовлення
                </button>
                <button
                  onClick={() => handleSendToMaster(order.id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageIcon sx={{ fontSize: 20 }} /> Відправити майстрам
                </button>
                <button
                  onClick={() => handleToggleActiveSearch(order)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    order.isActiveSearch !== false
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <SearchIcon sx={{ fontSize: 20 }} />
                  {order.isActiveSearch !== false ? 'Призупинити пошук' : 'Активувати пошук'}
                </button>
                <button
                  onClick={() => handleDeleteOrder(order)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CloseIcon sx={{ fontSize: 20 }} /> Видалити замовлення
                </button>
              </>
            )}

            {order.status === 'deleted' && (
              <>
                <button
                  onClick={() => handleRestoreOrder(order)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon sx={{ fontSize: 20 }} /> Відновити замовлення
                </button>
              </>
            )}

            {order.status === 'in_progress' && (
              <button
                onClick={() => setActiveItem('messages')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MessageIcon sx={{ fontSize: 20 }} /> Чат з майстром
              </button>
            )}
          </>
        )}

        {/* ADMIN ACTIONS */}
        {currentUser?.role === 'admin' && (
          <>
            <button
              onClick={handleEditOrder}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <EditIcon sx={{ fontSize: 20 }} /> Редагувати
            </button>
            <button
              onClick={() => handleDeleteOrder(order)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CloseIcon sx={{ fontSize: 20 }} /> Видалити
            </button>
          </>
        )}

        {/* MASTER ACTIONS */}
        {currentUser?.role === 'master' && (
          <>
            {order.status === 'proposed' && (
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                📊 Переглянути пропозиції
              </button>
            )}

            {order.status === 'open' && (
              <button
                onClick={() => setShowProposalModal(true)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <EditIcon sx={{ fontSize: 20 }} /> Розмістити пропозицію
              </button>
            )}

            {order.status === 'in_progress' && (
              <>
                <button
                  onClick={() => setActiveItem('messages')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageIcon sx={{ fontSize: 20 }} /> Чат з клієнтом
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors">
                  📸 Поділитися фото
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
