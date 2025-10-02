import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, adminOnly = false}) => {
  const { auth ,loading } = useAuth();

  console.log("from protected",auth)
  if (loading) return null;

  if (!auth.token) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !auth.isAdmin) {

  return <Navigate to="/" />;
}

  return children;
};

export default ProtectedRoute;
