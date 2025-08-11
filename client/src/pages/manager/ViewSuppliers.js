// src/pages/manager/ViewSuppliers.js
import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/manager/ViewSuppliers.css";

function ViewSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [error, setError] = useState("");

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/suppliers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(res.data);
    } catch (err) {
      setError("Failed to fetch suppliers");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(suppliers.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete supplier");
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Only send allowed editable fields
      const allowedFields = {
        name: editingSupplier.name,
        email: editingSupplier.email,
        phone: editingSupplier.phone,
        product_name: editingSupplier.product_name,
      };

      await axios.patch(
        `http://localhost:5000/suppliers/${editingSupplier.id}`,
        allowedFields,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEditingSupplier(null);
      fetchSuppliers();
    } catch (err) {
      alert("Failed to update supplier");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="manager-dashboard">
      
      <div className="content">
        <h2>Suppliers</h2>
        {error && <p className="error">{error}</p>}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                {editingSupplier?.id === supplier.id ? (
                  <>
                    <td>
                      <input
                        value={editingSupplier.name}
                        onChange={(e) =>
                          setEditingSupplier({
                            ...editingSupplier,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editingSupplier.email}
                        onChange={(e) =>
                          setEditingSupplier({
                            ...editingSupplier,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editingSupplier.phone}
                        onChange={(e) =>
                          setEditingSupplier({
                            ...editingSupplier,
                            phone: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editingSupplier.product_name}
                        onChange={(e) =>
                          setEditingSupplier({
                            ...editingSupplier,
                            product_name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditingSupplier(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.product_name}</td>
                    <td>
                      <button onClick={() => setEditingSupplier(supplier)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(supplier.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewSuppliers;
