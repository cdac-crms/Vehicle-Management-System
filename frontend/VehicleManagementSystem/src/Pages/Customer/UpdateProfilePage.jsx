import React, { useState } from 'react';


const initialUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '9876543210',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: ''
  }
};

const initialLicence = {
  image: null,
  number: '',
  expiry: '',
};

function MyProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [editingUser, setEditingUser] = useState(false);

  const [licence, setLicence] = useState(initialLicence);
  const [licencePreview, setLicencePreview] = useState(null);
  const [editingLicence, setEditingLicence] = useState(false);

  // User info handlers
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
  const handleUserSave = () => setEditingUser(false);
  const handleUserCancel = () => {
    setUser(initialUser);
    setEditingUser(false);
  };

  // Licence info handlers
  const handleLicenceEdit = () => setEditingLicence(true);
  const handleLicenceSave = () => setEditingLicence(false);
  const handleLicenceCancel = () => {
    setLicence(initialLicence);
    setLicencePreview(null);
    setEditingLicence(false);
  };

  const handleLicenceChange = e => {
    setLicence({
      ...licence,
      [e.target.name]: e.target.value
    });
  };

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

  // Button style for reuse
  const btnStyle = {
    minWidth: '80px',
    marginLeft: '0.5rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
  };

  return (
    <>
   
      <div
        className="container-fluid d-flex justify-content-center"
        style={{
          background: '#f6fafd',
          minHeight: '100vh',
          padding: '2rem 0'
        }}
      >
        <div style={{ width: '100%', maxWidth: '550px' }}>
          {/* User Info Card */}
          <div className="card mb-4 shadow-sm" style={{ borderRadius: '12px', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">User Information</h4>
              {!editingUser ? (
                <button
                  className="btn btn-primary"
                  style={btnStyle}
                  onClick={handleUserEdit}
                >
                  Edit
                </button>
              ) : (
                <div>
                  <button
                    className="btn btn-success"
                    style={btnStyle}
                    onClick={handleUserSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    style={btnStyle}
                    onClick={handleUserCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <form>
              <div className="mb-2">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  value={user.firstName}
                  onChange={handleUserChange}
                  disabled={!editingUser}
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
                  disabled={!editingUser}
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
                  disabled={!editingUser}
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
                  disabled={!editingUser}
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
                  disabled={!editingUser}
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
                    disabled={!editingUser}
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
                    disabled={!editingUser}
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
                    disabled={!editingUser}
                  />
                </div>
              </div>
            </form>
          </div>
          {/* Licence Card */}
          <div className="card shadow-sm" style={{ borderRadius: '12px', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Driving Licence</h4>
              {!editingLicence ? (
                <button
                  className="btn btn-primary"
                  style={btnStyle}
                  onClick={handleLicenceEdit}
                >
                  Edit
                </button>
              ) : (
                <div>
                  <button
                    className="btn btn-success"
                    style={btnStyle}
                    onClick={handleLicenceSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    style={btnStyle}
                    onClick={handleLicenceCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <form>
              <div className="mb-2">
                <label className="form-label fw-semibold">Licence Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleLicenceImageChange}
                  disabled={!editingLicence}
                />
                {licencePreview && (
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
                      src={licencePreview}
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
                  disabled={!editingLicence}
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
                  disabled={!editingLicence}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfilePage;
