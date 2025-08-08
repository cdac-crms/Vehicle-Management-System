import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ViewCustomerProfile = () => {
  const { id } = useParams();
  const { state: customer } = useLocation();

  if (!customer) {
    return (
      <div className="container mt-5 text-center" style={{ fontFamily: 'Segoe UI' }}>
        <h5 className="text-danger">Customer data not available.</h5>
        <p>Try visiting this page through the customer list.</p>
      </div>
    );
  }

  const navigate = useNavigate();

  return (
    <div className="container mt-5" style={{ fontFamily: 'Segoe UI' }}>
      <h2 className="text-center mb-4" style={{ color: '#102649' }}>
        Customer Profile (ID: {id})
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow" style={{ border: '1px solid #102649' }}>
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
                className="img-fluid rounded border"
                style={{ maxHeight: '400px' }}
              />
            ) : (
              <p className="text-muted">No driving license image available.</p>
            )}
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