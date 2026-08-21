import { type StateCreator } from 'zustand';

export interface UISlice {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toogleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  isSidebarOpen: true,
  theme: 'system',
  toogleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
});
