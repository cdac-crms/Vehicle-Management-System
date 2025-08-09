import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllBookings } from '../../../services/BookingService';

const ViewCustomerBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);
  
  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to load bookings.' });
    }
  };

  const handleViewDetails = (booking) => {
    navigate(`/admin/view-booking/${booking.id}`, { state: booking });
  };

  return (
    <div className="container mt-5" style={{ fontFamily: 'Segoe UI' }}>
      <h2 className="text-center mb-4" style={{ color: '#102649' }}>All Customer Booking Details</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      {bookings.length > 0 ? (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Sr. No</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Registration No</th>
                <th>Booking Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Booking Status</th>
                <th>Total Days</th>
                <th>Rent/Day (₹)</th>
                <th>Total (₹)</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.name}</td>
                  <td>{booking.registrationNumber}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.bookingStatus === "CONFIRMED"
                          ? "bg-success"
                          : booking.bookingStatus === "PENDING"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td>{booking.totalDays}</td>
                  <td>₹{booking.pricePerDay}</td>
                  <td>₹{booking.totalAmount}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleViewDetails(booking)}
                      title="View Booking details"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No bookings found.</p>
      )}
    </div>
  );
};

export default ViewCustomerBooking;
