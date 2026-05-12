import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Register from './modules/Identity-AccessManagement/Register';
import Login from './modules/Identity-AccessManagement/Login';
import AppRoutes from './routes/AppRoutes';
import AdminPanel from './components/AdminPanel'; // We'll create this
import Judgements from './modules/judgment-order/pages/Judgements';
import DashboardLayout from './layouts/DashboardLayout';
import CourtOrders from './modules/judgment-order/pages/CourtOrders';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <AppRoutes ProtectedRoute={ProtectedRoute} isAuthenticated={isAuthenticated} user={user} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App; 