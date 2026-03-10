import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';
import { SUBSCRIPTION_PLANS } from '../../lib/stripe';
import { Button } from '../../components/ui/Button';

export default function BillingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [currentPlan] = useState('free');

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Planes y facturación</Text>
      </View>

      <Text style={styles.subtitle}>
        Elige el plan que mejor se adapte a tus necesidades
      </Text>

      {/* Plans */}
      <View style={styles.plansList}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const isRecommended = plan.recommended;

          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                isRecommended && styles.planCardRecommended,
                isCurrent && styles.planCardCurrent,
              ]}
            >
              {isRecommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>RECOMENDADO</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPriceRow}>
                  <Text style={styles.planPrice}>
                    {plan.price === 0 ? 'Gratis' : `${plan.price}€`}
                  </Text>
                  {plan.price > 0 && (
                    <Text style={styles.planPeriod}>/mes</Text>
                  )}
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={isRecommended ? Colors.vacation : Colors.like}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {isCurrent ? (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>Plan actual</Text>
                </View>
              ) : (
                <Button
                  title={plan.price === 0 ? 'Plan actual' : 'Elegir plan'}
                  onPress={() => {
                    // TODO: Stripe checkout
                  }}
                  variant={isRecommended ? 'primary' : 'outline'}
                  disabled={plan.price === 0}
                />
              )}
            </View>
          );
        })}
      </View>

      <Text style={styles.disclaimer}>
        Los planes se facturan mensualmente. Puedes cancelar en cualquier momento.
        IVA no incluido.
      </Text>

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
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  plansList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  planCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    gap: 16,
  },
  planCardRecommended: {
    borderColor: Colors.vacation,
  },
  planCardCurrent: {
    borderColor: Colors.like,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: Colors.vacation,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  planPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  planPeriod: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  planFeatures: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
  },
  currentBadge: {
    alignSelf: 'center',
    backgroundColor: Colors.like + '15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.like,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
    lineHeight: 18,
  },
});
