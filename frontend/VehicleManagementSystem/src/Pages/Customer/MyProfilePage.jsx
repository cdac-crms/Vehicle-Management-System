import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { FaIdCard, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const NAVY = "#112266";

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [license, setLicense] = useState(undefined); // NOTE: undefined means "loading", null means "no data"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get JWT token and userId from localStorage (stored during login)
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  // Helper function to clear auth data and redirect
  const clearAuthAndRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError("");

      // Check authentication first
      if (!token || !currentUserId) {
        setError("Authentication required. Please login to view your profile.");
        clearAuthAndRedirect();
        return;
      }

      const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const [profileRes, licenseResult] = await Promise.all([
          axios.get(
            `http://localhost:8080/users/myprofile/${currentUserId}`,
            axiosConfig
          ),
          // Gracefully handle 404 for license (means no license uploaded)
          axios.get(
            `http://localhost:8080/customer/drivingLicense/user/${currentUserId}`,
            axiosConfig
          ).then(
            res => res,
            err => {
              if (err.response && err.response.status === 404) return { data: null };
              throw err;
            }
          )
        ]);
        setProfile(profileRes.data);
        setLicense(licenseResult.data); // May be null if 404
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError("Session expired. Please login again.");
          clearAuthAndRedirect();
        } else {
          setError("Failed to load profile data. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token, currentUserId]);

  // Early return if not authenticated
  if (!token || !currentUserId) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: 600, borderRadius: 14 }}>
          <div className="card-body p-4 text-center">
            <Alert variant="warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Authentication required. Redirecting to login...
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto position-relative"
        style={{
          maxWidth: 600,
          borderRadius: 14,
          border: "none",
          background: "#fff",
        }}
      >
        <Link
          to={`/customer/update-profile`}
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
            zIndex: 2,
          }}
        >
          Update Profile
        </Link>

        <div className="card-body px-4 py-4">
          <h4
            className="fw-bold text-center mb-4"
            style={{ color: NAVY, fontSize: "1.8rem", letterSpacing: "0.01em" }}
          >
            <i className="bi bi-person-circle me-2"></i>
            Profile Details
          </h4>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="primary" />
              <div className="ms-3 align-self-center">Loading profile...</div>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </Alert>
          ) : (
            <>
              {/* Profile Fields */}
              <div className="row g-0 mb-3 flex-column">
                <div className="row align-items-center py-2">
                  <div
                    className="col-5 text-end fw-semibold"
                    style={{ color: "#27314b", fontSize: "1.14rem" }}
                  >
                    First Name:
                  </div>
                  <div
                    className="col-7 ps-3"
                    style={{ fontSize: "1.14rem", color: "#27314b" }}
                  >
                    {profile?.firstName || <em>—</em>}
                  </div>
                </div>
                <div className="row align-items-center py-2">
                  <div
                    className="col-5 text-end fw-semibold"
                    style={{ color: "#27314b", fontSize: "1.14rem" }}
                  >
                    Last Name:
                  </div>
                  <div
                    className="col-7 ps-3"
                    style={{ fontSize: "1.14rem", color: "#27314b" }}
                  >
                    {profile?.lastName || <em>—</em>}
                  </div>
                </div>
                <div className="row align-items-center py-2">
                  <div
                    className="col-5 text-end fw-semibold"
                    style={{ color: "#27314b", fontSize: "1.14rem" }}
                  >
                    Email:
                  </div>
                  <div
                    className="col-7 ps-3"
                    style={{ fontSize: "1.14rem", color: "#27314b" }}
                  >
                    {profile?.email || <em>—</em>}
                  </div>
                </div>
                <div className="row align-items-center py-2">
                  <div
                    className="col-5 text-end fw-semibold"
                    style={{ color: "#27314b", fontSize: "1.14rem" }}
                  >
                    Phone:
                  </div>
                  <div
                    className="col-7 ps-3"
                    style={{ fontSize: "1.14rem", color: "#27314b" }}
                  >
                    {profile?.contactNo || <em>—</em>}
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Driving License */}
              <h5
                className="fw-bold text-center mb-3"
                style={{
                  color: NAVY,
                  fontSize: "1.35rem",
                  letterSpacing: "0.01em"
                }}
              >
                <i className="bi bi-card-text me-2"></i>
                Driving License
              </h5>
              {license === undefined ? (
                <div className="text-center py-3">
                  <Spinner animation="border" size="sm" variant="primary" />
                  <div className="mt-2">Loading license...</div>
                </div>
              ) : license === null ? (
                <div className="text-center text-muted py-4" style={{ fontStyle: 'italic', fontSize: "1.05rem" }}>
                  <i className="bi bi-card-list" style={{ fontSize: "2rem", color: "#6c757d" }}></i>
                  <div className="mt-2">No license uploaded yet.</div>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center gap-4 justify-content-start"
                  style={{ minHeight: 180 }}
                >
                  <img
                    src={
                      license?.licenseImage ||
                      "https://media.istockphoto.com/id/691286862/vector/flat-man-driver-license-plastic-card-template-id-card-vector-illustration.jpg?s=612x612&w=0&k=20&c=c-tDqF5B4t2i_eoJXwWsUK05q8ORuLmRbeCa7weLtGc="
                    }
                    alt="Driving License"
                    style={{
                      width: 240,
                      height: 148,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                      borderRadius: 12,
                      boxShadow: "0 2px 12px rgba(30,40,78,0.08)",
                    }}
                    onError={e => { 
                      e.target.onerror = null; 
                      e.target.src = "https://media.istockphoto.com/id/691286862/vector/flat-man-driver-license-plastic-card-template-id-card-vector-illustration.jpg?s=612x612&w=0&k=20&c=c-tDqF5B4t2i_eoJXwWsUK05q8ORuLmRbeCa7weLtGc="; 
                    }}
                  />
                  <div
                    className="d-grid"
                    style={{
                      gridTemplateRows: "repeat(2, 1fr)",
                      rowGap: "1.25rem",
                      minWidth: 220,
                    }}
                  >
                    <div className="row align-items-center">
                      <div
                        className="col-6 text-end pe-3 fw-semibold"
                        style={{ color: "#27314b", fontSize: "1.14rem" }}
                      >
                        <FaIdCard className="me-2" />
                        License Number:
                      </div>
                      <div
                        className="col-6"
                        style={{ color: "#27314b", fontSize: "1.14rem" }}
                      >
                        {license?.licenseNumber || <em>—</em>}
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div
                        className="col-6 text-end pe-3 fw-semibold"
                        style={{ color: "#27314b", fontSize: "1.14rem" }}
                      >
                        <FaCalendarAlt className="me-2" />
                        Expiry Date:
                      </div>
                      <div
                        className="col-6"
                        style={{ color: "#27314b", fontSize: "1.14rem" }}
                      >
                        {license?.expiryDate
                          ? new Date(license.expiryDate).toLocaleDateString()
                          : <em>—</em>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
