import axios from "axios";

const API_BASE = "/api"; // Use Vite proxy for API calls

const apiClient = axios.create({
  baseURL: API_BASE,
  // ...existing axios configuration...
});

// ...existing code...

export const generateReport = async (scope, startDate, endDate) => {
  try {
    const response = await apiClient.post(`/reports/generate`, {
      scope,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    // ...existing error handling...
  }
};

export const getReportById = async (id) => {
  try {
    const response = await apiClient.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    // ...existing error handling...
  }
};

export const getDashboardAnalytics = async () => {
  try {
    const response = await apiClient.get(`/analytics/dashboard`);
    return response.data;
  } catch (error) {
    // ...existing error handling...
  }
};