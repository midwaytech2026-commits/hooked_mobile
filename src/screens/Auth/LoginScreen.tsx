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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { getEmailError } from '../../utils/validators';
import { InputField } from '../../components/forms/InputField';

// ── Design tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: '#0D0D14',
  inputBg: '#1B1B27',
  inputBorder: '#2A2A3C',
  inputText: '#FFFFFF',
  placeholder: '#55556A',
  icon: '#55556A',
  dimText: 'rgba(255,255,255,0.55)',
  backBg: '#1B1B27',
  socialBg: '#1B1B27',
  socialBorder: '#2A2A3C',
  orLine: '#2A2A3C',
  btnGlow: Colors.brand.pink,
} as const;

const darkInputBox: ViewStyle = {
  backgroundColor: D.inputBg,
  borderColor: D.inputBorder,
  borderRadius: 14,
  borderWidth: 1,
};

// ── Inline icons ──────────────────────────────────────────────────────────────
function EmailIcon(): React.JSX.Element {
  return <Text style={iconSt.char}>✉</Text>;
}

function LockIcon(): React.JSX.Element {
  return (
    <View style={iconSt.box}>
      <View style={iconSt.shackle} />
      <View style={iconSt.body} />
    </View>
  );
}

const iconSt = StyleSheet.create({
  box: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  char: { color: D.icon, fontSize: 16, lineHeight: 20, includeFontPadding: false },
  shackle: {
    width: 11, height: 7,
    borderWidth: 2, borderBottomWidth: 0, borderColor: D.icon,
    borderTopLeftRadius: 6, borderTopRightRadius: 6,
  },
  body: { width: 16, height: 11, backgroundColor: D.icon, borderRadius: 3 },
});

// ── Social button ─────────────────────────────────────────────────────────────
function SocialButton({
  icon, iconColor, onPress, accessibilityLabel,
}: {
  icon: string;
  iconColor?: string;
  onPress: () => void;
  accessibilityLabel: string;
}): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={[styles.socialIcon, iconColor ? { color: iconColor } : null]}>
        {icon}
      </Text>
    </Pressable>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
export interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function LoginScreen({
  onBack,
  onLoginSuccess,
  onNavigateToRegister,
}: LoginScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted ? getEmailError(email) : undefined;
  const passwordError = submitted && !password.trim() ? 'Password is required' : undefined;
  const isFormValid = !getEmailError(email) && !!password.trim();

  const handleSignIn = () => {
    setSubmitted(true);
    if (!isFormValid) { return; }
    onLoginSuccess();
  };

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
            <Text style={styles.heading}>{'Welcome\nback.'}</Text>
            <Text style={styles.subtitle}>
              Sign in to continue your story on MidWay.
            </Text>
          </View>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <View style={styles.form}>
            <InputField
              leftIcon={<EmailIcon />}
              inputBoxStyle={darkInputBox}
              style={styles.darkInput}
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
              style={styles.darkInput}
              placeholder="Password"
              placeholderTextColor={D.placeholder}
              secureTextEntry
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleSignIn}
              error={passwordError}
            />
          </View>

          {/* Forgot password */}
          <Pressable
            style={({ pressed }) => [styles.forgotWrap, pressed && styles.pressed]}
            onPress={() => console.log('Forgot password')}
            accessibilityRole="button"
            accessibilityLabel="Forgot password"
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>
        </ScrollView>

        {/* ── Sticky bottom actions ───────────────────────────────────── */}
        <View
          style={[
            styles.bottomSection,
            { paddingBottom: Math.max(insets.bottom, Spacing.lg) },
          ]}
        >
          {/* Sign in gradient button */}
          <LinearGradient
            colors={Colors.brand.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInBtn}
          >
            <Pressable
              style={({ pressed }) => [styles.signInBtnInner, pressed && styles.pressed]}
              onPress={handleSignIn}
              accessibilityRole="button"
              accessibilityLabel="Sign in"
            >
              <Text style={styles.signInBtnText}>Sign in</Text>
            </Pressable>
          </LinearGradient>

          {/* OR divider */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <SocialButton
              icon="⌘"
              onPress={() => console.log('Apple sign in')}
              accessibilityLabel="Sign in with Apple"
            />
            <SocialButton
              icon="G"
              iconColor="#4285F4"
              onPress={() => console.log('Google sign in')}
              accessibilityLabel="Sign in with Google"
            />
            <SocialButton
              icon="☎"
              onPress={() => console.log('Phone sign in')}
              accessibilityLabel="Sign in with phone"
            />
          </View>

          {/* Create account link */}
          <Pressable
            style={({ pressed }) => [styles.createRow, pressed && styles.pressed]}
            onPress={onNavigateToRegister}
            accessibilityRole="button"
            accessibilityLabel="Create a new account"
          >
            <Text style={styles.createText}>
              {'New here? '}
              <Text style={styles.createLink}>Create account</Text>
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

  // Back button
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: D.backBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  backChevron: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    marginLeft: -2,
    fontWeight: '300',
  },

  // Heading
  headingArea: {
    marginBottom: Spacing.xl + Spacing.md,
    gap: Spacing.sm,
  },
  heading: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 49,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: D.dimText,
  },

  // Form
  form: {
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  darkInput: { color: D.inputText },

  // Forgot password
  forgotWrap: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.xs,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.brand.pink,
  },

  // Sticky bottom
  bottomSection: {
    backgroundColor: D.bg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },

  // Sign in button
  signInBtn: {
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: D.btnGlow,
    shadowOpacity: 0.65,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  signInBtnInner: {
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },

  // OR divider
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: D.orLine,
  },
  orText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
  },

  // Social buttons
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    backgroundColor: D.socialBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: D.socialBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    includeFontPadding: false,
  },

  // Create account
  createRow: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  createText: {
    fontSize: 14,
    color: D.dimText,
  },
  createLink: {
    color: Colors.brand.pink,
    fontWeight: '600',
  },

  pressed: { opacity: 0.72 },
});
