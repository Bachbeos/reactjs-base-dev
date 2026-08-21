import { setupAuthInterceptor } from './interceptor';

export { axiosBase, axiosInstance } from './client';

setupAuthInterceptor();
