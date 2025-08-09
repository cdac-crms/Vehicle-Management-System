import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const cardStyle = {
  display: "flex",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 6px 28px rgba(17,34,102,0.17)",
  minHeight: "195px",
  padding: "1.5rem",
  alignItems: "center",
  color: "#23232a",
  transition: "transform 0.14s",
  flex: 1, // Added: Allow cards to grow and shrink
  maxWidth: "400px" // Added: Maximum width constraint
};

const CustomerDashboard = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get JWT token and userId from localStorage (stored during login)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Check authentication on component mount
  useEffect(() => {
    if (!token || !userId) {
      setError("You are not logged in. Please login to continue.");
      navigate("/login");
      return;
    }
    fetchCars();
    // eslint-disable-next-line
  }, [token, userId]);

  // Function to fetch all or searched vehicles with JWT
  const fetchCars = async (searchTerm = "") => {
    if (!token || !userId) {
      setError("Authentication required. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const url = searchTerm
        ? `http://localhost:8080/vehicle?search=${encodeURIComponent(searchTerm)}`
        : `http://localhost:8080/vehicle`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCars(response.data);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError("Session expired. Please login again.");
        // Clear all auth-related localStorage items
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/login");
      } else {
        setError("Failed to fetch cars. Please try again later.");
      }
      setCars([]);
    }
    setLoading(false);
  };

  // On clicking search or on pressing Enter
  const handleSearch = () => {
    if (!token || !userId) {
      setError("Please login to search cars.");
      navigate("/login");
      return;
    }
    fetchCars(search.trim());
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Early return if not authenticated
  if (!token || !userId) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          Authentication required. Redirecting to login...
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Search */}
      <h2 className="mb-3 fw-bold text-primary" style={{ letterSpacing: ".02em" }}>
        Search car here
      </h2>
      <div className="row mb-4">
        <div className="col-md-7 d-flex">
          <input
            className="form-control"
            placeholder="Type car name, company, or fuel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button
            className="btn btn-primary ms-2"
            type="button"
            style={{ minWidth: "108px" }}
            onClick={handleSearch}
            disabled={loading}
          >
            <i className="bi bi-search me-1"></i> Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : error ? (
        <div className="text-center text-danger py-5">{error}</div>
      ) : cars.length === 0 ? (
        <div className="text-center text-muted mt-5" style={{ fontSize: "1.22rem" }}>
          No cars found.
        </div>
      ) : (
        /* UPDATED: Use Bootstrap grid system for proper 3-column layout */
        <div className="row g-4">
          {cars.map(car => (
            <div key={car.id} className="col-lg-4 col-md-6 col-sm-12">
              <div
                style={cardStyle}
                onMouseOver={e => (e.currentTarget.style.transform = "translateY(-5px) scale(1.02)")}
                onMouseOut={e => (e.currentTarget.style.transform = "none")}
              >
                <img
                  src={
                    car.imageUrl || car.image
                      ? (car.imageUrl || car.image)
                      : "https://via.placeholder.com/110x72?text=No+Image"
                  }
                  alt={car.name}
                  style={{
                    width: 110,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: "7px",
                    marginRight: "1.2rem",
                    boxShadow: "0 2px 7px rgba(17,34,102,0.11)",
                    flexShrink: 0 // Added: Prevent image from shrinking
                  }}
                  loading="lazy"
                  onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/110x72?text=No+Image"; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}> {/* Added: minWidth to prevent text overflow */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.17rem",
                      marginBottom: "0.5rem",
                      color: "#1744ae",
                      fontWeight: 600,
                      flexWrap: "wrap" // Added: Allow wrapping for smaller screens
                    }}
                  >
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {car.name}
                    </span>
                    <span style={{ whiteSpace: "nowrap" }}>
                      ₹{car.pricePerDay}
                      <span style={{ fontSize: "0.97rem", color: "#1a239b" }}>/day</span>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.07rem",
                      color: "#173071",
                      gap: "7px",
                      marginBottom: "0.5rem"
                    }}
                  >
                    <span style={{ fontSize: "1.17rem" }}>⛽</span>
                    <span>{car.fuel}</span>
                    <span style={{ fontSize: "1.17rem", marginLeft: "10px" }}>👥</span>
                    <span>{car.capacity}</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span style={{ fontWeight: 500, color: "#837202", marginRight: 4 }}>Rating</span>
                    {[1, 2, 3, 4, 5].map(i => (
                      <AiFillStar
                        key={i}
                        color={i <= Math.round(car.rating) ? "#FFD700" : "#e9e6ba"}
                        size={18}
                      />
                    ))}
                    <span style={{ color: "#837202", marginLeft: 4, fontSize: "0.97rem" }}>
                      {car.rating}
                    </span>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link
                      to={`/customer/car-details/${car.id}`}
                      style={{
                        display: "inline-block",
                        padding: "0.45rem 1.3rem",
                        background: "#112266",
                        color: "#fff",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                        transition: "background 0.15s",
                        whiteSpace: "nowrap"
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = "#384ec6")}
                      onMouseOut={e => (e.currentTarget.style.background = "#112266")}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
