import { httpClient } from './httpClient';

export const fetchRooms = async () => {
  const { data } = await httpClient.get('/games/rooms');
  return data;
};

export const createRoom = async (payload: { mode: string; boardType: string; maxPlayers: number }) => {
  const { data } = await httpClient.post('/games/rooms', payload);
  return data;
};

export const quickMatch = async (payload: { mode: string; maxPlayers: number }) => {
  const { data } = await httpClient.post('/games/quick-match', payload);
  return data;
};
