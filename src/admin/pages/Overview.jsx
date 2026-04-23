import React, { useEffect, useState } from 'react';
import { FiUsers, FiFileText, FiSettings, FiActivity } from 'react-icons/fi';
import api from '../utils/api';

const Overview = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    activeBlogs: 0,
    services: 0,
    pzActivities: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setStatsData(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Users', value: statsData.totalUsers, icon: <FiUsers />, color: '#4F46E5', bg: '#EEF2FF' },
    { title: 'Active Blogs', value: statsData.activeBlogs, icon: <FiFileText />, color: '#10B981', bg: '#D1FAE5' },
    { title: 'Services', value: statsData.services, icon: <FiSettings />, color: '#F59E0B', bg: '#FEF3C7' },
    { title: 'PZ Activities', value: statsData.pzActivities, icon: <FiActivity />, color: '#EC4899', bg: '#FCE7F3' },
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--admin-text-main)' }}>Dashboard Overview</h2>
      
      <div className="admin-overview-grid">
        {stats.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div 
              className="admin-stat-icon" 
              style={{ backgroundColor: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="admin-stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: 'var(--admin-shadow)' }}>
        <h3>Welcome to the Admin Panel</h3>
        <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>
          Select an option from the sidebar to manage your content.
        </p>
      </div>
    </div>
  );
};

export default Overview;
