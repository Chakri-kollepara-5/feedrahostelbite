import axios from "axios";
import { auth } from "../config/firebase";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token automatically
API.interceptors.request.use(async (config) => {
  // 1. Try Internal JWT (set after login)
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config; // Return early if internal token exists
  }

  // 2. Fallback to Firebase ID Token (only for initial auth exchange or if no internal token)
  const user = auth.currentUser;
  if (user) {
    await user.getIdToken();
    // Use a different header or just Authorization?
    // Backend protect middleware expects "Bearer <token>" and verifies with JWT_SECRET.
    // If we send Firebase token here, it will fail `jwt.verify` unless we have a specific endpoint that handles it.
    // For endpoints that need Firebase token (like /auth/login), we passing it in body usually.
    // But let's leave this as fallback or remove if not needed.
    // Actually, if we are calling /auth/login, we don't need Authorization header usually, we send token in body.
    // So let's just stick to internal token here.
  }
  return config;
});

// Response Interceptor for Success Logs
API.interceptors.response.use(
  (response) => {
    // Skip logging for frequent polling endpoints to keep console clean
    const skipLogs = ['/donations/nearby', '/stats/impact'];
    const isPolling = skipLogs.some(url => response.config.url.includes(url));

    if (!isPolling) {
      console.log(`✅ Success: [${response.config.method.toUpperCase()}] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Keep error handling as is or enhance if needed
    return Promise.reject(error);
  }
);

export default API;
