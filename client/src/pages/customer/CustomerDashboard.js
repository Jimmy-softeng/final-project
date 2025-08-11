import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ViewProducts from './ViewProducts';
import ViewPayments from './ViewPayments';
import MakePayment from './MakePayment';
import '../../styles/customer/Dashboard.css';
import '../../styles/customer/Sidebar.css';
import '../../styles/customer/CustomerSections.css';

function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('products');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/auth');
      return;
    }

    axios
      .get('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/auth');
      });
  }, [navigate]);

  if (!user) return <p>Loading your dashboard...</p>;

  const renderContent = () => {
    switch (activePage) {
      case 'products':
        return <ViewProducts />;
      case 'payments':
        return <ViewPayments />;
      case 'makePayment':
        return <MakePayment />;
      default:
        return <ViewProducts />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Hello, {user.username}</h2>
        <ul className="sidebar-menu">
          <li onClick={() => setActivePage('products')}>📦 View Products</li>
          <li onClick={() => setActivePage('payments')}>💰 View Payments</li>
          <li onClick={() => setActivePage('makePayment')}>📝 Make Payment</li>
          <li
            className="logout"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/auth');
            }}
          >
            🚪 Logout
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h2>Customer Dashboard</h2>
        <div>{renderContent()}</div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
