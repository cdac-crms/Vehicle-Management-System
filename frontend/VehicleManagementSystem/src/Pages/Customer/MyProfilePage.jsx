import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { FaIdCard, FaCalendarAlt } from "react-icons/fa";

const NAVY = "#112266";

const demoProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  address: {
    street: "1234, Park Avenue",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001"
  }
};

const demoLicense = {
  imageUrl:
    "https://media.istockphoto.com/id/691286862/vector/flat-man-driver-license-plastic-card-template-id-card-vector-illustration.jpg?s=612x612&w=0&k=20&c=c-tDqF5B4t2i_eoJXwWsUK05q8ORuLmRbeCa7weLtGc=",
  number: "MH12-2022123456",
  expiry: "2030-12-31"
};

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProfile(demoProfile);
      setLicense(demoLicense);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto position-relative"
        style={{
          maxWidth: 600,
          borderRadius: 14,
          border: "none",
          background: "#fff"
        }}
      >
        {/* Update Profile Button fixed to top-right inside card */}
        <Link
          to="/customer/update-profile"
          className="btn btn-primary fw-semibold position-absolute"
          style={{
            top: 22,
            right: 28,
            background: NAVY,
            fontSize: "1.05rem",
            border: "none",
            borderRadius: 7,
            letterSpacing: "0.02em",
            height: 41,
            minWidth: 100,
            zIndex: 2
          }}
        >
          Update Profile
        </Link>

        <div className="card-body px-4 py-4">
          <h4
            className="fw-bold text-center mb-4"
            style={{ color: NAVY, fontSize: "1.8rem", letterSpacing: "0.01em" }}
          >
            Profile Details
          </h4>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          ) : (
            <>
              {/* Profile Fields with Spacing */}
              <div className="row g-0 mb-3 flex-column">
                <div className="row align-items-center py-2">
                  <div className="col-5 text-end fw-semibold" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                    First Name:
                  </div>
                  <div className="col-7 ps-3" style={{ fontSize: "1.14rem", color: "#27314b" }}>{profile?.firstName || <em>—</em>}</div>
                </div>
                <div className="row align-items-center py-2">
                  <div className="col-5 text-end fw-semibold" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                    Last Name:
                  </div>
                  <div className="col-7 ps-3" style={{ fontSize: "1.14rem", color: "#27314b" }}>{profile?.lastName || <em>—</em>}</div>
                </div>
                <div className="row align-items-center py-2">
                  <div className="col-5 text-end fw-semibold" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                    Email:
                  </div>
                  <div className="col-7 ps-3" style={{ fontSize: "1.14rem", color: "#27314b" }}>{profile?.email || <em>—</em>}</div>
                </div>
                <div className="row align-items-center py-2">
                  <div className="col-5 text-end fw-semibold" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                    Phone:
                  </div>
                  <div className="col-7 ps-3" style={{ fontSize: "1.14rem", color: "#27314b" }}>{profile?.phone || <em>—</em>}</div>
                </div>
                <div className="row align-items-center py-2">
                  <div className="col-5 text-end fw-semibold align-self-start" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                    Address:
                  </div>
                  <div className="col-7 ps-3" style={{ fontSize: "1.14rem", color: "#27314b" }}>
                    {profile?.address
                      ? (
                        <>
                          {profile.address.street},<br />
                          {profile.address.city}, {profile.address.state}, {profile.address.zip}
                        </>
                      )
                      : <em>—</em>}
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Driving License */}
              <h5
                className="fw-bold text-center mb-3"
                style={{ color: NAVY, fontSize: "1.35rem", letterSpacing: "0.01em" }}
              >
                Driving License
              </h5>
              <div
                className="d-flex align-items-center gap-4 justify-content-start"
                style={{ minHeight: 180 }}
              >
                <img
                  src={license?.imageUrl}
                  alt="Driving License"
                  style={{
                    width: 240,
                    height: 148,
                    objectFit: "cover",
                    border: "1px solid #ccc",
                    borderRadius: 12,
                    boxShadow: "0 2px 12px rgba(30,40,78,0.08)"
                  }}
                />
                <div
                  className="d-grid"
                  style={{
                    gridTemplateRows: "repeat(2, 1fr)",
                    rowGap: "1.25rem",
                    minWidth: 220
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-6 text-end pe-3 fw-semibold" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                      <FaIdCard className="me-2" />
                      License Number:
                    </div>
                    <div className="col-6" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                      {license?.number || <em>—</em>}
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-6 text-end pe-3 fw-semibold" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                      <FaCalendarAlt className="me-2" />
                      Expiry Date:
                    </div>
                    <div className="col-6" style={{ color: "#27314b", fontSize: "1.14rem" }}>
                      {license?.expiry
                        ? new Date(license.expiry).toLocaleDateString()
                        : <em>—</em>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
