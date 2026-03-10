import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, PropertyTypeColors, PropertyTypeLabels } from '../../lib/constants';
import { Button } from '../../components/ui/Button';
import type { PropertyType, PriceUnit } from '../../lib/types';

const STEPS = ['Tipo', 'Datos', 'Precio', 'Fotos', 'Publicar'];

const AMENITY_OPTIONS = [
  { id: 'wifi', label: 'WiFi', icon: 'wifi' },
  { id: 'pool', label: 'Piscina', icon: 'water' },
  { id: 'ac', label: 'Aire acondicionado', icon: 'snow' },
  { id: 'parking', label: 'Parking', icon: 'car' },
  { id: 'terrace', label: 'Terraza', icon: 'sunny' },
  { id: 'garden', label: 'Jardín', icon: 'leaf' },
  { id: 'gym', label: 'Gimnasio', icon: 'barbell' },
  { id: 'pets', label: 'Mascotas', icon: 'paw' },
  { id: 'washer', label: 'Lavadora', icon: 'water' },
  { id: 'kitchen', label: 'Cocina', icon: 'restaurant' },
  { id: 'tv', label: 'TV', icon: 'tv' },
  { id: 'elevator', label: 'Ascensor', icon: 'arrow-up' },
  { id: 'furnished', label: 'Amueblado', icon: 'bed' },
  { id: 'storage', label: 'Trastero', icon: 'cube' },
  { id: 'security', label: 'Seguridad', icon: 'shield-checkmark' },
  { id: 'beach', label: 'Cerca playa', icon: 'umbrella' },
];

