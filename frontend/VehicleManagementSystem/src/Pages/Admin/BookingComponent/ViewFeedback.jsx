import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/feedback")
  //     .then(res => setFeedbackList(res.data))
  //     .catch(err => console.error("Error fetching feedback:", err));
  // }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Customer Feedback</h3>
      {feedbackList.length === 0 ? (
        <p className="text-center text-muted">No feedback submitted yet.</p>
      ) : (
        <table className="table table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Review ID</th>
              <th>User ID</th>
              <th>Vehicle ID</th>
              <th>Rating</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map(fb => (
              <tr key={fb.review_id}>
                <td>{fb.review_id}</td>
                <td>{fb.user_id}</td>
                <td>{fb.vehicle_id || "N/A"}</td>
                <td>{fb.rating}</td>
                <td>{fb.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewFeedback;
