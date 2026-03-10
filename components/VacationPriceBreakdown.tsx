import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../lib/constants';

interface VacationPriceBreakdownProps {
  pricePerNight: number;
}

export function VacationPriceBreakdown({ pricePerNight }: VacationPriceBreakdownProps) {
  const [nights, setNights] = useState('5');

  const numNights = parseInt(nights) || 1;
  const subtotal = pricePerNight * numNights;
  const cleaningFee = 65;
  const touristTax = numNights * 2.5;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + touristTax + serviceFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desglose de precio</Text>

      <View style={styles.nightsRow}>
        <Text style={styles.nightsLabel}>Noches</Text>
        <TextInput
          style={styles.nightsInput}
          value={nights}
          onChangeText={setNights}
          keyboardType="number-pad"
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <View style={styles.breakdown}>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>
            {pricePerNight}€ x {numNights} noche{numNights !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.breakdownValue}>{subtotal}€</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Limpieza</Text>
          <Text style={styles.breakdownValue}>{cleaningFee}€</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Tasa turística</Text>
          <Text style={styles.breakdownValue}>{touristTax.toFixed(0)}€</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Gastos de gestión</Text>
          <Text style={styles.breakdownValue}>{serviceFee}€</Text>
        </View>
        <View style={[styles.breakdownRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total}€</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  nightsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nightsLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  nightsInput: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    width: 60,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  breakdown: {
    gap: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
});
