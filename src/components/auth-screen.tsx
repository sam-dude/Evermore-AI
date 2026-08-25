import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, Sparkles, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react-native';

import { useAuth } from '@/context/auth-context';
import { Badge } from '@/components/ui/badge';

export function AuthScreen() {
  const { login, signup, loginAsReviewer } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await signup(name, email, password);
        if (!res.success) setError(res.error || 'Failed to sign up.');
      } else {
        const res = await login(email, password);
        if (!res.success) setError(res.error || 'Failed to sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReviewerQuickLogin = async () => {
    setLoading(true);
    try {
      await loginAsReviewer();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 22, paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand Header */}
          <View className="items-center mb-6 mt-4">
            <View className="w-20 h-20 rounded-2xl overflow-hidden mb-3 border border-evermore-border bg-evermore-surface items-center justify-center shadow-lg shadow-cyan-500/10">
              <Image
                source={require('@/assets/images/evertap-logo.jpeg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <Text className="text-3xl font-extrabold tracking-tight text-white">
              EVER<Text className="text-evermore-cyan">MORE</Text> <Text className="text-2xl font-bold text-evermore-cyan">AI</Text>
            </Text>
            <Text className="text-xs uppercase tracking-widest text-evermore-muted font-semibold mt-1">
              Tap · Mine · Earn
            </Text>
            <Text className="text-xs text-slate-400 mt-1 text-center">
              Powered by Evermore Innovation
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-6 shadow-xl mb-5">
            <Text className="text-xl font-bold text-white mb-1">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </Text>
            <Text className="text-xs text-evermore-muted mb-5">
              {isSignUp
                ? 'Sign up to start mining Evercoin and earning rewards'
                : 'Sign in to manage your mined Evercoins and predictions'}
            </Text>

            {error ? (
              <View className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-4">
                <Text className="text-xs text-rose-400 font-medium">{error}</Text>
              </View>
            ) : null}

            {/* Name field for sign up */}
            {isSignUp && (
              <View className="mb-4">
                <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Full Name</Text>
                <View className="flex-row items-center bg-evermore-surfaceLight border border-evermore-border rounded-xl px-3.5 py-3">
                  <UserIcon size={18} color="#94A3B8" />
                  <TextInput
                    placeholder="e.g. Alex Johnson"
                    placeholderTextColor="#64748B"
                    value={name}
                    onChangeText={setName}
                    className="flex-1 ml-2.5 text-sm text-white"
                  />
                </View>
              </View>
            )}

            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-evermore-surfaceLight border border-evermore-border rounded-xl px-3.5 py-3">
                <Mail size={18} color="#94A3B8" />
                <TextInput
                  placeholder="name@example.com"
                  placeholderTextColor="#64748B"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="flex-1 ml-2.5 text-sm text-white"
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-6">
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Password</Text>
              <View className="flex-row items-center bg-evermore-surfaceLight border border-evermore-border rounded-xl px-3.5 py-3">
                <Lock size={18} color="#94A3B8" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#64748B"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="flex-1 ml-2.5 text-sm text-white"
                />
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleAuth}
              disabled={loading}
              className="bg-evermore-cyan active:opacity-90 py-3.5 rounded-xl items-center justify-center flex-row shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#050B14" />
              ) : (
                <>
                  <Text className="font-bold text-slate-950 text-sm mr-2">
                    {isSignUp ? 'Get Started & Mine' : 'Sign In'}
                  </Text>
                  <ArrowRight size={16} color="#050B14" />
                </>
              )}
            </Pressable>

            {/* Toggle Sign Up / Sign In */}
            <Pressable
              onPress={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="mt-4 items-center"
            >
              <Text className="text-xs text-slate-400">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text className="text-evermore-cyan font-semibold">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </Text>
            </Pressable>
          </View>

          {/* Dedicated Google Play Reviewer Access Box */}
          <View className="bg-slate-900/80 border border-indigo-500/40 rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center space-x-2">
                <ShieldCheck size={18} color="#818CF8" />
                <Text className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Google Play Reviewer Access
                </Text>
              </View>
              <Badge label="Review Ready" variant="purple" />
            </View>

            <Text className="text-xs text-slate-400 mb-3 leading-relaxed">
              Google review team can use the button below for instant, one-tap authenticated access to all features.
            </Text>

            <Pressable
              onPress={handleReviewerQuickLogin}
              className="bg-indigo-600 active:bg-indigo-700 py-3 rounded-xl items-center flex-row justify-center space-x-2 border border-indigo-400/30"
            >
              <Sparkles size={16} color="#ffffff" />
              <Text className="text-xs font-bold text-white">
                ⚡ Instant Reviewer Demo Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
