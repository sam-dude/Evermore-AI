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
        toolbarColor: '#090D16',
      });
    } catch {}
  };

  return (
    <SafeAreaView className="flex-1 bg-[#090D16]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar Navigation */}
          {onBackToOnboarding && (
            <TouchableOpacity
              onPress={onBackToOnboarding}
              activeOpacity={0.7}
              className="flex-row items-center py-2 mb-3 -ml-1 self-start"
            >
              <ArrowLeft size={16} color="#94A3B8" />
              <Text className="text-xs font-semibold text-slate-400 ml-1.5">Back</Text>
            </TouchableOpacity>
          )}

          {/* Header */}
          <View className="items-center mb-6 mt-2">
            <View className="w-16 h-16 rounded-2xl overflow-hidden mb-3 border border-slate-700/80 bg-slate-900 items-center justify-center shadow-md">
              <Image
                source={require('../../assets/images/evertap-logo.jpeg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <Text className="text-2xl font-black text-white tracking-tight">
              EVER<Text className="text-sky-400">MORE</Text>
            </Text>
            <Text className="text-xs text-slate-400 mt-1">
              Digital Skills & Opportunity Platform
            </Text>
          </View>

          {/* Clean Card Form */}
          <View className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl mb-6">
            <Text className="text-xl font-black text-white mb-1">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </Text>
            <Text className="text-xs text-slate-400 mb-5 leading-relaxed">
              {isSignUp
                ? 'Join thousands of members mastering in-demand digital skills.'
                : 'Sign in to access your curriculum, streaks, and account details.'}
            </Text>

            {error ? (
              <View className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-4">
                <Text className="text-xs text-rose-400 font-medium">{error}</Text>
              </View>
            ) : null}

            {/* Name */}
            {isSignUp && (
              <View className="mb-3.5">
                <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Full Name</Text>
                <View className="flex-row items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3">
                  <UserIcon size={17} color="#64748B" />
                  <TextInput
                    placeholder="e.g. Alex Johnson"
                    placeholderTextColor="#475569"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                    className="flex-1 ml-2.5 text-sm text-white"
                  />
                </View>
              </View>
            )}

            {/* Email */}
            <View className="mb-3.5">
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3">
                <Mail size={17} color="#64748B" />
                <TextInput
                  placeholder="name@example.com"
                  placeholderTextColor="#475569"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="flex-1 ml-2.5 text-sm text-white"
                />
              </View>
            </View>

            {/* Phone (optional) */}
            {isSignUp && (
              <View className="mb-3.5">
                <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                  Phone Number <Text className="text-slate-500 font-normal">(Optional)</Text>
                </Text>
                <View className="flex-row items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3">
                  <Phone size={17} color="#64748B" />
                  <TextInput
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#475569"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    className="flex-1 ml-2.5 text-sm text-white"
                  />
                </View>
              </View>
            )}

            {/* Password */}
            <View className="mb-5">
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Password</Text>
              <View className="flex-row items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3">
                <Lock size={17} color="#64748B" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#475569"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="flex-1 ml-2.5 text-sm text-white"
                />
              </View>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.85}
              className="bg-sky-400 active:bg-sky-300 py-3.5 rounded-xl items-center justify-center flex-row shadow-lg shadow-sky-500/20"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#020617" />
              ) : (
                <>
                  <Text className="font-extrabold text-slate-950 text-sm mr-2">
                    {isSignUp ? 'Create Free Account' : 'Sign In'}
                  </Text>
                  <ArrowRight size={16} color="#020617" strokeWidth={2.5} />
                </>
              )}
            </TouchableOpacity>

            {/* Switch Mode Toggle */}
            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="mt-4 items-center py-1"
            >
              <Text className="text-xs text-slate-400">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text className="text-sky-400 font-bold">
                  {isSignUp ? 'Sign In' : 'Sign Up Free'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy & Legal */}
          <View className="flex-row items-center justify-center space-x-3 mt-1 mb-4">
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/privacy.html')}>
              <Text className="text-[11px] text-slate-400 underline">Privacy Policy</Text>
            </TouchableOpacity>
            <Text className="text-slate-600 text-xs">•</Text>
            <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}>
              <Text className="text-[11px] text-slate-400 underline">Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
