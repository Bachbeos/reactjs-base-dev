import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;

  set: (data: { accessToken?: string | null; refreshToken?: string | null }) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      set: ({ accessToken, refreshToken }) =>
        set((state) => ({
          accessToken: accessToken !== undefined ? accessToken : state.accessToken,
          refreshToken: refreshToken !== undefined ? refreshToken : state.refreshToken,
        })),

      clear: () =>
        set(() => ({
          accessToken: null,
          refreshToken: null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
