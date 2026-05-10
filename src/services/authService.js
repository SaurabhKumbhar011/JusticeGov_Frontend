import apiClient from "./apiClient";

export const login = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);

  const token = response.data.token;
  if (token) {
    localStorage.setItem("token", token); // ✅ STORE JWT
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};