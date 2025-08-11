import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/customer/ViewPayments.css';

function ViewPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:5000/my-payments", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPayments(res.data))
    .catch(err => console.error("Failed to fetch payments:", err));
  }, []);

  return (
    <div className="view-payments">
      <h2>Your Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>${p.amount}</td>
                <td>{p.payment_method}</td>
                <td>{new Date(p.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewPayments;
