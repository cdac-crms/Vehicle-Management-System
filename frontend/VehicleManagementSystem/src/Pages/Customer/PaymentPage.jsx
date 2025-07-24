import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";

const NAVY = "#112266";

const demoPayment = {
  amount: 1200
};

const PaymentPage = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validity, setValidity] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  // Simulate backend fetch
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAmount(demoPayment.amount);
      setLoading(false);
    }, 600);
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted! (frontend demo)");
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto"
        style={{
          maxWidth: 400,
          borderRadius: 14,
          border: "none",
          background: "#fff",
        }}
      >
        <div className="card-body p-4">
          <h4
            className="fw-bold text-center mb-4"
            style={{ color: NAVY, fontSize: "1.6rem", letterSpacing: ".01em" }}
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row align-items-center mb-3">
                <div className="col-5 text-end fw-semibold" style={{ color: "#27314b" }}>
                  Name on Card:
                </div>
                <div className="col-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    style={{ borderRadius: 7 }}
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <div className="col-5 text-end fw-semibold" style={{ color: "#27314b" }}>
                  Card Number:
                </div>
                <div className="col-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    pattern="\d{12,19}"
                    maxLength={19}
                    required
                    inputMode="numeric"
                    style={{ borderRadius: 7 }}
                  />
                </div>
              </div>

              {/* Validity row */}
              <div className="row align-items-center mb-3">
                <div className="col-5 text-end fw-semibold" style={{ color: "#27314b" }}>
                  Validity:
                </div>
                <div className="col-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                    value={validity}
                    onChange={e => {
                      // Allow only numbers and slashes, enforce format
                      let val = e.target.value;
                      // Remove non-numeric except slash
                      val = val.replace(/[^\d/]/g, "");
                      // Auto-insert slashes for DD/MM/YYYY
                      if (val.length === 2 || val.length === 5) {
                        if (validity.length < val.length) val += "/";
                      }
                      // Max 10 chars (DD/MM/YYYY)
                      if (val.length > 10) val = val.slice(0, 10);
                      setValidity(val);
                    }}
                    maxLength={10}
                    pattern="\d{2}/\d{2}/\d{4}"
                    required
                    style={{ borderRadius: 7 }}
                  />
                </div>
              </div>

              {/* CVV row */}
              <div className="row align-items-center mb-4">
                <div className="col-5 text-end fw-semibold" style={{ color: "#27314b" }}>
                  CVV:
                </div>
                <div className="col-7">
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="\d{3}"
                    maxLength={3}
                    className="form-control"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/, ""))
                    }
                    required
                    style={{ borderRadius: 7 }}
                  />
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold mb-1"
                style={{
                  background: NAVY,
                  fontSize: "1.09rem",
                  border: "none",
                  borderRadius: 7,
                  height: 46,
                  letterSpacing: ".01em"
                }}
                disabled={loading || !amount}
              >
                Pay {amount ? `₹${amount}` : ""}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
