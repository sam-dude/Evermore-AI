import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top']}>
      {/* Subtle Background Glow */}
      <Svg width={SCREEN_WIDTH} height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="notifGlow" cx="50%" cy="20%" rx="60%" ry="35%">
            <Stop offset="0%" stopColor="#0B2347" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#050B14" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#notifGlow)" />
      </Svg>

      {/* Top App Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(30, 58, 95, 0.4)',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <ArrowLeft size={19} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={{ fontFamily: Fonts.bold, fontSize: 17, color: '#FFFFFF' }}>
          Notifications
        </Text>

        {/* Balance space */}
        <View style={{ width: 38 }} />
      </View>

      {/* Empty State Content */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 32,
          paddingBottom: 60,
        }}
      >
        {/* Glowing Bell Icon Container */}
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: 'rgba(10, 24, 46, 0.9)',
            borderWidth: 1.5,
            borderColor: 'rgba(0, 229, 255, 0.35)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          <Bell size={38} color="#00E5FF" strokeWidth={1.8} />
        </View>

        {/* Tag line */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 245, 160, 0.1)',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: 'rgba(0, 245, 160, 0.25)',
          }}
        >
          <Sparkles size={12} color="#00F5A0" style={{ marginRight: 5 }} />
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 11,
              color: '#00F5A0',
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            All Caught Up
          </Text>
        </View>

        {/* Empty Headline */}
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            fontSize: 22,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          No Notifications Yet
        </Text>

        {/* Empty Description */}
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: 14,
            lineHeight: 22,
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: 290,
          }}
        >
          You don&apos;t have any notifications right now. Updates on your AI tasks, streak bonuses, and community announcements will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
