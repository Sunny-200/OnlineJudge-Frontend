// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="red-text">Coding</span>Platform.io
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/problems">Problems List</Link>
        <Link to="/contribute">Contribute Question</Link>

        {user ? (
          <>
            <div className="user-info">
              <span>👤 {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
