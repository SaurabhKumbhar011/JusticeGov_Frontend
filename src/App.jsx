import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Register from './modules/Identity-AccessManagement/Register';
import Login from './modules/Identity-AccessManagement/Login';
// import AppRoutes from './routes/AppRoutes';
import AdminPanel from './components/AdminPanel'; // We'll create this
import Judgements from './modules/judgment-order/pages/Judgements';
import DashboardLayout from './layouts/DashboardLayout';
import CourtOrders from './modules/judgment-order/pages/CourtOrders';
import MyProfilePage from './modules/Citizen-Lawyer-Registration/pages/MyProfilePage';
import RegistrationDashboard from './modules/Citizen-Lawyer-Registration/pages/RegistrationDashboard';
import CaseFilingPage from './modules/Citizen-Lawyer-Registration/pages/CaseFilingPage';
import DocumentUploadPage from './modules/Citizen-Lawyer-Registration/pages/DocumentUploadPage';
import CitizenPanelPage from './modules/Citizen-Lawyer-Registration/pages/CitizenPanelPage';
import LawyerPanelPage from './modules/Citizen-Lawyer-Registration/pages/LawyerPanelPage';

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

  const DashboardRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;

    const role = user.role?.toUpperCase();
    if (role === 'CITIZEN') {
      return <Navigate to="/register/citizens" replace />;
    }
    if (role === 'LAWYER') {
      return <Navigate to="/register/lawyers" replace />;
    }
    if (role === 'ADMIN' || role === 'REGISTRAR') {
      return <Navigate to="/register/dashboard" replace />;
    }
    if (role === 'JUDGE') {
      return <Navigate to="/judgeorder/judgements" replace />;
    }
    return <Navigate to="/register/my-profile" replace />;
  };


  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRedirect />
        </ProtectedRoute>
      } />

      <Route path="/register/my-profile" element={
        <ProtectedRoute>
          <MyProfilePage />
        </ProtectedRoute>
      } />

      <Route path="/register/citizens" element={
        <ProtectedRoute>
          <CitizenPanelPage />
        </ProtectedRoute>
      } />

      <Route path="/register/lawyers" element={
        <ProtectedRoute>
          <LawyerPanelPage />
        </ProtectedRoute>
      } />

      <Route path="/register/dashboard" element={
        <ProtectedRoute>
          <RegistrationDashboard />
        </ProtectedRoute>
      } />

      <Route path="/register/document" element={
        <ProtectedRoute>
          <DocumentUploadPage />
        </ProtectedRoute>
      } />

      <Route path="/register/case-filing" element={
        <ProtectedRoute>
          <CaseFilingPage />
        </ProtectedRoute>
      } />

      <Route path="/judgeorder" element={<DashboardLayout />}>
        <Route path="judgements" element={<Judgements />} />
        <Route path="court-orders" element={<CourtOrders />} />
      </Route>


      {/* Default redirect */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
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