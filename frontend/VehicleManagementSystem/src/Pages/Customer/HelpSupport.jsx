import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  concernType: "",
  message: "",
};

const HelpSupport = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to a backend API
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <div className="container py-4" style={{ maxWidth: 540 }}>
      <h2 className="mb-4 text-primary fw-bold">
        <i className="bi bi-question-circle me-2"></i> Help & Support
      </h2>
      <p className="text-muted mb-4">
        Raise your concern or report any issue about your bookings or cars. We’ll get in touch soon!
      </p>
      {submitted && (
        <div className="alert alert-success" role="alert">
          Thank you! Your support request has been submitted.
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
          />
          <label htmlFor="helpMessage">Describe your concern</label>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary fw-semibold">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpSupport;
