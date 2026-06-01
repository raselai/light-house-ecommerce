'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check auth status via a lightweight API call
    fetch('/api/admin/check', { method: 'GET' })
      .then(res => {
        setIsAuthenticated(res.ok);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
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

  return { isAuthenticated, loading, login, logout, requireAuth };
}
