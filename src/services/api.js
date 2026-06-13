import axios from "axios";
import { auth } from "../config/firebase";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token automatically
API.interceptors.request.use(async (config) => {
  if (globalThis.__isOfflineMode) {
    const offlineError = new Error("Backend offline");
    offlineError.code = 'ERR_NETWORK';
    offlineError.__silent = true;
    throw offlineError;
  }

  // 1. Try Internal JWT (set after backend login)
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  // 2. Fallback: use Firebase ID Token directly
  try {
    const user = auth.currentUser;
    if (user) {
      const firebaseToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${firebaseToken}`;
    }
  } catch (e) {
    // Silently fail — unauthenticated requests get a 401 from backend
  }

  return config;
});

// Response Interceptor
API.interceptors.response.use(
  (response) => {
    // Skip logging for frequent polling endpoints
    const skipLogs = ['/donations/nearby', '/stats/impact'];
    const isPolling = skipLogs.some(url => response.config?.url?.includes(url));
    if (!isPolling) {
      console.log(`✅ [${response.config.method.toUpperCase()}] ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Only log once when going offline — suppress all subsequent silent errors
    if (error.__silent) {
      return Promise.reject(error);
    }
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      if (!globalThis.__isOfflineMode) {
        globalThis.__isOfflineMode = true;
        console.info('ℹ️ Backend offline — using local fallback data.');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
