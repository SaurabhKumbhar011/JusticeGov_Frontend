import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token - but NOT for login/register
apiClient.interceptors.request.use((config) => {
  // Don't add token for auth endpoints
  if (config.url?.includes('/auth/login') || config.url?.includes('/auth/register')) {
    return config;
  }
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor for debugging
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default apiClient;