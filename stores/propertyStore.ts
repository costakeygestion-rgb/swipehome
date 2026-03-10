import { create } from 'zustand';
import type { Property } from '../lib/types';

interface PropertyState {
  properties: Property[];
  currentIndex: number;
  isLoading: boolean;
  swipedIds: Set<string>;
  setProperties: (properties: Property[]) => void;
  nextCard: () => void;
  addSwipedId: (id: string) => void;
  resetStack: () => void;
  setLoading: (loading: boolean) => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  currentIndex: 0,
  isLoading: false,
  swipedIds: new Set(),
  setProperties: (properties) => set({ properties, currentIndex: 0 }),
  nextCard: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
  addSwipedId: (id) =>
    set((state) => {
      const newSet = new Set(state.swipedIds);
      newSet.add(id);
      return { swipedIds: newSet };
    }),
  resetStack: () => set({ currentIndex: 0, swipedIds: new Set() }),
  setLoading: (isLoading) => set({ isLoading }),
}));
