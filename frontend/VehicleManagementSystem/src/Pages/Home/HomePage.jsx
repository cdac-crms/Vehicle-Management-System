import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {

  return (
    // <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
    //   <Carousel fade controls={false} indicators={false} interval={3000} style={{ height: "100vh" }}>
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="/images/car1.jpg"
    //         alt="Luxury Cars"
    //         style={{ objectFit: "cover", height: "100vh" }}
    //       />
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="/images/car2.jpg"
    //         alt="Sports Cars"
    //         style={{ objectFit: "cover", height: "100vh" }}
    //       />
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="/images/car3.jpg"
    //         alt="Family Cars"
    //         style={{ objectFit: "cover", height: "100vh" }}
    //       />
    //     </Carousel.Item>
    //   </Carousel>

    //   <div
    //     className="position-absolute top-50 start-50 translate-middle text-center text-white"
    //     style={{ zIndex: 2 }}
    //   >
    //     <h1 className="display-3 fw-bold">Welcome to Vehicle Rental</h1>
    //     <p className="lead">Rent the best vehicles at the most affordable prices</p>
    //       </div>

    //   <div
    //     className="position-absolute top-0 start-0 w-100 h-100"
    //     style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }}
    //   ></div>
    // </div>
     <div
          style={{
            background: "#fff",
            minHeight: "100vh",
            color: "#112266",
            fontFamily: "Arial, Helvetica, sans-serif"
          }}
        >
         
         
    
          {/* Main Welcome Text */}
          <section className="hero-section">
            <div>
              <h1 style={{
                color: "#112266",
                textAlign: "center",
                margin: "2.5rem 0 2rem 0",
                fontSize: "2.7rem",
                letterSpacing: "1px"
              }}>
                <span>Book a car now</span>
                <br />
                <span>Take amazing ride.</span>
              </h1>
            </div>
          </section>
    
          {/* Featured Offer Section */}
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "2rem auto",
                maxWidth: "1100px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "18px",
                padding: "2.5rem"
              }}
            >
              <div>
                <h2 style={{
                  color: "#112266",
                  fontSize: "2.7rem"
                }}>
                  Book new cars starting at <br />
                  <span style={{ color: "#1744ae", fontWeight: "bold" }}>₹1499/day</span>
                </h2>
              </div>
              <div>
                <img
                  src="/images/car1.png"
                  alt="Car 1"
                  style={{
                    width: 400,
                    height: "auto",
                    background: "none",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    boxShadow: "none"
                  }}
                />
              </div>
            </div>
          </section>
    
          {/* Search Bar Section */}
          <section>
            <div style={{
              margin: "2.5rem auto",
              maxWidth: "580px",
              textAlign: "center"
            }}>
              <label
                htmlFor="car-search"
                style={{
                  color: "#112266",
                  fontWeight: "bold",
                  fontSize: "1.1rem"
                }}>
                Search car here
              </label>
              <div style={{
                display: "flex",
                marginTop: "1rem",
                justifyContent: "center"
              }}>
                <input
                  id="car-search"
                  type="text"
                  placeholder="Enter car or model name"
                  style={{
                    padding: "0.7rem",
                    fontSize: "1.05rem",
                    borderRadius: "8px 0 0 8px",
                    border: "1px solid #112266",
                    outline: "none",
                    width: "260px",
                    background: "#181d2b",
                    color: "#fff"
                  }}
                />
                <button
                  style={{
                    padding: "0.7rem 2rem",
                    borderRadius: "0 8px 8px 0",
                    border: "none",
                    background: "#133184",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "#1744ae"}
                  onMouseOut={e => e.currentTarget.style.background = "#133184"}
                >
                  Search
                </button>
              </div>
            </div>
          </section>
    
          {/* Car Info Boxes */}
          <section style={{ marginTop: "5rem" }}>
            <div style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              margin: "2.5rem 0"
            }}>
              {/* Car Card 1 */}
              <div style={{
                display: "flex",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 6px 28px rgba(17, 34, 102, 0.30)",
                width: "420px",
                minHeight: "180px",
                padding: "2rem 2rem 1.5rem 2rem",
                alignItems: "center",
                color: "#23232a",
                transition: "transform 0.14s"
              }}
                onMouseOver={e =>
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.04)"
                }
                onMouseOut={e =>
                  e.currentTarget.style.transform = "none"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=200&q=80"
                  alt="Hatchback Car"
                  style={{
                    width: 82,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: "7px",
                    marginRight: "1.2rem",
                    boxShadow: "0 2px 7px rgba(17, 34, 102, 0.11)"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.17rem",
                    marginBottom: "0.5rem",
                    color: "#1744ae",
                    fontWeight: 600
                  }}>
                    <span>Swift LXI</span>
                    <span>
                      ₹1899 <span style={{
                        fontSize: "0.97rem",
                        color: "#1a239b"
                      }}>/day</span>
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.07rem",
                    color: "#173071",
                    gap: "7px"
                  }}>
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem" }}>⛽</span>
                    <span>Petrol</span>
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem", marginLeft: 18 }}>👥</span>
                    <span>5 Seats</span>
                  </div>
                  <div style={{
                    marginTop: "1.2rem",
                    display: "flex",
                    justifyContent: "flex-end"
                  }}>
                    {/* <Link
                      to="/car-details/1"
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
                      onMouseOver={e => e.currentTarget.style.background = "#384ec6"}
                      onMouseOut={e => e.currentTarget.style.background = "#112266"}
                    >
                      View Details
                    </Link> */}
                  </div>
                </div>
              </div>
              {/* Car Card 2 */}
              <div style={{
                display: "flex",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 6px 28px rgba(17, 34, 102, 0.30)",
                width: "420px",
                minHeight: "180px",
                padding: "2rem 2rem 1.5rem 2rem",
                alignItems: "center",
                color: "#23232a",
                transition: "transform 0.14s"
              }}
                onMouseOver={e =>
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.04)"
                }
                onMouseOut={e =>
                  e.currentTarget.style.transform = "none"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=200&q=80"
                  alt="Hatchback Car"
                  style={{
                    width: 82,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: "7px",
                    marginRight: "1.2rem",
                    boxShadow: "0 2px 7px rgba(17, 34, 102, 0.11)"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.17rem",
                    marginBottom: "0.5rem",
                    color: "#1744ae",
                    fontWeight: 600
                  }}>
                    <span>Swift LXI</span>
                    <span>
                      ₹1899 <span style={{
                        fontSize: "0.97rem",
                        color: "#1a239b"
                      }}>/day</span>
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.07rem",
                    color: "#173071",
                    gap: "7px"
                  }}>
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem" }}>⛽</span>
                    <span>Petrol</span>
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem", marginLeft: 18 }}>👥</span>
                    <span>5 Seats</span>
                  </div>
                  <div style={{
                    marginTop: "1.2rem",
                    display: "flex",
                    justifyContent: "flex-end"
                  }}>
                    {/* <Link
                      to="/car-details/2"
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
                      onMouseOver={e => e.currentTarget.style.background = "#384ec6"}
                      onMouseOut={e => e.currentTarget.style.background = "#112266"}
                    >
                      View Details
                    </Link> */}
                  </div>
                </div>
              </div>
              {/* Car Card 3 */}
              <div style={{
                display: "flex",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 6px 28px rgba(17, 34, 102, 0.30)",
                width: "420px",
                minHeight: "180px",
                padding: "2rem 2rem 1.5rem 2rem",
                alignItems: "center",
                color: "#23232a",
                transition: "transform 0.14s"
              }}
                onMouseOver={e =>
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.04)"
                }
                onMouseOut={e =>
                  e.currentTarget.style.transform = "none"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=200&q=80"
                  alt="Sedan Car"
                  style={{
                    width: 82,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: "7px",
                    marginRight: "1.2rem",
                    boxShadow: "0 2px 7px rgba(17, 34, 102, 0.11)"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.17rem",
                    marginBottom: "0.5rem",
                    color: "#1744ae",
                    fontWeight: 600
                  }}>
                    <span>Honda City VX</span>
                    <span>
                      ₹2499 <span style={{
                        fontSize: "0.97rem",
                        color: "#1a239b"
                      }}>/day</span>
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.07rem",
                    color: "#173071",
                    gap: "7px"
                  }}>
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem" }}>⛽</span>
                    <span>Petrol</span>
                    <span style={{ fontSize: "1.17rem", marginRight: "0.2rem", marginLeft: 18 }}>👥</span>
                    <span>5 Seats</span>
                  </div>
                  <div style={{
                    marginTop: "1.2rem",
                    display: "flex",
                    justifyContent: "flex-end"
                  }}>
                    {/* <Link
                      to="/car-details/3"
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
                      onMouseOver={e => e.currentTarget.style.background = "#384ec6"}
                      onMouseOut={e => e.currentTarget.style.background = "#112266"}
                    >
                      View Details
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Footer Section */}
          <footer
            style={{
              background: "#0b1746",
              color: "#fff",
              textAlign: "center",
              padding: "1.7rem 0 1rem 0",
              marginTop: "15rem"
            }}
          >
            <div style={{
              fontSize: "1rem",
              letterSpacing: "0.7px",
              lineHeight: 1.6
            }}>
              <div>
                <strong>Contact Us:</strong> +91-9001234567 | info@carrentalsystem.com
              </div>
              <div>
                <strong>Address:</strong> 123 Main Road, Pune, Maharashtra 411001
              </div>
            </div>
          </footer>
        </div>
  );
};

export default HomePage;
