import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/customer/ViewProducts.css';

function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:5000/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="view-products">
      <h2>Available Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Retail price</th>
              <th>Barcode</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.retail_price}</td>
                <td>{p.barcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewProducts;
