export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'salesman' | 'manager';
  created_at: Date;
}

export interface SalesData {
  id: string;
  opportunity_id: string;
  account_name: string;
  opportunity_name: string;
  stage: string;
  amount: number;
  close_date: Date;
  probability: number;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface TrendInsightData {
  month: Date;
  opportunity_count: number;
  total_value: number;
  avg_probability: number;
}

export interface ForecastInsightData {
  stage: string;
  count: number;
  total_value: number;
  weighted_value: number;
}

export interface PerformerInsightData {
  name: string;
  email: string;
  deals_count: number;
  total_value: number;
  won_count: number;
}

export interface SalesInsight {
  id: string;
  insight_type: 'trend' | 'forecast' | 'recommendation' | 'alert';
  title: string;
  description: string;
  data: TrendInsightData[] | ForecastInsightData[] | PerformerInsightData[] | Record<string, unknown>;
  created_at: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
