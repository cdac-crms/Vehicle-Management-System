import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { getAllVehicles } from "../../services/VehicleService";
import { getReviewsByVehicleId } from "../../services/ReviewService";
import Footer from "../../Components/Footer";
import SummaryData from "../Admin/SummaryData";

const SimpleModal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 1050,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow"
        style={{
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          padding: "1.5rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">{title}</h5>
          <button
            onClick={onClose}
            className="btn btn-close"
            aria-label="Close modal"
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

    const { token, role } = useSelector((state) => state.auth);


  const isLoggedIn = !!token;
  const isAdmin = role === "ADMIN";
  const isCustomer = role === "CUSTOMER";

  // vehicles
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [error, setError] = useState(null);

  // reviews per vehicle (keyed by vehicle ID)
  const [reviewsByVehicle, setReviewsByVehicle] = useState({});
  const [loadingReviews, setLoadingReviews] = useState({});
  const [errorReviews, setErrorReviews] = useState({});

  // modal for guest booking prompt
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // modal for vehicle details + reviews
  const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);
  const [modalVehicle, setModalVehicle] = useState(null);

  // Fetch all vehicles on load (if not admin)
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoadingVehicles(true);
      try {
        const data = await getAllVehicles();
        setVehicles(data || []);
      } catch {
        setError("Failed to load vehicles");
      } finally {
        setLoadingVehicles(false);
      }
    };

    if (!isAdmin) fetchVehicles();
  }, [isAdmin]);

  // Fetch reviews for each vehicle when vehicles load
  useEffect(() => {
    vehicles.forEach(vehicle => {
      if (!reviewsByVehicle[vehicle.id]) {
        fetchReviewsForVehicle(vehicle.id);
      }
    });
  }, [vehicles]);

  const fetchReviewsForVehicle = async (vehicleId) => {
    setLoadingReviews(prev => ({ ...prev, [vehicleId]: true }));
    setErrorReviews(prev => ({ ...prev, [vehicleId]: null }));

    try {
      const reviews = await getReviewsByVehicleId(vehicleId);
      setReviewsByVehicle(prev => ({ ...prev, [vehicleId]: reviews }));
    } catch {
      setErrorReviews(prev => ({ ...prev, [vehicleId]: "Failed to load reviews" }));
    } finally {
      setLoadingReviews(prev => ({ ...prev, [vehicleId]: false }));
    }
  };

  const handleBookClick = (vehicle) => {
    if (!isLoggedIn) {
      setSelectedVehicle(vehicle);
      setShowLoginModal(true);
      return;
    }
    if (isCustomer) {
      navigate(`/customer/car-details/${vehicle.id}`);
      return;
    }
    if (isAdmin) {
      navigate("/admin/vehicles");
      return;
    }
  };

  const handleViewClick = (vehicle) => {
    if (isAdmin) {
      window.open(`/admin/vehicles/${vehicle.id}`, "_blank");
    } else {
      setModalVehicle(vehicle);
      if (!reviewsByVehicle[vehicle.id]) {
        fetchReviewsForVehicle(vehicle.id);
      }
      setShowVehicleDetailsModal(true);
    }
  };

  const handleConfirmLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleBrowseOther = () => {
    setShowLoginModal(false);
    setSelectedVehicle(null);
  };

  const handleCloseVehicleDetailsModal = () => {
    setShowVehicleDetailsModal(false);
    setModalVehicle(null);
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (  
    <div style={{ background: "#fff", color: "#102649", fontFamily: "Arial, Helvetica, sans-serif" }}>

      {/* Hero Section */}
      <section className="position-relative" style={{ height: "100vh", overflow: "hidden" }}>
        <Carousel fade controls={false} indicators={false} interval={3000} style={{ height: "100vh" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/car1.jpg"
              alt="Luxury Cars"
              style={{ objectFit: "cover", height: "100vh" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/car2.jpg"
              alt="Sports Cars"
              style={{ objectFit: "cover", height: "100vh" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/car3.jpg"
              alt="Family Cars"
              style={{ objectFit: "cover", height: "100vh" }}
            />
          </Carousel.Item>
        </Carousel>

        {/* Overlay removed here to avoid hiding carousel */}

 <div
  className="position-absolute start-50 translate-middle text-center"
  style={{
    color: '#fff',   // white color
    top: '40%',
    zIndex: 2,
    maxWidth: 600,
    padding: "1rem",
    borderRadius: "12px",
    transform: "translate(-50%, -60%)",
    fontWeight: "bold",  // bold text
  }}
>
  <h1 className="mb-3" style={{ letterSpacing: "1.5px", fontSize: "3rem" }}>
    Book a car now<br />
    Take an amazing ride.
  </h1>

  <h2 className="mb-4" style={{ fontSize: "1.1rem" }}>
    Explore the city, enjoy your journey, and drive with comfort and style.
  </h2>

  <div className="d-flex justify-content-center">
    {!isAdmin && (
  <button
    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
    className="btn px-4 fw-bold"
    style={{
      backgroundColor: '#fff',
      color: '#102649',
      borderColor: '#102649',
    }}
  >
    Browse Vehicles
  </button>
)}

  </div>
</div>



      </section>

      {/* Main Content */}
      <main className="container my-5">
        {isAdmin ? (
          <section className="mb-5">
              <SummaryData/>
          </section>
        ) : (
          <section>
            <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className=" fw-bold mx-auto">Available Vehicles</h3>
             
            </div>

            {loadingVehicles ? (
              <div className="text-center text-secondary">Loading vehicles...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : vehicles.length === 0 ? (
              <div className="alert alert-info">No vehicles available right now.</div>
            ) : (
              <div className="row g-4 mx-5">
                {vehicles.map(v => {
                  const reviews = reviewsByVehicle[v.id];
                  const avgRating = getAverageRating(reviews);
                  const loadingReview = loadingReviews[v.id];
                  const errorReview = errorReviews[v.id];

                  return (
                    <div className="col-sm-6 col-md-4 col-lg-3 mx-2" key={v.id}>
                      <div className="card h-100 shadow-sm p-3 mb-4 rounded mx-auto">
                        <img
                          src={v.image || "/images/car_placeholder.png"}
                          className="card-img-top"
                          alt={v.variantName || v.name}
                          style={{ height: 160, objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title" style={{ fontSize: "1rem", color: "#102649" }}>
                            {v.variantName || v.name}
                          </h5>
                          <p className="mb-1 text-muted" style={{ fontSize: 13 }}>{v.companyName}</p>
                          <p className="mb-2" style={{ fontSize: 14, color: "#102649" }}>
                            ₹{v.pricePerDay}/day · {v.fuelType}
                          </p>

                          <div className="mb-2" style={{ fontSize: 13, color: "#666" }}>
                            {loadingReview ? (
                              <small>Loading reviews...</small>
                            ) : errorReview ? (
                              <small className="text-danger">{errorReview}</small>
                            ) : reviews && reviews.length > 0 ? (
                              <small>⭐ {avgRating} ({reviews.length} review{reviews.length > 1 ? "s" : ""})</small>
                            ) : (
                              <small>No reviews yet</small>
                            )}
                          </div>

                          <div className="mt-auto d-flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleBookClick(v)}
                              style={{ backgroundColor: "#102649", borderColor: "#102649" }}
                            >
                              Book Now
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleViewClick(v)}
                              style={{ color: "#102649", borderColor: "#102649" }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Vehicle Details Modal */}
      <SimpleModal
        show={showVehicleDetailsModal}
        onClose={handleCloseVehicleDetailsModal}
        title="Vehicle Details"
      >
        {modalVehicle ? (
          <>
            <div className="d-flex gap-3 mb-3">
              <img
                src={modalVehicle.image || "/images/car_placeholder.png"}
                alt={modalVehicle.variantName || modalVehicle.name}
                style={{ width: 200, height: 130, objectFit: "cover", borderRadius: 6 }}
              />
              <div>
                <h4><strong>Variant:</strong> {modalVehicle.variantName || modalVehicle.name}</h4>
                <p><strong>Company:</strong> {modalVehicle.companyName}</p>
                <p><strong>Availability Status:</strong> {modalVehicle.availabilityStatus}</p>
                <p><strong>Color:</strong> {modalVehicle.color}</p>
                <p><strong>Mileage:</strong> {modalVehicle.mileage}</p>
                <p><strong>Registration Number:</strong> {modalVehicle.registrationNumber}</p>
                <p><strong>Price per Day:</strong> ₹{modalVehicle.pricePerDay}/day</p>
              </div>
            </div>

            <hr />

            <h6>Reviews</h6>
            {loadingReviews[modalVehicle.id] ? (
              <p>Loading reviews...</p>
            ) : errorReviews[modalVehicle.id] ? (
              <p className="text-danger">{errorReviews[modalVehicle.id]}</p>
            ) : (
              <>
                {reviewsByVehicle[modalVehicle.id] && reviewsByVehicle[modalVehicle.id].length > 0 ? (
                  reviewsByVehicle[modalVehicle.id].map((review) => (
                    <div
                      key={review.id}
                      className="bg-light border rounded p-2 mb-2"
                    >
                      <strong>{review.customerName}</strong> <span>⭐ {review.rating}</span>
                      <p className="mb-0">{review.message}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </>
            )}
          </>
        ) : (
          <p>No vehicle selected.</p>
        )}
      </SimpleModal>

      {/* Login Prompt Modal */}
      <SimpleModal
        show={showLoginModal}
        onClose={handleBrowseOther}
        title="Login Required"
      >
        <p>You need to log in to book a vehicle.</p>
        <div className="d-flex justify-content-end gap-3 mt-3">
          <button
            onClick={handleBrowseOther}
            className="btn btn-secondary"
          >
            Not Now
          </button>
          <button
            onClick={handleConfirmLogin}
            className="btn"
            style={{ backgroundColor: "#102649", color: "#fff" }}
          >
            Login
          </button>
        </div>
      </SimpleModal>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default HomePage;


