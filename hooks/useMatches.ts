import { useCallback } from 'react';
import { useMatchStore } from '../stores/matchStore';
import { usePropertyStore } from '../stores/propertyStore';
import { SEED_PROPERTIES } from '../lib/seedData';
import type { Property, Match } from '../lib/types';

export function useMatches() {
  const {
    matches,
    showMatchPopup,
    lastMatchedProperty,
    addMatch,
    removeMatch,
    showPopup,
    hidePopup,
  } = useMatchStore();

  const { nextCard, addSwipedId } = usePropertyStore();

  const handleSwipeRight = useCallback(
    (property: Property) => {
      addSwipedId(property.id);

      const newMatch: Match = {
        id: `match-${Date.now()}`,
        user_id: 'local-user',
        property_id: property.id,
        status: 'active',
        created_at: new Date().toISOString(),
        property,
      };

      addMatch(newMatch);
      showPopup(property);
      nextCard();

      // TODO: Save to Supabase
      // await supabase.from('swipes').insert({ user_id, property_id, direction: 'right' });
      // await supabase.from('matches').insert({ user_id, property_id });
    },
    [addMatch, addSwipedId, nextCard, showPopup]
  );

  const handleSwipeLeft = useCallback(
    (property: Property) => {
      addSwipedId(property.id);
      nextCard();

      // TODO: Save to Supabase
      // await supabase.from('swipes').insert({ user_id, property_id, direction: 'left' });
    },
    [addSwipedId, nextCard]
  );

  const getMatchWithProperty = useCallback(
    (match: Match): Match => {
      if (match.property) return match;
      const property = SEED_PROPERTIES.find((p) => p.id === match.property_id);
      return { ...match, property };
    },
    []
  );

  return {
    matches,
    showMatchPopup,
    lastMatchedProperty,
    handleSwipeRight,
    handleSwipeLeft,
    removeMatch,
    hidePopup,
    getMatchWithProperty,
  };
}
