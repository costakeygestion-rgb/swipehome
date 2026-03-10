import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../lib/constants';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [years, setYears] = useState('25');
  const [interestRate, setInterestRate] = useState('3.5');

  const result = useMemo(() => {
    const dp = (parseFloat(downPaymentPct) || 0) / 100;
    const principal = propertyPrice * (1 - dp);
    const monthlyRate = (parseFloat(interestRate) || 0) / 100 / 12;
    const numPayments = (parseInt(years) || 25) * 12;

    if (monthlyRate === 0) {
      return { monthly: principal / numPayments, total: principal, interest: 0 };
    }

    const monthly =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const total = monthly * numPayments;
    const interest = total - principal;

    return { monthly, total, interest };
  }, [propertyPrice, downPaymentPct, years, interestRate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de hipoteca</Text>

      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Entrada (%)</Text>
          <TextInput
            style={styles.input}
            value={downPaymentPct}
            onChangeText={setDownPaymentPct}
            keyboardType="numeric"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Años</Text>
          <TextInput
            style={styles.input}
            value={years}
            onChangeText={setYears}
            keyboardType="numeric"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Interés (%)</Text>
          <TextInput
            style={styles.input}
            value={interestRate}
            onChangeText={setInterestRate}
            keyboardType="numeric"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Cuota mensual estimada</Text>
        <Text style={styles.resultValue}>
          {isFinite(result.monthly)
            ? `${Math.round(result.monthly).toLocaleString('es-ES')}€/mes`
            : '—'}
        </Text>
      </View>

      <View style={styles.breakdown}>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Precio del inmueble</Text>
          <Text style={styles.breakdownValue}>
            {propertyPrice.toLocaleString('es-ES')}€
          </Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>
            Entrada ({downPaymentPct}%)
          </Text>
          <Text style={styles.breakdownValue}>
            {Math.round(
              propertyPrice * ((parseFloat(downPaymentPct) || 0) / 100)
            ).toLocaleString('es-ES')}
            €
          </Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Importe financiado</Text>
          <Text style={styles.breakdownValue}>
            {Math.round(
              propertyPrice * (1 - (parseFloat(downPaymentPct) || 0) / 100)
            ).toLocaleString('es-ES')}
            €
          </Text>
        </View>
        <View style={[styles.breakdownRow, styles.breakdownRowTotal]}>
          <Text style={styles.breakdownLabel}>Total intereses</Text>
          <Text style={styles.breakdownValueMuted}>
            {isFinite(result.interest)
              ? `${Math.round(result.interest).toLocaleString('es-ES')}€`
              : '—'}
          </Text>
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
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultCard: {
    backgroundColor: Colors.buy + '10',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.buy,
    letterSpacing: -1,
    marginTop: 4,
  },
  breakdown: {
    marginTop: 16,
    gap: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownRowTotal: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
    marginTop: 4,
  },
  breakdownLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  breakdownValueMuted: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});
