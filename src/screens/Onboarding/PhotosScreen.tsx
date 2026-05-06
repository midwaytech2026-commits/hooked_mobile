import React, { useState } from 'react';
import {
  Dimensions,
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
const MIN_PHOTOS = 2;
const TOTAL_SLOTS = 6;
const GRID_COLS = 3;
const GRID_GAP = 8;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLOT_WIDTH = Math.floor(
  (SCREEN_WIDTH - Spacing.lg * 2 - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS,
);
const SLOT_HEIGHT = Math.floor(SLOT_WIDTH * 1.3);

const D = {
  bg: '#0D0D14',
  slotBg: '#1B1B27',
  slotBorder: '#2A2A3C',
  btnOn: '#BF22A1',
  btnOff: '#3A1033',
  btnGlow: Colors.brand.pink,
  dimText: 'rgba(255,255,255,0.55)',
} as const;

export interface PhotosScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function PhotosScreen({
  onBack,
  onContinue,
}: PhotosScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [filled, setFilled] = useState<boolean[]>(Array(TOTAL_SLOTS).fill(false));

  const filledCount = filled.filter(Boolean).length;
  const canContinue = filledCount >= MIN_PHOTOS;

  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24) + Spacing.md
      : insets.top + Spacing.md;

  const handleSlotPress = (index: number) => {
    // TODO: integrate react-native-image-picker
    // For now, toggling filled state as a placeholder
    setFilled(prev => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.scroll, { paddingTop: topPad }]}
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader step={4} total={TOTAL_STEPS} onBack={onBack} />

        <View style={styles.headingArea}>
          <Text style={styles.heading}>{"Add your\nbest photos"}</Text>
          <Text style={styles.subtitle}>
            {filledCount < MIN_PHOTOS
              ? `Add at least ${MIN_PHOTOS} photos to continue`
              : `${filledCount} photo${filledCount !== 1 ? 's' : ''} added`}
          </Text>
        </View>

        {/* 2-column × 3-row photo grid */}
        <View style={styles.grid}>
          {filled.map((isFilled, i) => (
            <Pressable
              key={i}
              android_ripple={{ color: 'transparent' }}
              style={({ pressed }) => [
                styles.slot,
                isFilled && styles.slotFilled,
                pressed && styles.pressed,
              ]}
              onPress={() => handleSlotPress(i)}
              accessibilityRole="button"
              accessibilityLabel={i === 0 ? 'Main photo slot' : `Photo slot ${i + 1}`}
            >
              {isFilled ? (
                <View style={styles.slotInner}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              ) : (
                <View style={styles.slotInner}>
                  <Text style={styles.plusIcon}>+</Text>
                </View>
              )}

              {i === 0 && (
                <View style={styles.mainBadge}>
                  <Text style={styles.mainBadgeText}>MAIN</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Tips card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>💡</Text>
          <Text style={styles.infoText}>
            {'Profiles with 4+ photos get '}
            <Text style={styles.infoAccent}>3× more matches</Text>
            {'. Your first photo is your main profile image.'}
          </Text>
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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    marginBottom: Spacing.lg,
  },

  slot: {
    width: SLOT_WIDTH,
    height: SLOT_HEIGHT,
    borderRadius: 14,
    backgroundColor: D.slotBg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: D.slotBorder,
    overflow: 'hidden',
  },
  slotFilled: {
    borderStyle: 'solid',
    borderColor: Colors.brand.pink,
    backgroundColor: 'rgba(233,30,140,0.1)',
  },
  slotInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '300',
    lineHeight: 34,
  },
  checkIcon: {
    fontSize: 28,
    color: Colors.brand.pink,
    fontWeight: '600',
  },

  mainBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: Colors.brand.pink,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  mainBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  infoCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: '#1B1B27',
    borderWidth: 1,
    borderColor: '#2A2A3C',
    borderRadius: 14,
    padding: Spacing.md,
    alignItems: 'flex-start',
  },
  infoEmoji: { fontSize: 16, lineHeight: 22 },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: D.dimText,
  },
  infoAccent: {
    color: Colors.brand.pinkLight,
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
