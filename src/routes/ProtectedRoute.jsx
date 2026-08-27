import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAdminOnly }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isAdminOnly && user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
