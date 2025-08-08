import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillStar } from "react-icons/ai";
import { Spinner } from "react-bootstrap";

const API_BASE_URL = "http://localhost:8080";
const DEFAULT_CAR_IMG = "https://via.placeholder.com/260x120?text=Car+Photo";

const badgeStyles = {
  pending: { color: '#a67300', backgroundColor: '#fffbea', padding: '0.18em 0.72em', borderRadius: 5, fontWeight: 600 },
  cancelled: { color: '#b71c1c', backgroundColor: '#ffdde0', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 },
  approved: { color: '#15418c', backgroundColor: '#e1edfc', padding: '0.18em 0.8em', borderRadius: 5, fontWeight: 600 },
  confirm: { color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '0.18em 0.8em', borderRadius: 5, fontWeight: 600 },
  default: { color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 }
};
const paymentBadgeStyles = {
  PAID: { color: '#0a7c36', backgroundColor: '#e3faeb', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 },
  FAILED: { color: '#b71c1c', backgroundColor: '#ffdde0', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 },
  PENDING: { color: '#a67300', backgroundColor: '#fffbea', padding: '0.18em 0.85em', borderRadius: 4, fontWeight: 600 },
  '--': { color: "#aaa" }
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
}
function formatDateTime(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString();
}
function getDayDiff(from, to) {
  if (!from || !to) return "-";
  const start = new Date(from);
  const end = new Date(to);
  const ms = end - start;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
}

