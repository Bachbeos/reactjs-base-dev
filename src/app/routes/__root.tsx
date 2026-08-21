import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from '@/components/ui/sooner';

export const Route = createRootRoute({
  component: () => (
    <>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Outlet />
        <Toaster position="top-right" richColors />
      </Suspense>

      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </>
  ),
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-500">Trang bạn tìm kiếm không tồn tại.</p>
      </div>
    );
  },
});
