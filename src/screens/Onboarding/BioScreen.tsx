import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

const TOTAL_STEPS = 5;
const MAX_CHARS = 280;

const PROMPTS = [
  'My ideal Sunday morning...',
  'A perfect first date would be...',
  'The best travel memory I have...',
  "Something I'm really passionate about...",
  'A fun fact most people dont know about me...',
];

const D = {
  bg: '#0D0D14',
  inputBg: '#1B1B27',
  inputBorder: '#2A2A3C',
  inputFocusBorder: Colors.brand.pink,
  inputText: '#FFFFFF',
  placeholder: 'rgba(255,255,255,0.3)',
  btnOn: '#BF22A1',
  btnOff: '#3A1033',
  btnGlow: Colors.brand.pink,
  dimText: 'rgba(255,255,255,0.55)',
} as const;

export interface BioScreenProps {
  onBack: () => void;
  onEnterMidWay: () => void;
}

export function BioScreen({ onBack, onEnterMidWay }: BioScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [bio, setBio] = useState('');
  const [focused, setFocused] = useState(false);

  const remaining = MAX_CHARS - bio.length;
  const canEnter = bio.trim().length > 0;

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24) + Spacing.md
      : insets.top + Spacing.md;

  const appendPrompt = (prompt: string) => {
    const separator = bio.length > 0 ? '\n' : '';
    const candidate = bio + separator + prompt;
    if (candidate.length <= MAX_CHARS) {
      setBio(candidate);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scroll, { paddingTop: topPad }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <OnboardingHeader step={5} total={TOTAL_STEPS} onBack={onBack} />

          <View style={styles.headingArea}>
            <Text style={styles.heading}>{"Write your\nbio"}</Text>
            <Text style={styles.subtitle}>{'Let your personality shine through.'}</Text>
          </View>

          {/* Bio text input */}
          <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={text => { if (text.length <= MAX_CHARS) { setBio(text); } }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Tell people what makes you, you..."
              placeholderTextColor={D.placeholder}
              multiline
              maxLength={MAX_CHARS}
              textAlignVertical="top"
              accessibilityLabel="Bio text input"
            />
            <Text style={[styles.counter, remaining < 40 && styles.counterWarn]}>
              {remaining}
            </Text>
          </View>

          {/* AI suggestions button */}
          <Pressable
            style={({ pressed }) => [styles.aiBtn, pressed && styles.pressed]}
            onPress={() => {/* TODO: AI bio suggestions */}}
            accessibilityRole="button"
            accessibilityLabel="Get AI suggestions"
          >
            <Text style={styles.aiIcon}>✨</Text>
            <Text style={styles.aiBtnText}>AI Suggestions</Text>
          </Pressable>

          {/* Writing prompts */}
          <Text style={styles.promptsHeading}>Need inspiration?</Text>
          <View style={styles.promptsWrap}>
            {PROMPTS.map((prompt, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => [styles.promptChip, pressed && styles.pressed]}
                onPress={() => appendPrompt(prompt)}
                accessibilityRole="button"
                accessibilityLabel={`Use prompt: ${prompt}`}
              >
                <Text style={styles.promptChipText}>{prompt}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
          <Pressable
            style={({ pressed }) => [
              styles.enterBtn,
              !canEnter && styles.enterBtnDisabled,
              pressed && canEnter && styles.pressed,
            ]}
            onPress={() => { if (canEnter) { onEnterMidWay(); } }}
            disabled={!canEnter}
            accessibilityRole="button"
            accessibilityLabel="Enter MidWay"
            accessibilityState={{ disabled: !canEnter }}
          >
            <Text style={styles.enterBtnText}>Enter MidWay 🚀</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: D.bg },
  flex: { flex: 1 },

  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  headingArea: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text.inverse,
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: D.dimText,
  },

  inputWrap: {
    backgroundColor: D.inputBg,
    borderWidth: 1.5,
    borderColor: D.inputBorder,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    minHeight: 150,
  },
  inputWrapFocused: {
    borderColor: D.inputFocusBorder,
    shadowColor: Colors.brand.pink,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: D.inputText,
    minHeight: 100,
  },
  counter: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'right',
    marginTop: Spacing.sm,
    fontWeight: '500',
  },
  counterWarn: {
    color: Colors.brand.pinkLight,
  },

  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#1B1B27',
    borderWidth: 1,
    borderColor: '#2A2A3C',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: Spacing.xl,
  },
  aiIcon: { fontSize: 16, lineHeight: 20 },
  aiBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
  },

  promptsHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  promptsWrap: {
    gap: Spacing.sm,
  },
  promptChip: {
    backgroundColor: '#1B1B27',
    borderWidth: 1,
    borderColor: '#2A2A3C',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  promptChipText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 20,
  },

  bottomActions: {
    backgroundColor: D.bg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  enterBtn: {
    borderRadius: 100,
    backgroundColor: D.btnOn,
    shadowColor: D.btnGlow,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterBtnDisabled: {
    backgroundColor: D.btnOff,
    shadowOpacity: 0,
    elevation: 0,
  },
  enterBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.inverse,
    letterSpacing: 0.1,
  },

  pressed: { opacity: 0.72 },
});
