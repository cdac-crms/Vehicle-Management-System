import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ViewCustomerProfile = () => {
  const { id } = useParams();
  const { state: customer } = useLocation();

  if (!customer) {
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">Customer data not available.</h5>
        <p>Try visiting this page through the customer list.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Customer Profile (ID: {id})</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h4 className="mb-3">{customer.name}</h4>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            {/* <p><strong>Address:</strong> {customer.address}</p> */}
            <p><strong>Driving License:</strong></p>
            <img
              src={customer.drivingLicenseUrl}
              alt="Driving License"
              className="img-fluid rounded border"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerProfile;
