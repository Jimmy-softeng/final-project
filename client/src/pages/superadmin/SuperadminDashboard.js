import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperadminSidebar from "./SuperadminSidebar";
import ManageUsers from "./ManageUsers";
// We will add ManageCompany and ViewPayments later

function SuperadminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SuperadminSidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="manage-users" element={<ManageUsers />} />
          {/* Placeholder routes for now */}
          <Route path="manage-company" element={<h2>Manage Company</h2>} />
          <Route path="view-payments" element={<h2>View Payments</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default SuperadminDashboard;
