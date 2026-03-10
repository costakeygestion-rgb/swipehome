import { create } from 'zustand';
import type { PropertyType, Filters } from '../lib/types';

interface FilterState {
  filters: Filters;
  setType: (type: PropertyType) => void;
  setZone: (zone: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setBedrooms: (bedrooms: number | null) => void;
  resetFilters: () => void;
}

const defaultFilters: Filters = {
  type: 'vacation',
  zone: 'Todas',
  priceRange: { min: 0, max: Infinity },
  bedrooms: null,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: { ...defaultFilters },
  setType: (type) =>
    set((state) => ({
      filters: {
        ...state.filters,
        type,
        priceRange: { min: 0, max: Infinity },
      },
    })),
  setZone: (zone) =>
    set((state) => ({ filters: { ...state.filters, zone } })),
  setPriceRange: (min, max) =>
    set((state) => ({
      filters: { ...state.filters, priceRange: { min, max } },
    })),
  setBedrooms: (bedrooms) =>
    set((state) => ({ filters: { ...state.filters, bedrooms } })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
}));
