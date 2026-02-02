import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage     from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import ContestPage     from './pages/ContestPage';
import AdminLogin      from './pages/AdminLogin';
import AdminDashboard  from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Student Flow ── */}
        <Route path="/"         element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/contest"  element={<ContestPage />} />

        {/* ── Admin Flow ── */}
        <Route path="/admin"           element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
