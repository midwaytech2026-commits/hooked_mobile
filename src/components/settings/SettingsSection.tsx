import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing } from '../../styles/spacing';
import { SettingsRow } from './SettingsRow';

export interface SettingsItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

interface SettingsSectionProps {
  label: string;
  items: SettingsItem[];
}

export function SettingsSection({
  label,
  items,
}: SettingsSectionProps): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <SettingsRow
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={item.onPress}
            showDivider={index < items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.2,
    paddingHorizontal: Spacing.sm,
  },
  card: {
    backgroundColor: '#161624',
    borderRadius: 18,
    overflow: 'hidden',
  },
});
