import apiClient from "./apiClient";
import { setToken, removeToken } from "../utils/token";

export const login = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data?.data ?? response.data;
};

export const logout = () => {
  removeToken();
};

export const register = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await apiClient.post("/auth/reset-password", data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post("/auth/forgot-password", { email });
  return response.data;
};

export const getAuditLogs = async (adminId) => {
  const response = await apiClient.get("/auth/logs", {
    headers: { "admin-id": adminId }
  });
  return response.data;
};

export const approveUser = async (email) => {
  const response = await apiClient.put(`/auth/approve/${email}`);
  return response.data;
};

export const suspendUser = async (email) => {
  const response = await apiClient.put(`/auth/suspend/${email}`);
  return response.data;
};

export const reactivateUser = async (email) => {
  const response = await apiClient.put(`/auth/reactivate/${email}`);
  return response.data;
};

export const validateToken = async () => {
  const response = await apiClient.get("/auth/validate");
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await apiClient.get(`/auth/users/${userId}`);
  return response.data;
};