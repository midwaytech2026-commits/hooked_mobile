import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
  borderColor?: string;
  glowColor?: string;
  /** When provided the button renders inside a LinearGradient instead of a solid bg */
  gradientColors?: readonly [string, string];
}

export function ActionButton({
  icon,
  onPress,
  size = 'md',
  iconColor = '#FFFFFF',
  backgroundColor = '#1C1C2C',
  borderColor,
  glowColor,
  gradientColors,
}: ActionButtonProps): React.JSX.Element {
  const { dim, fontSize } = SIZE_MAP[size];

  const shadowStyle = {
    shadowColor: glowColor ?? '#000',
    shadowOpacity: glowColor ? 0.55 : 0.25,
    shadowRadius: glowColor ? 18 : 8,
    shadowOffset: { width: 0, height: glowColor ? 5 : 3 },
    elevation: glowColor ? 12 : 5,
  };

  const shapeStyle = {
    width: dim,
    height: dim,
    borderRadius: dim / 2,
    borderWidth: borderColor ? 1.5 : 0,
    borderColor: borderColor ?? 'transparent',
    ...shadowStyle,
  };

  if (gradientColors) {
    return (
      <LinearGradient
        colors={[...gradientColors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.btn, shapeStyle, styles.gradientOverflow]}
      >
        <Pressable
          android_ripple={{ color: 'transparent' }}
          style={({ pressed }) => [styles.fill, pressed && styles.pressed]}
          onPress={onPress}
          accessibilityRole="button"
        >
          <Text style={[styles.icon, { fontSize, color: iconColor }]}>{icon}</Text>
        </Pressable>
      </LinearGradient>
    );
  }

  return (
    <Pressable
      android_ripple={{ color: 'transparent' }}
      style={({ pressed }) => [
        styles.btn,
        shapeStyle,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
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
  gradientOverflow: {
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
    alignSelf: 'stretch',
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
