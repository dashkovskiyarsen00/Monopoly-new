import { httpClient } from './httpClient';

export const fetchLeaderboard = async (type: 'mmr' | 'wins' | 'games') => {
  const { data } = await httpClient.get('/stats/leaderboard', {
    params: { type }
  });
  return data;
};

export const fetchSeasonLeaderboard = async () => {
  const { data } = await httpClient.get('/stats/season');
  return data;
};
