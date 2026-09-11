import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Stop, Circle as SvgCircle, Rect } from 'react-native-svg';
import {
  Sparkles,
  Rocket,
  Target,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
} from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
  onLoginPress: () => void;
}

interface SlideData {
  id: string;
  tag: string;
  headline: string;
  body: string;
  accentColor: string;
  renderGraphic: () => React.ReactNode;
  buttonLabel: string;
}

export function OnboardingScreen({ onFinish, onLoginPress }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const goToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      onFinish();
    }
  };

  const SLIDES: SlideData[] = [
    // ── SLIDE 1: DISCOVER YOUR POTENTIAL ──
    {
      id: '1',
      tag: 'DISCOVER & LEARN',
      headline: 'There Is More\nIn You.',
      body: 'Master practical AI tools, build valuable skills, and unlock real capabilities in modern technology.',
      accentColor: '#00F5A0',
      buttonLabel: 'Continue',
      renderGraphic: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 230 }}>
          {/* Outer glow aura */}
          <Svg width={240} height={240} style={{ position: 'absolute' }}>
            <Defs>
              <RadialGradient id="glow1" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#00F5A0" stopOpacity="0.25" />
                <Stop offset="60%" stopColor="#00E5FF" stopOpacity="0.08" />
                <Stop offset="100%" stopColor="#040914" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <SvgCircle cx="120" cy="120" r="120" fill="url(#glow1)" />
          </Svg>

          {/* Central Glass Showcase Card */}
          <View
            style={{
              width: SCREEN_WIDTH - 64,
              maxWidth: 320,
              backgroundColor: 'rgba(10, 24, 46, 0.85)',
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 245, 160, 0.3)',
              padding: 18,
              shadowColor: '#00F5A0',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            {/* Top Tag inside card */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 245, 160, 0.15)',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Sparkles size={12} color="#00F5A0" style={{ marginRight: 5 }} />
                <Text style={{ fontFamily: Fonts.bold, fontSize: 10, color: '#00F5A0', letterSpacing: 0.5 }}>
                  EVERMORE ACADEMY
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontFamily: Fonts.semiBold, fontSize: 10, color: '#94A3B8' }}>
                  Interactive
                </Text>
              </View>
            </View>

            {/* Middle Feature Rows */}
            <View style={{ gap: 10 }}>
              <View
                style={{
                  backgroundColor: '#071529',
                  borderRadius: 12,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.04)',
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: 'rgba(0, 229, 255, 0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <Brain size={16} color="#00E5FF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: Fonts.bold, fontSize: 12, color: '#FFFFFF' }}>
                    AI Curriculum & Prompting
                  </Text>
                  <Text style={{ fontFamily: Fonts.regular, fontSize: 10, color: '#64748B' }}>
                    Comprehensive interactive lessons
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#071529',
                  borderRadius: 12,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.04)',
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: 'rgba(0, 245, 160, 0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <Award size={16} color="#00F5A0" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: Fonts.bold, fontSize: 12, color: '#FFFFFF' }}>
                    Daily Check-in Streaks
                  </Text>
                  <Text style={{ fontFamily: Fonts.regular, fontSize: 10, color: '#64748B' }}>
                    Earn EverPoints as you progress
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ),
    },

    // ── SLIDE 2: TURN POTENTIAL INTO POSSIBILITY (EARNING ECOSYSTEM) ──
    {
      id: '2',
      tag: 'OPPORTUNITY & EARNING',
      headline: 'Turn Potential\nInto Possibility.',
      body: 'Access genuine AI training campaigns, outsourced technology jobs, and build sustainable income streams.',
      accentColor: '#00E5FF',
      buttonLabel: 'Continue',
      renderGraphic: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 230 }}>
          {/* Outer glow aura */}
          <Svg width={240} height={240} style={{ position: 'absolute' }}>
            <Defs>
              <RadialGradient id="glow2" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.28" />
                <Stop offset="60%" stopColor="#00F5A0" stopOpacity="0.08" />
                <Stop offset="100%" stopColor="#040914" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <SvgCircle cx="120" cy="120" r="120" fill="url(#glow2)" />
          </Svg>

          {/* Central Glass Showcase Card */}
          <View
            style={{
              width: SCREEN_WIDTH - 64,
              maxWidth: 320,
              backgroundColor: 'rgba(10, 24, 46, 0.85)',
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 229, 255, 0.3)',
              padding: 18,
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            {/* Top Live Badge */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.15)',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#00F5A0',
                    marginRight: 6,
                  }}
                />
                <Text style={{ fontFamily: Fonts.bold, fontSize: 10, color: '#00E5FF', letterSpacing: 0.5 }}>
                  ACTIVE OPPORTUNITIES
                </Text>
              </View>

              <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00F5A0' }}>
                Hourly Payouts
              </Text>
            </View>

            {/* Stat Cards Side by Side */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#071529',
                  borderRadius: 14,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 245, 160, 0.2)',
                }}
              >
                <Text style={{ fontFamily: Fonts.bold, fontSize: 9.5, color: '#64748B', letterSpacing: 0.8, marginBottom: 4 }}>
                  AI TRAINING
                </Text>
                <Text style={{ fontFamily: Fonts.extraBold, fontSize: 18, color: '#00F5A0' }}>
                  $16.8<Text style={{ fontSize: 11, color: '#94A3B8' }}>/hr</Text>
                </Text>
                <Text style={{ fontFamily: Fonts.regular, fontSize: 9, color: '#94A3B8', marginTop: 2 }}>
                  Daily Tasks
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: '#071529',
                  borderRadius: 14,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 229, 255, 0.2)',
                }}
              >
                <Text style={{ fontFamily: Fonts.bold, fontSize: 9.5, color: '#64748B', letterSpacing: 0.8, marginBottom: 4 }}>
                  AI JOBS
                </Text>
                <Text style={{ fontFamily: Fonts.extraBold, fontSize: 18, color: '#00E5FF' }}>
                  $18.0<Text style={{ fontSize: 11, color: '#94A3B8' }}>/hr</Text>
                </Text>
                <Text style={{ fontFamily: Fonts.regular, fontSize: 9, color: '#94A3B8', marginTop: 2 }}>
                  Priority Access
                </Text>
              </View>
            </View>
          </View>
        </View>
      ),
    },

    // ── SLIDE 3: YOUR NEXT CHAPTER STARTS HERE ──
    {
      id: '3',
      tag: 'YOUR NEXT CHAPTER',
      headline: 'Start Your\nEverMore Journey.',
      body: 'Join a vibrant ecosystem of creators, learners, and earners. Pick your plan and begin today.',
      accentColor: '#00F5A0',
      buttonLabel: 'Start Your EverMore Journey',
      renderGraphic: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 230 }}>
          {/* Outer glow aura */}
          <Svg width={240} height={240} style={{ position: 'absolute' }}>
            <Defs>
              <RadialGradient id="glow3" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#00F5A0" stopOpacity="0.3" />
                <Stop offset="50%" stopColor="#00E5FF" stopOpacity="0.1" />
                <Stop offset="100%" stopColor="#040914" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <SvgCircle cx="120" cy="120" r="120" fill="url(#glow3)" />
          </Svg>

          {/* Central Glass Showcase Card */}
          <View
            style={{
              width: SCREEN_WIDTH - 64,
              maxWidth: 320,
              backgroundColor: 'rgba(10, 24, 46, 0.85)',
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 245, 160, 0.35)',
              padding: 18,
              shadowColor: '#00F5A0',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(0, 245, 160, 0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              >
                <Rocket size={18} color="#00F5A0" />
              </View>
              <View>
                <Text style={{ fontFamily: Fonts.extraBold, fontSize: 13, color: '#FFFFFF' }}>
                  6 Months All-Access
                </Text>
                <Text style={{ fontFamily: Fonts.medium, fontSize: 10.5, color: '#00E5FF' }}>
                  Verified Evermore Membership
                </Text>
              </View>
            </View>

            {/* Checklist */}
            <View style={{ gap: 8 }}>
              {['Unlimited EverAI Assistant', 'AI Training Tasks & Reviews', 'Exclusive Community & Mentorship'].map(
                (item, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckCircle2 size={13} color="#00F5A0" style={{ marginRight: 8 }} />
                    <Text style={{ fontFamily: Fonts.medium, fontSize: 11.5, color: '#CBD5E1' }}>
                      {item}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>
      ),
    },
  ];

  const renderSlide = ({ item }: { item: SlideData }) => (
    <View style={{ width: SCREEN_WIDTH, flex: 1, paddingHorizontal: 24 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Dynamic Graphic Showcase */}
        {item.renderGraphic()}

        {/* Tag line */}
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 16, marginBottom: 10 }}>
          <View style={{ width: 18, height: 2, backgroundColor: item.accentColor, borderRadius: 1, marginRight: 8 }} />
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 11,
              color: item.accentColor,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {item.tag}
          </Text>
          <View style={{ width: 18, height: 2, backgroundColor: item.accentColor, borderRadius: 1, marginLeft: 8 }} />
        </View>

        {/* Headline */}
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            fontSize: 32,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 38,
            letterSpacing: -0.6,
            marginBottom: 12,
          }}
        >
          {item.headline}
        </Text>

        {/* Body */}
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: 14,
            color: '#94A3B8',
            textAlign: 'center',
            lineHeight: 22,
            paddingHorizontal: 12,
          }}
        >
          {item.body}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#040914' }} edges={['top', 'bottom']}>
      {/* Background Gradient */}
      <Svg width={SCREEN_WIDTH} height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="bgGlow" cx="50%" cy="25%" rx="60%" ry="45%">
            <Stop offset="0%" stopColor="#0B1F38" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#040914" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bgGlow)" />
      </Svg>

      {/* Top Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 22,
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        {/* Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              overflow: 'hidden',
              marginRight: 8,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 229, 255, 0.35)',
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
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 14,
              color: '#FFFFFF',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            EVERMORE
          </Text>
        </View>

        {/* Skip button */}
        <TouchableOpacity
          onPress={onFinish}
          activeOpacity={0.7}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 7,
            borderRadius: 18,
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <Text style={{ fontFamily: Fonts.bold, fontSize: 11.5, color: '#94A3B8' }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        style={{ flex: 1 }}
      />

      {/* Bottom Section */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
        {/* Progress Dots + Counter */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === currentIndex ? 32 : 8,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: i === currentIndex ? '#00F5A0' : 'rgba(255, 255, 255, 0.18)',
                }}
              />
            ))}
          </View>
          <Text style={{ fontFamily: Fonts.bold, fontSize: 11.5, color: '#64748B' }}>
            {currentIndex + 1} / {SLIDES.length}
          </Text>
        </View>

        {/* Continue / Start Button */}
        <TouchableOpacity
          onPress={goToNext}
          activeOpacity={0.88}
          style={{
            backgroundColor: '#00F5A0',
            paddingVertical: 16,
            borderRadius: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#00F5A0',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 14,
            elevation: 6,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 15,
              color: '#040914',
              letterSpacing: 0.3,
            }}
          >
            {SLIDES[currentIndex].buttonLabel}
          </Text>
          <ArrowRight size={18} color="#040914" strokeWidth={2.5} style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity
          onPress={onLoginPress}
          activeOpacity={0.7}
          style={{ alignItems: 'center', paddingVertical: 14 }}
        >
          <Text style={{ fontFamily: Fonts.regular, fontSize: 12.5, color: '#64748B' }}>
            Already have an account?{' '}
            <Text style={{ fontFamily: Fonts.bold, color: '#00E5FF' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
