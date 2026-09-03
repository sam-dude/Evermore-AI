import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import {
  User as UserIcon,
  ShieldCheck,
  Sparkles,
  Flame,
  ExternalLink,
  MessageCircle,
  Mail,
  FileText,
  LogOut,
  ChevronRight,
  Crown,
  Globe,
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';

const TELEGRAM_URL = 'https://t.me/evermoreai?text=evermore';
const PRIVACY_URL = 'https://evermoreinnovation.site/privacy.html';
const TERMS_URL = 'https://evermoreinnovation.site/terms.html';
const WEB_URL = 'https://evermoreinnovation.site/';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, subscription, logout, deleteAccount } = useAuth();

  const handleOpenLink = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: '#050B14',
      });
    } catch {
      Linking.openURL(url);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of your Evermore account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your Evermore account and all progress? This action cannot be undone and your points and data will be erased.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: async () => {
            await deleteAccount();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* ── HEADER ── */}
        <View className="pt-3 pb-3 mb-2">
          <Text className="text-[11px] font-bold text-evermore-cyan uppercase tracking-widest mb-1">
            Account
          </Text>
          <Text className="text-2xl font-black text-white tracking-tight">
            Profile &amp; Settings
          </Text>
        </View>

        {/* ── USER CARD ── */}
        <View
          className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-5"
          style={{
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 16,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View
              className="w-14 h-14 rounded-2xl bg-evermore-cyan/10 border border-evermore-cyan/20 items-center justify-center mr-3.5"
              style={{
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
              }}
            >
              <UserIcon size={26} color="#00E5FF" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-extrabold text-white" numberOfLines={1}>
                {user?.fullName || 'Evermore Member'}
              </Text>
              <Text className="text-xs text-slate-400 mt-0.5" numberOfLines={1}>
                {user?.email || ''}
              </Text>
              <View className="flex-row items-center mt-1.5">
                <View className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full mr-2">
                  <Text className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {subscription.plan} Plan
                  </Text>
                </View>
                {user?.country && (
                  <Text className="text-[11px] text-slate-500">Region: {user.country}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Stats Bar */}
          <View className="flex-row bg-evermore-bg rounded-2xl p-3.5 border border-slate-800/80">
            <View className="flex-1 items-center border-r border-slate-800">
              <View className="flex-row items-center">
                <Sparkles size={14} color="#00E5FF" />
                <Text className="text-base font-black text-white ml-1.5">
                  {user?.points || 0}
                </Text>
              </View>
              <Text className="text-[10px] font-semibold text-slate-500 mt-0.5">EverPoints</Text>
            </View>
            <View className="flex-1 items-center">
              <View className="flex-row items-center">
                <Flame size={14} color="#F59E0B" />
                <Text className="text-base font-black text-white ml-1.5">
                  {user?.streak || 0} Days
                </Text>
              </View>
              <Text className="text-[10px] font-semibold text-slate-500 mt-0.5">Active Streak</Text>
            </View>
          </View>
        </View>

        {/* ── MEMBERSHIP GROUP (HIGHLIGHTED & PROMINENT) ── */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Crown size={18} color="#F59E0B" />
              <Text className="text-sm font-bold text-white ml-2">Membership &amp; Access Tier</Text>
            </View>
            <View className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              <Text className="text-[10px] font-bold text-amber-400 uppercase">
                {subscription.plan} • {subscription.status}
              </Text>
            </View>
          </View>

          <Text className="text-xs text-slate-400 mb-3.5 leading-relaxed">
            Review your package perks, upgrade your access, or manage your subscription through our official web portal.
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/membership' as any)}
            activeOpacity={0.8}
            className="bg-evermore-cyan/10 border border-evermore-cyan/30 py-3 px-4 rounded-xl flex-row items-center justify-between mb-2.5"
          >
            <View className="flex-row items-center">
              <ShieldCheck size={16} color="#00E5FF" />
              <Text className="text-xs font-bold text-white ml-2">View Membership Plans &amp; Perks</Text>
            </View>
            <ChevronRight size={14} color="#00E5FF" />
          </TouchableOpacity>

          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/membership' as any)}
              activeOpacity={0.75}
              className="bg-evermore-surfaceLight border border-evermore-border py-2.5 px-4 rounded-xl flex-row items-center justify-between"
            >
              <Text className="text-xs font-semibold text-slate-400">Account Access &amp; Sync</Text>
              <ChevronRight size={13} color="#94A3B8" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleOpenLink(WEB_URL)}
              activeOpacity={0.75}
              className="bg-evermore-surfaceLight border border-evermore-border py-2.5 px-4 rounded-xl flex-row items-center justify-between"
            >
              <Text className="text-xs font-semibold text-slate-400">Manage Billing on Web Portal</Text>
              <ExternalLink size={13} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* ── SETTINGS GROUP: COMMUNITY & SUPPORT ── */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-4 mb-5">
          <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            Community &amp; Support
          </Text>

          <TouchableOpacity
            onPress={() => handleOpenLink(WEB_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3.5 px-1 border-b border-slate-800/60"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-cyan-500/10 items-center justify-center mr-2.5">
                <Globe size={15} color="#00E5FF" />
              </View>
              <View>
                <Text className="text-xs font-bold text-white">
                  Official Web Portal
                </Text>
                <Text className="text-[10px] text-slate-400">
                  evermoreinnovation.site
                </Text>
              </View>
            </View>
            <ExternalLink size={14} color="#00E5FF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOpenLink(TELEGRAM_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3.5 px-1 border-b border-slate-800/60"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-evermore-cyan/8 items-center justify-center mr-2.5">
                <MessageCircle size={15} color="#00E5FF" />
              </View>
              <Text className="text-xs font-semibold text-white">
                Official Telegram Community
              </Text>
            </View>
            <ChevronRight size={14} color="#475569" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:Quickloaddata@gmail.com').catch(() => {})}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3.5 px-1"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-evermore-cyan/8 items-center justify-center mr-2.5">
                <Mail size={15} color="#00E5FF" />
              </View>
              <Text className="text-xs font-semibold text-white">
                Contact Customer Care
              </Text>
            </View>
            <ChevronRight size={14} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* ── SETTINGS GROUP: LEGAL ── */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-4 mb-5">
          <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            Legal &amp; Policies
          </Text>

          <TouchableOpacity
            onPress={() => handleOpenLink(PRIVACY_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3.5 px-1 border-b border-slate-800/60"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-slate-800/50 items-center justify-center mr-2.5">
                <FileText size={14} color="#94A3B8" />
              </View>
              <Text className="text-xs font-semibold text-slate-300">Privacy Policy</Text>
            </View>
            <ExternalLink size={13} color="#475569" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOpenLink(TERMS_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3.5 px-1"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-slate-800/50 items-center justify-center mr-2.5">
                <FileText size={14} color="#94A3B8" />
              </View>
              <Text className="text-xs font-semibold text-slate-300">Terms of Service</Text>
            </View>
            <ExternalLink size={13} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* ── SIGN OUT BUTTON ── */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="bg-rose-500/8 border border-rose-500/20 py-3.5 rounded-2xl flex-row items-center justify-center mb-3"
        >
          <LogOut size={16} color="#F43F5E" />
          <Text className="text-xs font-bold text-rose-400 ml-2">Sign Out</Text>
        </TouchableOpacity>

        {/* ── ACCOUNT DELETION (Apple Guideline 5.1.1(v) Compliant) ── */}
        <TouchableOpacity
          onPress={handleDeleteAccount}
          activeOpacity={0.7}
          className="py-2.5 items-center justify-center mb-5"
        >
          <Text className="text-xs text-slate-500 font-medium underline">
            Delete Account &amp; All Data
          </Text>
        </TouchableOpacity>

        <Text className="text-[11px] text-slate-600 text-center">
          Evermore AI v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
