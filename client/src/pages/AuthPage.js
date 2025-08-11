import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = isRegistering ? '/auth/register' : '/auth/login';

  try {
    const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
    
    const token = res.data.access_token;
    localStorage.setItem("token", token);

    // Fetch role immediately
    const userRes = await axios.get("http://localhost:5000/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const role = userRes.data.user.role.toLowerCase();

    if (role === 'customer') navigate('/dashboard/customer');
    else if (role === 'storekeeper') navigate('/dashboard/storekeeper');
    else if (role === 'manager') navigate('/dashboard/manager');
    else if (role === 'superadmin') navigate('/dashboard/superadmin');
    else setError('Unknown role');
    
  } catch (err) {
    setError(err.response?.data?.msg || 'Something went wrong');
  }
};
  return (
    <div className="auth-page">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={toggleMode}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
