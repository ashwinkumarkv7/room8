import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for user info in localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // If user is logged in, allow access to the nested routes (e.g., Dashboard)
  // Otherwise, redirect them to the login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;