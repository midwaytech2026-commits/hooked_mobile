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
import { FilterPill, LikesProfileCard } from '../../components/likes';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { LIKED_PROFILES } from './mockLikedProfiles';

// ── Constants ─────────────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = 12;
const CARD_WIDTH = Math.floor(
  (SCREEN_WIDTH - Spacing.lg * 2 - GRID_GAP) / 2,
);
const CARD_HEIGHT = Math.floor(CARD_WIDTH * 1.38);

// ── Filter data ───────────────────────────────────────────────────────────────
type FilterId = 'all' | 'new' | 'nearby' | 'verified';

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: 'all',      label: 'All 128' },
  { id: 'new',      label: 'New 24' },
  { id: 'nearby',   label: 'Nearby' },
  { id: 'verified', label: 'Verified' },
];

// ── Design tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: '#0D0D14',
  countLabel: Colors.brand.pink,
  unlockBg: '#E8A030',
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function LikesScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  // Pair profiles into 2-column rows
  const rows: (typeof LIKED_PROFILES)[] = [];
  for (let i = 0; i < LIKED_PROFILES.length; i += 2) {
    rows.push(LIKED_PROFILES.slice(i, i + 2));
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topPad + Spacing.md }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header row ────────────────────────────────────────── */}
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.countLabel}>128 PEOPLE</Text>
            <Text style={styles.heading}>Like you</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.unlockBtn, pressed && styles.pressed]}
            onPress={() => console.log('Unlock premium')}
            accessibilityRole="button"
            accessibilityLabel="Unlock premium to see all likes"
          >
            <Text style={styles.unlockIcon}>⚡</Text>
            <Text style={styles.unlockText}>Unlock</Text>
          </Pressable>
        </View>

        {/* ── Filter pills ──────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          {FILTERS.map(filter => (
            <FilterPill
              key={filter.id}
              label={filter.label}
              active={activeFilter === filter.id}
              onPress={() => setActiveFilter(filter.id)}
            />
          ))}
        </ScrollView>

        {/* ── Profile grid ──────────────────────────────────────── */}
        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map(profile => (
                <LikesProfileCard
                  key={profile.id}
                  profile={profile}
                  cardWidth={CARD_WIDTH}
                  cardHeight={CARD_HEIGHT}
                  onPress={() => {
                    if (profile.locked) {
                      console.log('Premium required');
                    } else {
                      console.log('Profile tapped:', profile.id, profile.name);
                    }
                  }}
                />
              ))}
              {/* Fill last row with an empty spacer if odd number of profiles */}
              {row.length === 1 && <View style={{ width: CARD_WIDTH }} />}
            </View>
          ))}
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // ── Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  titleBlock: {
    gap: 4,
  },
  countLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: D.countLabel,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: 38,
  },

  // Unlock button
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: D.unlockBg,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginTop: 4,
    shadowColor: D.unlockBg,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  unlockIcon: {
    fontSize: 14,
    includeFontPadding: false,
  },
  unlockText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Filter pills
  filterScroll: {
    marginBottom: Spacing.lg,
  },
  filterRow: {
    gap: Spacing.sm,
    paddingRight: Spacing.lg,
  },

  // ── Profile grid
  grid: {
    gap: GRID_GAP,
  },
  gridRow: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },

  pressed: { opacity: 0.8 },
});
