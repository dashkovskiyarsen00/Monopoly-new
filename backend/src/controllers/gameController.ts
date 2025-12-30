import { Request, Response } from 'express';
import { createRoom, listRooms } from '../services/gameService';
import { findOrCreateMatch } from '../services/matchmakingService';

export const getRooms = (_req: Request, res: Response): void => {
  res.json(listRooms());
};

export const createRoomHandler = (req: Request, res: Response): void => {
  const { mode, boardType, maxPlayers } = req.body;
  const room = createRoom({
    mode: mode ?? 'casual',
    boardType: boardType ?? 'brands',
    maxPlayers: maxPlayers ?? 4
  });
  res.status(201).json(room);
};

export const quickMatch = (req: Request, res: Response): void => {
  const { mode, maxPlayers } = req.body;
  const room = findOrCreateMatch(mode ?? 'casual', maxPlayers ?? 4);
  res.json(room);
};
