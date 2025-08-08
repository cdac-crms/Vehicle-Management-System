import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const NAVY = "#112266";
const PAYMENT_METHODS = ["CARD", "UPI", "NETBANKING", "CASH"];

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure navigation state; userId must be included in location.state!
  const {
    bookingId,
    carName,
    variant,
    startDate,
    endDate,
    totalDays,
    amount,
    userId
  } = location.state || {};

  const [finalAmount, setFinalAmount] = useState(amount || null);
  const [loading, setLoading] = useState(!amount || !bookingId || !userId);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);

  useEffect(() => {
    if (!amount || !bookingId || !userId) {
      setError("Cannot process payment: No booking/payment data found.");
      setTimeout(() => {
        navigate("/customer/my-bookings");
      }, 2000);
    } else {
      setFinalAmount(amount);
      setLoading(false);
    }
  }, [amount, bookingId, userId, navigate]);

  const handleShowForm = () => setShowForm(true);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Use exact backend path
      const response = await fetch("http://localhost:8080/customer/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          amount: finalAmount,
          paymentMethod: method,
          userId, // ⚠️ Include if and only if your backend requires it in request!
        })
      });

      setLoading(false);

      let apiResp = null;
      try { apiResp = await response.json(); } catch { }
      // Controller: PaymentResponseDto (success), ApiResponse (error). 
      // If you are returning PaymentResponseDto on success (best!), use
      // `if (response.ok && apiResp && apiResp.paymentId)`
      // If you are returning ApiResponse { success: true }
      if (response.ok && (apiResp?.success || apiResp?.paymentId)) {
        // Show message from backend or fallback
        alert(apiResp?.message || "Payment recorded successfully!");
        navigate("/customer/my-bookings");
      } else {
        // Prefer error message from API
        setError(apiResp?.message || "Payment failed to record.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Payment failed to record.");
    }
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1.4rem"
  };
  const tdLabelStyle = {
    border: "none",
    padding: "0.45em 0.2em 0.45em 0.8em",
    fontSize: "1.18rem",
    color: "#21346d",
    fontWeight: "bold",
    minWidth: 102,
    textAlign: "right",
    verticalAlign: "middle",
    letterSpacing: "0.01em"
  };
  const tdValueStyle = {
    border: "none",
    padding: "0.45em 0.25em",
    fontSize: "1.19rem",
    color: "#26324a",
    fontWeight: 500,
    textAlign: "left",
    minWidth: 135,
    verticalAlign: "middle"
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto"
        style={{ maxWidth: 430, borderRadius: 14, border: "none", background: "#fff" }}
      >
        <div className="card-body p-4">
          <h4
            className="fw-bold text-center mb-4"
            style={{ color: NAVY, fontSize: "1.7rem", letterSpacing: ".01em" }}
          >
            Payment Details
          </h4>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          ) : (
            <div>
              <table style={tableStyle}>
                <tbody>
                  {carName && (
                    <tr>
                      <td style={tdLabelStyle}>Car : </td>
                      <td style={tdValueStyle}>{carName}</td>
                    </tr>
                  )}
                  {variant && (
                    <tr>
                      <td style={tdLabelStyle}>Variant : </td>
                      <td style={tdValueStyle}>{variant}</td>
                    </tr>
                  )}
                  {startDate && (
                    <tr>
                      <td style={tdLabelStyle}>From : </td>
                      <td style={tdValueStyle}>{startDate}</td>
                    </tr>
                  )}
                  {endDate && (
                    <tr>
                      <td style={tdLabelStyle}>To : </td>
                      <td style={tdValueStyle}>{endDate}</td>
                    </tr>
                  )}
                  {typeof totalDays !== "undefined" && (
                    <tr>
                      <td style={tdLabelStyle}>Total Days : </td>
                      <td style={tdValueStyle}>{totalDays}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div
                className="fs-4 mb-4 text-center"
                style={{ color: NAVY, letterSpacing: ".03em", fontWeight: 600 }}
              >
                Payable amount : <span className="fw-bold">₹{finalAmount}</span>
              </div>
              {showForm ? (
                <form onSubmit={handlePayment}>
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-select"
                      value={method}
                      onChange={e => setMethod(e.target.value)}
                      disabled={loading}
                    >
                      {PAYMENT_METHODS.map(methodOpt => (
                        <option key={methodOpt} value={methodOpt}>
                          {methodOpt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    style={{ background: NAVY, border: "none" }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit Payment"}
                  </button>
                </form>
              ) : (
                <button
                  className="btn btn-primary w-100 fw-semibold"
                  style={{
                    background: NAVY,
                    fontSize: "1.18rem",
                    border: "none",
                    borderRadius: 7,
                    height: 48,
                    letterSpacing: ".01em"
                  }}
                  onClick={handleShowForm}
                  disabled={loading || !finalAmount}
                >
                  Pay
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
