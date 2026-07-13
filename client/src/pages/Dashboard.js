import React from "react";

import AdminDashboard from "../components/dashboard/AdminDashboard";
import HRDashboard from "../components/dashboard/HRDashboard";
import EmployeeDashboard from "../components/dashboard/EmployeeDashboard";


function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Logged User:", user);


  if (!user) {
    return <h2>User not found</h2>;
  }


  if (user.role === "admin") {
    return <AdminDashboard />;
  }


  if (user.role === "hr") {
    return <HRDashboard />;
  }


  if (user.role === "employee") {
    return <EmployeeDashboard />;
  }


  return <h2>Invalid Role</h2>;
}


export default Dashboard;