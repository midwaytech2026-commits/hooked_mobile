import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Conversation } from '../../screens/Matches/mockMatches';
import { OnlineIndicator } from './OnlineIndicator';

const AVATAR_SIZE = 58;

interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

export function ConversationItem({
  conversation,
  onPress,
}: ConversationItemProps): React.JSX.Element {
  const hasUnread = conversation.unread > 0;

  return (
    <Pressable
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Conversation with ${conversation.name}`}
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
            <OnlineIndicator size={14} borderColor='#111119' />
          </View>
        )}
      </View>

      {/* Text content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.name, hasUnread && styles.nameUnread]} numberOfLines={1}>
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
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 14,
  },
  pressed: { opacity: 0.75 },

  // Avatar
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  avatarGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarHead: {
    position: 'absolute',
    top: AVATAR_SIZE * 0.14,
    alignSelf: 'center',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  avatarBody: {
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    width: 34,
    height: 26,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
  },

  // Content
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
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    flex: 1,
  },
  nameUnread: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  time: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    marginLeft: 8,
  },
  timeUnread: {
    color: 'rgba(233,30,140,0.85)',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.35)',
    flex: 1,
  },
  messageUnread: {
    color: 'rgba(255,255,255,0.65)',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E91E8C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
