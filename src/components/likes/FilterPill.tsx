import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function FilterPill({ label, active, onPress }: FilterPillProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pill,
        active && styles.pillActive,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: '#1B1B27',
  },
  pillActive: {
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  labelActive: {
    color: '#0D0D14',
  },
  pressed: { opacity: 0.75 },
});
