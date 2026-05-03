import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/forms/InputField';
import { Colors } from '../../styles/colors';
import { Spacing } from '../../styles/spacing';
import { Typography } from '../../styles/typography';
import { getEmailError, getPasswordError } from '../../utils/validators';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
  onNavigateToRegister?: () => void;
}

export function LoginScreen({
  onLoginSuccess: _onLoginSuccess,
  onNavigateToRegister,
}: LoginScreenProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailError = submitted ? getEmailError(email) : undefined;
  const passwordError = submitted ? getPasswordError(password) : undefined;
  const canSubmit = !getEmailError(email) && !getPasswordError(password);

  const handleLogin = async () => {
    setSubmitted(true);
    if (!canSubmit) return;
    setIsLoading(true);
    try {
      // await authService.login({ email, password });
      // onLoginSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={Typography.h2}>Welcome back</Text>
        <Text style={[Typography.bodySmall, styles.subtitle]}>
          Sign in to continue
        </Text>

        <View style={styles.form}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="you@example.com"
            error={emailError}
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            error={passwordError}
          />
        </View>

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
        />

        {onNavigateToRegister && (
          <TouchableOpacity onPress={onNavigateToRegister} style={styles.link}>
            <Text style={Typography.bodySmall}>
              Don&apos;t have an account?{' '}
              <Text style={styles.linkText}>Register</Text>
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: {
    flexGrow: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
    gap: Spacing.md,
  },
  subtitle: { marginTop: Spacing.xs },
  form: { gap: Spacing.md, marginVertical: Spacing.sm },
  link: { alignItems: 'center', marginTop: Spacing.sm },
  linkText: { color: Colors.primary, fontWeight: '600' },
});
