import { Response } from 'express';
import pool from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getAllInsights = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { type, limit = 20 } = req.query;
    
    let query = 'SELECT * FROM sales_insights WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (type) {
      query += ` AND insight_type = $${paramCount}`;
      params.push(type);
      paramCount++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount}`;
    params.push(limit);

    const result = await pool.query(query, params);
    res.json({ 
      success: true,
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Get all insights error:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
};

export const getTrendInsights = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Calculate sales trends over time
    const trendsQuery = `
      SELECT 
        DATE_TRUNC('month', close_date) as month,
        COUNT(*) as opportunity_count,
        SUM(amount) as total_value,
        AVG(probability) as avg_probability
      FROM sales_data
      WHERE close_date >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', close_date)
      ORDER BY month DESC
    `;
    
    const result = await pool.query(trendsQuery);
    
    res.json({ 
      success: true,
      insight_type: 'trend',
      data: result.rows 
    });
  } catch (error) {
    console.error('Get trend insights error:', error);
    res.status(500).json({ error: 'Failed to fetch trend insights' });
  }
};

export const getForecastInsights = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Simple forecast based on pipeline
    const forecastQuery = `
      SELECT 
        stage,
        COUNT(*) as count,
        SUM(amount) as total_value,
        SUM(amount * probability / 100) as weighted_value
      FROM sales_data
      WHERE stage NOT IN ('Closed Won', 'Closed Lost')
      GROUP BY stage
      ORDER BY weighted_value DESC
    `;
    
    const result = await pool.query(forecastQuery);
    
    res.json({ 
      success: true,
      insight_type: 'forecast',
      data: result.rows 
    });
  } catch (error) {
    console.error('Get forecast insights error:', error);
    res.status(500).json({ error: 'Failed to fetch forecast insights' });
  }
};

export const getTopPerformers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const performersQuery = `
      SELECT 
        u.name,
        u.email,
        COUNT(sd.id) as deals_count,
        SUM(sd.amount) as total_value,
        COUNT(CASE WHEN sd.stage = 'Closed Won' THEN 1 END) as won_count
      FROM users u
      LEFT JOIN sales_data sd ON u.id = sd.owner_id
      WHERE u.role = 'salesman'
      GROUP BY u.id, u.name, u.email
      ORDER BY total_value DESC
      LIMIT 10
    `;
    
    const result = await pool.query(performersQuery);
    
    res.json({ 
      success: true,
      insight_type: 'recommendation',
      data: result.rows 
    });
  } catch (error) {
    console.error('Get top performers error:', error);
    res.status(500).json({ error: 'Failed to fetch top performers' });
  }
};
