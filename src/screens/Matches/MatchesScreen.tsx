import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConversationItem, MatchCard } from '../../components/matches';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { CONVERSATIONS, NEW_MATCHES } from './mockMatches';

const D = {
  bg: '#0D0D14',
  sectionLabel: 'rgba(255,255,255,0.35)',
  divider: '#1E1E2E',
} as const;

export function MatchesScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [_activeChatId, setActiveChatId] = useState<string | null>(null);

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.scroll, { paddingTop: topPad + Spacing.md }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.newLabel}>4 NEW CONNECTIONS</Text>
          <Text style={styles.heading}>Matches</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.filterBtn, pressed && styles.pressed]}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Filter matches"
        >
          <Text style={styles.filterIcon}>✦</Text>
        </Pressable>
      </View>

      {/* ── New Today ────────────────────────────────────────────── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>NEW TODAY</Text>
        <View style={styles.sectionLine} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.matchRow}
        style={styles.matchScroll}
      >
        {NEW_MATCHES.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            onPress={() => setActiveChatId(match.id)}
          />
        ))}
      </ScrollView>

      {/* ── Conversations ────────────────────────────────────────── */}
      <View style={[styles.sectionHeader, { marginTop: Spacing.lg }]}>
        <Text style={styles.sectionLabel}>CONVERSATIONS</Text>
        <View style={styles.sectionLine} />
      </View>

      <View style={styles.conversationList}>
        {CONVERSATIONS.map((convo, index) => (
          <View key={convo.id}>
            <ConversationItem
              conversation={convo}
              onPress={() => setActiveChatId(convo.id)}
            />
            {index < CONVERSATIONS.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

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
  newLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.brand.purple,
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
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1B1B27',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  filterIcon: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    includeFontPadding: false,
  },

  // ── Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: D.sectionLabel,
    letterSpacing: 1.2,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: D.divider,
  },

  // ── New Today row
  matchScroll: {
    marginHorizontal: -Spacing.lg,
  },
  matchRow: {
    paddingHorizontal: Spacing.lg,
    gap: 12,
  },

  // ── Conversations
  conversationList: {},
  divider: {
    height: 1,
    backgroundColor: D.divider,
    marginLeft: 72,
  },

  pressed: { opacity: 0.75 },
});
