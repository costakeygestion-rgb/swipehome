import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';
import { SwipeCard } from '../../components/SwipeCard';
import { FilterPanel } from '../../components/FilterPanel';
import { MatchPopup } from '../../components/MatchPopup';
import { useProperties } from '../../hooks/useProperties';
import { useMatches } from '../../hooks/useMatches';
import { useFilterStore } from '../../stores/filterStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SwipeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const { currentProperty, nextProperties, hasMore, isLoading, reload } = useProperties();
  const {
    handleSwipeRight,
    handleSwipeLeft,
    showMatchPopup,
    lastMatchedProperty,
    hidePopup,
  } = useMatches();
  const { filters } = useFilterStore();

  const handleCardPress = () => {
    if (currentProperty) {
      router.push(`/property/${currentProperty.id}`);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.locationText}>{filters.zone}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Card Stack */}
      <View style={styles.cardStack}>
        {hasMore && currentProperty ? (
          <>
            {/* Background cards */}
            {nextProperties.map((property, index) => (
              <SwipeCard
                key={property.id}
                property={property}
                onSwipeLeft={() => {}}
                onSwipeRight={() => {}}
                onPress={() => {}}
                isTop={false}
                stackIndex={index + 1}
              />
            ))}

            {/* Top card */}
            <SwipeCard
              key={currentProperty.id}
              property={currentProperty}
              onSwipeLeft={() => handleSwipeLeft(currentProperty)}
              onSwipeRight={() => handleSwipeRight(currentProperty)}
              onPress={handleCardPress}
              isTop={true}
              stackIndex={0}
            />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏠</Text>
            <Text style={styles.emptyTitle}>Has visto todo</Text>
            <Text style={styles.emptySubtitle}>
              No hay más propiedades con estos filtros.{'\n'}Prueba a ampliar tu búsqueda.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => setShowFilters(true)}
            >
              <Text style={styles.emptyBtnText}>Cambiar filtros</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      {hasMore && currentProperty && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.passBtn]}
            onPress={() => handleSwipeLeft(currentProperty)}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={32} color={Colors.pass} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.likeBtn]}
            onPress={() => handleSwipeRight(currentProperty)}
            activeOpacity={0.7}
          >
            <Ionicons name="heart" size={28} color={Colors.like} />
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Panel */}
      {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}

      {/* Match Popup */}
      {showMatchPopup && lastMatchedProperty && (
        <MatchPopup
          property={lastMatchedProperty}
          onContact={() => {
            hidePopup();
            // TODO: Navigate to chat
          }}
          onContinue={hidePopup}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardStack: {
    flex: 1,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingBottom: 16,
  },
  actionBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  passBtn: {},
  likeBtn: {},
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  emptySubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  emptyBtn: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: Colors.cta,
    borderRadius: 14,
  },
  emptyBtnText: {
    color: Colors.ctaText,
    fontSize: 15,
    fontWeight: '700',
  },
});
