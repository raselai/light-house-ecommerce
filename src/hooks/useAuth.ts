'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('adminAuth');
    setIsAuthenticated(authToken === 'true');
    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'lighting2024') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const requireAuth = () => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
      return false;
    }
    return true;
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    requireAuth
  };
} 