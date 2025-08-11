import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/customer/MakePayment.css';

function MakePayment() {
  const [formData, setFormData] = useState({
    amount: '',
    payment_method: 'cash',
    reference: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/payments',
        {
          amount: parseFloat(formData.amount),
          payment_method: formData.payment_method,
          reference: formData.reference,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Payment submitted successfully!');
      setFormData({ amount: '', payment_method: 'cash', reference: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="make-payment">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="mobile">Mobile</option>
        </select>
        <input
          type="text"
          name="reference"
          placeholder="Reference"
          value={formData.reference}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Payment</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default MakePayment;
