import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/authSlice";
import { getBookingById, updateBookingStatus } from "../../../services/BookingService";

const ViewBookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redux auth token
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingDetails = await getBookingById(id); // send token if API requires auth
        setBooking(bookingDetails);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [id, token]);

  const handleStatusChange = async (status) => {
    const confirmAction = window.confirm(`Are you sure you want to ${status.toLowerCase()} this booking?`);
    if (!confirmAction) return;

    try {
      await updateBookingStatus(id, status); // send token if API requires auth
      setBooking((prev) => ({ ...prev, bookingStatus: status }));
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading booking details...</p>;
  }

  if (!booking) {
    return (
      <p className="text-center mt-5">No Booking details found for ID: {id}</p>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booking Details (ID: {id})</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <img
              src={booking.image}
              className="card-img-top"
              alt="Failed to load vehicle image from server"
            />
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3 text-center">Vehicle Info</h5>
            <p><strong>Company:</strong> {booking.companyName}</p>
            <p><strong>Model:</strong> {booking.name}</p>
            <p><strong>Fuel Type:</strong> {booking.fuelType}</p>
            <p><strong>Rent/Day:</strong> ₹{booking.pricePerDay}</p>
            <p><strong>Reg. Number:</strong> {booking.registrationNumber}</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3 text-center">Booking Info</h5>
            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
            <p><strong>Booked At:</strong> {booking.bookingDate}</p>
            <p><strong>From:</strong> {booking.startDate}</p>
            <p><strong>To:</strong> {booking.endDate}</p>
            <p><strong>Total Fare:</strong> ₹{booking.totalAmount}</p>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3 text-center">Customer Info</h5>
            <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
            <p><strong>Contact:</strong> {booking.contactNo}</p>
            <p><strong>Email:</strong> {booking.email}</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3">Driving Licence</h5>
            <p><strong>DL Number:</strong> {booking.licenseNumber || "Not Provided"}</p>
            <p><strong>Expiry Date:</strong> {booking.expiryDate || "Not Provided"}</p>
            <div className="mt-2">
              <p><strong>License Image : </strong></p>
              {booking.licenseImage ? (
                <img
                  src={booking.licenseImage}
                  alt="Driving Licence"
                  className="img-fluid rounded border"
                />
              ) : (<p>Not Provided</p>)}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3 d-flex flex-column justify-content-between">
            <div>
              <h5 className="mb-3">Booking Status</h5>
              <p><strong>Status:</strong> {booking.bookingStatus}</p>
            </div>
            <hr />
            {booking.bookingStatus === "PENDING" && (
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-success w-50"
                  onClick={() => handleStatusChange("APPROVED")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger w-50"
                  onClick={() => handleStatusChange("REJECTED")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingDetails;
