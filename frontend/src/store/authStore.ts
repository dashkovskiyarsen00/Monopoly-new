import { create } from 'zustand';

export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatarUrl: string;
  stats: {
    gamesPlayed: number;
    wins: number;
    winRate: number;
    timePlayed: number;
    maxCapital: number;
  };
  rating: {
    mmr: number;
    rank: string;
  };
  mastery: number;
  coins: number;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  setAuth: (token: string, user: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null })
}));
