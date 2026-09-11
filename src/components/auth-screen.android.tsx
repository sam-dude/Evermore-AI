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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Lock, Mail, User as UserIcon, Phone, ArrowLeft, Check, Globe, Crown, Sparkles, RefreshCw } from 'lucide-react-native';
import { useAuth, UserProfile } from '@/context/auth-context';
import { GradientButton } from '@/components/gradient-button';
import { PaywallScreen } from '@/components/paywall-screen';
import { TelegramBottomSheet } from '@/components/telegram-bottom-sheet';
import { Fonts } from '@/constants/theme';

interface AuthScreenProps {
  initialMode?: 'signin' | 'signup';
  onBackToOnboarding?: () => void;
}

export function AuthScreen({ initialMode = 'signup', onBackToOnboarding }: AuthScreenProps) {
  const { login, signup, activateCoupon, setCurrentUser } = useAuth();
  
  // Stages on Android: 'paywall' -> 'signup' (or directly 'signin')
  const [stage, setStage] = useState<'paywall' | 'signup' | 'signin'>(
    initialMode === 'signin' ? 'signin' : 'paywall'
  );
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('premium');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bottom sheet state
  const [showTelegramSheet, setShowTelegramSheet] = useState(false);
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);

  // 1. If currently in paywall stage, render PaywallScreen
  if (stage === 'paywall') {
    return (
      <PaywallScreen
        onSelectPlan={(plan) => {
          setSelectedPlan(plan);
          setError(null);
          setStage('signup');
        }}
        onBack={() => {
          if (onBackToOnboarding) {
            onBackToOnboarding();
          } else {
            setStage('signin');
          }
        }}
      />
    );
  }

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (stage === 'signup' && !fullName.trim()) {
      setError('Please enter your username or full name.');
      return;
    }

    if (stage === 'signup' && !agreedToTerms) {
      setError('Please agree to the Evermore Terms of Service.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (stage === 'signup') {
        // Create account without auto-logging in immediately, to display TelegramBottomSheet
        const res = await signup(fullName, email, password, phone, selectedPlan, false);
        if (!res.success) {
          setError(res.error || 'Failed to create account.');
        } else if (res.user) {
          setPendingUser(res.user);
          setShowTelegramSheet(true);
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'Failed to sign in.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToApp = async () => {
    setShowTelegramSheet(false);
    if (pendingUser) {
      await setCurrentUser(pendingUser, {
        plan: selectedPlan,
        status: 'pending',
      });
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

  const isSignUp = stage === 'signup';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 22, paddingVertical: 14 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (stage === 'signup') {
                  setStage('paywall');
                } else if (onBackToOnboarding) {
                  onBackToOnboarding();
                }
              }}
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
            >
              <ArrowLeft size={18} color="#00E5FF" />
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#00E5FF', marginLeft: 6, textTransform: 'uppercase' }}>
                {stage === 'signup' ? 'Plans' : 'Back'}
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                  backgroundColor: '#0A1628',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../assets/images/evertap-logo.jpeg')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              <Text style={{ fontSize: 13, fontWeight: '900', color: '#FFFFFF', letterSpacing: 2, textTransform: 'uppercase' }}>
                EVERMORE
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setError(null);
                if (isSignUp) {
                  setStage('signin');
                } else {
                  setStage('paywall');
                }
              }}
              activeOpacity={0.7}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 16,
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                borderWidth: 1,
                borderColor: 'rgba(51, 65, 85, 0.5)',
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#00E5FF' }}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Selected Plan Badge (on Signup) */}
          {isSignUp && (
            <View
              style={{
                backgroundColor: '#0C1726',
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 10,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: selectedPlan === 'premium' ? 'rgba(0, 229, 255, 0.4)' : 'rgba(0, 245, 160, 0.4)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Crown size={16} color={selectedPlan === 'premium' ? '#00E5FF' : '#00F5A0'} style={{ marginRight: 8 }} />
                <View>
                  <Text style={{ fontFamily: Fonts.bold, fontSize: 10.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                    Selected Plan
                  </Text>
                  <Text style={{ fontFamily: Fonts.extraBold, fontSize: 13.5, color: '#FFFFFF' }}>
                    EverMore {selectedPlan === 'premium' ? 'Premium ($10 • ₦13,992)' : 'Basic ($5 • ₦6,991)'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setStage('paywall')}
                activeOpacity={0.7}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00E5FF' }}>Change</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Form Title */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.bold, fontSize: 10.5, color: '#00F5A0', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
              {isSignUp ? 'Member Registration' : 'Welcome Back'}
            </Text>
            <Text style={{ fontFamily: Fonts.extraBold, fontSize: 26, color: '#FFFFFF', letterSpacing: -0.5 }}>
              {isSignUp ? 'Create your Account' : 'Sign in to Evermore'}
            </Text>
          </View>

          {/* Error Banner */}
          {error && (
            <View
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                borderWidth: 1,
                borderColor: 'rgba(244, 63, 94, 0.3)',
                borderRadius: 14,
                padding: 12,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 12, color: '#FDA4AF', fontWeight: '500', lineHeight: 18 }}>{error}</Text>
            </View>
          )}

          {/* Form Fields */}
          <View style={{ gap: 14 }}>
            {/* Email Address */}
            <View>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#00F5A0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, paddingLeft: 4 }}>
                Email Address
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#0C1726',
                  borderWidth: 1,
                  borderColor: '#172A46',
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                }}
              >
                <Mail size={18} color="#64748B" />
                <TextInput
                  placeholder="name@example.com"
                  placeholderTextColor="#475569"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={{ flex: 1, marginLeft: 12, fontSize: 14, color: '#FFFFFF' }}
                />
              </View>
            </View>

            {/* Full Name / Username (if signup) */}
            {isSignUp && (
              <View>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#00F5A0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, paddingLeft: 4 }}>
                  Full Name
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#0C1726',
                    borderWidth: 1,
                    borderColor: '#172A46',
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <UserIcon size={18} color="#64748B" />
                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#475569"
                    value={fullName}
                    onChangeText={setFullName}
                    style={{ flex: 1, marginLeft: 12, fontSize: 14, color: '#FFFFFF' }}
                  />
                </View>
              </View>
            )}

            {/* Phone Number (if signup) */}
            {isSignUp && (
              <View>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#00F5A0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, paddingLeft: 4 }}>
                  Phone Number
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#0C1726',
                    borderWidth: 1,
                    borderColor: '#172A46',
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <Phone size={18} color="#64748B" />
                  <TextInput
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#475569"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={{ flex: 1, marginLeft: 12, fontSize: 14, color: '#FFFFFF' }}
                  />
                </View>
              </View>
            )}

            {/* Country (if signup) */}
            {isSignUp && (
              <View>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#00F5A0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, paddingLeft: 4 }}>
                  Country
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#0C1726',
                    borderWidth: 1,
                    borderColor: '#172A46',
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <Globe size={18} color="#64748B" />
                  <TextInput
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Nigeria"
                    placeholderTextColor="#475569"
                    style={{ flex: 1, marginLeft: 12, fontSize: 14, color: '#FFFFFF' }}
                  />
                </View>
              </View>
            )}

            {/* Password */}
            <View>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#00F5A0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, paddingLeft: 4 }}>
                {isSignUp ? 'Create Password' : 'Password'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#0C1726',
                  borderWidth: 1,
                  borderColor: '#172A46',
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                }}
              >
                <Lock size={18} color="#64748B" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#475569"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={{ flex: 1, marginLeft: 12, fontSize: 14, color: '#FFFFFF' }}
                />
              </View>
            </View>

            {/* Terms checkbox on sign up */}
            {isSignUp && (
              <TouchableOpacity
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.8}
                style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4, paddingHorizontal: 2 }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    borderWidth: 1.5,
                    borderColor: agreedToTerms ? '#00F5A0' : '#475569',
                    backgroundColor: agreedToTerms ? '#00F5A0' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    marginRight: 10,
                  }}
                >
                  {agreedToTerms && <Check size={14} color="#050B14" strokeWidth={3} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#94A3B8', lineHeight: 18 }}>
                    I agree to the{' '}
                    <Text
                      onPress={() => openLegal('https://evermore.ng/terms')}
                      style={{ color: '#00E5FF', fontWeight: '700' }}
                    >
                      Terms of Service
                    </Text>{' '}
                    and{' '}
                    <Text
                      onPress={() => openLegal('https://evermore.ng/privacy')}
                      style={{ color: '#00E5FF', fontWeight: '700' }}
                    >
                      Privacy Policy
                    </Text>
                    .
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <View style={{ marginTop: 8 }}>
              <GradientButton
                title={isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
                onPress={handleAuth}
                loading={loading}
              />
            </View>
          </View>

          {/* Toggle stage */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
            <Text style={{ fontSize: 13, color: '#64748B' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setError(null);
                if (isSignUp) {
                  setStage('signin');
                } else {
                  setStage('paywall');
                }
              }}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#00E5FF' }}>
                {isSignUp ? 'Sign In' : 'Choose a Plan'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Demo account helper hint */}
          {!isSignUp && (
            <TouchableOpacity
              onPress={() => {
                setEmail('reviewer@evermore.test');
                setPassword('ReviewerAccess2026!');
              }}
              activeOpacity={0.7}
              style={{
                marginTop: 20,
                alignSelf: 'center',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(0, 229, 255, 0.06)',
                borderWidth: 1,
                borderColor: 'rgba(0, 229, 255, 0.15)',
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#00E5FF' }}>
                Use Demo Account (Fast Review)
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Telegram Confirmation Bottom Sheet */}
      <TelegramBottomSheet
        visible={showTelegramSheet}
        plan={selectedPlan}
        userData={{
          fullName,
          email,
          phone,
        }}
        onClose={() => setShowTelegramSheet(false)}
        onChangePlan={() => {
          setShowTelegramSheet(false);
          setStage('paywall');
        }}
        onProceedToApp={handleProceedToApp}
        onActivateCoupon={activateCoupon}
      />
    </SafeAreaView>
  );
}
