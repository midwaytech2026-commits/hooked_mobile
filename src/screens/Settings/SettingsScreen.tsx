import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { Typography } from '../../styles/typography';

export function SettingsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={Typography.h2}>Settings</Text>
      <Text style={Typography.bodySmall}>App settings go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
});
