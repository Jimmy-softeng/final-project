// src/pages/storekeeper/ViewStock.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/storekeeper/ViewStock.css';

function ViewStock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation(); // detect route change

  const fetchStock = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(res.data);
    } catch (err) {
      setError('Failed to fetch stock');
    }
  };

  useEffect(() => {
    fetchStock();
  }, [location.key]); // rerun fetch when route changes

  return (
    <div className="view-stock">
      <h2>Available Stock</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Barcode</th>
            <th>Retail Price</th>
            <th>Shop Qty</th>
            <th>Store Qty</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.barcode}</td>
              <td>{item.retail_price}</td>
              <td>{item.shop_quantity}</td>
              <td>{item.store_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewStock;
