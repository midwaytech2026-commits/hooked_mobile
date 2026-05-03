// ─── Install required packages ───────────────────────────────────────────────
// npm install @react-navigation/native @react-navigation/native-stack
// npm install react-native-screens
// cd ios && pod install
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View } from 'react-native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { LoginScreen } from '../screens/Auth/LoginScreen';
// import type { AuthStackParamList } from './routes';

// const Stack = createNativeStackNavigator<AuthStackParamList>();

// export function AuthNavigator(): React.JSX.Element {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
//     </Stack.Navigator>
//   );
// }

// Placeholder — remove after installing @react-navigation packages
export function AuthNavigator(): React.JSX.Element {
  return <View />;
}
