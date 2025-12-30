import axios from 'axios';
import { env } from '../config/env';
import { useAuthStore } from '../store/authStore';

export const httpClient = axios.create({
  baseURL: `${env.apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
