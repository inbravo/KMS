import api from './api';
import { SalesData, SalesStats } from '../types';

export const salesService = {
  async getAllSales(params?: { stage?: string; start_date?: string; end_date?: string; limit?: number }) {
    const response = await api.get<{ success: boolean; count: number; data: SalesData[] }>('/sales', { params });
    return response.data;
  },

  async getSalesById(id: string) {
    const response = await api.get<{ success: boolean; data: SalesData }>(`/sales/${id}`);
    return response.data;
  },

  async getSalesStats() {
    const response = await api.get<{ success: boolean; stats: SalesStats }>('/sales/stats');
    return response.data;
  },

  async createSalesRecord(data: Partial<SalesData>) {
    const response = await api.post<{ success: boolean; data: SalesData }>('/sales', data);
    return response.data;
  },
};
