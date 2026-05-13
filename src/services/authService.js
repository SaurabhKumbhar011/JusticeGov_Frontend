import apiClient from './apiClient';

// Public Endpoints
export const login = async (credentials) => {
  console.log('📤 Sending login request with:', credentials);
  try {
    const response = await apiClient.post('/auth/login', credentials);
    console.log('✅ Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Login failed:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      fullResponse: error.response?.data
    });
    throw error;
  }
};

export const register = async (userData) => {
  console.log('📤 Sending register request with:', userData);
  try {
    const response = await apiClient.post('/auth/register', userData);
    console.log('✅ Register successful:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Register failed:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      fullResponse: error.response?.data,
    });
    throw error;
  }
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async ({ email, token, password }) => {
  const response = await apiClient.post('/auth/reset-password', {
    email,
    token,
    resetToken: token,
    password,
    newPassword: password,
  });
  return response.data;
};

export const validateToken = async () => {
  const response = await apiClient.get('/auth/validate');
  return response.data;
};

// Admin-Only Endpoints
export const getAuditLogs = async (adminId) => {
  const response = await apiClient.get('/auth/logs', {
    headers: { 'admin-id': adminId }
  });
  return response.data;
};

export const approveUser = async (email) => {
  const response = await apiClient.put(`/auth/approve/${encodeURIComponent(email)}`);
  return response.data;
};

export const suspendUser = async (email) => {
  const response = await apiClient.put(`/auth/suspend/${encodeURIComponent(email)}`);
  return response.data;
};

export const reactivateUser = async (email) => {
  const response = await apiClient.put(`/auth/reactivate/${encodeURIComponent(email)}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await apiClient.get(`/auth/users/${userId}`);
  return response.data;
};