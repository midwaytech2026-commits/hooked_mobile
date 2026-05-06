import React, { useCallback, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActionButton,
  BottomTabBar,
  CARD_HEIGHT,
  CARD_WIDTH,
  ProfileCard,
} from '../../components/home';
import type { ProfileCardRef, TabName } from '../../components/home';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { MOCK_PROFILES } from './mockProfiles';
import { LikesScreen } from '../Likes';
import { MatchesScreen } from '../Matches';
import { InboxScreen } from '../Inbox';
import { ProfileScreen } from '../Profile';

// ── Design tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: '#0D0D14',
  headerBtn: '#1B1B27',
  boostBg: '#F5A623',
  dimText: 'rgba(255,255,255,0.45)',
} as const;


// ── Component ─────────────────────────────────────────────────────────────────
interface HomeScreenProps {
  onSignOut?: () => void;
}

export function HomeScreen({ onSignOut }: HomeScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const cardRef = useRef<ProfileCardRef>(null);

  const [profileIndex, setProfileIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<TabName>('discover');

  const currentProfile = MOCK_PROFILES[profileIndex] ?? null;
  const noMoreProfiles = currentProfile === null;

  // ── Swipe handlers ────────────────────────────────────────────────────────
  const advance = useCallback((fromIndex: number) => {
    setHistory(prev => [...prev, fromIndex]);
    setProfileIndex(fromIndex + 1);
  }, []);

  const handleSwipeRight = useCallback(() => {
    console.log('❤️  Liked:', MOCK_PROFILES[profileIndex]?.name);
    advance(profileIndex);
  }, [profileIndex, advance]);

  const handleSwipeLeft = useCallback(() => {
    console.log('✕  Passed:', MOCK_PROFILES[profileIndex]?.name);
    advance(profileIndex);
  }, [profileIndex, advance]);

  const handleRewind = () => {
    if (history.length === 0) { return; }
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setProfileIndex(prev);
  };

  const handleSuperLike = () => {
    console.log('⭐ Super-liked:', MOCK_PROFILES[profileIndex]?.name);
  };

  const handleBoostAction = () => {
    console.log('⚡ Boost activated');
  };

  // ── Safe-area top padding ─────────────────────────────────────────────────
  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      {/* ── Discover tab ──────────────────────────────────────────────────── */}
      {activeTab === 'discover' && (
        <View style={styles.tabContent}>
          {/* Header */}
          <View style={[styles.header, { paddingTop: topPad + 8 }]}>
            <Pressable
              android_ripple={{ color: 'transparent' }}
              style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
              onPress={() => console.log('Filters')}
              accessibilityRole="button"
              accessibilityLabel="Filters"
            >
              <Text style={styles.headerBtnIcon}>✦</Text>
            </Pressable>

            <View style={styles.logo}>
              <LinearGradient
                colors={Colors.brand.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoCircle}
              />
              <Text style={styles.logoText}>MidWay</Text>
            </View>

            <Pressable
              android_ripple={{ color: 'transparent' }}
              style={({ pressed }) => [styles.boostBtn, pressed && styles.pressed]}
              onPress={handleBoostAction}
              accessibilityRole="button"
              accessibilityLabel="Boost profile"
            >
              <Text style={styles.boostIcon}>⚡</Text>
              <Text style={styles.boostText}>Boost</Text>
            </Pressable>
          </View>

          {/* Card + action buttons grouped so buttons can overlap card bottom */}
          <View style={styles.cardSection}>
            {noMoreProfiles ? (
              <AllCaughtUp
                onRefresh={() => { setProfileIndex(0); setHistory([]); }}
              />
            ) : (
              <ProfileCard
                key={currentProfile.id}
                ref={cardRef}
                profile={currentProfile}
                onSwipedLeft={handleSwipeLeft}
                onSwipedRight={handleSwipeRight}
              />
            )}

            <View style={styles.actionsRow}>
              <ActionButton
                icon="↩"
                size="sm"
                iconColor="#F5C542"
                borderColor="#F5C54240"
                onPress={handleRewind}
              />
              <ActionButton
                icon="✕"
                size="md"
                iconColor="#FFFFFF"
                borderColor="#FFFFFF20"
                onPress={() => cardRef.current?.swipeLeft()}
              />
              <ActionButton
                icon="♥"
                size="lg"
                iconColor="#FFFFFF"
                gradientColors={['#FF4F8B', '#8B5CF6']}
                glowColor={Colors.brand.pink}
                onPress={() => cardRef.current?.swipeRight()}
              />
              <ActionButton
                icon="★"
                size="md"
                iconColor="#9B6FD4"
                borderColor="#9B6FD440"
                onPress={handleSuperLike}
              />
              <ActionButton
                icon="⚡"
                size="sm"
                iconColor="#F5A623"
                borderColor="#F5A62340"
                onPress={handleBoostAction}
              />
            </View>
          </View>
        </View>
      )}

      {/* ── Likes tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'likes' && (
        <View style={styles.tabContent}>
          <LikesScreen />
        </View>
      )}

      {/* ── Spark / Matches tab ───────────────────────────────────────────── */}
      {activeTab === 'spark' && (
        <View style={styles.tabContent}>
          <MatchesScreen />
        </View>
      )}

      {/* ── Chat / Inbox tab ──────────────────────────────────────────────── */}
      {activeTab === 'chat' && (
        <View style={styles.tabContent}>
          <InboxScreen />
        </View>
      )}

      {/* ── Profile tab ───────────────────────────────────────────────────── */}
      {activeTab === 'profile' && (
        <View style={styles.tabContent}>
          <ProfileScreen onSignOut={onSignOut} />
        </View>
      )}

      {/* ── Always-visible bottom bar ──────────────────────────────────────── */}
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

// ── AllCaughtUp ───────────────────────────────────────────────────────────────
function AllCaughtUp({ onRefresh }: { onRefresh: () => void }): React.JSX.Element {
  return (
    <View style={[caughtUpStyles.wrap, { height: CARD_HEIGHT }]}>
      <Text style={caughtUpStyles.emoji}>🎉</Text>
      <Text style={caughtUpStyles.title}>You're all caught up!</Text>
      <Text style={caughtUpStyles.subtitle}>
        {'Check back later for new profiles\nnear you.'}
      </Text>
      <Pressable
        style={({ pressed }) => [caughtUpStyles.refreshBtn, pressed && { opacity: 0.75 }]}
        onPress={onRefresh}
        accessibilityRole="button"
        accessibilityLabel="Refresh profiles"
      >
        <Text style={caughtUpStyles.refreshText}>Refresh</Text>
      </Pressable>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: D.bg,
  },

  // Each tab's content area fills all space above the tab bar
  tabContent: {
    flex: 1,
  },

  // ── Discover: Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: D.headerBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnIcon: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    includeFontPadding: false,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  boostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: D.boostBg,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  boostIcon: {
    fontSize: 14,
    includeFontPadding: false,
  },
  boostText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Discover: Card + buttons section
  cardSection: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
  },

  // ── Discover: Action buttons (overlaps card bottom via negative marginTop)
  actionsRow: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: Spacing.md,
    marginTop: -28,
    zIndex: 10,
    elevation: 20,
  },

  pressed: { opacity: 0.72 },
});

const caughtUpStyles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#161624',
    borderWidth: 1,
    borderColor: '#2A2A3C',
    gap: Spacing.sm,
  },
  emoji: { fontSize: 48, marginBottom: Spacing.sm },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 15,
    color: D.dimText,
    textAlign: 'center',
    lineHeight: 22,
  },
  refreshBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.brand.purple,
    borderRadius: 100,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  refreshText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

