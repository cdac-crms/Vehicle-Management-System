import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Header cell style
const headerCellStyle = {
  background: '#102649',
  color: '#fff',
  letterSpacing: '1px',
  fontWeight: 600,
  border: 'none'
};

// Status badge styles
const badgeStyles = {
  pending:  { color: '#a67300', backgroundColor: '#fffbea', fontWeight: 600, padding: '0.2em 0.7em', borderRadius: 5, display: 'inline-block' },
  cancelled:{ color: '#b71c1c', backgroundColor: '#ffdde0', fontWeight: 600, padding: '0.2em 0.85em', borderRadius: 4, display: 'inline-block' },
  approved: { color: '#15418c', backgroundColor: '#e1edfc', fontWeight: 600, padding: '0.2em 0.8em', borderRadius: 5, display: 'inline-block' },
  confirm:  { color: '#2e7d32', backgroundColor: '#e8f5e9', fontWeight: 600, padding: '0.2em 0.8em', borderRadius: 5, display: 'inline-block' },
  default:  { color: '#2e7d32', backgroundColor: '#e8f5e9', fontWeight: 600, padding: '0.2em 0.85em', borderRadius: 4, display: 'inline-block' }
};

// Button styles
const actionBtnStyle = {
  base:    { border: 'none', borderRadius: 5, padding: '0.33rem 1.1rem', fontWeight: 600, cursor: 'pointer', marginRight: '0.42em', marginBottom: '0.22em' },
  view:    { background: '#2e7d32', color: '#fff' },
  pay:     { background: '#2979ff', color: '#fff' },
  cancel:  { background: '#b30527', color: '#fff' }
};

function getDayDiff(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  const ms = end - start;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString();
}

// HARDCODED BOOKINGS DATA (swap to API/DB fetch later)
const initialBookings = [
  {
    id: 1,
    carName: "Swift LXI",
    variant: "Petrol",
    pricePerDay: 1899,
    fromDate: "2025-07-23",
    toDate: "2025-07-25",
    bookingDate: "2025-07-20T09:33:00.000Z",
    status: "Pending",
    paymentStatus: "",
  },
  {
    id: 2,
    carName: "Hyundai i20",
    variant: "Petrol",
    pricePerDay: 2200,
    fromDate: "2025-07-10",
    toDate: "2025-07-11",
    bookingDate: "2025-07-05T14:01:00.000Z",
    status: "Approved",
    paymentStatus: "Success",
  },
  {
    id: 3,
    carName: "Honda Amaze",
    variant: "Petrol",
    pricePerDay: 2100,
    fromDate: "2025-07-06",
    toDate: "2025-07-08",
    bookingDate: "2025-07-04T19:03:00.000Z",
    status: "Cancelled",
    paymentStatus: "Failed"
  },
  // Add more bookings as needed
];

export default function MyBookingsPage() {
  const navigate = useNavigate();
  // Swap this state to fetched API data for backend integration
  const [bookings, setBookings] = useState(initialBookings);

  const handleCancel = (booking) => {
    setBookings((prev) =>
      prev.map(b =>
        b.id === booking.id ? { ...b, status: "Cancelled" } : b
      )
    );
    toast.error(`Booking #${booking.id} cancelled!`);
  };

  const handlePay = (booking) => {
    navigate(`/customer/payment/${booking.id}`, {
      state: {
        bookingId: booking.id,
        amount: booking.pricePerDay * getDayDiff(booking.fromDate, booking.toDate)
      }
    });
  };

  const handleView = (booking) => {
    toast.info(`Opening details for booking #${booking.id}`);
    navigate(`/customer/booking-details/${booking.id}`);
  };

  return (
    <div className="min-vh-100" style={{ background: '#f5f7fa' }}>
      <div
        className="container"
        style={{
          maxWidth: '1100px',
          margin: '2rem auto',
          padding: '2rem',
          background: '#fff',
          borderRadius: '14px',
          boxShadow: '0 4px 16px rgba(24,44,123,0.09)'
        }}
      >
        <h2
          className="mb-4"
          style={{ color: '#112266', textAlign: 'left' }}
        >
          All Bookings
        </h2>
        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ fontSize: '1rem', background: '#fff', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Car Name</th>
                <th style={headerCellStyle}>Variant</th>
                <th style={headerCellStyle}>Total Days</th>
                <th style={headerCellStyle}>Price</th>
                <th style={headerCellStyle}>Booking Date & Time</th>
                <th style={headerCellStyle}>From Date</th>
                <th style={headerCellStyle}>To Date</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>No Bookings Yet.</td>
                </tr>
              ) : (
                bookings.map(b => {
                  const totalDays = getDayDiff(b.fromDate, b.toDate);
                  const totalPrice = totalDays * b.pricePerDay;

                  // Status style
                  let statusStyle;
                  switch (b.status?.toLowerCase()) {
                    case "pending":   statusStyle = badgeStyles.pending; break;
                    case "cancelled": statusStyle = badgeStyles.cancelled; break;
                    case "approved":  statusStyle = badgeStyles.approved; break;
                    case "confirm":   statusStyle = badgeStyles.confirm; break;
                    default:          statusStyle = badgeStyles.default;
                  }

                  // Actions for each status
                  const actionButtons = [];
                  const statusLower = b.status?.toLowerCase();
                  if (statusLower === "pending") {
                    actionButtons.push(
                      <button
                        key="cancel"
                        className="btn"
                        style={{ ...actionBtnStyle.base, ...actionBtnStyle.cancel }}
                        onClick={() => handleCancel(b)}
                      >Cancel</button>
                    );
                    actionButtons.push(
                      <button
                        key="view"
                        className="btn"
                        style={{ ...actionBtnStyle.base, ...actionBtnStyle.view }}
                        onClick={() => handleView(b)}
                      >View</button>
                    );
                  } else if (statusLower === "approved") {
                    actionButtons.push(
                      <button
                        key="pay"
                        className="btn"
                        style={{ ...actionBtnStyle.base, ...actionBtnStyle.pay }}
                        onClick={() => handlePay(b)}
                      >Pay</button>
                    );
                    actionButtons.push(
                      <button
                        key="view"
                        className="btn"
                        style={{ ...actionBtnStyle.base, ...actionBtnStyle.view }}
                        onClick={() => handleView(b)}
                      >View</button>
                    );
                  } else {
                    // For all other statuses, View always enabled
                    actionButtons.push(
                      <button
                        key="view"
                        className="btn"
                        style={{ ...actionBtnStyle.base, ...actionBtnStyle.view }}
                        onClick={() => handleView(b)}
                      >View</button>
                    );
                  }

                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid #e5e9f4' }}>
                      <td>{b.carName}</td>
                      <td>{b.variant}</td>
                      <td>{totalDays}</td>
                      <td>₹{totalPrice}</td>
                      <td>{formatDateTime(b.bookingDate)}</td>
                      <td>{formatDate(b.fromDate)}</td>
                      <td>{formatDate(b.toDate)}</td>
                      <td>
                        <span style={statusStyle}>
                          {(b.status?.charAt(0).toUpperCase() || '') + (b.status?.slice(1).toLowerCase() || '')}
                        </span>
                      </td>
                      <td>{actionButtons}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

