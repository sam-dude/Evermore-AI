import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { X, ExternalLink, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';

interface AuthModalProps {
  visible: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({
  visible,
  initialMode = 'login',
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup } = useAuth();

  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccessMsg(null);
  }, [initialMode, visible]);

  const handleOpenWeb = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://evermoreinnovation.site/', {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
        toolbarColor: '#050B14',
      });
    } catch (e) {
      console.warn('Could not open browser', e);
    }
  };

  const handleOpenLegal = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
        toolbarColor: '#050B14',
      });
    } catch (e) {
      console.warn('Could not open browser', e);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please provide your name.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        const res = await login(email.trim(), password);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccessMsg('Signed in successfully!');
          setTimeout(() => {
            onClose();
            if (onSuccess) onSuccess();
          }, 800);
        }
      } else {
        const res = await signup(name.trim(), email.trim(), password);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccessMsg('Account registered successfully!');
          setTimeout(() => {
            onClose();
            if (onSuccess) onSuccess();
          }, 800);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="w-full"
        >
          <View className="bg-[#0A1628] border-t border-slate-700/60 rounded-t-[32px] max-h-[90%] p-6 pb-10 shadow-2xl">
            {/* Header handle and close */}
            <View className="flex-row items-center justify-between pb-3 border-b border-slate-800">
              <View className="flex-row items-center space-x-2">
                <View className="w-8 h-8 rounded-full bg-emerald-500/20 items-center justify-center border border-emerald-500/40">
                  <Sparkles size={16} color="#34D399" />
                </View>
                <Text className="text-lg font-bold text-white tracking-wide">
                  Evermore <Text className="text-emerald-400">AI Portal</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 rounded-full bg-slate-800/80 items-center justify-center border border-slate-700"
                activeOpacity={0.7}
              >
                <X size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="mt-4"
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* PRIMARY WEB CTA CARD */}
              <View className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 mb-5">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-2">
                    <Text className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                      Official Web Platform
                    </Text>
                    <Text className="text-sm font-semibold text-white mb-1">
                      Register & Manage Your Profile Online
                    </Text>
                    <Text className="text-xs text-slate-300 leading-relaxed">
                      Visit evermoreinnovation.site for full ecosystem campaigns, AI training jobs, and instant rewards.
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleOpenWeb}
                  activeOpacity={0.85}
                  className="mt-3.5 bg-emerald-400 py-3 px-4 rounded-xl flex-row items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <Text className="text-slate-950 font-black text-xs uppercase tracking-wider">
                    Go to Official Website
                  </Text>
                  <ExternalLink size={14} color="#022c22" />
                </TouchableOpacity>
              </View>

              {/* Mode Toggle Switch */}
              <View className="flex-row bg-slate-900/90 p-1 rounded-xl border border-slate-800 mb-4">
                <TouchableOpacity
                  onPress={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className={`flex-1 py-2.5 rounded-lg items-center ${
                    mode === 'login' ? 'bg-emerald-500/20 border border-emerald-500/40' : ''
                  }`}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`text-xs font-bold ${
                      mode === 'login' ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className={`flex-1 py-2.5 rounded-lg items-center ${
                    mode === 'register' ? 'bg-emerald-500/20 border border-emerald-500/40' : ''
                  }`}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`text-xs font-bold ${
                      mode === 'register' ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    Register Now
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Status alerts */}
              {error && (
                <View className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-3">
                  <Text className="text-xs text-rose-400 font-medium">{error}</Text>
                </View>
              )}
              {successMsg && (
                <View className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-3">
                  <Text className="text-xs text-emerald-400 font-medium">{successMsg}</Text>
                </View>
              )}

              {/* FORM FIELDS */}
              {mode === 'register' && (
                <View className="mb-3">
                  <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Full Name</Text>
                  <View className="flex-row items-center bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5">
                    <User size={16} color="#94A3B8" />
                    <TextInput
                      placeholder="e.g. Alex Johnson"
                      placeholderTextColor="#64748B"
                      value={name}
                      onChangeText={setName}
                      className="flex-1 ml-2.5 text-white text-sm"
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              )}

              <View className="mb-3">
                <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Email Address</Text>
                <View className="flex-row items-center bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5">
                  <Mail size={16} color="#94A3B8" />
                  <TextInput
                    placeholder="you@example.com"
                    placeholderTextColor="#64748B"
                    value={email}
                    onChangeText={setEmail}
                    className="flex-1 ml-2.5 text-white text-sm"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="mb-3">
                <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">Password</Text>
                <View className="flex-row items-center bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5">
                  <Lock size={16} color="#94A3B8" />
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#64748B"
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1 ml-2.5 text-white text-sm"
                    secureTextEntry
                  />
                </View>
              </View>

              {mode === 'register' && (
                <View className="mb-4">
                  <Text className="text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                    Referral / Invite Code <Text className="text-slate-500 font-normal">(Optional)</Text>
                  </Text>
                  <View className="flex-row items-center bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5">
                    <ShieldCheck size={16} color="#94A3B8" />
                    <TextInput
                      placeholder="e.g. EVER2026"
                      placeholderTextColor="#64748B"
                      value={referralCode}
                      onChangeText={setReferralCode}
                      className="flex-1 ml-2.5 text-white text-sm"
                      autoCapitalize="characters"
                    />
                  </View>
                </View>
              )}

              {/* SUBMIT BUTTON */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                activeOpacity={0.85}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 items-center justify-center shadow-lg shadow-emerald-500/25 mb-4"
                style={{ backgroundColor: '#10B981' }}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#050B14" />
                ) : (
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-slate-950 font-black text-sm uppercase tracking-wider">
                      {mode === 'login' ? 'Sign In to App' : 'Create App Account'}
                    </Text>
                    <ArrowRight size={16} color="#022c22" />
                  </View>
                )}
              </TouchableOpacity>

              {/* Legal & Policy compliance links */}
              <View className="flex-row items-center justify-center space-x-4 pt-2 border-t border-slate-800/80">
                <TouchableOpacity
                  onPress={() => handleOpenLegal('https://evermoreinnovation.site/privacy.html')}
                >
                  <Text className="text-[11px] text-slate-400 underline">Privacy Policy</Text>
                </TouchableOpacity>
                <Text className="text-slate-600 text-xs">•</Text>
                <TouchableOpacity
                  onPress={() => handleOpenLegal('https://evermoreinnovation.site/terms.html')}
                >
                  <Text className="text-[11px] text-slate-400 underline">Terms of Service</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
