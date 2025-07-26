import React, { useState, useEffect } from 'react';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: ''
  }
};

const initialLicence = {
  image: null,        // File or null
  imageUrl: '',       // Persisted download URL
  number: '',
  expiry: ''
};

function MyProfilePage() {
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

  // ---- LOAD DATA ON MOUNT (simulate API - switch to real backend later) ----
  useEffect(() => {
    async function fetchProfile() {
      setLoadingUser(true);
      setUserError('');
      try {
        // Replace with real API call later
        // const resp = await fetch('/api/profile', {headers: {Authorization: ...}});
        // const data = await resp.json();
        const data = initialUser; // demo initial
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
        // Replace with real API call later
        // Example: const resp = await fetch('/api/driving-license');
        // const data = await resp.json();
        const data = {...initialLicence}; // Use persisted license image URL if any
        setLicence(data);
        setLicencePreview(data.imageUrl || null);
      } catch (e) {
        setLicenceError('Failed to load license.');
      }
      setLoadingLicence(false);
    }

    fetchProfile();
    fetchLicence();
  }, []);

  // ---- USER HANDLERS ----
  const handleUserChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleAddressChange = e =>
    setUser({
      ...user,
      address: {
        ...user.address,
        [e.target.name]: e.target.value
      }
    });

  const handleUserEdit = () => setEditingUser(true);

  // Save user to backend (PUT /api/profile)
  const handleUserSave = async () => {
    setLoadingUser(true);
    setUserError('');
    try {
      // Replace with real API later:
      // await fetch('/api/profile', { method: "PUT", headers: {...}, body: JSON.stringify(user) });
      setEditingUser(false);
      // Optionally reload
    } catch (e) {
      setUserError('Failed to save profile');
    }
    setLoadingUser(false);
  };

  const handleUserCancel = () => {
    // Optionally refetch from backend
    setLoadingUser(true);
    setTimeout(() => {
      setUser(initialUser);
      setEditingUser(false);
      setLoadingUser(false);
    }, 400); // Simulate load delay
  };

  // ---- LICENCE HANDLERS ----

  const handleLicenceEdit = () => setEditingLicence(true);

  // Save licence + image to backend (POST/PUT /api/driving-license)
  const handleLicenceSave = async () => {
    setLoadingLicence(true);
    setLicenceError('');

    try {
      const formData = new FormData();
      formData.append('licenseNumber', licence.number);
      formData.append('expiry', licence.expiry);
      if (licence.image) formData.append('file', licence.image);

      // Replace API call with your backend POST/PUT
      // Example:
      /* 
      const resp = await fetch('/api/driving-license', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ...' },
        body: formData
      });
      const result = await resp.json();
      setLicence(prev => ({
        ...prev,
        imageUrl: result.licenseImage,   // returned from server response
      }));
      setLicencePreview(result.licenseImage);
      */

      setEditingLicence(false);

      // DEMO: Show local preview as "uploaded"
      if (licence.image) {
        setLicencePreview(URL.createObjectURL(licence.image));
      }
    } catch (e) {
      setLicenceError('Failed to update license');
    }
    setLoadingLicence(false);
  };

  const handleLicenceCancel = () => {
    // Optionally refetch licence data from backend
    setLicence(initialLicence);
    setLicencePreview(null);
    setEditingLicence(false);
  };

  const handleLicenceChange = e =>
    setLicence({
      ...licence,
      [e.target.name]: e.target.value
    });

  // When image is chosen, show preview; when uploading, it will be sent as FormData
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

  // ---- BUTTON STYLES ----
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
            <h4 className="mb-0">User Information</h4>
            {!editingUser ? (
              <button
                className="btn btn-primary"
                style={btnStyle}
                onClick={handleUserEdit}
                disabled={loadingUser}
              >
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
                  {loadingUser ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-danger"
                  style={btnStyle}
                  onClick={handleUserCancel}
                  disabled={loadingUser}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {userError && <div className="alert alert-danger py-1">{userError}</div>}
          <form>
            {/* Profile fields */}
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
              <label className="form-label">Street Address</label>
              <input
                name="street"
                type="text"
                className="form-control"
                value={user.address.street}
                onChange={handleAddressChange}
                disabled={!editingUser || loadingUser}
                autoComplete="street-address"
              />
            </div>
            <div className="row">
              <div className="col-md-4 mb-2">
                <label className="form-label">City</label>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  value={user.address.city}
                  onChange={handleAddressChange}
                  disabled={!editingUser || loadingUser}
                />
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">State</label>
                <input
                  name="state"
                  type="text"
                  className="form-control"
                  value={user.address.state}
                  onChange={handleAddressChange}
                  disabled={!editingUser || loadingUser}
                />
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Postal Code</label>
                <input
                  name="postalCode"
                  type="text"
                  className="form-control"
                  value={user.address.postalCode}
                  onChange={handleAddressChange}
                  disabled={!editingUser || loadingUser}
                />
              </div>
            </div>
          </form>
        </div>

        {/* ==== DRIVING LICENSE ==== */}
        <div className="card shadow-sm" style={{ borderRadius: '12px', padding: '2rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Driving Licence</h4>
            {!editingLicence ? (
              <button
                className="btn btn-primary"
                style={btnStyle}
                onClick={handleLicenceEdit}
                disabled={loadingLicence}
              >
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
                  {loadingLicence ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-danger"
                  style={btnStyle}
                  onClick={handleLicenceCancel}
                  disabled={loadingLicence}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {licenceError && <div className="alert alert-danger py-1">{licenceError}</div>}
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
              {(licencePreview || licence.imageUrl) && (
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
                    src={licencePreview || licence.imageUrl}
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
                name="number"
                type="text"
                className="form-control"
                value={licence.number}
                onChange={handleLicenceChange}
                disabled={!editingLicence || loadingLicence}
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Expiry Date</label>
              <input
                name="expiry"
                type="date"
                className="form-control"
                value={licence.expiry}
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
