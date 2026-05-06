import React, { useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConversationRow, SearchBar } from '../../components/inbox';
import { ChatScreen } from '../Chat';
import { Spacing } from '../../styles/spacing';
import { INBOX_CONVERSATIONS } from './mockConversations';
import type { InboxConversation } from './mockConversations';

const D = {
  bg: '#0D0D14',
  heading: '#FFFFFF',
  empty: 'rgba(255,255,255,0.3)',
} as const;

export function InboxScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('ic4');
  const [openChat, setOpenChat] = useState<InboxConversation | null>(null);

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  const filtered = useMemo(() => {
    if (!query.trim()) { return INBOX_CONVERSATIONS; }
    const q = query.toLowerCase();
    return INBOX_CONVERSATIONS.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q),
    );
  }, [query]);

  const handleConversationPress = (convo: InboxConversation) => {
    setSelectedId(convo.id);
    setOpenChat(convo);
  };

  // ── Open chat detail view ──────────────────────────────────────────────────
  if (openChat) {
    return (
      <ChatScreen
        chatId={openChat.chatId}
        name={openChat.name}
        online={openChat.online}
        placeholderBg={openChat.placeholderBg}
        placeholderAccent={openChat.placeholderAccent}
        onBack={() => setOpenChat(null)}
      />
    );
  }

  // ── Inbox list ─────────────────────────────────────────────────────────────
  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Heading ─────────────────────────────────────────── */}
        <Text style={styles.heading}>Inbox</Text>

        {/* ── Search ──────────────────────────────────────────── */}
        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        {/* ── Conversation list ────────────────────────────────── */}
        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>◌</Text>
            <Text style={styles.emptyText}>No conversations found</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filtered.map(convo => (
              <ConversationRow
                key={convo.id}
                conversation={convo}
                selected={selectedId === convo.id}
                onPress={() => handleConversationPress(convo)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
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

  heading: {
    fontSize: 34,
    fontWeight: '800',
    color: D.heading,
    letterSpacing: -0.3,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },

  searchWrap: {
    marginBottom: Spacing.md,
  },

  list: {
    marginTop: Spacing.sm,
  },

  emptyWrap: {
    alignItems: 'center',
    marginTop: 64,
    gap: Spacing.sm,
  },
  emptyIcon: {
    fontSize: 40,
    color: 'rgba(255,255,255,0.15)',
  },
  emptyText: {
    fontSize: 15,
    color: D.empty,
  },
});
