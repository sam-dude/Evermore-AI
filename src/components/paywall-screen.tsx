import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import {
  Crown,
  Zap,
  Check,
  X,
  ExternalLink,
  BookOpen,
  Users,
  MessageCircle,
  Award,
  ArrowLeft,
} from 'lucide-react-native';

interface PaywallScreenProps {
  onDismiss: () => void;
  currentPlan?: string;
}

const FLUTTERWAVE_BASIC_URL = 'https://flutterwave.com/pay/evermoreai';
const FLUTTERWAVE_PREMIUM_URL = 'https://flutterwave.com/pay/everaipremium';
const WEB_PORTAL_URL = 'https://evermoreinnovation.site/';

const PLAN_FEATURES = [
  { label: 'Curriculum Modules', free: true, basic: true, premium: true },
  { label: 'Daily Check-in Streaks', free: true, basic: true, premium: true },
  { label: 'EverPoints System', free: true, basic: true, premium: true },
  { label: 'Standard Opportunity Campaigns', free: false, basic: true, premium: true },
  { label: 'Community Telegram Access', free: false, basic: true, premium: true },
  { label: 'AI Training Tasks', free: false, basic: false, premium: true },
  { label: 'Priority Review Pipeline', free: false, basic: false, premium: true },
  { label: 'Dedicated Mentorship', free: false, basic: false, premium: true },
  { label: 'Premium Community Perks', free: false, basic: false, premium: true },
];

export function PaywallScreen({ onDismiss, currentPlan = 'free' }: PaywallScreenProps) {

  const handleSubscribe = async (plan: 'basic' | 'premium') => {
    if (Platform.OS === 'ios') return;
    const targetUrl = plan === 'premium' ? FLUTTERWAVE_PREMIUM_URL : FLUTTERWAVE_BASIC_URL;
    try {
      await WebBrowser.openBrowserAsync(targetUrl, {
        toolbarColor: '#050B14',
      });
    } catch {
      Linking.openURL(targetUrl);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-slate-800/60">
        <TouchableOpacity
          onPress={onDismiss}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <ArrowLeft size={18} color="#00E5FF" />
          <Text className="text-xs font-bold text-evermore-cyan ml-1.5">Back</Text>
        </TouchableOpacity>
        <Text className="text-sm font-extrabold text-white">Membership Tiers</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      >
        {/* Hero */}
        <View className="items-center mb-6">
          <View
            className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 items-center justify-center mb-4"
            style={{
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
            }}
          >
            <Crown size={30} color="#F59E0B" strokeWidth={2} />
          </View>
          <Text className="text-2xl font-black text-white text-center tracking-tight mb-1">
            Access Tiers
          </Text>
          <Text className="text-xs text-slate-400 text-center leading-relaxed px-4">
            Select a membership tier to unlock full platform features across our web portal and mobile experiences.
          </Text>
        </View>

        {/* Basic Plan Card */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Zap size={18} color="#00E5FF" />
              <Text className="text-base font-extrabold text-white ml-2">Basic Plan</Text>
            </View>
            <Text className="text-xs font-black text-evermore-cyan uppercase">Standard Tier</Text>
          </View>

          <Text className="text-xs text-slate-400 mb-4 leading-relaxed">
            Full curriculum access, daily streaks, community access, and standard opportunity campaigns.
          </Text>

          {/* Feature List */}
          <View className="mb-4">
            {PLAN_FEATURES.slice(0, 5).map((feature, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                {feature.basic ? (
                  <Check size={14} color="#34D399" />
                ) : (
                  <X size={14} color="#475569" />
                )}
                <Text className={`text-xs ml-2 ${feature.basic ? 'text-slate-300' : 'text-slate-600'}`}>
                  {feature.label}
                </Text>
              </View>
            ))}
          </View>

          {Platform.OS !== 'ios' ? (
            <TouchableOpacity
              onPress={() => handleSubscribe('basic')}
              activeOpacity={0.8}
              className="bg-evermore-surfaceLight border border-evermore-border py-3 rounded-xl flex-row items-center justify-center"
            >
              <Text className="text-xs font-bold text-evermore-cyan mr-1.5">Select Basic Tier</Text>
              <ExternalLink size={12} color="#00E5FF" />
            </TouchableOpacity>
          ) : (
            <View className="bg-evermore-surfaceLight/60 border border-evermore-border/60 py-2.5 rounded-xl items-center justify-center">
              <Text className="text-xs font-semibold text-slate-400">
                {currentPlan === 'basic' || currentPlan === 'premium' ? 'Included in your account' : 'Standard Web Tier'}
              </Text>
            </View>
          )}
        </View>

        {/* Premium Plan Card */}
        <View
          className="bg-evermore-surface border rounded-3xl p-5 mb-4"
          style={{
            borderColor: 'rgba(0, 229, 255, 0.3)',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
          }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center">
              <Crown size={18} color="#F59E0B" />
              <Text className="text-base font-extrabold text-white ml-2">Premium Plan</Text>
            </View>
            <Text className="text-xs font-black text-evermore-cyan uppercase">Priority Tier</Text>
          </View>
          <View className="bg-evermore-cyan/15 border border-evermore-cyan/25 px-2.5 py-0.5 rounded-full self-start mb-3">
            <Text className="text-[9px] font-bold text-evermore-cyan uppercase tracking-wider">Recommended</Text>
          </View>

          <Text className="text-xs text-slate-400 mb-4 leading-relaxed">
            Everything in Basic plus higher-tier AI training tasks, prioritized review pipelines, dedicated mentorship, and premium community perks.
          </Text>

          {/* Feature List */}
          <View className="mb-4">
            {PLAN_FEATURES.map((feature, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                {feature.premium ? (
                  <Check size={14} color="#34D399" />
                ) : (
                  <X size={14} color="#475569" />
                )}
                <Text className={`text-xs ml-2 ${feature.premium ? 'text-slate-300' : 'text-slate-600'}`}>
                  {feature.label}
                </Text>
              </View>
            ))}
          </View>

          {Platform.OS !== 'ios' ? (
            <TouchableOpacity
              onPress={() => handleSubscribe('premium')}
              activeOpacity={0.85}
              className="py-3.5 rounded-xl flex-row items-center justify-center"
              style={{
                backgroundColor: '#00E5FF',
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
              }}
            >
              <Text className="text-xs font-extrabold text-evermore-bg uppercase tracking-wider mr-1.5">
                Select Premium Tier
              </Text>
              <ExternalLink size={12} color="#050B14" />
            </TouchableOpacity>
          ) : (
            <View className="bg-evermore-surfaceLight/60 border border-evermore-border/60 py-2.5 rounded-xl items-center justify-center">
              <Text className="text-xs font-semibold text-slate-400">
                {currentPlan === 'premium' ? 'Active on your account' : 'Available with Web Membership'}
              </Text>
            </View>
          )}
        </View>

        {/* Security Note */}
        <View className="bg-evermore-surface border border-evermore-border rounded-2xl p-4 mb-4">
          <Text className="text-[11px] text-slate-400 text-center leading-relaxed">
            🔒 Evermore is a cross-platform opportunity ecosystem. Subscriptions and tier management are handled securely through the official web portal.
          </Text>
        </View>

        {/* Support */}
        <View className="items-center">
          <Text className="text-[11px] text-slate-500 mb-1">Need help with your tier?</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:Quickloaddata@gmail.com').catch(() => {})}
          >
            <Text className="text-xs font-bold text-evermore-cyan">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
