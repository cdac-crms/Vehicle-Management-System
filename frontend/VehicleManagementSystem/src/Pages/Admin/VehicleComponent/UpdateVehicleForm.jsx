import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getVehicleById,
  updateVehicle,
} from "../../../services/VehicleService";
import { getAllVariants } from "../../../services/VariantService";

const UpdateVehicleForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate(); 

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

  // Fetch vehicle & variants on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicle = await getVehicleById(vehicleId);
        const variants = await getAllVariants();

        setVariantOptions(variants);

        setFormData({
          variantId: vehicle.variantId || "",
          registrationNumber: vehicle.registrationNumber || "",
          color: vehicle.color || "",
          availabilityStatus: vehicle.availabilityStatus || "Booked",
          pricePerDay: vehicle.pricePerDay || "",
          mileage: vehicle.mileage || "",
          vehicle_image: null,
        });
      } catch (err) {
        console.error("Failed to fetch vehicle or variants:", err);
        alert("Error fetching vehicle details.");
      }
    };

    fetchData();
  }, [vehicleId]);

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

    if (formData.vehicle_image) {
      payload.append("image", formData.vehicle_image);
    }

    try {
      const res = await updateVehicle(vehicleId, payload);
      alert("Vehicle updated successfully!");
      navigate("/admin/vehicles");
    } catch (err) {
      console.error("Failed to update vehicle:", err);
      alert("Update failed. Check console for details.");
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
        <h3 className="text-center mb-4">Update Vehicle</h3>
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
              <label className="form-label">Upload New Vehicle Image</label>
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
              {loading ? "Updating..." : "Update Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicleForm;