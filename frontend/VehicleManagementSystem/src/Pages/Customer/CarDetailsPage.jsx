import React, { useState } from 'react';

import Navbar from '../../components/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { useBookings } from '../../context/BookingsContext';

function CarDetailsPage() {
    const { addBooking } = useBookings();
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { id } = useParams();

    // Example car data (replace with fetch or props if needed)
    const car = {
        image: '/images/car1.png',
        name: 'Swift LXI',
        price: 1899,
        fuel: 'Petrol',
        capacity: '5 Seats',
        mileage: '18 km/lt'
    };

    const handleBookNow = () => {
        if (!fromDate || !toDate) {
            alert('Please select both dates!');
            return;
        }
        const newBooking = {
            carName: car.name,
            variant: car.fuel,
            pricePerDay: car.price,
            fromDate,
            toDate,
            bookingDate: new Date().toISOString(),
            status: 'Pending'
        };
        addBooking(newBooking);
        navigate('/customer/my-bookings');
    };

    return (
        <>
           
            <div
                className="container"
                style={{
                    display: "flex",
                    maxWidth: 900,
                    margin: "2.5rem auto",
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 4px 24px rgba(17,34,102,0.17)",
                    padding: "2.5rem",
                    gap: "2.8rem",
                    alignItems: "flex-start"
                }}
            >
                {/* Left: Car Image */}
                <div style={{
                    flexBasis: "38%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <img
                        src={car.image}
                        alt={car.name}
                        style={{
                            width: 280,
                            height: 180,
                            objectFit: "cover",
                            borderRadius: 10,
                            boxShadow: "0 6px 22px rgba(17,34,102,0.12)"
                        }}
                    />
                </div>

                {/* Right Side: Details and Booking */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Car Name & Price */}
                    <div style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 32,
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        color: "#112266"
                    }}>
                        <span>{car.name}</span>
                        <span style={{
                            color: "#16a085",
                            fontSize: "1.35rem"
                        }}>
                            ₹{car.price} <span style={{ fontSize: "1rem", color: "#233d5b" }}>/day</span>
                        </span>
                    </div>
                    {/* Specs Box */}
                    <div style={{
                        marginTop: "1.4rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "#f7f9fb",
                        padding: "0.85rem 1.5rem",
                        borderRadius: 7,
                        fontSize: "1.08rem",
                        color: "#27314b"
                    }}>
                        <span style={{ fontSize: "1.20rem", marginRight: "0.3rem" }}>⛽</span>
                        <span>{car.fuel}</span>
                        <span style={{ fontSize: "1.20rem", marginRight: "0.3rem", marginLeft: 16 }}>👥</span>
                        <span>{car.capacity}</span>
                        <span style={{ fontSize: "1.20rem", marginRight: "0.3rem", marginLeft: 16 }}>🛣️Mileage</span>
                        <span>{car.mileage}</span>
                    </div>
                    {/* Date Selection and Booking */}
                    <div style={{
                        marginTop: "2.4rem",
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 28
                    }}>
                        <div style={{ display: "flex", gap: "1.3rem" }}>
                            <label>
                                From
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={e => setFromDate(e.target.value)}
                                    style={{
                                        display: "block",
                                        marginTop: "0.45rem",
                                        padding: "0.4rem 0.7rem",
                                        borderRadius: 7,
                                        border: "1px solid #112266",
                                        background: "#f2f5f9",
                                        fontSize: "1rem",
                                        color: "#112266"
                                    }}
                                />
                            </label>
                            <label>
                                To
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={e => setToDate(e.target.value)}
                                    style={{
                                        display: "block",
                                        marginTop: "0.45rem",
                                        padding: "0.4rem 0.7rem",
                                        borderRadius: 7,
                                        border: "1px solid #112266",
                                        background: "#f2f5f9",
                                        fontSize: "1rem",
                                        color: "#112266"
                                    }}
                                />
                            </label>
                        </div>
                        <button
                            onClick={handleBookNow}
                            style={{
                                padding: "0.05rem 1.8rem",fontSize: "0.95rem",         // slightly smaller text
                                letterSpacing: "-0.2px",
                                height: 45,
                                background: "#112266",
                                color: "#fff",
                                border: "none",
                                borderRadius: 7,
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "background 0.2s",
                                boxSizing: "border-box"
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "#2730a4"}
                            onMouseOut={e => e.currentTarget.style.background = "#112266"}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
=======
import { useNavigate, useParams } from 'react-router-dom';

function CarDetailsPage() {
  // If, in future, you want to fetch by ID, useParams is ready
  const { id } = useParams();
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // HARDCODED car data for demo
  const car = {
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
    name: 'Swift LXI',
    price: 1899,
    fuel: 'Petrol',
    capacity: '5 Seats',
    mileage: '18 km/lt'
  };

  // On "Book Now", just navigate (pass booking/selection via route state if you want to, for future use)
  const handleBookNow = () => {
    if (!fromDate || !toDate) {
      alert('Please select both dates!');
      return;
    }
    // (In real app: POST booking to backend here)
    // Optionally: pass details in state (see below)
    navigate('/customer/my-bookings', {
      state: {
        booking: {
          carName: car.name,
          variant: car.fuel,
          pricePerDay: car.price,
          fromDate,
          toDate,
          bookingDate: new Date().toISOString(),
          status: 'Pending'
        }
      }
    });
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "2.5rem auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(17,34,102,0.17)",
        padding: "2.5rem",
        gap: "2.8rem",
        alignItems: "flex-start"
      }}
    >
      {/* Left: Car Image */}
      <div style={{
        flexBasis: "38%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img
          src={car.image}
          alt={car.name}
          style={{
            width: 280,
            height: 180,
            objectFit: "cover",
            borderRadius: 10,
            boxShadow: "0 6px 22px rgba(17,34,102,0.12)"
          }}
        />
      </div>

      {/* Right Side: Details and Booking */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Car Name & Price */}
        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: 32,
          fontSize: "1.7rem",
          fontWeight: "bold",
          color: "#112266"
        }}>
          <span>{car.name}</span>
          <span style={{
            color: "#16a085",
            fontSize: "1.35rem"
          }}>
            ₹{car.price} <span style={{ fontSize: "1rem", color: "#233d5b" }}>/day</span>
          </span>
        </div>
        {/* Specs Box */}
        <div style={{
          marginTop: "1.4rem",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#f7f9fb",
          padding: "0.85rem 1.5rem",
          borderRadius: 7,
          fontSize: "1.08rem",
          color: "#27314b"
        }}>
          <span style={{ fontSize: "1.20rem", marginRight: "0.3rem" }}>⛽</span>
          <span>{car.fuel}</span>
          <span style={{ fontSize: "1.20rem", marginRight: "0.3rem", marginLeft: 16 }}>👥</span>
          <span>{car.capacity}</span>
          <span style={{ fontSize: "1.20rem", marginRight: "0.3rem", marginLeft: 16 }}>🛣️Mileage</span>
          <span>{car.mileage}</span>
        </div>
        {/* Date Selection and Booking */}
        <div style={{
          marginTop: "2.4rem",
          display: "flex",
          alignItems: "flex-end",
          gap: 28
        }}>
          <div style={{ display: "flex", gap: "1.3rem" }}>
            <label>
              From
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                style={{
                  display: "block",
                  marginTop: "0.45rem",
                  padding: "0.4rem 0.7rem",
                  borderRadius: 7,
                  border: "1px solid #112266",
                  background: "#f2f5f9",
                  fontSize: "1rem",
                  color: "#112266"
                }}
              />
            </label>
            <label>
              To
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                style={{
                  display: "block",
                  marginTop: "0.45rem",
                  padding: "0.4rem 0.7rem",
                  borderRadius: 7,
                  border: "1px solid #112266",
                  background: "#f2f5f9",
                  fontSize: "1rem",
                  color: "#112266"
                }}
              />
            </label>
          </div>
          <button
            onClick={handleBookNow}
            style={{
              padding: "0.05rem 1.8rem",
              fontSize: "0.95rem",
              letterSpacing: "-0.2px",
              height: 45,
              background: "#112266",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
              boxSizing: "border-box"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#2730a4"}
            onMouseOut={e => e.currentTarget.style.background = "#112266"}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

}

export default CarDetailsPage;
