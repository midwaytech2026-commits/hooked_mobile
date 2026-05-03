import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileChipProps {
  label: string;
}

export function ProfileChip({ label }: ProfileChipProps): React.JSX.Element {
  return (
    <View style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
