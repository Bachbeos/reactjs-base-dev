import { axiosBase } from '@/lib/axios/client';
import { ENDPOINTS } from './endpoints';

type RefreshResponse = {
  accessToken: string;
};

export const refreshAccessToken = async (): Promise<string> => {
  const res = await axiosBase.post<RefreshResponse>(
    ENDPOINTS.auth.refresh,
    {},
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const token = res.data.accessToken;

  if (!token) {
    throw new Error('Không nhận được token mới. Vui lòng đăng nhập lại.');
  }

  return token;
};
