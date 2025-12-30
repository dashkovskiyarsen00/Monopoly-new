import { Request, Response } from 'express';
import { getLeaderboard, getSeasonLeaderboard } from '../services/statsService';

export const leaderboard = async (req: Request, res: Response): Promise<void> => {
  const type = (req.query.type as string) ?? 'mmr';
  const sortField = type === 'wins' ? 'stats.wins' : type === 'games' ? 'stats.gamesPlayed' : 'rating.mmr';
  const data = await getLeaderboard(sortField as 'rating.mmr' | 'stats.wins' | 'stats.gamesPlayed');
  res.json(data);
};

export const seasonLeaderboard = async (_req: Request, res: Response): Promise<void> => {
  const data = await getSeasonLeaderboard();
  res.json(data);
};
