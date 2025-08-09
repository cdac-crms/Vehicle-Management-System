// src/Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // role saved separately

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Role mismatch, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
