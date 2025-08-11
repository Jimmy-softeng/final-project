import React from 'react';
import '../../styles/storekeeper/StorekeeperDashboard.css';
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import ViewStock from './ViewStock';
import AddStock from './AddStock';
import { Navigate } from 'react-router-dom';
import ProductTransfer from "./ProductTransfer";
import ProductConversion from "./ProductConversion";
import ProductWriteOff from "./ProductWriteOff";
function StorekeeperDashboard() {
  return (
    <div className="storekeeper-dashboard">
      <Sidebar />
      <div className="storekeeper-content">
        <Routes>
            <Route path="/" element={<Navigate to="view-stock" replace />} />
            <Route path="view-stock" element={<ViewStock key="view" />} />
            <Route path="add-stock" element={<AddStock key="add" />} />
            <Route path="product-transfer" element={<ProductTransfer key="transfer" />} />
            <Route path="product-conversion" element={<ProductConversion key="conversion" />} />
            <Route path="product-writeoff" element={<ProductWriteOff key="writeoff"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default StorekeeperDashboard;
