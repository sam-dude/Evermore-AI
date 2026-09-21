import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Bell,
  MessageCircle,
  Flame,
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';
import { CheckinCard } from '@/components/checkin-card';
import { LESSONS } from '@/data/lessons';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TELEGRAM_URL = 'https://t.me/evermoreai?text=evermore';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, lessonProgress, checkIn, openAuth } = useAuth();
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [checkinAlert, setCheckinAlert] = useState<string | null>(null);

  const completedLessonsCount = Object.values(lessonProgress).filter((p) => p.completed).length;
  const totalLessons = LESSONS.length;
  const progressPercent = Math.max(8, (completedLessonsCount / totalLessons) * 100);

  const todayStr = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = user?.lastCheckin === todayStr;

  const handleCheckIn = async () => {
    if (!user) {
      Alert.alert(
        'Account Required',
        'Daily check-in streaks and EverPoints require an account. Would you like to sign in or create a free account to track your progress?',
        [
          { text: 'Later', style: 'cancel' },
          { text: 'Sign In / Register', onPress: () => openAuth('signin') },
        ]
      );
      return;
    }
    setCheckinLoading(true);
    setCheckinAlert(null);
    try {
      const res = await checkIn();
      if (res.success) {
        setCheckinAlert(`🎉 Checked in! +${res.pointsEarned} EverPoints added to your profile.`);
      } else {
        setCheckinAlert(res.message || 'Check-in recorded.');
      }
    } finally {
      setCheckinLoading(false);
    }
  };

  const handleOpenCommunity = async () => {
    try {
      await WebBrowser.openBrowserAsync(TELEGRAM_URL, {
        toolbarColor: '#050B14',
      });
    } catch {}
  };

  const handleGetStartedTelegram = async () => {
    const userInfo =
      user?.fullName || user?.email
        ? ` (${user?.fullName || 'Member'}${user?.email ? ` - ${user.email}` : ''})`
        : '';
    const message = `Hello Evermore Team! 👋 I would like to get started with EverAI training and earn rewards${userInfo}.`;
    const url = `https://t.me/evermoreai?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(url);
    } catch {
      try {
        await WebBrowser.openBrowserAsync(url, {
          toolbarColor: '#050B14',
        });
      } catch {
        Linking.openURL('https://t.me/evermoreai').catch(() => {});
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top']}>
      {/* ── AMBIENT CYBER/MINT TOP HERO GLOW ── */}
      <Svg width={SCREEN_WIDTH} height={420} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Defs>
          <RadialGradient id="iosTopMintGlow" cx="50%" cy="0%" rx="80%" ry="70%">
            <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.22" />
            <Stop offset="40%" stopColor="#00F5A0" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#050B14" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#iosTopMintGlow)" />
      </Svg>

      {/* ── TOP APP BAR ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 14,
        }}
      >
        {/* Left: Brand Logo & Title & Starter Badge */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/evermore-logo-white.png')}
            style={{ width: 34, height: 22, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 18,
              color: '#FFFFFF',
              letterSpacing: -0.3,
              marginRight: 8,
            }}
          >
            Evermore
          </Text>
          <View
            style={{
              backgroundColor: 'rgba(0, 245, 160, 0.12)',
              borderColor: 'rgba(0, 245, 160, 0.35)',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 7,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 10,
                color: '#00F5A0',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Starter
            </Text>
          </View>
        </View>

        {/* Right Actions: Points/Streak Badge, Notifications Bell, Avatar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* Compact Points Pill */}
          <View
            style={{
              backgroundColor: 'rgba(0, 229, 255, 0.08)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: 'rgba(0, 229, 255, 0.2)',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Sparkles size={11} color="#00E5FF" style={{ marginRight: 3 }} />
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 11,
                color: '#00E5FF',
              }}
            >
              {user?.points || 0}
            </Text>
          </View>

          {/* Circular Bell Notification Icon Button */}
          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            activeOpacity={0.8}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={18} color="#FFFFFF" strokeWidth={2.2} />
          </TouchableOpacity>

          {/* User Avatar with Green Ring */}
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              borderWidth: 2,
              borderColor: '#00F5A0',
              overflow: 'hidden',
              backgroundColor: '#0A1628',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../../../assets/images/evertap-logo.jpeg')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── HERO HEADER ── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 24 }}>
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 34,
              lineHeight: 40,
              color: '#FFFFFF',
              letterSpacing: -0.6,
              marginBottom: 8,
            }}
          >
            Train EverAI & Earn
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 15,
              lineHeight: 22,
              color: '#94A3B8',
              marginBottom: 20,
            }}
          >
            Complete daily AI training prompts and evaluations to generate rewards.
          </Text>

          {/* ── MODERN COMMUNITY CARD: ACCESS & GET STARTED ── */}
          <View
            style={{
              backgroundColor: '#101726',
              borderRadius: 24,
              padding: 22,
              borderWidth: 1,
              borderColor: 'rgba(0, 245, 160, 0.15)',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 11.5,
                  color: '#00F5A0',
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                }}
              >
                TRAIN AI
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.12)',
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 10,
                    color: '#00E5FF',
                    letterSpacing: 0.4,
                  }}
                >
                  LIVE ACCESS
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 23,
                color: '#FFFFFF',
                letterSpacing: -0.4,
                marginBottom: 10,
              }}
            >
              Train AI and Join
            </Text>

            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14.5,
                lineHeight: 22,
                color: '#94A3B8',
                marginBottom: 20,
              }}
            >
              You are currently on a guest starter account. Tap Get Started to gain full access, activate live AI training, and connect directly with mentors on Telegram.
            </Text>

            <TouchableOpacity
              onPress={handleGetStartedTelegram}
              activeOpacity={0.88}
              style={{
                backgroundColor: '#00F5A0',
                paddingVertical: 14,
                paddingHorizontal: 22,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                shadowColor: '#00F5A0',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.extraBold,
                  fontSize: 14.5,
                  color: '#040914',
                  letterSpacing: 0.2,
                  marginRight: 6,
                }}
              >
                Get Started
              </Text>
              <ArrowRight size={16} color="#040914" strokeWidth={2.6} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Checkin Alert Banner */}
        {checkinAlert && (
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <View
              style={{
                backgroundColor: 'rgba(80, 200, 120, 0.12)',
                borderColor: 'rgba(80, 200, 120, 0.3)',
                borderWidth: 1,
                borderRadius: 16,
                padding: 14,
              }}
            >
              <Text style={{ fontFamily: Fonts.bold, fontSize: 13, color: '#50C878' }}>
                {checkinAlert}
              </Text>
            </View>
          </View>
        )}

        {/* ── DAILY CHECK-IN WIDGET ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <CheckinCard
            streak={user?.streak || 0}
            hasCheckedInToday={hasCheckedInToday}
            onCheckIn={handleCheckIn}
            loading={checkinLoading}
          />
        </View>

        {/* ── PROGRESS / CURRICULUM SECTION ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: '#0A182E',
              borderWidth: 1,
              borderColor: 'rgba(0, 229, 255, 0.25)',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    backgroundColor: 'rgba(0, 229, 255, 0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <BookOpen size={20} color="#00E5FF" />
                </View>
                <View>
                  <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00E5FF', letterSpacing: 1, textTransform: 'uppercase' }}>
                    CURRICULUM
                  </Text>
                  <Text style={{ fontFamily: Fonts.extraBold, fontSize: 16, color: '#FFFFFF' }}>
                    {completedLessonsCount} of {totalLessons} Modules
                  </Text>
                </View>
              </View>

              {user?.streak ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <Flame size={13} color="#F59E0B" style={{ marginRight: 4 }} />
                  <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#F59E0B' }}>
                    {user.streak}D Streak
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Progress Bar */}
            <View
              style={{
                width: '100%',
                backgroundColor: '#071324',
                height: 8,
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: '#00F5A0',
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/learn' as any)}
              activeOpacity={0.8}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontFamily: Fonts.bold, fontSize: 13, color: '#FFFFFF' }}>
                {completedLessonsCount === totalLessons ? 'Review All Modules' : 'Continue Learning'}
              </Text>
              <ArrowRight size={16} color="#00E5FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── TELEGRAM STUDY COMMUNITY CARD ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: '#0A182E',
              borderRadius: 24,
              borderWidth: 1,
              borderColor: 'rgba(0, 229, 255, 0.25)',
              padding: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  backgroundColor: 'rgba(0, 229, 255, 0.14)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <MessageCircle size={20} color="#00E5FF" strokeWidth={2.2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00E5FF', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                  STUDY COMMUNITY
                </Text>
                <Text style={{ fontFamily: Fonts.extraBold, fontSize: 16, color: '#FFFFFF' }}>
                  Join the Community
                </Text>
              </View>
            </View>

            <Text style={{ fontFamily: Fonts.regular, fontSize: 13, lineHeight: 20, color: '#94A3B8', marginBottom: 16 }}>
              Connect with fellow AI learners, share quiz insights, discuss new topics, and get real-time study updates in our Telegram group.
            </Text>

            <TouchableOpacity
              onPress={handleOpenCommunity}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#00E5FF',
                paddingVertical: 13,
                paddingHorizontal: 16,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageCircle size={15} color="#050B14" strokeWidth={2.5} style={{ marginRight: 6 }} />
              <Text style={{ fontFamily: Fonts.extraBold, fontSize: 13, color: '#050B14', marginRight: 6 }}>
                Join Telegram Community
              </Text>
              <ExternalLink size={13} color="#050B14" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
