import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  FadeIn,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Colors, PriceUnitLabels } from '../lib/constants';
import { Button } from './ui/Button';
import type { Property } from '../lib/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MatchPopupProps {
  property: Property;
  onContact: () => void;
  onContinue: () => void;
}

export function MatchPopup({ property, onContact, onContinue }: MatchPopupProps) {
  const titleScale = useSharedValue(0.3);
  const imageTranslateY = useSharedValue(50);
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    titleScale.value = withSpring(1, { damping: 12, stiffness: 150 });
    imageTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));
    imageOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imageTranslateY.value }],
    opacity: imageOpacity.value,
  }));

  const formatPrice = () => {
    if (property.price_unit === 'sale') {
      return property.price >= 1000000
        ? `${(property.price / 1000000).toFixed(1)}M €`
        : `${Math.round(property.price / 1000)}K €`;
    }
    return `${property.price}€${PriceUnitLabels[property.price_unit]}`;
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.overlay}>
      <View style={styles.backdrop} />
      <View style={styles.content}>
        <Animated.View style={titleStyle}>
          <Text style={styles.matchText}>Match!</Text>
        </Animated.View>

        <Animated.View style={[styles.propertyCard, imageStyle]}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.propertyImage}
            contentFit="cover"
          />
        </Animated.View>

        <Animated.View style={imageStyle}>
          <Text style={styles.propertyPrice}>{formatPrice()}</Text>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Text style={styles.propertyLocation}>
            {property.city}, {property.province}
          </Text>
        </Animated.View>

        <View style={styles.actions}>
          <Button title="Contactar" onPress={onContact} size="lg" style={styles.contactBtn} />
          <Pressable onPress={onContinue} style={styles.continueBtn}>
            <Text style={styles.continueBtnText}>Seguir descubriendo</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  matchText: {
    fontSize: 52,
    fontWeight: '800',
    color: Colors.vacation,
    letterSpacing: -2,
    marginBottom: 32,
  },
  propertyCard: {
    width: SCREEN_WIDTH * 0.65,
    height: SCREEN_WIDTH * 0.65,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
    marginBottom: 24,
  },
  propertyImage: {
    flex: 1,
  },
  propertyPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -1,
  },
  propertyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
  propertyLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 32,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  contactBtn: {
    backgroundColor: '#FFFFFF',
  },
  continueBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueBtnText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    fontWeight: '500',
  },
});
