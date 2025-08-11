import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/manager/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT
    navigate("/auth"); // Go to login page
  };

  return (
    <div className="manager-sidebar">
      <h3>Manager Menu</h3>
      <ul>
        <li>
          <Link to="/dashboard/manager/view-suppliers">View Suppliers</Link>
        </li>
        <li>
          <Link to="/dashboard/manager/add-supplier">Add Supplier</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
