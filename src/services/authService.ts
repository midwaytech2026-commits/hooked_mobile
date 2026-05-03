import { apiClient } from './api';
import { storageService } from './storageService';
import { STORAGE_KEYS } from '../utils/constants';
import type { LoginCredentials, RegisterPayload, User } from '../types/auth.types';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    await Promise.all([
      storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token),
      storageService.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user)),
    ]);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    await Promise.all([
      storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token),
      storageService.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user)),
    ]);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await Promise.all([
      storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      storageService.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  },

  getStoredToken: (): Promise<string | null> =>
    storageService.getItem(STORAGE_KEYS.AUTH_TOKEN),

  getStoredUser: async (): Promise<User | null> => {
    const raw = await storageService.getItem(STORAGE_KEYS.USER_DATA);
    return raw ? (JSON.parse(raw) as User) : null;
  },
};
