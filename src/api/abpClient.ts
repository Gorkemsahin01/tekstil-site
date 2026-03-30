import axios from 'axios';
import { ABP_API_URL, STORAGE_ACCESS_TOKEN } from '../config/abp';

/**
 * ABP HTTP API çağrıları için axios örneği.
 * Geliştirmede Vite proxy kullanıyorsanız baseURL boş bırakıp '/api' ile istek atabilirsiniz.
 */
export const abpClient = axios.create({
  baseURL: ABP_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

abpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

abpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    }
    return Promise.reject(err);
  }
);
