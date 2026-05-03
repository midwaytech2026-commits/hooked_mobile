import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authService } from '../../services/authService';
import type {
  AuthState,
  LoginCredentials,
  RegisterPayload,
} from '../../types/auth.types';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Restore persisted session on mount
  useEffect(() => {
    authService.getStoredToken().then(async token => {
      if (token) {
        const user = await authService.getStoredUser();
        setState({ user, token, isAuthenticated: true, isLoading: false });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }).catch(() => {
      setState(prev => ({ ...prev, isLoading: false }));
    });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials);
    setState({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { user, token } = await authService.register(payload);
    setState({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  const value = useMemo(
    () => ({ ...state, login, register, logout }),
    [state, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
