import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, PropertyTypeColors, PropertyTypeLabels, PriceUnitLabels, SWIPE_THRESHOLD, ROTATION_FACTOR } from '../lib/constants';
import { Badge } from './ui/Badge';
import type { Property } from '../lib/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwipeCardProps {
  property: Property;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onPress: () => void;
  isTop: boolean;
  stackIndex: number;
}

export function SwipeCard({
  property,
  onSwipeLeft,
  onSwipeRight,
  onPress,
  isTop,
  stackIndex,
}: SwipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateX = useSharedValue(0);
  const isActive = useSharedValue(false);

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      onSwipeRight();
    } else {
      onSwipeLeft();
    }
  };

  const panGesture = Gesture.Pan()
    .enabled(isTop)
    .onStart(() => {
      isActive.value = true;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      isActive.value = false;
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        translateX.value = withSpring(
          direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5,
          { damping: 15, stiffness: 150 },
          () => {
            runOnJS(handleSwipeComplete)(direction);
          }
        );
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    if (!isTop) {
      const scale = 1 - stackIndex * 0.03;
      const translateY = stackIndex * 8;
      return {
        transform: [{ scale }, { translateY }],
        opacity: stackIndex < 3 ? 1 : 0,
      };
    }

    const rotation = translateX.value * ROTATION_FACTOR;
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  const likeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], 'clamp');
    return { opacity };
  });

  const passOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, -SWIPE_THRESHOLD], [0, 1], 'clamp');
    return { opacity };
  });

  const formatPrice = () => {
    if (property.price_unit === 'sale') {
      return property.price >= 1000000
        ? `${(property.price / 1000000).toFixed(1)}M €`
        : `${Math.round(property.price / 1000)}K €`;
    }
    return `${property.price}€${PriceUnitLabels[property.price_unit]}`;
  };

  const handleImageTap = (locationX: number) => {
    const half = SCREEN_WIDTH / 2;
    if (locationX < half && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (locationX >= half && currentImageIndex < property.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const specs = [
    `${property.bedrooms} hab`,
    `${property.bathrooms} baño${property.bathrooms !== 1 ? 's' : ''}`,
    `${property.sqm}m²`,
    ...(property.max_guests ? [`${property.max_guests} huésp.`] : []),
  ].join(' · ');

  const visibleAmenities = property.amenities.slice(0, 4);
  const extraAmenities = property.amenities.length - 4;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, cardStyle]}>
        <TouchableWithoutFeedback
          onPress={(e) => {
            if (isTop) handleImageTap(e.nativeEvent.locationX);
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: property.images[currentImageIndex] }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />

            {/* Image pagination dots */}
            <View style={styles.dotsContainer}>
              {property.images.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === currentImageIndex && styles.dotActive]}
                />
              ))}
            </View>

            {/* Type badge */}
            <View style={styles.badgeContainer}>
              <Badge
                label={PropertyTypeLabels[property.type]}
                color={PropertyTypeColors[property.type]}
              />
              {property.is_boosted && (
                <Badge label="⚡" color={Colors.premium} size="sm" />
              )}
            </View>

            {/* Swipe indicators */}
            {isTop && (
              <>
                <Animated.View style={[styles.swipeLabel, styles.likeLabel, likeOverlayStyle]}>
                  <Text style={[styles.swipeLabelText, { color: Colors.like }]}>
                    ME GUSTA
                  </Text>
                </Animated.View>
                <Animated.View style={[styles.swipeLabel, styles.passLabel, passOverlayStyle]}>
                  <Text style={[styles.swipeLabelText, { color: Colors.pass }]}>
                    PASO
                  </Text>
                </Animated.View>
              </>
            )}

            {/* Gradient + Info overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.75)']}
              style={styles.gradient}
            >
              <Pressable onPress={onPress} style={styles.infoContainer}>
                <Text style={styles.price}>{formatPrice()}</Text>
                <Text style={styles.title} numberOfLines={1}>
                  {property.title}
                </Text>
                <Text style={styles.location}>
                  📍 {property.city}, {property.province}
                </Text>
                <Text style={styles.specs}>{specs}</Text>
                <View style={styles.amenitiesRow}>
                  {visibleAmenities.map((amenity) => (
                    <View key={amenity} style={styles.amenityPill}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                  {extraAmenities > 0 && (
                    <View style={styles.amenityPill}>
                      <Text style={styles.amenityText}>+{extraAmenities}</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 24,
    height: '100%',
    left: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  dotsContainer: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 18,
    borderRadius: 3,
  },
  badgeContainer: {
    position: 'absolute',
    top: 28,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 80,
  },
  infoContainer: {
    padding: 20,
    paddingBottom: 24,
  },
  price: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  specs: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },
  amenitiesRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  amenityPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  amenityText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  swipeLabel: {
    position: 'absolute',
    top: 80,
    zIndex: 10,
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  likeLabel: {
    left: 24,
    borderColor: Colors.like,
    transform: [{ rotate: '-15deg' }],
  },
  passLabel: {
    right: 24,
    borderColor: Colors.pass,
    transform: [{ rotate: '15deg' }],
  },
  swipeLabelText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