export default function PublishScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Form state
  const [type, setType] = useState<PropertyType>('vacation');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('1');
  const [sqm, setSqm] = useState('');
  const [maxGuests, setMaxGuests] = useState('4');
  const [price, setPrice] = useState('');
  const [minNights, setMinNights] = useState('2');
  const [touristLicense, setTouristLicense] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);

  const priceUnit: PriceUnit =
    type === 'vacation' ? 'night' : type === 'rent' ? 'month' : 'sale';

  const toggleAmenity = (id: string) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handlePublish = () => {
    // TODO: Save to Supabase
    Alert.alert(
      'Inmueble publicado',
      'Tu propiedad ha sido publicada correctamente y aparecerá en el feed de SwipeHome.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const types: PropertyType[] = ['vacation', 'rent', 'buy'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (step > 0 ? setStep(step - 1) : router.back())}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Publicar inmueble</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        {STEPS.map((s, i) => (
          <View
            key={s}
            style={[
              styles.progressDot,
              i <= step && { backgroundColor: Colors.cta },
            ]}
          />
        ))}
      </View>
      <Text style={styles.stepLabel}>
        {step + 1}/{STEPS.length} — {STEPS[step]}
      </Text>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 0: Type */}
        {step === 0 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>¿Qué tipo de inmueble quieres publicar?</Text>
            <View style={styles.typeCards}>
              {types.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.typeCard,
                    type === t && {
                      borderColor: PropertyTypeColors[t],
                      backgroundColor: PropertyTypeColors[t] + '10',
                    },
                  ]}
                  onPress={() => setType(t)}
                >
                  <Ionicons
                    name={
                      t === 'vacation'
                        ? 'sunny-outline'
                        : t === 'rent'
                        ? 'key-outline'
                        : 'home-outline'
                    }
                    size={32}
                    color={type === t ? PropertyTypeColors[t] : Colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.typeCardLabel,
                      type === t && { color: PropertyTypeColors[t] },
                    ]}
                  >
                    {PropertyTypeLabels[t]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 1: Basic data */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Datos del inmueble</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Título del anuncio *</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Ej: Villa con piscina frente al mar"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe tu inmueble..."
                placeholderTextColor={Colors.textMuted}
                multiline
                textAlignVertical="top"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Dirección *</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Calle, número"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Ciudad *</Text>
                <TextInput
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                  placeholder="Calpe"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Provincia *</Text>
                <TextInput
                  style={styles.input}
                  value={province}
                  onChangeText={setProvince}
                  placeholder="Alicante"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Habitaciones</Text>
                <TextInput
                  style={styles.input}
                  value={bedrooms}
                  onChangeText={setBedrooms}
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Baños</Text>
                <TextInput
                  style={styles.input}
                  value={bathrooms}
                  onChangeText={setBathrooms}
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>m²</Text>
                <TextInput
                  style={styles.input}
                  value={sqm}
                  onChangeText={setSqm}
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>
            </View>
          </View>
        )}

        {/* Step 2: Price */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Precio y condiciones</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Precio (€/{priceUnit === 'night' ? 'noche' : priceUnit === 'month' ? 'mes' : 'venta'}) *
              </Text>
              <TextInput
                style={[styles.input, styles.priceInput]}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder={
                  priceUnit === 'night' ? '150' : priceUnit === 'month' ? '900' : '250000'
                }
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            {type === 'vacation' && (
              <>
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Mín. noches</Text>
                    <TextInput
                      style={styles.input}
                      value={minNights}
                      onChangeText={setMinNights}
                      keyboardType="number-pad"
                      placeholderTextColor={Colors.textMuted}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Máx. huéspedes</Text>
                    <TextInput
                      style={styles.input}
                      value={maxGuests}
                      onChangeText={setMaxGuests}
                      keyboardType="number-pad"
                      placeholderTextColor={Colors.textMuted}
                    />
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Licencia turística</Text>
                  <TextInput
                    style={styles.input}
                    value={touristLicense}
                    onChangeText={setTouristLicense}
                    placeholder="VT-XXXXXX"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>
              </>
            )}

            {/* Amenities */}
            <Text style={[styles.label, { marginTop: 20 }]}>Servicios y equipamiento</Text>
            <View style={styles.amenitiesGrid}>
              {AMENITY_OPTIONS.map((a) => {
                const selected = amenities.includes(a.id);
                return (
                  <TouchableOpacity
                    key={a.id}
                    style={[styles.amenityToggle, selected && styles.amenityToggleActive]}
                    onPress={() => toggleAmenity(a.id)}
                  >
                    <Ionicons
                      name={a.icon as any}
                      size={18}
                      color={selected ? Colors.ctaText : Colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.amenityToggleText,
                        selected && styles.amenityToggleTextActive,
                      ]}
                    >
                      {a.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Fotografías</Text>
            <Text style={styles.stepSubtitle}>
              Sube entre 3 y 15 fotos de tu inmueble. La primera será la imagen principal.
            </Text>
            <TouchableOpacity style={styles.uploadArea}>
              <Ionicons name="cloud-upload-outline" size={48} color={Colors.textMuted} />
              <Text style={styles.uploadText}>Pulsa para subir fotos</Text>
              <Text style={styles.uploadHint}>JPG, PNG · Máximo 10MB por foto</Text>
            </TouchableOpacity>

            <View style={styles.photoTips}>
              <Text style={styles.tipTitle}>Consejos para mejores fotos</Text>
              <Text style={styles.tipText}>• Usa luz natural, preferiblemente por la mañana</Text>
              <Text style={styles.tipText}>• Fotografía todas las habitaciones</Text>
              <Text style={styles.tipText}>• Incluye vistas exteriores y zonas comunes</Text>
              <Text style={styles.tipText}>• Mantén el espacio limpio y ordenado</Text>
            </View>
          </View>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Resumen del anuncio</Text>

            <View style={styles.previewCard}>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Tipo</Text>
                <Text style={[styles.previewValue, { color: PropertyTypeColors[type] }]}>
                  {PropertyTypeLabels[type]}
                </Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Título</Text>
                <Text style={styles.previewValue}>{title || '—'}</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Ubicación</Text>
                <Text style={styles.previewValue}>
                  {city && province ? `${city}, ${province}` : '—'}
                </Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Precio</Text>
                <Text style={styles.previewValue}>
                  {price
                    ? `${price}€/${priceUnit === 'night' ? 'noche' : priceUnit === 'month' ? 'mes' : 'venta'}`
                    : '—'}
                </Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Características</Text>
                <Text style={styles.previewValue}>
                  {bedrooms} hab · {bathrooms} baños · {sqm || '—'}m²
                </Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Servicios</Text>
                <Text style={styles.previewValue}>
                  {amenities.length > 0 ? amenities.join(', ') : 'Ninguno seleccionado'}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom action */}
      <View style={[styles.bottomAction, { paddingBottom: insets.bottom + 12 }]}>
        {step < 4 ? (
          <Button title="Siguiente" onPress={() => setStep(step + 1)} size="lg" style={{ flex: 1 }} />
        ) : (
          <Button title="Publicar inmueble" onPress={handlePublish} size="lg" style={{ flex: 1 }} />
        )}
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
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  stepLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  scrollContent: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  stepSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
    marginTop: -12,
  },
  typeCards: {
    gap: 12,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  typeCardLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
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
  priceInput: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -1,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  amenityToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  amenityToggleActive: {
    backgroundColor: Colors.cta,
    borderColor: Colors.cta,
  },
  amenityToggleText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  amenityToggleTextActive: {
    color: Colors.ctaText,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  uploadHint: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  photoTips: {
    marginTop: 24,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  previewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  previewValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
