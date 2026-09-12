import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import {
  ArrowLeft,
  Crown,
  Sparkles,
  CheckCircle2,
  Clock,
  Ticket,
  Send,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  duration: string;
  badge?: string;
  accentColor: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'premium',
    name: 'EverMore Premium VIP',
    tagline: 'Complete access to highest-paying AI tasks, certification & VIP mentorship',
    price: '₦14,000',
    duration: '6 Months All-Access',
    badge: 'RECOMMENDED',
    accentColor: '#00F5A0',
    features: [
      'Unlimited EverAI Assistant & Prompt Library',
      'Priority High-Paying AI Training Campaigns',
      'Daily Check-in Streaks with 2x EverPoints Multiplier',
      'Official EverMore AI Certification',
      'Exclusive VIP Telegram Mentorship Group',
      'Trend Prediction & Opportunity Monetization',
      'Direct Priority Concierge Support',
    ],
  },
  {
    id: 'standard',
    name: 'EverMore Standard',
    tagline: 'Ideal foundation to learn AI and build daily streak earnings',
    price: '₦7,000',
    duration: '6 Months Access',
    badge: 'STARTER TIER',
    accentColor: '#00E5FF',
    features: [
      'Core EverMore AI Academy & Curriculum',
      'Standard AI Training Tasks Pool',
      'Daily Check-in Streaks & EverPoints',
      'Community Group & Discussion Board Access',
      'Standard Telegram Support',
    ],
  },
];

