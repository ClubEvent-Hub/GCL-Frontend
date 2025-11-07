// /lib/auth.ts
import { Student } from '@/app/types';

export const getUser = (): Student | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: Student, token: string, type: 'student' | 'club') => {
  if (typeof window !== 'undefined') {
    const data = { ...user, userType: type };
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    window.dispatchEvent(new Event('storage'));
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};
