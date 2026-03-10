import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  label: string;
  color: string;
  textColor?: string;
  size?: 'sm' | 'md';
}

export function Badge({ label, color, textColor = '#FFFFFF', size = 'sm' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[size], { backgroundColor: color }]}>
      <Text style={[styles.text, styles[`text_${size}`], { color: textColor }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  md: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  text: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  text_sm: {
    fontSize: 10,
  },
  text_md: {
    fontSize: 12,
  },
});
