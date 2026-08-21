import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url({ message: 'VITE_API_URL phải là một URL hợp lệ' }),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse(import.meta.env);

  if (!parsed.success) {
    console.error('CẤU HÌNH BIẾN MÔI TRƯỜNG KHÔNG HỢP LỆ');
    console.error(JSON.stringify(parsed.error.format(), null, 2));

    throw new Error(
      'Hệ thống không thể khởi động vì thiếu cấu hình môi trường. Hãy kiểm tra file .env!',
    );
  }

  return parsed.data;
};

export const env = parseEnv();
