import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { OnlineIndicator } from '../matches/OnlineIndicator';
import type { InboxConversation } from '../../screens/Inbox/mockConversations';

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
      android_ripple={{ color: 'transparent' }}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && !selected && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${conversation.name}: ${conversation.lastMessage}`}
      accessibilityState={{ selected }}
    >
      {/* ── LEFT: Avatar ──────────────────────────────────────────────── */}
      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, { backgroundColor: conversation.placeholderBg }]}>
          <View
            style={[styles.avatarGlow, { backgroundColor: conversation.placeholderAccent }]}
          />
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
        </View>
        {conversation.online && (
          <View style={styles.onlineDot}>
            <OnlineIndicator
              size={13}
              borderColor={selected ? '#161625' : '#0D0D14'}
            />
          </View>
        )}
      </View>

      {/* ── CENTER: Name + preview ─────────────────────────────────────── */}
      {/*
       * flex: 1 lets this column fill available space but STOPS before
       * pushing the right section off-screen, because the right section
       * has no flex and therefore reserves its own intrinsic width first.
       */}
      <View style={styles.centerSection}>
        <Text
          style={[styles.name, hasUnread && styles.nameUnread]}
          numberOfLines={1}
        >
          {conversation.name}
        </Text>
        <Text
          style={[styles.preview, hasUnread && styles.previewUnread]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {conversation.lastMessage}
        </Text>
      </View>

      {/* ── RIGHT: Time + unread badge ─────────────────────────────────── */}
      {/*
       * This column has NO flex. React Native measures it first, giving it
       * exactly the width it needs. The center section's flex: 1 then fills
       * only the leftover space — the badge can never be squeezed out.
       */}
      <View style={styles.rightSection}>
        <Text style={[styles.time, hasUnread && styles.timeUnread]}>
          {conversation.time}
        </Text>
        {hasUnread && (
          <View style={styles.badgeWrap}>
            <LinearGradient
              colors={['#FF4F8B', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badge}
            >
              <Text style={styles.badgeText}>{conversation.unread}</Text>
            </LinearGradient>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // ── Card ──────────────────────────────────────────────────────────────────
 card: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 16,
  paddingRight: 18,
  paddingVertical: 14,
  borderRadius: 18,
  marginBottom: 10,
  backgroundColor: 'rgba(255,255,255,0.04)',
  overflow: 'visible',
},
  cardSelected: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardPressed: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  // ── Avatar ────────────────────────────────────────────────────────────────
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
    ...StyleSheet.absoluteFill,
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

  // ── Center section ────────────────────────────────────────────────────────
  centerSection: {
    flex: 1,
    marginHorizontal: 12,
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
  },
  nameUnread: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  preview: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.28)',
  },
  previewUnread: {
    color: 'rgba(255,255,255,0.58)',
  },

  // ── Right section ─────────────────────────────────────────────────────────
rightSection: {
  width: 44,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},
  time: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.28)',
    fontWeight: '400',
  },
  timeUnread: {
    color: '#FF4F8B',
    fontWeight: '600',
  },

  // ── Gradient badge ────────────────────────────────────────────────────────
  // badgeWrap is the clip boundary — it owns borderRadius + overflow:hidden.
  // LinearGradient can't reliably clip its own paint to rounded corners on iOS,
  // so the plain View wrapper does it instead and the gradient just fills in.
badgeWrap: {
  width: 28,
  height: 28,
  borderRadius: 14,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
},
 badge: {
  width: 28,
  height: 28,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
},
badgeText: {
  fontSize: 13,
  fontWeight: '700',
  color: '#FFFFFF',
  textAlign: 'center',
  includeFontPadding: false,
  lineHeight: 16,
},
});
