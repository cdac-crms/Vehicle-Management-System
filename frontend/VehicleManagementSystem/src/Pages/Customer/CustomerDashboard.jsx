import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

// Updated image dimensions and links remain
const dummyCars = [
  {
    id: 1,
    name: "Swift LXI",
    img: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80",
    price: 1899,
    fuel: "Petrol",
    capacity: "5 Seats",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Hyundai i20",
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80",
    price: 2200,
    fuel: "Petrol",
    capacity: "5 Seats",
    rating: 4.4,
  },
  {
    id: 3,
    name: "Honda Amaze",
    img: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80",
    price: 2100,
    fuel: "Petrol",
    capacity: "5 Seats",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Maruti WagonR",
    img: "https://images.unsplash.com/photo-1451067305430-0c49c4c6fa63?auto=format&fit=crop&w=600&q=80",
    price: 1700,
    fuel: "Petrol",
    capacity: "5 Seats",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Tata Tiago",
    img: "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=600&q=80",
    price: 1600,
    fuel: "Petrol",
    capacity: "5 Seats",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Toyota Glanza",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
    price: 2099,
    fuel: "Petrol",
    capacity: "5 Seats",
    rating: 4.4,
  }
];

const cardStyle = {
  display: "flex",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 6px 28px rgba(17, 34, 102, 0.17)",
  width: "420px",
  minHeight: "195px",
  padding: "2rem 2rem 1.5rem 2rem",
  alignItems: "center",
  color: "#23232a",
  transition: "transform 0.14s"
};

const CustomerDashboard = () => {
  const [search, setSearch] = useState("");

  const filteredCars = dummyCars.filter(car =>
    car.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    car.fuel.toLowerCase().includes(search.trim().toLowerCase()) ||
    car.capacity.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Slice the filtered cars into rows of 3 for grid-like layout
  const rows = [];
  for (let i = 0; i < filteredCars.length; i += 3) {
    rows.push(filteredCars.slice(i, i + 3));
  }

  return (
    <div className="container py-4">
      {/* Search section */}
      <h2 className="mb-3 fw-bold text-primary" style={{ letterSpacing: ".02em" }}>
        Search car here
      </h2>
      <div className="row mb-4">
        <div className="col-md-7 d-flex">
          <input
            className="form-control"
            placeholder="Type car name, model..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary ms-2"
            type="button"
            style={{ minWidth: "108px" }}
          >
            <i className="bi bi-search me-1"></i> Search
          </button>
        </div>
      </div>

      {/* Cards shown as 3-column rows */}
      {rows.length === 0 ? (
        <div className="text-center text-muted mt-5" style={{ fontSize: "1.22rem" }}>
          No cars found.
        </div>
      ) : (
        rows.map((row, rowIdx) => (
          <div key={rowIdx} className="d-flex justify-content-between mb-4 flex-wrap">
            {row.map(car => (
              <div
                key={car.id}
                style={cardStyle}
                onMouseOver={e => (e.currentTarget.style.transform = "translateY(-5px) scale(1.04)")}
                onMouseOut={e => (e.currentTarget.style.transform = "none")}
                className="mb-3"
              >
                <img
                  src={car.img}
                  alt={car.name}
                  style={{
                    width: 110,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: "7px",
                    marginRight: "1.2rem",
                    boxShadow: "0 2px 7px rgba(17, 34, 102, 0.11)"
                  }}
                  loading="lazy"
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.17rem",
                      marginBottom: "0.5rem",
                      color: "#1744ae",
                      fontWeight: 600
                    }}
                  >
                    <span>{car.name}</span>
                    <span>
                      ₹{car.price}
                      <span style={{ fontSize: "0.97rem", color: "#1a239b" }}>/day</span>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.07rem",
                      color: "#173071",
                      gap: "7px"
                    }}
                  >
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem" }}>⛽</span>
                    <span>{car.fuel}</span>
                    <span
                      style={{
                        fontSize: "1.17rem",
                        marginRight: "0.2rem",
                        marginLeft: 18
                      }}
                    >
                      👥
                    </span>
                    <span>{car.capacity}</span>
                  </div>
                  <div className="d-flex align-items-center mt-2">
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
                  <div
                    style={{
                      marginTop: "1.2rem",
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
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
                        transition: "background 0.15s"
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = "#384ec6")}
                      onMouseOut={e => (e.currentTarget.style.background = "#112266")}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDashboard;
