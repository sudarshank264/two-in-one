import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DoctorPage from '../pages/DoctorPage';
import PlayZonePage from '../pages/PlayZonePage';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/doctor" 
        element={
          <ProtectedRoute expectedPlatform="doctor">
            <DoctorPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/play-zone" 
        element={
          <ProtectedRoute expectedPlatform="play-zone">
            <PlayZonePage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
