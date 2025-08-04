import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ViewBookingDetails = () => {
  const { id } = useParams();
  const { state: booking } = useLocation();

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
              src={
                booking.carImage ||
                "https://via.placeholder.com/300x200?text=Car+Image"
              }
              className="card-img-top"
              alt="Car"
            />
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3">Vehicle Info</h5>
            <p>
              <strong>Company:</strong> {booking.company}
            </p>
            <p>
              <strong>Model:</strong> {booking.variant}
            </p>
            <p>
              <strong>Fuel Type:</strong> {booking.fuelType}
            </p>
            <p>
              <strong>Rent/Day:</strong> ₹{booking.rentPerDay}
            </p>
            <p>
              <strong>Reg. Number:</strong> {booking.registrationNumber}
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3">Booking Info</h5>
            <p>
              <strong>Booking ID:</strong> {id}
            </p>
            <p>
              <strong>Booked At:</strong> {booking.bookingTime}
            </p>
            <p>
              <strong>From:</strong> {booking.startDate}
            </p>
            <p>
              <strong>To:</strong> {booking.endDate}
            </p>
            <p>
              <strong>Total Fare:</strong> ₹{booking.totalAmount}
            </p>
            {/* <p>
              <strong>Payment Status:</strong>
              <span
                className={`badge ms-2 ${
                  booking.paymentStatus === "Paid" ? "bg-success" : "bg-warning"
                }`}
              >
                {booking.paymentStatus}
              </span>
            </p> */}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3">Customer Info</h5>
            <p>
              <strong>Name:</strong> {booking.customerName}
            </p>
            <p>
              <strong>Contact:</strong> {booking.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-3">Driving Licence</h5>
            <p>
              <strong>DL Number:</strong> {booking.dlNumber}
            </p>
            <div className="mt-2">
              <img
                src={
                  booking.dlImage ||
                  "https://via.placeholder.com/250x150?text=DL+Image"
                }
                alt="Driving Licence"
                className="img-fluid rounded border"
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm p-3 d-flex flex-column justify-content-between">
            <div>
              <h5 className="mb-3">Booking Status</h5>
              <p>
                <strong>Status:</strong> {booking.paymentStatus}
              </p>
              {/* <p>
                <strong>Transaction Time:</strong> {booking.transactionTime}
              </p> */}
            </div>

            <hr />
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-success w-50">Approve</button>
              <button className="btn btn-danger w-50">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingDetails;
