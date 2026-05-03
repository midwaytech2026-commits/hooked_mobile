import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';

export interface SelectableCardProps {
  label: string;
  emoji?: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectableCard({
  label,
  emoji,
  subtitle,
  selected,
  onPress,
}: SelectableCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      {emoji != null && <Text style={styles.emoji}>{emoji}</Text>}

      <View style={styles.textWrap}>
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        {subtitle != null && (
          <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>{subtitle}</Text>
        )}
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#1B1B27',
    borderWidth: 1.5,
    borderColor: '#2A2A3C',
  },
  cardSelected: {
    backgroundColor: 'rgba(233,30,140,0.12)',
    borderColor: Colors.brand.pink,
    shadowColor: Colors.brand.pink,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  emoji: {
    fontSize: 26,
    lineHeight: 32,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  labelSelected: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 18,
  },
  subtitleSelected: {
    color: 'rgba(255,255,255,0.65)',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#3A3A52',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioSelected: {
    borderColor: Colors.brand.pink,
    backgroundColor: Colors.brand.pink,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  pressed: { opacity: 0.8 },
});
