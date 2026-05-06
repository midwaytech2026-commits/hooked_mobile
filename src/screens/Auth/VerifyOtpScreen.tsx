import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

// ── Constants ─────────────────────────────────────────────────────────────────
const OTP_LENGTH = 6;
const COUNTDOWN_START = 42;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Each box fills 1/6 of the screen width minus total gap space
const BOX_GAP = Spacing.sm + 2;
const BOX_SIZE = Math.min(
  54,
  Math.floor((SCREEN_WIDTH - Spacing.lg * 2 - BOX_GAP * (OTP_LENGTH - 1)) / OTP_LENGTH),
);

// ── Design tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: '#0D0D14',
  backBg: '#1B1B27',
  // OTP box states
  boxEmpty: '#1C1C2A',
  boxFilled: Colors.brand.pink,      // solid fallback — see LinearGradient comment below
  boxActiveBorder: Colors.brand.pink,
  boxActiveInnerBg: 'rgba(233,30,140,0.08)',
  // Text
  subtitleDim: 'rgba(255,255,255,0.55)',
  subtitleEmail: '#FFFFFF',
  resendDim: 'rgba(255,255,255,0.45)',
  resendAccent: '#FF4B6E',           // red-pink for countdown + resend link
  // Button
  btnOn: '#BF22A1',
  btnOff: '#3A1033',
  btnGlow: Colors.brand.pink,
} as const;

