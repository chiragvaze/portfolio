import React, { useEffect, useState } from 'react';
import { projectAPI, messageAPI } from '../services/api';
import { FolderKanban, Mail, Eye, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projectsRes, messageStatsRes] = await Promise.all([
        projectAPI.getAll(),
        messageAPI.getStats()
      ]);

      setStats({
        projects: projectsRes.data.length,
        messages: messageStatsRes.data.total,
        unreadMessages: messageStatsRes.data.unread
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '3px solid #f3f4f6', 
          borderTop: '3px solid #3b82f6', 
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>
        Dashboard
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Total Projects */}
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Projects</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{stats.projects}</p>
            </div>
            <div style={{ width: '48px', height: '48px', background: '#3b82f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderKanban size={24} color="white" />
            </div>
          </div>
        </div>

        {/* Total Messages */}
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Messages</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{stats.messages}</p>
            </div>
            <div style={{ width: '48px', height: '48px', background: '#10b981', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={24} color="white" />
            </div>
          </div>
        </div>

        {/* Unread Messages */}
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Unread Messages</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{stats.unreadMessages}</p>
            </div>
            <div style={{ width: '48px', height: '48px', background: '#f59e0b', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={24} color="white" />
            </div>
          </div>
        </div>

        {/* Profile Views */}
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Profile Views</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>1.2k+</p>
            </div>
            <div style={{ width: '48px', height: '48px', background: '#8b5cf6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/projects" style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '500' }}>
            Add Project
          </a>
          <a href="/messages" style={{ padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '500' }}>
            View Messages
          </a>
          <a href="/profile" style={{ padding: '0.75rem 1.5rem', background: '#8b5cf6', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '500' }}>
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
