import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ProtectedRoute = ({ children, allowedRole }) => {
  
  const { token, role } = useSelector((state) => state.auth); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
