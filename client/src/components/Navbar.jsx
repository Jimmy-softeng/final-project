import React from 'react';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>BizPro</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="#streamline">Streamline</a></li>
        <li><a href="#monitoring">Monitoring</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><button onClick={() => navigate('/auth')}>Login / Register</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
