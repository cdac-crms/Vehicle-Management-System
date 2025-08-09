import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVehicles , deleteVehicle} from "../../../services/VehicleService";

const ViewAllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await getAllVehicles();
      console.log("Fetched vehicles:", res);
      setVehicles(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setVehicles([]);
    }
  };
  
    const handleDelete = async(id) =>{
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
      if (!confirmDelete) return; // if user clicks cancel, do nothing

      try {
        await deleteVehicle(id);
        setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
        alert("Vehicle deleted successfully.");
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert("Failed to delete vehicle. Please try again.");
      } 
    }



  const handleUpdate = (id) => navigate(`/admin/update-vehicle/${id}`);
  const handleViewDetails = (vehicle) =>
    navigate(`/admin/view-vehicle/${vehicle.id}`, { state: vehicle });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Vehicles</h2>
      {vehicles.length > 0 ? (
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Sr No</th>
              <th>Image</th>
              <th>Variant Name</th>
              <th>Registration No.</th>
              <th>Color</th>
              <th>Status</th>
              <th>Price/Day</th>
              <th>Mileage (km/l)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, idx) => (
              <tr key={vehicle.id}>
                <td>{idx + 1}</td>
                <td>
                  {vehicle.image ? (
                    <img
                      src={vehicle.image}
                      alt="Vehicle"
                      width="100"
                      height="70"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{vehicle.variantName || "N/A"}</td>
                <td>{vehicle.registrationNumber || "N/A"}</td>
                <td>{vehicle.color || "N/A"}</td>
                <td>{vehicle.availabilityStatus || "N/A"}</td>
                <td>₹{vehicle.pricePerDay || "N/A"}</td>
                <td>{vehicle.mileage || "N/A"}</td>
                <td>
               <button
  style={{ backgroundColor: "#102649", color: "white" }} // Deep Blue
  className="btn btn-sm me-2"
  onClick={() => handleUpdate(vehicle.id)}
  title="Update Vehicle"
>
  Update
</button>
<button
  style={{ backgroundColor: "#e63946", color: "white" }} // Bright Red
  className="btn btn-sm me-2"
  onClick={() => handleDelete(vehicle.id)}
  title="Delete Vehicle"
>
  Delete
</button>
<button
  style={{ backgroundColor: "#6c757d", color: "white" }} // Cool Gray
  className="btn btn-sm"
  onClick={() => handleViewDetails(vehicle)}
  title="View Vehicle"
>
  View
</button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No vehicles available.</p>
      )}
    </div>
  );
};

export default ViewAllVehicles;
