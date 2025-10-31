// src/hooks/useProposalManagement.test.ts
import { renderHook, act } from '@testing-library/react';
import { useProposalManagement } from './useProposalManagement';
import { Order, Proposal } from '../types';

const mockOrders: Order[] = [
  { id: 'order1', status: 'open', clientId: 'client1', title: 'Test Order 1', clientName: 'Test Client 1', createdAt: new Date(), updatedAt: new Date(), urgency: 'low', description: 'Test Description 1', deviceType: 'Test Device Type 1', issue: 'Test Issue 1', device: 'Test Device 1', city: 'Test City 1', budget: 100, proposalCount: 0, paymentStatus: 'pending', paymentAmount: 0, paymentMethod: 'card', escrowId: '', paymentDate: new Date(), disputeStatus: 'none' },
  { id: 'order2', status: 'open', clientId: 'client2', title: 'Test Order 2', clientName: 'Test Client 2', createdAt: new Date(), updatedAt: new Date(), urgency: 'medium', description: 'Test Description 2', deviceType: 'Test Device Type 2', issue: 'Test Issue 2', device: 'Test Device 2', city: 'Test City 2', budget: 200, proposalCount: 0, paymentStatus: 'pending', paymentAmount: 0, paymentMethod: 'card', escrowId: '', paymentDate: new Date(), disputeStatus: 'none' },
];

const mockProposals: Proposal[] = [];

describe('useProposalManagement', () => {
  it('should create a proposal and update the order status', () => {
    let orders = [...mockOrders];
    const setOrders = (newOrders: Order[]) => {
      orders = newOrders;
    };
    const { result } = renderHook(() => useProposalManagement(orders, setOrders, mockProposals));

    act(() => {
      result.current.createProposal({
        orderId: 'order1',
        masterId: 'master1',
        price: 100,
        description: 'Test proposal',
        masterName: 'Test Master',
        masterRating: 5,
        masterAvatar: 'test-avatar',
        estimatedDays: 1,
      });
    });

    expect(result.current.proposals).toHaveLength(1);
    expect(result.current.proposals[0].orderId).toBe('order1');
    expect(orders.find(o => o.id === 'order1')?.status).toBe('awaiting_client_confirmation');
  });

  it('should accept a proposal and update the order status', () => {
    let orders = [...mockOrders];
    const setOrders = (newOrders: Order[]) => {
      orders = newOrders;
    };

    const { result } = renderHook(() => useProposalManagement(orders, setOrders, mockProposals));

    act(() => {
      result.current.createProposal({
        orderId: 'order1',
        masterId: 'master1',
        price: 100,
        description: 'Test proposal',
        masterName: 'Test Master',
        masterRating: 5,
        masterAvatar: 'test-avatar',
        estimatedDays: 1,
      });
    });

    const proposalId = result.current.proposals[0].id;

    act(() => {
      result.current.acceptProposal(proposalId);
    });

    expect(result.current.proposals[0].status).toBe('accepted');
    expect(orders.find(o => o.id === 'order1')?.status).toBe('in_progress');
  });

  it('should reject a proposal and update the order status to open if no other proposals', () => {
    let orders = [...mockOrders];
    const setOrders = (newOrders: Order[]) => {
      orders = newOrders;
    };
    const { result } = renderHook(() => useProposalManagement(orders, setOrders, mockProposals));

    act(() => {
      result.current.createProposal({
        orderId: 'order1',
        masterId: 'master1',
        price: 100,
        description: 'Test proposal',
        masterName: 'Test Master',
        masterRating: 5,
        masterAvatar: 'test-avatar',
        estimatedDays: 1,
      });
    });

    const proposalId = result.current.proposals[0].id;

    act(() => {
      result.current.rejectProposal(proposalId);
    });

    expect(result.current.proposals[0].status).toBe('rejected');
    expect(orders.find(o => o.id === 'order1')?.status).toBe('open');
  });

    it('should reject a proposal and update the order status to proposed if there are other proposals', () => {
    let orders = [...mockOrders];
    const setOrders = (newOrders: Order[]) => {
      orders = newOrders;
    };
    const initialProposals: Proposal[] = [
        { id: 'prop1', orderId: 'order1', masterId: 'master2', price: 120, description: 'Another proposal', status: 'pending', masterName: 'Another Master', masterRating: 4, masterAvatar: 'avatar2', createdAt: new Date(), estimatedDays: 2, photos: [] }
    ]
    const { result } = renderHook(() => useProposalManagement(orders, setOrders, initialProposals));

    act(() => {
      result.current.createProposal({
        orderId: 'order1',
        masterId: 'master1',
        price: 100,
        description: 'Test proposal',
        masterName: 'Test Master',
        masterRating: 5,
        masterAvatar: 'test-avatar',
        estimatedDays: 1,
      });
    });

    const proposalId = result.current.proposals[1].id;

    act(() => {
      result.current.rejectProposal(proposalId);
    });

    expect(result.current.proposals[1].status).toBe('rejected');
    expect(orders.find(o => o.id === 'order1')?.status).toBe('proposed');
  });
});
