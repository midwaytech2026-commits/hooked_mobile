import { ENV } from './env';

export const AppConfig = {
  appName: 'Demo',
  version: '1.0.0',

  api: {
    baseUrl: ENV.API_BASE_URL,
    timeout: ENV.TIMEOUT_MS,
    retryAttempts: 3,
  },

  pagination: {
    defaultLimit: 20,
  },

  session: {
    tokenRefreshBuffer: 5 * 60 * 1000, // refresh 5 min before expiry
  },
} as const;
