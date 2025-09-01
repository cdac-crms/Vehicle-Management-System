import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addCompany, getAllCompanies } from '../../services/CompanyService';
import { selectToken, selectRole } from '../../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCompanyForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = useSelector(selectToken);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (!token || role !== "ADMIN") {
      setMessage({ type: 'danger', text: 'Access denied. Admins only.' });
      return;
    }
    fetchCompanies();
  }, [token, role]);

  const fetchCompanies = async () => {
    try {
      const data = await getAllCompanies(token); // pass token if API requires
      setCompanies(data);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to load companies.' });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addCompany(formData, token); // pass token
      setMessage({ type: 'success', text: 'Company added successfully!' });
      setFormData({ name: '', description: '' });
      fetchCompanies();
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Error adding company.' });
    }
  };

  return (
    <div className="container mt-5" style={{ fontFamily: 'Segoe UI' }}>
      <h2 className="text-center mb-4" style={{ color: '#102649' }}> Manage Companies</h2>

      <div className="card shadow mb-5" style={{ border: `1px solid #102649` }}>
        <div className="card-header text-white" style={{ backgroundColor: '#102649' }}>
          <h4 className="mb-0 mt-2 text-center">Add New Company</h4>
        </div>
        <div className="card-body bg-light">
          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Tata Motors"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief about the company..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: '#102649' }}>
              Add Company
            </button>
          </form>
        </div>
      </div>

      <h3 className="mb-3 text-center" style={{ color: '#102649' }}>🏢 All Companies</h3>
      <div className="row">
        {companies.map(company => (
          <div className="col-md-4 mb-4" key={company.id}>
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h5 className="card-title text-center fw-bold" style={{ color: '#102649' }}>
                  {company.name}
                </h5>
                <p className="card-text text-center text-muted">{company.description}</p>
              </div>
            </div>
          </div>
        ))}
        {companies.length === 0 && (
          <p className="text-muted text-center">No companies found.</p>
        )}
      </div>
    </div>
  );
};

export default AddCompanyForm;
