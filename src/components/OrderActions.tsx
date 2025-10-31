import React from 'react';
import { Order, User } from '../types';
import { Button } from './ui/button';
import { Check, X, AlertCircle, Trash2, Edit, Clock } from 'lucide-react';
import { getAvailableActions } from '../utils/permissions';

interface OrderActionsProps {
  order: Order;
  currentUser: User;
  onAcceptProposal?: () => void;
  onRejectProposal?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  onDispute?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onCreateProposal?: () => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  currentUser,
  onAcceptProposal,
  onRejectProposal: _onRejectProposal,
  onComplete,
  onCancel,
  onDispute,
  onDelete,
  onEdit,
  onCreateProposal,
}) => {
  const availableActions = getAvailableActions(currentUser, order);

  if (availableActions.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {availableActions.includes('acceptProposal') && onAcceptProposal && (
        <Button
          onClick={onAcceptProposal}
          className="bg-green-600 hover:bg-green-700"
          size="sm"
        >
          <Check className="h-4 w-4 mr-1" />
          Accept Proposal
        </Button>
      )}

      {availableActions.includes('complete') && onComplete && (
        <Button
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          <Clock className="h-4 w-4 mr-1" />
          Complete Order
        </Button>
      )}

      {availableActions.includes('cancel') && onCancel && (
        <Button
          onClick={onCancel}
          variant="destructive"
          size="sm"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      )}

      {availableActions.includes('dispute') && onDispute && (
        <Button
          onClick={onDispute}
          className="bg-orange-600 hover:bg-orange-700"
          size="sm"
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          Open Dispute
        </Button>
      )}

      {availableActions.includes('delete') && onDelete && (
        <Button
          onClick={onDelete}
          variant="destructive"
          size="sm"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      )}

      {availableActions.includes('edit') && onEdit && (
        <Button
          onClick={onEdit}
          variant="outline"
          size="sm"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      )}

      {availableActions.includes('createProposal') && onCreateProposal && (
        <Button
          onClick={onCreateProposal}
          className="bg-primary hover:bg-primary/90"
          size="sm"
        >
          Submit Proposal
        </Button>
      )}
    </div>
  );
};
