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
  ShieldCheck,
  ExternalLink,
  Bell,
  Crown,
  Zap,
  ChevronRight,
  CheckCircle2,
  Globe,
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';
import { CheckinCard } from '@/components/checkin-card';
import { LESSONS } from '@/data/lessons';

const FLUTTERWAVE_TRIAL_URL = 'https://flutterwave.com/pay/evermoreai';
const FLUTTERWAVE_PREMIUM_URL = 'https://flutterwave.com/pay/everaipremium';
const WEB_DASHBOARD_URL = 'https://evermoreinnovation.site/';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, subscription, lessonProgress, checkIn } = useAuth();
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [checkinAlert, setCheckinAlert] = useState<string | null>(null);

  const completedLessonsCount = Object.values(lessonProgress).filter((p) => p.completed).length;
  const totalLessons = LESSONS.length;
  const progressPercent = Math.max(8, (completedLessonsCount / totalLessons) * 100);

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

  const handleUpgrade = async (plan: 'basic' | 'premium' = 'basic') => {
    if (Platform.OS === 'ios') {
      router.push('/(tabs)/membership' as any);
      return;
    }
    const targetUrl = plan === 'premium' ? FLUTTERWAVE_PREMIUM_URL : FLUTTERWAVE_TRIAL_URL;
    try {
      await WebBrowser.openBrowserAsync(targetUrl, {
        toolbarColor: '#050B14',
      });
    } catch {
      Linking.openURL(targetUrl);
    }
  };

  const handleManageWeb = async () => {
    try {
      await WebBrowser.openBrowserAsync(WEB_DASHBOARD_URL, {
        toolbarColor: '#050B14',
      });
    } catch {
      Linking.openURL(WEB_DASHBOARD_URL);
    }
  };

  const isFree = subscription.plan === 'free';
  const planName = (subscription.plan || 'free').toUpperCase();

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

          {/* Top Actions: Membership Badge & Points Pill */}
          <View className="flex-row items-center" style={{ gap: 8 }}>
            {/* Membership Pill (Tappable direct shortcut to Membership Tab, clean and compliant) */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/membership' as any)}
              activeOpacity={0.8}
              className={`flex-row items-center px-3 py-1.5 rounded-full border ${
                isFree
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-emerald-500/10 border-emerald-500/30'
              }`}
              style={{
                shadowColor: isFree ? '#F59E0B' : '#10B981',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
              }}
            >
              <Crown size={13} color={isFree ? '#F59E0B' : '#10B981'} />
              <Text
                className={`text-[10px] font-black uppercase ml-1.5 ${
                  isFree ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {isFree ? 'FREE TIER' : `${planName}`}
              </Text>
            </TouchableOpacity>

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

        {/* ── HERO MEMBERSHIP VIP CARD (CLEAN, NO EXPLICIT PRICES) ── */}
        <View
          className="bg-evermore-surface border rounded-3xl p-5 mb-5"
          style={{
            borderColor: isFree ? 'rgba(245, 158, 11, 0.35)' : 'rgba(0, 229, 255, 0.35)',
            shadowColor: isFree ? '#F59E0B' : '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 18,
          }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View
                className={`w-11 h-11 rounded-2xl items-center justify-center mr-3 ${
                  isFree ? 'bg-amber-500/15 border border-amber-500/30' : 'bg-cyan-500/15 border border-cyan-500/30'
                }`}
              >
                <Crown size={22} color={isFree ? '#F59E0B' : '#00E5FF'} strokeWidth={2.2} />
              </View>
              <View>
                <Text
                  className={`text-[10px] font-black uppercase tracking-wider ${
                    isFree ? 'text-amber-400' : 'text-evermore-cyan'
                  }`}
                >
                  {isFree ? 'Access Tier' : 'VIP Active Member'}
                </Text>
                <Text className="text-base font-black text-white">
                  {isFree ? 'Membership Packages' : `${planName} Member Tier`}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/membership' as any)}
              className="flex-row items-center bg-evermore-surfaceLight border border-evermore-border px-2.5 py-1 rounded-full"
            >
              <Text className="text-[10px] font-bold text-slate-300 mr-1">Tiers</Text>
              <ChevronRight size={12} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-slate-300 leading-relaxed mb-4">
            {isFree
              ? 'Access verified campaign tasks, specialized AI training tracks, and community privileges across the Evermore ecosystem.'
              : 'Your membership is active! Enjoy premium AI modules, priority submission reviews, and official community perks.'}
          </Text>

          {isFree ? (
            Platform.OS === 'ios' ? (
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/membership' as any)}
                activeOpacity={0.8}
                className="bg-evermore-surfaceLight border border-evermore-border py-3 rounded-xl flex-row items-center justify-center"
              >
                <ShieldCheck size={15} color="#00E5FF" />
                <Text className="text-xs font-bold text-evermore-cyan ml-2">
                  View Ecosystem Membership Tiers
                </Text>
                <ChevronRight size={14} color="#00E5FF" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            ) : (
              /* Android retains direct track buttons */
              <View className="flex-row" style={{ gap: 10 }}>
                <TouchableOpacity
                  onPress={() => handleUpgrade('basic')}
                  activeOpacity={0.8}
                  className="flex-1 bg-evermore-surfaceLight border border-evermore-border py-3 rounded-xl items-center justify-center"
                >
                  <Text className="text-[10px] font-bold text-slate-400 uppercase">Basic Tier</Text>
                  <Text className="text-xs font-black text-evermore-cyan mt-0.5">Standard Track</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleUpgrade('premium')}
                  activeOpacity={0.85}
                  className="flex-1 py-3 rounded-xl items-center justify-center"
                  style={{
                    backgroundColor: '#00E5FF',
                    shadowColor: '#00E5FF',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.35,
                    shadowRadius: 10,
                  }}
                >
                  <Text className="text-[10px] font-black text-evermore-bg uppercase tracking-wide">
                    Premium Tier
                  </Text>
                  <Text className="text-xs font-black text-evermore-bg mt-0.5">Priority Track</Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/membership' as any)}
              activeOpacity={0.8}
              className="bg-evermore-surfaceLight border border-evermore-border py-2.5 rounded-xl flex-row items-center justify-center"
            >
              <ShieldCheck size={14} color="#00E5FF" />
              <Text className="text-xs font-bold text-white ml-2 mr-1">View Membership Status</Text>
              <ChevronRight size={13} color="#94A3B8" />
            </TouchableOpacity>
          )}
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

        {/* ── QUICK LINK TO MEMBERSHIP DETAILS (BOTTOM BANNER) ── */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/membership' as any)}
          activeOpacity={0.8}
          className="bg-evermore-surface border border-evermore-border rounded-2xl p-4 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1 pr-2">
            <ShieldCheck size={18} color="#00E5FF" />
            <Text className="text-xs font-bold text-white ml-2.5">
              View Tier Comparison &amp; Benefits Table
            </Text>
          </View>
          <ChevronRight size={16} color="#00E5FF" />
        </TouchableOpacity>

        {/* ── OFFICIAL PORTAL SHORTCUT ── */}
        <View className="items-center mt-5 mb-2">
          <TouchableOpacity
            onPress={handleManageWeb}
            activeOpacity={0.75}
            className="flex-row items-center py-2.5 px-4 rounded-full bg-evermore-surface border border-slate-800"
          >
            <Globe size={13} color="#00E5FF" />
            <Text className="text-[11px] font-semibold text-slate-400 ml-2 mr-1.5">
              Official Portal: <Text className="text-evermore-cyan font-bold">evermoreinnovation.site</Text>
            </Text>
            <ExternalLink size={11} color="#00E5FF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
