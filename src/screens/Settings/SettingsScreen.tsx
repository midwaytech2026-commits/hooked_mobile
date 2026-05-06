import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsSection } from '../../components/settings';
import type { SettingsItem } from '../../components/settings';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

interface SettingsScreenProps {
  onBack: () => void;
  onSignOut?: () => void;
}

const D = {
  bg: '#0D0D14',
  headerBorder: '#1E1E2E',
} as const;

export function SettingsScreen({
  onBack,
  onSignOut,
}: SettingsScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  const handleSignOut = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: () => {
            console.log('Sign out confirmed');
            onSignOut?.();
          },
        },
      ],
    );
  };

  const ACCOUNT_ITEMS: SettingsItem[] = [
    {
      id: 'privacy',
      icon: '⊝',
      title: 'Privacy',
      subtitle: 'Show me on Discovery',
      onPress: () => console.log('Privacy'),
    },
    {
      id: 'notifications',
      icon: '◎',
      title: 'Notifications',
      subtitle: 'Push, email, SMS',
      onPress: () => console.log('Notifications'),
    },
    {
      id: 'safety',
      icon: '◈',
      title: 'Safety & verification',
      subtitle: 'Verified',
      onPress: () => console.log('Safety & verification'),
    },
  ];

  const SUBSCRIPTION_ITEMS: SettingsItem[] = [
    {
      id: 'subscription',
      icon: '▭',
      title: 'Manage subscription',
      subtitle: 'Premium · Annual',
      onPress: () => console.log('Manage subscription'),
    },
    {
      id: 'boost',
      icon: '✦',
      title: 'Boost & Super Likes',
      subtitle: 'Get more visibility',
      onPress: () => console.log('Boost & Super Likes'),
    },
  ];

  const COMMUNITY_ITEMS: SettingsItem[] = [
    {
      id: 'blocked',
      icon: '⊗',
      title: 'Blocked users',
      subtitle: '0 blocked',
      onPress: () => console.log('Blocked users'),
    },
    {
      id: 'help',
      icon: '?',
      title: 'Help & support',
      onPress: () => console.log('Help & support'),
    },
  ];

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        {/* Spacer to center title */}
        <View style={styles.headerSpacer} />
      </View>

      {/* ── Scrollable content ─────────────────────────────────────── */}
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sections}>
          <SettingsSection label="ACCOUNT" items={ACCOUNT_ITEMS} />
          <SettingsSection label="SUBSCRIPTION" items={SUBSCRIPTION_ITEMS} />
          <SettingsSection label="COMMUNITY" items={COMMUNITY_ITEMS} />
        </View>

        {/* ── Sign out ───────────────────────────────────────────── */}
        <Pressable
          style={({ pressed }) => [styles.signOutBtn, pressed && styles.signOutPressed]}
          onPress={handleSignOut}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          <Text style={styles.signOutIcon}>→</Text>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>

        {/* ── Footer ────────────────────────────────────────────── */}
        <Text style={styles.footer}>MidWay v1.0 · Made with 🖤 in NYC</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: D.bg,
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: D.headerBorder,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1B1B27',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    includeFontPadding: false,
    lineHeight: 26,
    marginTop: -1,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  headerSpacer: {
    width: 38,
  },
  pressed: { opacity: 0.72 },

  // ── Scroll content
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: 28,
  },
  sections: {
    gap: Spacing.lg,
  },

  // ── Sign out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#161624',
    borderRadius: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(233,30,140,0.25)',
  },
  signOutPressed: {
    backgroundColor: 'rgba(233,30,140,0.08)',
  },
  signOutIcon: {
    fontSize: 16,
    color: Colors.brand.pink,
    includeFontPadding: false,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.brand.pink,
  },

  // ── Footer
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: 'rgba(255,255,255,0.25)',
  },
});
