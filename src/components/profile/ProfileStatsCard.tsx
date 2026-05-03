import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing } from '../../styles/spacing';

interface ProfileStatsCardProps {
  icon: string;
  iconColor: string;
  value: string;
  label: string;
}

export function ProfileStatsCard({
  icon,
  iconColor,
  value,
  label,
}: ProfileStatsCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#161624',
    borderRadius: 16,
    padding: Spacing.md,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 16,
    includeFontPadding: false,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
});
