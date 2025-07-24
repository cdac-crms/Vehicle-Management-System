import React, { useState } from "react";

const UpdateVehicleForm = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "MH12AB1234",
    color: "White",
    availabilityStatus: "Available",
    pricePerDay: 1500,
    mileage: 18,
    vehicle_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated vehicle:", formData);
    alert("Vehicle updated successfully!");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Update Vehicle</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded bg-light shadow-sm"
      >
        <div className="row g-3">
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
              name="vehicle_image"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success px-5">
            Update Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVehicleForm;
