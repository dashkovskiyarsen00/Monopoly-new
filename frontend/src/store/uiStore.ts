import { create } from 'zustand';

interface UIState {
  toast: string | null;
  setToast: (message: string | null) => void;
}

export const useUiStore = create<UIState>((set) => ({
  toast: null,
  setToast: (message) => set({ toast: message })
}));
