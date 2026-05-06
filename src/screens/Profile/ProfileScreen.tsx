import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GalleryGrid,
  ProfileCompletionCard,
  ProfileStatsCard,
} from '../../components/profile';
import { SettingsScreen } from '../Settings';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

// ── Mock profile data ─────────────────────────────────────────────────────────
const PROFILE = {
  name: 'Aurora',
  age: 26,
  profession: 'Creative Director',
  location: 'New York',
  views: '1.2k',
  likes: 284,
  superLikes: 48,
  completion: 82,
  verified: true,
  placeholderBg: '#1A0828',
  placeholderAccent: 'rgba(233,30,140,0.22)',
} as const;

// ── Layout constants ──────────────────────────────────────────────────────────
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = Math.min(Math.floor(SCREEN_HEIGHT * 0.44), 380);

const D = {
  bg: '#0D0D14',
  premiumBg: '#E8A030',
  settingsBg: 'rgba(0,0,0,0.45)',
  verified: '#7B5CFA',
} as const;

interface ProfileScreenProps {
  onSignOut?: () => void;
}

export function ProfileScreen({ onSignOut }: ProfileScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return (
      <SettingsScreen
        onBack={() => setShowSettings(false)}
        onSignOut={onSignOut}
      />
    );
  }

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Hero section ─────────────────────────────────────────────── */}
        <View style={[styles.hero, { height: HERO_HEIGHT }]}>
          {/* Placeholder photo bg */}
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: PROFILE.placeholderBg },
            ]}
          >
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: PROFILE.placeholderAccent },
              ]}
            />
            {/* Silhouette */}
            <View style={styles.heroSilHead} />
            <View style={styles.heroSilBody} />
          </View>

          {/* Bottom gradient scrim */}
          <View style={styles.heroScrim} />

          {/* ⚡ Premium button */}
          <Pressable
            style={({ pressed }) => [
              styles.premiumBtn,
              { top: topPad + 12 },
              pressed && styles.pressed,
            ]}
            onPress={() => console.log('Premium clicked')}
            accessibilityRole="button"
            accessibilityLabel="Upgrade to Premium"
          >
            <Text style={styles.premiumIcon}>⚡</Text>
            <Text style={styles.premiumText}>Premium</Text>
          </Pressable>

          {/* Settings button */}
          <Pressable
            style={({ pressed }) => [
              styles.settingsBtn,
              { top: topPad + 12 },
              pressed && styles.pressed,
            ]}
            onPress={() => setShowSettings(true)}
            accessibilityRole="button"
            accessibilityLabel="Settings"
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
        </View>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <View style={styles.content}>
          {/* Name + verified badge */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>
              {PROFILE.name}, {PROFILE.age}
            </Text>
            {PROFILE.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedCheck}>✓</Text>
              </View>
            )}
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            {PROFILE.profession} · {PROFILE.location}
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <ProfileStatsCard
              icon="◉"
              iconColor={Colors.brand.pink}
              value={PROFILE.views}
              label="Profile views"
            />
            <ProfileStatsCard
              icon="♥"
              iconColor={Colors.brand.pink}
              value={String(PROFILE.likes)}
              label="Likes"
            />
            <ProfileStatsCard
              icon="⚡"
              iconColor="#F5A623"
              value={String(PROFILE.superLikes)}
              label="Super likes"
            />
          </View>

          {/* Profile completion */}
          <View style={styles.completionWrap}>
            <ProfileCompletionCard completion={PROFILE.completion} />
          </View>

          {/* Gallery */}
          <Text style={styles.sectionTitle}>Gallery</Text>
          <GalleryGrid onImagePress={index => console.log('Gallery tap:', index)} />
        </View>
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: D.bg,
  },
  scroll: {
    paddingBottom: Spacing.xl,
  },

  // ── Hero
  hero: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heroSilHead: {
    position: 'absolute',
    top: HERO_HEIGHT * 0.14,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroSilBody: {
    position: 'absolute',
    top: HERO_HEIGHT * 0.42,
    alignSelf: 'center',
    width: 160,
    height: 140,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  heroScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT * 0.45,
    backgroundColor: 'rgba(13,13,20,0.75)',
  },

  // Overlay buttons
  premiumBtn: {
    position: 'absolute',
    left: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: D.premiumBg,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 9,
    shadowColor: D.premiumBg,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  premiumIcon: {
    fontSize: 13,
    includeFontPadding: false,
  },
  premiumText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsBtn: {
    position: 'absolute',
    right: Spacing.lg,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: D.settingsBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  settingsIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  pressed: { opacity: 0.75 },

  // ── Content
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },

  // Name + verified
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: D.verified,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedCheck: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
    includeFontPadding: false,
  },

  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: Spacing.md,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.md,
  },

  // Completion
  completionWrap: {
    marginBottom: Spacing.lg,
  },

  // Gallery
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    marginBottom: Spacing.md,
  },
});
