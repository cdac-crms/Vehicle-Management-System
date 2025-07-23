import React, { useState } from 'react';

const AddCompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Data Submitted:", formData);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Add Company</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Company Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required 
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">Add Company</button>
      </form>
    </div>
  );
};

export default AddCompanyForm;
