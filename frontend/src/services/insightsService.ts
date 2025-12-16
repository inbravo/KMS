import api from './api';
import { TrendData, ForecastData } from '../types';

export const insightsService = {
  async getTrends() {
    const response = await api.get<{ success: boolean; insight_type: string; data: TrendData[] }>('/insights/trends');
    return response.data;
  },

  async getForecast() {
    const response = await api.get<{ success: boolean; insight_type: string; data: ForecastData[] }>('/insights/forecast');
    return response.data;
  },

  async getTopPerformers() {
    const response = await api.get<{ success: boolean; insight_type: string; data: any[] }>('/insights/top-performers');
    return response.data;
  },
};
