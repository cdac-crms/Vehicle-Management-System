import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  concernType: "",
  message: "",
};

const HelpSupport = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get JWT token and userId from localStorage (stored during login)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");

  // Check authentication on component mount
  useEffect(() => {
    if (!token || !userId) {
      setError("You are not logged in. Please login to access support.");
      navigate("/login");
      return;
    }

    // Pre-fill form with user data from localStorage
    setForm(prev => ({
      ...prev,
      name: userName || "",
      email: userEmail || ""
    }));
  }, [token, userId, userName, userEmail, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token || !userId) {
      setError("Authentication required. Please login to submit support request.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare support request data
      const supportRequest = {
        userId: userId,
        name: form.name,
        email: form.email,
        concernType: form.concernType,
        message: form.message
      };

      // Send to backend API
      await axios.post(
        "http://localhost:8080/customer/support", 
        supportRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubmitted(true);
      setForm(initialState);
      // Pre-fill user data again after reset
      setForm(prev => ({
        ...prev,
        name: userName || "",
        email: userEmail || ""
      }));

    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError("Session expired. Please login again.");
        // Clear all auth-related localStorage items
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/login");
      } else {
        setError(
          err.response?.data?.message || 
          "Failed to submit support request. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Early return if not authenticated
  if (!token || !userId) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          Authentication required. Redirecting to login...
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 540 }}>
      <h2 className="mb-4 fw-bold text-center text-primary bg-light py-3 rounded">
        <i className="bi bi-question-circle-fill me-2"></i>
        Help &amp; Support
      </h2>

      <p className="text-muted mb-4">
        Raise your concern or report any issue about your bookings or cars. We'll get in touch soon!
      </p>

      {submitted && (
        <div className="alert alert-success" role="alert">
          Thank you! Your support request has been submitted successfully.
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-light rounded-4 p-4 shadow-sm">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
            id="helpName"
            disabled={loading}
          />
          <label htmlFor="helpName">Your Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
            id="helpEmail"
            disabled={loading}
          />
          <label htmlFor="helpEmail">Your Email</label>
        </div>

        <div className="mb-3">
          <label htmlFor="concernType" className="form-label fw-semibold">
            Concern Type
          </label>
          <select
            className="form-select"
            id="concernType"
            name="concernType"
            value={form.concernType}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select...</option>
            <option value="booking">Booking Problem</option>
            <option value="car">Car Problem</option>
            <option value="payment">Payment Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-floating mb-4">
          <textarea
            className="form-control"
            placeholder="Describe your problem"
            name="message"
            value={form.message}
            onChange={handleChange}
            style={{ height: "100px" }}
            required
            id="helpMessage"
            disabled={loading}
          />
          <label htmlFor="helpMessage">Describe your concern</label>
        </div>

        <div className="d-grid">
          <button 
            type="submit" 
            className="btn btn-primary fw-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpSupport;
