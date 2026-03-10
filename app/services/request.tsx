import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';
import { Button } from '../../components/ui/Button';

export default function ServiceRequestScreen() {
  const { serviceId, title } = useLocalSearchParams<{
    serviceId: string;
    title: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !phone) {
      Alert.alert('Campos requeridos', 'Por favor, introduce tu nombre y teléfono');
      return;
    }
    // TODO: Save to Supabase service_requests table
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={[styles.container, styles.successContainer, { paddingTop: insets.top }]}>
        <Ionicons name="checkmark-circle" size={80} color={Colors.like} />
        <Text style={styles.successTitle}>Solicitud enviada</Text>
        <Text style={styles.successSubtitle}>
          Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.
        </Text>
        <Button title="Volver" onPress={() => router.back()} style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={Colors.text}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Solicitar servicio</Text>
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{title || 'Servicio'}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre completo *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Teléfono de contacto *</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+34 600 000 000"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Notas adicionales</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Cuéntanos más sobre lo que necesitas..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Button
          title="Enviar solicitud"
          onPress={handleSubmit}
          size="lg"
          style={styles.submitBtn}
        />

        <Text style={styles.disclaimer}>
          Un miembro del equipo de Costa Key se pondrá en contacto contigo en un plazo máximo de 24 horas laborables.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 20,
  },
  successSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  serviceInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  form: {
    padding: 20,
    gap: 20,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 4,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  submitBtn: {
    marginTop: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
