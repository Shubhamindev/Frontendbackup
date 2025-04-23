import { store } from '../../redux/store';
import { setAuthData, clearAuthData } from '../../redux/auth/actions';
import { persistor } from '../../redux/store';
import axiosInstance from '../api/axiosInstance';

const API_URL = '/auth';

let isRefreshing = false;
let refreshSubscribers = [];

const storeAuthData = ({ token, refreshToken, username, email, role }) => {
  const authData = { accessToken: token, refreshToken, email, username, role };
  store.dispatch(setAuthData(authData));
  // Persist tokens to localStorage for recovery across page refreshes
};

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

const AuthService = {
  login: async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    storeAuthData(data);
    console.log('Login successful for user:', email);
    return data;
  },

  logout: async (reason = 'User initiated logout') => {
    try {
      await axiosInstance.post(`${API_URL}/logout`);
      console.log('Logout API call successful');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      store.dispatch(clearAuthData());
      await persistor.purge();
      console.log(`Logout completed: ${reason}`);
      return { message: reason };
    }
  },

  refreshToken: async () => {
    const refreshToken = AuthService.getRefreshToken();
    const accessToken = AuthService.getAccessToken();

    if (!refreshToken) {
      console.error('No refresh token available');
      throw new Error('No refresh token available');
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          resolve({ token: newToken, refreshToken: AuthService.getRefreshToken() });
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await axiosInstance.post(
        `${API_URL}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Refresh-Token': refreshToken,
          },
        }
      );

      storeAuthData(response.data);
      console.log('Token refresh successful');
      onRefreshed(response.data.token);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? 'Invalid or expired refresh token'
          : `Refresh token failed with status ${error.response?.status || 'unknown'}`);
      console.error('Refresh token error:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      isRefreshing = false;
    }
  },

  isAuthenticated: () => {
    const state = store.getState();
    return !!state.auth.accessToken;
  },

  getCurrentUser: () => {
    const state = store.getState();
    return state.auth;
  },

  getAccessToken: () => {
    const state = store.getState();
    return state.auth.accessToken;
  },

  getRefreshToken: () => {
    const state = store.getState();
    return state.auth.refreshToken;
  },

  initializeAuth: () => {
    const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedTokens) {
      try {
        const { accessToken, refreshToken } = JSON.parse(storedTokens);
        store.dispatch(setAuthData({ ...store.getState().auth, accessToken, refreshToken }));
        console.log('Restored auth tokens from localStorage');
      } catch (error) {
        console.error('Failed to restore auth tokens:', error);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
  },
};

export default AuthService;