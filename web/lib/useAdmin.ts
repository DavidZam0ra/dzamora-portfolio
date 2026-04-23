'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './auth';

export function useAdmin() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Si venimos de Google OAuth, el token llega en ?token=<jwt>
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      auth.setToken(urlToken);
      window.history.replaceState({}, '', '/admin/dashboard');
    }

    const t = auth.getToken();
    if (!t) {
      router.replace('/admin/login');
    } else {
      setToken(t);
      setReady(true);
    }
  }, [router]);

  function logout() {
    auth.removeToken();
    sessionStorage.removeItem('admin-welcomed');
    router.replace('/admin/login');
  }

  return { token, ready, logout };
}
