import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

interface SettingsRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showDivider?: boolean;
}

export function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
  showDivider = true,
}: SettingsRowProps): React.JSX.Element {
  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        {/* Icon bubble */}
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Text */}
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {/* Chevron */}
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: 14,
  },
  rowPressed: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: `rgba(233,30,140,0.14)`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
    color: Colors.brand.pink,
    includeFontPadding: false,
  },

  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },

  chevron: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.25)',
    includeFontPadding: false,
    lineHeight: 24,
  },

  divider: {
    height: 1,
    backgroundColor: '#1E1E2E',
    marginLeft: 38 + 14 + Spacing.md,
  },
});
