import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById } from '../../../services/VehicleService';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await getVehicleById(id);
        setVehicle(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('Vehicle not found or error occurred.');
        setLoading(false);
      }
    };

    if (id && id !== 'undefined') {
      fetchVehicle();
    } else {
      setError('Invalid vehicle ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading vehicle details...</div>;

  if (error || !vehicle) {
    return (
      <div className="text-center mt-5">
        <h3>{error || 'No vehicle data found.'}</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

 return (
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Vehicle Details (ID: {vehicle.id})</h2>
    <div className="card shadow-lg">
      <div className="card-body">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Vehicle Image</th>
              <td>
                <img
                  src={vehicle.image}
                  alt="Vehicle"
                  width="200"
                  style={{ objectFit: "cover" }}
                />
              </td>
            </tr>
            <tr>
              <th>Vehicle ID</th>
              <td>{vehicle.id}</td>
            </tr>
            <tr>
              <th>Variant Name</th>
              <td>{vehicle.variantName}</td>
            </tr>
            <tr>
              <th>Registration Number</th>
              <td>{vehicle.registrationNumber}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{vehicle.color}</td>
            </tr>
            <tr>
              <th>Availability</th>
              <td>{vehicle.availabilityStatus}</td>
            </tr>
            <tr>
              <th>Price per Day</th>
              <td>₹{vehicle.pricePerDay}</td>
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
