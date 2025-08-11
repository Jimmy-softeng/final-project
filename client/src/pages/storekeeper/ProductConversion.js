// client/src/pages/storekeeper/ProductConversion.js
import React, { useState, useEffect } from "react";
import "../../styles/storekeeper/ProductConversion.css";

function ProductConversion() {
  const [conversions, setConversions] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    from_unit: "",
    quantity: "",
    to_unit: "",
    result_quantity: ""
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch conversions
  const fetchConversions = () => {
    fetch("http://127.0.0.1:5000/conversions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setConversions(data))
      .catch(err => console.error(err));
  };

  // Fetch products for dropdown
  const fetchProducts = () => {
    fetch("http://127.0.0.1:5000/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchConversions();
    fetchProducts();
  }, []);

  // Handle form change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle edit change
  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Add conversion
  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        setFormData({
          product_id: "",
          from_unit: "",
          quantity: "",
          to_unit: "",
          result_quantity: ""
        });
        fetchConversions();
      })
      .catch(err => console.error(err));
  };

  // Save edit
  const handleSaveEdit = id => {
    fetch(`http://127.0.0.1:5000/conversions/${id}`, {
      method: "PATCH", // Flask route is PATCH
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null);
        fetchConversions();
      })
      .catch(err => console.error(err));
  };

  // Delete conversion
  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this conversion?")) {
      fetch(`http://127.0.0.1:5000/conversions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(() => fetchConversions())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="product-conversion-container">
      <h2>Product Conversion</h2>

      {/* Add Conversion Form */}
      <form className="product-conversion-form" onSubmit={handleSubmit}>
        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="from_unit"
          placeholder="From Unit"
          value={formData.from_unit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="to_unit"
          placeholder="To Unit"
          value={formData.to_unit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="result_quantity"
          placeholder="Result Quantity"
          value={formData.result_quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Conversion</button>
      </form>

      {/* Conversions Table */}
      <table className="product-conversion-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>From Unit</th>
            <th>Quantity</th>
            <th>To Unit</th>
            <th>Result Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {conversions.map(c => (
            <tr key={c.id}>
              <td>{c.product_name || "N/A"}</td>
              <td>
                {editId === c.id ? (
                  <input
                    name="from_unit"
                    value={editData.from_unit || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  c.from_unit
                )}
              </td>
              <td>
                {editId === c.id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editData.quantity || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  c.quantity
                )}
              </td>
              <td>
                {editId === c.id ? (
                  <input
                    name="to_unit"
                    value={editData.to_unit || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  c.to_unit
                )}
              </td>
              <td>
                {editId === c.id ? (
                  <input
                    type="number"
                    name="result_quantity"
                    value={editData.result_quantity || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  c.result_quantity
                )}
              </td>
              <td>
                {editId === c.id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleSaveEdit(c.id)}
                    >
                      Save
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditId(c.id);
                        setEditData(c);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductConversion;
