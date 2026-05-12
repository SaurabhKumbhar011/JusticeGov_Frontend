import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Explicit extension to resolve ambiguity
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'; 
import Login from './Pages/Login.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  
  return children;
};

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