import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import {
  Crown,
  Zap,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Globe,
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';

const FLUTTERWAVE_BASIC_URL = 'https://flutterwave.com/pay/evermoreai';
const FLUTTERWAVE_PREMIUM_URL = 'https://flutterwave.com/pay/everaipremium';
const WEB_PORTAL_URL = 'https://evermoreinnovation.site/';

const PLAN_FEATURES = [
  { label: 'Curriculum & Interactive Quizzes', free: true, basic: true, premium: true },
  { label: 'Daily Streaks & EverPoints', free: true, basic: true, premium: true },
  { label: 'Standard Opportunity Campaigns', free: false, basic: true, premium: true },
  { label: 'Official Community Telegram Group', free: false, basic: true, premium: true },
  { label: 'Specialized AI Training Tasks', free: false, basic: false, premium: true },
  { label: 'Priority Submission Review Pipeline', free: false, basic: false, premium: true },
  { label: 'Dedicated Mentorship & Workshops', free: false, basic: false, premium: true },
  { label: 'Higher Tier Rewards & Experience Perks', free: false, basic: false, premium: true },
];

export default function MembershipScreen() {
  const { user, subscription, refreshProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const currentPlan = subscription.plan || 'free';
  const isIos = Platform.OS === 'ios';

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    setRefreshMessage(null);
    try {
      await refreshProfile();
      setRefreshMessage('Account status updated.');
    } catch {
      setRefreshMessage('Could not sync. Please try again.');
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setRefreshMessage(null), 3000);
    }
  };

  const handleSubscribe = async (plan: 'basic' | 'premium') => {
    if (isIos) return; // Never trigger external payment links on iOS
    const targetUrl = plan === 'premium' ? FLUTTERWAVE_PREMIUM_URL : FLUTTERWAVE_BASIC_URL;
    try {
      await WebBrowser.openBrowserAsync(targetUrl, {
        toolbarColor: '#050B14',
      });
    } catch {
      Linking.openURL(targetUrl);
    }
  };

  const handleOpenWebPortal = async () => {
    try {
      await WebBrowser.openBrowserAsync(WEB_PORTAL_URL, {
        toolbarColor: '#050B14',
      });
    } catch {
      Linking.openURL(WEB_PORTAL_URL);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg" edges={['top']}>
      {/* ── HEADER ── */}
      <View className="px-5 pt-3 pb-3 border-b border-slate-800/60 flex-row items-center justify-between">
        <View>
          <Text className="text-[11px] font-bold text-evermore-cyan uppercase tracking-widest">
            Access Tier
          </Text>
          <Text className="text-2xl font-black text-white tracking-tight">
            Membership Status
          </Text>
        </View>

        <View className="flex-row items-center bg-evermore-surface border border-evermore-border px-3 py-1.5 rounded-full">
          <Crown size={14} color="#F59E0B" />
          <Text className="text-xs font-bold text-amber-400 ml-1.5 uppercase">
            {currentPlan} Tier
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      >
        {/* ── CURRENT STATUS HERO BANNER ── */}
        <View
          className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-5"
          style={{
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 16,
          }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 items-center justify-center mr-3"
                style={{
                  shadowColor: '#F59E0B',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <Crown size={24} color="#F59E0B" strokeWidth={2} />
              </View>
              <View>
                <Text className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Current Account
                </Text>
                <Text className="text-lg font-black text-white">
                  {currentPlan === 'free' ? 'Free Tier Account' : `${currentPlan.toUpperCase()} Member`}
                </Text>
              </View>
            </View>

            <View className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <Text className="text-[10px] font-bold text-emerald-400 uppercase">
                {subscription.status || 'Active'}
              </Text>
            </View>
          </View>

          <Text className="text-xs text-slate-300 leading-relaxed mb-4">
            {currentPlan === 'free'
              ? 'Your account is on the Free tier. Access your lessons, daily streaks, and quizzes below. Higher tier benefits unlock automatically when assigned to your account.'
              : 'Your tier is active. You have full access to community tracks and prioritized features linked to your account.'}
          </Text>

          {/* Refresh / Sync Button (Store-Compliant) */}
          <TouchableOpacity
            onPress={handleRefreshStatus}
            disabled={isRefreshing}
            activeOpacity={0.8}
            className="bg-evermore-surfaceLight border border-evermore-border py-3 rounded-xl flex-row items-center justify-center"
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color="#00E5FF" />
            ) : (
              <>
                <RefreshCw size={13} color="#00E5FF" />
                <Text className="text-xs font-bold text-evermore-cyan ml-2">
                  Sync Account Status
                </Text>
              </>
            )}
          </TouchableOpacity>

          {refreshMessage && (
            <Text className="text-[11px] text-emerald-400 text-center mt-2 font-medium">
              {refreshMessage}
            </Text>
          )}
        </View>

        {/* ── PLAN OVERVIEWS ── */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 pl-1">
          Ecosystem Tiers &amp; Benefits
        </Text>

        {/* Basic Plan Card */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Zap size={18} color="#00E5FF" />
              <Text className="text-base font-extrabold text-white ml-2">Basic Plan</Text>
            </View>
            {(currentPlan === 'basic' || currentPlan === 'premium') ? (
              <View className="flex-row items-center bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 size={11} color="#34D399" />
                <Text className="text-[10px] font-bold text-emerald-400 ml-1 uppercase">Active</Text>
              </View>
            ) : (
              <Text className="text-xs font-bold text-slate-400 uppercase">Standard Tier</Text>
            )}
          </View>

          <Text className="text-xs text-slate-400 mb-4 leading-relaxed">
            Full access to curriculum modules, daily check-in streaks, community Telegram, and opportunity campaigns.
          </Text>

          {/* Feature List */}
          <View className="mb-4">
            {PLAN_FEATURES.slice(0, 4).map((feature, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Check size={14} color="#34D399" />
                <Text className="text-xs text-slate-300 ml-2">{feature.label}</Text>
              </View>
            ))}
          </View>

          {/* CTA: Non-iOS gets direct button; iOS gets safe status pill */}
          {!isIos && currentPlan === 'free' && (
            <TouchableOpacity
              onPress={() => handleSubscribe('basic')}
              activeOpacity={0.8}
              className="bg-evermore-surfaceLight border border-evermore-border py-3.5 rounded-xl flex-row items-center justify-center"
            >
              <Text className="text-xs font-bold text-evermore-cyan mr-1.5">
                Upgrade to Basic
              </Text>
              <ExternalLink size={13} color="#00E5FF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Premium Plan Card */}
        <View
          className="bg-evermore-surface border rounded-3xl p-5 mb-5"
          style={{
            borderColor: 'rgba(0, 229, 255, 0.35)',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.14,
            shadowRadius: 20,
          }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center">
              <Crown size={18} color="#F59E0B" />
              <Text className="text-base font-extrabold text-white ml-2">Premium Plan</Text>
            </View>
            {currentPlan === 'premium' ? (
              <View className="flex-row items-center bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 size={11} color="#34D399" />
                <Text className="text-[10px] font-bold text-emerald-400 ml-1 uppercase">Active</Text>
              </View>
            ) : (
              <Text className="text-xs font-bold text-evermore-cyan uppercase">Priority Tier</Text>
            )}
          </View>

          <View className="bg-evermore-cyan/15 border border-evermore-cyan/25 px-2.5 py-0.5 rounded-full self-start mb-3">
            <Text className="text-[9px] font-bold text-evermore-cyan uppercase tracking-wider">
              Full Ecosystem Access
            </Text>
          </View>

          <Text className="text-xs text-slate-400 mb-4 leading-relaxed">
            Includes all Basic features plus specialized AI training tasks, prioritized review pipelines, dedicated mentorship, and premium community perks.
          </Text>

          {/* Feature List */}
          <View className="mb-4">
            {PLAN_FEATURES.map((feature, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Check size={14} color="#34D399" />
                <Text className="text-xs text-slate-300 ml-2">{feature.label}</Text>
              </View>
            ))}
          </View>

          {/* CTA: Non-iOS gets direct button; iOS gets safe status pill */}
          {!isIos && currentPlan !== 'premium' && (
            <TouchableOpacity
              onPress={() => handleSubscribe('premium')}
              activeOpacity={0.85}
              className="py-4 rounded-xl flex-row items-center justify-center"
              style={{
                backgroundColor: '#00E5FF',
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 14,
              }}
            >
              <Text className="text-xs font-black text-evermore-bg uppercase tracking-wider mr-1.5">
                Upgrade to Premium
              </Text>
              <ExternalLink size={13} color="#050B14" />
            </TouchableOpacity>
          )}
        </View>

        {/* ── STORE-SAFE COMPLIANCE NOTICE & OFFICIAL PORTAL (GUIDELINE 3.1.1 COMPLIANT) ── */}
        <View
          className="bg-evermore-surface border rounded-2xl p-4 mb-4"
          style={{
            borderColor: 'rgba(0, 229, 255, 0.25)',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}
        >
          <View className="flex-row items-center justify-between mb-1.5">
            <View className="flex-row items-center">
              <Globe size={15} color="#00E5FF" />
              <Text className="text-xs font-bold text-white ml-2 uppercase tracking-wider">
                Official Web Portal
              </Text>
            </View>
            <Text className="text-[10px] font-bold text-[#00F5A0] uppercase tracking-wider">
              Ecosystem Dashboard
            </Text>
          </View>

          <Text className="text-[11px] text-slate-300 leading-relaxed mb-3.5">
            Evermore accounts, multiplatform settings, and community access are hosted on our official web portal. When your status is updated online, tap &quot;Sync Account Status&quot; above to refresh your benefits.
          </Text>

          <TouchableOpacity
            onPress={handleOpenWebPortal}
            activeOpacity={0.8}
            className="bg-evermore-surfaceLight border border-cyan-500/35 py-3 px-4 rounded-xl flex-row items-center justify-center"
            style={{
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
            }}
          >
            <Text className="text-xs font-extrabold text-[#00E5FF] uppercase tracking-wider mr-2">
              Visit evermoreinnovation.site
            </Text>
            <ExternalLink size={13} color="#00E5FF" />
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <Text className="text-[11px] text-slate-500 mb-1">Need assistance with your account?</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:Quickloaddata@gmail.com').catch(() => {})}
          >
            <Text className="text-xs font-bold text-evermore-cyan">Contact Customer Care</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
