import { useEffect } from 'react';
import { fetchProfile } from '../api/userApi';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const profile = await fetchProfile();
        setAuth(token, profile);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, [token, setAuth]);
};
