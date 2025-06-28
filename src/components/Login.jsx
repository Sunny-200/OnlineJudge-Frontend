import React, { useState } from "react";
import "./AuthForm.css";
import { login } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Add login API call or validation logic here
    try {
    const res = await login(formData);
    const { token, user } = res.data;

    // Save token locally
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful!");
    window.location.href = "/dashboard"; // or homepage
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2 className="form-title">Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="form-button" type="submit">Login</button>
          <p className="toggle-text">
            Don’t have an account?{' '}
            <a href="/signup" className="toggle-link">Register now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
