import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Utility for today's date formatted as yyyy-mm-dd
function todayString() {
  return new Date().toISOString().split('T')[0];
}

function CarDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Later, fetch car details by id from backend here:
  const car = {
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
    name: 'Swift LXI',
    price: 1899,
    fuel: 'Petrol',
    capacity: '5 Seats',
    mileage: '18 km/lt'
  };

  // State for booking
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');

  // For future: store unavailable date intervals, e.g. [{start: '2025-01-01', end: '2025-01-03'}, ...]
  const [unavailableRanges, setUnavailableRanges] = useState([]);

  // ===== FUTURE: Fetch unavailable (already booked) date ranges for this car =====
  useEffect(() => {
    // Example API endpoint: `/api/vehicles/${id}/booked-ranges`
    // Uncomment and use real endpoint once backend is ready:
    /*
    fetch(`/api/vehicles/${id}/booked-ranges`)
      .then(res => res.json())
      .then(ranges => setUnavailableRanges(ranges))
      .catch(err => console.error("Could not fetch booked dates", err));
    */
  }, [id]);

  // Helper to check if a date is in an unavailable range (for custom disabling, if using library)
  const isDateUnavailable = (dateStr) => {
    const date = new Date(dateStr);
    return unavailableRanges.some((range) =>
      date >= new Date(range.start) && date <= new Date(range.end)
    );
  };

  // ===== Handler for booking =====
  const handleBookNow = async (e) => {
    e.preventDefault();
    setError('');

    // Simple client validations
    if (!fromDate || !toDate) {
      setError('Please select both dates!');
      return;
    }
    if (toDate <= fromDate) {
      setError('To date must be after From date!');
      return;
    }
    if (fromDate < todayString()) {
      setError('From date cannot be in the past!');
      return;
    }

    // (Optional for now) Check if dates overlap any unavailable range
    if (
      unavailableRanges.some(
        (range) =>
          (fromDate <= range.end && toDate >= range.start)
      )
    ) {
      setError('Selected dates overlap with an existing booking!');
      return;
    }

    // READY for backend call: Make POST request to bookings API here
    /* Example:
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization if using JWT: 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        vehicleId: id,
        fromDate,
        toDate,
        // You may need customer info/user id from auth or context
      }),
    });
    if (!res.ok) {
      const errMsg = await res.text();
      setError(errMsg || 'Booking failed');
      return;
    }
    */

    // On success, route to My Bookings page
    navigate('/customer/my-bookings');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-10 mx-auto">
          <div className="card rounded-4 shadow-lg border-0" style={{ minHeight: "370px" }}>
            <div className="row g-0 align-items-center" style={{ minHeight: "320px" }}>
              {/* Car Image */}
              <div className="col-lg-5 col-md-5 text-center py-4">
                <img
                  src={car.image}
                  alt={car.name}
                  className="img-fluid rounded-3 shadow-sm w-90"
                  style={{
                    maxWidth: 280,
                    height: 155,
                    objectFit: "cover"
                  }}
                />
              </div>
              {/* Car Details & Booking Form */}
              <div className="col-lg-7 col-md-7 px-4 py-4" style={{
                minHeight: "190px", display: "flex",
                flexDirection: "column", justifyContent: "center"
              }}>
                {/* Title & Price */}
                <div className="d-flex align-items-baseline mb-3 gap-4 flex-wrap">
                  <span className="fw-bold fs-2 text-primary">{car.name}</span>
                  <span className="fw-bold fs-5" style={{ color: "#16a085" }}>
                    ₹{car.price}
                  </span>
                  <span className="text-secondary ms-0 ms-lg-2 fs-6">/day</span>
                </div>
                {/* Specs */}
                <div className="d-flex align-items-center gap-4 bg-light px-3 py-2 rounded mb-3 fw-medium text-secondary">
                  <span className="fs-5">⛽</span>
                  <span>{car.fuel}</span>
                  <span className="fs-5 ms-3">👥</span>
                  <span>{car.capacity}</span>
                  <span className="fs-5 ms-3">🛣️Mileage</span>
                  <span>{car.mileage}</span>
                </div>
                {/* Date Selection & Booking Form */}
                <form className="row row-cols-lg-auto g-3 align-items-end" onSubmit={handleBookNow} autoComplete="off">
                  <div className="col-12">
                    <label htmlFor="fromDate" className="form-label text-primary fw-semibold">From</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fromDate"
                      value={fromDate}
                      min={todayString()}
                      // Optionally: add logic to disable unavailable dates with a 3rd party picker
                      onChange={e => setFromDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="toDate" className="form-label text-primary fw-semibold">To</label>
                    <input
                      type="date"
                      className="form-control"
                      id="toDate"
                      value={toDate}
                      min={fromDate ? fromDate : todayString()}
                      onChange={e => setToDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0">
                    <button
                      type="submit"
                      className="btn fw-semibold px-4 py-2 text-white"
                      style={{
                        background: "#112266",
                        borderRadius: "0.5rem",
                        fontWeight: "600",
                        fontSize: "1rem"
                      }}
                      onMouseOver={e => e.currentTarget.style.background = "#2730a4"}
                      onMouseOut={e => e.currentTarget.style.background = "#112266"}
                    >
                      Book Now
                    </button>
                  </div>
                  {error &&
                    <div className="col-12">
                      <div className="alert alert-danger mt-2 mb-0 py-2" style={{ fontSize: "0.98rem" }}>
                        {error}
                      </div>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;
