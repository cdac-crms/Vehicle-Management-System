import React, { useState, useEffect } from "react";

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    variantId: "",
    registrationNumber: "",
    color: "",
    availabilityStatus: "Booked", // Default
    pricePerDay: "",
    mileage: "",
    vehicle_image: "",
  });

  const [variantOptions, setVariantOptions] = useState([]);

  // Placeholder: In real use, fetch from backend
  useEffect(() => {
    setVariantOptions([
      { id: 1, name: "Variant A" },
      { id: 2, name: "Variant B" },
      { id: 3, name: "Variant C" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle Submitted:", formData);

    /*
    fetch('/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log("Saved:", data))
    .catch(err => console.error(err));
    */
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Add Vehicle</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded bg-light shadow-sm"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Variant</label>
            <select
              className="form-select"
              name="variantId"
              value={formData.variantId}
              required
              onChange={handleChange}
            >
              <option value="">Select Variant</option>
              {variantOptions.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Registration Number</label>
            <input
              type="text"
              className="form-control"
              name="registrationNumber"
              value={formData.registrationNumber}
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Color</label>
            <input
              type="text"
              className="form-control"
              name="color"
              value={formData.color}
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Availability Status</label>
            <select
              className="form-select"
              name="availabilityStatus"
              value={formData.availabilityStatus}
              required
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Price Per Day (INR)</label>
            <input
              type="number"
              className="form-control"
              name="pricePerDay"
              value={formData.pricePerDay}
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mileage (km/l)</label>
            <input
              type="number"
              className="form-control"
              name="mileage"
              value={formData.mileage}
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Upload Vehicle Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              value={formData.vehicle_image}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
