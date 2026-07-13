import React from "react";
import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <h2 style={{ padding: "20px" }}>🚫 Access Denied</h2>;
  }

  return children;
}

export default RoleRoute;