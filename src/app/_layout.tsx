import '../global.css';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Platform, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { AuthScreen } from '@/components/auth-screen';
import { OnboardingScreen } from '@/components/onboarding-screen';

// Prevent splash screen auto-hide safely
try {
  SplashScreen.preventAutoHideAsync().catch(() => {});
} catch {}

const ONBOARDING_SEEN_KEY = '@evermore_has_seen_onboarding';

function RootNavigator() {
  const {
    user,
    isLoading,
    isGuest,
    continueAsGuest,
    showAuthModal,
    authModalMode,
    closeAuth,
  } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [androidFinishedOnboarding, setAndroidFinishedOnboarding] = useState(false);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

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
    async function hideSplash() {
      if (!isLoading && fontsLoaded && showOnboarding !== null) {
        try {
          await SplashScreen.hideAsync();
        } catch {
          // Ignore - already hidden on fast reload
        }
      }
    }
    hideSplash();
  }, [isLoading, fontsLoaded, showOnboarding]);

  if (isLoading || !fontsLoaded || showOnboarding === null) {
    return (
      <View className="flex-1 bg-[#090D16] items-center justify-center">
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  // ── ANDROID SPECIFIC FLOW: Always show onboarding -> Home (no login wall) ──
  if (Platform.OS === 'android') {
    if (!androidFinishedOnboarding) {
      return (
        <OnboardingScreen
          onFinish={() => setAndroidFinishedOnboarding(true)}
          onLoginPress={() => setAndroidFinishedOnboarding(true)}
        />
      );
    }

    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#050B14' },
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

  // ── IOS FLOW: Authenticated or Guest (Guideline 5.1.1(v) Compliant) ──
  // 1. If logged in or in guest exploration mode, allow direct access to non-account features
  if (user || isGuest) {
    return (
      <View style={{ flex: 1, backgroundColor: '#090D16' }}>
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

        {/* Auth modal when guest user chooses to sign in or register inside the app */}
        <Modal
          visible={showAuthModal}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={closeAuth}
        >
          <AuthScreen
            initialMode={authModalMode}
            onBackToOnboarding={closeAuth}
            onContinueAsGuest={closeAuth}
          />
        </Modal>
      </View>
    );
  }

  // 2. If onboarding not completed yet, show onboarding carousel with direct guest exploration
  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={async () => {
          await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
          await continueAsGuest();
        }}
        onLoginPress={async () => {
          await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
          setAuthMode('signin');
          setShowOnboarding(false);
        }}
        onGuestPress={async () => {
          await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
          await continueAsGuest();
        }}
      />
    );
  }

  // 3. Otherwise show auth screen (with option to explore as guest)
  return (
    <AuthScreen
      initialMode={authMode}
      onBackToOnboarding={() => setShowOnboarding(true)}
      onContinueAsGuest={() => continueAsGuest()}
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
