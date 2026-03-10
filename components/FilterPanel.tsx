import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import {
  Colors,
  PropertyTypeColors,
  PropertyTypeLabels,
  FILTER_PRICE_RANGES,
  ZONES,
} from '../lib/constants';
import { useFilterStore } from '../stores/filterStore';
import { Button } from './ui/Button';
import type { PropertyType } from '../lib/types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FilterPanelProps {
  onClose: () => void;
}

export function FilterPanel({ onClose }: FilterPanelProps) {
  const { filters, setType, setZone, setPriceRange, setBedrooms } = useFilterStore();

  const types: PropertyType[] = ['vacation', 'rent', 'buy'];
  const bedroomOptions = [null, 1, 2, 3, 4];
  const priceRanges = FILTER_PRICE_RANGES[filters.type];

  return (
    <>
      <Animated.View entering={FadeIn.duration(200)} style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View entering={SlideInDown.springify().damping(20)} style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Filtros</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
          {/* Type */}
          <Text style={styles.sectionLabel}>TIPO</Text>
          <View style={styles.row}>
            {types.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeBtn,
                  filters.type === type && {
                    backgroundColor: PropertyTypeColors[type],
                    borderColor: PropertyTypeColors[type],
                  },
                ]}
                onPress={() => setType(type)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    filters.type === type && styles.typeBtnTextActive,
                  ]}
                >
                  {PropertyTypeLabels[type]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Zone */}
          <Text style={styles.sectionLabel}>ZONA</Text>
          <View style={styles.pillsRow}>
            {ZONES.map((zone) => (
              <TouchableOpacity
                key={zone}
                style={[styles.pill, filters.zone === zone && styles.pillActive]}
                onPress={() => setZone(zone)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.pillText,
                    filters.zone === zone && styles.pillTextActive,
                  ]}
                >
                  {zone}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price */}
          <Text style={styles.sectionLabel}>PRECIO</Text>
          <View style={styles.pillsRow}>
            {priceRanges.map((range) => {
              const isActive =
                filters.priceRange.min === range.min &&
                filters.priceRange.max === range.max;
              return (
                <TouchableOpacity
                  key={range.label}
                  style={[styles.pill, isActive && styles.pillActive]}
                  onPress={() => setPriceRange(range.min, range.max)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bedrooms */}
          <Text style={styles.sectionLabel}>HABITACIONES</Text>
          <View style={styles.row}>
            {bedroomOptions.map((option) => {
              const isActive = filters.bedrooms === option;
              const label = option === null ? 'Todas' : option === 4 ? '4+' : `${option}`;
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.bedroomBtn, isActive && styles.bedroomBtnActive]}
                  onPress={() => setBedrooms(option)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.bedroomBtnText,
                      isActive && styles.bedroomBtnTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Aplicar filtros" onPress={onClose} size="lg" style={styles.applyBtn} />
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 50,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: SCREEN_HEIGHT * 0.75,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 51,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 16,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 10,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  pillActive: {
    backgroundColor: Colors.cta,
    borderColor: Colors.cta,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.ctaText,
  },
  bedroomBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  bedroomBtnActive: {
    backgroundColor: Colors.cta,
    borderColor: Colors.cta,
  },
  bedroomBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  bedroomBtnTextActive: {
    color: Colors.ctaText,
  },
  footer: {
    padding: 20,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  applyBtn: {
    width: '100%',
  },
});
