import React from 'react';
import { StyleSheet, View } from 'react-native';

interface OnlineIndicatorProps {
  size?: number;
  borderColor?: string;
}

export function OnlineIndicator({
  size = 12,
  borderColor = '#0D0D14',
}: OnlineIndicatorProps): React.JSX.Element {
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#22C55E',
    borderWidth: 2,
  },
});
