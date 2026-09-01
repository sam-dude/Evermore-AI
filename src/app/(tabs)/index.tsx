import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  Bell,
  ChevronRight,
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';
import { CheckinCard } from '@/components/checkin-card';
import { LESSONS } from '@/data/lessons';

const FLUTTERWAVE_TRIAL_URL = 'https://flutterwave.com/pay/evermoreai';
const WEB_DASHBOARD_URL = 'https://evermoreinnovation.site/';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, subscription, lessonProgress, checkIn } = useAuth();
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [checkinAlert, setCheckinAlert] = useState<string | null>(null);

  const completedLessonsCount = Object.values(lessonProgress).filter((p) => p.completed).length;
  const totalLessons = LESSONS.length;

  const todayStr = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = user?.lastCheckin === todayStr;

  const handleCheckIn = async () => {
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

  const handleUpgrade = async () => {
    if (Platform.OS === 'android') {
      try {
        await WebBrowser.openBrowserAsync(FLUTTERWAVE_TRIAL_URL, {
          toolbarColor: '#090D16',
        });
      } catch {
        Linking.openURL(FLUTTERWAVE_TRIAL_URL);
      }
    } else {
      try {
        await WebBrowser.openBrowserAsync(WEB_DASHBOARD_URL, {
          toolbarColor: '#090D16',
        });
      } catch {
        Linking.openURL(WEB_DASHBOARD_URL);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 36 }}
      >
        {/* ── TOP BAR / USER GREETING ── */}
        <View className="flex-row items-center justify-between pt-2 pb-3 mb-2">
          <View>
            <Text className="text-xs font-semibold text-slate-400">Welcome back,</Text>
            <Text className="text-xl font-black text-white tracking-tight">
              {user?.fullName || 'Evermore Member'}
            </Text>
          </View>

          {/* Points Pill */}
          <View className="flex-row items-center bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full">
            <Sparkles size={14} color="#38BDF8" />
            <Text className="text-xs font-extrabold text-sky-400 ml-1.5">
              {user?.points || 0} pts
            </Text>
          </View>
        </View>

        {/* Checkin Alert Banner if any */}
        {checkinAlert && (
          <View className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 mb-4">
            <Text className="text-xs text-emerald-300 font-semibold">{checkinAlert}</Text>
          </View>
        )}

        {/* ── DAILY CHECK-IN WIDGET ── */}
        <CheckinCard
          streak={user?.streak || 0}
          hasCheckedInToday={hasCheckedInToday}
          onCheckIn={handleCheckIn}
          loading={checkinLoading}
        />

        {/* ── PROGRESS SECTION ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-5 mb-5 shadow-lg">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 items-center justify-center mr-3">
                <BookOpen size={20} color="#38BDF8" />
              </View>
              <View>
                <Text className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  Curriculum
                </Text>
                <Text className="text-base font-black text-white">
                  {completedLessonsCount} of {totalLessons} Modules Completed
                </Text>
              </View>
            </View>
          </View>

          {/* Native Progress Bar */}
          <View className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
            <View
              className="bg-sky-400 h-full rounded-full"
              style={{
                width: `${Math.max(8, (completedLessonsCount / totalLessons) * 100)}%`,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/learn' as any)}
            activeOpacity={0.75}
            className="bg-[#182338] border border-slate-700/60 py-3 px-4 rounded-xl flex-row items-center justify-between"
          >
            <Text className="text-xs font-bold text-white">
              {completedLessonsCount === totalLessons ? 'Review All Modules' : 'Continue Learning'}
            </Text>
            <ArrowRight size={14} color="#38BDF8" />
          </TouchableOpacity>
        </View>

        {/* ── PLATFORM UPDATES ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-5 mb-5 shadow-lg">
          <View className="flex-row items-center space-x-2.5 mb-3.5">
            <View className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center">
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

        {/* ── MEMBERSHIP STATUS / UPGRADE ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-5 shadow-lg">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <ShieldCheck size={18} color="#38BDF8" />
              <Text className="text-xs font-bold text-sky-400 uppercase tracking-wider ml-2">
                Membership Tier
              </Text>
            </View>
            <View className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <Text className="text-[11px] font-bold text-emerald-400 uppercase">
                {subscription.plan}
              </Text>
            </View>
          </View>

          <Text className="text-base font-extrabold text-white mb-1">
            Access Full Opportunity Hub
          </Text>
          <Text className="text-xs text-slate-400 mb-4 leading-relaxed">
            Upgrade your account to access verified training tasks, dedicated mentorship, and premium community privileges.
          </Text>

          <TouchableOpacity
            onPress={handleUpgrade}
            activeOpacity={0.85}
            className="bg-sky-400 active:bg-sky-300 py-3 px-4 rounded-xl flex-row items-center justify-center shadow-md shadow-sky-500/20"
          >
            <Text className="text-slate-950 font-black text-xs uppercase tracking-wider mr-2">
              {Platform.OS === 'android' ? 'Upgrade Membership Plan' : 'Manage Account on Web'}
            </Text>
            <ExternalLink size={14} color="#020617" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
