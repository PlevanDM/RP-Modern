import { Order } from "../types/models";

export interface FilterOptions {
  status?: string;
  searchTerm?: string;
  roleFilter?: string;
  cityFilter?: string;
}

export const filterOrdersByStatus = (orders: Order[], status: string): Order[] => {
  if (!status || status === "all") return orders;
  return orders.filter(order => order.status === status);
};

export const searchOrders = (orders: Order[], searchTerm: string): Order[] => {
  if (!searchTerm.trim()) return orders;
  const lowerTerm = searchTerm.toLowerCase();
  return orders.filter(order => 
    order.title?.toLowerCase().includes(lowerTerm) ||
    order.category?.toLowerCase().includes(lowerTerm)
  );
};
