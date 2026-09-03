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
  Linking,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Lock, Mail, User as UserIcon, Phone, ArrowLeft, Check, Globe } from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';
import { GradientButton } from '@/components/gradient-button';

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
  const [country, setCountry] = useState('Nigeria');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setError('Please enter your username or full name.');
      return;
    }

    if (isSignUp && !agreedToTerms) {
      setError('Please agree to the Evermore Terms of Service.');
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
    } catch {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 22, paddingVertical: 14 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── TOP BAR (MATCHING BRAND HEADER) ── */}
          <View className="flex-row items-center justify-between mb-5">
            {onBackToOnboarding ? (
              <TouchableOpacity
                onPress={onBackToOnboarding}
                activeOpacity={0.7}
                className="flex-row items-center py-2"
              >
                <ArrowLeft size={20} color="#00E5FF" />
                <Text className="text-xs font-bold text-[#00E5FF] ml-1.5 uppercase tracking-wider">Back</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 40 }} />
            )}

            <View className="flex-row items-center">
              <View className="w-7 h-7 rounded-xl overflow-hidden mr-2 border border-cyan-500/30 bg-[#0A1628] items-center justify-center">
                <Image
                  source={require('../../assets/images/evertap-logo.jpeg')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              <Text className="text-sm font-black text-white tracking-widest uppercase">
                EVERMORE
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="py-1 px-3 rounded-full bg-slate-800/60 border border-slate-700/50"
            >
              <Text className="text-[11px] font-bold text-[#00E5FF]">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── FORM TITLE ── */}
          <View className="mb-6">
            <Text className="text-[10px] font-black text-[#00F5A0] uppercase tracking-[0.2em] mb-1">
              {isSignUp ? 'Member Onboarding' : 'Welcome Back'}
            </Text>
            <Text className="text-2xl font-black text-white tracking-tight">
              {isSignUp ? 'Create your Account' : 'Sign in to Evermore'}
            </Text>
          </View>

          {/* Error Banner */}
          {error && (
            <View className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3.5 mb-5">
              <Text className="text-xs text-rose-300 font-medium leading-relaxed">{error}</Text>
            </View>
          )}

          {/* ── FORM FIELDS (MATCHING SCREENSHOT 2) ── */}
          <View className="space-y-4" style={{ gap: 14 }}>
            {/* Email Address */}
            <View>
              <Text className="text-[11px] font-bold text-[#00F5A0] uppercase tracking-wider mb-1.5 pl-1">
                Email Address
              </Text>
              <View className="flex-row items-center bg-[#0C1726] border border-[#172A46] rounded-2xl px-4 py-3.5">
                <Mail size={18} color="#64748B" />
                <TextInput
                  placeholder="name@example.com"
                  placeholderTextColor="#475569"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="flex-1 ml-3 text-sm text-white"
                />
              </View>
            </View>

            {/* Username / Full Name (if signup) */}
            {isSignUp && (
              <View>
                <Text className="text-[11px] font-bold text-[#00F5A0] uppercase tracking-wider mb-1.5 pl-1">
                  Username
                </Text>
                <View className="flex-row items-center bg-[#0C1726] border border-[#172A46] rounded-2xl px-4 py-3.5">
                  <UserIcon size={18} color="#64748B" />
                  <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor="#475569"
                    value={fullName}
                    onChangeText={setFullName}
                    className="flex-1 ml-3 text-sm text-white"
                  />
                </View>
              </View>
            )}

            {/* Phone Number (if signup) */}
            {isSignUp && (
              <View>
                <Text className="text-[11px] font-bold text-[#00F5A0] uppercase tracking-wider mb-1.5 pl-1">
                  Phone Number
                </Text>
                <View className="flex-row items-center bg-[#0C1726] border border-[#172A46] rounded-2xl px-4 py-3.5">
                  <Phone size={18} color="#64748B" />
                  <TextInput
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#475569"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    className="flex-1 ml-3 text-sm text-white"
                  />
                </View>
              </View>
            )}

            {/* Country (if signup) */}
            {isSignUp && (
              <View>
                <Text className="text-[11px] font-bold text-[#00F5A0] uppercase tracking-wider mb-1.5 pl-1">
                  Country
                </Text>
                <View className="flex-row items-center bg-[#0C1726] border border-[#172A46] rounded-2xl px-4 py-3.5">
                  <Globe size={18} color="#64748B" />
                  <TextInput
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Nigeria"
                    placeholderTextColor="#475569"
                    className="flex-1 ml-3 text-sm text-white"
                  />
                </View>
              </View>
            )}

            {/* Password */}
            <View>
              <Text className="text-[11px] font-bold text-[#00F5A0] uppercase tracking-wider mb-1.5 pl-1">
                {isSignUp ? 'Create Password' : 'Password'}
              </Text>
              <View className="flex-row items-center bg-[#0C1726] border border-[#172A46] rounded-2xl px-4 py-3.5">
                <Lock size={18} color="#64748B" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#475569"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="flex-1 ml-3 text-sm text-white"
                />
              </View>
            </View>

            {/* ── REGISTRATION PACKAGE CARDS (NON-IOS ONLY TO PASS APPLE REVIEW) ── */}
            {isSignUp && Platform.OS !== 'ios' && (
              <View className="mt-2">
                <Text className="text-[12px] font-bold text-[#00F5A0] uppercase tracking-wider mb-2.5 pl-1">
                  Registration Package:
                </Text>

                {/* Basic Plan */}
                <TouchableOpacity
                  onPress={() => setSelectedPlan('basic')}
                  activeOpacity={0.8}
                  className="rounded-2xl p-4 mb-3 border bg-[#0C1726]"
                  style={{
                    borderColor: selectedPlan === 'basic' ? '#00F5A0' : '#172A46',
                    shadowColor: selectedPlan === 'basic' ? '#00F5A0' : 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-extrabold text-white">Basic Plan</Text>
                    {selectedPlan === 'basic' && (
                      <View className="w-5 h-5 rounded-full bg-[#00F5A0] items-center justify-center">
                        <Check size={12} color="#050B14" strokeWidth={3} />
                      </View>
                    )}
                  </View>
                  <Text className="text-lg font-black text-[#00F5A0] mb-0.5">
                    ₦7,000
                  </Text>
                  <Text className="text-xs text-slate-400">
                    Start your Evermore journey.
                  </Text>
                </TouchableOpacity>

                {/* Premium Plan */}
                <TouchableOpacity
                  onPress={() => setSelectedPlan('premium')}
                  activeOpacity={0.8}
                  className="rounded-2xl p-4 mb-3 border bg-[#0C1726]"
                  style={{
                    borderColor: selectedPlan === 'premium' ? '#00E5FF' : '#172A46',
                    shadowColor: selectedPlan === 'premium' ? '#00E5FF' : 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-extrabold text-white">Premium Plan</Text>
                    {selectedPlan === 'premium' && (
                      <View className="w-5 h-5 rounded-full bg-[#00E5FF] items-center justify-center">
                        <Check size={12} color="#050B14" strokeWidth={3} />
                      </View>
                    )}
                  </View>
                  <Text className="text-lg font-black text-[#00E5FF] mb-0.5">
                    ₦14,000
                  </Text>
                  <Text className="text-xs text-slate-400">
                    Unlock the higher plan experience.
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Terms Checkbox (All Platforms) */}
            {isSignUp && (
              <TouchableOpacity
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.8}
                className="flex-row items-center mt-1 mb-2 pl-1"
              >
                <View
                  className="w-5 h-5 rounded-md border items-center justify-center mr-2.5"
                  style={{
                    borderColor: agreedToTerms ? '#00F5A0' : '#475569',
                    backgroundColor: agreedToTerms ? '#00F5A0' : 'transparent',
                  }}
                >
                  {agreedToTerms && <Check size={14} color="#050B14" strokeWidth={3} />}
                </View>
                <Text className="text-xs text-slate-300 flex-1">
                  I agree to the Evermore{' '}
                  <Text
                    onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}
                    className="text-[#00F5A0] underline font-semibold"
                  >
                    Terms of Service
                  </Text>
                </Text>
              </TouchableOpacity>
            )}

            {/* ── ACTION BUTTON (SIGN UP & GET STARTED / SIGN IN) ── */}
            <View className="mt-3">
              <GradientButton
                title={isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
                onPress={handleAuth}
                loading={loading}
                size="lg"
                textStyle={{ fontSize: 13, fontWeight: '900', letterSpacing: 1 }}
              />
            </View>

            {/* ── FOOTER HELP TEXT ── */}
            {isSignUp && (
              <View className="mt-4 px-2">
                <Text className="text-[11px] text-slate-400 text-center leading-relaxed mb-2">
                  {Platform.OS === 'ios' ? (
                    <>
                      Need assistance with your account or registration?{' '}
                      <Text
                        onPress={() => Linking.openURL('mailto:Quickloaddata@gmail.com').catch(() => {})}
                        className="text-[#00F5A0] font-bold underline"
                      >
                        Contact Evermore Support
                      </Text>
                    </>
                  ) : (
                    <>
                      MOMO bank users like Ghana, SA, Cameroon & other countries, including Nigerians experiencing payment issues?{' '}
                      <Text
                        onPress={() => Linking.openURL('mailto:Quickloaddata@gmail.com').catch(() => {})}
                        className="text-[#00F5A0] font-bold underline"
                      >
                        Contact Evermore Support
                      </Text>
                    </>
                  )}
                </Text>

                <TouchableOpacity
                  onPress={() => openLegal('https://evermoreinnovation.site/')}
                  activeOpacity={0.8}
                  className="flex-row items-center justify-center py-1.5"
                >
                  <Text className="text-[11px] text-slate-400">
                    Official Web Portal:{' '}
                    <Text className="text-[#00E5FF] font-bold underline">
                      evermoreinnovation.site
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Mode Switcher */}
            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="items-center py-4 mt-2"
            >
              <Text className="text-xs text-slate-400">
                {isSignUp ? 'Already registered? ' : "Don't have an account? "}
                <Text className="text-[#00E5FF] font-bold">
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Legal Links */}
            <View className="flex-row items-center justify-center pb-6" style={{ gap: 14 }}>
              <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/privacy.html')}>
                <Text className="text-[11px] text-slate-500 underline">Privacy Policy</Text>
              </TouchableOpacity>
              <Text className="text-slate-700 text-xs">•</Text>
              <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}>
                <Text className="text-[11px] text-slate-500 underline">Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
