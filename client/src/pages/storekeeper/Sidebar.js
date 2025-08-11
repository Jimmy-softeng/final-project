import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/storekeeper/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/auth"); // redirect to login/register page
  };
  return (
    <div className="storekeeper-sidebar">
      <h3>Storekeeper Menu</h3>
      <ul>
        <li>
          <Link to="/dashboard/storekeeper/view-stock">View Stock</Link>
        </li>
        <li>
          <Link to="/dashboard/storekeeper/add-stock">Add Stock</Link>
        </li>
        <li>
          <Link to="/dashboard/storekeeper/product-transfer">Product Transfer</Link>
        </li>
         <li>
          <Link to="/dashboard/storekeeper/product-conversion">Product Conversion</Link>
        </li>
        <li>
          <Link to="/dashboard/storekeeper/product-writeoff">Product Write-Off</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
