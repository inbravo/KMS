export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface SalesData {
  id: string;
  opportunity_id: string;
  account_name: string;
  opportunity_name: string;
  stage: string;
  amount: number;
  close_date: string;
  probability: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface SalesStats {
  total_opportunities: string;
  total_value: string;
  avg_deal_size: string;
  avg_probability: string;
  won_count: string;
  lost_count: string;
}

export interface InsightData {
  id: string;
  insight_type: 'trend' | 'forecast' | 'recommendation' | 'alert';
  title: string;
  description: string;
  data: TrendData[] | ForecastData[] | PerformerData[] | Record<string, unknown>;
  created_at: string;
}

export interface TrendData {
  month: string;
  opportunity_count: string;
  total_value: string;
  avg_probability: string;
}

export interface ForecastData {
  stage: string;
  count: string;
  total_value: string;
  weighted_value: string;
  [key: string]: string | number; // Allow indexing for Recharts compatibility
}

export interface PerformerData {
  name: string;
  email: string;
  deals_count: string;
  total_value: string;
  won_count: string;
}
