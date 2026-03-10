import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors, PropertyTypeColors, PropertyTypeLabels } from '../../lib/constants';
import { SEED_PROPERTIES } from '../../lib/seedData';

// Simulate owner's properties (first 3 from seed)
const MY_PROPERTIES = SEED_PROPERTIES.slice(0, 3);

export default function OwnerDashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const totalViews = MY_PROPERTIES.reduce((sum, p) => sum + p.view_count, 0);
  const totalSwipes = MY_PROPERTIES.reduce((sum, p) => sum + p.swipe_right_count, 0);
  const totalMatches = MY_PROPERTIES.reduce(
    (sum, p) => sum + p.swipe_right_count,
    0
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Mis anuncios</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/owner/publish')}
        >
          <Ionicons name="add" size={24} color={Colors.ctaText} />
        </TouchableOpacity>
      </View>

      {/* Stats overview */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalViews}</Text>
          <Text style={styles.statLabel}>Impresiones</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalSwipes}</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MY_PROPERTIES.length}</Text>
          <Text style={styles.statLabel}>Anuncios</Text>
        </View>
      </View>

      {/* Properties list */}
      <View style={styles.propertiesList}>
        {MY_PROPERTIES.map((property) => (
          <TouchableOpacity
            key={property.id}
            style={styles.propertyCard}
            onPress={() => router.push(`/property/${property.id}`)}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: property.images[0] }}
              style={styles.propertyImage}
              contentFit="cover"
            />
            <View style={styles.propertyInfo}>
              <View style={styles.propertyHeader}>
                <Text style={styles.propertyTitle} numberOfLines={1}>
                  {property.title}
                </Text>
                {property.is_boosted && (
                  <View style={styles.boostBadge}>
                    <Ionicons name="flash" size={12} color={Colors.premium} />
                    <Text style={styles.boostText}>Boost</Text>
                  </View>
                )}
              </View>
              <Text style={styles.propertyLocation}>
                {property.city}, {property.province}
              </Text>

              {/* Mini stats */}
              <View style={styles.miniStats}>
                <View style={styles.miniStat}>
                  <Ionicons name="eye-outline" size={14} color={Colors.textMuted} />
                  <Text style={styles.miniStatText}>{property.view_count}</Text>
                </View>
                <View style={styles.miniStat}>
                  <Ionicons name="heart-outline" size={14} color={Colors.textMuted} />
                  <Text style={styles.miniStatText}>{property.swipe_right_count}</Text>
                </View>
                <View style={styles.miniStat}>
                  <Ionicons name="close-outline" size={14} color={Colors.textMuted} />
                  <Text style={styles.miniStatText}>{property.swipe_left_count}</Text>
                </View>
              </View>
            </View>

            <View style={styles.propertyActions}>
              <TouchableOpacity
                style={styles.boostBtn}
                onPress={() => router.push(`/owner/boost?propertyId=${property.id}`)}
              >
                <Ionicons name="flash-outline" size={18} color={Colors.premium} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push(`/owner/edit/${property.id}`)}
              >
                <Ionicons name="create-outline" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cta,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  propertiesList: {
    padding: 20,
    gap: 12,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  boostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.premium + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  boostText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.premium,
  },
  propertyLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  miniStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  miniStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  miniStatText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  propertyActions: {
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  boostBtn: {
    padding: 4,
  },
});
