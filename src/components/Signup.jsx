import React, { useState } from "react";
import "./AuthForm.css";
import { register } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Submitted data:", formData);
    // Call API or further processing here
    try {
    const response = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    console.log("Registered:", response.data);
    alert("Registration successful! Please login.");
    window.location.href = "/login";
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed.");
  }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2 className="form-title">Registration</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your userName"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="checkbox">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">I accept all terms & conditions</label>
          </div>
          <button className="form-button" type="submit">Register Now</button>
          <p className="toggle-text">
            Already have an account?{' '}
            <a href="/login" className="toggle-link">Login now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
