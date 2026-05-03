import { useContext } from 'react';
import { AuthContext } from '../store/context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be called inside <AuthProvider>');
  }
  return context;
};
