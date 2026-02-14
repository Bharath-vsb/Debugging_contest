/**
 * api.js
 * ──────
 * Centralised Axios instance.
 * All frontend code imports from here so the base URL is configured once.
 * 
 * NETWORK DEPLOYMENT:
 *   - Automatically detects API URL from environment
 *   - For local network: set REACT_APP_API_URL to http://YOUR_LOCAL_IP:5000/api
 *   - Increased timeout for network conditions
 */

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '/api';

console.log('🌐 API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,   // 60s - generous for network conditions and Docker execution
  headers: {
    'Content-Type': 'application/json'
  }
});

// ── Interceptor: attach admin JWT to every request if present ──
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Interceptor: handle network errors gracefully ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⚠️ Request timeout - server may be overloaded');
    } else if (error.message === 'Network Error') {
      console.error('⚠️ Network error - check if backend is running');
    }
    return Promise.reject(error);
  }
);

export default api;
