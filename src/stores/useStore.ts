import { create } from 'zustand';
import { createUISlice, type UISlice } from './slices/createUISlice';
import { devtools, persist } from 'zustand/middleware';

type StoreState = UISlice;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
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
