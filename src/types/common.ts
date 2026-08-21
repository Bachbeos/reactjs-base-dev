export type ApiResponse<T = unknown> = {
  code?: number;
  success: boolean;
  message: string;
  result?: T;
};
