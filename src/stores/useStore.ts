import { create } from 'zustand';
import { createAuthSlice, type AuthSlice } from './slices/createAuthSlice';
import { createUISlice, type UISlice } from './slices/createUISlice';
import { devtools, persist } from 'zustand/middleware';

type StoreState = UISlice & AuthSlice;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createUISlice(...a),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          theme: state.theme,
          isSidebarOpen: state.isSidebarOpen,
        }),
      },
    ),
    { name: 'AppStore' },
  ),
);
