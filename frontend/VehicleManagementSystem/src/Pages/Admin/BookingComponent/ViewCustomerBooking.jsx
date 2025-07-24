import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const ViewCustomerBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    setBookings([
      {
        id: 101,
        customerName: "Amit Sharma",
        vehicle: "Swift ZXi",
        bookingDate: "2025-05-10",
        registerationNo: "SZ2022",
        startDate: "2025-05-10",
        endDate: "2025-05-14",
        totalDays: 4,
        rentPerDay: 1200,
        totalAmount: 4800,
        bookingStatus: "Confirmed"
      },
      {
       
        id: 102,
        customerName: "Sneha Mehta",
        vehicle: "Creta SX",
        bookingDate: "2025-05-12",
        registerationNo: "SZ2022",
        startDate: "2025-05-12",
        endDate: "2025-05-15",
        totalDays: 3,
        rentPerDay: 2000,
        totalAmount: 6000,
        bookingStatus: "Pending"
      }
    ]);
  }, []);
  const navigate = useNavigate();

  const handleViewDetails = (booking) => {
    navigate(`/admin/view-booking/${booking.id}`, { state: booking }); 
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4"> All Customer Booking Details</h2>
      {bookings.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Sr. No</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Registeration No</th>
                <th>Booking Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Booking Status</th>
                <th>Total Days</th>
                <th>Rent/Day</th>
                <th>Total (₹)</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking , index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.vehicle}</td>
                  <td>{booking.registerationNo}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                   <td>
                    <span className={`badge ${booking.bookingStatus === "Confirmed" ? "bg-success" : "bg-warning"}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td>{booking.totalDays}</td>
                
                  <td>₹{booking.rentPerDay}</td>
                  <td>₹{booking.totalAmount}</td>
                  
                  <td>
                    <button  className="btn btn-sm btn-primary me-2"  onClick={() => handleViewDetails(booking)}title="View Bookin details"> View </button>
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
