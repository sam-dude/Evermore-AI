import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Lock, Mail, User as UserIcon, Phone, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';

interface AuthScreenProps {
  initialMode?: 'signin' | 'signup';
  onBackToOnboarding?: () => void;
}

export function AuthScreen({ initialMode = 'signup', onBackToOnboarding }: AuthScreenProps) {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await signup(fullName, email, password, phone);
        if (!res.success) setError(res.error || 'Failed to create account.');
      } else {
        const res = await login(email, password);
        if (!res.success) setError(res.error || 'Failed to sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  const openLegal = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: '#050B14',
      });
    } catch {}
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 26, paddingVertical: 18 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar Navigation */}
          {onBackToOnboarding && (
            <TouchableOpacity
              onPress={onBackToOnboarding}
              activeOpacity={0.7}
              className="flex-row items-center py-2 mb-2 -ml-1 self-start"
            >
              <ArrowLeft size={20} color="#00E5FF" />
              <Text className="text-sm font-bold text-evermore-cyan ml-2">Back</Text>
            </TouchableOpacity>
          )}

          {/* Minimal Header (No Box) */}
          <View className="mb-8 mt-2">
            <View className="flex-row items-center mb-5">
              <View
                className="w-12 h-12 rounded-2xl overflow-hidden mr-3 border border-evermore-border bg-evermore-surface items-center justify-center"
                style={{
                  shadowColor: '#00E5FF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                }}
              >
                <Image
                  source={require('../../assets/images/evertap-logo.jpeg')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              <Text className="text-xl font-black text-white tracking-tight">
                EVER<Text className="text-evermore-cyan">MORE</Text>
              </Text>
            </View>

            <Text className="text-3xl font-black text-white tracking-tight leading-tight mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </Text>
            <Text className="text-base text-slate-400 leading-relaxed">
              {isSignUp
                ? 'Join motivated members unlocking modern digital skills and reward-driven opportunities.'
                : 'Sign in to access your modules, daily streaks, and membership perks.'}
            </Text>
          </View>

          {/* Error Banner */}
          {error && (
            <View className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 mb-6">
              <Text className="text-sm text-rose-400 font-semibold leading-relaxed">{error}</Text>
            </View>
          )}

          {/* Minimal Form Elements (No Container Card) */}
          <View>
            {/* Full Name */}
            {isSignUp && (
              <View className="mb-4">
                <Text className="text-sm font-bold text-slate-200 mb-2 pl-1">Full Name</Text>
                <View className="flex-row items-center bg-evermore-surface border border-slate-800 rounded-2xl px-4 py-3.5 focus:border-evermore-cyan">
                  <UserIcon size={20} color="#64748B" />
                  <TextInput
                    placeholder="e.g. Alex Johnson"
                    placeholderTextColor="#475569"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                    className="flex-1 ml-3 text-base text-white"
                  />
                </View>
              </View>
            )}

            {/* Email */}
            <View className="mb-4">
              <Text className="text-sm font-bold text-slate-200 mb-2 pl-1">Email Address</Text>
              <View className="flex-row items-center bg-evermore-surface border border-slate-800 rounded-2xl px-4 py-3.5 focus:border-evermore-cyan">
                <Mail size={20} color="#64748B" />
                <TextInput
                  placeholder="name@example.com"
                  placeholderTextColor="#475569"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="flex-1 ml-3 text-base text-white"
                />
              </View>
            </View>

            {/* Phone (optional) */}
            {isSignUp && (
              <View className="mb-4">
                <Text className="text-sm font-bold text-slate-200 mb-2 pl-1">
                  Phone Number <Text className="text-slate-500 font-normal">(Optional)</Text>
                </Text>
                <View className="flex-row items-center bg-evermore-surface border border-slate-800 rounded-2xl px-4 py-3.5 focus:border-evermore-cyan">
                  <Phone size={20} color="#64748B" />
                  <TextInput
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#475569"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    className="flex-1 ml-3 text-base text-white"
                  />
                </View>
              </View>
            )}

            {/* Password */}
            <View className="mb-6">
              <Text className="text-sm font-bold text-slate-200 mb-2 pl-1">Password</Text>
              <View className="flex-row items-center bg-evermore-surface border border-slate-800 rounded-2xl px-4 py-3.5 focus:border-evermore-cyan">
                <Lock size={20} color="#64748B" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#475569"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="flex-1 ml-3 text-base text-white"
                />
              </View>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.85}
              className="py-4 rounded-2xl items-center justify-center flex-row mb-5"
              style={{
                backgroundColor: '#00E5FF',
                shadowColor: '#00E5FF',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 14,
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#050B14" />
              ) : (
                <>
                  <Text className="font-black text-evermore-bg text-base mr-2">
                    {isSignUp ? 'Create Free Account' : 'Sign In'}
                  </Text>
                  <ArrowRight size={18} color="#050B14" strokeWidth={2.5} />
                </>
              )}
            </TouchableOpacity>

            {/* Switch Mode Toggle (Bigger & Clean) */}
            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="items-center py-2 mb-8"
            >
              <Text className="text-sm text-slate-400">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text className="text-evermore-cyan font-bold">
                  {isSignUp ? 'Sign In' : 'Sign Up Free'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy & Legal */}
          <View className="flex-row items-center justify-center pb-6" style={{ gap: 14 }}>
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/privacy.html')}>
              <Text className="text-xs text-slate-500 underline">Privacy Policy</Text>
            </TouchableOpacity>
            <Text className="text-slate-700 text-sm">•</Text>
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}>
              <Text className="text-xs text-slate-500 underline">Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
