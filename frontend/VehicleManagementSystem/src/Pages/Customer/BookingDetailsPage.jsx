import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillStar } from "react-icons/ai";

// Demo booking data array
const demoBookings = [
  {
    id: "1",
    carImage: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80",
    carName: "Swift LXI",
    variant: "Petrol",
    pricePerDay: 1899,
    fromDate: "2025-07-23",
    toDate: "2025-07-25",
    bookingDate: "2025-07-20T09:33:00.000Z",
    status: "Approved",
    paymentStatus: "Success",
    paymentId: "PAY12345",
    bookingId: "BKG0001",
    paymentMethod: "Credit Card",
    paidOn: "2025-07-20T10:01:00.000Z",
    amount: 5697,
    transactionId: "TRX567834",
  },
  // ...add more demo bookings here if desired
];

const DEFAULT_CAR_IMG = "https://via.placeholder.com/260x120?text=Car+Photo";

const badgeStyles = {
  pending: { color: '#a67300', backgroundColor: '#fffbea', padding: '0.18em 0.72em', borderRadius: 5, fontWeight: 600 },
  cancelled: { color: '#b71c1c', backgroundColor: '#ffdde0', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 },
  approved: { color: '#15418c', backgroundColor: '#e1edfc', padding: '0.18em 0.8em', borderRadius: 5, fontWeight: 600 },
  confirm: { color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '0.18em 0.8em', borderRadius: 5, fontWeight: 600 },
  default: { color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 }
};
const paymentBadgeStyles = {
  success: { color: '#0a7c36', backgroundColor: '#e3faeb', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 },
  failed: { color: '#b71c1c', backgroundColor: '#ffdde0', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 }
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString();
}
function getDayDiff(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  const ms = end - start;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
}

