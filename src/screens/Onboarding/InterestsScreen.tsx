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
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

const TOTAL_STEPS = 5;
const MIN_SELECTIONS = 5;

const INTERESTS = [
  { id: 'travel',      emoji: '✈️',  label: 'Travel' },
  { id: 'hiking',      emoji: '🥾',  label: 'Hiking' },
  { id: 'music',       emoji: '🎵',  label: 'Music' },
  { id: 'cooking',     emoji: '🍳',  label: 'Cooking' },
  { id: 'photography', emoji: '📷',  label: 'Photography' },
  { id: 'reading',     emoji: '📚',  label: 'Reading' },
  { id: 'fitness',     emoji: '💪',  label: 'Fitness' },
  { id: 'yoga',        emoji: '🧘',  label: 'Yoga' },
  { id: 'gaming',      emoji: '🎮',  label: 'Gaming' },
  { id: 'art',         emoji: '🎨',  label: 'Art' },
  { id: 'dancing',     emoji: '💃',  label: 'Dancing' },
  { id: 'movies',      emoji: '🎬',  label: 'Movies' },
  { id: 'coffee',      emoji: '☕',  label: 'Coffee' },
  { id: 'wine',        emoji: '🍷',  label: 'Wine' },
  { id: 'dogs',        emoji: '🐶',  label: 'Dogs' },
  { id: 'cats',        emoji: '🐱',  label: 'Cats' },
  { id: 'sports',      emoji: '⚽',  label: 'Sports' },
  { id: 'meditation',  emoji: '🧠',  label: 'Meditation' },
  { id: 'fashion',     emoji: '👗',  label: 'Fashion' },
  { id: 'tech',        emoji: '💻',  label: 'Tech' },
  { id: 'food',        emoji: '🍜',  label: 'Foodie' },
  { id: 'camping',     emoji: '⛺',  label: 'Camping' },
  { id: 'cycling',     emoji: '🚴',  label: 'Cycling' },
  { id: 'astronomy',   emoji: '🔭',  label: 'Astronomy' },
] as const;

type InterestId = (typeof INTERESTS)[number]['id'];

const D = {
  bg: '#0D0D14',
  chipEmpty: '#1B1B27',
  chipEmptyBorder: '#2A2A3C',
  chipSelected: 'rgba(233,30,140,0.15)',
  chipSelectedBorder: Colors.brand.pink,
  btnOn: '#BF22A1',
  btnOff: '#3A1033',
  btnGlow: Colors.brand.pink,
  dimText: 'rgba(255,255,255,0.55)',
} as const;

export interface InterestsScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function InterestsScreen({
  onBack,
  onContinue,
}: InterestsScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Set<InterestId>>(new Set());

  const toggle = (id: InterestId) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const count = selected.size;
  const canContinue = count >= MIN_SELECTIONS;

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
        <OnboardingHeader step={3} total={TOTAL_STEPS} onBack={onBack} />

        <View style={styles.headingArea}>
          <Text style={styles.heading}>{"What are you\ninto?"}</Text>
          <Text style={styles.subtitle}>
            {count < MIN_SELECTIONS
              ? `Pick at least ${MIN_SELECTIONS} interests`
              : `${count} selected`}
          </Text>
        </View>

        <View style={styles.chipsWrap}>
          {INTERESTS.map(interest => {
            const isSelected = selected.has(interest.id);
            return (
              <Pressable
                key={interest.id}
                android_ripple={{ color: 'transparent' }}
                style={({ pressed }) => [
                  styles.chip,
                  isSelected && styles.chipSelected,
                  pressed && styles.pressed,
                ]}
                onPress={() => toggle(interest.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                accessibilityLabel={interest.label}
              >
                <Text style={styles.chipEmoji}>{interest.emoji}</Text>
                <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                  {interest.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
        <LinearGradient
          colors={canContinue ? Colors.brand.gradient : ['#3A1033', '#3A1033']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
        >
          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }) => [
              styles.continueBtnInner,
              pressed && canContinue && styles.pressed,
            ]}
            onPress={() => { if (canContinue) { onContinue(); } }}
            disabled={!canContinue}
            accessibilityRole="button"
            accessibilityLabel="Continue"
            accessibilityState={{ disabled: !canContinue }}
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

  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 100,
    backgroundColor: D.chipEmpty,
    borderWidth: 1.5,
    borderColor: D.chipEmptyBorder,
  },
  chipSelected: {
    backgroundColor: D.chipSelected,
    borderColor: D.chipSelectedBorder,
    shadowColor: Colors.brand.pink,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  chipEmoji: { fontSize: 16, lineHeight: 20 },
  chipLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  },
  chipLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
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
