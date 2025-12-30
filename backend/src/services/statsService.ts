import { User } from '../models/User';

export const getLeaderboard = async (sortField: 'rating.mmr' | 'stats.wins' | 'stats.gamesPlayed') => {
  return User.find()
    .sort({ [sortField]: -1 })
    .limit(50)
    .select('nickname avatarUrl rating stats');
};

export const getSeasonLeaderboard = async () => {
  return User.find().sort({ 'rating.mmr': -1 }).limit(20).select('nickname avatarUrl rating stats');
};
