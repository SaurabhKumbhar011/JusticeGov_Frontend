import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../utils/token';
import { decodeToken } from '../utils/jwtUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken();
      if (decoded) {
        setIsAuthenticated(true);
        setUser(decoded);
      } else {
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      const decoded = decodeToken();
      if (decoded) {
        setIsAuthenticated(true);
        setUser(decoded);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};