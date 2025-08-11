import React, { useEffect, useState } from "react";
import "../../styles/storekeeper/ProductWriteOff.css";

function ProductWriteOff() {
  const [writeoffs, setWriteoffs] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    quantity: "",
    reason: "",
    expiry_date: "",
    buying_price: "",
    product_id: ""
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchWriteOffs();
    fetchProducts();
  }, []);

  const fetchWriteOffs = () => {
    fetch("http://127.0.0.1:5000/writeoffs", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setWriteoffs(data))
      .catch(err => console.error(err));
  };

  const fetchProducts = () => {
    fetch("http://127.0.0.1:5000/products", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/writeoffs", {
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
          quantity: "",
          reason: "",
          expiry_date: "",
          buying_price: "",
          product_id: ""
        });
        fetchWriteOffs();
      })
      .catch(err => console.error(err));
  };

  const handleEdit = id => {
    const record = writeoffs.find(w => w.id === id);
    setEditId(id);
    setEditData({ ...record, expiry_date: record.expiry_date.split("T")[0] });
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = id => {
    fetch(`http://127.0.0.1:5000/writeoffs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null);
        fetchWriteOffs();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    if (!window.confirm("Delete this write-off?")) return;
    fetch(`http://127.0.0.1:5000/writeoffs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => fetchWriteOffs())
      .catch(err => console.error(err));
  };

  return (
    <div className="writeoff-container">
      <h2>Product Write-Off</h2>

      <form className="writeoff-form" onSubmit={handleSubmit}>
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
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="buying_price"
          placeholder="Buying Price"
          value={formData.buying_price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Write-Off</button>
      </form>

      <table className="writeoff-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Reason</th>
            <th>Expiry Date</th>
            <th>Buying Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {writeoffs.map(w => (
            <tr key={w.id}>
              <td>{w.product_name || "N/A"}</td>
              <td>
                {editId === w.id ? (
                  <input
                    type="number"
                    value={editData.quantity}
                    onChange={e => handleEditChange("quantity", e.target.value)}
                  />
                ) : (
                  w.quantity
                )}
              </td>
              <td>
                {editId === w.id ? (
                  <input
                    type="text"
                    value={editData.reason}
                    onChange={e => handleEditChange("reason", e.target.value)}
                  />
                ) : (
                  w.reason
                )}
              </td>
              <td>
                {editId === w.id ? (
                  <input
                    type="date"
                    value={editData.expiry_date}
                    onChange={e => handleEditChange("expiry_date", e.target.value)}
                  />
                ) : (
                  new Date(w.expiry_date).toLocaleDateString()
                )}
              </td>
              <td>
                {editId === w.id ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editData.buying_price}
                    onChange={e => handleEditChange("buying_price", e.target.value)}
                  />
                ) : (
                  w.buying_price
                )}
              </td>
              <td>
                {editId === w.id ? (
                  <>
                    <button onClick={() => handleSaveEdit(w.id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(w.id)}>Edit</button>
                    <button onClick={() => handleDelete(w.id)}>Delete</button>
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

export default ProductWriteOff;
