import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../styles/colors';

interface OnboardingProgressProps {
  total: number;
  current: number; // 1-indexed — segments 1..current are filled
}

export function OnboardingProgress({ total, current }: OnboardingProgressProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.segment, i < current && styles.segmentFilled]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2A2A3C',
  },
  segmentFilled: {
    backgroundColor: Colors.brand.pink,
  },
});