// ── Props ─────────────────────────────────────────────────────────────────────
export interface VerifyOtpScreenProps {
  /** Pre-masked email shown in the subtitle, e.g. "a***@midway.com" */
  maskedEmail?: string;
  onBack: () => void;
  onVerify: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function VerifyOtpScreen({
  maskedEmail = 'a***@midway.com',
  onBack,
  onVerify,
}: VerifyOtpScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  // ── OTP state
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  // ── Countdown state
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(COUNTDOWN_START);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Auto-start timer and focus first box on mount
  useEffect(() => {
    startCountdown();
    const t = setTimeout(() => inputRefs.current[0]?.focus(), 150);
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCountdown]);

  // ── OTP input handlers
  const handleChange = useCallback(
    (text: string, index: number) => {
      const digits = text.replace(/[^0-9]/g, '');

      if (digits.length > 1) {
        // Handle paste or iOS "oneTimeCode" autofill
        const next = [...otp];
        for (let j = 0; j < digits.length && index + j < OTP_LENGTH; j++) {
          next[index + j] = digits[j];
        }
        setOtp(next);
        const lastFilled = Math.min(index + digits.length, OTP_LENGTH - 1);
        inputRefs.current[lastFilled]?.focus();
        if (index + digits.length >= OTP_LENGTH) {
          inputRefs.current[OTP_LENGTH - 1]?.blur();
        }
      } else {
        const digit = digits.slice(-1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);

        if (digit && index < OTP_LENGTH - 1) {
          inputRefs.current[index + 1]?.focus();
        } else if (digit && index === OTP_LENGTH - 1) {
          // All boxes filled — dismiss keyboard so Verify button is visible
          inputRefs.current[OTP_LENGTH - 1]?.blur();
        }
      }
    },
    [otp],
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === 'Backspace' && !otp[index] && index > 0) {
        const next = [...otp];
        next[index - 1] = '';
        setOtp(next);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    startCountdown();
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
    // TODO: call API to resend OTP
  };

  // ── Derived values
  const isComplete = otp.every(d => d !== '');
  const countdownLabel = `0:${countdown.toString().padStart(2, '0')}`;

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
        {/* ── Main content ────────────────────────────────────────────── */}
        <View style={[styles.content, { paddingTop: topPad }]}>

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
            <Text style={styles.heading}>{"Verify it's you"}</Text>
            <Text style={styles.subtitle}>
              {'We sent a 6-digit code to '}
              <Text style={styles.subtitleEmail}>{maskedEmail}</Text>
            </Text>
          </View>

          {/* OTP boxes */}
          <View style={styles.otpRow} accessibilityLabel="Enter 6-digit code">
            {otp.map((digit, i) => {
              const isFilled = digit !== '';
              const isActive = focusedIdx === i;

              if (isFilled) {
                return (
                  <LinearGradient
                    key={i}
                    colors={Colors.brand.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.otpBox, styles.otpBoxFilled]}
                  >
                    <TextInput
                      ref={el => { inputRefs.current[i] = el; }}
                      style={styles.otpInput}
                      value={digit}
                      onChangeText={text => handleChange(text, i)}
                      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                      onFocus={() => setFocusedIdx(i)}
                      onBlur={() => setFocusedIdx(-1)}
                      keyboardType="numeric"
                      maxLength={2}
                      textAlign="center"
                      textAlignVertical="center"
                      selectTextOnFocus
                      caretHidden={Platform.OS === 'ios'}
                      selectionColor="transparent"
                      returnKeyType="done"
                      textContentType="oneTimeCode"
                      importantForAutofill="yes"
                      accessibilityLabel={`Digit ${i + 1} of ${OTP_LENGTH}`}
                    />
                  </LinearGradient>
                );
              }

              return (
                <TextInput
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  style={[styles.otpBox, isActive && styles.otpBoxActive]}
                  value={digit}
                  onChangeText={text => handleChange(text, i)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                  onFocus={() => setFocusedIdx(i)}
                  onBlur={() => setFocusedIdx(-1)}
                  keyboardType="numeric"
                  maxLength={2}
                  textAlign="center"
                  textAlignVertical="center"
                  selectTextOnFocus
                  caretHidden={Platform.OS === 'ios'}
                  selectionColor="transparent"
                  returnKeyType="done"
                  textContentType="oneTimeCode"
                  importantForAutofill="yes"
                  accessibilityLabel={`Digit ${i + 1} of ${OTP_LENGTH}`}
                />
              );
            })}
          </View>

          {/* Resend row */}
          <Pressable
            style={styles.resendRow}
            onPress={handleResend}
            disabled={countdown > 0}
            accessibilityRole={countdown === 0 ? 'button' : 'text'}
            accessibilityLabel={
              countdown > 0
                ? `Resend available in ${countdownLabel}`
                : 'Resend code'
            }
          >
            <Text style={styles.resendDimText}>{"Didn't get it?  "}</Text>
            <Text style={[styles.resendAccent, countdown === 0 && styles.resendLink]}>
              {countdown > 0 ? `Resend in ${countdownLabel}` : 'Resend code'}
            </Text>
          </Pressable>
        </View>

        {/* ── Sticky Verify button ────────────────────────────────────── */}
        <View
          style={[
            styles.bottomActions,
            { paddingBottom: Math.max(insets.bottom, Spacing.lg) },
          ]}
        >
          <LinearGradient
            colors={isComplete ? Colors.brand.gradient : ['#3A1033', '#3A1033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.verifyBtn}
          >
            <Pressable
              style={({ pressed }) => [
                styles.verifyBtnInner,
                pressed && isComplete && styles.pressed,
              ]}
              onPress={onVerify}
              disabled={!isComplete}
              accessibilityRole="button"
              accessibilityLabel="Verify code"
              accessibilityState={{ disabled: !isComplete }}
            >
              <Text style={styles.verifyBtnText}>Verify</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: D.bg },
  flex: { flex: 1 },

  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
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
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text.inverse,
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: D.subtitleDim,
    fontWeight: '400',
  },
  subtitleEmail: {
    color: D.subtitleEmail,
    fontWeight: '600',
  },

  // ── OTP row
  otpRow: {
    flexDirection: 'row',
    gap: BOX_GAP,
    marginBottom: Spacing.xl,
  },

  // Base box — empty state
  otpBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: BOX_SIZE / 2,
    backgroundColor: D.boxEmpty,
    // Typography
    fontSize: Math.floor(BOX_SIZE * 0.42),
    fontWeight: '700',
    color: Colors.text.inverse,
    includeFontPadding: false,    // removes Android-specific vertical padding
    // No border in empty state
    borderWidth: 0,
  },

  // Filled box — LinearGradient container
  otpBoxFilled: {
    overflow: 'hidden',
    shadowColor: Colors.brand.pink,
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },

  // TextInput inside the filled LinearGradient
  otpInput: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'transparent',
    fontSize: Math.floor(BOX_SIZE * 0.42),
    fontWeight: '700',
    color: Colors.text.inverse,
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  // Active box — focused but empty
  otpBoxActive: {
    backgroundColor: D.boxActiveInnerBg,
    borderWidth: 2,
    borderColor: D.boxActiveBorder,
  },

  // ── Resend section
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendDimText: {
    fontSize: 14,
    color: D.resendDim,
  },
  resendAccent: {
    fontSize: 14,
    fontWeight: '600',
    color: D.resendAccent,
  },
  resendLink: {
    textDecorationLine: 'underline',
  },

  // ── Bottom actions
  bottomActions: {
    backgroundColor: D.bg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },

  verifyBtn: {
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: D.btnGlow,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  verifyBtnInner: {
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.inverse,
    letterSpacing: 0.1,
  },

  pressed: { opacity: 0.72 },
});
