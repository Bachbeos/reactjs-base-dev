import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { toast } from 'sonner';
import { axiosInstance } from './client';
import { refreshAccessToken } from '@/features/auth/api/auth';
import { useAuthStore } from '@/features/auth/stores/auth';

let isRefreshing = false;
let pendingRequests: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error);
    else resolve(token);
  });
  pendingRequests = [];
};

const logout = () => {
  useAuthStore.getState().clear();
  delete axiosInstance.defaults.headers.common.Authorization;
};

export function setupAuthInterceptor() {
  axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig | undefined;

      if (error.response?.status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        useAuthStore.getState().set({ accessToken: newToken });
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();

        if (axios.isAxiosError(refreshError)) {
          if (refreshError.response?.status === 401) {
            toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          } else {
            toast.error('Không thể làm mới phiên đăng nhập. Vui lòng thử lại.');
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
}
