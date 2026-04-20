import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';

// Doctor Pages
import DoctorPage from '../pages/DoctorPage';
import DoctorAbout from '../pages/DoctorAbout';
import DoctorServices from '../pages/DoctorServices';
import DoctorGallery from '../pages/DoctorGallery';
import DoctorServiceDetail from '../pages/DoctorServiceDetail';

// Play Zone Pages
import PlayZonePage from '../pages/PlayZonePage';
import PlayZoneAbout from '../pages/PlayZoneAbout';
import PlayZoneActivities from '../pages/PlayZoneActivities';
import PlayZoneGallery from '../pages/PlayZoneGallery';
import PlayZoneActivityDetail from '../pages/PlayZoneActivityDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Doctor Routes (Protected) */}
      <Route path="/doctor" element={<ProtectedRoute expectedPlatform="doctor"><DoctorPage /></ProtectedRoute>} />
      <Route path="/doctor/about" element={<ProtectedRoute expectedPlatform="doctor"><DoctorAbout /></ProtectedRoute>} />
      <Route path="/doctor/services" element={<ProtectedRoute expectedPlatform="doctor"><DoctorServices /></ProtectedRoute>} />
      <Route path="/doctor/services/:id" element={<ProtectedRoute expectedPlatform="doctor"><DoctorServiceDetail /></ProtectedRoute>} />
      <Route path="/doctor/gallery" element={<ProtectedRoute expectedPlatform="doctor"><DoctorGallery /></ProtectedRoute>} />

      {/* Play Zone Routes (Protected) */}
      <Route path="/play-zone" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZonePage /></ProtectedRoute>} />
      <Route path="/play-zone/about" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneAbout /></ProtectedRoute>} />
      <Route path="/play-zone/activities" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneActivities /></ProtectedRoute>} />
      <Route path="/play-zone/activities/:id" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneActivityDetail /></ProtectedRoute>} />
      <Route path="/play-zone/gallery" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneGallery /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
