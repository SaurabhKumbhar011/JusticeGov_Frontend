import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Register from './modules/Identity-AccessManagement/Register';
import Login from './modules/Identity-AccessManagement/Login';
import AppRoutes from './routes/AppRoutes';
import AdminPanel from './components/AdminPanel'; // We'll create this
import Judgements from './modules/judgment-order/pages/Judgements';
import DashboardLayout from './layouts/DashboardLayout';
import CourtOrders from './modules/judgment-order/pages/CourtOrders';
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Explicit extension to resolve ambiguity
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'; 
import Login from './Pages/Login.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
>>>>>>> f9e42b77cb5c5d4371c9b4e094c2854686f659ea

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  
  return children;
};

<<<<<<< HEAD
const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <AppRoutes ProtectedRoute={ProtectedRoute} isAuthenticated={isAuthenticated} user={user} />
  );
};

=======
>>>>>>> f9e42b77cb5c5d4371c9b4e094c2854686f659ea
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          {/* Default Redirection */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;