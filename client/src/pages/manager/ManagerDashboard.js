import React from "react";
import { Routes, Route } from "react-router-dom";
import EditSupplier from "./EditSupplier";
import Sidebar from "./Sidebar";
import ViewSuppliers from "./ViewSuppliers";
import AddSupplier from "./AddSupplier";
import "../../styles/manager/ManagerDashboard.css";

function ManagerDashboard() {
  return (
    <div className="manager-dashboard">
      <Sidebar />
      <div className="manager-dashboard-content">
        <Routes>
          <Route path="/" element={<h2>Welcome, Manager</h2>} />
          <Route path="/view-suppliers" element={<ViewSuppliers />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/edit-supplier/:id" element={<EditSupplier />} /> {/* ✅ */}
        </Routes>
      </div>
    </div>
  );
}

export default ManagerDashboard;
