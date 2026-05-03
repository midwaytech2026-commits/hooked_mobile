import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<ButtonSize, { dim: number; fontSize: number }> = {
  sm: { dim: 50, fontSize: 20 },
  md: { dim: 58, fontSize: 24 },
  lg: { dim: 72, fontSize: 30 },
};

interface ActionButtonProps {
  icon: string;
  onPress: () => void;
  size?: ButtonSize;
  iconColor?: string;
  backgroundColor?: string;
  /** Optional ring color — renders a 1.5px border */
  borderColor?: string;
  /** Glow shadow color */
  glowColor?: string;
}

export function ActionButton({
  icon,
  onPress,
  size = 'md',
  iconColor = '#FFFFFF',
  backgroundColor = '#1C1C2C',
  borderColor,
  glowColor,
}: ActionButtonProps): React.JSX.Element {
  const { dim, fontSize } = SIZE_MAP[size];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor,
          borderWidth: borderColor ? 1.5 : 0,
          borderColor: borderColor ?? 'transparent',
          shadowColor: glowColor ?? '#000',
          shadowOpacity: glowColor ? 0.5 : 0.25,
          shadowRadius: glowColor ? 16 : 8,
          shadowOffset: { width: 0, height: glowColor ? 4 : 3 },
          elevation: glowColor ? 10 : 5,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.icon, { fontSize, color: iconColor }]}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.95 }] },
});
