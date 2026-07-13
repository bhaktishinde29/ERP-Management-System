import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  // Get token
  const token = localStorage.getItem("token");

  // Get user
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("TOKEN:", token);
  console.log("USER:", user);

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Role not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    alert("Access Denied");
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
}

export default ProtectedRoute;