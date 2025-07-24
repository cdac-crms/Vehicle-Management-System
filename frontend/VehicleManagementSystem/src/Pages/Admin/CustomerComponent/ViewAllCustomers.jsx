import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewAllCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers([
      {
        id: 1,
        firstname: "Amit",
        lastname: "Sharma",
        email: "amit@gmail.com",
        phone: "9876543210",
        // drivingLicenseUrl: "https://example.com/license1.jpg"
      },
      {
        id: 2,
        firstname: "Sneha",
        lastname: "Mehta",
        email: "sneha@gmail.com",
        phone: "9876543210",
        // drivingLicenseUrl: "https://example.com/license2.jpg"
      },
    ]);
  }, []);

  const navigate = useNavigate();

  const handleViewLicense = (customer) => {
    navigate(`/admin/customer/${customer.id}`, { state: customer });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Registered Customers Details </h2>
      {customers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Sr. No</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td>{cust.firstname}</td>
                  <td>{cust.lastname}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleViewLicense(cust)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No customers found.</p>
      )}
    </div>
  );
};

export default ViewAllCustomers;
