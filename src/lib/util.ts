import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface ErrorResponseBody {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
}

export function ErrorResponseWrapper(err: unknown): string | null {
  if (typeof err !== 'object' || !err) return null;

  const errorObj = err as ErrorResponseBody;

  if (errorObj.response?.data?.message) {
    return errorObj.response.data.message;
  }
  if (errorObj.response?.data?.error) {
    return errorObj.response.data.error;
  }
  if (typeof errorObj.message === 'string') {
    return errorObj.message;
  }

  return null;
}
