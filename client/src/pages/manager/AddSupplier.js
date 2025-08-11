import React, { useState } from "react";
import axios from "axios";
import "../../styles/manager/AddSupplier.css";

function AddSupplier() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contact_person: "",
    contact_number: "",
    product_name: "",
    balance: "",
    package_mode: "",
    notes: "",
    apply_vat: false
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/suppliers", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Supplier added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        contact_person: "",
        contact_number: "",
        product_name: "",
        balance: "",
        package_mode: "",
        notes: "",
        apply_vat: false
      });
    } catch (err) {
      console.error("Error adding supplier:", err);
      alert("Failed to add supplier");
    }
  };

  return (
    <div className="add-supplier-container">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit} className="add-supplier-form">
        <input type="text" name="name" placeholder="Supplier Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="text" name="contact_person" placeholder="Contact Person" value={formData.contact_person} onChange={handleChange} />
        <input type="text" name="contact_number" placeholder="Contact Number" value={formData.contact_number} onChange={handleChange} />
        <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} />
        <input type="number" name="balance" placeholder="Balance" value={formData.balance} onChange={handleChange} />
        <input type="text" name="package_mode" placeholder="Package Mode" value={formData.package_mode} onChange={handleChange} />
        <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
        <label className="vat-checkbox">
          <input type="checkbox" name="apply_vat" checked={formData.apply_vat} onChange={handleChange} />
          Apply VAT
        </label>
        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
}

export default AddSupplier;
