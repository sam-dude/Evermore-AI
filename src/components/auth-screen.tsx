import React from 'react';
import { Platform } from 'react-native';
import { AuthScreen as AndroidAuthScreen } from './auth-screen.android';
import { AuthScreen as IOSAuthScreen } from './auth-screen.ios';

interface AuthScreenProps {
  initialMode?: 'signin' | 'signup';
  onBackToOnboarding?: () => void;
}

export function AuthScreen(props: AuthScreenProps) {
  if (Platform.OS === 'android') {
    return <AndroidAuthScreen {...props} />;
  }
  return <IOSAuthScreen {...props} />;
}
