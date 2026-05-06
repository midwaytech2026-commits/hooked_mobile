/**
 * RegisterScreen — Create your MidWay account.
 *
 * Gradient button:
 *   npm install react-native-linear-gradient && cd ios && pod install
 *   then swap the Pressable block with the LinearGradient block (both marked below).
 *
 * Icons:
 *   For production-quality icons:
 *   npm install react-native-vector-icons
 *   npm install --save-dev @types/react-native-vector-icons
 *   then replace PersonIcon / EmailIcon / LockIcon with the library components.
 */

import React, { useRef, useState } from 'react';
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
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputField } from '../../components/forms/InputField';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { getEmailError, isValidEmail } from '../../utils/validators';

// ── Screen-local design tokens ────────────────────────────────────────────────
const D = {
  bg: '#0D0D14',
  inputBg: '#1B1B27',
  inputBorder: '#2A2A3C',
  inputText: '#FFFFFF',
  placeholder: '#55556A',
  iconColor: '#55556A',
  dimText: 'rgba(255,255,255,0.55)',
  backBg: '#1B1B27',
  toggleOff: '#2A2A3C',
  toggleOn: Colors.brand.purple,
  btnOn: '#BF22A1',
  btnOff: '#3A1033',
  btnGlow: Colors.brand.pink,
} as const;

// Shared input overrides — reused on all three fields
const darkInputBox: ViewStyle = {
  backgroundColor: D.inputBg,
  borderColor: D.inputBorder,
  borderRadius: 14,
  borderWidth: 1,
};

// ── Simple geometric icons ────────────────────────────────────────────────────
// Replace these with react-native-vector-icons for pixel-perfect SVG icons.

function PersonIcon(): React.JSX.Element {
  return (
    <View style={iconStyles.box}>
      {/* Head */}
      <View style={iconStyles.personHead} />
      {/* Shoulders */}
      <View style={iconStyles.personBody} />
    </View>
  );
}

function EmailIcon(): React.JSX.Element {
  // "@" reads clearly as an email field on any font
  return <Text style={iconStyles.atSign}>@</Text>;
}

function LockIcon(): React.JSX.Element {
  return (
    <View style={iconStyles.box}>
      {/* Shackle */}
      <View style={iconStyles.lockShackle} />
      {/* Body */}
      <View style={iconStyles.lockBody} />
    </View>
  );
}

const IC = D.iconColor;
const iconStyles = StyleSheet.create({
  box: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  personHead: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: IC, marginBottom: 2 },
  personBody: {
    width: 15,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: IC,
  },
  atSign: { color: IC, fontSize: 17, lineHeight: 20, fontWeight: '400' },
  lockShackle: {
    width: 11,
    height: 7,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: IC,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  lockBody: { width: 16, height: 11, backgroundColor: IC, borderRadius: 3 },
});

