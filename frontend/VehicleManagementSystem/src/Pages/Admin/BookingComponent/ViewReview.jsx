import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/authSlice";
import { getAllReviews } from "../../../services/ReviewService";

const ViewReview = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(null);

  // Redux auth token
  const token = useSelector(selectToken);

  useEffect(() => {
    fetchReviews();
  }, [token]);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews(); // send token if API requires auth
      setReviews(data);
    } catch (error) {
      setMessage({ type: "danger", text: "Failed to load reviews." });
    }
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "Segoe UI" }}>
      {/* Page Title */}
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#102649" }}>
        Customer Reviews
      </h2>

      {/* Card Wrapper */}
      <div className="card shadow" style={{ border: "1px solid #102649" }}>
        <div
          className="card-header text-white text-center"
          style={{ backgroundColor: "#102649" }}
        >
          <h4 className="mb-0">All Submitted Reviews</h4>
        </div>

        <div className="card-body bg-light">
          {/* Alert Messages */}
          {message && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          {/* Table / No Data Message */}
          {reviews.length === 0 ? (
            <p className="text-center text-muted mb-0">
              No reviews submitted yet.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered shadow-sm table-hover text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Review ID</th>
                    <th>User</th>
                    <th>Vehicle</th>
                    <th>Rating</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((rev) => (
                    <tr key={rev.id}>
                      <td>{rev.id}</td>
                      <td>{rev.customerName}</td>
                      <td>{rev.variantName || "N/A"}</td>
                      <td>{rev.rating}</td>
                      <td>{rev.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