export default function BookingDetailsPage() {
  const { id } = useParams(); // BookingId
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Review state
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [postingReview, setPostingReview] = useState(false);
  const [reviewErrMsg, setReviewErrMsg] = useState("");

  // Read token and userId from localStorage (stored during login)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!id || !userId) {
      setError("Missing booking or user information. Please login again.");
      setLoading(false);
      return;
    }
    if (!token) {
      setError("Authentication required. Please login to view this booking.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const axiosAuthConfig = { headers: { Authorization: `Bearer ${token}` } };

    axios.get(`${API_BASE_URL}/customer/booking/${id}?userId=${userId}`, axiosAuthConfig)
      .then(res => {
        setBooking(res.data);
        if (res.data.vehicleId) {
          // Look up vehicle for live info (name, variant, image)
          return axios.get(`${API_BASE_URL}/vehicles/${res.data.vehicleId}`, axiosAuthConfig)
            .then(vehRes => setVehicle(vehRes.data))
            .catch(() => setVehicle(null));
        } else {
          setVehicle(null);
        }
        return null;
      })
      .then(() =>
        axios.get(`${API_BASE_URL}/customer/payments/booking/${id}?userId=${userId}`, axiosAuthConfig)
          .then(res => setPayment(res.data))
          .catch(() => setPayment(null))
      )
      .finally(() => setLoading(false))
      .catch(err => {
        setLoading(false);
        setError(
          err.response?.data?.message ||
          "Error loading booking, vehicle, or payment details."
        );
      });
  }, [id, userId, token]);

  if (loading) {
    return (
      <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
        <div className="container py-5 text-center" style={{ maxWidth: 600 }}>
          <Spinner animation="border" variant="primary" />
          <div className="mt-3">Loading booking details...</div>
        </div>
      </div>
    );
  }
  if (error || !booking) {
    return (
      <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: 570, margin: "4rem auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, color: "#b30527" }}>⛔️</div>
          <h1 style={{ color: "#102649", fontWeight: 700 }}>{error || "Booking not found"}</h1>
          <button
            className="btn mt-4"
            style={{ color: "#fff", background: "#15418c", borderRadius: 6, padding: "0.48em 2em", fontWeight: 600 }}
            onClick={() => navigate("/customer/my-bookings")}
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const statusKey = (booking.bookingStatus || booking.status || "").toLowerCase();
  let statusStyle = badgeStyles[(statusKey === "confirmed" ? "confirm" : statusKey)] || badgeStyles.default;

  const payStat = (payment?.paymentStatus || "").toUpperCase();
  const paymentStyle = paymentBadgeStyles[payStat] || paymentBadgeStyles["--"];
  const paymentLabel = payStat === "PAID" ? "Paid" : payStat === "FAILED" ? "Failed" : payStat === "PENDING" ? "Pending" : "-";

  const totalDays = getDayDiff(booking.startDate || booking.fromDate, booking.endDate || booking.toDate);
  const totalPrice = totalDays * (booking.pricePerDay || 0);

  // Safely get vehicleId for review -- prefer vehicle.vehicleId, else booking.vehicleId
  const getVehicleId = () =>
    (vehicle && (vehicle.vehicleId || vehicle.id)) ||
    booking.vehicleId ||
    booking.vehicle_id || // compat for snake_case
    null;

  // Review submit: toast only for success!
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewErrMsg("");

    if (!token || !userId) {
      setReviewErrMsg("Authentication required. Please login to submit a review.");
      return;
    }
    if (stars === 0) {
      setReviewErrMsg("Please select a star rating!");
      return;
    }
    const vehicleId = getVehicleId();
    if (!vehicleId) {
      setReviewErrMsg("No valid vehicleId found. Cannot create review.");
      return;
    }
    setPostingReview(true);

    const axiosAuthConfig = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .post(
        `${API_BASE_URL}/customer/review`,
        {
          vehicleId,
          userId,
          rating: stars,
          message: description
        },
        axiosAuthConfig
      )
      .then(() => {
        toast.success("Thank you for your review!");
        setDescription("");
        setStars(0);
        setReviewErrMsg("");
      })
      .catch(err => {
        setReviewErrMsg(
          err.response?.data?.message || "Failed to submit review!"
        );
      })
      .finally(() => setPostingReview(false));
  };

  const vehicleName = vehicle ? vehicle.name : (booking.carName || "-");
  const vehicleVariant = vehicle ? vehicle.variant : (booking.variant || "-");
  const vehicleImgUrl =
    (vehicle && (vehicle.imageUrl || vehicle.image)) ||
    booking.carImage ||
    DEFAULT_CAR_IMG;

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <ToastContainer />
      <div className="container pt-5" style={{ maxWidth: 1050, margin: '0 auto' }}>
        <div className="row gy-4 gx-4 mb-4">
          {/* Left: Booking Details */}
          <div className="col-md-7">
            <div className="card rounded-4 shadow border-0 h-100 px-0 px-md-2 py-3">
              <div className="row g-0 align-items-center">
                <div className="col-sm-5 col-12 text-center">
                  <img
                    src={vehicleImgUrl}
                    alt={vehicleName}
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
                <div className="col-sm-7 col-12 px-3">
                  <h4 className="mb-3 fw-bold" style={{ color: "#102649", letterSpacing: "0.5px" }}>
                    Booking Details
                  </h4>
                  <div className="mb-2">
                    <b>Booking ID:</b> <span>{booking.bookingId || booking.id || "-"}</span>
                  </div>
                  <div className="mb-2">
                    <b>Car Name:</b> <span>{vehicleName}</span>
                  </div>
                  <div className="mb-2">
                    <b>Variant:</b> <span>{vehicleVariant}</span>
                  </div>
                  <div className="mb-2">
                    <b>Total Days:</b> <span>{totalDays}</span>
                  </div>
                  <div className="mb-2">
                    <b>Price/Day:</b> <span>₹{booking.pricePerDay || (vehicle && vehicle.pricePerDay) || "-"}</span>
                  </div>
                  <div className="mb-2">
                    <b>Total Price:</b> <span className="fw-semibold">₹{totalPrice}</span>
                  </div>
                  <div className="mb-2">
                    <b>Booking Date & Time:</b> <span>{formatDateTime(booking.bookingDate)}</span>
                  </div>
                  <div className="mb-2">
                    <b>From:</b> <span>{formatDate(booking.startDate || booking.fromDate)}</span>
                  </div>
                  <div className="mb-2">
                    <b>To:</b> <span>{formatDate(booking.endDate || booking.toDate)}</span>
                  </div>
                  <div className="mb-2">
                    <b>Status:</b> <span style={statusStyle}>{booking.bookingStatus || booking.status || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Payment Details */}
          <div className="col-md-5">
            <div className="card rounded-4 shadow border-0 h-100 px-0 px-md-2 py-3">
              <h5 className="mb-3 fw-bold text-center" style={{ color: "#15418c" }}>
                Payment Details
              </h5>
              {payment ? (
                <div className="row mb-2">
                  <div className="col-6"><b>Payment ID:</b></div>
                  <div className="col-6">{payment.paymentId || "-"}</div>
                  <div className="col-6"><b>Booking ID:</b></div>
                  <div className="col-6">{payment.bookingId || booking.bookingId || booking.id || "-"}</div>
                  <div className="col-6"><b>Payment Method:</b></div>
                  <div className="col-6">{payment.paymentMethod || "-"}</div>
                  <div className="col-6"><b>Payment Status:</b></div>
                  <div className="col-6">
                    <span style={paymentStyle}>{payment.paymentStatus || paymentLabel || "-"}</span>
                  </div>
                  <div className="col-6"><b>Paid On:</b></div>
                  <div className="col-6">{payment.paidOn ? formatDateTime(payment.paidOn) : "-"}</div>
                  <div className="col-6"><b>Amount Paid:</b></div>
                  <div className="col-6">₹{payment.amount || totalPrice}</div>
                  <div className="col-6"><b>Transaction ID:</b></div>
                  <div className="col-6">{payment.transactionId || "-"}</div>
                </div>
              ) : (
                <div className="text-muted text-center py-3">No payment record found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Review section */}
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
                {reviewErrMsg && (
                  <div className="alert alert-danger" style={{ fontSize: "1.04rem", textAlign: "center" }}>
                    {reviewErrMsg}
                  </div>
                )}
                <div className="d-grid">
                  <button
                    className="btn btn-primary fw-semibold"
                    type="submit"
                    disabled={postingReview}
                  >
                    {postingReview ? "Submitting..." : "Submit Review"}
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
