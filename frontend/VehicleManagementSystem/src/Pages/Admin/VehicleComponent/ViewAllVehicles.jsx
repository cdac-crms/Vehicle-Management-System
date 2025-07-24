import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const ViewAllVehicles = () => {
 
  const [vehicles, setVehicles] = useState([]);
  useEffect(()=>{
  setVehicles ([
    {
      vehicle_id: 1,
      vehicle_image: "AAAAAAAAAAAAAAAAA",
      variant_id: 101,
      registration_number: "RJ14XX0001",
      color: "Black",
      availability_status: "AVAILABLE",
      price_per_day: 1200.5,
      mileage: 18,
    },
    {
      vehicle_id: 2,
      vehicle_image:"AAAAAAAAAAAAAAAAA",
      variant_id: 102,
      registration_number: "RJ14XX0002",
      color: "White",
      availability_status: "BOOKED",
      price_per_day: 1500.0,
      mileage: 22,
    }
  ]);
}, []);
  
  const navigate = useNavigate();

  const handleUpdate = (vehicle) => {
    navigate(`/admin/update-vehicle/${vehicle.vehicle_id }`);
  };

  const handleDelete = (vehicle) => {
    alert(`Vehicle ID ${vehicle.vehicle_id} deleted (mock).`);
  };

  const handleViewDetails = (vehicle) => {
    navigate(`/admin/view-vehicle/${vehicle.vehicle_id }`, { state: vehicle });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Vehicles</h2>
      {vehicles.length > 0 ? (
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Sr No</th>
              <th>Vehicle Image</th>
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
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td>{vehicle.vehicle_id}</td>
                <td>{vehicle.vehicle_image}</td>
                <td>{vehicle.variant_id}</td>
                <td>{vehicle.registration_number}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.availability_status}</td>
                <td>₹{vehicle.price_per_day}</td>
                <td>{vehicle.mileage}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleUpdate(vehicle.vehicle_id)}
                    title="Update Vehicle"
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(vehicle.vehicle_id)}
                    title="Delete Vehicle"
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleViewDetails(vehicle)}
                    title="View Vehicles"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <p className="text-center text-muted">No vehicles available.</p>
      )}
    </div>
  );
};

export default ViewAllVehicles;
