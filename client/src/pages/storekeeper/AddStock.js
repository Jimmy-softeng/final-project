// src/pages/storekeeper/AddStock.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/storekeeper/AddStock.css';

function AddStock() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    barcode: '',
    buying_price: '',
    wholesale_price: '',
    retail_price: '',
    shop_quantity: '',
    store_quantity: '',
    apply_vat: false,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Stock added successfully!');
      setFormData({
        name: '',
        description: '',
        barcode: '',
        buying_price: '',
        wholesale_price: '',
        retail_price: '',
        shop_quantity: '',
        store_quantity: '',
        apply_vat: false,
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add stock');
    }
  };

  return (
    <div className="add-stock">
      <h2>Add New Stock</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="text" name="barcode" placeholder="Barcode" value={formData.barcode} onChange={handleChange} />
        <input type="number" name="buying_price" placeholder="Buying Price" value={formData.buying_price} onChange={handleChange} />
        <input type="number" name="wholesale_price" placeholder="Wholesale Price" value={formData.wholesale_price} onChange={handleChange} />
        <input type="number" name="retail_price" placeholder="Retail Price" value={formData.retail_price} onChange={handleChange} />
        <input type="number" name="shop_quantity" placeholder="Shop Quantity" value={formData.shop_quantity} onChange={handleChange} />
        <input type="number" name="store_quantity" placeholder="Store Quantity" value={formData.store_quantity} onChange={handleChange} />

        <label>
          <input type="checkbox" name="apply_vat" checked={formData.apply_vat} onChange={handleChange} />
          Apply VAT
        </label>

        <button type="submit">Add Stock</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AddStock;
