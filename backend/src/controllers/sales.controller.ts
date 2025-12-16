import { Response } from 'express';
import pool from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getAllSales = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { stage, start_date, end_date, limit = 100 } = req.query;
    
    let query = 'SELECT * FROM sales_data WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (stage) {
      query += ` AND stage = $${paramCount}`;
      params.push(stage);
      paramCount++;
    }

    if (start_date) {
      query += ` AND close_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND close_date <= $${paramCount}`;
      params.push(end_date);
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
    console.error('Get all sales error:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
};

export const getSalesById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM sales_data WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sales record not found' });
    }

    res.json({ 
      success: true,
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Get sales by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
};

export const getSalesStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_opportunities,
        SUM(amount) as total_value,
        AVG(amount) as avg_deal_size,
        AVG(probability) as avg_probability,
        COUNT(CASE WHEN stage = 'Closed Won' THEN 1 END) as won_count,
        COUNT(CASE WHEN stage = 'Closed Lost' THEN 1 END) as lost_count
      FROM sales_data
    `;
    
    const result = await pool.query(statsQuery);
    
    res.json({ 
      success: true,
      stats: result.rows[0] 
    });
  } catch (error) {
    console.error('Get sales stats error:', error);
    res.status(500).json({ error: 'Failed to fetch sales statistics' });
  }
};

export const createSalesRecord = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      opportunity_id,
      account_name,
      opportunity_name,
      stage,
      amount,
      close_date,
      probability
    } = req.body;

    const owner_id = req.user?.id;

    const result = await pool.query(
      `INSERT INTO sales_data 
       (opportunity_id, account_name, opportunity_name, stage, amount, close_date, probability, owner_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [opportunity_id, account_name, opportunity_name, stage, amount, close_date, probability, owner_id]
    );

    res.status(201).json({ 
      success: true,
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Create sales record error:', error);
    res.status(500).json({ error: 'Failed to create sales record' });
  }
};
