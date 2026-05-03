import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';
import { OnboardingProgress } from './OnboardingProgress';

interface OnboardingHeaderProps {
  step: number;   // current step, 1-indexed
  total: number;  // total number of steps
  onBack: () => void;
}

export function OnboardingHeader({ step, total, onBack }: OnboardingHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backChevron}>‹</Text>
      </Pressable>

      <View style={styles.progressWrap}>
        <OnboardingProgress total={total} current={step} />
      </View>

      <Text style={styles.stepLabel}>{step} of {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B1B27',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  backChevron: {
    color: Colors.text.inverse,
    fontSize: 28,
    lineHeight: 34,
    marginLeft: -2,
    fontWeight: '300',
  },
  progressWrap: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    flexShrink: 0,
    fontWeight: '500',
  },
  pressed: { opacity: 0.72 },
});
