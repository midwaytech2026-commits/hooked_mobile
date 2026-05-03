import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

interface ProfileCompletionCardProps {
  completion: number;
  hint?: string;
}

export function ProfileCompletionCard({
  completion,
  hint = 'Add 1 more photo and link Instagram for 100%.',
}: ProfileCompletionCardProps): React.JSX.Element {
  const clamped = Math.min(100, Math.max(0, completion));

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Profile completion</Text>
        <Text style={styles.percent}>{clamped}%</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped}%` as `${number}%` }]}>
          {/* Two-color gradient fallback */}
          <View style={[styles.fillHalf, { backgroundColor: Colors.brand.pink }]} />
          <View style={[styles.fillHalf, { backgroundColor: Colors.brand.purple }]} />
        </View>
      </View>

      {/* Hint text */}
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1040',
    borderRadius: 20,
    padding: Spacing.md,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(123,47,190,0.35)',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  percent: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Progress bar
  track: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fillHalf: {
    flex: 1,
    height: '100%',
  },

  hint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 18,
  },
});
