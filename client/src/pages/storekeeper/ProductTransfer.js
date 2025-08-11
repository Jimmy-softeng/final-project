import React, { useEffect, useState } from "react";
import "../../styles/storekeeper/ProductTransfer.css";

function ProductTransfer() {
  const [formData, setFormData] = useState({
    quantity: "",
    from_location: "",
    to_location: "",
    remarks: "",
    product_id: ""
  });
  const [products, setProducts] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch transfers
  const fetchTransfers = () => {
    fetch("http://127.0.0.1:5000/transfers", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setTransfers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  // Handle add form change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit new transfer
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/transfers", {
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
          from_location: "",
          to_location: "",
          remarks: "",
          product_id: ""
        });
        fetchTransfers();
      })
      .catch(err => console.error(err));
  };

  // Start edit
  const handleEdit = (transfer) => {
    setEditId(transfer.id);
    setEditData({
      product_id: transfer.product_id,
      quantity: transfer.quantity,
      from_location: transfer.from_location,
      to_location: transfer.to_location,
      remarks: transfer.remarks
    });
  };

  // Save edit
  const handleSaveEdit = (id) => {
    fetch(`http://127.0.0.1:5000/transfers/${id}`, {
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
        fetchTransfers();
      })
      .catch(err => console.error(err));
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  // Delete transfer
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this transfer?")) return;
    fetch(`http://127.0.0.1:5000/transfers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => fetchTransfers())
      .catch(err => console.error(err));
  };

  return (
    <div className="product-transfer">
      <h2>Product Transfer</h2>
      {/* Add Form */}
      <form className="transfer-form" onSubmit={handleSubmit}>
        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
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
          name="from_location"
          placeholder="From Location"
          value={formData.from_location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="to_location"
          placeholder="To Location"
          value={formData.to_location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="remarks"
          placeholder="Remarks (optional)"
          value={formData.remarks}
          onChange={handleChange}
        />

        <button type="submit">Submit Transfer</button>
      </form>

      {/* Transfer History */}
      <h3>Transfer History</h3>
      <table className="transfer-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>From</th>
            <th>To</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transfers.length > 0 ? (
            transfers.map((t) => (
              <tr key={t.id}>
                {editId === t.id ? (
                  <>
                    <td>
                      <select
                        name="product_id"
                        value={editData.product_id}
                        onChange={handleEditChange}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="from_location"
                        value={editData.from_location}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="to_location"
                        value={editData.to_location}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="remarks"
                        value={editData.remarks}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSaveEdit(t.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{t.product_name}</td>
                    <td>{t.quantity}</td>
                    <td>{t.from_location}</td>
                    <td>{t.to_location}</td>
                    <td>{t.remarks}</td>
                    <td>
                      <button onClick={() => handleEdit(t)}>Edit</button>
                      <button onClick={() => handleDelete(t.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transfers recorded</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTransfer;
