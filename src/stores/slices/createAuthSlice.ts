import { type StateCreator } from 'zustand';

type UserInfo = {
  id: string;
  name: string;
  role: 'admin' | 'user';
} | null;

export interface AuthSlice {
  user: UserInfo;
  isAuthenticated: boolean;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
});
