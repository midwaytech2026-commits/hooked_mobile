import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageBubble } from '../../components/chat';
import { CHAT_MESSAGES } from './mockMessages';
import type { ChatMessage } from './mockMessages';

const D = {
  bg: '#0D0D14',
  headerBorder: 'rgba(255,255,255,0.08)',
  inputBorder: 'rgba(255,255,255,0.08)',
  inputBg: '#1F1F2A',
  online: '#22C55E',
  offline: '#8A8A98',
  dimText: 'rgba(255,255,255,0.4)',
} as const;

const AVATAR_SIZE = 42;

export interface ChatScreenProps {
  chatId: string;
  name: string;
  online: boolean;
  placeholderBg: string;
  placeholderAccent: string;
  onBack: () => void;
}

export function ChatScreen({
  chatId,
  name,
  online,
  placeholderBg,
  placeholderAccent,
  onBack,
}: ChatScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>(
    CHAT_MESSAGES[chatId] ?? [],
  );
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24)
      : insets.top;

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) { return; }
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      text,
      sent: true,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 60);
  };

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        {/* Back */}
        <Pressable
          android_ripple={{ color: 'transparent' }}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        {/* Avatar + name */}
        <View style={styles.headerCenter}>
          <View style={styles.avatarWrap}>
            <View style={[styles.avatar, { backgroundColor: placeholderBg }]}>
              <View style={[styles.avatarGlow, { backgroundColor: placeholderAccent }]} />
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
            {online && <View style={styles.avatarOnlineDot} />}
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerName} numberOfLines={1}>
              {name}
            </Text>
            {/* Status label only — no separate dot; avatar already has the dot */}
            <Text
              style={[
                styles.statusLabel,
                { color: online ? D.online : D.dimText },
              ]}
            >
              {online ? 'Online now' : 'Offline'}
            </Text>
          </View>
        </View>

        {/* More options */}
        <Pressable
          android_ripple={{ color: 'transparent' }}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="More options"
        >
          <Text style={styles.menuDots}>⋮</Text>
        </Pressable>
      </View>

      {/* ── Messages + Input (KeyboardAvoidingView handles iOS keyboard) ── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/*
         * FlatList MUST have flex: 1 so it fills the available space and
         * the input bar stays anchored at the bottom. Without flex: 1 the
         * list expands to its full content height, pushing the input below
         * the screen.
         */}
        <FlatList
          ref={listRef}
          style={styles.flex}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            const nextMsg = messages[index + 1];
            const showTime = !nextMsg || nextMsg.sent !== item.sent;
            return <MessageBubble message={item} showTime={showTime} />;
          }}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: false })
          }
        />

        {/* ── Input bar ──────────────────────────────────────────────────── */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            multiline
            maxLength={1000}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            submitBehavior="blurAndSubmit"
          />
          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={handleSend}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <LinearGradient
              colors={['#FF4F8B', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sendButton}
            >
              <Text style={styles.sendIcon}>↑</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: D.bg,
  },
  flex: { flex: 1 },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: D.headerBorder,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  backArrow: {
    fontSize: 22,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  menuDots: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.55)',
    includeFontPadding: false,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 10,
  },

  // Avatar
  avatarWrap: { position: 'relative' },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
  },
  avatarGlow: { ...StyleSheet.absoluteFill },
  avatarHead: {
    position: 'absolute',
    top: AVATAR_SIZE * 0.14,
    alignSelf: 'center',
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  avatarBody: {
    position: 'absolute',
    bottom: -3,
    alignSelf: 'center',
    width: 28,
    height: 22,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  avatarOnlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: D.bg,
  },

  // Header text
  headerText: { flex: 1, gap: 2 },
  headerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
  },

  // ── Messages ──────────────────────────────────────────────────────────────
  messagesContent: {
    // paddingHorizontal lives inside MessageBubble's messageRow so that
    // alignItems flex-end/start positions bubbles within the already-padded
    // row — not against the raw FlatList edge. Adding it here too would
    // double-pad and push bubbles inward unnecessarily.
    paddingTop: 20,
    paddingBottom: 140,
  },

  // ── Input bar ─────────────────────────────────────────────────────────────
  inputWrapper: {
    flexDirection: 'row',
    // flex-end so the send button stays at the bottom of the row when the
    // multiline input grows beyond one line.
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: D.inputBorder,
    backgroundColor: D.bg,
  },
  input: {
    flex: 1,
    minHeight: 52,
    maxHeight: 120,
    borderRadius: 26,
    backgroundColor: D.inputBg,
    paddingHorizontal: 20,
    paddingVertical: 13,
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    includeFontPadding: false,
  },

  pressed: { opacity: 0.72 },
});
