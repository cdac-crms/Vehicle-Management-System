import React from "react";

const PaymentSummary = () => {
  const payments = [
    {
      payment_id: 1,
      booking_id: 101,
      payment_method: "CARD",
      payment_status: "PAID",
      paid_on: "2025-07-22 10:00:00",
      transaction_id: "TXN123456",
      amount: 1500.0,
    },
    {
      payment_id: 2,
      booking_id: 102,
      payment_method: "UPI",
      payment_status: "PAID",
      paid_on: "2025-07-22 12:30:00",
      transaction_id: "TXN123457",
      amount: 2500.0,
    },
    {
      payment_id: 3,
      booking_id: 103,
      payment_method: "CASH",
      payment_status: "PAID",
      paid_on: "2025-07-23 09:15:00",
      transaction_id: "TXN123458",
      amount: 1800.0,
    },
    {
      payment_id: 4,
      booking_id: 104,
      payment_method: "NETBANKING",
      payment_status: "FAILED",
      paid_on: "2025-07-23 15:45:00",
      transaction_id: "TXN123459",
      amount: 2000.0,
    },
  ];

  // Calculate total revenue from successful payments
  const totalRevenue = payments
    .filter((p) => p.payment_status === "PAID")
    .reduce((acc, curr) => acc + curr.amount, 0);

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
                key={payment.payment_id}
                className={
                  payment.payment_status === "PAID"
                    ? "table-success"
                    : payment.payment_status === "FAILED"
                    ? "table-danger"
                    : "table-warning"
                }
              >
                <td>{payment.payment_id}</td>
                <td>{payment.booking_id}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.payment_status}</td>
                <td>{payment.paid_on}</td>
                <td>{payment.transaction_id}</td>
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
