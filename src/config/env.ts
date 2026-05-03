export const ENV = {
  API_BASE_URL: process.env.API_BASE_URL ?? 'https://api.example.com',
  APP_ENV: (process.env.APP_ENV ?? 'development') as
    | 'development'
    | 'staging'
    | 'production',
  TIMEOUT_MS: 10_000,
} as const;

export const isDev = ENV.APP_ENV === 'development';
export const isProduction = ENV.APP_ENV === 'production';
