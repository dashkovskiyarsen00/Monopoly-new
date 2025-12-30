import { httpClient } from './httpClient';

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data;
};

export const register = async (payload: { email: string; password: string; nickname: string }) => {
  const { data } = await httpClient.post('/auth/register', payload);
  return data;
};

export const resetPassword = async (payload: { email: string }) => {
  const { data } = await httpClient.post('/auth/reset-password', payload);
  return data;
};
