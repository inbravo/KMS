import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { salesService } from '../services/salesService';
import { insightsService } from '../services/insightsService';
import { SalesStats, TrendData, ForecastData } from '../types';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, trendsData, forecastData] = await Promise.all([
        salesService.getSalesStats(),
        insightsService.getTrends(),
        insightsService.getForecast(),
      ]);
      
      setStats(statsData.stats);
      setTrends(trendsData.data);
      setForecast(forecastData.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  const formatCurrency = (value: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(value.toString()));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>📊 Sales Intelligence Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Opportunities</h3>
            <p className="stat-value">{stats?.total_opportunities || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Pipeline Value</h3>
            <p className="stat-value">{stats ? formatCurrency(stats.total_value) : '$0'}</p>
          </div>
          <div className="stat-card">
            <h3>Average Deal Size</h3>
            <p className="stat-value">{stats ? formatCurrency(stats.avg_deal_size) : '$0'}</p>
          </div>
          <div className="stat-card">
            <h3>Win Rate</h3>
            <p className="stat-value">
              {stats 
                ? `${Math.round((parseInt(stats.won_count) / parseInt(stats.total_opportunities)) * 100)}%`
                : '0%'
              }
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Trends Chart */}
          <div className="chart-card">
            <h3>Sales Trends (Last 12 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="total_value" stroke="#667eea" strokeWidth={2} name="Total Value" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast Chart */}
          <div className="chart-card">
            <h3>Pipeline Forecast by Stage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="weighted_value" fill="#764ba2" name="Weighted Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stage Distribution */}
          <div className="chart-card">
            <h3>Opportunities by Stage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={forecast as any}
                  dataKey="count"
                  nameKey="stage"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {forecast.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Section */}
        <div className="insights-section">
          <h2>Key Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <span className="insight-icon">📈</span>
              <div>
                <h4>Growing Pipeline</h4>
                <p>Your pipeline has grown by 15% this quarter</p>
              </div>
            </div>
            <div className="insight-card">
              <span className="insight-icon">🎯</span>
              <div>
                <h4>Top Performers</h4>
                <p>3 salespeople exceeded their quotas this month</p>
              </div>
            </div>
            <div className="insight-card">
              <span className="insight-icon">⚠️</span>
              <div>
                <h4>Attention Needed</h4>
                <p>5 opportunities are at risk of being lost</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
