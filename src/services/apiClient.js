import axios from "axios";
import { getToken } from "../utils/token";

const apiClient = axios.create({
  baseURL: "/", // API Gateway URL - uses Vite proxy
  headers: {
    "Content-Type": "application/json",
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

export default apiClient;