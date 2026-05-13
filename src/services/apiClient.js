import axios from "axios";
import { getToken } from "../utils/token";

const apiClient = axios.create({
  baseURL: 'http://localhost:9999/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const unwrapResponseData = (payload) => {
  if (!payload || typeof payload !== 'object') return payload;
  if (Array.isArray(payload)) return payload;
  const hasData = Object.prototype.hasOwnProperty.call(payload, 'data');
  if (!hasData) return payload;
  if (Object.keys(payload).length === 1) return payload.data;
  if ('status' in payload || 'message' in payload || 'code' in payload) return payload.data;
  return payload;
};

apiClient.interceptors.response.use(
  (response) => {
    if (response?.data) {
      response.data = unwrapResponseData(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      console.error('API 403 Forbidden:', {
        url: error.config?.url,
        method: error.config?.method,
        authorization: error.config?.headers?.Authorization,
        response: error.response?.data,
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;