import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';

interface SettingsRowProps {
  icon: string;
  label: string;
  onPress?: () => void;
  badge?: string;
}

function SettingsRow({ icon, label, onPress, badge }: SettingsRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.6}>
      <Ionicons name={icon as any} size={22} color={Colors.text} />
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        {badge && (
          <View style={styles.rowBadge}>
            <Text style={styles.rowBadgeText}>{badge}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color={Colors.textMuted} />
        </View>
        <Text style={styles.name}>Usuario</Text>
        <Text style={styles.accountType}>Cuenta gratuita</Text>
      </View>

      {/* Mi cuenta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MI CUENTA</Text>
        <View style={styles.sectionContent}>
          <SettingsRow icon="person-outline" label="Datos personales" />
          <SettingsRow icon="search-outline" label="Preferencias de búsqueda" />
          <SettingsRow icon="notifications-outline" label="Notificaciones" />
          <SettingsRow icon="language-outline" label="Idioma" badge="ES" />
        </View>
      </View>

      {/* Propietarios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROPIETARIOS</Text>
        <View style={styles.sectionContent}>
          <SettingsRow icon="add-circle-outline" label="Publicar inmueble" />
          <SettingsRow icon="home-outline" label="Mis anuncios" />
          <SettingsRow icon="bar-chart-outline" label="Estadísticas" />
          <SettingsRow icon="diamond-outline" label="Plan Premium" />
        </View>
      </View>

      {/* Servicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SERVICIOS COSTA KEY</Text>
        <View style={styles.sectionContent}>
          <SettingsRow icon="key-outline" label="Gestión de alquiler" />
          <SettingsRow icon="document-text-outline" label="Trámites de compraventa" />
          <SettingsRow icon="calculator-outline" label="Asesoría fiscal" />
          <SettingsRow icon="camera-outline" label="Fotografía profesional" />
        </View>
      </View>

      {/* Soporte */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SOPORTE</Text>
        <View style={styles.sectionContent}>
          <SettingsRow icon="help-circle-outline" label="Centro de ayuda" />
          <SettingsRow icon="mail-outline" label="Contacto" />
          <SettingsRow icon="shield-checkmark-outline" label="Términos y condiciones" />
          <SettingsRow icon="lock-closed-outline" label="Privacidad" />
        </View>
      </View>

      <Text style={styles.footer}>SwipeHome v1.0 · Powered by Costa Key</Text>
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
    alignItems: 'center',
    paddingVertical: 28,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
  },
  accountType: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowBadge: {
    backgroundColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rowBadgeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 16,
  },
});
