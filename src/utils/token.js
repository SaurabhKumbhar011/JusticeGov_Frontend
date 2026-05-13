// utils/token.js

// Save token to localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Decode JWT payload
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Get user role from token
export const getUserRole = () => {
  const decoded = decodeToken();
  return decoded?.role || null;
};

// Get user email from token
export const getUserEmail = () => {
  const decoded = decodeToken();
  return decoded?.sub || null;
};
