import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors, PropertyTypeColors, PriceUnitLabels } from '../../lib/constants';
import { Badge } from '../../components/ui/Badge';
import { useMatches } from '../../hooks/useMatches';
import type { Match } from '../../lib/types';

export default function MatchesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { matches, getMatchWithProperty } = useMatches();

  const formatPrice = (match: Match) => {
    const property = match.property;
    if (!property) return '';
    if (property.price_unit === 'sale') {
      return property.price >= 1000000
        ? `${(property.price / 1000000).toFixed(1)}M €`
        : `${Math.round(property.price / 1000)}K €`;
    }
    return `${property.price}€${PriceUnitLabels[property.price_unit]}`;
  };

  const renderItem = ({ item }: { item: Match }) => {
    const match = getMatchWithProperty(item);
    const property = match.property;
    if (!property) return null;

    return (
      <TouchableOpacity
        style={styles.matchCard}
        onPress={() => router.push(`/property/${property.id}`)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: property.images[0] }}
          style={styles.matchImage}
          contentFit="cover"
        />
        <View style={styles.matchInfo}>
          <View style={styles.matchHeader}>
            <Text style={styles.matchPrice}>{formatPrice(match)}</Text>
            <View
              style={[
                styles.typeDot,
                { backgroundColor: PropertyTypeColors[property.type] },
              ]}
            />
          </View>
          <Text style={styles.matchTitle} numberOfLines={1}>
            {property.title}
          </Text>
          <Text style={styles.matchLocation}>
            {property.city}, {property.province}
          </Text>
          <Text style={styles.matchSpecs}>
            {property.bedrooms} hab · {property.bathrooms} baños · {property.sqm}m²
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Tus Matches</Text>
        <Text style={styles.subtitle}>
          {matches.length} propiedad{matches.length !== 1 ? 'es' : ''} guardada
          {matches.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {matches.length > 0 ? (
        <FlatList
          data={matches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>Sin matches aún</Text>
          <Text style={styles.emptySubtitle}>
            Desliza a la derecha las propiedades{'\n'}que te gusten para guardarlas aquí
          </Text>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  list: {
    padding: 20,
    gap: 12,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  matchImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  matchPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 2,
  },
  matchLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  matchSpecs: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});
