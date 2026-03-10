import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, PriceUnitLabels } from '../lib/constants';
import type { PriceUnit } from '../lib/types';

interface PriceTagProps {
  price: number;
  priceUnit: PriceUnit;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceTag({ price, priceUnit, size = 'md' }: PriceTagProps) {
  const formatPrice = () => {
    if (priceUnit === 'sale') {
      if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M €`;
      return `${Math.round(price / 1000)}K €`;
    }
    return `${price.toLocaleString('es-ES')}€`;
  };

  const unit = priceUnit !== 'sale' ? PriceUnitLabels[priceUnit] : '';

  return (
    <View style={styles.container}>
      <Text style={[styles.price, styles[`price_${size}`]]}>{formatPrice()}</Text>
      {unit ? <Text style={[styles.unit, styles[`unit_${size}`]]}>{unit}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  price_sm: { fontSize: 18 },
  price_md: { fontSize: 24 },
  price_lg: { fontSize: 32 },
  unit: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  unit_sm: { fontSize: 12 },
  unit_md: { fontSize: 14 },
  unit_lg: { fontSize: 16 },
});
