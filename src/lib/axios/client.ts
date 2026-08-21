import { env } from '@/config/env';
import axios from 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const paramsSerializer = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(`${key}[]`, String(v)));
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

export const axiosBase = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  paramsSerializer,
});

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  paramsSerializer,
});
