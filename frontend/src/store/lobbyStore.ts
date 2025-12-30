import { create } from 'zustand';

interface LobbyState {
  rooms: any[];
  setRooms: (rooms: any[]) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms })
}));