export default function BookingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use hardcoded booking data:
  const booking = demoBookings.find((b) => String(b.id) === id);

  // Review state
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");

  // Badge logic
  let statusStyle;
  switch ((booking?.status || "").toLowerCase()) {
    case "pending": statusStyle = badgeStyles.pending; break;
    case "cancelled": statusStyle = badgeStyles.cancelled; break;
    case "approved": statusStyle = badgeStyles.approved; break;
    case "confirm": statusStyle = badgeStyles.confirm; break;
    default: statusStyle = badgeStyles.default;
  }
  let paymentStyle, paymentLabel;
  if ((booking?.paymentStatus || "").toLowerCase() === "success") {
    paymentStyle = paymentBadgeStyles.success; paymentLabel = "Success";
  } else if ((booking?.paymentStatus || "").toLowerCase() === "failed") {
    paymentStyle = paymentBadgeStyles.failed; paymentLabel = "Failed";
  } else {
    paymentStyle = { color: "#aaa" }; paymentLabel = "-";
  }

  if (!booking) {
    return (
      <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 570, margin: '4rem auto', textAlign: 'center' }}>
          <div style={{ fontSize: 48, color: "#b30527" }}>⛔️</div>
          <h1 style={{ color: "#102649", fontWeight: 700 }}>Booking not found</h1>
          <button
            className="btn mt-4"
            style={{ color: "#fff", background: "#15418c", borderRadius: 6, padding: '0.48em 2em', fontWeight: 600 }}
            onClick={() => navigate(-1)}
          >Back</button>
        </div>
      </div>
    );
  }

  const totalDays = getDayDiff(booking.fromDate, booking.toDate);
  const totalPrice = totalDays * booking.pricePerDay;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (stars === 0) {
      toast.error("Please select a star rating!");
      return;
    }
    toast.success("Thank you for your review!");
    setDescription("");
    setStars(0);
  };

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <ToastContainer />
      <div className="container pt-5" style={{ maxWidth: 1050, margin: '0 auto' }}>

        {/* Responsive row with two cards side by side */}
        <div className="row gy-4 gx-4 mb-4">
          {/* Left: Booking Details Card */}
          <div className="col-md-7">
            <div className="card rounded-4 shadow border-0 h-100 px-0 px-md-2 py-3">
              <div className="row g-0 align-items-center">
                {/* Car Image */}
                <div className="col-sm-5 col-12 text-center">
                  <img
                    src={booking.carImage || DEFAULT_CAR_IMG}
                    alt={booking.carName}
                    className="img-fluid rounded-3 shadow-sm"
                    style={{
                      width: 180,
                      height: 108,
                      objectFit: "cover",
                      borderRadius: 14,
                      boxShadow: "0 2px 10px rgba(24,44,123,0.11)",
                      marginBottom: 10
                    }}
                  />
                </div>
                {/* Details */}
                <div className="col-sm-7 col-12 px-3">
                  <h4 className="mb-3 fw-bold" style={{ color: "#102649", letterSpacing: "0.5px" }}>
                    Booking Details
                  </h4>
                  <div className="mb-2">
                    <b>Booking ID:</b> <span>{booking.bookingId || booking.id || "-"}</span>
                  </div>
                  <div className="mb-2">
                    <b>Car Name:</b> <span>{booking.carName}</span>
                  </div>
                  <div className="mb-2">
                    <b>Variant:</b> <span>{booking.variant}</span>
                  </div>
                  <div className="mb-2">
                    <b>Total Days:</b> <span>{totalDays}</span>
                  </div>
                  <div className="mb-2">
                    <b>Price/Day:</b> <span>₹{booking.pricePerDay}</span>
                  </div>
                  <div className="mb-2">
                    <b>Total Price:</b> <span className="fw-semibold">₹{totalPrice}</span>
                  </div>
                  <div className="mb-2">
                    <b>Booking Date &amp; Time:</b> <span>{formatDateTime(booking.bookingDate)}</span>
                  </div>
                  <div className="mb-2">
                    <b>From:</b> <span>{formatDate(booking.fromDate)}</span>
                  </div>
                  <div className="mb-2">
                    <b>To:</b> <span>{formatDate(booking.toDate)}</span>
                  </div>
                  <div className="mb-2">
                    <b>Status:</b> <span style={statusStyle}>{booking.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Details Card */}
          <div className="col-md-5">
            <div className="card rounded-4 shadow border-0 h-100 px-0 px-md-2 py-3">
              <h5 className="mb-3 fw-bold text-center" style={{ color: "#15418c" }}>
                Payment Details
              </h5>
              <div className="row mb-2">
                <div className="col-6"><b>Payment ID:</b></div>
                <div className="col-6">{booking.paymentId || "-"}</div>
                <div className="col-6"><b>Booking ID:</b></div>
                <div className="col-6">{booking.bookingId || booking.id || "-"}</div>
                <div className="col-6"><b>Payment Method:</b></div>
                <div className="col-6">{booking.paymentMethod || "-"}</div>
                <div className="col-6"><b>Payment Status:</b></div>
                <div className="col-6">
                  <span style={paymentStyle}>{booking.paymentStatus || paymentLabel || "-"}</span>
                </div>
                <div className="col-6"><b>Paid On:</b></div>
                <div className="col-6">
                  {booking.paidOn ? formatDateTime(booking.paidOn) : "-"}
                </div>
                <div className="col-6"><b>Amount Paid:</b></div>
                <div className="col-6">₹{booking.amount || totalPrice}</div>
                <div className="col-6"><b>Transaction ID:</b></div>
                <div className="col-6">{booking.transactionId || "-"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Below both cards: Review section */}
        <div className="row mb-4">
          <div className="col-lg-9 mx-auto">
            <div className="bg-white rounded-4 shadow-sm p-4">
              <h4 className="mb-3 fw-bold text-primary">Add a Review</h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Rating</label>
                  <div>
                    {[1, 2, 3, 4, 5].map(i => (
                      <AiFillStar
                        key={i}
                        size={28}
                        color={i <= stars ? "#FFD700" : "#e0e0e0"}
                        onClick={() => setStars(i)}
                        style={{
                          cursor: "pointer",
                          marginRight: 4,
                          transition: "color 0.14s"
                        }}
                      />
                    ))}
                    {stars > 0 && (
                      <span className="ms-2 text-warning" style={{ fontWeight: 500 }}>
                        {stars} Star{stars > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="reviewDesc" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="reviewDesc"
                    name="description"
                    placeholder="Share your feedback"
                    rows={3}
                    maxLength={250}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary fw-semibold"
                    type="submit"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
