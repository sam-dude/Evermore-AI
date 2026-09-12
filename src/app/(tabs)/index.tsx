import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
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
    } catch {
      Linking.openURL(TELEGRAM_URL);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 36 }}
      >
        {/* ── TOP BAR / USER GREETING ── */}
        <View className="flex-row items-center justify-between pt-3 pb-3 mb-1">
          <View className="flex-1 pr-2">
            <Text className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Welcome back,
            </Text>
            <Text className="text-2xl font-black text-white tracking-tight" numberOfLines={1}>
              {user?.fullName || 'Evermore Member'}
            </Text>
          </View>

          {/* Top Actions: Streak Badge & Points Pill */}
          <View className="flex-row items-center" style={{ gap: 8 }}>
            {/* Streak Pill */}
            <View
              className="flex-row items-center bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full"
              style={{
                shadowColor: '#F59E0B',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
              }}
            >
              <Flame size={13} color="#F59E0B" />
              <Text className="text-[10px] font-black text-amber-400 uppercase ml-1.5">
                {user?.streak || 0}D STREAK
              </Text>
            </View>

            {/* Points Pill */}
            <View
              className="flex-row items-center bg-evermore-surface border border-evermore-border px-3 py-1.5 rounded-full"
              style={{
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
              }}
            >
              <Sparkles size={13} color="#00E5FF" />
              <Text className="text-xs font-extrabold text-evermore-cyan ml-1.5">
                {user?.points || 0} pts
              </Text>
            </View>
          </View>
        </View>

        {/* Checkin Alert Banner */}
        {checkinAlert && (
          <View
            className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 mb-4"
            style={{
              shadowColor: '#50C878',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
            }}
          >
            <Text className="text-xs text-emerald-300 font-semibold">{checkinAlert}</Text>
          </View>
        )}

        {/* ── JOIN THE COMMUNITY HERO CARD ── */}
        <View
          className="bg-evermore-surface border rounded-3xl p-5 mb-5"
          style={{
            borderColor: 'rgba(0, 229, 255, 0.35)',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 18,
          }}
        >
          <View className="flex-row items-center mb-3">
            <View
              className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 items-center justify-center mr-3"
              style={{
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.35,
                shadowRadius: 10,
              }}
            >
              <MessageCircle size={22} color="#00E5FF" strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-black text-evermore-cyan uppercase tracking-wider">
                Official Telegram Group
              </Text>
              <Text className="text-base font-black text-white">
                Join the Community
              </Text>
            </View>
          </View>

          <Text className="text-xs text-slate-300 leading-relaxed mb-4">
            Connect with fellow AI learners, share quiz insights, discuss new topics, and get real-time study updates directly in our Telegram group.
          </Text>

          <TouchableOpacity
            onPress={handleOpenCommunity}
            activeOpacity={0.85}
            className="py-3.5 px-4 rounded-xl flex-row items-center justify-center"
            style={{
              backgroundColor: '#00E5FF',
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.35,
              shadowRadius: 10,
            }}
          >
            <MessageCircle size={15} color="#050B14" strokeWidth={2.5} />
            <Text className="text-xs font-black text-[#050B14] uppercase tracking-wider ml-2 mr-1">
              Join Telegram Community
            </Text>
            <ExternalLink size={13} color="#050B14" />
          </TouchableOpacity>
        </View>

        {/* ── DAILY CHECK-IN WIDGET ── */}
        <CheckinCard
          streak={user?.streak || 0}
          hasCheckedInToday={hasCheckedInToday}
          onCheckIn={handleCheckIn}
          loading={checkinLoading}
        />

        {/* ── PROGRESS SECTION ── */}
        <View
          className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-5"
          style={{
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 16,
          }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-2xl bg-evermore-cyan/10 border border-evermore-cyan/20 items-center justify-center mr-3">
                <BookOpen size={20} color="#00E5FF" />
              </View>
              <View>
                <Text className="text-[11px] font-bold text-evermore-cyan uppercase tracking-wider">
                  Curriculum
                </Text>
                <Text className="text-base font-black text-white">
                  {completedLessonsCount} of {totalLessons} Modules
                </Text>
              </View>
            </View>
          </View>

          {/* Gradient Progress Bar */}
          <View className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden mb-4">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: '#00E5FF',
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 6,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/learn' as any)}
            activeOpacity={0.75}
            className="bg-evermore-surfaceLight border border-evermore-border py-3.5 px-4 rounded-xl flex-row items-center justify-between"
          >
            <Text className="text-xs font-bold text-white">
              {completedLessonsCount === totalLessons ? 'Review All Modules' : 'Continue Learning'}
            </Text>
            <ArrowRight size={14} color="#00E5FF" />
          </TouchableOpacity>
        </View>

        {/* ── PLATFORM UPDATES ── */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-5">
          <View className="flex-row items-center mb-3.5">
            <View className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center mr-2.5">
              <Bell size={16} color="#818CF8" />
            </View>
            <Text className="text-sm font-bold text-white">Latest Updates</Text>
          </View>

          <View className="border-b border-slate-800/80 pb-3 mb-3">
            <Text className="text-xs font-bold text-slate-200">
              Interactive AI Learning Tracks
            </Text>
            <Text className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Explore 5 new curriculum modules with retention quizzes to build tech literacy.
            </Text>
          </View>

          <View>
            <Text className="text-xs font-bold text-slate-200">
              Daily Streak Rewards
            </Text>
            <Text className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Maintain your daily streak to earn recognition and priority access to upcoming opportunities.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
