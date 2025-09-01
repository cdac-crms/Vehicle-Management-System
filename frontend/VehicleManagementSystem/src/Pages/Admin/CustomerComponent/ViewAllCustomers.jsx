import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCustomers } from "../../../services/CustomerService";
import { selectToken, selectRole } from "../../../redux/authSlice";

const ViewAllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  // Get token and role from Redux
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);

  useEffect(() => {
    // Optionally restrict access
    if (!token || role !== "ADMIN") {
      setMessage({ type: "danger", text: "Access denied. Admins only." });
      return;
    }

    fetchCustomers();
  }, [token, role]);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers(token); // pass token if API requires auth
      setCustomers(data);
      setMessage({ type: "", text: "" });
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setMessage({ type: "danger", text: "Failed to load customers." });
    }
  };

  const handleViewLicense = (customer) => {
    navigate(`/admin/customer/${customer.id}`, { state: customer });
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "Segoe UI" }}>
      <h2 className="text-center mb-4" style={{ color: "#102649" }}>
        All Registered Customers Details
      </h2>

      <div className="card shadow" style={{ border: `1px solid #102649` }}>
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#102649" }}
        >
          <h4 className="mb-0 text-center">Customer List</h4>
        </div>

        <div className="card-body bg-light">
          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          {customers.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Sr. No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((cust, index) => (
                    <tr key={cust.id}>
                      <td>{index + 1}</td>
                      <td>{cust.firstName}</td>
                      <td>{cust.lastName}</td>
                      <td>{cust.email}</td>
                      <td>{cust.contactNo}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          style={{
                            backgroundColor: "#102649",
                            borderColor: "#102649",
                          }}
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
      </div>
    </div>
  );
};

export default ViewAllCustomers;
