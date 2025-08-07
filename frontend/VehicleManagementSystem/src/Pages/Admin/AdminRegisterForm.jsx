import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../../services/AdminService';

const AdminRegisterForm = () => {
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
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

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
      setError('Password and confirm password must be the same.');
      return false;
    }

    return true;
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (!isValidForm()) return;

    const payload = {
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.email,
      contactNo: formData.contact_no,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      userRole: 'ADMIN'
    };

    try {
      await registerAdmin(payload);
      setSuccess('Admin registered successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact_no: ''
      });
      // navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
<div
  className="container-fluid d-flex justify-content-center align-items-center"
  style={{
    minHeight: '100vh',
    backgroundColor: '#f4f6fc'
  }}
>
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'linear-gradient(145deg, #ffffff, #e3e8f9)',
          border: '1px solid #dce3f1',
          fontSize: "0.88rem",

        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#102649', fontWeight: 'bold' }}>
          Admin Registration
        </h2>

        {error && <div className="alert alert-danger rounded-pill text-center">{error}</div>}
        {success && <div className="alert alert-success rounded-pill text-center">{success}</div>}

        <form onSubmit={signUpHandler}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                name="first_name"
                placeholder="First Name"
                className="form-control rounded-pill border border-secondary-subtle"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                name="last_name"
                placeholder="Last Name"
                className="form-control rounded-pill border border-secondary-subtle"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@mail.com"
              className="form-control rounded-pill border border-secondary-subtle"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact No</label>
            <input
              name="contact_no"
              type="tel"
              placeholder="10-digit mobile number"
              className="form-control rounded-pill border border-secondary-subtle"
              value={formData.contact_no}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Choose a secure password"
              className="form-control rounded-pill border border-secondary-subtle"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              className="form-control rounded-pill border border-secondary-subtle"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn rounded-pill text-white"
              style={{ backgroundColor: '#102649' }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterForm;


