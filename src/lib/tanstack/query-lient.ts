import { MutationCache, QueryClient, type QueryKey } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ErrorResponseWrapper } from '@/lib/util';
import { router } from '@/app/router';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey | QueryKey[];
      successMessage?: string;
      errorMessage?: string;
      redirectTo?: string;
      replace?: boolean;
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 0,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }

      if (mutation.meta?.redirectTo) {
        router.navigate({
          to: mutation.meta.redirectTo as any,
          replace: mutation.meta.replace ?? false,
        });
      }
    },

    onError: (err: unknown, _vars, _ctx, mutation) => {
      const message =
        mutation.meta?.errorMessage ?? ErrorResponseWrapper(err) ?? 'Đã có lỗi xảy ra';

      toast.error(message);
    },

    onSettled: (_data, _error, _variables, _context, mutation) => {
      const keys = mutation.meta?.invalidatesQuery;
      if (!keys) return;

      const list = Array.isArray(keys) ? keys : [keys];
      list.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
    },
  }),
});
