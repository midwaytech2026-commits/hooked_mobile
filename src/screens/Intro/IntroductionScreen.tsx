/**
 * IntroductionScreen — MidWay onboarding / welcome screen.
 *
 * Background image:
 *   Drop your hero photo at  src/assets/images/intro-bg.jpg
 *   then uncomment the THREE lines marked  ← ADD IMAGE
 *
 * Gradient button:
 *   npm install react-native-linear-gradient && cd ios && pod install
 *   then swap the Pressable block with the LinearGradient block (both marked below).
 */

import React from 'react';
import {
  Dimensions,
  // ImageBackground,       ← ADD IMAGE (step 1 of 3)
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import LinearGradient from 'react-native-linear-gradient';

// ── Uncomment when image is ready ────────────────────────────────────────────
// const BG_IMAGE = require('../../assets/images/intro-bg.jpg');  ← ADD IMAGE (step 2 of 3)

// ── Local design tokens (intro-screen only) ───────────────────────────────────
const B = {
  bgDeep: Colors.brand.bgDeep,
  bgGlow: '#3D0F6B',           // subtle purple atmosphere for the dark bg
  overlay: 'rgba(0,0,0,0.42)',
  logoRing: Colors.brand.purple,
  accent: Colors.brand.pinkLight,
  love: Colors.brand.pink,
  textDim: 'rgba(255,255,255,0.68)',
  btnPrimary: '#BF22A1',       // midpoint of pink→purple; swap with LinearGradient
  btnPrimaryGlow: Colors.brand.pink,
  btnSecondary: 'rgba(255,255,255,0.11)',
  btnSecondaryBorder: 'rgba(255,255,255,0.18)',
} as const;

const { width: SW } = Dimensions.get('window');
// Scale headline based on screen width
const HEADLINE_SIZE = SW < 375 ? 36 : SW < 414 ? 42 : 46;
const HEADLINE_LINE = HEADLINE_SIZE * 1.18;

// ── Props ─────────────────────────────────────────────────────────────────────
export interface IntroductionScreenProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function IntroductionScreen({
  onCreateAccount,
  onSignIn,
}: IntroductionScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  // Extra top padding on Android when StatusBar is translucent
  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, (StatusBar.currentHeight ?? 24)) + Spacing.md
      : insets.top + Spacing.md;

  const bottomPad = Math.max(insets.bottom, Spacing.lg);

  return (
    <View style={styles.root}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      {/* ── Background ─────────────────────────────────────────────────────
          Replace the two Views below with ImageBackground once image is ready:

          <ImageBackground                     ← ADD IMAGE (step 3 of 3)
            source={BG_IMAGE}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
      ──────────────────────────────────────────────────────────────────── */}
      <View style={styles.bgBase} />
      <View style={styles.bgGlowTopLeft} />
      <View style={styles.bgGlowCenter} />
      <View style={styles.bgScrimBottom} />
      <View style={styles.overlay} />

      {/* ── Scrollable content (layout) ─────────────────────────────────── */}
      <View
        style={[
          styles.layout,
          { paddingTop: topPad, paddingBottom: bottomPad },
        ]}
      >
        {/* ── Header: logo ─────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoHeart} accessible={false}>
              ♥
            </Text>
          </View>
          <Text style={styles.logoText}>MidWay</Text>
        </View>

        {/* ── Hero content ─────────────────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Eyebrow label */}
          <Text style={styles.label} accessibilityRole="text">
            PREMIUM DATING · INVITE ONLY
          </Text>

          {/* Headline — "love" rendered pink inline */}
          <Text style={styles.headline}>
            {'Where modern\n'}
            <Text style={styles.headlineLove}>love</Text>
            {' begins.'}
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Curated matches, cinematic conversations, and a community designed
            for something real.
          </Text>

          {/* ── Buttons ─────────────────────────────────────────────────── */}
          <View style={styles.buttons}>
            <LinearGradient
              colors={Colors.brand.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryBtn}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.primaryBtnInner,
                  pressed && styles.pressed,
                ]}
                onPress={onCreateAccount}
                accessibilityRole="button"
                accessibilityLabel="Create account"
              >
                <Text style={styles.primaryBtnText}>Create account</Text>
              </Pressable>
            </LinearGradient>

            {/* Secondary button */}
            <Pressable
              style={({ pressed }) => [
                styles.secondaryBtn,
                pressed && styles.pressed,
              ]}
              onPress={onSignIn}
              accessibilityRole="button"
              accessibilityLabel="I already have an account"
            >
              <Text style={styles.secondaryBtnText}>
                I already have an account
              </Text>
            </Pressable>
          </View>

          {/* ── Footer ──────────────────────────────────────────────────── */}
          <Text style={styles.footer}>
            {'By continuing you agree to our '}
            <Text style={styles.footerLink}>Terms</Text>
            {' and '}
            <Text style={styles.footerLink}>Privacy Policy</Text>
            {'.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // ── Root & background
  root: {
    flex: 1,
    backgroundColor: B.bgDeep,
  },
  bgBase: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: B.bgDeep,
  },
  // Soft purple atmosphere top-left (simulates warm light source)
  bgGlowTopLeft: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: SW * 0.9,
    height: SW * 0.9,
    borderRadius: (SW * 0.9) / 2,
    backgroundColor: B.bgGlow,
    opacity: 0.28,
  },
  // Faint warm glow near center-bottom
  bgGlowCenter: {
    position: 'absolute',
    bottom: '20%',
    right: -60,
    width: SW * 0.7,
    height: SW * 0.7,
    borderRadius: (SW * 0.7) / 2,
    backgroundColor: Colors.brand.pink,
    opacity: 0.08,
  },
  // Dark gradient at the bottom so text is always legible
  bgScrimBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#000000',
    opacity: 0.55,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: B.overlay,
  },

  // ── Layout
  layout: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // ── Header / Logo
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: B.logoRing,
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle glow so it pops on the dark bg
    shadowColor: Colors.brand.pink,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  logoHeart: {
    fontSize: 20,
    color: Colors.text.inverse,
    lineHeight: 24,
    includeFontPadding: false,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.inverse,
    letterSpacing: 0.2,
  },

  // ── Hero section
  hero: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: B.accent,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  headline: {
    fontSize: HEADLINE_SIZE,
    fontWeight: '800',
    color: Colors.text.inverse,
    lineHeight: HEADLINE_LINE,
    letterSpacing: -0.5,
  },
  headlineLove: {
    color: B.love,
    // fontStyle: 'italic', // optional — uncomment for italic "love"
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: B.textDim,
    fontWeight: '400',
  },

  // ── Buttons
  buttons: {
    gap: Spacing.sm + 4,
    marginTop: Spacing.xs,
  },

  // Shared outer shape — used by both the Pressable version and LinearGradient wrapper
  primaryBtn: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: B.btnPrimary,
    // Pink glow simulates the gradient luminosity
    shadowColor: B.btnPrimaryGlow,
    shadowOpacity: 0.65,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  // Inner padded content — used by both Pressable and inner-Pressable (LinearGradient)
  primaryBtnInner: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.inverse,
    letterSpacing: 0.15,
  },

  secondaryBtn: {
    borderRadius: 100,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: B.btnSecondary,
    borderWidth: 1,
    borderColor: B.btnSecondaryBorder,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.inverse,
  },

  pressed: { opacity: 0.78 },

  // ── Footer
  footer: {
    fontSize: 12,
    color: B.textDim,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xs,
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
});
