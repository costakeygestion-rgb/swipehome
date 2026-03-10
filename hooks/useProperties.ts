import { useEffect, useCallback } from 'react';
import { usePropertyStore } from '../stores/propertyStore';
import { useFilterStore } from '../stores/filterStore';
import { SEED_PROPERTIES } from '../lib/seedData';
import type { Property } from '../lib/types';

export function useProperties() {
  const { properties, currentIndex, isLoading, swipedIds, setProperties, setLoading } =
    usePropertyStore();
  const { filters } = useFilterStore();

  const loadProperties = useCallback(() => {
    setLoading(true);

    // TODO: Replace with Supabase query when backend is ready
    let filtered = SEED_PROPERTIES.filter((p) => p.status === 'active');

    // Filter by type
    filtered = filtered.filter((p) => p.type === filters.type);

    // Filter by zone
    if (filters.zone !== 'Todas') {
      filtered = filtered.filter(
        (p) =>
          p.province.toLowerCase().includes(filters.zone.toLowerCase()) ||
          p.city.toLowerCase().includes(filters.zone.toLowerCase())
      );
    }

    // Filter by price
    if (filters.priceRange.max !== Infinity || filters.priceRange.min > 0) {
      filtered = filtered.filter(
        (p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms !== null) {
      filtered = filtered.filter((p) =>
        filters.bedrooms === 4 ? p.bedrooms >= 4 : p.bedrooms === filters.bedrooms
      );
    }

    // Remove already swiped
    filtered = filtered.filter((p) => !swipedIds.has(p.id));

    // Sort: boosted first, then featured, then by creation date
    filtered.sort((a, b) => {
      if (a.is_boosted && !b.is_boosted) return -1;
      if (!a.is_boosted && b.is_boosted) return 1;
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    setProperties(filtered);
    setLoading(false);
  }, [filters, swipedIds]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const currentProperty: Property | null =
    currentIndex < properties.length ? properties[currentIndex] : null;

  const nextProperties: Property[] = properties.slice(
    currentIndex + 1,
    currentIndex + 4
  );

  const hasMore = currentIndex < properties.length;

  return {
    properties,
    currentProperty,
    nextProperties,
    isLoading,
    hasMore,
    reload: loadProperties,
  };
}
