import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

export interface UserInfo {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
}

export interface AuthState {
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setTokens: (tokens: { accessToken?: string | null; refreshToken?: string | null }) => void;
  setUser: (user: UserInfo | null) => void;
  setAuth: (data: { user: UserInfo; accessToken: string; refreshToken?: string }) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setTokens: ({ accessToken, refreshToken }) =>
        set((state) => ({
          accessToken: accessToken !== undefined ? accessToken : state.accessToken,
          refreshToken: refreshToken !== undefined ? refreshToken : state.refreshToken,
        })),

      setUser: (user) =>
        set(() => ({
          user,
          isAuthenticated: !!user,
        })),

      setAuth: ({ user, accessToken, refreshToken }) =>
        set((state) => ({
          user,
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true,
        })),

      clear: () =>
        set(() => ({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
