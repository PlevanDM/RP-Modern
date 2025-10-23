// src/hooks/useProposalManagement.ts
import { useState } from 'react';
import { Order, Proposal } from '../types';
import { saveOrdersToStorage } from '../utils/orderManager';

export const useProposalManagement = (
  orders: Order[],
  setOrders: (orders: Order[]) => void,
  initialProposals: Proposal[]
) => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  const createProposal = (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: `prop_${Date.now()}`,
      createdAt: new Date(),
      status: 'pending',
    };

    const updatedOrders = orders.map(order =>
      order.id === proposalData.orderId
        ? { ...order, status: 'awaiting_client_confirmation' as const }
        : order
    );

    const updatedProposals = [...proposals, newProposal];

    setProposals(updatedProposals);
    setOrders(updatedOrders);
    saveOrdersToStorage(updatedOrders);
    localStorage.setItem('repairHubProposals', JSON.stringify(updatedProposals));
  };

  const acceptProposal = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return;

    const updatedProposals = proposals.map(p =>
      p.id === proposalId ? { ...p, status: 'accepted' as const } : p
    );

    const updatedOrders = orders.map(order =>
      order.id === proposal.orderId
        ? { ...order, status: 'in_progress' as const }
        : order
    );

    setProposals(updatedProposals);
    setOrders(updatedOrders);
    localStorage.setItem('repairHubProposals', JSON.stringify(updatedProposals));
    saveOrdersToStorage(updatedOrders);
  };

  const rejectProposal = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return;

    const updatedProposals = proposals.map(p =>
      p.id === proposalId ? { ...p, status: 'rejected' as const } : p
    );

    const otherProposals = proposals.filter(p => p.orderId === proposal.orderId && p.id !== proposalId);
    const hasOtherPendingProposals = otherProposals.some(p => p.status === 'pending' || p.status === 'accepted');

    const updatedOrders = orders.map(order =>
      order.id === proposal.orderId
        ? { ...order, status: hasOtherPendingProposals ? 'proposed' as const : 'open' as const }
        : order
    );

    setProposals(updatedProposals);
    setOrders(updatedOrders);
    localStorage.setItem('repairHubProposals', JSON.stringify(updatedProposals));
    saveOrdersToStorage(updatedOrders);
  };

  return {
    proposals,
    setProposals,
    createProposal,
    acceptProposal,
    rejectProposal,
  };
};
