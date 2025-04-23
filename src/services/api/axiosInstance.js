import axios from 'axios';
import AuthService from '../auth/AuthService';
import { store } from '../../redux/store';
import { setAuthData } from '../../redux/auth/actions';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

// Function to handle token expiration and logout
const handleTokenExpiration = async () => {
  console.log('Token expired. Logging out...');
  await AuthService.logout();
  // Use history.push instead of window.location to maintain SPA behavior
  window.location.href = '/';
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 500) {
      toast.error('Something went wrong. Please try again later.');
      window.location.href = '/500';
      return Promise.reject(error);
    }

    // Check for token expired error messages
    const isTokenExpired = 
      error.response?.status === 401 || 
      error.response?.data?.message?.toLowerCase().includes('expired') ||
      error.response?.data?.error?.toLowerCase().includes('expired');

    // Handle token expiration scenarios
    if (isTokenExpired && !originalRequest._retry) {
      const skipEndpoints = ['/auth/login', '/auth/refresh', '/auth/logout'];
      if (skipEndpoints.some(endpoint => originalRequest.url.includes(endpoint))) {
        return Promise.reject(error);
      }
      
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { token: newToken, refreshToken: newRefreshToken } = await AuthService.refreshToken();

        // Update the stored tokens
        store.dispatch(setAuthData({
          accessToken: newToken,
          refreshToken: newRefreshToken,
          ...store.getState().auth,
        }));

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        onRefreshed(newToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // If refresh fails, it means the session is invalid or refresh token expired
        await handleTokenExpiration();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !originalRequest.url.includes('/auth/refresh')) {
      await handleTokenExpiration();
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;