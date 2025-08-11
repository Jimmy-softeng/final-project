import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contact_person: "",
    contact_number: "",
    product_name: "",
    balance: 0.0,
    package_mode: "",
    notes: "",
    apply_vat: false,
  });
  const [error, setError] = useState("");

  // Fetch supplier details
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/suppliers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSupplier(res.data);
      } catch (err) {
        setError("Failed to load supplier details");
      }
    };
    fetchSupplier();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSupplier((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/suppliers/${id}`,
        supplier,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/dashboard/manager/view-suppliers");
    } catch (err) {
      setError("Failed to update supplier");
    }
  };

  return (
    <div className="edit-supplier">
      <h2>Edit Supplier</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={supplier.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={supplier.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={supplier.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="address" value={supplier.address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="contact_person" value={supplier.contact_person} onChange={handleChange} placeholder="Contact Person" />
        <input type="text" name="contact_number" value={supplier.contact_number} onChange={handleChange} placeholder="Contact Number" />
        <input type="text" name="product_name" value={supplier.product_name} onChange={handleChange} placeholder="Product Name" />
        <input type="number" step="0.01" name="balance" value={supplier.balance} onChange={handleChange} placeholder="Balance" />
        <input type="text" name="package_mode" value={supplier.package_mode} onChange={handleChange} placeholder="Package Mode" />
        <textarea name="notes" value={supplier.notes} onChange={handleChange} placeholder="Notes"></textarea>

        <label>
          <input type="checkbox" name="apply_vat" checked={supplier.apply_vat} onChange={handleChange} />
          Apply VAT
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditSupplier;
