import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { AppProviders } from './providers/AppProviders';
import '@/app/styles/index.css';

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
