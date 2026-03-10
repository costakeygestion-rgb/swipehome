import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';
import { BOOST_OPTIONS } from '../../lib/stripe';
import { Button } from '../../components/ui/Button';

export default function BoostScreen() {
  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedBoost, setSelectedBoost] = useState<string>(BOOST_OPTIONS[1].id);

  const handlePurchase = () => {
    // TODO: Stripe payment flow
    Alert.alert(
      'Boost activado',
      'Tu propiedad aparecerá primero en el feed durante el período seleccionado.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const selected = BOOST_OPTIONS.find((b) => b.id === selectedBoost)!;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Boost</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.boostIcon}>
          <Ionicons name="flash" size={48} color={Colors.premium} />
        </View>
        <Text style={styles.title}>Destaca tu propiedad</Text>
        <Text style={styles.subtitle}>
          Tu anuncio aparecerá primero en el stack de swipe de todos los usuarios en tu zona.
          Más visibilidad = más matches.
        </Text>

        {/* Options */}
        <View style={styles.options}>
          {BOOST_OPTIONS.map((option) => {
            const isSelected = selectedBoost === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, isSelected && styles.optionCardActive]}
                onPress={() => setSelectedBoost(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelActive]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.optionHours, isSelected && styles.optionHoursActive]}>
                    {option.hours}h de visibilidad premium
                  </Text>
                </View>
                <Text style={[styles.optionPrice, isSelected && styles.optionPriceActive]}>
                  {option.price}€
                </Text>
                <View
                  style={[styles.radio, isSelected && styles.radioActive]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Stats preview */}
        <View style={styles.statsPreview}>
          <View style={styles.statItem}>
            <Text style={styles.statMultiplier}>3x</Text>
            <Text style={styles.statDesc}>más impresiones</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statMultiplier}>2.5x</Text>
            <Text style={styles.statDesc}>más matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statMultiplier}>5x</Text>
            <Text style={styles.statDesc}>más contactos</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <View style={[styles.bottomAction, { paddingBottom: insets.bottom + 12 }]}>
        <Button
          title={`Activar boost · ${selected.price}€`}
          onPress={handlePurchase}
          size="lg"
          style={{ flex: 1 }}
        />
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  boostIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.premium + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 20,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  options: {
    width: '100%',
    gap: 10,
    marginTop: 28,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 12,
  },
  optionCardActive: {
    borderColor: Colors.premium,
    backgroundColor: Colors.premium + '08',
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  optionLabelActive: {
    color: Colors.text,
  },
  optionHours: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  optionHoursActive: {
    color: Colors.textSecondary,
  },
  optionPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  optionPriceActive: {
    color: Colors.premium,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: Colors.premium,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.premium,
  },
  statsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statMultiplier: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.premium,
    letterSpacing: -1,
  },
  statDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  bottomAction: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
