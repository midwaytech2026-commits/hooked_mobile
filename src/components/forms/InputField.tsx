import React, { forwardRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  /** Icon element rendered on the left side of the input (e.g. PersonIcon, EmailIcon). */
  leftIcon?: React.ReactNode;
  /**
   * Style overrides for the input row container when leftIcon is used.
   * Applied after defaults so any property here wins (backgroundColor, borderColor, etc.).
   * Has no effect when leftIcon is not provided.
   */
  inputBoxStyle?: ViewStyle;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, error, hint, style, leftIcon, inputBoxStyle, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={styles.wrapper}>
        {label && <Text style={styles.label}>{label}</Text>}

        {leftIcon ? (
          // ── Icon mode ──────────────────────────────────────────────────────
          // inputBoxStyle comes before state styles so focused/errored always win.
          <View
            style={[
              styles.inputBox,
              inputBoxStyle,
              isFocused && styles.focused,
              !!error && styles.errored,
            ]}
          >
            <View style={styles.iconSlot} pointerEvents="none">
              {leftIcon}
            </View>
            <TextInput
              ref={ref}
              style={[styles.inputInner, style]}
              placeholderTextColor={Colors.text.disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...rest}
            />
          </View>
        ) : (
          // ── Standard mode — original behaviour, untouched ─────────────────
          <TextInput
            ref={ref}
            style={[
              styles.input,
              isFocused && styles.focused,
              !!error && styles.errored,
              style,
            ]}
            placeholderTextColor={Colors.text.disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />
        )}

        {hint && !error && <Text style={styles.hint}>{hint}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

InputField.displayName = 'InputField';

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.xs },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },

  // ── Standard mode ─────────────────────────────────────────────────────────
  input: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Spacing.sm + 4,
    fontSize: 16,
    color: Colors.text.primary,
    backgroundColor: Colors.surface,
    minHeight: 48,
  },

  // Shared: apply to TextInput (standard) or inputBox container (icon mode)
  focused: { borderColor: Colors.primary },
  errored: { borderColor: Colors.error },

  // ── Icon mode ─────────────────────────────────────────────────────────────
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    minHeight: 56,
    overflow: 'hidden',
  },
  // Centered slot for the left icon
  iconSlot: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.sm,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // TextInput inside the icon container
  inputInner: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingRight: Spacing.md,
    fontSize: 16,
    color: Colors.text.primary,
  },

  hint: { fontSize: 12, color: Colors.text.disabled },
  errorText: { fontSize: 12, color: Colors.error },
});
