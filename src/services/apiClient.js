import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:9999/api", // 👈 must include /api
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token + log requests for debugging
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("➡️ API Request:", config.baseURL + config.url);
  return config;
});

export default apiClient;
