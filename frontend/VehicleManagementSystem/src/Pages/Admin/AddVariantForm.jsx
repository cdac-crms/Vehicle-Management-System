import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addVariant, getAllVariants } from '../../services/VariantService';
import { getAllCompanies } from '../../services/CompanyService';
import { selectToken, selectRole } from '../../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddVariantForm = () => {
  const [formData, setFormData] = useState({
    companyId: '',
    name: '',
    description: '',
    seatingCapacity: '',
    fuelType: '',
  });
  const [companies, setCompanies] = useState([]);
  const [variants, setVariants] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = useSelector(selectToken);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (!token || role !== "ADMIN") {
      setMessage({ type: 'danger', text: 'Access denied. Admins only.' });
      return;
    }
    loadCompanies();
    loadVariants();
  }, [token, role]);

  const loadCompanies = async () => {
    try {
      const data = await getAllCompanies(token);
      setCompanies(data);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to load companies.' });
    }
  };

  const loadVariants = async () => {
    try {
      const data = await getAllVariants(token);
      setVariants(data);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to load variants.' });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVariant({
        ...formData,
        fuelType: formData.fuelType.toUpperCase(),
        companyId: Number(formData.companyId),
        seatingCapacity: Number(formData.seatingCapacity),
      }, token);

      setMessage({ type: 'success', text: 'Variant added successfully!' });
      setFormData({
        companyId: '',
        name: '',
        description: '',
        seatingCapacity: '',
        fuelType: '',
      });
      loadVariants(); // Refresh list
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to add variant.' });
    }
  };

  return (
    <div className="container mt-5" style={{ fontFamily: 'Segoe UI' }}>
      <h2 className="text-center mb-4" style={{ color: '#102649' }}>Manage Variants</h2>

      {/* Form Card */}
      <div className="card shadow mb-5" style={{ border: '1px solid #102649' }}>
        <div className="card-header text-white" style={{ backgroundColor: '#102649' }}>
          <h4 className="mb-0 mt-2 text-center">Add New Variant</h4>
        </div>
        <div className="card-body bg-light">
          {message.text && (
            <div className={`alert alert-${message.type} text-center`} role="alert">
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Company</label>
                <select
                  className="form-select"
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Variant Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Variant Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={formData.description}
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Fuel Type</label>
                <select
                  className="form-select"
                  name="fuelType"
                  value={formData.fuelType}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Seating Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  name="seatingCapacity"
                  value={formData.seatingCapacity}
                  required
                  min="1"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn text-white px-4" style={{ backgroundColor: '#102649' }}>
                Add Variant
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Variants List */}
      <h3 className="mb-3 text-center" style={{ color: '#102649' }}>All Variants</h3>
      <div className="row">
        {variants.map((variant) => (
          <div className="col-md-4 mb-4" key={variant.id}>
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h5 className="card-title text-center fw-bold" style={{ color: '#102649' }}>
                  {variant.name}
                </h5>
                <p className="card-text text-center text-muted">{variant.description}</p>
                <ul className="list-group list-group-flush text-center">
                  <li className="list-group-item">Fuel Type: {variant.fuelType}</li>
                  <li className="list-group-item">Seats: {variant.seatingCapacity}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        {variants.length === 0 && (
          <p className="text-muted text-center">No variants found.</p>
        )}
      </div>
    </div>
  );
};

export default AddVariantForm;
