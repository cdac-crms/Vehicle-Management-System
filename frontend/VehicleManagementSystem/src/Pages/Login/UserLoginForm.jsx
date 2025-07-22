


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    const { email, password, role } = formData;

    if (!email || !password || !role) {
      setError('All fields are required.');
      return false;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('role', formData.role);

    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-primary">User Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-between">
              <span>Password</span>
              <Link to="/forgot-password" className="small text-decoration-none text-primary">
                Forgot Password?
              </Link>
            </label>
            <input
              name="password"
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select rounded-pill"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary rounded-pill">
              Login 
            </button>
            <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={handleSignUp}>
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;

