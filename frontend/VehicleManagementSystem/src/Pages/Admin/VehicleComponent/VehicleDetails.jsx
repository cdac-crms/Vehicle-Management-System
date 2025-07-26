import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { vehicle_id } = useParams();
  const { state:vehicle } = useLocation();
  

  if (!vehicle) {
    return (
      <div className="text-center mt-5">
        <h3>No vehicle data found.</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Vehicle Details (ID: {vehicle.vehicle_id})</h2>
      <div className="card shadow-lg">
        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
            <tr>
                <th>Vehicle Image</th>
                <td>{vehicle.vehicle_image}</td>
              </tr>
              <tr>
                <th>Vehicle ID</th>
                <td>{vehicle.vehicle_id}</td>
              </tr>
              <tr>
                <th>Variant Name</th>
                <td>{vehicle.variant_id}</td>
              </tr>
              <tr>
                <th>Registration Number</th>
                <td>{vehicle.registration_number}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{vehicle.color}</td>
              </tr>
              <tr>
                <th>Availability</th>
                <td>{vehicle.availability_status}</td>
              </tr>
              <tr>
                <th>Price per Day</th>
                <td>₹{vehicle.price_per_day}</td>
              </tr>
              <tr>
                <th>Mileage</th>
                <td>{vehicle.mileage} km/l</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
