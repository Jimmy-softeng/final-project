import React from "react";
import { Link } from "react-router-dom";
import '../../styles/superadmin/SuperadminSidebar.css';

function SuperadminSidebar() {
  return (
    <div className="superadmin-sidebar">
      <h2>Superadmin</h2>
      <ul>
        <li>
          <Link to="/dashboard/superadmin/manage-users">Manage Users</Link>
        </li>
        <li>
          <Link to="/superadmin/manage-company">Manage Company</Link>
        </li>
        <li>
          <Link to="/superadmin/paid-users">Paid Users</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default SuperadminSidebar;
