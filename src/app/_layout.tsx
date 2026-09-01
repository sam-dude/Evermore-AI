import '../global.css';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { AuthScreen } from '@/components/auth-screen';
import { OnboardingScreen } from '@/components/onboarding-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

const ONBOARDING_SEEN_KEY = '@evermore_has_seen_onboarding';

function RootNavigator() {
  const { user, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const seen = await AsyncStorage.getItem(ONBOARDING_SEEN_KEY);
      setShowOnboarding(seen === null);
    } catch {
      setShowOnboarding(false);
    }
  };

  useEffect(() => {
    if (!isLoading && showOnboarding !== null) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading, showOnboarding]);

  if (isLoading || showOnboarding === null) {
    return (
      <View className="flex-1 bg-[#090D16] items-center justify-center">
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  // 1. If logged in, go straight to main app tabs
  if (user) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#090D16' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    );
  }

  // 2. If onboarding not completed yet, show onboarding carousel
  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={async () => {
          await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
          setAuthMode('signup');
          setShowOnboarding(false);
        }}
        onLoginPress={async () => {
          await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
          setAuthMode('signin');
          setShowOnboarding(false);
        }}
      />
    );
  }

  // 3. Otherwise show auth screen (with option to see onboarding again)
  return (
    <AuthScreen
      initialMode={authMode}
      onBackToOnboarding={() => setShowOnboarding(true)}
    />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AuthProvider>
  );
}
