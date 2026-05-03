import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { OnlineIndicator } from '../matches/OnlineIndicator';
import type { InboxConversation } from '../../screens/Inbox/mockConversations';
import { Spacing } from '../../styles/spacing';

const AVATAR_SIZE = 56;

interface ConversationRowProps {
  conversation: InboxConversation;
  selected?: boolean;
  onPress: () => void;
}

export function ConversationRow({
  conversation,
  selected = false,
  onPress,
}: ConversationRowProps): React.JSX.Element {
  const hasUnread = conversation.unread > 0;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && !selected && styles.rowPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${conversation.name}: ${conversation.lastMessage}`}
      accessibilityState={{ selected }}
    >
      {/* Avatar */}
      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, { backgroundColor: conversation.placeholderBg }]}>
          <View style={[styles.avatarGlow, { backgroundColor: conversation.placeholderAccent }]} />
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
        </View>
        {conversation.online && (
          <View style={styles.onlineDot}>
            <OnlineIndicator size={14} borderColor={selected ? '#1C1C2A' : '#0D0D14'} />
          </View>
        )}
      </View>

      {/* Text content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={[styles.name, hasUnread && styles.nameUnread]}
            numberOfLines={1}
          >
            {conversation.name}
          </Text>
          <Text style={[styles.time, hasUnread && styles.timeUnread]}>
            {conversation.time}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <Text
            style={[styles.message, hasUnread && styles.messageUnread]}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>
          {hasUnread && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversation.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: 18,
    gap: 14,
  },
  rowSelected: {
    backgroundColor: '#1C1C2A',
  },
  rowPressed: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  // ── Avatar
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
  },
  avatarGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarHead: {
    position: 'absolute',
    top: AVATAR_SIZE * 0.16,
    alignSelf: 'center',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  avatarBody: {
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    width: 34,
    height: 26,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
  },

  // ── Content
  content: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.55)',
    flex: 1,
    marginRight: 8,
  },
  nameUnread: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  time: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
  },
  timeUnread: {
    color: 'rgba(233,30,140,0.9)',
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.3)',
    flex: 1,
    marginRight: 8,
  },
  messageUnread: {
    color: 'rgba(255,255,255,0.6)',
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7B2FBE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
