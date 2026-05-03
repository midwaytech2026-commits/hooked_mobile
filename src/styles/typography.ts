import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  h1: { fontSize: 34, fontWeight: '700', color: Colors.text.primary, letterSpacing: 0.37 },
  h2: { fontSize: 28, fontWeight: '700', color: Colors.text.primary },
  h3: { fontSize: 22, fontWeight: '600', color: Colors.text.primary },
  h4: { fontSize: 18, fontWeight: '600', color: Colors.text.primary },
  body: { fontSize: 16, fontWeight: '400', color: Colors.text.primary, lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400', color: Colors.text.secondary, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', color: Colors.text.secondary, lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600', color: Colors.text.inverse },
  link: { fontSize: 16, fontWeight: '400', color: Colors.primary },
});
