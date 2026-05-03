export const Routes = {
  // Intro
  INTRO: 'Intro',

  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  VERIFY: 'Verify',

  // Onboarding flow (post-registration)
  ONBOARDING_GENDER: 'OnboardingGender',
  ONBOARDING_LOOKING: 'OnboardingLooking',
  ONBOARDING_INTERESTS: 'OnboardingInterests',
  ONBOARDING_PHOTOS: 'OnboardingPhotos',
  ONBOARDING_BIO: 'OnboardingBio',

  // Main app
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
} as const;

// ─── Navigator param lists ────────────────────────────────────────────────────
// Uncomment after installing: npm install @react-navigation/native @react-navigation/native-stack

// export type RootStackParamList = {
//   Intro: undefined;
//   Auth: undefined;
//   Home: undefined;
//   Profile: { userId?: string };
//   Settings: undefined;
// };

// export type AuthStackParamList = {
//   Login: undefined;
//   Register: undefined;
// };
