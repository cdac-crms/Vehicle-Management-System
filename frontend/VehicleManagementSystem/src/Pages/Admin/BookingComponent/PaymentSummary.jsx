import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../../services/PaymentService";

const PaymentSummary = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Calculate total revenue from successful payments
  const totalRevenue = payments
    .filter((p) => p.paymentStatus === "PAID")
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <p className="text-center mt-5">Loading payments...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payment Summary</h2>
      <div className="alert alert-success">
        <strong>Total Revenue:</strong> ₹{totalRevenue.toFixed(2)}
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>Method</th>
              <th>Status</th>
              <th>Paid On</th>
              <th>Transaction ID</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.paymentId}
                className={
                  payment.paymentStatus === "PAID"
                    ? "table-success"
                    : payment.paymentStatus === "FAILED"
                    ? "table-danger"
                    : "table-warning"
                }
              >
                <td>{payment.paymentId}</td>
                <td>{payment.bookingId}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.paymentStatus}</td>
                <td>{new Date(payment.paidOn).toLocaleString()}</td>
                <td>{payment.transactionId}</td>
                <td>₹{payment.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSummary;
