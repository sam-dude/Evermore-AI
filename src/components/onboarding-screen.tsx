import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { GradientButton } from '@/components/gradient-button';

interface OnboardingScreenProps {
  onFinish: () => void;
  onLoginPress: () => void;
}

export function OnboardingScreen({ onFinish, onLoginPress }: OnboardingScreenProps) {
  const openLegal = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, { toolbarColor: '#050B14' });
    } catch {}
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 22,
          paddingTop: 8,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── TOP HEADER (CLEAN & MINIMAL) ── */}
        <View className="flex-row items-center justify-between pt-1 pb-2">
          <View className="flex-row items-center">
            <View
              className="w-9 h-9 rounded-xl overflow-hidden mr-2.5 border border-cyan-500/25 bg-[#0A1628] items-center justify-center"
              style={{
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <Image
                source={require('../../assets/images/evertap-logo.jpeg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <Text className="text-base font-black text-white tracking-widest uppercase">
              EVERMORE
            </Text>
          </View>

          {/* REGISTER NOW Button */}
          <GradientButton
            title="REGISTER NOW"
            onPress={onFinish}
            size="sm"
            style={{ paddingHorizontal: 16, height: 36 }}
            textStyle={{ fontSize: 11, fontWeight: '900', letterSpacing: 0.5 }}
          />
        </View>

        {/* ── HERO CARD (CENTERPIECE - CLEAN & SPACIOUS) ── */}
        <View className="my-auto py-4">
          <View
            className="bg-[#0A1628] border rounded-[30px] px-6 py-8 sm:p-9"
            style={{
              borderColor: 'rgba(0, 229, 255, 0.2)',
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 28,
            }}
          >
            {/* Tagline */}
            <Text
              className="text-[10px] font-black text-[#00E5FF] uppercase tracking-[0.2em] text-center mb-4"
              style={{ letterSpacing: 1.8 }}
            >
              YOUR NEXT EXPERIENCE STARTS HERE
            </Text>

            {/* Headline */}
            <Text className="text-2xl sm:text-3xl font-black text-white text-center leading-tight tracking-tight mb-3.5">
              Ready to discover{'\n'}more with Evermore?
            </Text>

            {/* Subtitle */}
            <Text className="text-xs sm:text-sm text-slate-300 text-center leading-relaxed mb-8 px-1">
              Create your account and step into a digital experience built around participation, entertainment and opportunities.
            </Text>

            {/* Main Action Button */}
            <GradientButton
              title="CREATE YOUR ACCOUNT"
              onPress={onFinish}
              size="lg"
              textStyle={{ fontSize: 13, fontWeight: '900', letterSpacing: 1 }}
            />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity
            onPress={onLoginPress}
            activeOpacity={0.75}
            className="items-center py-3 mt-3"
          >
            <Text className="text-xs text-slate-400">
              Already have an account?{' '}
              <Text className="text-[#00E5FF] font-bold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── FOOTER (MATCHING SCREENSHOT 1) ── */}
        <View className="items-center pt-2 pb-1">
          <Text
            className="text-xs font-black text-[#00F5A0] tracking-widest mb-2"
            style={{ letterSpacing: 1 }}
          >
            #ExistBeyondTheMoment
          </Text>

          <Text className="text-[11px] text-slate-500 mb-2.5">
            © 2026 EVERMORE. All Rights Reserved.
          </Text>

          <View className="flex-row items-center" style={{ gap: 14 }}>
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/privacy.html')}>
              <Text className="text-xs text-slate-400 font-medium">Privacy</Text>
            </TouchableOpacity>
            <Text className="text-slate-700 text-xs">•</Text>
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}>
              <Text className="text-xs text-slate-400 font-medium">Terms</Text>
            </TouchableOpacity>
            <Text className="text-slate-700 text-xs">•</Text>
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}>
              <Text className="text-xs text-slate-400 font-medium">Disclaimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
