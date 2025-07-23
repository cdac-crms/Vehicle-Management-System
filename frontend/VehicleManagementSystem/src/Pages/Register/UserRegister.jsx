import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact_no: ''
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  // Basic form validation
  const isValidForm = () => {
    const { first_name, last_name, email, password, confirmPassword, contact_no } = formData;

    if (!first_name || !last_name || !email || !password || !confirmPassword || !contact_no) {
      setError('All fields are required.');
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return false;
    }

    if (!/^\d{10}$/.test(contact_no)) {
      setError('Contact number must be 10 digits.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password must be same.');
      return false;
    }

    return true;
  };

  // Submit handler
  const signUpHandler = (e) => {
    e.preventDefault();

    if (!isValidForm()) return;

    localStorage.setItem('user', JSON.stringify(formData));
    alert('User registered successfully!');
    navigate('/login');
  };

  // Redirect to login
  const signInHandler = () => {
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-5 rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary">Create Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={signUpHandler}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">First Name</label>
              <input
                name="first_name"
                placeholder="First Name"
                className="form-control rounded-pill"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Last Name</label>
              <input
                name="last_name"
                placeholder="Last Name"
                className="form-control rounded-pill"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@mail.com"
              className="form-control rounded-pill"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contact No</label>
            <input
              name="contact_no"
              type="tel"
              placeholder="10-digit mobile number"
              className="form-control rounded-pill"
              value={formData.contact_no}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Choose a secure password"
              className="form-control rounded-pill"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className="form-control rounded-pill"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary rounded-pill">
              Register
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill"
              onClick={signInHandler}
            >
              Already Registered? <span>LogIn Here</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
