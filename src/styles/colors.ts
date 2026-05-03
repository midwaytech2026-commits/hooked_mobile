export const Colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  text: {
    primary: '#000000',
    secondary: '#6D6D72',
    disabled: '#C7C7CC',
    inverse: '#FFFFFF',
  },

  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    border: '#38383A',
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF599',
    },
  },

  // MidWay brand palette — used by IntroductionScreen and auth flows
  brand: {
    pink: '#E91E8C',          // gradient start / "love" word / label accent
    purple: '#7B2FBE',        // gradient end / logo background
    pinkLight: '#FF4B9A',     // label text (PREMIUM DATING · INVITE ONLY)
    bgDeep: '#0F0020',        // intro background base (very dark purple-black)
    // LinearGradient colors array (install react-native-linear-gradient):
    gradient: ['#E91E8C', '#7B2FBE'] as [string, string],
  },
} as const;
