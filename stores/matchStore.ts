import { create } from 'zustand';
import type { Match, Property } from '../lib/types';

interface MatchState {
  matches: Match[];
  showMatchPopup: boolean;
  lastMatchedProperty: Property | null;
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  removeMatch: (matchId: string) => void;
  showPopup: (property: Property) => void;
  hidePopup: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  showMatchPopup: false,
  lastMatchedProperty: null,
  setMatches: (matches) => set({ matches }),
  addMatch: (match) =>
    set((state) => ({ matches: [match, ...state.matches] })),
  removeMatch: (matchId) =>
    set((state) => ({
      matches: state.matches.filter((m) => m.id !== matchId),
    })),
  showPopup: (property) =>
    set({ showMatchPopup: true, lastMatchedProperty: property }),
  hidePopup: () => set({ showMatchPopup: false, lastMatchedProperty: null }),
}));
