import React, { useState, useEffect } from "react";
import {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
} from "../../../services/VehicleService";
import { getAllVariants } from "../../../services/VariantService";

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    variantId: "",
    registrationNumber: "",
    color: "",
    availabilityStatus: "Booked",
    pricePerDay: "",
    mileage: "",
    vehicle_image: null,
  });

  const [variantOptions, setVariantOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const variants = await getAllVariants();
        setVariantOptions(variants);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchVariants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append(
      "data",
      JSON.stringify({
        variant: formData.variantId,
        registrationNumber: formData.registrationNumber,
        color: formData.color,
        availabilityStatus: formData.availabilityStatus.toUpperCase(),
        pricePerDay: formData.pricePerDay,
        mileage: formData.mileage,
      })
    );
    payload.append("image", formData.vehicle_image);

    try {
      console.log(payload)
      const response = await addVehicle(payload);
      console.log("Vehicle added successfully:", response);
      alert("Vehicle added successfully!");

      // Optional: Reset form
      setFormData({
        variantId: "",
        registrationNumber: "",
        color: "",
        availabilityStatus: "Booked",
        pricePerDay: "",
        mileage: "",
        vehicle_image: null,
      });
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Failed to add vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f4f6fc" }}
    >
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "linear-gradient(145deg, #ffffff, #e3e8f9)",
          border: "1px solid #dce3f1",
          fontSize: "0.88rem",
        }}
      >
        <h3 className="text-center mb-4">Add Vehicle</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Variant</label>
              <select
                className="form-select rounded-pill"
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
                className="form-control rounded-pill"
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
                className="form-control rounded-pill"
                name="color"
                value={formData.color}
                required
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Availability Status</label>
              <select
                className="form-select rounded-pill"
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
                className="form-control rounded-pill"
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
                className="form-control rounded-pill"
                name="mileage"
                value={formData.mileage}
                required
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Upload Vehicle Image</label>
              <input
                type="file"
                className="form-control rounded-pill"
                name="vehicle_image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn text-white rounded-pill px-5"
              style={{ backgroundColor: "#102649" }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
