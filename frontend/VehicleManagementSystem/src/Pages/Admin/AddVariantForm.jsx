import React, { useState } from 'react';

const AddVariantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    company: '',
    fuelType: '',
    seatCapacity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    console.log("Variant submitted", formData);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="text-center mb-4">Add Car Variant</h3>
      <form onSubmit={handleSubmit} className="border rounded p-4 bg-white shadow-sm">
        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Company</label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={formData.company}
              required
              onChange={handleChange}
            />
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
              type="text"
              className="form-control"
              name="description"
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
            <label className="form-label">Seat Capacity</label>
            <input
              type="number"
              className="form-control"
              name="seatCapacity"
              value={formData.seatCapacity}
              required
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-4">Add Variant</button>
        </div>
      </form>
    </div>
  );
};

export default AddVariantForm;
