import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8080';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''  // Now a single string
};

const initialLicence = {
  image: null,
  license_image: '',
  license_number: '',
  expiry_date: '',
  userId: '',
};

function MyProfilePage() {
  const navigate = useNavigate();

  // Get JWT token and userId from localStorage (stored during login)
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // ---- State ----
  const [user, setUser] = useState(initialUser);
  const [editingUser, setEditingUser] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState('');

  const [licence, setLicence] = useState(initialLicence);
  const [licencePreview, setLicencePreview] = useState(null);
  const [editingLicence, setEditingLicence] = useState(false);
  const [loadingLicence, setLoadingLicence] = useState(false);
  const [licenceError, setLicenceError] = useState('');
  const [hasLicense, setHasLicense] = useState(false);

  // Helper function to clear auth data and redirect
  const clearAuthAndRedirect = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate('/login');
  };

  // ---- LOAD DATA ON MOUNT ----
  useEffect(() => {
    if (!token || !userId) {
      setUserError('Authentication required. Please login to view your profile.');
      clearAuthAndRedirect();
      return;
    }

    async function fetchProfile() {
      setLoadingUser(true);
      setUserError('');
      try {
        const resp = await fetch(`${API_BASE}/customer/profile?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (resp.status === 401 || resp.status === 403) {
          setUserError('Session expired. Please login again.');
          clearAuthAndRedirect();
          return;
        }
        
        if (!resp.ok) {
          throw new Error('Failed to load profile');
        }
        
        const data = await resp.json();
        setUser(data);
      } catch (e) {
        setUserError('Failed to load profile.');
      }
      setLoadingUser(false);
    }

    async function fetchLicence() {
      setLoadingLicence(true);
      setLicenceError('');
      try {
        const resp = await fetch(`${API_BASE}/customer/driving-license?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (resp.status === 401 || resp.status === 403) {
          clearAuthAndRedirect();
          return;
        }
        
        if (resp.ok) {
          const data = await resp.json();
          setLicence({ ...data, image: null });
          setLicencePreview(data.license_image);
          setHasLicense(true);
        } else {
          // No license found - this is OK
          setHasLicense(false);
          setLicence({ ...initialLicence, userId, image: null });
          setLicencePreview(null);
        }
      } catch (e) {
        setLicenceError('Failed to load license.');
      }
      setLoadingLicence(false);
    }

    fetchProfile();
    fetchLicence();
  }, [token, userId]);

  // ---- USER HANDLERS ----
  const handleUserChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleUserEdit = () => {
    if (!token || !userId) {
      setUserError('Authentication required. Please login again.');
      clearAuthAndRedirect();
      return;
    }
    setEditingUser(true);
  };

  const handleUserSave = async () => {
    if (!token || !userId) {
      setUserError('Authentication required. Please login again.');
      clearAuthAndRedirect();
      return;
    }

    setLoadingUser(true);
    setUserError('');
    try {
      const resp = await fetch(`${API_BASE}/customer/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...user,
          userId
        })
      });

      if (resp.status === 401 || resp.status === 403) {
        setUserError('Session expired. Please login again.');
        clearAuthAndRedirect();
        return;
      }

      if (!resp.ok) {
        throw new Error('Failed to save profile');
      }

      setEditingUser(false);
    } catch (e) {
      setUserError('Failed to save profile');
    }
    setLoadingUser(false);
  };

  const handleUserCancel = () => {
    setLoadingUser(true);
    setTimeout(() => {
      // Re-fetch original data or reset to initial state
      setUser(initialUser);
      setEditingUser(false);
      setLoadingUser(false);
    }, 400);
  };

  // ---- LICENCE HANDLERS ----
  const handleLicenceEdit = () => {
    if (!token || !userId) {
      setLicenceError('Authentication required. Please login again.');
      clearAuthAndRedirect();
      return;
    }
    setEditingLicence(true);
  };

  const handleLicenceSave = async () => {
    if (!token || !userId) {
      setLicenceError('Authentication required. Please login again.');
      clearAuthAndRedirect();
      return;
    }

    setLoadingLicence(true);
    setLicenceError('');
    try {
      const formData = new FormData();
      formData.append('license_number', licence.license_number);
      formData.append('expiry_date', licence.expiry_date);
      formData.append('userId', userId);
      if (licence.image) formData.append('file', licence.image);

      const method = hasLicense ? 'PUT' : 'POST';
      const resp = await fetch(`${API_BASE}/customer/driving-license`, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (resp.status === 401 || resp.status === 403) {
        setLicenceError('Session expired. Please login again.');
        clearAuthAndRedirect();
        return;
      }

      if (!resp.ok) throw new Error('Failed to save license');
      
      const result = await resp.json();
      setLicence({
        ...licence,
        license_image: result.license_image,
        license_number: result.license_number,
        expiry_date: result.expiry_date,
        userId: result.userId,
        image: null
      });
      setLicencePreview(result.license_image);
      setHasLicense(true);
      setEditingLicence(false);

      // If new image was uploaded, show preview
      if (licence.image) {
        setLicencePreview(URL.createObjectURL(licence.image));
      }
    } catch (e) {
      setLicenceError('Failed to update license');
    }
    setLoadingLicence(false);
  };

  const handleLicenceCancel = () => {
    setLicence({ ...initialLicence, userId });
    setLicencePreview(null);
    setEditingLicence(false);
  };

  const handleLicenceChange = e =>
    setLicence({
      ...licence,
      [e.target.name]: e.target.value
    });

  const handleLicenceImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setLicence({ ...licence, image: file });
      setLicencePreview(URL.createObjectURL(file));
    } else {
      setLicence({ ...licence, image: null });
      setLicencePreview(null);
    }
  };

  // Early return if not authenticated
  if (!token || !userId) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f6fafd' }}>
        <div className="text-center">
          <div className="alert alert-warning">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Authentication required. Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  const btnStyle = {
    minWidth: '80px',
    marginLeft: '0.5rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{
        background: '#f6fafd',
        minHeight: '100vh',
        padding: '2rem 0'
      }}
    >
      <div style={{ width: '100%', maxWidth: '550px' }}>
        {/* User Info */}
        <div className="card mb-4 shadow-sm" style={{ borderRadius: '12px', padding: '2rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              <i className="bi bi-person-circle me-2"></i>
              User Information
            </h4>
            {!editingUser ? (
              <button
                className="btn btn-primary"
                style={btnStyle}
                onClick={handleUserEdit}
                disabled={loadingUser}
              >
                <i className="bi bi-pencil me-1"></i>
                Edit
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-success"
                  style={btnStyle}
                  onClick={handleUserSave}
                  disabled={loadingUser}
                >
                  {loadingUser ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-1"></i>
                      Save
                    </>
                  )}
                </button>
                <button
                  className="btn btn-danger"
                  style={btnStyle}
                  onClick={handleUserCancel}
                  disabled={loadingUser}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  Cancel
                </button>
              </div>
            )}
          </div>
          {userError && (
            <div className="alert alert-danger py-1">
              <i className="bi bi-exclamation-circle me-2"></i>
              {userError}
            </div>
          )}
          <form>
            <div className="mb-2">
              <label className="form-label fw-semibold">First Name</label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                value={user.firstName}
                onChange={handleUserChange}
                disabled={!editingUser || loadingUser}
                autoComplete="given-name"
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                value={user.lastName}
                onChange={handleUserChange}
                disabled={!editingUser || loadingUser}
                autoComplete="family-name"
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={user.email}
                onChange={handleUserChange}
                disabled={!editingUser || loadingUser}
                autoComplete="email"
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="form-control"
                value={user.phone}
                onChange={handleUserChange}
                disabled={!editingUser || loadingUser}
                autoComplete="tel"
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Address</label>
              <input
                name="address"
                type="text"
                className="form-control"
                value={user.address}
                onChange={handleUserChange}
                disabled={!editingUser || loadingUser}
                autoComplete="address-line1"
              />
            </div>
          </form>
        </div>

        {/* ==== DRIVING LICENSE ==== */}
        <div className="card shadow-sm" style={{ borderRadius: '12px', padding: '2rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              <i className="bi bi-card-text me-2"></i>
              Driving Licence
            </h4>
            {!editingLicence ? (
              <button
                className="btn btn-primary"
                style={btnStyle}
                onClick={handleLicenceEdit}
                disabled={loadingLicence}
              >
                <i className="bi bi-pencil me-1"></i>
                Edit
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-success"
                  style={btnStyle}
                  onClick={handleLicenceSave}
                  disabled={loadingLicence}
                >
                  {loadingLicence ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-1"></i>
                      Save
                    </>
                  )}
                </button>
                <button
                  className="btn btn-danger"
                  style={btnStyle}
                  onClick={handleLicenceCancel}
                  disabled={loadingLicence}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  Cancel
                </button>
              </div>
            )}
          </div>
          {licenceError && (
            <div className="alert alert-danger py-1">
              <i className="bi bi-exclamation-circle me-2"></i>
              {licenceError}
            </div>
          )}
          <form>
            <div className="mb-2">
              <label className="form-label fw-semibold">Licence Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleLicenceImageChange}
                disabled={!editingLicence || loadingLicence}
              />
              {(licencePreview || licence.license_image) && (
                <div
                  className="d-flex justify-content-center align-items-center mt-3"
                  style={{
                    background: '#f9fbff',
                    border: '2px solid #2979ff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(41,121,255,0.10), 0 1.5px 6px rgba(0,0,0,0.03)',
                    maxWidth: '360px',
                    padding: '1rem',
                    margin: '0 auto'
                  }}
                >
                  <img
                    src={licencePreview || licence.license_image}
                    alt="Licence Preview"
                    style={{
                      width: '80%',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      border: '1px solid #d7dde6'
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Licence Number</label>
              <input
                name="license_number"
                type="text"
                className="form-control"
                value={licence.license_number}
                onChange={handleLicenceChange}
                disabled={!editingLicence || loadingLicence}
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Expiry Date</label>
              <input
                name="expiry_date"
                type="date"
                className="form-control"
                value={licence.expiry_date}
                onChange={handleLicenceChange}
                disabled={!editingLicence || loadingLicence}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;
