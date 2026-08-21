import { setupAuthInterceptor } from '@/lib/axios';
import { refreshAccessToken, useAuthStore } from '@/features/auth';

export function initAxiosInterceptors() {
  setupAuthInterceptor({
    getAccessToken: () => useAuthStore.getState().accessToken,
    onRefreshToken: async () => {
      const newToken = await refreshAccessToken();
      useAuthStore.getState().setTokens({ accessToken: newToken });
      return newToken;
    },
    onLogout: () => {
      useAuthStore.getState().clear();
    },
  });
}
