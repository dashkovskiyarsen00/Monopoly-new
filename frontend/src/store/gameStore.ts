import { create } from 'zustand';

export interface BoardCell {
  index: number;
  name: string;
  type: string;
  color?: string;
  price?: number;
  ownerId?: string;
}

export interface PlayerState {
  userId: string;
  nickname: string;
  avatarUrl: string;
  position: number;
  balance: number;
  properties: number[];
}

export interface RoomState {
  id: string;
  mode: string;
  boardType: string;
  maxPlayers: number;
  players: PlayerState[];
  board: BoardCell[];
  status: string;
  currentTurnIndex: number;
  log: string[];
}

interface GameState {
  room: RoomState | null;
  dice: [number, number] | null;
  setRoom: (room: RoomState) => void;
  setDice: (dice: [number, number]) => void;
  clearRoom: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  room: null,
  dice: null,
  setRoom: (room) => set({ room }),
  setDice: (dice) => set({ dice }),
  clearRoom: () => set({ room: null, dice: null })
}));
