import { httpClient } from './httpClient';

export const fetchProfile = async () => {
  const { data } = await httpClient.get('/users/me');
  return data;
};

export const updateProfile = async (payload: { nickname?: string; avatarUrl?: string }) => {
  const { data } = await httpClient.put('/users/me', payload);
  return data;
};

export const fetchInventory = async () => {
  const { data } = await httpClient.get('/users/me/inventory');
  return data;
};

export const fetchUsers = async () => {
  const { data } = await httpClient.get('/users/admin/users', {
    headers: {
      'x-admin': 'true'
    }
  });
  return data;
};
