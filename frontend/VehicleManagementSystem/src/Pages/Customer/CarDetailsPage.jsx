import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Helper for today's date string
function todayString() {
  return new Date().toISOString().split("T")[0];
}

function CarDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Car details
  const [car, setCar] = useState(null);
  const [loadingCar, setLoadingCar] = useState(true);

  // Booking state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  // Unavailable date ranges from backend
  const [unavailableRanges, setUnavailableRanges] = useState([]);
  const [overlappingRanges, setOverlappingRanges] = useState([]);

  // Get JWT token and userId from localStorage (stored during login)
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  // Check if user is authenticated
  if (!token || !currentUserId) {
    navigate("/login");
    return null;
  }

  // Helper: get axios config with Authorization header
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch car details and unavailable booking ranges for this car
  useEffect(() => {
    if (!token || !currentUserId) {
      navigate("/login");
      return;
    }
    setLoadingCar(true);
    setError("");
    
    // Updated route: /vehicle/{id} instead of /vehicles/{id}
    axios
      .get(`http://localhost:8080/vehicle/${id}`, axiosConfig)
      .then((res) => setCar(res.data))
      .catch((err) => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("role");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          navigate("/login");
        } else {
          setError("Failed to load car details.");
        }
      })
      .finally(() => setLoadingCar(false));

    axios
      .get(`http://localhost:8080/customer/booking/vehicle/${id}/ranges`, axiosConfig)
      .then((res) => setUnavailableRanges(res.data))
      .catch(() => setUnavailableRanges([]));
    // eslint-disable-next-line
  }, [id, token, currentUserId]);

  // Book Now submission
  const handleBookNow = async (e) => {
    e.preventDefault();
    setError("");

    if (!token || !currentUserId) {
      setError("You are not logged in.");
      navigate("/login");
      return;
    }
    if (!startDate || !endDate) {
      setError("Please select both dates!");
      setOverlappingRanges([]);
      return;
    }
    if (endDate <= startDate) {
      setError("End date must be after Start date!");
      setOverlappingRanges([]);
      return;
    }
    if (startDate < todayString()) {
      setError("Start date cannot be in the past!");
      setOverlappingRanges([]);
      return;
    }
    // Validate against unavailable dates from backend
    const overlaps = unavailableRanges.filter(
      (range) => startDate <= range.end && endDate >= range.start
    );
    if (overlaps.length > 0) {
      setOverlappingRanges(overlaps);
      setError("The Car is not available on selected dates. See conflicts below!");
      return;
    } else {
      setOverlappingRanges([]);
    }

    try {
      const bookingReq = {
        userId: currentUserId,
        vehicleId: id,
        startDate,
        endDate,
      };
      await axios.post(`http://localhost:8080/customer/booking`, bookingReq, axiosConfig);
      navigate("/customer/my-bookings");
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/login");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Booking failed. Please try again later.");
      }
      setOverlappingRanges([]);
    }
  };

  // Loading/error handling
  if (loadingCar) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }
  if (error && !car) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }
  if (!car) {
    return null;
  }

  // Updated image property access based on VehicleDetailsDto structure
  const carImage =
    car.imageUrl || car.image || "https://via.placeholder.com/280x155?text=No+Image";

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-10 mx-auto">
          <div className="card rounded-4 shadow-lg border-0" style={{ minHeight: "370px" }}>
            <div className="row g-0 align-items-center" style={{ minHeight: "320px" }}>
              {/* Car Image */}
              <div className="col-lg-5 col-md-5 text-center py-4">
                <img
                  src={carImage}
                  alt={car.name}
                  className="img-fluid rounded-3 shadow-sm w-90"
                  style={{
                    maxWidth: 280,
                    height: 155,
                    objectFit: "cover",
                  }}
                  loading="lazy"
                  onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/280x155?text=No+Image"; }}
                />
              </div>
              {/* Car Details & Booking Form */}
              <div
                className="col-lg-7 col-md-7 px-4 py-4"
                style={{
                  minHeight: "190px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Title & Price */}
                <div className="d-flex align-items-baseline mb-3 gap-4 flex-wrap">
                  <span className="fw-bold fs-2 text-primary">{car.name}</span>
                  <span className="fw-bold fs-5" style={{ color: "#16a085" }}>
                    ₹{car.pricePerDay}
                  </span>
                  <span className="text-secondary ms-0 ms-lg-2 fs-6">/day</span>
                </div>
                {/* Specs */}
                <div className="d-flex align-items-center gap-4 bg-light px-3 py-2 rounded mb-3 fw-medium text-secondary">
                  <span className="fs-5">⛽</span>
                  <span>{car.fuel}</span>
                  <span className="fs-5 ms-3">👥</span>
                  <span>{car.capacity}</span>
                  <span className="fs-5 ms-3">🛣️ Mileage</span>
                  <span>{car.mileage}</span>
                </div>
                {/* Date Selection & Booking Form */}
                <form
                  className="row row-cols-lg-auto g-3 align-items-end"
                  onSubmit={handleBookNow}
                  autoComplete="off"
                >
                  <div className="col-12">
                    <label htmlFor="startDate" className="form-label text-primary fw-semibold">
                      Start
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={startDate}
                      min={todayString()}
                      onChange={e => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="endDate" className="form-label text-primary fw-semibold">
                      End
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={endDate}
                      min={startDate ? startDate : todayString()}
                      onChange={e => setEndDate(e.target.value)}
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
                        fontSize: "1rem",
                      }}
                      onMouseOver={e =>
                        (e.currentTarget.style.background = "#2730a4")
                      }
                      onMouseOut={e =>
                        (e.currentTarget.style.background = "#112266")
                      }
                    >
                      Book Now
                    </button>
                  </div>
                  {error && (
                    <div className="col-12">
                      <div className="alert alert-danger mt-2 mb-0 py-2" style={{ fontSize: "0.98rem" }}>
                        {error}
                      </div>
                      {overlappingRanges.length > 0 && (
                        <div className="mt-2">
                          <strong>Conflicting Date Ranges:</strong>
                          <ul className="mb-0">
                            {overlappingRanges.map((range, idx) => (
                              <li key={idx}>
                                {range.start} to {range.end}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </form>

                {/* Show already-unavailable booking date ranges */}
                {unavailableRanges.length > 0 && (
                  <div className="alert alert-warning mt-4" style={{ fontSize: "1rem" }}>
                    <strong>Already Booked Dates:</strong>
                    <ul className="mb-0">
                      {unavailableRanges.map((range, idx) => (
                        <li key={idx}>
                          {range.start} to {range.end}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;
