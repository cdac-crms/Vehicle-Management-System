import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Config
const API_BASE = 'http://localhost:8080';

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
  pending: { color: '#a67300', backgroundColor: '#fffbea', fontWeight: 600, padding: '0.2em 0.7em', borderRadius: 5, display: 'inline-block' },
  cancelled: { color: '#b71c1c', backgroundColor: '#ffdde0', fontWeight: 600, padding: '0.2em 0.85em', borderRadius: 4, display: 'inline-block' },
  approved: { color: '#15418c', backgroundColor: '#e1edfc', fontWeight: 600, padding: '0.2em 0.8em', borderRadius: 5, display: 'inline-block' },
  confirmed: { color: '#2e7d32', backgroundColor: '#e8f5e9', fontWeight: 600, padding: '0.2em 0.8em', borderRadius: 5, display: 'inline-block' },
  default: { color: '#2e7d32', backgroundColor: '#e8f5e9', fontWeight: 600, padding: '0.2em 0.85em', borderRadius: 4, display: 'inline-block' }
};

// Button styles
const actionBtnStyle = {
  base: { border: 'none', borderRadius: 5, padding: '0.33rem 1.1rem', fontWeight: 600, cursor: 'pointer', marginRight: '0.42em', marginBottom: '0.22em' },
  view: { background: '#2e7d32', color: '#fff' },
  pay: { background: '#2979ff', color: '#fff' },
  cancel: { background: '#b30527', color: '#fff' }
};

function getDayDiff(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const ms = end - start;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString();
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Redux auth
  const token = useSelector(state => state.auth.token);
  // const currentUserId = useSelector(state => state.auth.user?.id);
  const currentUserId = useSelector((state) => state.auth.userId);


  useEffect(() => {
    if (!token || !currentUserId) {
      setErrorMsg('Authentication required. Please login to view your bookings.');
      navigate('/login');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    axios.get(`${API_BASE}/customer/booking?userId=${currentUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
        setLoading(false);
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate('/login');
        } else {
          setErrorMsg(err.response?.data?.message || 'Error fetching bookings');
        }
        setLoading(false);
      });
  }, [token, currentUserId, navigate]);

  const handleCancel = async (booking) => {
    if (!token || !currentUserId) {
      toast.error('Authentication required. Please login again.');
      navigate('/login');
      return;
    }

    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.put(
        `${API_BASE}/customer/booking/${booking.bookingId}/cancel?userId=${currentUserId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(prev =>
        prev.map(b => b.bookingId === booking.bookingId ? { ...b, bookingStatus: 'CANCELLED' } : b)
      );
      toast.success(`Booking #${booking.bookingId} cancelled!`);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      } else {
        toast.error(err.response?.data?.message || 'Failed to cancel booking!');
      }
    }
  };

  const handlePay = (booking) => {
    if (!token || !currentUserId) {
      toast.error('Authentication required. Please login again.');
      navigate('/login');
      return;
    }

    const totalDays = getDayDiff(booking.startDate, booking.endDate);
    const totalAmount = (booking.pricePerDay || 0) * totalDays;
    navigate(`/customer/payment/${booking.bookingId}`, {
      state: {
        bookingId: booking.bookingId,
        carName: booking.carName,
        variant: booking.variant,
        pricePerDay: booking.pricePerDay,
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalDays,
        amount: totalAmount,
        userId: currentUserId
      }
    });
  };

  const handleView = (booking) => {
    if (!token || !currentUserId) {
      toast.error('Authentication required. Please login again.');
      navigate('/login');
      return;
    }

    toast.info(`Opening details for booking #${booking.bookingId}`);
    navigate(`/customer/booking-details/${booking.bookingId}`);
  };

  const statusStyleMap = {
    PENDING: badgeStyles.pending,
    APPROVED: badgeStyles.approved,
    CANCELLED: badgeStyles.cancelled,
    CONFIRMED: badgeStyles.confirmed,
  };

  if (!token || !currentUserId) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: '#f5f7fa' }}>
        <div className="text-center">
          <div className="alert alert-warning">
            Authentication required. Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: '#f5f7fa' }}>
      <div className="container" style={{
        maxWidth: '1100px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 4px 16px rgba(24,44,123,0.09)'
      }}>
        <h2 className="mb-4" style={{ color: '#112266', textAlign: 'left' }}>All Bookings</h2>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" />
            <div className="mt-2">Loading bookings...</div>
          </div>
        )}

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ fontSize: '1rem', background: '#fff', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Car Name</th>
                <th style={headerCellStyle}>Variant</th>
                <th style={headerCellStyle}>Total Days</th>
                <th style={headerCellStyle}>Price</th>
                <th style={headerCellStyle}>Booking Date & Time</th>
                <th style={headerCellStyle}>Start Date</th>
                <th style={headerCellStyle}>End Date</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {(!loading && bookings.length === 0) ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "2rem" }}>
                    <div className="text-muted">
                      <i className="bi bi-calendar-x" style={{ fontSize: "3rem" }}></i>
                      <div className="mt-2">No Bookings Yet.</div>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map(b => {
                  const totalDays = getDayDiff(b.startDate, b.endDate);
                  const totalPrice = totalDays * (b.pricePerDay || 0);

                  const statusUpper = typeof b.bookingStatus === 'string' ? b.bookingStatus.toUpperCase() : '';
                  const statusStyle = statusStyleMap[statusUpper] || badgeStyles.default;

                  const actionButtons = [];
                  if (statusUpper === "PENDING") {
                    actionButtons.push(
                      <button key="cancel" className="btn" style={{ ...actionBtnStyle.base, ...actionBtnStyle.cancel }} onClick={() => handleCancel(b)}>Cancel</button>,
                      <button key="view" className="btn" style={{ ...actionBtnStyle.base, ...actionBtnStyle.view }} onClick={() => handleView(b)}>View</button>
                    );
                  } else if (statusUpper === "APPROVED") {
                    actionButtons.push(
                      <button key="pay" className="btn" style={{ ...actionBtnStyle.base, ...actionBtnStyle.pay }} onClick={() => handlePay(b)}>Pay</button>,
                      <button key="view" className="btn" style={{ ...actionBtnStyle.base, ...actionBtnStyle.view }} onClick={() => handleView(b)}>View</button>
                    );
                  } else {
                    actionButtons.push(
                      <button key="view" className="btn" style={{ ...actionBtnStyle.base, ...actionBtnStyle.view }} onClick={() => handleView(b)}>View</button>
                    );
                  }

                  return (
                    <tr key={b.bookingId} style={{ borderBottom: '1px solid #e5e9f4' }}>
                      <td>{b.carName}</td>
                      <td>{b.variant}</td>
                      <td>{totalDays}</td>
                      <td>₹{totalPrice}</td>
                      <td>{formatDateTime(b.bookingDate)}</td>
                      <td>{formatDate(b.startDate)}</td>
                      <td>{formatDate(b.endDate)}</td>
                      <td><span style={statusStyle}>{(statusUpper.charAt(0) || '') + (statusUpper.slice(1).toLowerCase() || '')}</span></td>
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
