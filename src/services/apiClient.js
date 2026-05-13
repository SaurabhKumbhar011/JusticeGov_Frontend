import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9999/',
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