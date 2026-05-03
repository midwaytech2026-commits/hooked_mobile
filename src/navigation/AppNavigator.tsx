/**
 * AppNavigator — screen routing for MidWay.
 *
 * Uses a lightweight React state machine so the app runs without any
 * navigation package installed. Every screen receives plain callback props
 * instead of a navigation object.
 *
 * ── To upgrade to @react-navigation ──────────────────────────────────────────
 * npm install @react-navigation/native @react-navigation/native-stack
 * npm install react-native-screens
 * cd ios && pod install
 *
 * Then replace this file with the NavigationContainer block at the bottom
 * (marked ── @react-navigation version ──).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { IntroductionScreen } from '../screens/Intro';
import { LoginScreen, RegisterScreen, VerifyOtpScreen } from '../screens/Auth';
import {
  GenderIdentityScreen,
  LookingForScreen,
  InterestsScreen,
  PhotosScreen,
  BioScreen,
} from '../screens/Onboarding';
import { HomeScreen } from '../screens/Home';

// ── Screen identifiers ────────────────────────────────────────────────────────
type ActiveScreen =
  | 'intro'
  | 'login'
  | 'register'
  | 'verify'
  | 'onboarding_gender'
  | 'onboarding_looking'
  | 'onboarding_interests'
  | 'onboarding_photos'
  | 'onboarding_bio'
  | 'home';

// ── State-machine navigator ───────────────────────────────────────────────────
export function AppNavigator(): React.JSX.Element {
  const [screen, setScreen] = useState<ActiveScreen>('intro');

  switch (screen) {
    case 'intro':
      return (
        <IntroductionScreen
          onCreateAccount={() => setScreen('register')}
          onSignIn={() => setScreen('login')}
        />
      );

    case 'register':
      return (
        <RegisterScreen
          onBack={() => setScreen('intro')}
          onSignIn={() => setScreen('login')}
          onContinue={() => setScreen('verify')}
        />
      );

    case 'verify':
      return (
        <VerifyOtpScreen
          // Replace with the actual registered email once auth is wired up.
          // e.g. maskedEmail={maskEmail(registeredEmail)}
          maskedEmail="a***@midway.com"
          onBack={() => setScreen('register')}
          onVerify={() => setScreen('onboarding_gender')}
        />
      );

    case 'login':
      return (
        <LoginScreen
          onLoginSuccess={() => setScreen('home')}
          onNavigateToRegister={() => setScreen('register')}
        />
      );

    case 'onboarding_gender':
      return (
        <GenderIdentityScreen
          onBack={() => setScreen('verify')}
          onContinue={() => setScreen('onboarding_looking')}
        />
      );

    case 'onboarding_looking':
      return (
        <LookingForScreen
          onBack={() => setScreen('onboarding_gender')}
          onContinue={() => setScreen('onboarding_interests')}
        />
      );

    case 'onboarding_interests':
      return (
        <InterestsScreen
          onBack={() => setScreen('onboarding_looking')}
          onContinue={() => setScreen('onboarding_photos')}
        />
      );

    case 'onboarding_photos':
      return (
        <PhotosScreen
          onBack={() => setScreen('onboarding_interests')}
          onContinue={() => setScreen('onboarding_bio')}
        />
      );

    case 'onboarding_bio':
      return (
        <BioScreen
          onBack={() => setScreen('onboarding_photos')}
          onEnterMidWay={() => setScreen('home')}
        />
      );

    case 'home':
    default:
      return <HomeScreen />;
  }
}

// ── @react-navigation version (uncomment after package install) ───────────────
//
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useAuth } from '../hooks/useAuth';
// import { LoadingSpinner } from '../components/common/LoadingSpinner';
// import { AuthNavigator } from './AuthNavigator';
// import { ProfileScreen } from '../screens/Profile';
// import { SettingsScreen } from '../screens/Settings';
// import type { RootStackParamList } from './routes';
//
// const Stack = createNativeStackNavigator<RootStackParamList>();
//
// function RootNavigator(): React.JSX.Element {
//   const { isAuthenticated, isLoading } = useAuth();
//
//   if (isLoading) return <LoadingSpinner fullScreen />;
//
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
//       {isAuthenticated ? (
//         <>
//           <Stack.Screen name="Home"     component={HomeScreen} />
//           <Stack.Screen name="Profile"  component={ProfileScreen} />
//           <Stack.Screen name="Settings" component={SettingsScreen} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="Intro"    component={IntroductionScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="Verify"   component={VerifyOtpScreen} />
//           <Stack.Screen name="Auth"     component={AuthNavigator} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }
//
// export function AppNavigator(): React.JSX.Element {
//   return (
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }
