import React from 'react';
import { Order, User } from '../../types/models';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      open: `🟡 ${t('status.open')}`,
      proposed: `💬 ${t('status.proposed')}`,
      accepted: `✅ ${t('status.accepted')}`,
      in_progress: `🔧 ${t('status.in_progress')}`,
      completed: `✔️ ${t('status.completed')}`,
      cancelled: `❌ ${t('status.cancelled')}`,
      deleted: `🗑️ ${t('status.deleted')}`,
      searching: `🔍 ${t('status.searching')}`,
      active_search: `🔍 ${t('status.active_search')}`,
    };
    return statusMap[status] || status;
  };

  const getUrgencyBadge = (urgency?: string) => {
    const urgencyMap: Record<string, string> = {
      high: `🔴 ${t('priority.high')}`,
      medium: `🟡 ${t('priority.medium')}`,
      low: `🟢 ${t('priority.low')}`,
    };
    return urgencyMap[urgency || 'low'] || `🟢 ${t('priority.low')}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Order Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('orderDetails.device')}</p>
          <p className="font-medium text-gray-900">{order.deviceType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('orderDetails.problem')}</p>
          <p className="font-medium text-gray-900">{order.issue}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('orderDetails.status')}</p>
          <p className="font-medium text-gray-900">{getStatusText(order.status)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('orderDetails.urgency')}</p>
          <p className="font-medium text-gray-900">{getUrgencyBadge(order.urgency)}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-gray-500 mb-2">{t('orderDetails.description')}</p>
        <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{order.description}</p>
      </div>

      {/* Master Info */}
      {order.assignedMasterId && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-500 mb-2">{t('orderDetails.assignedMaster')}</p>
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
                  <EditIcon sx={{ fontSize: 20 }} /> {t('common.editOrder')}
                </button>
                <button
                  onClick={() => handleSendToMaster(order.id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageIcon sx={{ fontSize: 20 }} /> {t('orderDetails.sendToMasters')}
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
                  {order.isActiveSearch !== false ? t('orderDetails.pauseSearch') : t('orderDetails.activateSearch')}
                </button>
                <button
                  onClick={() => handleDeleteOrder(order)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CloseIcon sx={{ fontSize: 20 }} /> {t('orderDetails.deleteOrder')}
                </button>
              </>
            )}

            {order.status === 'deleted' && (
              <>
                <button
                  onClick={() => handleRestoreOrder(order)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon sx={{ fontSize: 20 }} /> {t('orderDetails.restoreOrder')}
                </button>
              </>
            )}

            {order.status === 'in_progress' && (
              <button
                onClick={() => setActiveItem('messages')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MessageIcon sx={{ fontSize: 20 }} /> {t('orderDetails.chatWithMaster')}
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
              <EditIcon sx={{ fontSize: 20 }} /> {t('common.edit')}
            </button>
            <button
              onClick={() => handleDeleteOrder(order)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CloseIcon sx={{ fontSize: 20 }} /> {t('common.delete')}
            </button>
          </>
        )}

        {/* MASTER ACTIONS */}
        {currentUser?.role === 'master' && (
          <>
            {order.status === 'proposed' && (
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                📊 {t('orderDetails.viewProposals')}
              </button>
            )}

            {order.status === 'open' && (
              <button
                onClick={() => setShowProposalModal(true)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <EditIcon sx={{ fontSize: 20 }} /> {t('orderDetails.submitProposal')}
              </button>
            )}

            {order.status === 'in_progress' && (
              <>
                <button
                  onClick={() => setActiveItem('messages')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageIcon sx={{ fontSize: 20 }} /> {t('orderDetails.chatWithClient')}
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors">
                  📸 {t('common.sharePhoto')}
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
