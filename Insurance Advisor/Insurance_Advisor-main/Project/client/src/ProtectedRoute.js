
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // If the user is not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated, render the component
  return Element;
};

export default ProtectedRoute;

