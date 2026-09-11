import React from 'react';
import { Platform } from 'react-native';
import { OnboardingScreen as AndroidOnboarding } from './onboarding-screen.android';
import { OnboardingScreen as IOSOnboarding } from './onboarding-screen.ios';

interface OnboardingScreenProps {
  onFinish: () => void;
  onLoginPress: () => void;
}

export function OnboardingScreen(props: OnboardingScreenProps) {
  if (Platform.OS === 'android') {
    return <AndroidOnboarding {...props} />;
  }
  return <IOSOnboarding {...props} />;
}
