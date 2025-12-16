-- Database Schema for Sales Intelligence Knowledge Management System

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'salesman', 'manager')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales_data table
CREATE TABLE IF NOT EXISTS sales_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id VARCHAR(255) UNIQUE NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  opportunity_name VARCHAR(255) NOT NULL,
  stage VARCHAR(100) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  close_date DATE NOT NULL,
  probability INTEGER NOT NULL CHECK (probability >= 0 AND probability <= 100),
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales_insights table
CREATE TABLE IF NOT EXISTS sales_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_type VARCHAR(50) NOT NULL CHECK (insight_type IN ('trend', 'forecast', 'recommendation', 'alert')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sales_data_stage ON sales_data(stage);
CREATE INDEX IF NOT EXISTS idx_sales_data_close_date ON sales_data(close_date);
CREATE INDEX IF NOT EXISTS idx_sales_data_owner_id ON sales_data(owner_id);
CREATE INDEX IF NOT EXISTS idx_sales_insights_type ON sales_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample data for testing
INSERT INTO users (email, password, name, role) VALUES
  ('admin@impetus.com', '$2a$10$XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 'Admin User', 'admin'),
  ('john.doe@impetus.com', '$2a$10$XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 'John Doe', 'salesman'),
  ('jane.smith@impetus.com', '$2a$10$XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 'Jane Smith', 'manager')
ON CONFLICT (email) DO NOTHING;

-- Insert sample sales data
INSERT INTO sales_data (opportunity_id, account_name, opportunity_name, stage, amount, close_date, probability, owner_id) 
SELECT 
  'OPP-' || LPAD(generate_series::text, 5, '0'),
  'Account ' || generate_series,
  'Deal ' || generate_series,
  CASE (generate_series % 5)
    WHEN 0 THEN 'Prospecting'
    WHEN 1 THEN 'Qualification'
    WHEN 2 THEN 'Proposal'
    WHEN 3 THEN 'Closed Won'
    ELSE 'Closed Lost'
  END,
  (RANDOM() * 100000 + 10000)::DECIMAL(15, 2),
  CURRENT_DATE + (generate_series || ' days')::INTERVAL,
  (RANDOM() * 80 + 20)::INTEGER,
  (SELECT id FROM users WHERE role = 'salesman' LIMIT 1)
FROM generate_series(1, 20)
ON CONFLICT (opportunity_id) DO NOTHING;
