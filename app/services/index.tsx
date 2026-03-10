import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';
import { ServiceCard, type ServiceItem } from '../../components/ServiceCard';

const SERVICES: ServiceItem[] = [
  {
    id: 'full_management',
    icon: 'key-outline',
    title: 'Gestión integral de alquiler vacacional',
    description:
      'Nos encargamos de todo: publicación en OTAs, pricing dinámico, reservas, check-in/out, limpieza y atención al huésped 24/7.',
    price: 'Comisión del 20%',
    category: 'vacation',
  },
  {
    id: 'contract_management',
    icon: 'document-text-outline',
    title: 'Gestión de contrato de alquiler',
    description:
      'Redacción del contrato, firma digital, gestión de fianza, inventario y alta de suministros.',
    price: 'Desde 299€',
    category: 'rent',
  },
  {
    id: 'buy_sell_process',
    icon: 'swap-horizontal-outline',
    title: 'Tramitación de compraventa',
    description:
      'Coordinación con notaría, registro de la propiedad, liquidación de ITP y gestión documental completa.',
    price: '3-5% del precio',
    category: 'buy',
  },
  {
    id: 'fiscal_advisory',
    icon: 'calculator-outline',
    title: 'Asesoría fiscal para rentas turísticas',
    description:
      'Declaraciones trimestrales, modelo 210 para no residentes, optimización fiscal de rentas del alquiler.',
    price: 'Desde 149€/trimestre',
    category: 'general',
  },
  {
    id: 'photography',
    icon: 'camera-outline',
    title: 'Fotografía profesional',
    description:
      'Sesión fotográfica profesional con fotógrafo especializado en inmobiliaria. Incluye retoque y entrega en 48h.',
    price: 'Desde 199€',
    category: 'general',
  },
  {
    id: 'keyless_entry',
    icon: 'lock-open-outline',
    title: 'Smart Lock / Keyless Entry',
    description:
      'Instalación de cerradura inteligente con acceso por código. Compatible con Nuki, Yale y TTLock.',
    price: 'Desde 249€ + dispositivo',
    category: 'vacation',
  },
];

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleServicePress = (service: ServiceItem) => {
    router.push(`/services/request?serviceId=${service.id}&title=${encodeURIComponent(service.title)}`);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={Colors.text}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Servicios Costa Key</Text>
      </View>

      <Text style={styles.subtitle}>
        Servicios profesionales de gestión inmobiliaria para propietarios
      </Text>

      {/* Costa Key badge */}
      <View style={styles.costaKeyBadge}>
        <Ionicons name="shield-checkmark" size={20} color={Colors.like} />
        <View style={styles.costaKeyInfo}>
          <Text style={styles.costaKeyTitle}>Costa Key Real Estate</Text>
          <Text style={styles.costaKeyDesc}>
            Gestora de alquiler vacacional en la costa española. +18 propiedades en gestión activa.
          </Text>
        </View>
      </View>

      {/* Services list */}
      <View style={styles.servicesList}>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onPress={() => handleServicePress(service)}
          />
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
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
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
    lineHeight: 20,
  },
  costaKeyBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    margin: 20,
    padding: 16,
    backgroundColor: Colors.like + '10',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.like + '30',
  },
  costaKeyInfo: {
    flex: 1,
  },
  costaKeyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  costaKeyDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  servicesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
});
