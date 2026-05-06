import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search conversations',
}: SearchBarProps): React.JSX.Element {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.28)"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : 'never'}
      />
      {Platform.OS === 'android' && value.length > 0 && (
        <Pressable
          android_ripple={{ color: 'transparent' }}
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
        >
          <Text style={styles.clearBtn}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
  },
  icon: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.3)',
    includeFontPadding: false,
    lineHeight: 22,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    padding: 0,
    includeFontPadding: false,
  },
  clearBtn: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    includeFontPadding: false,
  },
});
