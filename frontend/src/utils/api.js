/**
 * api.js
 * ──────
 * Centralised Axios instance.
 * All frontend code imports from here so the base URL is configured once.
 */

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000   // 30 s – generous for Docker-based execution
});

// ── Interceptor: attach admin JWT to every request if present ──
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
