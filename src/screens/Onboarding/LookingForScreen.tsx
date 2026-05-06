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
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { SelectableCard } from '../../components/onboarding/SelectableCard';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

const TOTAL_STEPS = 5;

const LOOKING_FOR_OPTIONS = [
  {
    id: 'long_term',
    emoji: '💞',
    label: 'Long-term relationship',
    subtitle: "I'm looking for something real and lasting.",
  },
  {
    id: 'casual',
    emoji: '✨',
    label: 'Something casual',
    subtitle: 'Open to fun, low-pressure connections.',
  },
  {
    id: 'friendship',
    emoji: '🤝',
    label: 'New friends',
    subtitle: 'Building meaningful platonic connections.',
  },
  {
    id: 'open',
    emoji: '🌈',
    label: "I'm open to anything",
    subtitle: "Let's see where things go.",
  },
] as const;

type LookingForId = (typeof LOOKING_FOR_OPTIONS)[number]['id'];

const D = {
  bg: '#0D0D14',
  btnOn: '#BF22A1',
  btnOff: '#3A1033',
  btnGlow: Colors.brand.pink,
  dimText: 'rgba(255,255,255,0.55)',
} as const;

export interface LookingForScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function LookingForScreen({
  onBack,
  onContinue,
}: LookingForScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<LookingForId | null>(null);

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24) + Spacing.md
      : insets.top + Spacing.md;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.scroll, { paddingTop: topPad }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader step={2} total={TOTAL_STEPS} onBack={onBack} />

        <View style={styles.headingArea}>
          <Text style={styles.heading}>{"What are you\nlooking for?"}</Text>
          <Text style={styles.subtitle}>{"We'll use this to find your best matches."}</Text>
        </View>

        <View style={styles.options}>
          {LOOKING_FOR_OPTIONS.map(opt => (
            <SelectableCard
              key={opt.id}
              emoji={opt.emoji}
              label={opt.label}
              subtitle={opt.subtitle}
              selected={selected === opt.id}
              onPress={() => setSelected(opt.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
        <LinearGradient
          colors={selected ? Colors.brand.gradient : ['#3A1033', '#3A1033']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
        >
          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }) => [
              styles.continueBtnInner,
              pressed && !!selected && styles.pressed,
            ]}
            onPress={() => { if (selected) { onContinue(); } }}
            disabled={!selected}
            accessibilityRole="button"
            accessibilityLabel="Continue"
            accessibilityState={{ disabled: !selected }}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
          </Pressable>
        </LinearGradient>
      </View>
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

  options: {
    gap: Spacing.sm + 2,
  },

  bottomActions: {
    backgroundColor: D.bg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  continueBtn: {
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: D.btnGlow,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  continueBtnDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnInner: {
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.inverse,
    letterSpacing: 0.1,
  },

  pressed: { opacity: 0.72 },
});
