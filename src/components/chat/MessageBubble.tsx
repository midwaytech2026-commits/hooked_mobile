import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { ChatMessage } from '../../screens/Chat/mockMessages';

interface MessageBubbleProps {
  message: ChatMessage;
  showTime?: boolean;
}

export function MessageBubble({
  message,
  showTime = false,
}: MessageBubbleProps): React.JSX.Element {
  const { text, sent, time } = message;

  if (sent) {
    return (
      <View style={[styles.messageRow, styles.sentRow]}>
        {/*
         * The outer View owns maxWidth + overflow:'hidden' + borderRadius.
         * Putting maxWidth on LinearGradient directly is unreliable — the
         * gradient component doesn't enforce it consistently, which lets the
         * bubble exceed the row width and get clipped by the screen edge.
         * A plain View wrapper always constrains its children correctly.
         */}
        <View style={styles.sentOuter}>
          <LinearGradient
            colors={['#FF4F8B', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sentGradient}
          >
            <Text style={styles.messageText}>{text}</Text>
          </LinearGradient>
        </View>
        {showTime && <Text style={styles.timeSent}>{time}</Text>}
      </View>
    );
  }

  return (
    <View style={[styles.messageRow, styles.receivedRow]}>
      <View style={styles.receivedOuter}>
        <Text style={[styles.messageText, styles.receivedText]}>{text}</Text>
      </View>
      {showTime && <Text style={styles.timeReceived}>{time}</Text>}
    </View>
  );
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUBBLE_MAX_WIDTH = SCREEN_WIDTH * 0.62;

const styles = StyleSheet.create({
  // ── Row ───────────────────────────────────────────────────────────────────
  messageRow: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sentRow: {
    alignItems: 'flex-end',
  },
  receivedRow: {
    alignItems: 'flex-start',
  },

  // ── Sent bubble wrapper ────────────────────────────────────────────────────
  sentOuter: {
    maxWidth: BUBBLE_MAX_WIDTH,
    alignSelf: 'flex-end',
    borderRadius: 24,
    borderBottomRightRadius: 6,
    overflow: 'hidden',
  },
  sentGradient: {
    maxWidth: BUBBLE_MAX_WIDTH,
    borderRadius: 24,
    borderBottomRightRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },

  // ── Received bubble wrapper ────────────────────────────────────────────────
  receivedOuter: {
    maxWidth: BUBBLE_MAX_WIDTH,
    alignSelf: 'flex-start',
    borderRadius: 24,
    borderBottomLeftRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#1F1F2A',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  // ── Text ──────────────────────────────────────────────────────────────────
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    flexShrink: 1,
    flexWrap: 'wrap',
    includeFontPadding: false,
  },
  receivedText: {
    color: 'rgba(255,255,255,0.9)',
  },

  // ── Timestamps ────────────────────────────────────────────────────────────
  timeSent: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeReceived: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});
