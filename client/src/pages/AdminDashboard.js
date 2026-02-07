import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ onClose }) {
  const [stats, setStats] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/responses/all');
      setStats(response.data.statistics);
      setResponses(response.data.responses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h3>{stats.completedUsers}</h3>
              <p>Completed</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalYesClicks}</h3>
              <p>Total "Yes" Clicks</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalNoClicks}</h3>
              <p>Total "No" Clicks</p>
            </div>
          </div>
        )}

        <h2>User Responses</h2>
        <table className="responses-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Started At</th>
              <th>Completed</th>
              <th>Total Clicks</th>
              <th>Yes/No Count</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => {
              const yesCount = response.screenResponses.filter(r => r.response === 'Yes').length;
              const noCount = response.screenResponses.filter(r => r.response === 'No').length;
              
              return (
                <tr key={response._id}>
                  <td><strong>{response.name}</strong></td>
                  <td>{formatDate(response.createdAt)}</td>
                  <td>{response.completedAt ? '✅ Yes' : '⏳ In Progress'}</td>
                  <td>{response.screenResponses.length}</td>
                  <td>
                    <span style={{color: '#28a745', fontWeight: 'bold'}}>Yes: {yesCount}</span>
                    {' | '}
                    <span style={{color: '#dc3545', fontWeight: 'bold'}}>No: {noCount}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {responses.length === 0 && (
          <p style={{textAlign: 'center', padding: '40px', color: '#999'}}>
            No responses yet. Share the Valentine link with someone! 💕
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;