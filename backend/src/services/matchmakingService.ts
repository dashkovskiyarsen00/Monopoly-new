import { createRoom, findRoomForMode, GameMode } from './gameService';

export const findOrCreateMatch = (mode: GameMode, maxPlayers: number) => {
  const existing = findRoomForMode(mode, maxPlayers);
  if (existing) {
    return existing;
  }
  return createRoom({ mode, boardType: 'brands', maxPlayers });
};
