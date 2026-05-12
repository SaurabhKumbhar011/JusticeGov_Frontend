import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // 1. If they aren't logged in at all, kick them to the login screen
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. If the route requires a specific role, and they don't have it, kick them out
    if (requiredRole && userRole !== requiredRole) {
        // Redirect them to their standard dashboard or an "Unauthorized" page
        return <Navigate to="/dashboard" replace />; 
    }

    // 3. If they pass the checks, render the page
    return children;
};

export default ProtectedRoute;