import { getAuthHeaders, getApiUrl } from './apiUrlHelper';
import axios from 'axios';

// Types for admin statistics
export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeRepairs: number;
  completedRepairs: number;
  totalMasters: number;
  totalClients: number;
  platformCommission: number;
  avgRating: number;
}

export interface FinancialData {
  period: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface TransactionData {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface TopMasterData {
  id: string;
  name: string;
  repairs: number;
  rating: number;
  avatar?: string;
  revenue: number;
}

// Fetch admin statistics
export async function getAdminStats(): Promise<AdminStats> {
  try {
    const response = await axios.get(`${getApiUrl()}/api/admin/stats`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to fetch admin stats:', error);
    }
    // Return default stats if API fails
    return {
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      activeRepairs: 0,
      completedRepairs: 0,
      totalMasters: 0,
      totalClients: 0,
      platformCommission: 0,
      avgRating: 0
    };
  }
}

// Fetch financial data
export async function getFinancialData(period: 'week' | 'month' | 'year' = 'month'): Promise<FinancialData[]> {
  try {
    const response = await axios.get(`${getApiUrl()}/api/admin/financials`, {
      params: { period },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to fetch financial data:', error);
    }
    return [];
  }
}

// Fetch transactions
export async function getTransactions(limit: number = 10): Promise<TransactionData[]> {
  try {
    const response = await axios.get(`${getApiUrl()}/api/admin/transactions`, {
      params: { limit },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to fetch transactions:', error);
    }
    return [];
  }
}

// Fetch top masters
export async function getTopMasters(limit: number = 5): Promise<TopMasterData[]> {
  try {
    const response = await axios.get(`${getApiUrl()}/api/admin/top-masters`, {
      params: { limit },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to fetch top masters:', error);
    }
    return [];
  }
}

// Get user list for admin dashboard
export async function getUsersForAdmin(page: number = 1, limit: number = 10) {
  try {
    const response = await axios.get(`${getApiUrl()}/api/admin/users`, {
      params: { page, limit },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to fetch users:', error);
    }
    return { users: [], total: 0 };
  }
}

// Block/unblock user
export async function updateUserStatus(userId: string, status: 'active' | 'blocked') {
  try {
    const response = await axios.patch(`${getApiUrl()}/api/admin/users/${userId}`, 
      { blocked: status === 'blocked' },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to update user status:', error);
    }
    throw error;
  }
}

export default {
  getAdminStats,
  getFinancialData,
  getTransactions,
  getTopMasters,
  getUsersForAdmin,
  updateUserStatus
};