export default function AndroidMembershipScreen() {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('premium');
  const [couponCode, setCouponCode] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];

  const handleProceedToTelegram = async () => {
    const text = encodeURIComponent(
      `Hello Evermore Team! 👋\n\nI want to subscribe to the *${selectedPlan.name}* plan (${selectedPlan.price} - ${selectedPlan.duration}) on EverMore.\n\nPlease send me the payment instructions and my activation coupon code.`
    );
    const url = `https://t.me/evermoreai?text=${text}`;
    try {
      await Linking.openURL(url);
    } catch {
      Linking.openURL('https://t.me/evermoreai');
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMsg({ type: 'error', text: 'Please enter a coupon code.' });
      return;
    }
    setCouponMsg(null);
    setLoadingCoupon(true);

    try {
      // Simulate/validate coupon locally or record activation
      await new Promise((res) => setTimeout(res, 800));
      await AsyncStorage.setItem('@evermore_android_coupon', couponCode.trim());
      setCouponMsg({
        type: 'success',
        text: `Coupon "${couponCode.trim().toUpperCase()}" applied! Our team will confirm your access on Telegram.`,
      });
      setCouponCode('');
    } catch {
      setCouponMsg({ type: 'error', text: 'Failed to verify coupon code.' });
    } finally {
      setLoadingCoupon(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top']}>
      {/* Background Lighting */}
      <Svg width={SCREEN_WIDTH} height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="memGlow1" cx="50%" cy="15%" rx="60%" ry="35%">
            <Stop offset="0%" stopColor="#0B2347" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#050B14" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#memGlow1)" />
      </Svg>

      {/* ── TOP HEADER ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(30, 58, 95, 0.4)',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <ArrowLeft size={19} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Crown size={18} color="#00F5A0" style={{ marginRight: 7 }} />
          <Text style={{ fontFamily: Fonts.bold, fontSize: 16, color: '#FFFFFF' }}>
            Choose Membership
          </Text>
        </View>

        {/* Telegram Direct Pill */}
        <TouchableOpacity
          onPress={handleProceedToTelegram}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 245, 160, 0.12)',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(0, 245, 160, 0.3)',
          }}
        >
          <Send size={12} color="#00F5A0" style={{ marginRight: 5 }} />
          <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00F5A0' }}>
            Telegram
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 }}
      >
        {/* Headline Intro */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 26,
              color: '#FFFFFF',
              letterSpacing: -0.5,
              lineHeight: 32,
              marginBottom: 8,
            }}
          >
            Select Your Plan.
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 13.5,
              color: '#94A3B8',
              lineHeight: 20,
            }}
          >
            Pick a tier below to unlock verified AI training tasks, certificates, and direct Telegram support.
          </Text>
        </View>

        {/* ── PLAN SELECTION CARDS ── */}
        <View style={{ gap: 16, marginBottom: 24 }}>
          {PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlanId(plan.id)}
                activeOpacity={0.88}
                style={{
                  backgroundColor: isSelected ? '#0A1C36' : '#081220',
                  borderRadius: 22,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? plan.accentColor : 'rgba(30, 58, 95, 0.5)',
                  padding: 20,
                  shadowColor: isSelected ? plan.accentColor : '#000000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isSelected ? 0.3 : 0.1,
                  shadowRadius: 14,
                  elevation: isSelected ? 6 : 2,
                }}
              >
                {/* Header row with Badge & Radio */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  {plan.badge ? (
                    <View
                      style={{
                        backgroundColor: `${plan.accentColor}22`,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: `${plan.accentColor}44`,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Fonts.bold,
                          fontSize: 9.5,
                          color: plan.accentColor,
                          letterSpacing: 0.8,
                        }}
                      >
                        {plan.badge}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}

                  {/* Radio indicator */}
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: isSelected ? plan.accentColor : 'rgba(255, 255, 255, 0.3)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSelected ? `${plan.accentColor}22` : 'transparent',
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: plan.accentColor,
                        }}
                      />
                    )}
                  </View>
                </View>

                {/* Plan Title & Price */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <Text
                    style={{
                      fontFamily: Fonts.extraBold,
                      fontSize: 19,
                      color: '#FFFFFF',
                      flex: 1,
                      marginRight: 10,
                    }}
                  >
                    {plan.name}
                  </Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text
                      style={{
                        fontFamily: Fonts.extraBold,
                        fontSize: 22,
                        color: plan.accentColor,
                      }}
                    >
                      {plan.price}
                    </Text>
                    <Text style={{ fontFamily: Fonts.medium, fontSize: 10.5, color: '#64748B' }}>
                      {plan.duration}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: 12.5,
                    color: '#94A3B8',
                    marginBottom: 16,
                  }}
                >
                  {plan.tagline}
                </Text>

                {/* Features bullet list */}
                <View style={{ gap: 8, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.06)', paddingTop: 14 }}>
                  {plan.features.map((feat, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CheckCircle2
                        size={14}
                        color={isSelected ? plan.accentColor : '#64748B'}
                        style={{ marginRight: 8 }}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.medium,
                          fontSize: 12,
                          color: isSelected ? '#E2E8F0' : '#94A3B8',
                          flex: 1,
                        }}
                      >
                        {feat}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── COUPON CODE CARD ── */}
        <View
          style={{
            backgroundColor: '#0C1726',
            borderRadius: 20,
            padding: 18,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(30, 58, 95, 0.6)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ticket size={17} color="#00E5FF" style={{ marginRight: 8 }} />
            <Text style={{ fontFamily: Fonts.bold, fontSize: 14, color: '#FFFFFF' }}>
              Have an Activation Coupon?
            </Text>
          </View>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 12,
              color: '#94A3B8',
              lineHeight: 18,
              marginBottom: 12,
            }}
          >
            Received your activation code directly from the Telegram team? Enter it below.
          </Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              value={couponCode}
              onChangeText={(t) => {
                setCouponCode(t);
                setCouponMsg(null);
              }}
              placeholder="e.g. EVERMORE-XXXX"
              placeholderTextColor="#475569"
              autoCapitalize="characters"
              style={{
                flex: 1,
                backgroundColor: '#050B14',
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 11,
                color: '#FFFFFF',
                fontFamily: Fonts.bold,
                fontSize: 12.5,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <TouchableOpacity
              onPress={handleApplyCoupon}
              disabled={loadingCoupon}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#00E5FF',
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loadingCoupon ? (
                <ActivityIndicator size="small" color="#050B14" />
              ) : (
                <Text style={{ fontFamily: Fonts.bold, fontSize: 12.5, color: '#050B14' }}>
                  Verify
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {couponMsg && (
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: couponMsg.type === 'success' ? 'rgba(0, 245, 160, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                borderWidth: 1,
                borderColor: couponMsg.type === 'success' ? 'rgba(0, 245, 160, 0.3)' : 'rgba(244, 63, 94, 0.3)',
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 11.5,
                  color: couponMsg.type === 'success' ? '#00F5A0' : '#FDA4AF',
                }}
              >
                {couponMsg.text}
              </Text>
            </View>
          )}
        </View>

        {/* Direct Telegram Support Banner */}
        <View
          style={{
            backgroundColor: '#091526',
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: 'rgba(0, 229, 255, 0.25)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <ShieldCheck size={16} color="#00F5A0" style={{ marginRight: 8 }} />
            <Text style={{ fontFamily: Fonts.bold, fontSize: 13, color: '#FFFFFF' }}>
              Instant Verification on Telegram
            </Text>
          </View>
          <Text style={{ fontFamily: Fonts.regular, fontSize: 11.5, color: '#94A3B8', lineHeight: 17 }}>
            Our verified team handles onboarding, questions, and membership coupons swiftly 24/7 on Telegram.
          </Text>
        </View>
      </ScrollView>

      {/* ── BOTTOM STICKY CTA: PROCEED TO TELEGRAM WITH SELECTED PLAN ── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(5, 11, 20, 0.95)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(30, 58, 95, 0.6)',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 22,
        }}
      >
        <TouchableOpacity
          onPress={handleProceedToTelegram}
          activeOpacity={0.88}
          style={{
            backgroundColor: '#00F5A0',
            paddingVertical: 15,
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#00F5A0',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 14,
            elevation: 6,
          }}
        >
          <Send size={16} color="#040914" style={{ marginRight: 8 }} />
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 14.5,
              color: '#040914',
              letterSpacing: 0.3,
            }}
          >
            Get {selectedPlan.name.replace('EverMore ', '')} on Telegram
          </Text>
          <ArrowRight size={17} color="#040914" strokeWidth={2.8} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
