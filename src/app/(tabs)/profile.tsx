import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';

const TELEGRAM_URL = 'https://t.me/evermoreai?text=evermore';
const PRIVACY_URL = 'https://evermoreinnovation.site/privacy.html';
const TERMS_URL = 'https://evermoreinnovation.site/terms.html';
const WEB_URL = 'https://evermoreinnovation.site/';

export default function ProfileScreen() {
  const { user, subscription, logout } = useAuth();

  const handleOpenLink = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: '#090D16',
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

  return (
    <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* ── HEADER ── */}
        <View className="pt-2 pb-3 mb-2">
          <Text className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">
            Account
          </Text>
          <Text className="text-2xl font-black text-white tracking-tight">
            Profile &amp; Settings
          </Text>
        </View>

        {/* ── USER CARD ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-5 mb-5 shadow-lg">
          <View className="flex-row items-center mb-4">
            <View className="w-13 h-13 rounded-2xl bg-sky-500/10 border border-sky-500/20 items-center justify-center mr-3.5 p-3">
              <UserIcon size={26} color="#38BDF8" />
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
                  <Text className="text-[11px] text-slate-400">Region: {user.country}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Stats Bar */}
          <View className="flex-row bg-[#0A101C] rounded-2xl p-3 border border-slate-800">
            <View className="flex-1 items-center border-r border-slate-800">
              <View className="flex-row items-center">
                <Sparkles size={14} color="#38BDF8" />
                <Text className="text-sm font-black text-white ml-1.5">
                  {user?.points || 0}
                </Text>
              </View>
              <Text className="text-[10px] font-semibold text-slate-400 mt-0.5">EverPoints</Text>
            </View>
            <View className="flex-1 items-center">
              <View className="flex-row items-center">
                <Flame size={14} color="#F59E0B" />
                <Text className="text-sm font-black text-white ml-1.5">
                  {user?.streak || 0} Days
                </Text>
              </View>
              <Text className="text-[10px] font-semibold text-slate-400 mt-0.5">Active Streak</Text>
            </View>
          </View>
        </View>

        {/* ── MEMBERSHIP GROUP ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-5 mb-5 shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <ShieldCheck size={18} color="#38BDF8" />
              <Text className="text-sm font-bold text-white ml-2">Plan &amp; Access</Text>
            </View>
            <View className="bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
              <Text className="text-[10px] font-bold text-sky-400 uppercase">
                {subscription.status}
              </Text>
            </View>
          </View>

          <Text className="text-xs text-slate-400 mb-3.5 leading-relaxed">
            Manage your membership tier and access full opportunities through our official web portal.
          </Text>

          <TouchableOpacity
            onPress={() => handleOpenLink(WEB_URL)}
            activeOpacity={0.75}
            className="bg-[#182338] border border-slate-700/60 py-3 px-4 rounded-xl flex-row items-center justify-between"
          >
            <Text className="text-xs font-bold text-white">Manage Membership on Web</Text>
            <ExternalLink size={14} color="#38BDF8" />
          </TouchableOpacity>
        </View>

        {/* ── SETTINGS GROUP: COMMUNITY & SUPPORT ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-4 mb-5 shadow-sm">
          <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Community &amp; Support
          </Text>

          <TouchableOpacity
            onPress={() => handleOpenLink(TELEGRAM_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3 px-1 border-b border-slate-800/80"
          >
            <View className="flex-row items-center">
              <MessageCircle size={16} color="#38BDF8" />
              <Text className="text-xs font-semibold text-white ml-2.5">
                Official Telegram Community
              </Text>
            </View>
            <ChevronRight size={14} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:customercare@evermoreinnovation.site')}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3 px-1"
          >
            <View className="flex-row items-center">
              <Mail size={16} color="#38BDF8" />
              <Text className="text-xs font-semibold text-white ml-2.5">
                Contact Customer Care
              </Text>
            </View>
            <ChevronRight size={14} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* ── SETTINGS GROUP: LEGAL ── */}
        <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-4 mb-5 shadow-sm">
          <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Legal &amp; Policies
          </Text>

          <TouchableOpacity
            onPress={() => handleOpenLink(PRIVACY_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3 px-1 border-b border-slate-800/80"
          >
            <View className="flex-row items-center">
              <FileText size={16} color="#94A3B8" />
              <Text className="text-xs font-semibold text-slate-300 ml-2.5">Privacy Policy</Text>
            </View>
            <ExternalLink size={13} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOpenLink(TERMS_URL)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-3 px-1"
          >
            <View className="flex-row items-center">
              <FileText size={16} color="#94A3B8" />
              <Text className="text-xs font-semibold text-slate-300 ml-2.5">Terms of Service</Text>
            </View>
            <ExternalLink size={13} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* ── SIGN OUT BUTTON ── */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="bg-rose-500/10 border border-rose-500/20 py-3.5 rounded-2xl flex-row items-center justify-center mb-4"
        >
          <LogOut size={16} color="#F43F5E" />
          <Text className="text-xs font-bold text-rose-400 ml-2">Sign Out</Text>
        </TouchableOpacity>

        <Text className="text-[11px] text-slate-600 text-center">
          Evermore AI v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
