export const getRankByMmr = (mmr: number): string => {
  if (mmr >= 2500) return 'Grandmaster';
  if (mmr >= 2200) return 'Master';
  if (mmr >= 2000) return 'Diamond';
  if (mmr >= 1700) return 'Platinum';
  if (mmr >= 1400) return 'Gold';
  if (mmr >= 1200) return 'Silver';
  return 'Bronze';
};
