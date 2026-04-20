import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlatform } from '../context/PlatformContext';

const ProtectedRoute = ({ children, expectedPlatform }) => {
  const { activePlatform } = usePlatform();
  
  if (activePlatform !== expectedPlatform) {
    // Blocks direct URL access bypass and cross-navigation
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
