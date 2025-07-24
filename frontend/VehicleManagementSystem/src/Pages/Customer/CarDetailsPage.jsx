import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CarDetailsPage() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { id } = useParams();

  // Hardcoded car data - ready for backend fetch later
  const car = {
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
    name: 'Swift LXI',
    price: 1899,
    fuel: 'Petrol',
    capacity: '5 Seats',
    mileage: '18 km/lt'
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      alert('Please select both dates!');
      return;
    }
    navigate('/customer/my-bookings');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {/* WIDER CARD: col-lg-9 col-md-10; mx-auto centers it */}
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
              <div className="col-lg-7 col-md-7 px-4 py-4" style={{minHeight: "190px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                {/* Title & Price */}
                <div className="d-flex align-items-baseline mb-3 gap-4 flex-wrap">
                  <span className="fw-bold fs-2 text-primary">{car.name}</span>
                  <span className="fw-bold fs-5" style={{ color: "#16a085" }}>
                    ₹{car.price}
                  </span>
                  <span className="text-secondary ms-0 ms-lg-2 fs-6">/day</span>
                </div>
                {/* Specs box */}
                <div className="d-flex align-items-center gap-4 bg-light px-3 py-2 rounded mb-3 fw-medium text-secondary">
                  <span className="fs-5">⛽</span>
                  <span>{car.fuel}</span>
                  <span className="fs-5 ms-3">👥</span>
                  <span>{car.capacity}</span>
                  <span className="fs-5 ms-3">🛣️Mileage</span>
                  <span>{car.mileage}</span>
                </div>
                {/* Date Selection & Book Form */}
                <form className="row row-cols-lg-auto g-3 align-items-end" onSubmit={handleBookNow} autoComplete="off">
                  <div className="col-12">
                    <label htmlFor="fromDate" className="form-label text-primary fw-semibold">From</label>
                    <input
                      type="date"
                      className="form-control form-control"
                      id="fromDate"
                      value={fromDate}
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
                      onChange={e => setToDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0">
                    <button type="submit" className="btn fw-semibold px-4 py-2 text-white"
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
