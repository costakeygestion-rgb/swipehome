import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { MortgageCalculator } from '../../components/MortgageCalculator';
import { VacationPriceBreakdown } from '../../components/VacationPriceBreakdown';
import {
  Colors,
  PropertyTypeColors,
  PropertyTypeLabels,
  PriceUnitLabels,
} from '../../lib/constants';
import { Badge } from '../../components/ui/Badge';
import { SEED_PROPERTIES } from '../../lib/seedData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const property = SEED_PROPERTIES.find((p) => p.id === id);
  if (!property) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Propiedad no encontrada</Text>
      </View>
    );
  }

  const formatPrice = () => {
    if (property.price_unit === 'sale') {
      return property.price >= 1000000
        ? `${(property.price / 1000000).toFixed(1)}M €`
        : `${Math.round(property.price / 1000)}K €`;
    }
    return `${property.price}€${PriceUnitLabels[property.price_unit]}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.gallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SCREEN_WIDTH
              );
              setCurrentImageIndex(index);
            }}
          >
            {property.images.map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={styles.galleryImage}
                contentFit="cover"
              />
            ))}
          </ScrollView>

          {/* Close button */}
          <TouchableOpacity
            style={[styles.closeBtn, { top: insets.top + 8 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={22} color={Colors.text} />
          </TouchableOpacity>

          {/* Dots */}
          <View style={styles.galleryDots}>
            {property.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.galleryDot,
                  i === currentImageIndex && styles.galleryDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Price + Badge */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice()}</Text>
            <Badge
              label={PropertyTypeLabels[property.type]}
              color={PropertyTypeColors[property.type]}
              size="md"
            />
          </View>

          {/* Title + Location */}
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.location}>
            📍 {property.address}, {property.city}, {property.province}
          </Text>

          {/* Specs */}
          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <Ionicons name="bed-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.specValue}>{property.bedrooms}</Text>
              <Text style={styles.specLabel}>Hab.</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specItem}>
              <Ionicons name="water-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.specValue}>{property.bathrooms}</Text>
              <Text style={styles.specLabel}>Baños</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specItem}>
              <Ionicons name="resize-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.specValue}>{property.sqm}</Text>
              <Text style={styles.specLabel}>m²</Text>
            </View>
            {property.max_guests && (
              <>
                <View style={styles.specDivider} />
                <View style={styles.specItem}>
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={Colors.textSecondary}
                  />
                  <Text style={styles.specValue}>{property.max_guests}</Text>
                  <Text style={styles.specLabel}>Huésp.</Text>
                </View>
              </>
            )}
          </View>

          {/* Description */}
          {property.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text
                style={styles.description}
                numberOfLines={showFullDescription ? undefined : 3}
              >
                {property.description}
              </Text>
              {property.description.length > 120 && (
                <TouchableOpacity
                  onPress={() => setShowFullDescription(!showFullDescription)}
                >
                  <Text style={styles.readMore}>
                    {showFullDescription ? 'Leer menos' : 'Leer más'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity) => (
                <View key={amenity} style={styles.amenityItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={Colors.like}
                  />
                  <Text style={styles.amenityLabel}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Vacation-specific info */}
          {property.type === 'vacation' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información de estancia</Text>
              <View style={styles.infoGrid}>
                {property.min_nights && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Mínimo noches</Text>
                    <Text style={styles.infoValue}>{property.min_nights}</Text>
                  </View>
                )}
                {property.checkin_time && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Check-in</Text>
                    <Text style={styles.infoValue}>{property.checkin_time}</Text>
                  </View>
                )}
                {property.checkout_time && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Check-out</Text>
                    <Text style={styles.infoValue}>{property.checkout_time}</Text>
                  </View>
                )}
                {property.tourist_license && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Licencia</Text>
                    <Text style={styles.infoValue}>{property.tourist_license}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Vacation Price Breakdown */}
          {property.type === 'vacation' && (
            <View style={styles.section}>
              <VacationPriceBreakdown pricePerNight={property.price} />
            </View>
          )}

          {/* Mortgage Calculator */}
          {property.type === 'buy' && (
            <View style={styles.section}>
              <MortgageCalculator propertyPrice={property.price} />
            </View>
          )}

          {/* Manager */}
          {property.managed_by && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Gestor</Text>
              <View style={styles.managerCard}>
                <View style={styles.managerAvatar}>
                  <Ionicons name="business" size={20} color={Colors.textSecondary} />
                </View>
                <View>
                  <Text style={styles.managerName}>{property.managed_by}</Text>
                  <View style={styles.partnerBadge}>
                    <Text style={styles.partnerBadgeText}>Partner verificado</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity style={styles.heartBtn}>
          <Ionicons name="heart-outline" size={24} color={Colors.pass} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn} activeOpacity={0.8}>
          <Text style={styles.contactBtnText}>Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  gallery: {
    height: SCREEN_WIDTH * 0.85,
    backgroundColor: Colors.border,
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
  },
  closeBtn: {
    position: 'absolute',
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  galleryDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  galleryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  galleryDotActive: {
    backgroundColor: '#FFFFFF',
    width: 18,
  },
  content: {
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 8,
    lineHeight: 28,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  specValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  specLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  specDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.vacation,
    marginTop: 8,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '45%',
  },
  amenityLabel: {
    fontSize: 14,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: '45%',
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 4,
  },
  managerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  managerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  managerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  partnerBadge: {
    backgroundColor: Colors.like + '20',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  partnerBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.like,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  heartBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.cta,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.ctaText,
  },
  shareBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
