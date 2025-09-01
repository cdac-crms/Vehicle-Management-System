import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCustomerById } from "../../../services/CustomerService";
import { selectToken, selectRole } from '../../../redux/authSlice';

const ViewCustomerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get token and role from Redux
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        // Pass token if API requires authentication
        const customerData = await getCustomerById(id, token); 
        if (customerData) {
          setCustomer(customerData);
        } else {
          setError("Customer not found.");
        }
      } catch (err) {
        setError("Error fetching customer data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, token]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading customer details...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h5>{error}</h5>
        <p>Try going back to the customer list.</p>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="container mt-4" style={{ fontFamily: 'Segoe UI' }}>
      <h2 className="text-center mb-4" style={{ color: '#102649' }}>
        Customer Profile
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow text-center d-flex align-items-center" style={{ border: '1px solid #102649' }}>
            <h4 className="mb-3" style={{ color: '#102649' }}>
              {customer.firstName} {customer.lastName}
            </h4>

            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.contactNo}</p>

            <p><strong>Driving License:</strong></p>
            {customer.licenseImage ? (
              <img
                src={customer.licenseImage}
                alt="Driving License"
                className="img-fluid rounded border mb-3"
                style={{ maxHeight: '250px', maxWidth: '300px' }}
              />
            ) : (
              <p className="text-muted">No driving license image available.</p>
            )}

            <p><strong>License Number:</strong> {customer.licenseNumber || "Not Provided"}</p>
            <p><strong>License Expiry Date:</strong> {customer.expiryDate || "Not Provided"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center" style={{ color: '#102649' }}>
        <button
          className="btn"
          onClick={() => navigate(-1)}
          style={{ fontWeight: '600' }}
        >
          ← Back to Customers
        </button>
      </div>
    </div>
  );
};

export default ViewCustomerProfile;