// ── Props ─────────────────────────────────────────────────────────────────────
export interface RegisterScreenProps {
  onBack: () => void;
  onSignIn: () => void;
  onContinue: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function RegisterScreen({
  onBack,
  onSignIn,
  onContinue,
}: RegisterScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // ── Form state
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Derived validation
  const firstNameError =
    submitted && !firstName.trim() ? 'First name is required' : undefined;
  const emailError = submitted ? getEmailError(email) : undefined;
  const passwordError = submitted
    ? !password
      ? 'Password is required'
      : password.length < 8
        ? 'Minimum 8 characters'
        : undefined
    : undefined;

  const isFormValid =
    !!firstName.trim() &&
    isValidEmail(email) &&
    password.length >= 8 &&
    agreedToTerms;

  const handleContinue = () => {
    setSubmitted(true);
    if (!isFormValid) return;
    onContinue();
  };

  // Top padding accounts for status bar on both platforms
  const topPad =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight ?? 24) + Spacing.md
      : insets.top + Spacing.md;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={D.bg} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Scrollable content ──────────────────────────────────────── */}
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scroll, { paddingTop: topPad }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>

          {/* Heading */}
          <View style={styles.headingArea}>
            <Text style={styles.heading}>
              {'Create your\n'}
              {/* Two-tone approximation of pink→purple gradient */}
              <Text style={styles.headingPink}>Mid</Text>
              <Text style={styles.headingPurple}>Way.</Text>
            </Text>
            <Text style={styles.subtitle}>
              {"Start with the basics. We'll personalize your experience next."}
            </Text>
          </View>

          {/* Form fields */}
          <View style={styles.form}>
            <InputField
              leftIcon={<PersonIcon />}
              inputBoxStyle={darkInputBox}
              style={styles.darkInputText}
              placeholder="First name"
              placeholderTextColor={D.placeholder}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              value={firstName}
              onChangeText={setFirstName}
              onSubmitEditing={() => emailRef.current?.focus()}
              error={firstNameError}
            />
            <InputField
              ref={emailRef}
              leftIcon={<EmailIcon />}
              inputBoxStyle={darkInputBox}
              style={styles.darkInputText}
              placeholder="Email address"
              placeholderTextColor={D.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => passwordRef.current?.focus()}
              error={emailError}
            />
            <InputField
              ref={passwordRef}
              leftIcon={<LockIcon />}
              inputBoxStyle={darkInputBox}
              style={styles.darkInputText}
              placeholder="Password"
              placeholderTextColor={D.placeholder}
              secureTextEntry
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleContinue}
              error={passwordError}
            />
          </View>

          {/* Terms & age confirmation */}
          <Pressable
            style={styles.termsRow}
            onPress={() => setAgreedToTerms(v => !v)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreedToTerms }}
            accessibilityLabel="Agree to Terms and Privacy Policy"
          >
            {/* Toggle circle */}
            <View style={[styles.toggle, agreedToTerms && styles.toggleChecked]}>
              {agreedToTerms && (
                <Text style={styles.checkmark} accessible={false}>
                  ✓
                </Text>
              )}
            </View>

            <Text style={styles.termsText}>
              {"I agree to MidWay's "}
              <Text style={styles.termsLink}>Terms</Text>
              {' and '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
              {", and confirm I'm at least 18."}
            </Text>
          </Pressable>
        </ScrollView>

        {/* ── Sticky bottom actions ───────────────────────────────────── */}
        <View
          style={[
            styles.bottomActions,
            { paddingBottom: Math.max(insets.bottom, Spacing.lg) },
          ]}
        >
          <LinearGradient
            colors={agreedToTerms ? Colors.brand.gradient : ['#3A1033', '#3A1033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueBtn}
          >
            <Pressable
              style={({ pressed }) => [
                styles.continueBtnInner,
                pressed && agreedToTerms && styles.pressed,
              ]}
              onPress={handleContinue}
              disabled={!agreedToTerms}
              accessibilityRole="button"
              accessibilityLabel="Continue"
              accessibilityState={{ disabled: !agreedToTerms }}
            >
              <Text style={styles.continueBtnText}>Continue</Text>
            </Pressable>
          </LinearGradient>

          {/* Sign in link */}
          <Pressable
            style={({ pressed }) => [styles.signInRow, pressed && styles.pressed]}
            onPress={onSignIn}
            accessibilityRole="button"
            accessibilityLabel="Sign in to existing account"
          >
            <Text style={styles.signInText}>
              {'Already a member? '}
              <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: D.bg },
  flex: { flex: 1 },

  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // ── Back button
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: D.backBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  // ‹ optical correction: slightly shift left and down to visually centre
  backChevron: {
    color: Colors.text.inverse,
    fontSize: 28,
    lineHeight: 34,
    marginLeft: -2,
    fontWeight: '300',
  },

  // ── Heading
  headingArea: {
    marginBottom: Spacing.xl + Spacing.md,
    gap: Spacing.sm,
  },
  heading: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.text.inverse,
    lineHeight: 47,
    letterSpacing: -0.5,
  },
  headingPink: { color: Colors.brand.pink },
  headingPurple: { color: Colors.brand.purple },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: D.dimText,
    fontWeight: '400',
  },

  // ── Form
  form: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  // Passed as `style` prop to the inner TextInput in icon mode
  darkInputText: { color: D.inputText },

  // ── Terms row
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: D.toggleOff,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  toggleChecked: {
    backgroundColor: D.toggleOn,
    borderColor: D.toggleOn,
    // Subtle glow when checked
    shadowColor: Colors.brand.purple,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  checkmark: {
    color: Colors.text.inverse,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
    includeFontPadding: false,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: D.dimText,
    lineHeight: 21,
  },
  termsLink: {
    color: Colors.text.inverse,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // ── Bottom actions (sticky)
  bottomActions: {
    backgroundColor: D.bg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
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

  // ── Sign in row
  signInRow: { alignItems: 'center', paddingVertical: Spacing.xs },
  signInText: { fontSize: 14, color: D.dimText },
  signInLink: { color: Colors.brand.pink, fontWeight: '600' },

  pressed: { opacity: 0.72 },
});
